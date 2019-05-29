defmodule SiteWeb.OldSiteFileController do
  @moduledoc """
  Makes sure that URLs to static files from the old site continue to work.
  """
  use SiteWeb, :controller
  import SiteWeb.Router.Helpers

  @config Application.get_env(:site, OldSiteFileController)
  @response_fn @config[:response_fn]
  @s3_files ["feed_info.txt", "MBTA_GTFS.zip"]

  def archived_files(conn, _params) do
    new_url = s3_file_url("archive/archived_feeds.txt")
    respond(conn, new_url)
  end

  def images(conn, _params) do
    # always send images. Normally, we'd handle them by a direct send_file/3
    # from Plug.Static (we have our own images), but for ones that fall
    # through, we should be redirecting them.
    new_url = old_site_file_url(conn.request_path)
    send_file(conn, new_url)
  end

  def uploaded_files(conn, %{"path" => [file_name]}) when file_name in @s3_files do
    new_url = s3_file_url(file_name)
    respond(conn, new_url)
  end

  def uploaded_files(conn, _params) do
    new_url = old_site_file_url(conn.request_path)
    respond(conn, new_url)
  end

  @doc "Default behavior for dev/test: fetches the file directly"
  def send_file(conn, {host, path}) do
    full_url = "#{host}#{path}"
    SiteWeb.ControllerHelpers.forward_static_file(conn, full_url)
  end

  @doc "Behavior for prod: redirects through the CDN"
  def redirect_through_cdn(conn, {_host, path}) do
    url = static_url(SiteWeb.Endpoint, path)

    conn
    |> put_status(301)
    |> redirect(external: url)
  end

  defp respond(conn, new_url) do
    {m, f} = @response_fn
    apply(m, f, [conn, new_url])
  end

  defp old_site_file_url(request_path) do
    host = :site |> Application.get_env(:former_mbta_site) |> Keyword.get(:host)
    {host, request_path}
  end

  defp s3_file_url(file_name) do
    bucket_name = bucket_name(@config[:gtfs_s3_bucket])
    {"https://#{bucket_name}.s3.amazonaws.com", "/" <> URI.encode(file_name)}
  end

  defp bucket_name({:system, env_var, default}) do
    if value = System.get_env(env_var), do: value, else: default
  end
end
