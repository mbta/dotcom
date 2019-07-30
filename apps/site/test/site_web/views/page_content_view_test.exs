defmodule SiteWeb.CMS.PageViewTest do
  use Site.ViewCase, async: true

  import SiteWeb.CMS.PageView

  alias CMS.Page.Basic
  alias CMS.Paragraph.CustomHTML
  alias Phoenix.HTML

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
  end
end
