defmodule DotcomWeb.MbtaGoDeepLinkController do
  @moduledoc false

  use DotcomWeb, :controller

  def root(conn, params) do
    DotcomWeb.AppStoreController.redirect_mbta_go(conn, params)
  end

  def apple_app_site_association(conn, _params) do
    json(conn, %{
      applinks: %{
        details: [
          %{
            appIDs: [Util.config(:dotcom, :mbta_go, :ios_appid)],
            components: [
              %{/: "/go"},
              %{/: "/go/*"}
            ]
          }
        ]
      }
    })
  end

  def assetlinks_json(conn, _params) do
    json(conn, [
      %{
        relation: ["delegate_permission/common.handle_all_urls"],
        target: %{
          namespace: "android_app",
          package_name: Util.config(:dotcom, :mbta_go, :android_package_name),
          sha256_cert_fingerprints: [Util.config(:dotcom, :mbta_go, :android_cert_fingerprint)]
        }
      }
    ])
  end
end
