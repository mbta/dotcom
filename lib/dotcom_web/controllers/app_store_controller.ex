defmodule DotcomWeb.AppStoreController do
  @moduledoc """
  Redirects users to the appropriate app store (ios or android) based on
  their brower. When neither store is appropriate, redirects to a project page.
  """
  use DotcomWeb, :controller

  @go_android_store_base_url "https://play.google.com/store/apps/details?id=com.mbta.tid.mbta_app"
  @go_ios_store_base_url "https://apps.apple.com/app/apple-store/id6472726821"
  @go_default_project_page "/goapp"

  @mticket_android_store_base_url "https://play.google.com/store/apps/details?id=com.mbta.mobileapp"
  @mticket_ios_store_base_url "https://apps.apple.com/us/app/apple-store/id560487958"
  @mticket_default_project_page "/mbta-endorsed-apps"

  def redirect_mbta_go(conn, params) do
    conn
    |> redirect_to_app_store(params, @go_ios_store_base_url, @go_android_store_base_url, @go_default_project_page)
    |> halt
  end

  def redirect_mticket(conn, params) do
    conn
    |> redirect_to_app_store(params, @mticket_ios_store_base_url, @mticket_android_store_base_url, @mticket_default_project_page)
    |> halt
  end

  defp redirect_to_app_store(conn, params, ios_url, android_url, desktop_url) do
    cond do
      Browser.ios?(conn) ->
        redirect(conn,
          external: campaign_url(ios_url, ios_params(params))
        )

      Browser.android?(conn) ->
        redirect(conn, external: campaign_url(android_url, params))

      true ->
        redirect(conn, to: campaign_url(desktop_url, params))
    end
  end

  defp campaign_url(base_url, params) do
    encoded_params = URI.encode_query(params, :rfc3986)

    base_url
    |> URI.parse()
    |> URI.append_query(encoded_params)
    |> URI.to_string()
  end

  # Order the params as iOS expects and ignore any extraneous params
  defp ios_params(param_map) do
    [
      pt: param_map["pt"],
      ct: param_map["ct"],
      mt: param_map["mt"]
    ]
  end
end
