defmodule Feedback.Repo do
  @moduledoc "module to send a HEAT ticket with optional attachments"
  require Logger

  @spec send_ticket(Feedback.Message.t()) :: {:ok, any} | {:error, any}
  def send_ticket(message) do
    Feedback.Mailer.send_heat_ticket(message, photo_attachment(message.photos))
  end

  @spec photo_attachment([Plug.Upload.t()]) :: [%{path: String.t(), filename: String.t()}] | nil
  def photo_attachment([%Plug.Upload{} | _rest] = photos) do
    attachments =
      Enum.reduce(photos, [], fn %Plug.Upload{path: path, filename: filename}, acc ->
        case File.read(path) do
          {:ok, uploaded_file} ->
            [{filename, uploaded_file} | acc]

          _ ->
            # Sometimes a file isn't successfully uploaded. Ignore it here so that we can still send the email
            _ = Logger.warn("module=#{__MODULE__} error=failed_photo_attachment")

            acc
        end
      end)

    if Enum.empty?(attachments), do: nil, else: attachments
  end

  def photo_attachment(nil), do: nil
end
