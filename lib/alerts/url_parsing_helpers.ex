defmodule Alerts.URLParsingHelpers do
  @moduledoc "Helpers to parse out the url from a string and create an html link"

  @url_regex ~r/(https?:\/\/)?([\da-z\.-]+)\.([a-z]{2,6})([\/\w\.-]*)*\/?/i

  def get_full_url(text) do
    with [match | _] <- Regex.run(@url_regex, text) do
      {url, _suffix} = parse_url_and_suffix(match)
      ensure_scheme(url)
    end
  end

  defp parse_url_and_suffix(url) do
    # I could probably convince the Regex to match an internal period but not
    # one at the end, but this is clearer. -ps
    if String.ends_with?(url, ".") do
      String.split_at(url, -1)
    else
      {url, ""}
    end
  end

  def replace_urls_with_links(text) do
    tokens = String.split(text, " ")

    mapped_tokens =
      Enum.map(tokens, fn token ->
        if String.contains?(token, "@") || !Regex.match?(@url_regex, token) do
          token
        else
          Regex.replace(@url_regex, token, &create_url/1)
        end
      end)

    mapped_tokens |> Enum.join(" ") |> Phoenix.HTML.raw()
  end

  defp create_url(url) do
    {url, suffix} = parse_url_and_suffix(url)

    full_url = ensure_scheme(url)

    # remove [http:// | https:// | www.] from URL:
    stripped_url = String.replace(full_url, ~r/(https?:\/\/)?(www\.)?/i, "")

    # capitalize 'mbta' (special case):
    stripped_url =
      if String.contains?(stripped_url, "mbta") do
        String.replace(stripped_url, "mbta", "MBTA")
      else
        stripped_url
      end

    ~s(<a target="_blank" href="#{full_url}">#{stripped_url}</a>#{suffix})
  end

  defp ensure_scheme("http://" <> _ = url), do: url
  defp ensure_scheme("https://" <> _ = url), do: url
  defp ensure_scheme("mbta.com" <> _ = url), do: "https://" <> url
  defp ensure_scheme("MBTA.com" <> _ = url), do: "https://" <> url
  defp ensure_scheme(url), do: "http://" <> url
end
