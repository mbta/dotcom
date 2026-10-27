defmodule DotcomWeb.LineDiagramLiveTest do
  use DotcomWeb.ConnCase, async: true

  import Mox
  import Phoenix.LiveViewTest

  alias Test.Support.Factories

  setup :verify_on_exit!

  setup do
    route = Factories.Routes.Route.build(:route, %{id: "1", type: 3})
    polyline = Polyline.encode([{-71.06, 42.35}, {-71.07, 42.36}])

    [pattern_a, pattern_b] =
      Factories.RoutePatterns.RoutePattern.build_list(2, :route_pattern, %{
        route_id: route.id,
        representative_trip_polyline: polyline,
        typicality: 1
      })
      |> Enum.with_index()
      |> Enum.map(fn {p, i} -> %{p | sort_order: i, headsign: "Headsign #{i}"} end)

    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    stub(Routes.Repo.Mock, :get, fn _ -> route end)
    stub(RoutePatterns.Repo.Mock, :by_route_id, fn _, _ -> [pattern_a, pattern_b] end)

    stub(Stops.Repo.Mock, :get, fn id ->
      Factories.Stops.Stop.build(:stop, %{id: id, name: "Stop #{id}"})
    end)

    stub(Stops.Repo.Mock, :get_parent, fn stop -> stop end)

    stub(Vehicles.Repo.Mock, :route, fn _, _ -> [] end)
    stub(Alerts.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

    %{route: route, pattern_a: pattern_a, pattern_b: pattern_b}
  end

  defp label(view) do
    view
    |> render()
    |> Floki.parse_document!()
    |> Floki.find("#variant-menu-button")
    |> Floki.text()
    |> String.trim()
  end

  defp stop_names(view) do
    view
    |> render()
    |> Floki.parse_document!()
    |> Floki.find(".m-schedule-diagram__stop-link")
    |> Enum.map(&(Floki.text(&1) |> String.trim()))
  end

  test "defaults to all variants without a variant param", %{
    conn: conn,
    route: route,
    pattern_a: a,
    pattern_b: b
  } do
    {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new")

    assert label(view) =~ "All variants"
    expected_stop_names = Enum.uniq(a.stop_ids ++ b.stop_ids) |> Enum.map(&"Stop #{&1}")
    assert stop_names(view) == expected_stop_names
  end

  test "shows parking when the parent station has parking", %{
    conn: conn,
    route: route,
    pattern_a: pattern
  } do
    stop_id = hd(pattern.stop_ids)
    parent = Factories.Stops.Stop.build(:stop, %{parking_lots: [%Stops.Stop.ParkingLot{}]})

    stub(Stops.Repo.Mock, :get, fn
      ^stop_id -> Factories.Stops.Stop.build(:stop, %{id: stop_id, parent_id: parent.id})
      id -> Factories.Stops.Stop.build(:stop, %{id: id, name: "Stop #{id}"})
    end)

    stub(Stops.Repo.Mock, :get_parent, fn
      %{id: ^stop_id} -> parent
      stop -> stop
    end)

    {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new?variant=#{pattern.id}")

    assert has_element?(view, ~s|[title="Parking available"]|)
  end

  test "shows accessibility for accessible stops", %{
    conn: conn,
    route: route,
    pattern_a: pattern
  } do
    stop_id = hd(pattern.stop_ids)

    stub(Stops.Repo.Mock, :get, fn
      ^stop_id ->
        Factories.Stops.Stop.build(:stop, %{id: stop_id, accessibility: ["accessible"]})

      id ->
        Factories.Stops.Stop.build(:stop, %{id: id, name: "Stop #{id}"})
    end)

    {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new?variant=#{pattern.id}")

    assert has_element?(view, ~s|[title="Accessible"]|)
  end

  test "shows accessibility for bus stops by default", %{
    conn: conn,
    route: route,
    pattern_a: pattern
  } do
    {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new?variant=#{pattern.id}")

    assert has_element?(view, ~s|[title="Accessible"]|)
  end

  test "does not assume non-bus stops are accessible", %{
    conn: conn,
    route: route,
    pattern_a: pattern
  } do
    stub(Routes.Repo.Mock, :get, fn _ -> %{route | type: 2} end)
    canonical_pattern = %{pattern | canonical: true}
    stub(RoutePatterns.Repo.Mock, :by_route_id, fn _, _ -> [canonical_pattern] end)

    {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new?variant=#{pattern.id}")

    refute has_element?(view, ~s|[title="Accessible"]|)
  end

  test "hides the variant picker when there is only one variant", %{
    conn: conn,
    route: route,
    pattern_a: pattern
  } do
    stub(RoutePatterns.Repo.Mock, :by_route_id, fn _, _ -> [pattern] end)

    {:ok, view, _html} =
      live(conn, "/schedules/#{route.id}/line_new?schedule_direction[direction_id]=0")

    refute has_element?(view, "#variant-menu-button")

    assert has_element?(
             view,
             ".m-schedule-direction__route-pattern",
             Routes.Route.direction_destination(route, 0)
           )
  end

  test "updates variant picker visibility when changing direction", %{
    conn: conn,
    route: route,
    pattern_a: pattern_a,
    pattern_b: pattern_b
  } do
    stub(RoutePatterns.Repo.Mock, :by_route_id, fn _, opts ->
      case Keyword.fetch!(opts, :direction_id) do
        0 -> [pattern_a, pattern_b]
        1 -> [pattern_a]
      end
    end)

    {:ok, view, _html} =
      live(conn, "/schedules/#{route.id}/line_new?schedule_direction[direction_id]=0")

    assert has_element?(view, "#variant-menu-button")

    view |> element("#direction-filter") |> render_click()
    refute has_element?(view, "#variant-menu-button")

    view |> element("#direction-filter") |> render_click()
    assert has_element?(view, "#variant-menu-button")
  end

  test "selects the variant from the URL param", %{conn: conn, route: route, pattern_b: b} do
    {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new?variant=#{b.id}")

    assert label(view) =~ b.headsign
  end

  test "removes an unknown variant param from the URL", %{conn: conn, route: route} do
    path = "/schedules/#{route.id}/line_new"

    assert {:error, {:live_redirect, %{to: ^path}}} = live(conn, "#{path}?variant=nope")

    {:ok, view, _html} = live(conn, path)

    assert label(view) =~ "All variants"
  end

  test "selecting a variant updates the URL, preserving other params", %{
    conn: conn,
    route: route,
    pattern_a: a
  } do
    path = "/schedules/#{route.id}/line_new"
    {:ok, view, _html} = live(conn, "#{path}?schedule_direction[direction_id]=0")

    view
    |> element(~s|#variant-menu-menu li[phx-value-option="#{a.id}"]|)
    |> render_click()

    query =
      URI.encode_query(%{"schedule_direction[direction_id]" => "0", "variant" => a.id})

    assert_patch(view, "#{path}?#{query}")
    assert label(view) =~ a.headsign

    view
    |> element("#variant-menu-menu li:not([phx-value-option])")
    |> render_click()

    assert_patch(
      view,
      "#{path}?#{URI.encode_query(%{"schedule_direction[direction_id]" => "0"})}"
    )

    assert label(view) =~ "All variants"
  end

  describe "variant map updates" do
    test "reuses loaded stops when switching variants", %{
      conn: conn,
      route: route,
      pattern_a: a,
      pattern_b: b
    } do
      {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new?variant=#{b.id}")

      expect(Stops.Repo.Mock, :get, 0, fn _ -> flunk("stops should already be loaded") end)

      for pattern <- [a, b, a] do
        view
        |> element(~s|#variant-menu-menu li[phx-value-option="#{pattern.id}"]|)
        |> render_click()

        assert has_element?(view, "#variant-menu-button", pattern.headsign)
        expected_stop_names = Enum.uniq(pattern.stop_ids) |> Enum.map(&"Stop #{&1}")
        assert stop_names(view) == expected_stop_names
        assert has_element?(view, "#line-diagram-map [data-line]:nth-child(2)")
        refute has_element?(view, "#line-diagram-map [data-line]:nth-child(3)")

        icons =
          view
          |> render()
          |> Floki.parse_document!()
          |> Floki.find("#line-diagram-map .mbta-map-icon")

        assert length(icons) == length(Enum.uniq(pattern.stop_ids))
      end

      view
      |> element("#variant-menu-menu li:not([phx-value-option])")
      |> render_click()

      assert has_element?(view, "#variant-menu-button", "All variants")
      expected_stop_names = Enum.uniq(a.stop_ids ++ b.stop_ids) |> Enum.map(&"Stop #{&1}")
      assert stop_names(view) == expected_stop_names
      assert has_element?(view, "#line-diagram-map [data-line]:nth-child(4)")
    end

    test "refits on selection immediately after a vehicle update", %{
      conn: conn,
      route: route,
      pattern_a: a
    } do
      {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new")

      view |> with_target("#line-diagram-map") |> render_hook("map-loaded", %{})
      assert_push_event(view, "update-markers", %{})

      send(view.pid, %Phoenix.Socket.Broadcast{
        topic: "vehicles-v2:#{route.id}:1",
        event: "reset",
        payload: %{data: []}
      })

      render(view)
      assert_push_event(view, "update-markers", %{move_map: false})

      view
      |> element(~s|#variant-menu-menu li[phx-value-option="#{a.id}"]|)
      |> render_click()

      assert_push_event(view, "update-markers", %{move_map: true})
    end
  end
end
