defmodule DotcomWeb.LayoutViewTest do
  use DotcomWeb.ConnCase, async: true

  import Phoenix.HTML

  import DotcomWeb.LayoutView

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
      assert html_string =~ "<a class=\"m-menu__link\" data-nav=\"link\" href=\"/page\">"
    end

    test "renders icon for external links" do
      {:safe, html} = render_nav_link({"Title", "/page", :external_link})
      html_string = IO.iodata_to_binary(html)

      assert html_string =~
               "<span><i aria-hidden=\"true\" class=\"notranslate fa fa-external-link \"></i></span>"
    end

    test "does not render icon for other links" do
      {:safe, html} = render_nav_link({"Title", "/page", :internal_link})
      html_string = IO.iodata_to_binary(html)

      refute html_string =~
               "<span><i aria-hidden=\"true\" class=\"notranslate fa fa-external-link \"></i></span>"
    end
  end

  describe "desktop navigation" do
    test "labels each submenu group with its visible section heading" do
      document =
        DotcomWeb.LayoutView
        |> Phoenix.View.render_to_string("_new_nav_desktop.html", locale: "en")
        |> Floki.parse_document!()

      groups = Floki.find(document, ".m-menu-dropdown__submenu-section")

      section_names =
        for %{sub_menus: sub_menus} <- nav_link_content(),
            %{links: _, sub_menu_section: name} <- sub_menus,
            do: name

      assert length(groups) == length(section_names)
      assert groups != []

      heading_ids =
        for {group, name} <- Enum.zip(groups, section_names) do
          assert Floki.attribute(group, "role") == ["group"]
          assert Floki.attribute(group, "aria-label") == []
          assert [heading_id] = Floki.attribute(group, "aria-labelledby")
          assert [heading] = Floki.find(document, "[id='#{heading_id}']")
          assert String.trim(Floki.text(heading)) == name

          assert [_] =
                   Floki.find(
                     document,
                     ".m-menu__section-heading[id='#{heading_id}'] + " <>
                       ".m-menu-dropdown__submenu-section[aria-labelledby='#{heading_id}']"
                   )

          heading_id
        end

      assert length(heading_ids) == length(Enum.uniq(heading_ids))
    end
  end

  describe "language navigation" do
    test "labels the language group with its visible section heading" do
      document =
        DotcomWeb.LayoutView
        |> Phoenix.View.render_to_string("_top_tier_nav.html", %{})
        |> Floki.parse_document!()

      assert [group] = Floki.find(document, ".m-menu-dropdown__submenu-section")
      assert Floki.attribute(group, "role") == ["group"]
      assert Floki.attribute(group, "aria-label") == []
      assert [heading_id] = Floki.attribute(group, "aria-labelledby")

      assert [_] =
               Floki.find(
                 document,
                 ".m-menu__section-heading[id='#{heading_id}'] + " <>
                   ".m-menu-dropdown__submenu-section[aria-labelledby='#{heading_id}']"
               )

      assert [heading] = Floki.find(document, "[id='#{heading_id}']")
      assert String.trim(Floki.text(heading)) == "Choose Your Language"
    end
  end
end
