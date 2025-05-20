defmodule DotcomWeb.StaticFileController do
  use DotcomWeb, :controller

  def index(conn, _params) do
    if Application.get_env(:dotcom, :is_prod_env?) do
      redirect_through_cdn(conn)
    else
      send_file(conn)
    end
  end

  def send_file(conn) do
    full_url = Application.get_env(:dotcom, :cms_api)[:base_url] <> conn.request_path

    forward_static_file(conn, full_url)
  end

  def redirect_through_cdn(conn) do
    url = CMS.Helpers.rewrite_url(conn.request_path)

    conn
    |> put_status(301)
    |> redirect(external: url)
  end
end
