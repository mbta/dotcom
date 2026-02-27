defmodule DotcomWeb.WorldCupTimetableLiveTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Router.Helpers, only: [live_path: 2, live_path: 3]

  import Phoenix.LiveViewTest

  alias DotcomWeb.WorldCupTimetableLive

  describe "WorldCupTimetableLive" do
    setup %{conn: conn} do
      %{conn: logged_in_basic_auth(conn)}
    end

    test "loads", %{conn: conn} do
      path = live_path(conn, WorldCupTimetableLive)
      assert {:ok, _, _} = live(conn, path)
    end

    test "shows World Cup service badge + guide link", %{conn: conn} do
      {:ok, view, _} = connect_to_page(conn)
      assert element(view, ".mbta-badge", "Service to the World Cup")
      assert element(view, ~s'a[href="/guides/world-cup-guide"]')
    end

    test "shows no boarding timetable / shows links to matches", %{conn: conn} do
      {:ok, view, _} = connect_to_page(conn)
      refute has_element?(view, "h2", "Boarding Groups")
      refute has_element?(view, "table")

      nav =
        element(
          view,
          ~s|nav[aria-label="World Cup Matches"]|
        )

      assert nav |> render() =~ "schedules/CR-WorldCup?date="
    end

    test "can navigate to a match / shows boarding timetable", %{conn: conn} do
      {:ok, view, _} = connect_to_page(conn)

      view
      |> element(~s|nav[aria-label="World Cup Matches"] a:first-of-type|)
      |> render_click()

      assert_patch(view)
      assert has_element?(view, ~s|a[aria-label="Select another match"]|)
      assert element(view, "h2", "Boarding Groups")
      assert has_element?(view, "table th", "Group Name")
      assert has_element?(view, "table th", "Check in at South Station")
    end
  end

  defp connect_to_page(conn, params \\ %{}) do
    path = live_path(conn, WorldCupTimetableLive, params)
    live(conn, path, on_error: :warn)
  end
end
