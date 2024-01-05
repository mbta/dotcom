defmodule DotcomWeb.StaticFileController do
  use DotcomWeb, :controller

  alias CMS.Config

  @config Application.compile_env!(:dotcom, StaticFileController)
  @response_fn @config[:response_fn]

  def index(conn, _params) do
    {m, f} = @response_fn
    apply(m, f, [conn])
  end

  def send_file(conn) do
    full_url = Config.url(conn.request_path)
    forward_static_file(conn, full_url)
  end

  def redirect_through_cdn(conn) do
    url = static_url(DotcomWeb.Endpoint, conn.request_path)

    conn
    |> put_status(301)
    |> redirect(external: url)
  end
end
