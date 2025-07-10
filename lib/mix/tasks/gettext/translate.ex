defmodule Mix.Tasks.Gettext.Translate do
  @moduledoc """
  Run Libretranslate locally loading only the languages we support

  docker run -ti --rm -p 9999:5000 libretranslate/libretranslate --load-only en,es
  """

  @shortdoc "Translate all of the `.po` files using the `.pot` file(s)"

  use Mix.Task

  import Dotcom.Locales, only: [default_locale_code: 0, locale_codes: 0]

  @directory "priv/gettext"

  @impl Mix.Task
  # Translate the `.pot` file into the given locales.
  # E.g., `mix gettext.translate --locales es,fr`
  def run(["--locales", locales]) do
    locales
    |> String.split(",")
    |> Enum.reject(fn locale ->
      locale === default_locale_code() || not Enum.member?(locale_codes(), locale)
    end)
    |> translate()
  end

  # Translate all non-default locales.
  def run([]) do
    locales = locale_codes() -- [default_locale_code()]

    translate(locales)
  end

  # Translate the given locales.
  defp translate(locales) when is_list(locales) do
    Enum.each(locales, &translate/1)
  end

  # Translate a single locale.
  defp translate(locale) when is_binary(locale) do
    @directory
    |> File.ls!()
    |> Enum.reject()
  end
end
