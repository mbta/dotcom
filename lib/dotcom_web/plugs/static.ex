defmodule DotcomWeb.Plugs.Static do
  @moduledoc """
  Configure Plug.Static for Dotcom
  """

  use Plug.Builder

  import Phoenix.Controller, only: [redirect: 2]

  plug(:check_if_apple_touch_icon_request)
  plug(DotcomWeb.Plugs.SecureHeaders)

  plug(
    Plug.Static,
    at: "/",
    from: :dotcom,
    gzip: Mix.env() == :prod,
    headers: %{"access-control-allow-origin" => "*"},
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
