defmodule DotcomWeb.AppStoreController do
  @moduledoc """
  Redirects users to the appropriate app store (ios or android) based on
  their brower. When neither store is appropriate, redirects to a project page.
  """
  use DotcomWeb, :controller

  @android_store_base_url "https://play.google.com/store/apps/details?id=com.mbta.tid.mbta_app"
  @ios_store_base_url "https://apps.apple.com/app/apple-store/id6472726821?"
  @default_project_page "/goapp"

  def redirect_mbta_go(conn, params) do
    conn
    |> redirect_to_app_store(params)
    |> halt
  end

  defp redirect_to_app_store(conn, params) do
    cond do
      Browser.ios?(conn) ->
        redirect(conn, external: campaign_url(@ios_store_base_url, params))

      Browser.android?(conn) ->
        redirect(conn, external: campaign_url(@android_store_base_url, params))

      true ->
        redirect(conn, to: campaign_url(@default_project_page, params))
    end
  end

  defp campaign_url(base_url, params) do
    encoded_params = URI.encode_query(params)

    base_url
    |> URI.parse()
    |> URI.append_query(encoded_params)
    |> URI.to_string()
  end
end
