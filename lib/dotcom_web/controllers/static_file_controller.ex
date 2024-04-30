defmodule DotcomWeb.StaticFileController do
  use DotcomWeb, :controller

  @config Application.compile_env!(:dotcom, StaticFileController)
  @response_fn @config[:response_fn]

  def index(conn, _params) do
    {m, f} = @response_fn
    apply(m, f, [conn])
  end

  def send_file(conn) do
    full_url = cms_api_base_url() <> conn.request_path

    forward_static_file(conn, full_url)
  end

  def redirect_through_cdn(conn) do
    url = static_url(DotcomWeb.Endpoint, conn.request_path)

    conn
    |> put_status(301)
    |> redirect(external: url)
  end

  defp cms_api_base_url() do
    if config = Application.get_env(:dotcom, :cms_api) do
      config[:base_url]
    else
      Application.get_env(:dotcom, :drupal)[:cms_root]
    end
  end
end
