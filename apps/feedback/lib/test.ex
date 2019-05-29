defmodule Feedback.Test do
  def latest_message do
    file = Application.get_env(:feedback, :test_mail_file)
    body = File.read!(file)

    case Poison.decode(body) do
      {:ok, parsed} ->
        parsed

      _ ->
        raise "Error parsing test mail file: #{inspect(body)}"
    end
  end
end
