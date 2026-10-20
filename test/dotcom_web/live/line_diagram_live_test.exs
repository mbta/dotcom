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
    stub(Stops.Repo.Mock, :get, fn id -> Factories.Stops.Stop.build(:stop, %{id: id}) end)
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

  test "defaults to all variants without a variant param", %{conn: conn, route: route} do
    {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new")

    assert label(view) =~ "All variants"
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

  describe "new map" do
    defp new_map_html(view) do
      view |> render() |> Floki.parse_document!()
    end

    test "renders a marker for each stop with a popup, and fits to them", %{
      conn: conn,
      route: route,
      pattern_a: a
    } do
      {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new?variant=#{a.id}")

      stops = view |> new_map_html() |> Floki.find("#new-map-stops [data-coordinates]")

      assert length(stops) == length(Enum.uniq(a.stop_ids))
      assert has_element?(view, ~s|#new-map-stops[phx-hook="IconMarkers"][data-map-id="new-map"]|)

      for stop <- stops do
        assert [_] = Floki.attribute(stop, "data-marker-id")
        assert [popup] = Floki.attribute(stop, "data-popup")
        assert popup =~ "popup-title"
      end

      assert [mounted] = view |> new_map_html() |> Floki.attribute("[phx-mounted]", "phx-mounted")
      assert mounted =~ "maplibrex:fit_bounds"
      assert mounted =~ ~s|"padding":50|
    end

    test "stacks vehicle markers above stop markers", %{conn: conn, route: route} do
      {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new")

      z_index = fn id ->
        [value] = view |> new_map_html() |> Floki.attribute("##{id}", "data-z-index")
        String.to_integer(value)
      end

      assert z_index.("new-map-vehicles") > z_index.("new-map-stops")
    end

    test "renders an outline layer and a route layer sharing one source", %{
      conn: conn,
      route: route
    } do
      {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new")
      html = new_map_html(view)

      assert [outline] = Floki.attribute(html, "#new-map-lines-outline", "data-config")

      assert %{"source" => %{"data" => %{"type" => "FeatureCollection", "features" => features}}} =
               Jason.decode!(outline)

      assert Enum.all?(features, &(&1["geometry"]["type"] == "LineString"))

      assert [line] = Floki.attribute(html, "#new-map-lines", "data-config")

      assert %{
               "sourceId" => "new-map-lines-outline-source",
               "paint" => %{"line-color" => line_color}
             } = Jason.decode!(line)

      assert line_color == "##{route.color}"
    end

    test "renders vehicle markers with their bearing", %{conn: conn, route: route} do
      vehicle =
        Factories.Vehicles.Vehicle.build(:vehicle, %{
          route_id: route.id,
          latitude: 42.35,
          longitude: -71.06,
          bearing: 90
        })

      stub(Vehicles.Repo.Mock, :route, fn _, _ -> [vehicle] end)

      {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new")

      assert [marker] =
               view |> new_map_html() |> Floki.find("#new-map-vehicles [data-coordinates]")

      assert Floki.attribute(marker, "data-marker-id") == [vehicle.id]
      assert Floki.attribute(marker, "data-rotation") == ["90"]
      assert Floki.attribute(marker, "data-coordinates") == ["[-71.06,42.35]"]
    end

    test "updates vehicle markers when a vehicle moves", %{conn: conn, route: route} do
      vehicle =
        Factories.Vehicles.Vehicle.build(:vehicle, %{
          route_id: route.id,
          latitude: 42.35,
          longitude: -71.06,
          bearing: 90
        })

      stub(Vehicles.Repo.Mock, :route, fn _, _ -> [vehicle] end)

      {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new")

      send(view.pid, %Phoenix.Socket.Broadcast{
        topic: "vehicles-v2:#{route.id}:1",
        event: "update",
        payload: %{data: [%{vehicle | latitude: 42.4, longitude: -71.1, bearing: 180}]}
      })

      assert [marker] =
               view |> new_map_html() |> Floki.find("#new-map-vehicles [data-coordinates]")

      assert Floki.attribute(marker, "data-marker-id") == [vehicle.id]
      assert Floki.attribute(marker, "data-rotation") == ["180"]
      assert Floki.attribute(marker, "data-coordinates") == ["[-71.1,42.4]"]
    end

    test "defaults the rotation to 0 when a vehicle has no bearing", %{
      conn: conn,
      route: route
    } do
      vehicle =
        Factories.Vehicles.Vehicle.build(:vehicle, %{
          route_id: route.id,
          latitude: 42.35,
          longitude: -71.06,
          bearing: nil
        })

      stub(Vehicles.Repo.Mock, :route, fn _, _ -> [vehicle] end)

      {:ok, view, _html} = live(conn, "/schedules/#{route.id}/line_new")

      assert view
             |> new_map_html()
             |> Floki.attribute("#new-map-vehicles [data-coordinates]", "data-rotation") == ["0"]
    end
  end

  describe "variant map updates" do
    defp outline_features(html) do
      [config] = Floki.attribute(html, "#new-map-lines-outline", "data-config")
      Jason.decode!(config)["source"]["data"]["features"]
    end

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

        html = view |> render() |> Floki.parse_document!()

        assert length(outline_features(html)) == 1

        assert length(Floki.find(html, "#new-map-stops [data-coordinates]")) ==
                 length(Enum.uniq(pattern.stop_ids))
      end

      view
      |> element("#variant-menu-menu li:not([phx-value-option])")
      |> render_click()

      assert has_element?(view, "#variant-menu-button", "All variants")
      assert view |> render() |> Floki.parse_document!() |> outline_features() |> length() == 2
    end
  end
end
