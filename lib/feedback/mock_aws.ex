defmodule Feedback.MockAws do
  @moduledoc """
  Mock AWS functions so that we aren't dependent on AWS in development.
  """
  require Logger

  alias Mail.{Encoders.Base64, Parsers.RFC2822}

  def send_email(%{"RawMessage" => %{"Data" => raw_message}}) do
    _ =
      raw_message
      |> Base64.decode()
      |> RFC2822.parse()
      |> log_email()

    {:ok, :status_info_that_gets_ignored_by_caller, :ok}
  end

  defp log_email(%Mail.Message{headers: %{"to" => to}, body: body}) do
    Logger.info(fn ->
      """

      MOCK EMAIL

      To: #{to}

      Body:
      #{body}

      """
    end)
  end
end
