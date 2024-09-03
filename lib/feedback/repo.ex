defmodule Feedback.Repo do
  @moduledoc "module to send a HEAT ticket with optional attachments"
  require Logger

  @spec send_ticket(Feedback.Message.t()) :: {:ok, any, any} | {:error, any}
  def send_ticket(message) do
    result = Feedback.Mailer.send_heat_ticket(message, message.photos)

    case result do
      {:ok, _, _} ->
        Logger.info("module=#{__MODULE__} HEAT Ticket successfully sent.")

      {:error, error} ->
        _ = Logger.error("module=#{__MODULE__} error=#{inspect(error)}")
    end

    result
  end
end
