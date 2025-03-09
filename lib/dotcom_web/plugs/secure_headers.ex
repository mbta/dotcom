defmodule DotcomWeb.Plugs.SecureHeaders do
  @moduledoc """
  Configures secure browser headers for Dotcom requests.
  """

  @default_secure_headers %{
    "strict-transport-security" => "max-age=31536000",
    "x-content-type-options" => "nosniff",
    "x-frame-options" => "DENY",
    "x-xss-protection" => "1; mode=block"
  }

  @behaviour Plug

  @impl Plug
  def init(opts), do: opts

  @impl Plug
  @spec call(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def call(conn, _) do
    Phoenix.Controller.put_secure_browser_headers(conn, @default_secure_headers)
  end
end
