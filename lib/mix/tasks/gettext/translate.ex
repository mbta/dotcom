defmodule Mix.Tasks.GetText.Translate.CustomTerminologies do
  @moduledoc """
  A support module for the task that lets us combine custom terminologies.
  Files are taken in alphabetical order so that if a term exists in two terminologies,
  the one from the alphabetically first file will be kept.
  """

  @directory "priv/gettext/terminologies"

  @doc """
  Get all of the custom terminologies in the project.
  """
  def get_terminologies() do
    list_all_terminologies()
    |> Enum.map(&get_terminology/1)
    |> List.flatten()
    |> Enum.uniq_by(fn {msgid, _} -> msgid end)
  end

  # Get a particular terminology based on the file reference.
  defp get_terminology(reference) do
    reference
    |> File.stream!()
    |> CSV.decode(headers: true)
    |> Enum.to_list()
    |> Enum.filter(fn {result, _} -> result === :ok end)
    |> Enum.map(fn {:ok, translation} ->
      {Map.get(translation, "en"), Map.delete(translation, "en")}
    end)
  end

  # List all files in the terminologies directory.
  defp list_all_files(reference \\ @directory) do
    if File.dir?(reference) do
      reference
      |> File.ls!()
      |> Enum.map(&(reference <> "/" <> &1))
      |> Enum.map(&list_all_files/1)
      |> List.flatten()
    else
      reference
    end
  end

  # Filter all files in the directory by the `.csv` format.
  defp list_all_terminologies() do
    list_all_files()
    |> Enum.filter(fn ref -> String.match?(ref, ~r/.csv$/) end)
  end
end

defmodule Mix.Tasks.Gettext.Translate do
  @moduledoc """
  This mix task translates all lines in every domain `.pot` file for every locale.

  Run Libretranslate locally loading only the locales we support.

  docker run -ti --rm -p 9999:5000 libretranslate/libretranslate --load-only en,es
  """

  @shortdoc "Translate all of the `.po` files using the `.pot` file(s)"

  use Mix.Task

  import Dotcom.Locales, only: [default_locale_code: 0, locale_codes: 0]
  import Mix.Tasks.GetText.Translate.CustomTerminologies, only: [get_terminologies: 0]

  @custom_terminologies get_terminologies()
  @directory "priv/gettext"
  @url "http://localhost:9999/translate"

  @impl Mix.Task
  # Translate the `.pot` file(s) into the given locales.
  # E.g., `mix gettext.translate --locales es,fr`
  def run(["--locales", locales]) do
    :ok = Mix.Tasks.Gettext.Extract.run([])

    _ = Finch.start_link(name: TranslateFinch)

    locales
    |> String.split(",")
    |> Enum.reject(fn locale ->
      locale === default_locale_code() || not Enum.member?(locale_codes(), locale)
    end)
    |> translate()
  end

  # Translate all non-default locales.
  def run([]) do
    :ok = Mix.Tasks.Gettext.Extract.run([])

    _ = Finch.start_link(name: TranslateFinch)

    (locale_codes() -- [default_locale_code()]) |> translate()
  end

  # Translate the given locales.
  defp translate(locales) when is_list(locales) do
    Enum.each(locales, &translate/1)
  end

  # Translate a single locale.
  defp translate(locale) when is_binary(locale) do
    Enum.each(domains(), fn domain ->
      write_domain_translations(domain, locale)
    end)
  end

  # Build a request to be sent to Libretranslate.
  defp build_request(text, locale) do
    %{
      q: text,
      source: default_locale_code(),
      target: locale,
      alternatives: 0
    }
  end

  # Gets the content of msgid of a `.pot` file.
  defp domain_line(line) do
    Regex.scan(~r/(?<=\")(.*?)(?=\")/, line)
    |> List.flatten()
    |> List.first()
  end

  # Gets all of the msgids of a `.pot` file.
  defp domain_lines(domain) do
    "#{@directory}/#{domain}.pot"
    |> File.read!()
    |> String.split("\n", trim: true)
    |> Enum.filter(fn line -> String.match?(line, ~r/^msgid \"(.)+\"/) end)
    |> Enum.map(&domain_line/1)
  end

  # Looks for all `.pot` files to get a list of domains.
  defp domains() do
    @directory
    |> File.ls!()
    |> Enum.filter(fn ref -> String.match?(ref, ~r/.pot$/) end)
    |> Enum.map(fn ref -> String.split(ref, ".") |> List.first() end)
  end

  # Use the Libretranslate service to translate a piece of text for a given locale.
  defp libretranslate_text(text, locale) do
    @url
    |> Req.post!(finch: TranslateFinch, json: build_request(text, locale))
    |> Map.get(:body)
    |> Map.get("translatedText")
    |> String.replace(~s("), ~s('))
  end

  # Check the custom terminology to see if we have a match.
  # If we do, we return the match.
  # If we don't, we return nil.
  # The regex should match: "MBTA ", " MBTA ", " MBTA.", " MBTA", and "MBTA"
  defp match_custom_term(text, locale) do
    @custom_terminologies
    |> Enum.find({nil, %{}}, fn {term, _} ->
      regex = Regex.compile!("(^|\s|[^\w\s])#{term}($|\s|[^\w\s])")

      String.match?(text, regex)
    end)
    |> Kernel.then(fn {_, translation} -> Map.get(translation, locale) end)
  end

  # Gets all of the domain lines in a domain and then translates them into the locale.
  defp translate_domain(domain, locale) do
    domain_lines(domain)
    |> Enum.map(fn text -> {text, translate_text(text, locale)} end)
    |> Map.new()
  end

  # Translation can mean matching a custom terminology or translating via Libretranslate.
  defp translate_text(text, locale) do
    if custom_term = match_custom_term(text, locale) do
      stripped_text = String.replace(text, custom_term, "+++")
      translated_text = libretranslate_text(stripped_text, locale)

      String.replace(translated_text, "+++", custom_term)
    else
      libretranslate_text(text, locale)
    end
  end

  # Writes a translated `.po` file for the domain and locale.
  defp write_domain_translations(domain, locale) do
    file = File.open!("#{@directory}/#{locale}/LC_MESSAGES/#{domain}.po", [:write, :utf8])

    IO.puts(file, "# THIS FILE WAS GENERATED BY RUNNING `mix gettext.translate`")
    IO.puts(file, "")

    translate_domain(domain, locale)
    |> Enum.each(fn {k, v} -> write_translation(file, k, v) end)
  end

  # Writes a single translation into a single file.
  defp write_translation(file, text, translation) do
    IO.puts(file, "msgid \"#{text}\"")
    IO.puts(file, "msgstr \"#{translation}\"")

    IO.puts(file, "")
  end
end
