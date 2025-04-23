defmodule DotcomWeb.CMSViewTest do
  use Dotcom.ViewCase, async: true

  import DotcomWeb.CMSView
  import CMS.Helpers, only: [parse_iso_datetime: 1]

  alias CMS.Api.Static
  alias CMS.Field.File
  alias CMS.Page.Basic
  alias CMS.Partial.Paragraph.CustomHTML
  alias Phoenix.HTML

  describe "Basic Page" do
    setup do
      basic_page = Basic.from_api(Static.basic_page_with_sidebar_response())
      %{basic_page: basic_page}
    end

    test "renders a sidebar menu", %{basic_page: basic_page} do
      fake_conn = %{
        assigns: %{},
        query_params: %{},
        request_path: basic_page.sidebar_menu.links |> List.first() |> Map.get(:url)
      }

      rendered =
        "page.html"
        |> render(page: basic_page, conn: fake_conn)
        |> HTML.safe_to_string()

      assert rendered =~ ~s(c-cms--with-sidebar)
      assert rendered =~ ~s(c-cms--sidebar-left)
      assert rendered =~ "Logan Airport"
      assert rendered =~ ~s(<ul class="c-cms__sidebar-links">)
      assert rendered =~ ~s(c-cms__sidebar)
      refute rendered =~ "c-cms__right-rail"
    end

    test "renders a page without a sidebar menu", %{basic_page: basic_page} do
      basic_page = %{basic_page | sidebar_menu: nil}

      fake_conn = %{
        assigns: %{},
        request_path: "/"
      }

      rendered =
        "page.html"
        |> render(page: basic_page, conn: fake_conn)
        |> HTML.safe_to_string()

      assert rendered =~ ~s(c-cms--no-sidebar)
      assert rendered =~ "Fenway Park"
      refute rendered =~ ~s(<ul class="sidebar-menu">)
      refute rendered =~ "c-cms__right-rail"
    end

    test "renders a page with a right rail" do
      page_with_right_rail = %Basic{
        paragraphs: [
          %CustomHTML{body: HTML.raw("<p>Hello</p>"), right_rail: false},
          %CustomHTML{body: HTML.raw("<p>world</p>"), right_rail: true}
        ]
      }

      fake_conn = %{
        assigns: %{},
        request_path: "/"
      }

      rendered =
        "page.html"
        |> render(page: page_with_right_rail, conn: fake_conn)
        |> HTML.safe_to_string()

      assert rendered =~ "c-cms--sidebar-right"
      assert rendered =~ "Hello"
      assert rendered =~ "world"
      assert rendered =~ "c-paragraph--right-rail"
    end
  end

  describe "Diversion" do
    setup do
      diversion = Basic.from_api(Static.diversion_response())
      %{diversion: diversion}
    end

    test "renders a diversion as a generic page", %{diversion: diversion} do
      fake_conn = %{
        assigns: %{},
        path_info: ["diversions", "diversion-2"],
        request_path: "/"
      }

      rendered =
        "page.html"
        |> render(page: diversion, conn: fake_conn)
        |> HTML.safe_to_string()

      assert rendered =~ ~s(<h1 class=\"c-cms__title-text\">Diversion Test 2)
      assert rendered =~ "<p><strong>Start date: January 1, 2020</strong></p>"
    end
  end

  describe "file_description/1" do
    test "returns URL decoded file name if description is nil" do
      file = %File{url: "/some/path/This%20File%20Is%20Great.pdf", description: nil}
      assert file_description(file) == "This File Is Great.pdf"
    end

    test "returns the URL decoded file name if description is an empty string" do
      file = %File{url: "/some/path/This%20File%20Is%20Great.pdf", description: ""}
      assert file_description(file) == "This File Is Great.pdf"
    end

    test "returns the description if present" do
      file = %File{url: "/some/path/This%20File%20Is%20Great.pdf", description: "Download Now"}
      assert file_description(file) == "Download Now"
    end
  end

  describe "render_duration/2" do
    test "with no end time, only renders start time" do
      actual = render_duration(~N[2016-11-15T10:00:00], nil)
      expected = "November 15, 2016 at 10 AM"
      assert expected == actual
    end

    test "with start/end on same day, only renders date once" do
      actual = render_duration(~N[2016-11-14T12:00:00], ~N[2016-11-14T14:30:00])
      expected = "November 14, 2016 at 12 PM - 2:30 PM"
      assert expected == actual
    end

    test "with start/end on different days, renders both dates" do
      actual = render_duration(~N[2016-11-14T12:00:00], ~N[2016-12-01T14:30:00])
      expected = "November 14, 2016 12 PM - December 1, 2016 2:30 PM"
      assert expected == actual
    end

    test "with DateTimes, shifts them to America/New_York" do
      actual =
        render_duration(
          Timex.to_datetime(~N[2016-11-05T05:00:00], "Etc/UTC"),
          Timex.to_datetime(~N[2016-11-06T06:00:00], "Etc/UTC")
        )

      # could also be November 6th, 1:00 AM (test daylight savings)
      expected = "November 5, 2016 1 AM - November 6, 2016 1 AM"
      assert expected == actual
    end

    test "with ISO:Extended DateTimes, does not shift timezone" do
      actual =
        render_duration(
          parse_iso_datetime("2016-11-06T01:00:00-04:00"),
          parse_iso_datetime("2016-11-06T02:00:00-04:00")
        )

      expected = "November 6, 2016 at 1 AM - 2 AM"
      assert expected == actual
    end
  end
end
