defmodule DotcomWeb.MbtaGoDeepLinkControllerTest do
  use DotcomWeb.ConnCase, async: true
  import Test.Support.EnvHelpers

  describe "root" do
    test "redirects to default project page by default, preserving params", %{conn: conn} do
      conn = get(conn, mbta_go_deep_link_path(conn, :root, %{"param_1" => "val_1"}))

      assert redirected_to(conn, 302) =~ "/goapp?param_1=val_1"
    end

    test "redirects to app store for ios browser", %{conn: conn} do
      conn =
        conn
        |> put_req_header(
          "user-agent",
          "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/1A542a Safari/419.3"
        )
        |> get(
          mbta_go_deep_link_path(conn, :root, %{
            "mt" => "fake-mt",
            "ct" => "fake ct",
            "pt" => "fake pt",
            "extra" => "other param"
          })
        )

      redirected_to = redirected_to(conn, 302)
      assert redirected_to =~ "https://apps.apple.com"
      assert redirected_to =~ "?pt=fake%20pt&ct=fake%20ct&mt=fake-mt"
    end

    test "redirects to app store for android browser", %{conn: conn} do
      conn =
        conn
        |> put_req_header(
          "user-agent",
          "Android SDK 1.5r3: Mozilla/5.0 (Linux; U; Android 1.5; de-; sdk Build/CUPCAKE) AppleWebkit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1"
        )
        |> get(
          mbta_go_deep_link_path(conn, :root, %{
            "referrer" => "fake referrer",
            "utm_source" => "fake utm source",
            "utm_campaign" => "fake-utm-campaign"
          })
        )

      redirected_to = redirected_to(conn, 302)
      assert redirected_to =~ "https://play.google.com"

      assert redirected_to =~
               "&referrer=fake%20referrer&utm_campaign=fake-utm-campaign&utm_source=fake%20utm%20source"
    end
  end

  defp reverse_domain_name() do
    Faker.Internet.domain_name() |> String.split(".") |> Enum.reverse() |> Enum.join(".")
  end

  describe "Android deep link approval" do
    test "works when configured", %{conn: conn} do
      package_name = reverse_domain_name()

      cert_fingerprint =
        1..32
        |> Enum.map_join(":", fn _ ->
          Faker.random_between(0x00, 0xFF) |> Integer.to_string(16) |> String.pad_leading(2, "0")
        end)

      reassign_env(:dotcom, :mbta_go,
        android_package_name: package_name,
        android_cert_fingerprint: cert_fingerprint
      )

      conn = conn |> get("/.well-known/assetlinks.json")

      assert json_response(conn, 200) == [
               %{
                 "relation" => ["delegate_permission/common.handle_all_urls"],
                 "target" => %{
                   "namespace" => "android_app",
                   "package_name" => package_name,
                   "sha256_cert_fingerprints" => [cert_fingerprint]
                 }
               }
             ]
    end

    test "does not crash if not configured", %{conn: conn} do
      reassign_env(:dotcom, :mbta_go, android_package_name: nil, android_cert_fingerprint: nil)

      conn = conn |> get("/.well-known/assetlinks.json")

      assert json_response(conn, 200)
    end
  end

  describe "iOS deep link approval" do
    test "serves iOS deep link approval", %{conn: conn} do
      appid = "#{Faker.String.base64()}.#{reverse_domain_name()}"
      reassign_env(:dotcom, :mbta_go, ios_appid: appid)

      conn = conn |> get("/.well-known/apple-app-site-association")

      assert json_response(conn, 200) == %{
               "applinks" => %{
                 "details" => [
                   %{
                     "appIDs" => [appid],
                     "components" => [
                       %{"/" => "/go"},
                       %{"/" => "/go/*"}
                     ]
                   }
                 ]
               }
             }
    end

    test "does not crash if iOS deep link approval not configured", %{conn: conn} do
      reassign_env(:dotcom, :mbta_go, ios_appid: nil)

      conn = conn |> get("/.well-known/apple-app-site-association")

      assert json_response(conn, 200)
    end
  end
end
