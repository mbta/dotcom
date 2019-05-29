defmodule SiteWeb.TripPlanViewTest do
  use SiteWeb.ConnCase, async: true
  import SiteWeb.TripPlanView
  import Phoenix.HTML, only: [safe_to_string: 1]
  import UrlHelpers, only: [update_url: 2]
  import Schedules.Repo, only: [end_of_rating: 0]
  alias Routes.Route
  alias Site.TripPlan.{IntermediateStop, ItineraryRow, Query}
  alias TripPlan.Api.MockPlanner

  describe "itinerary_explanation/2" do
    @base_explanation_query %Query{
      from: {:error, :unknown},
      to: {:error, :unknown},
      itineraries: {:error, :unknown}
    }
    @date_time DateTime.from_unix!(0)

    test "returns nothing for an empty query" do
      selected = %{subway: true, bus: true, commuter_rail: true, ferry: true}

      assert @base_explanation_query
             |> itinerary_explanation(selected)
             |> IO.iodata_to_binary() == ""
    end

    test "for wheelchair accessible depart_by trips, includes that in the message" do
      query = %{
        @base_explanation_query
        | time: {:depart_at, @date_time},
          wheelchair_accessible?: true
      }

      selected = %{subway: true, bus: true, commuter_rail: true, ferry: true}
      expected = "Wheelchair accessible trips shown are based on your selections (all modes) and \
closest departure to 12:00 AM, Thursday, January 1st."

      actual =
        query
        |> itinerary_explanation(selected)
        |> IO.iodata_to_binary()

      assert actual == expected
    end

    test "for regular arrive_by trips, includes that in the message" do
      query = %{
        @base_explanation_query
        | time: {:arrive_by, @date_time},
          wheelchair_accessible?: false
      }

      selected = %{subway: true, bus: true, commuter_rail: true, ferry: true}
      expected = "Trips shown are based on your selections (all modes) and \
closest arrival to 12:00 AM, Thursday, January 1st."

      actual =
        query
        |> itinerary_explanation(selected)
        |> IO.iodata_to_binary()

      assert actual == expected
    end
  end

  describe "selected_modes_string/1" do
    test "returns 'all modes' when all modes are selected" do
      selected = %{subway: true, bus: true, commuter_rail: true, ferry: true}
      assert selected_modes_string(selected) == "all modes"
    end

    test "returns comma separated list of modes when some modes are unselected" do
      selected = %{subway: true, bus: false, commuter_rail: true, ferry: false}
      assert selected_modes_string(selected) == "commuter rail, subway"
    end
  end

  describe "show_plan_error?/1" do
    test "returns true if error is a general plan error" do
      for error <- plan_errors() do
        assert show_plan_error?([error]) === true
      end
    end

    test "returns false if error is a field error" do
      for error <- field_errors() do
        assert show_plan_error?([error]) === false
      end
    end

    test "returns false if there are no errors" do
      assert show_plan_error?([]) === false
    end

    test "returns true if any of the errors are plan errors" do
      [plan | _] = plan_errors()
      [field | _] = field_errors()
      assert show_plan_error?([plan, field]) === true
    end
  end

  describe "plan_error_description" do
    test "renders too_future error" do
      end_of_rating = end_of_rating() |> Timex.format!("{M}/{D}/{YY}")

      error =
        [:too_future]
        |> plan_error_description()
        |> IO.iodata_to_binary()

      assert error =~ "We can only provide trip data for the current schedule"
      assert error =~ end_of_rating
    end

    test "renders past error" do
      end_of_rating = end_of_rating() |> Timex.format!("{M}/{D}/{YY}")

      error =
        [:past]
        |> plan_error_description()
        |> IO.iodata_to_binary()

      assert error =~ "Date is in the past"
      assert error =~ "We can only provide trip data for the current schedule"
      assert error =~ end_of_rating
    end

    test "returns text for every plan error" do
      for error <- Enum.reject(plan_errors(), &(&1 in [:too_future, :past])) do
        result = plan_error_description([error])
        assert is_binary(result)
        refute result == ""
      end
    end
  end

  describe "date_error/1" do
    test "returns an error if error list includes :invalid_date" do
      assert [:invalid_date] |> date_error() |> Phoenix.HTML.safe_to_string() =~
               "Date is not valid"
    end

    test "doesn't render an error if error list does not contain :invalid_date" do
      assert date_error([:no_results]) == ""
      assert date_error([]) == ""
    end
  end

  describe "rendered_location_error/3" do
    test "renders an empty string if there's no query", %{conn: conn} do
      assert "" == rendered_location_error(conn, nil, :from)
    end

    test "renders an empty string if the query has a good value for the field", %{conn: conn} do
      from = MockPlanner.random_stop()

      query = %Query{
        from: {:ok, from},
        to: {:error, :no_results},
        itineraries: {:error, :unknown}
      }

      assert rendered_location_error(conn, query, :from) == ""

      assert rendered_location_error(conn, query, :to) ==
               "We're sorry, but we couldn't find that address."
    end

    test "renders each position as a link if we have too many results", %{conn: conn} do
      {:error, {:multiple_results, results}} = from = TripPlan.geocode("too many results")
      query = %Query{from: from, to: {:error, :unknown}, itineraries: {:error, :unknown}}
      conn = Map.put(conn, :query_params, %{})

      rendered =
        conn
        |> rendered_location_error(query, :from)
        |> safe_to_string

      assert rendered =~ "Did you mean?"

      for result <- results do
        assert rendered =~ result.name
        assert rendered =~ update_url(conn, %{plan: %{from: result.name}})
      end
    end
  end

  describe "mode_class/1" do
    test "returns the icon atom if a route is present" do
      row = %ItineraryRow{route: %Route{id: "Red"}}

      assert mode_class(row) == "red-line"
    end

    test "returns 'personal' if no route is present" do
      row = %ItineraryRow{route: nil}

      assert mode_class(row) == "personal-itinerary"
    end
  end

  describe "stop_departure_display/1" do
    @time ~N[2017-06-27T11:43:00]

    test "returns blank when trip is available" do
      trip_row = %ItineraryRow{trip: %Schedules.Trip{}}

      assert stop_departure_display(trip_row) == :blank
    end

    test "returns formatted time when trip is not available" do
      row = %ItineraryRow{trip: nil, departure: @time}
      assert stop_departure_display(row) == {:render, "11:43A"}
    end
  end

  describe "render_stop_departure_display/1" do
    test "does not render :blank" do
      refute render_stop_departure_display(:blank)
    end

    test "renders time when given one" do
      text = {:render, "11:00A"} |> render_stop_departure_display() |> safe_to_string
      assert text =~ "11:00A"
    end
  end

  describe "bubble_params/1 for a transit row" do
    @itinerary_row %ItineraryRow{
      transit?: true,
      stop: {"Park Street", "place-park"},
      steps: ["Boylston", "Arlington", "Copley"],
      route: %Route{id: "Green", name: "Green Line", type: 1}
    }

    test "builds bubble_params for each step" do
      params = bubble_params(@itinerary_row, nil)

      for {_step, param} <- params do
        assert [
                 %Site.StopBubble.Params{
                   route_id: "Green",
                   route_type: 1,
                   render_type: :stop,
                   bubble_branch: "Green Line"
                 }
               ] = param
      end

      assert Enum.map(params, &elem(&1, 0)) == [:transfer | @itinerary_row.steps]
    end
  end

  describe "bubble_params/1 for a personal row" do
    @itinerary_row %ItineraryRow{
      transit?: false,
      stop: {"Park Street", "place-park"},
      steps: ["Tremont and Winter", "Winter and Washington", "Court St. and Washington"],
      route: nil
    }

    test "builds bubble params for each step" do
      params = bubble_params(@itinerary_row, 0)

      for {_step, param} <- params do
        assert [
                 %Site.StopBubble.Params{
                   route_id: nil,
                   route_type: nil,
                   bubble_branch: nil
                 }
               ] = param
      end

      assert Enum.map(params, &elem(&1, 0)) == [:transfer | @itinerary_row.steps]
    end

    test "all but first stop are lines" do
      [_transfer | types_and_classes] =
        @itinerary_row
        |> bubble_params(0)
        |> Enum.map(fn {_, [%{class: class, render_type: render_type}]} ->
          {class, render_type}
        end)

      assert types_and_classes == [{"line", :empty}, {"line", :empty}, {"line", :empty}]
    end

    test "first stop is terminus for first row" do
      [{_transfer_step, [%{class: class, render_type: render_type}]} | _rest] =
        bubble_params(@itinerary_row, 0)

      assert class == ["terminus", " transfer"]
      assert render_type == :terminus
    end

    test "first stop is stop for a row other than the first" do
      [{_transfer_step, [%{class: class, render_type: render_type}]} | _rest] =
        bubble_params(@itinerary_row, 3)

      assert class == ["stop", " transfer"]
      assert render_type == :stop
    end
  end

  describe "render_steps/5" do
    @bubble_params [
      %Site.StopBubble.Params{
        render_type: :empty,
        class: "line"
      }
    ]
    @steps [
      {%IntermediateStop{description: "Tremont and Winter"}, @bubble_params},
      {%IntermediateStop{description: "Winter and Washington"}, @bubble_params},
      {%IntermediateStop{description: "Court St. and Washington"}, @bubble_params}
    ]
    @transit_steps [
      {%IntermediateStop{
         description: "Alewife",
         alerts: [%Alerts.Alert{description: "step alert"}]
       }, @bubble_params},
      {%IntermediateStop{description: "Davis"}, @bubble_params},
      {%IntermediateStop{
         description: "Porter",
         alerts: [%Alerts.Alert{description: "step alert"}]
       }, @bubble_params}
    ]
    @itinerary_id 0
    @row_id 0
    @conn %{
      assigns: %{
        date_time: Util.now()
      }
    }

    test "renders alerts for steps that have them" do
      html =
        @conn
        |> render_steps(@transit_steps, "personal", @itinerary_id, @row_id)
        |> Enum.map(&safe_to_string/1)
        |> IO.iodata_to_binary()

      assert Enum.count(Floki.find(html, ".m-trip-plan__alert-toggle")) == 2
    end

    test "renders the provided subset of {step, bubbles}" do
      html =
        @conn
        |> render_steps(@steps, "personal", @itinerary_id, @row_id)
        |> Enum.map(&safe_to_string/1)
        |> IO.iodata_to_binary()

      assert Enum.count(Floki.find(html, ".personal")) == 3
      assert Enum.count(Floki.find(html, ".route-branch-stop-bubble")) == 3

      names =
        html
        |> Floki.find(".itinerary-step")
        |> Enum.map(fn {_elem, _attrs, [name]} -> String.trim(name) end)

      assert names == ["Tremont and Winter", "Winter and Washington", "Court St. and Washington"]
    end
  end

  describe "display_meters_as_miles/1" do
    test "123.456 mi" do
      assert display_meters_as_miles(123.456 * 1609.34) == "123.5"
    end

    test "0.123 mi" do
      assert display_meters_as_miles(0.123 * 1609.34) == "0.1"
    end

    test "10.001 mi" do
      assert display_meters_as_miles(10.001 * 1609.34) == "10.0"
    end
  end

  describe "format_additional_route/2" do
    test "Correctly formats Green Line route" do
      route = %Route{name: "Green Line B", id: "Green-B", direction_names: %{1 => "Eastbound"}}
      actual = route |> format_additional_route(1) |> IO.iodata_to_binary()
      assert actual == "Green Line (B) Eastbound towards Park Street"
    end
  end

  describe "icon_for_route/1" do
    test "non-subway transit legs" do
      for {gtfs_type, expected_icon_class} <- [{2, "commuter-rail"}, {3, "bus"}, {4, "ferry"}] do
        route = %Routes.Route{
          id: "id",
          type: gtfs_type
        }

        icon = icon_for_route(route)
        assert safe_to_string(icon) =~ expected_icon_class
      end
    end

    test "subway transit legs" do
      for {id, type, expected_icon_class} <- [
            {"Red", 1, "red-line"},
            {"Mattapan", 0, "mattapan-line"},
            {"Orange", 1, "orange-line"},
            {"Blue", 1, "blue-line"},
            {"Green", 0, "green-line"}
          ] do
        route = %Routes.Route{
          id: id,
          type: type
        }

        icon = icon_for_route(route)
        assert safe_to_string(icon) =~ expected_icon_class
      end
    end
  end

  describe "transfer_route_name/1" do
    test "for subway" do
      assert transfer_route_name(%Route{id: "Mattapan", type: 0, name: "Mattapan Trolley"}) ==
               "Mattapan Trolley"

      assert transfer_route_name(%Route{id: "Green", type: 0, name: "Green Line"}) == "Green Line"

      for branch <- ["B", "C", "D", "E"] do
        assert transfer_route_name(%Route{
                 id: "Green-" <> branch,
                 type: 0,
                 name: "Green Line " <> branch
               }) == "Green Line"
      end

      for line <- ["Red", "Orange", "Blue"] do
        assert transfer_route_name(%Route{id: line, type: 1, name: line <> " Line"}) ==
                 line <> " Line"
      end
    end

    test "for other modes" do
      assert transfer_route_name(%Route{id: "CR-Fitchburg", type: 2, name: "Fitchburg Line"}) ==
               "Commuter Rail"

      assert transfer_route_name(%Route{id: "77", type: 3, name: "77"}) == "Bus"

      assert transfer_route_name(%Route{id: "Boat-Hingham", type: 4, name: "Hingham Ferry"}) ==
               "Ferry"
    end
  end

  describe "format_plan_type_for_title/1" do
    @now Util.now()
    @human_time Timex.format!(@now, "{h12}:{m} {AM}, {M}/{D}/{YY}")
    test "for arrive by" do
      assert format_plan_type_for_title(%{time: {:arrive_by, @now}}) == [
               "Arrive by ",
               @human_time
             ]
    end

    test "for depart at" do
      assert format_plan_type_for_title(%{time: {:depart_at, @now}}) == [
               "Depart at ",
               @human_time
             ]
    end

    test "default" do
      human_time =
        Util.now()
        |> Site.TripPlan.DateTime.round_minute()
        |> Timex.format!("{h12}:{m} {AM}, {M}/{D}/{YY}")

      assert format_plan_type_for_title(nil) === ["Depart at ", human_time]
    end
  end

  describe "index.html" do
    @index_assigns %{
      date: Util.now(),
      date_time: Util.now(),
      errors: [],
      modes: %{},
      optimize_for: :best_route,
      initial_map_data: Site.TripPlan.Map.initial_map_data(),
      initial_map_src: Site.TripPlan.Map.initial_map_src()
    }

    test "renders the form with all fields", %{conn: conn} do
      html =
        "index.html"
        |> render(Map.put(@index_assigns, :conn, conn))
        |> safe_to_string()

      assert [{"div", _, form}] = Floki.find(html, ".plan-date-time")
      assert [{"select", _, _year_opts}] = Floki.find(form, ~s([name="plan[date_time][year]"]))
      assert [{"select", _, _month_opts}] = Floki.find(form, ~s([name="plan[date_time][month]"]))
      assert [{"select", _, _month_opts}] = Floki.find(form, ~s([name="plan[date_time][day]"]))
      assert [{"select", _, _hour_options}] = Floki.find(form, ~s([name="plan[date_time][hour]"]))

      assert [{"select", _, _minute_options}] =
               Floki.find(form, ~s([name="plan[date_time][minute]"]))
    end

    test "includes a text field for the javascript datepicker to attach to", %{conn: conn} do
      html =
        "index.html"
        |> render(Map.put(@index_assigns, :conn, conn))
        |> safe_to_string()

      assert [{"input", _, _}] = Floki.find(html, ~s(input#plan-date-input[type="text"]))
    end
  end
end
