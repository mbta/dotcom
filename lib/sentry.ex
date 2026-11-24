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
  # Plug.CSRFProtection.InvalidCSRFTokenError is returned when the server can't
  # validate a CSRF token, most often because their browser session cookie was
  # lost, expired, or no longer matches the token embedded in the page. Bots or
  # translation proxies that alter or replay the request can also cause it.
  defp exclude_exception?(%Plug.CSRFProtection.InvalidCSRFTokenError{}), do: true

  # Phoenix.NotAcceptableError is returned when the client requests an unsupported format, we don't need to report these
  defp exclude_exception?(%Phoenix.NotAcceptableError{}), do: true
  # Not found errors are rendered as 404 responses by the router and don't need to be reported
  defp exclude_exception?(%DotcomWeb.NotFoundError{}), do: true
  # Exclude Redis connection/disconnection from Sentry
  defp exclude_exception?(%Redix.ConnectionError{}), do: true
  defp exclude_exception?(_exception), do: false
end
