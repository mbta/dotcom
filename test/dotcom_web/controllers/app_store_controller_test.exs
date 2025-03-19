defmodule DotcomWeb.AppStoreControllerTest do
  use DotcomWeb.ConnCase, async: true
  import Test.Support.EnvHelpers

  test "redirects to default project page by default", %{conn: conn} do
          reassign_env(:dotcom, :mbta_go_app, default_project_page: "/default_project_page")


        conn = get(conn, app_store_path(conn,:redirect_mbta_go, %{"pt" => "fake pt", "ct" => "fake ct", "mt" => "fake-mt"}))
     assert redirected_to(conn, 302) =~ "/default_project_page"
  end

    test "redirects to app store for ios browser", %{conn: conn} do
          reassign_env(:dotcom, :mbta_go_app, ios_store_base_url: "fake_app_store_url?")
        conn =
          conn
          |> put_req_header("user-agent", "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/1A542a Safari/419.3")
          |> get(app_store_path(conn,:redirect_mbta_go, %{"pt" => "fake pt", "ct" => "fake ct", "mt" => "fake-mt"}))
     assert redirected_to(conn, 302) =~ "fake_app_store_url?ct=fake+ct&mt=fake-mt&pt=fake+pt"
  end

   test "redirects to app store for android browser", %{conn: conn} do
          reassign_env(:dotcom, :mbta_go_app, android_store_base_url: "fake_app_store_url?id=already_set")


        conn =
          conn
          |> put_req_header("user-agent", "Android SDK 1.5r3: Mozilla/5.0 (Linux; U; Android 1.5; de-; sdk Build/CUPCAKE) AppleWebkit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1")
          |> get(app_store_path(conn,:redirect_mbta_go, %{"referrer" => "fake referrer", "utm_source" => "fake utm source", "utm_campaign" => "fake-utm-campaign"}))
     assert redirected_to(conn, 302) =~ "fake_app_store_url?id=already_set&referrer=fake+referrer&utm_campaign=fake-utm-campaign&utm_source=fake+utm+source"
  end
end
