defmodule Feedback.Test do
  @moduledoc false

  alias Mail.Parsers.RFC2822

  def latest_message do
    file = Application.get_env(:dotcom, :test_mail_file)
    body = File.read!(file)

    case Jason.decode(body) do
      {:ok, parsed} ->
        parsed

      _ ->
        raise "Error parsing test mail file: #{inspect(body)}"
    end
  end

  def send_email(%{"RawMessage" => %{"Data" => raw_message}}) do
    parsed_message = raw_message |> Mail.Encoders.Base64.decode() |> RFC2822.parse()

    attachments =
      if parsed_message.multipart do
        tl(parsed_message.parts)
      else
        []
      end

    message =
      %{
        to: parsed_message.headers["to"],
        text: parsed_message.body,
        attachments: Enum.map(attachments, &simplify_attachment/1)
      }

    file = Application.get_env(:dotcom, :test_mail_file)
    File.write!(file, Jason.encode!(message))

    {:ok, message, %{}}
  end

  defp simplify_attachment(%Mail.Message{
         body: data,
         headers: %{"content-disposition" => ["attachment", {"filename", filename}]}
       }) do
    %{"filename" => filename, "data" => Base.encode64(data)}
  end
end
