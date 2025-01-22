defmodule DotcomWeb.LayoutViewTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.LayoutView
  import Phoenix.HTML

  describe "bold_if_active/3" do
    test "bold_if_active makes text bold if the current request is made against the given path",
         %{conn: conn} do
      conn = %{conn | request_path: "/schedules/subway"}
      assert bold_if_active(conn, "/schedules", "test") == raw("<strong>test</strong>")
    end

    test "bold_if_active only makes text bold if the current request is made to root path", %{
      conn: conn
    } do
      conn = %{conn | request_path: "/"}
      assert bold_if_active(conn, "/", "test") == raw("<strong>test</strong>")
      assert bold_if_active(conn, "/schedules", "test") == raw("test")
    end
  end

  @tag :external
  test "renders breadcrumbs in the title", %{conn: conn} do
    conn = get(conn, "/schedules/subway")
    body = html_response(conn, 200)

    expected_title = "Subway | Schedules &amp; Maps | MBTA"
    assert body =~ "<title>#{expected_title}</title>"
  end

  describe "render_nav_link/1" do
    test "renders a link" do
      {:safe, html} = render_nav_link({"Title", "/page", :external_link})
      html_string = IO.iodata_to_binary(html)
      assert html_string =~ ~s(<a class="m-menu__link" data-nav="link" href="/page">)
    end

    test "renders icon for external links" do
      {:safe, html} = render_nav_link({"Title", "/page", :external_link})
      html_string = IO.iodata_to_binary(html)

      assert html_string =~
               ~s(<span><i aria-hidden="true" class="notranslate fa fa-external-link "></i></span>)
    end

    test "does not render icon for other links" do
      {:safe, html} = render_nav_link({"Title", "/page", :internal_link})
      html_string = IO.iodata_to_binary(html)

      refute html_string =~
               ~s(<span><i aria-hidden="true" class="notranslate fa fa-external-link "></i></span>)
    end
  end
end
