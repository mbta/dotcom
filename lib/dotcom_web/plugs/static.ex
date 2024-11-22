defmodule DotcomWeb.Plugs.Static do
  @moduledoc """
  Configure Plug.Static for Dotcom
  """

  use Plug.Builder

  import Phoenix.Controller, only: [redirect: 2]

  alias DotcomWeb.Plugs.SecureHeaders

  # A very simplified Content Security Policy for static files served by this
  # application. We actually serve styles and scripts from our CDN, covered by
  # the Content Security Policy generated in DotcomWeb.Plugs.SecureHeaders
  @static_csp "default-src 'none'; img-src 'self'; font-src 'self';"

  plug(:check_if_apple_touch_icon_request)

  plug(
    Plug.Static,
    at: "/",
    from: :dotcom,
    gzip: Mix.env() == :prod,
    headers:
      SecureHeaders.default_secure_headers()
      |> Map.put("access-control-allow-origin", "*")
      |> Map.put("content-security-policy", @static_csp),
    cache_control_for_etags: "max-age=86400",
    only: DotcomWeb.static_paths(),
    only_matching: ~w(favicon apple-touch-icon)
  )

  @spec check_if_apple_touch_icon_request(Plug.Conn.t(), []) :: Plug.Conn.t()
  def check_if_apple_touch_icon_request(conn, _) do
    redirect_if_apple_touch_icon(conn.request_path, conn)
  end

  @spec redirect_if_apple_touch_icon(String.t(), Plug.Conn.t()) :: Plug.Conn.t()
  def redirect_if_apple_touch_icon("/apple-touch-icon-" <> _, conn) do
    conn
    |> redirect(to: "/apple-touch-icon.png")
    |> halt()
  end

  def redirect_if_apple_touch_icon(_, conn) do
    conn
  end
end
