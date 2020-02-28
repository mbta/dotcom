defmodule Feedback.Mailer do
  @moduledoc false

  require Logger

  @spec send_heat_ticket(Feedback.Message.t(), [map()]) :: {:ok, any} | {:error, any}
  def send_heat_ticket(message, photo_info) do
    request_response = if message.request_response, do: "Yes", else: "No"

    _ =
      if message.request_response do
        Logger.info("HEAT Ticket submitted by #{format_email(message.email)}")
      end

    body = """
    <INCIDENT>
      <SERVICE>#{message.service}</SERVICE>
      <CATEGORY>Other</CATEGORY>
      <TOPIC></TOPIC>
      <SUBTOPIC></SUBTOPIC>
      <MODE></MODE>
      <LINE></LINE>
      <STATION></STATION>
      <INCIDENTDATE>#{formatted_utc_timestamp()}</INCIDENTDATE>
      <VEHICLE></VEHICLE>
      <FIRSTNAME>#{format_first_name(message.name)}</FIRSTNAME>
      <LASTNAME>#{format_last_name(message.name)}</LASTNAME>
      <FULLNAME>#{format_name(message.name)}</FULLNAME>
      <CITY></CITY>
      <STATE></STATE>
      <ZIPCODE></ZIPCODE>
      <EMAILID>#{format_email(message.email)}</EMAILID>
      <PHONE>#{message.phone}</PHONE>
      <DESCRIPTION>#{message.comments}</DESCRIPTION>
      <CUSTREQUIRERESP>#{request_response}</CUSTREQUIRERESP>
      <MBTASOURCE>Auto Ticket 2</MBTASOURCE>
    </INCIDENT>
    """

    message =
      if photo_info do
        photo_info
        |> Enum.reduce(
          Mail.build_multipart(),
          fn attachment, message -> Mail.put_attachment(message, attachment) end
        )
      else
        Mail.build()
      end

    message =
      message
      |> Mail.put_to(Application.get_env(:feedback, :support_ticket_to_email))
      |> Mail.put_from(Application.get_env(:feedback, :support_ticket_from_email))
      |> Mail.put_subject("MBTA Customer Comment Form")
      |> Mail.put_text(body)

    exaws_perform_fn =
      Application.get_env(:feedback, :exaws_perform_fn, &ExAws.Operation.perform/2)

    {:ok, _} =
      message
      |> Mail.Renderers.RFC2822.render()
      |> ExAws.SES.send_raw_email()
      |> exaws_perform_fn.(ExAws.Config.new(:ses))
  end

  defp format_name(nil) do
    "Riding Public"
  end

  defp format_name(name) do
    case String.trim(name) do
      "" -> "Riding Public"
      name -> name
    end
  end

  defp format_first_name(nil) do
    "Riding"
  end

  defp format_first_name(name) do
    case String.trim(name) do
      "" -> "Riding"
      name -> name
    end
  end

  defp format_last_name(nil) do
    "Public"
  end

  defp format_last_name(name) do
    case String.trim(name) do
      "" -> "Public"
      _name -> "-"
    end
  end

  defp format_email(nil) do
    Application.get_env(:feedback, :support_ticket_reply_email)
  end

  defp format_email(email) do
    case String.trim(email) do
      "" -> Application.get_env(:feedback, :support_ticket_reply_email)
      email -> email
    end
  end

  defp formatted_utc_timestamp do
    time_fetcher = Application.get_env(:feedback, :time_fetcher) || DateTime

    time_fetcher.utc_now
    |> Timex.format!("{0M}/{0D}/{YYYY} {h24}:{m}")
  end
end
