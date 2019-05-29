defmodule SiteWeb.StyleGuideControllerTest do
  use Site.Components.Register
  use SiteWeb.ConnCase

  test "unknown top level pages return a 404", %{conn: conn} do
    conn = get(conn, "style-guide/i_dont_exist")
    assert html_response(conn, 404)
  end

  test "top level renders index", %{conn: conn} do
    conn = get(conn, "style-guide")
    assert html_response(conn, 200) =~ "MBTA Tech Style Guide"
  end

  test "/style-guide/content redirects to /cms/content-style-guide", %{conn: conn} do
    conn = get(conn, "style-guide/content")
    assert html_response(conn, 302) =~ "/cms/content-style-guide"
  end

  test "/style-guide/components/* redirects to invision dsg", %{conn: conn} do
    conn = get(conn, "/style-guide/components/typography")
    assert html_response(conn, 301)
  end

  test "old /style-guide/content/* links redirect to /cms/content-style-guide/", %{conn: conn} do
    old_sections = ["audience_goals_tone", "grammar_and_mechanics", "terms"]

    for section_string <- old_sections do
      conn = get(conn, "/style-guide/content/#{section_string}")
      assert html_response(conn, 302) =~ "/cms/content-style-guide"
    end
  end
end
