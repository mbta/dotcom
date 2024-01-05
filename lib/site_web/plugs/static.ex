defmodule SiteWeb.Plugs.Static do
  use Plug.Builder
  import Phoenix.Controller, only: [redirect: 2]

  plug(:check_if_apple_touch_icon_request)

  plug(
    Plug.Static,
    at: "/",
    from: :dotcom,
    gzip: true,
    headers: %{"access-control-allow-origin" => "*"},
    cache_control_for_etags: "public, max-age=86400",
    only:
      ~w(css fonts images js robots.txt google778e4cfd8ca77f44.html loaderio-b4c35b9431db61b4421fcf03e17c3818 loaderio-392aa6a67825336b70393c6be61d56ce),
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
