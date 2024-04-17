defmodule Feedback.MockAws do
  @moduledoc """
  Mock ExAws functions so that we aren't dependent on AWS in development.
  """
  require Logger

  alias Mail.Parsers.RFC2822

  def config(:ses) do
    :ok
  end

  def perform(%{params: %{"RawMessage.Data" => raw_message}}, _config) do
    _ =
      raw_message
      |> Base.decode64!()
      |> RFC2822.parse()
      |> log_email()

    {:ok, :status_info_that_gets_ignored_by_caller}
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
