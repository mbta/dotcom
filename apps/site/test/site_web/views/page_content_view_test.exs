defmodule SiteWeb.CMS.PageViewTest do
  use Site.ViewCase, async: true

  import SiteWeb.CMS.PageView

  alias CMS.Page.{Basic, Project}
  alias CMS.Partial.Paragraph.{ContentList, CustomHTML}
  alias Phoenix.HTML

  describe "render_page/2" do
    test "renders a CMS.Page.Basic with sub-templates", %{conn: conn} do
      paragraph = %Basic{body: HTML.raw("<p>Hello</p>")}

      rendered =
        paragraph
        |> render_page(conn)
        |> HTML.safe_to_string()

      assert rendered =~ "<p>Hello</p>"
    end
  end

  describe "sidebar_classes/2" do
    test "returns appropriate classes for a page with a sidebar" do
      assert sidebar_classes(true, false) == "c-cms--with-sidebar c-cms--sidebar-left"
    end

    test "returns appropriate classes for a page without a sidebar" do
      assert sidebar_classes(false, false) == "c-cms--no-sidebar"
    end

    test "returns appropriate classes for a page with a right rail" do
      assert sidebar_classes(false, true) == "c-cms--with-sidebar c-cms--sidebar-right"
    end

    test "returns only left-sidebar classes for a page with a both left menu and right rail" do
      assert sidebar_classes(true, true) == "c-cms--with-sidebar c-cms--sidebar-left"
    end
  end

  describe "has_right_rail?/1" do
    test "returns true if any paragraphs are for the right rail" do
      page = %Basic{
        paragraphs: [
          %CustomHTML{body: HTML.raw("<p>Hello</p>"), right_rail: false},
          %CustomHTML{body: HTML.raw("<p>world</p>"), right_rail: true}
        ]
      }

      assert has_right_rail?(page)
    end

    test "returns false if no paragraphs are for the right rail" do
      page = %Basic{
        paragraphs: [
          %CustomHTML{body: HTML.raw("<p>Hello</p>"), right_rail: false},
          %CustomHTML{body: HTML.raw("<p>world</p>"), right_rail: false}
        ]
      }

      refute has_right_rail?(page)
    end

    test "returns false if ContentList paragraph is right rail, but has no results" do
      page = %Basic{
        paragraphs: [
          %ContentList{
            header: %CustomHTML{body: HTML.raw("<p>Hello</p>")},
            right_rail: true,
            teasers: []
          }
        ]
      }

      refute has_right_rail?(page)
    end
  end

  describe "project alerts" do
    test "renders project with no alerts" do
      conn = %{ assigns: %{
        alerts: [],
        date_time: DateTime.utc_now(),
      } }
      project = %Project{id: 0}

      rendered =
        project
        |> render_page(conn)
        |> HTML.safe_to_string()

      assert rendered =~ "page-section"
      assert rendered =~ "alerts-section"
    end

    test "renders project with alerts" do
      conn = %{ assigns: %{
        alerts: [%Alerts.Alert {
          url: "http://mbta.com/projects/test",
        }],
        date_time: DateTime.utc_now(),
      } }
      project = %Project{id: 0, path_alias: "/projects/test", }

      rendered =
        project
        |> render_page(conn)
        |> HTML.safe_to_string()

      assert rendered =~ "page-section"
      assert rendered =~ "alerts-section"
      assert rendered =~ "Related Service Alerts"
    end
  end
end
