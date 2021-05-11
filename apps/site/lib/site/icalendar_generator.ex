defmodule Site.IcalendarGenerator do
  import SiteWeb.CmsRouterHelpers, only: [event_path: 3]

  alias CMS.Page.Event

  @spec to_ical(Plug.Conn.t(), Event.t()) :: iodata
  def to_ical(%Plug.Conn{} = conn, %Event{} = event) do
    [
      "BEGIN:VCALENDAR\r\n",
      "VERSION:2.0\r\n",
      "PRODID:-//www.mbta.com//Events//EN\r\n",
      "BEGIN:VEVENT\r\n",
      "UID:",
      "event",
      "#{event.id}",
      "@mbta.com",
      "\r\n",
      "SEQUENCE:",
      unix_time(),
      "\r\n",
      "DTSTAMP:",
      timestamp(),
      "\r\n",
      "DTSTART:",
      start_time(event),
      "\r\n",
      "DTEND:",
      end_time(event),
      "\r\n",
      "DESCRIPTION:",
      description(event),
      "\r\n",
      "LOCATION:",
      address(event),
      "\r\n",
      "SUMMARY:",
      event_summary(event),
      "\r\n",
      "URL:",
      full_url(conn, event),
      "\r\n",
      "END:VEVENT\r\n",
      "END:VCALENDAR\r\n"
    ]
  end

  defp address(event) do
    if event.location do
      full_address(event)
    else
      imported_address(event)
    end
  end

  defp full_address(event) do
    [
      event.location,
      " ",
      event.street_address,
      " ",
      event.city,
      ", ",
      event.state
    ]
  end

  defp imported_address(%Event{imported_address: {:safe, address}}) do
    decode_ampersand_entity(address)
  end

  defp event_summary(%Event{title: title}) do
    title
  end

  defp description(%Event{body: {:safe, body}}) do
    body
    |> strip_html_tags()
    |> replace_newlines()
    |> decode_ampersand_entity()
  end

  defp strip_html_tags(string) do
    HtmlSanitizeEx.strip_tags(string)
  end

  defp replace_newlines(string) do
    String.replace(string, "\n", "\r\n")
  end

  defp decode_ampersand_entity(string) do
    String.replace(string, "&amp;", "&")
  end

  defp unix_time do
    Timex.now() |> Timex.to_unix() |> Integer.to_string()
  end

  defp timestamp do
    Timex.now() |> convert_to_ical_format
  end

  defp full_url(conn, event) do
    Path.join(SiteWeb.Endpoint.url(), event_path(conn, :show, event))
  end

  defp start_time(%Event{start_time: nil}), do: ""

  defp start_time(%Event{start_time: start_time}) do
    start_time |> convert_to_ical_format
  end

  defp end_time(%Event{end_time: nil, start_time: start_time}) do
    start_time |> Timex.shift(hours: 1) |> convert_to_ical_format
  end

  defp end_time(%Event{end_time: end_time}) do
    end_time |> convert_to_ical_format
  end

  defp convert_to_ical_format(datetime) do
    datetime
    |> Timex.to_datetime("Etc/UTC")
    |> Timex.format!("{YYYY}{0M}{0D}T{h24}{m}{s}Z")
  end
end
