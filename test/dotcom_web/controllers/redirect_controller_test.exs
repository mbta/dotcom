defmodule DotcomWeb.RedirectControllerTest do
  use DotcomWeb.ConnCase

  test "redirects all requests", %{conn: conn} do
    conn = get(conn, redirect_path(conn, :show, ["foo", "bar"]))
    assert redirected_to(conn, 302) == "/foo/bar"
  end
end
