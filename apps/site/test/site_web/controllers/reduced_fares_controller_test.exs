defmodule SiteWeb.StyleGuideControllerTest do
  use SiteWeb.ConnCase

  test "renders a wrapper page with the requested form embedded in an iframe", %{conn: conn} do
    conn = get(conn, "/reduced-fares/youth-pass")
    rendered = html_response(conn, 200)
    assert rendered =~ "body"
  end

  test "a request for an unknown form returns a 404", %{conn: conn} do
    conn = get(conn, "/reduced-fares/unknown-form")
    assert html_response(conn, 404)
  end
end
