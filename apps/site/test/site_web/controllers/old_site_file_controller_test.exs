defmodule SiteWeb.OldSiteFileControllerTest do
  use SiteWeb.ConnCase

  describe "/uploadedfiles" do
    test "can return a file with spaces in the URL", %{conn: conn} do
      conn =
        head(
          conn,
          "/uploadedfiles/Documents/Schedules_and_Maps/Rapid%20Transit%20w%20Key%20Bus.pdf"
        )

      assert conn.status == 200
    end

    test "can return file from /uploadedimages", %{conn: conn} do
      conn =
        head(conn, "/uploadedimages/About_the_T/Art_Collection/Map%20Runner%20Up%2015%20lg.jpg")

      assert conn.status == 200
    end

    test "can return file from /uploadedImages", %{conn: conn} do
      conn = head(conn, "/uploadedImages/services/subway/braintree_station.jpg")
      assert conn.status == 200
    end

    test "can return file from /lib", %{conn: conn} do
      conn = head(conn, "/lib/css/T-Tracker.css")
      assert conn.status == 200
    end

    test "can return file from /images", %{conn: conn} do
      conn = head(conn, "/images/logo-mbta.gif")
      assert conn.status == 200
    end

    test "returns 404 when uploaded file does not exist", %{conn: conn} do
      conn = head(conn, "/uploadedfiles/file-not-found.txt")
      assert conn.status == 404
    end

    test "returned file does not include content length or powered by", %{conn: conn} do
      conn = head(conn, "/images/logo-mbta.gif")
      assert get_resp_header(conn, "content-length") == []
      assert get_resp_header(conn, "x-powered-by") == []
    end
  end

  describe "/gtfs_archive" do
    test "can return archived file from s3", %{conn: conn} do
      conn = head(conn, "/gtfs_archive/archived_feeds.txt")
      assert conn.status == 200
    end

    test "returns 404 when archived file does not exist", %{conn: conn} do
      conn = head(conn, "/gtfs_archive/file-not-found.txt")
      assert conn.status == 404
    end
  end

  describe "redirect_through_cdn/2" do
    test "ignores the new URL, and redirects to the static_url", %{conn: conn} do
      path = "/request/path"
      expected_path = SiteWeb.Router.Helpers.static_url(SiteWeb.Endpoint, path)
      conn = SiteWeb.OldSiteFileController.redirect_through_cdn(conn, {"host", path})
      assert redirected_to(conn, 301) == expected_path
    end
  end
end
