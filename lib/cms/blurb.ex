defmodule CMS.Blurb do
  @moduledoc """
  Deprecated feature for News items.
  """

  def suffix do
    "..."
  end

  def blurb(text, max_length, default_message \\ "") do
    blurb = build_blurb(text, max_length)

    if String.trim(blurb) == "" do
      default_message
    else
      blurb
    end
  end

  defp build_blurb("<p>" <> _ = text, max_length) do
    text
    |> String.split("<p>")
    |> reject_paragraphs_with_byline_information()
    |> remove_trailing_p_tags()
    |> remove_empty_p_tags()
    |> List.first()
    |> build_blurb(max_length)
  end

  defp build_blurb(nil, _max_length) do
    ""
  end

  defp build_blurb(text, max_length) do
    text
    |> String.replace(~r(<br.*?>), " ")
    |> HtmlSanitizeEx.strip_tags()
    |> maybe_add_suffix(max_length)
  end

  defp reject_paragraphs_with_byline_information(text) do
    Enum.reject(text, fn paragraph ->
      paragraph =~ byline_information()
    end)
  end

  defp byline_information do
    ~r/Media Contact|^(?>\s|&nbsp;|&#160;)*By /i
  end

  defp remove_trailing_p_tags(text) do
    Enum.map(text, fn paragraph ->
      paragraph |> String.split("</p") |> List.first()
    end)
  end

  defp remove_empty_p_tags(text) do
    Enum.reject(text, fn paragraph ->
      String.trim(paragraph) == ""
    end)
  end

  defp maybe_add_suffix(text, max_length) do
    if String.length(text) > max_length do
      blurb_length = max_length - String.length(suffix())

      text
      |> String.trim()
      |> String.slice(Range.new(0, blurb_length - 1))
      |> Kernel.<>(suffix())
    else
      text
    end
  end
end
