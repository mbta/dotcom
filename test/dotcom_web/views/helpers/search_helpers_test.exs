defmodule DotcomWeb.SearchHelpersTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.SearchHelpers

  describe "desktop_form/2" do
    test "renders with default text", %{conn: conn} do
      conn =
        get(conn, search_path(conn, :index, %{"search" => %{"query" => "Search Query Format"}}))

      response = Phoenix.HTML.safe_to_string(desktop_form(conn, conn.params))
      assert response =~ "Search Query Format"
    end

    test "renders with search param as a string", %{conn: conn} do
      conn = get(conn, search_path(conn, :index, %{"search" => "String Value"}))
      response = Phoenix.HTML.safe_to_string(desktop_form(conn, conn.params))
      refute response =~ "String Value"
    end

    test "renders without default text, ignore querystring", %{conn: conn} do
      conn =
        get(conn, search_path(conn, :index, %{"search" => %{"query" => "Search Query Format"}}))

      response = Phoenix.HTML.safe_to_string(desktop_form(conn, %{}))
      refute response =~ "Search Query Format"
    end
  end
end
