defmodule Dotcom.Sentry do
  @moduledoc """
  Preventing some errors to be sent to Sentry.
  """

  @spec before_send(Sentry.Event.t()) :: Sentry.Event.t() | nil
  def before_send(event) do
    if not exclude_exception?(event.original_exception) do
      event
    end
  end

  # Normal client disconnections can be safely ignored, see https://github.com/mtrudel/bandit/issues/456
  defp exclude_exception?(%Bandit.TransportError{}), do: true

  # Phoenix.NotAcceptableError is returned when the client requests an unsupported format, we don't need to report these
  defp exclude_exception?(%Phoenix.NotAcceptableError{}), do: true
  # Not found errors are rendered as 404 responses by the router and don't need to be reported
  defp exclude_exception?(%DotcomWeb.NotFoundError{}), do: true
  # Exclude Redis connection/disconnection from Sentry
  defp exclude_exception?(%Redix.ConnectionError{}), do: true
  defp exclude_exception?(_exception), do: false
end
