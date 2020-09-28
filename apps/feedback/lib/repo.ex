defmodule Feedback.Repo do
  @moduledoc "module to send a HEAT ticket with optional attachments"

  @spec send_ticket(Feedback.Message.t()) :: {:ok, any} | {:error, any}
  def send_ticket(message) do
    Feedback.Mailer.send_heat_ticket(message, photo_attachment(message.photos))
  end

  @spec photo_attachment([Plug.Upload.t()]) :: [%{path: String.t(), filename: String.t()}] | nil
  def photo_attachment([%Plug.Upload{} | _rest] = photos) do
    Enum.map(photos, fn %Plug.Upload{path: path, filename: filename} ->
      {filename, File.read!(path)}
    end)
  end

  def photo_attachment(nil), do: nil
end
