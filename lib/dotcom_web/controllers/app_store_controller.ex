defmodule DotcomWeb.AppStoreController do
  @moduledoc """
  Redirects users to the appropriate app store (ios or android) based on
  their brower. When neither store is appropriate, redirects to a project page.
  """
  use DotcomWeb, :controller
  import Browser

  def redirect_mbta_go(conn, params) do
    conn
    |> redirect_to_app_store(params)
    |> halt
  end

  defp redirect_to_app_store(conn, params) do
    config = Application.get_env(:dotcom, :mbta_go_app)

    cond do
      Browser.ios?(conn) ->
        redirect(conn, external: ios_campaign_url(config[:ios_store_base_url], params))

      Browser.android?(conn) ->
        redirect(conn, external: android_campaign_url(config[:android_store_base_url], params))

      true ->
        redirect(conn, to: config[:default_project_page])
    end
  end

  defp ios_campaign_url(base_url, params) do
    ios_query_encoded =
      params
      |> Map.take(["pt", "mt", "ct"])
      |> URI.encode_query()

    base_url
    |> URI.parse()
    |> URI.append_query(ios_query_encoded)
    |> URI.to_string()
  end

  defp android_campaign_url(base_url, params) do
    android_query_encoded =
      params
      |> Map.take(["referrer", "utm_source", "utm_campaign"])
      |> URI.encode_query()

    base_url
    |> URI.parse()
    |> URI.append_query(android_query_encoded)
    |> URI.to_string()
  end
end
