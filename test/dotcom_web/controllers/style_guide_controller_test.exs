defmodule DotcomWeb.StyleGuideControllerTest do
  use Dotcom.Components.Register
  use DotcomWeb.ConnCase

  test "unknown top level pages return a 404", %{conn: conn} do
    conn = get(conn, "/style-guide/i_dont_exist")
    assert html_response(conn, 404)
  end

  test "top level redirects to zeroheight landing page", %{conn: conn} do
    conn = get(conn, "/style-guide")
    assert redirected_to(conn, 301) =~ "https://zeroheight.com/2fedee66c"
  end

  test "/style-guide/content redirects to zeroheight content page", %{conn: conn} do
    conn = get(conn, "/style-guide/content")
    assert redirected_to(conn, 301) =~ "https://zeroheight.com/2fedee66c/p/43fa10"
  end

  test "/style-guide/components/* redirects to zeroheight", %{conn: conn} do
    conn = get(conn, "/style-guide/components/typography")
    assert redirected_to(conn, 301) =~ "https://zeroheight.com/2fedee66c/p/36e5cc"
  end

  test "old /style-guide/content/* links redirect to zeroheight content page", %{conn: conn} do
    old_sections = ["audience_goals_tone", "grammar_and_mechanics", "terms"]

    for section_string <- old_sections do
      conn = get(conn, "/style-guide/content/#{section_string}")
      assert redirected_to(conn, 301) =~ "https://zeroheight.com/2fedee66c/p/43fa10"
    end
  end
end
