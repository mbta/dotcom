defmodule Dotcom.IcalendarGenerator do
  @moduledoc """
  Takes event information and generates an ICS file.
  File validation was checked with https://icalendar.org/validator.html.
  """

  import DotcomWeb.CmsRouterHelpers, only: [event_path: 3]

  alias CMS.Page.Event

  @spec to_ical(Plug.Conn.t(), Event.t()) :: iodata
  def to_ical(%Plug.Conn{} = conn, %Event{} = event) do
    Enum.map(
      [
        "BEGIN:VCALENDAR\r\n",
        "VERSION:2.0\r\n",
        "PRODID:-//www.mbta.com//Events//EN\r\n",
        "BEGIN:VEVENT\r\n",
        "UID:" <> "event" <> "#{event.id}" <> "@mbta.com\r\n",
        "SEQUENCE:" <> unix_time() <> "\r\n",
        "DTSTAMP:" <> timestamp() <> "\r\n",
        "DTSTART:" <> start_time(event) <> "\r\n",
        "DTEND:" <> end_time(event) <> "\r\n",
        "DESCRIPTION:" <> description(event) <> "\r\n",
        "LOCATION:" <> address(event) <> "\r\n",
        "SUMMARY:" <> event_summary(event) <> "\r\n",
        "URL:" <> full_url(conn, event) <> "\r\n",
        "END:VEVENT\r\n",
        "END:VCALENDAR\r\n"
      ],
      &fold_line/1
    )
  end

  defp address(event) do
    if event.location do
      full_address(event)
    else
      imported_address(event)
    end
  end

  defp full_address(%Event{location: location, street_address: street_address, city: city, state: state})
       when nil not in [location, street_address, city, state] do
    location <> " " <> street_address <> " " <> city <> ", " <> state
  end

  defp full_address(%Event{location: location, street_address: street_address})
       when nil not in [location, street_address] do
    location <> " " <> street_address
  end

  defp full_address(event), do: event.location

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
    string
    |> String.replace(~r/\n+/, "\r\n")
    |> String.replace_trailing("\r\n", "")
  end

  defp decode_ampersand_entity(string) do
    String.replace(string, "&amp;", "&")
  end

  defp unix_time do
    DateTime.utc_now() |> Timex.to_unix() |> Integer.to_string()
  end

  defp timestamp do
    convert_to_ical_format(DateTime.utc_now())
  end

  defp full_url(conn, event) do
    Path.join(DotcomWeb.Endpoint.url(), event_path(conn, :show, event))
  end

  defp start_time(%Event{start_time: nil}), do: ""

  defp start_time(%Event{start_time: start_time}) do
    convert_to_ical_format(start_time)
  end

  defp end_time(%Event{end_time: nil, start_time: start_time}) do
    start_time |> Timex.shift(hours: 1) |> convert_to_ical_format()
  end

  defp end_time(%Event{end_time: end_time}) do
    convert_to_ical_format(end_time)
  end

  defp convert_to_ical_format(datetime) do
    datetime
    |> Timex.to_datetime("Etc/UTC")
    |> Timex.format!("{YYYY}{0M}{0D}T{h24}{m}{s}Z")
  end

  defp fold_line(line) when is_binary(line) do
    line_length = 75

    if String.length(line) > line_length do
      for index <- 0..(String.length(line) - 1), into: "" do
        if index > 0 and rem(index + 1, 74) === 0 do
          String.at(line, index) <> "\r\n "
        else
          String.at(line, index)
        end
      end
    else
      line
    end
  end

  defp fold_line(line), do: line
end
