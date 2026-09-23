defmodule DotcomWeb.ProjectsPageLiveTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Router.Helpers, only: [live_path: 2]
  import Phoenix.LiveViewTest

  alias DotcomWeb.ProjectsPageLive

  # "all" mode/line hits the CMS static fixture's dedicated project-teasers
  # response (10 items, exactly a full page) so `has_more_projects?` stays
  # true. Any other mode/line value falls through to the generic teasers
  # fixture, which only has 5 project-type entries (less than a full page),
  # deterministically exercising the "reached end of list" branch.
  @full_page_title "Wollaston Station Improvements"
  @filtered_only_title "$10 Weekends on Commuter Rail"
  @featured_all_only_title "Better Bus Project"
  @featured_filtered_title "$10 Weekends on Commuter Rail"

  defp mount_and_load(conn) do
    path = live_path(conn, ProjectsPageLive)
    {:ok, view, _html} = live(conn, path)
    render_async(view)
    view
  end

  describe "mount" do
    test "renders successfully and loads default projects and featured projects", %{conn: conn} do
      view = mount_and_load(conn)

      assert has_element?(view, "h2", "All Projects")
      assert has_element?(view, "h2", "Featured Projects")
      assert has_element?(view, "h3.m-more-projects-table__title", @full_page_title)
      assert has_element?(view, "h3.m-featured-project__title", @featured_all_only_title)
    end

    test "shows a loading spinner before the async data resolves", %{conn: conn} do
      path = live_path(conn, ProjectsPageLive)
      {:ok, view, html} = live(conn, path)

      # Immediately after connecting mount, at least one of the async
      # sections may still be loading before `render_async/1` settles them.
      assert html =~ "Loading featured projects" or has_element?(view, "[role=status]")

      render_async(view)

      refute has_element?(view, "[aria-label=\"Loading featured projects\"]")
      refute has_element?(view, "[aria-label=\"Loading projects\"]")
    end

    test "shows the 'Show More' button when there may be more projects", %{conn: conn} do
      view = mount_and_load(conn)

      assert has_element?(view, "button", "Show More")
      refute has_element?(view, "*", "You've reached the end of the list.")
    end
  end

  describe "filtering by mode" do
    test "updates heading, project list, and featured projects", %{conn: conn} do
      view = mount_and_load(conn)

      view
      |> element("#projects-form")
      |> render_change(%{"mode" => "bus", "_target" => ["mode"]})

      render_async(view)

      label = Map.get(ProjectsPageLive.mode_map(), "bus")

      assert has_element?(view, "h2", "All #{label} Projects")
      assert has_element?(view, "h2", "Featured #{label} Projects")
      assert has_element?(view, "h3.m-more-projects-table__title", @filtered_only_title)
      refute has_element?(view, "h3.m-more-projects-table__title", @full_page_title)
      assert has_element?(view, "h3.m-featured-project__title", @featured_filtered_title)
    end

    test "reveals the line filter only when mode is 'subway'", %{conn: conn} do
      view = mount_and_load(conn)

      refute has_element?(view, "legend", "Filter by Line")

      view
      |> element("#projects-form")
      |> render_change(%{"mode" => "subway", "_target" => ["mode"]})

      render_async(view)

      assert has_element?(view, "legend", "Filter by Line")

      view
      |> element("#projects-form")
      |> render_change(%{"mode" => "bus", "_target" => ["mode"]})

      render_async(view)

      refute has_element?(view, "legend", "Filter by Line")
    end

    test "shows the 'reached the end' message and hides 'Show More' when a filtered mode returns fewer than a full page",
         %{conn: conn} do
      view = mount_and_load(conn)

      view
      |> element("#projects-form")
      |> render_change(%{"mode" => "bus", "_target" => ["mode"]})

      render_async(view)

      refute has_element?(view, "button", "Show More")
      assert has_element?(view, "*", "You've reached the end of the list.")
    end
  end

  describe "filtering by line" do
    test "updates heading and project list when a subway line is selected", %{conn: conn} do
      view = mount_and_load(conn)

      view
      |> element("#projects-form")
      |> render_change(%{"mode" => "subway", "_target" => ["mode"]})

      render_async(view)

      view
      |> element("#projects-form")
      |> render_change(%{"line" => "red", "_target" => ["line"]})

      render_async(view)

      label = Map.get(ProjectsPageLive.mode_map(), "red")

      assert has_element?(view, "h2", "All #{label} Projects")
      assert has_element?(view, "h3.m-more-projects-table__title", @filtered_only_title)
    end
  end

  describe "pagination" do
    test "clicking 'Show More' triggers another async fetch without erroring", %{conn: conn} do
      view = mount_and_load(conn)

      view
      |> element("button", "Show More")
      |> render_click()

      render_async(view)

      assert has_element?(view, "h3.m-more-projects-table__title", @full_page_title)
    end
  end
end
