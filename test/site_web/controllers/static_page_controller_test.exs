defmodule SiteWeb.StaticPageControllerTest do
  use SiteWeb.ConnCase

  test "/getting-around", %{conn: conn} do
    assert conn
           |> get("/getting-around")
           |> html_response(200) =~ "Getting Around"
  end

  test "/about", %{conn: conn} do
    assert conn
           |> get("/about")
           |> html_response(200) =~ "About"
  end

  test "sets a custom meta description", %{conn: conn} do
    conn = get(conn, "/about")
    assert conn.assigns.meta_description
  end

  describe "build_breadcrumb/1" do
    test "builds a breadcrumb from an atom" do
      assert SiteWeb.StaticPageController.build_breadcrumb(:getting_around) ==
               [%Util.Breadcrumb{text: "Getting Around", url: ""}]
    end
  end
end
