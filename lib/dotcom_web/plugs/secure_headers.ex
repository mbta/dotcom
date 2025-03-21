defmodule DotcomWeb.Plugs.SecureHeaders do
  @moduledoc """
  Configure secure headers for Dotcom
  """

  use Plug.Builder

  import Phoenix.Controller, only: [put_secure_browser_headers: 2]

  plug(:put_secure_browser_headers, %{
    "strict-transport-security" => "max-age=31536000",
    "x-content-type-options" => "nosniff",
    "x-frame-options" => "SAMEORIGIN",
    "x-xss-protection" => "1; mode=block"
  })
end
