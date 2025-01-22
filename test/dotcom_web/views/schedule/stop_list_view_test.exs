defmodule DotcomWeb.StopListViewTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.ScheduleView.StopList
  import Phoenix.HTML, only: [safe_to_string: 1]

  alias CMS.Repo
  alias Dotcom.StopBubble
  alias DotcomWeb.ScheduleView
  alias Routes.Route
  alias Schedules.Departures
  alias Stops.RouteStop

  @assigns %{
    bubbles: [{nil, :terminus}],
    stop: %RouteStop{branch: nil, id: "stop", zone: "1", stop_features: []},
    route: %Route{id: "route_id", type: 1},
    direction_id: 1,
    conn: DotcomWeb.Endpoint,
    add_expand_link?: false,
    branch_names: ["branch"],
    vehicle_tooltip: %VehicleTooltip{vehicle: %Vehicles.Vehicle{route_id: "route_id"}},
    expanded: nil
  }

  describe "stop_bubble_row_params/2" do
    test "flattens the assigns into the map needed for the stop bubbles for a particular row" do
      params = stop_bubble_row_params(@assigns)

      assert [
               %StopBubble.Params{
                 render_type: :terminus,
                 class: "terminus",
                 route_id: nil,
                 route_type: 1,
                 direction_id: 1,
                 vehicle_tooltip: %VehicleTooltip{},
                 merge_indent: nil,
                 show_line?: true
               }
             ] = params
    end

    test "sets to render_type to :empty and the class to :line when a :line bubble is passed in" do
      assigns = %{@assigns | bubbles: [{"branch", :line}]}

      [params] = stop_bubble_row_params(assigns, true)

      assert params.render_type == :empty
      assert params.class == "line"
      assert params.show_line?
    end

    test "sets the render_type to :empty and the class to :merge on the second merge bubble" do
      assigns = %{@assigns | bubbles: [{"branch", :merge}, {"branch", :merge}]}

      params = stop_bubble_row_params(assigns, true)

      assert [
               %StopBubble.Params{render_type: :merge, class: "merge"},
               %StopBubble.Params{render_type: :empty, class: "merge"}
             ] = params
    end

    test "does not provide a vehicle_tooltip is no vehicle_tooltip is present" do
      assigns = %{@assigns | vehicle_tooltip: nil}

      [params] = stop_bubble_row_params(assigns, true)

      refute params.vehicle_tooltip
    end

    test "only provides a tooltip for the bubble whose branch matches the vehicle's route_id on the green line" do
      assigns = %{
        @assigns
        | bubbles: [
            {"Green-B", :stop},
            {"Green-C", :stop},
            {"Green-D", :stop},
            {"Green-E", :stop}
          ],
          route: %Route{id: "Green"},
          vehicle_tooltip: %VehicleTooltip{vehicle: %Vehicles.Vehicle{route_id: "Green-D"}}
      }

      tooltips =
        assigns
        |> stop_bubble_row_params()
        |> Enum.map(& &1.vehicle_tooltip)

      assert [nil, nil, %VehicleTooltip{}, nil] = tooltips
    end

    test "does not provide a vehicle_tooltip if the render_type is :line" do
      assigns = %{@assigns | bubbles: [{"branch", :line}]}

      [params] = stop_bubble_row_params(assigns)

      refute params.vehicle_tooltip
    end

    test "sets show_line? to false if the render_type is :empty" do
      assigns = %{@assigns | bubbles: [{"branch", :empty}]}

      [params] = stop_bubble_row_params(assigns, true)

      assert params.render_type == :empty
      assert params.class == "empty"
      refute params.show_line?
    end

    test "sets show_line? false if the render_type is :terminus and the stop is not the first stop" do
      assigns = %{@assigns | bubbles: [{"branch", :terminus}]}

      [params] = stop_bubble_row_params(assigns, false)

      refute params.show_line?
    end

    test "sets content to the letter of the green line branch if the route is green" do
      assigns = %{@assigns | route: %Route{id: "Green", type: 1}, bubbles: [{"Green-B", :stop}]}

      [params] = stop_bubble_row_params(assigns, false)

      assert params.content == "B"
    end

    test "sets content to the empty string for any other route id" do
      [params] = stop_bubble_row_params(@assigns, false)

      assert params.content == ""
    end
  end

  describe "Green Line bubble params" do
    test "at copley when direction is 0" do
      assigns = %{
        @assigns
        | bubbles: Enum.map(["B", "C", "D", "E"], &{"Green-" <> &1, :stop}),
          direction_id: 0,
          route: %Route{id: "Green", type: 0},
          stop: %RouteStop{id: "place-coecl", branch: nil}
      }

      assert [b_line, c_line, d_line, e_line] = stop_bubble_row_params(assigns)
      assert b_line.class == "stop"
      assert c_line.class == "stop"
      assert d_line.class == "stop"
      assert e_line.class == "stop"
    end

    test "at copley when direction is 1" do
      assigns = %{
        @assigns
        | bubbles: Enum.map(["B", "C", "D", "E"], &{"Green-" <> &1, :stop}),
          direction_id: 1,
          route: %Route{id: "Green", type: 0},
          stop: %RouteStop{id: "place-coecl", branch: nil}
      }

      assert [b_line, c_line, d_line, e_line] = stop_bubble_row_params(assigns)
      assert b_line.class == "stop"
      assert c_line.class == "stop"
      assert d_line.class == "stop"
      assert e_line.class == "stop"
    end

    test "for E line branch stops in either direction" do
      assigns = %{
        @assigns
        | bubbles: Enum.map(["B", "C", "D", "E"], &{"Green-" <> &1, :stop}),
          direction_id: 0,
          route: %Route{id: "Green", type: 0},
          stop: %RouteStop{id: "place-prmnl", branch: "Green-E"}
      }

      assert [b_line, c_line, d_line, e_line] = stop_bubble_row_params(assigns)
      assert b_line.class == "stop"
      assert c_line.class == "stop"
      assert d_line.class == "stop"
      assert e_line.class == "stop"

      assert [b_line_1, c_line_1, d_line_1, e_line_1] =
               stop_bubble_row_params(%{assigns | direction_id: 1})

      assert b_line_1.class == "stop"
      assert c_line_1.class == "stop"
      assert d_line_1.class == "stop"
      assert e_line_1.class == "stop"
    end

    test "all kenmore bubbles are solid when direction_id is 1" do
      assigns = %{
        @assigns
        | bubbles: Enum.map(["B", "C", "D"], &{"Green-" <> &1, :stop}),
          direction_id: 1,
          route: %Route{id: "Green", type: 0},
          stop: %RouteStop{id: "place-kencl", branch: nil}
      }

      assert [b_line, c_line, d_line] = stop_bubble_row_params(assigns)
      assert b_line.class == "stop"
      assert c_line.class == "stop"
      assert d_line.class == "stop"
    end

    test "schedule view expand link is solid" do
      assigns = %{
        @assigns
        | bubbles: [{"Green-E", :line}],
          stop: nil,
          route: %Route{id: "Green", type: 1},
          direction_id: 1,
          conn: "conn",
          branch_names: ["Green-E"],
          vehicle_tooltip: %VehicleTooltip{vehicle: %Vehicles.Vehicle{route_id: "Green"}},
          expanded: nil
      }

      assert [expand_link] = stop_bubble_row_params(assigns)
      assert expand_link.class == "line"
    end
  end

  describe "display_departure_range/1" do
    test "with :no_service, returns No Service" do
      result = display_departure_range(:no_service)
      assert result == "No Service"
    end

    test "with times, displays them formatted" do
      result =
        %Departures{
          first_departure: ~N[2017-02-27 06:15:00],
          last_departure: ~N[2017-02-28 01:04:00]
        }
        |> display_departure_range()
        |> IO.iodata_to_binary()

      assert result == "6:15 AM-1:04 AM"
    end
  end

  describe "display_map_link?/1" do
    test "is true for subway and ferry" do
      assert display_map_link?(4) == true
    end

    test "is false for subway, bus and commuter rail" do
      assert display_map_link?(0) == false
      assert display_map_link?(3) == false
      assert display_map_link?(2) == false
    end
  end

  describe "_cms_teasers.html" do
    @tag :external
    test "renders featured content and news", %{conn: conn} do
      assert {news, featured} =
               [route_id: "Red", sidebar: 1]
               |> Repo.teasers()
               |> Enum.split_with(&(&1.type === :news_entry))

      refute Enum.empty?(news)

      rendered =
        "_cms_teasers.html"
        |> ScheduleView.render(
          featured_content: featured,
          news: news,
          conn: conn
        )
        |> safe_to_string()

      [featured_sample | _] = featured

      assert rendered =~ featured_sample.image.url
      assert rendered =~ featured_sample.image.alt
      assert rendered =~ featured_sample.title

      for item <- news do
        assert rendered =~ item.title
        assert rendered =~ Timex.format!(item.date, "{Mshort}")
      end
    end

    test "renders nothing when there is no content", %{conn: conn} do
      rendered =
        "_cms_teasers.html"
        |> ScheduleView.render(featured_content: [], news: [], conn: conn)
        |> safe_to_string()

      assert String.trim(rendered) == ""
    end
  end
end
