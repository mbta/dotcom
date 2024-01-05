defmodule Feedback.Test do
  @moduledoc false

  def latest_message do
    file = Application.get_env(:dotcom, :test_mail_file)
    body = File.read!(file)

    case Poison.decode(body) do
      {:ok, parsed} ->
        parsed

      _ ->
        raise "Error parsing test mail file: #{inspect(body)}"
    end
  end

  def mock_config(:ses) do
    :ok
  end

  def mock_perform(%{params: %{"RawMessage.Data" => raw_message}}, _config) do
    parsed_message = raw_message |> Base.decode64!() |> Mail.Parsers.RFC2822.parse()

    attachments =
      if parsed_message.multipart do
        tl(parsed_message.parts)
      else
        []
      end

    message_json =
      %{
        to: parsed_message.headers["to"],
        text: parsed_message.body,
        attachments: attachments |> Enum.map(&simplify_attachment/1)
      }
      |> Poison.encode!()

    file = Application.get_env(:dotcom, :test_mail_file)
    File.write!(file, message_json)

    {:ok, :status_info_that_gets_ignored_by_caller}
  end

  defp simplify_attachment(%Mail.Message{
         body: data,
         headers: %{"content-disposition" => ["attachment", {"filename", filename}]}
       }) do
    %{"filename" => filename, "data" => Base.encode64(data)}
  end
end
