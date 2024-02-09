defmodule DotcomWeb.TripPlanViewTest do
  use DotcomWeb.ConnCase, async: true
  import DotcomWeb.TripPlanView
  import Phoenix.HTML, only: [safe_to_string: 1]
  import UrlHelpers, only: [update_url: 2]
  import Schedules.Repo, only: [end_of_rating: 0]
  alias Fares.Fare
  alias Routes.Route
  alias Dotcom.TripPlan.{IntermediateStop, ItineraryRow, Query}
  alias TripPlan.Api.MockPlanner
  alias TripPlan.{Itinerary, Leg, NamedPosition, TransitDetail}

  @highest_one_way_fare %Fares.Fare{
    additional_valid_modes: [:bus],
    cents: 290,
    duration: :single_trip,
    media: [:charlie_ticket, :cash],
    mode: :subway,
    name: :subway,
    price_label: nil,
    reduced: nil
  }

  @lowest_one_way_fare %Fares.Fare{
    additional_valid_modes: [:bus],
    cents: 240,
    duration: :single_trip,
    media: [:charlie_card],
    mode: :subway,
    name: :subway,
    price_label: nil,
    reduced: nil
  }

  @reduced_one_way_fare %Fares.Fare{
    additional_valid_modes: [],
    cents: 110,
    duration: :single_trip,
    media: [:senior_card],
    mode: :subway,
    name: :subway,
    price_label: nil,
    reduced: :senior_disabled
  }

  @fares %{
    highest_one_way_fare: @highest_one_way_fare,
    lowest_one_way_fare: @lowest_one_way_fare,
    reduced_one_way_fare: @reduced_one_way_fare
  }

  @shuttle_fares %{
    highest_one_way_fare: %Fare{
      additional_valid_modes: [],
      cents: 0,
      duration: :single_trip,
      media: [],
      mode: :bus,
      name: :free_fare,
      price_label: nil,
      reduced: nil
    },
    lowest_one_way_fare: %Fare{
      additional_valid_modes: [],
      cents: 0,
      duration: :single_trip,
      media: [],
      mode: :bus,
      name: :free_fare,
      price_label: nil,
      reduced: nil
    },
    reduced_one_way_fare: nil
  }

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
      assert selected_modes_string(selected) =~ "commuter rail"
      assert selected_modes_string(selected) =~ "subway"
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
      assert stop_departure_display(row) == {:render, "11:43 AM"}
    end
  end

  describe "render_stop_departure_display/1" do
    test "does not render :blank" do
      refute render_stop_departure_display(:blank)
    end

    test "renders time when given one" do
      text = {:render, "11:00 AM"} |> render_stop_departure_display() |> safe_to_string
      assert text =~ "11:00 AM"
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
                 %Dotcom.StopBubble.Params{
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
                 %Dotcom.StopBubble.Params{
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

      assert class == "terminus transfer"
      assert render_type == :terminus
    end

    test "first stop is stop for a row other than the first" do
      [{_transfer_step, [%{class: class, render_type: render_type}]} | _rest] =
        bubble_params(@itinerary_row, 3)

      assert class == "stop transfer"
      assert render_type == :stop
    end
  end

  describe "render_steps/5" do
    @bubble_params [
      %Dotcom.StopBubble.Params{
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
        |> Enum.map(fn {_, _, [{_, _, [name]}]} -> String.trim(name) end)

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
      assert actual == "Green Line (B) Eastbound towards Government Center"
    end
  end

  describe "icon_for_routes/1" do
    test "returns a list of icons for the given routes" do
      routes = [
        %Route{
          id: "Red",
          type: 1
        },
        %Route{
          id: "Green",
          type: 0
        }
      ]

      assert icons = icon_for_routes(routes)
      assert length(icons) == 2

      [rl_icon | [gl_icon | _]] = icons
      assert safe_to_string(rl_icon) =~ "red-line"
      assert safe_to_string(gl_icon) =~ "green-line"
    end
  end

  describe "icon_for_route/1" do
    test "non-subway transit legs" do
      for {gtfs_type, expected_icon_class} <- [{2, "commuter-rail"}, {3, "bus"}, {4, "ferry"}] do
        route = %Route{
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
        route = %Route{
          id: id,
          type: type
        }

        icon = icon_for_route(route)
        assert safe_to_string(icon) =~ expected_icon_class
      end
    end

    test "rail replacement buses" do
      route = %Routes.Route{
        description: :rail_replacement_bus,
        type: 3
      }

      icon = icon_for_route(route)
      assert safe_to_string(icon) =~ "bus"
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

  describe "transfer_note/1" do
    @note_text "Total may be less with <a href=\"https://www.mbta.com/fares/transfers\">transfers</a>"
    @base_itinerary %Itinerary{start: nil, stop: nil, legs: []}
    leg_for_route = &%Leg{mode: %TransitDetail{route_id: &1}}
    @bus_leg leg_for_route.("77")
    @other_bus_leg leg_for_route.("28")
    @subway_leg leg_for_route.("Red")
    @other_subway_leg leg_for_route.("Orange")
    @cr_leg leg_for_route.("CR-Lowell")
    @ferry_leg leg_for_route.("Boat-F4")
    @express_bus_leg leg_for_route.("505")
    @sl_rapid_leg leg_for_route.("741")
    @sl_bus_leg leg_for_route.("751")

    test "shows note for subway-bus transfer" do
      note = %{@base_itinerary | legs: [@subway_leg, @bus_leg]} |> transfer_note
      assert note |> safe_to_string() =~ @note_text
    end

    test "shows note for bus-subway transfer" do
      note = %{@base_itinerary | legs: [@bus_leg, @subway_leg]} |> transfer_note
      assert note |> safe_to_string() =~ @note_text
    end

    test "shows note for bus-bus transfer" do
      note = %{@base_itinerary | legs: [@bus_leg, @other_bus_leg]} |> transfer_note
      assert note |> safe_to_string() =~ @note_text
    end

    test "shows note for SL4-bus transfer" do
      note = %{@base_itinerary | legs: [@sl_bus_leg, @bus_leg]} |> transfer_note
      assert note |> safe_to_string() =~ @note_text
    end

    test "shows note for SL1-bus transfer" do
      note = %{@base_itinerary | legs: [@sl_rapid_leg, @bus_leg]} |> transfer_note
      assert note |> safe_to_string() =~ @note_text
    end

    test "shows note for express bus-subway transfer" do
      note = %{@base_itinerary | legs: [@express_bus_leg, @subway_leg]} |> transfer_note
      assert note |> safe_to_string() =~ @note_text
    end

    test "shows note for express bus-local bus transfer" do
      note = %{@base_itinerary | legs: [@express_bus_leg, @bus_leg]} |> transfer_note
      assert note |> safe_to_string() =~ @note_text
    end

    test "no note when transfer involves ferry" do
      note = %{@base_itinerary | legs: [@ferry_leg, @bus_leg]} |> transfer_note
      refute note
    end

    test "no note when transfer involves commuter rail" do
      note = %{@base_itinerary | legs: [@cr_leg, @bus_leg]} |> transfer_note
      refute note
    end

    test "no note where no transit" do
      note =
        %{
          @base_itinerary
          | legs: [
              MockPlanner.personal_leg(nil, nil, nil, nil),
              MockPlanner.personal_leg(nil, nil, nil, nil)
            ]
        }
        |> transfer_note

      refute note
    end

    test "no note where no transit transfers" do
      note =
        %{
          @base_itinerary
          | legs: [
              MockPlanner.personal_leg(nil, nil, nil, nil),
              @bus_leg,
              MockPlanner.personal_leg(nil, nil, nil, nil)
            ]
        }
        |> transfer_note

      refute note
    end

    test "no note for subway-subway transfer - handles parent stops" do
      leg1 = %{@subway_leg | to: %NamedPosition{stop_id: "place-dwnxg"}}
      leg2 = %{@other_subway_leg | from: %NamedPosition{stop_id: "place-dwnxg"}}
      note = %{@base_itinerary | legs: [leg1, leg2]} |> transfer_note
      refute note
    end

    test "no note for subway-subway transfer - handles child stops" do
      leg1 = %{@subway_leg | to: %NamedPosition{stop_id: "70020"}}
      leg2 = %{@other_subway_leg | from: %NamedPosition{stop_id: "70021"}}
      note = %{@base_itinerary | legs: [leg1, leg2]} |> transfer_note
      refute note
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
        |> Dotcom.TripPlan.DateTime.round_minute()
        |> Timex.format!("{h12}:{m} {AM}, {M}/{D}/{YY}")

      assert format_plan_type_for_title(nil) === ["Depart at ", human_time]
    end
  end

  describe "format_minutes_duration/1" do
    test "for at least an hour" do
      assert format_minutes_duration(66) === "1 hr 6 min"
    end

    test "for less than an hour" do
      assert format_minutes_duration(17) === "17 min"
    end
  end

  describe "index.html" do
    plan_datetime_selector_fields = %{
      dateEl: %{
        container: "plan-date",
        input: "plan-date-input",
        select: "plan-date-select",
        label: "plan-date-label"
      }
    }

    @index_assigns %{
      date: Util.now(),
      date_time: Util.now(),
      errors: [],
      modes: %{},
      optimize_for: :best_route,
      initial_map_data: Dotcom.TripPlan.Map.initial_map_data(),
      plan_datetime_selector_fields: plan_datetime_selector_fields
    }

    test "renders the form with all fields", %{conn: conn} do
      html =
        "_sidebar.html"
        |> render(Map.put(@index_assigns, :conn, conn))
        |> safe_to_string()

      # two blocks because of the <noscript> block
      assert [{"div", _, form}, {"div", _, _no_script_form}] = Floki.find(html, ".plan-date-time")
      assert [{"select", _, _year_opts}] = Floki.find(form, ~s([name="plan[date_time][year]"]))
      assert [{"select", _, _month_opts}] = Floki.find(form, ~s([name="plan[date_time][month]"]))
      assert [{"select", _, _month_opts}] = Floki.find(form, ~s([name="plan[date_time][day]"]))
      assert [{"select", _, _hour_options}] = Floki.find(form, ~s([name="plan[date_time][hour]"]))

      assert [{"select", _, _minute_options}] =
               Floki.find(form, ~s([name="plan[date_time][minute]"]))
    end

    test "includes a text field for the javascript datepicker to attach to", %{conn: conn} do
      html =
        "_sidebar.html"
        |> render(Map.put(@index_assigns, :conn, conn))
        |> safe_to_string()

      # two inputs because of the <noscript> block
      assert [{"input", _, _}, {"input", _, _}] =
               Floki.find(html, ~s(input#plan-date-input[type="text"]))
    end
  end

  describe "Fares logic" do
    @fares_assigns %{
      itinerary: %Itinerary{
        start: nil,
        stop: nil,
        legs: [],
        passes: %{
          base_month_pass: %Fare{
            additional_valid_modes: [:bus],
            cents: 9_000,
            duration: :month,
            media: [:charlie_card, :charlie_ticket],
            mode: :subway,
            name: :subway,
            price_label: nil,
            reduced: nil
          }
        }
      },
      one_way_total: "$2.90",
      round_trip_total: "$5.80"
    }

    @itinerary %TripPlan.Itinerary{
      start: nil,
      stop: nil,
      legs: [
        %TripPlan.Leg{
          description: "WALK",
          from: %TripPlan.NamedPosition{
            latitude: 42.365486,
            longitude: -71.103802,
            name: "Central",
            stop_id: nil
          },
          long_name: nil,
          mode: %TripPlan.PersonalDetail{
            distance: 24.274,
            steps: [
              %TripPlan.PersonalDetail.Step{
                absolute_direction: :southeast,
                distance: 24.274,
                relative_direction: :depart,
                street_name: "Massachusetts Avenue"
              }
            ]
          },
          name: "",
          polyline: "eoqaGzm~pLTe@BE@A",
          to: %TripPlan.NamedPosition{
            latitude: 42.365304,
            longitude: -71.103621,
            name: "Central",
            stop_id: "70069"
          },
          type: nil,
          url: nil
        },
        %TripPlan.Leg{
          description: "SUBWAY",
          from: %TripPlan.NamedPosition{
            latitude: 42.365304,
            longitude: -71.103621,
            name: "Central",
            stop_id: "70069"
          },
          long_name: "Red Line",
          mode: %TripPlan.TransitDetail{
            fares: @fares,
            intermediate_stop_ids: ["70071", "70073"],
            route_id: "Red",
            trip_id: "43870769C0"
          },
          name: "Red Line",
          to: %TripPlan.NamedPosition{
            latitude: 42.356395,
            longitude: -71.062424,
            name: "Park Street",
            stop_id: "70075"
          },
          type: "1",
          url: "http://www.mbta.com"
        }
      ],
      passes: %{
        base_month_pass: %Fare{
          additional_valid_modes: [:bus],
          cents: 9_000,
          duration: :month,
          media: [:charlie_card, :charlie_ticket],
          mode: :subway,
          name: :subway,
          price_label: nil,
          reduced: nil
        },
        recommended_month_pass: %Fare{
          additional_valid_modes: [:bus],
          cents: 9_000,
          duration: :month,
          media: [:charlie_card, :charlie_ticket],
          mode: :subway,
          name: :subway,
          price_label: nil,
          reduced: nil
        },
        reduced_month_pass: %Fare{
          additional_valid_modes: [:bus],
          cents: 9_000,
          duration: :month,
          media: [:charlie_card, :charlie_ticket],
          mode: :subway,
          name: :subway,
          price_label: nil,
          reduced: nil
        }
      }
    }

    test "renders fare information", %{conn: conn} do
      fares_assigns =
        @fares_assigns
        |> Map.put(:conn, conn)
        |> Map.put(:show_fares, true)
        |> Map.put(:itinerary_is_from_or_to_airport, false)

      html =
        "_itinerary_fares.html"
        |> render(fares_assigns)
        |> safe_to_string()

      [{_, _, [one_way_fare]}] = Floki.find(html, ".m-trip-plan-results__itinerary-fare--one-way")

      [{_, _, [round_trip_fare]}] =
        Floki.find(html, ".m-trip-plan-results__itinerary-fare--round-trip")

      assert one_way_fare == "$2.90 one way"
      assert round_trip_fare == "$5.80 round trip"
    end

    test "gets the highest one-way fare" do
      assert get_one_way_total_by_type(@itinerary, :highest_one_way_fare) == 290
    end

    test "gets the total for a reduced one-way fare" do
      assert get_one_way_total_by_type(@itinerary, :reduced_one_way_fare) == 110
    end

    test "gets calculated fares" do
      bus_fares = %{
        highest_one_way_fare: %Fares.Fare{
          additional_valid_modes: [],
          cents: 200,
          duration: :single_trip,
          media: [:charlie_ticket, :cash],
          mode: :bus,
          name: :local_bus,
          price_label: nil,
          reduced: nil
        },
        lowest_one_way_fare: %Fares.Fare{
          additional_valid_modes: [],
          cents: 170,
          duration: :single_trip,
          media: [:charlie_card],
          mode: :bus,
          name: :local_bus,
          price_label: nil,
          reduced: nil
        },
        reduced_one_way_fare: %Fares.Fare{
          additional_valid_modes: [],
          cents: 85,
          duration: :single_trip,
          media: [:senior_card],
          mode: :bus,
          name: :local_bus,
          price_label: nil,
          reduced: :senior_disabled
        }
      }

      itinerary = %TripPlan.Itinerary{
        start: nil,
        stop: nil,
        legs: [
          %TripPlan.Leg{
            description: "WALK",
            from: %TripPlan.NamedPosition{
              latitude: 42.365486,
              longitude: -71.103802,
              name: "Central",
              stop_id: nil
            },
            long_name: nil,
            mode: %TripPlan.PersonalDetail{
              distance: 24.274,
              steps: [
                %TripPlan.PersonalDetail.Step{
                  absolute_direction: :southeast,
                  distance: 24.274,
                  relative_direction: :depart,
                  street_name: "Massachusetts Avenue"
                }
              ]
            },
            name: "",
            polyline: "eoqaGzm~pLTe@BE@A",
            to: %TripPlan.NamedPosition{
              latitude: 42.365304,
              longitude: -71.103621,
              name: "Central",
              stop_id: "70069"
            },
            type: nil,
            url: nil
          },
          %TripPlan.Leg{
            description: "SUBWAY",
            from: %TripPlan.NamedPosition{
              latitude: 42.365304,
              longitude: -71.103621,
              name: "Central",
              stop_id: "70069"
            },
            long_name: "Red Line",
            mode: %TripPlan.TransitDetail{
              fares: @fares,
              intermediate_stop_ids: ["70071", "70073"],
              route_id: "Red",
              trip_id: "43870769C0"
            },
            name: "Red Line",
            to: %TripPlan.NamedPosition{
              latitude: 42.356395,
              longitude: -71.062424,
              name: "Park Street",
              stop_id: "70075"
            },
            type: "1",
            url: "http://www.mbta.com"
          },
          %TripPlan.Leg{
            description: "BUS",
            from: %TripPlan.NamedPosition{
              latitude: 42.362804,
              longitude: -71.099509,
              name: "Massachusetts Ave @ Sidney St",
              stop_id: "73"
            },
            long_name: "Harvard Square - Dudley Station",
            mode: %TripPlan.TransitDetail{
              fares: bus_fares,
              intermediate_stop_ids: ["74", "75", "77", "79", "80"],
              route_id: "1",
              trip_id: "44170977"
            },
            name: "1",
            to: %TripPlan.NamedPosition{
              latitude: 42.342478,
              longitude: -71.084701,
              name: "Massachusetts Ave @ Huntington Ave",
              stop_id: "82"
            },
            type: "1",
            url: "http://www.mbta.com"
          },
          %TripPlan.Leg{
            description: "SUBWAY",
            from: %TripPlan.NamedPosition{
              latitude: 42.365304,
              longitude: -71.103621,
              name: "Central",
              stop_id: "70069"
            },
            long_name: "Red Line",
            mode: %TripPlan.TransitDetail{
              fares: @fares,
              intermediate_stop_ids: ["70071", "70073"],
              route_id: "Red",
              trip_id: "43870769C0"
            },
            name: "Red Line",
            to: %TripPlan.NamedPosition{
              latitude: 42.356395,
              longitude: -71.062424,
              name: "Park Street",
              stop_id: "70075"
            },
            type: "1",
            url: "http://www.mbta.com"
          }
        ]
      }

      calculated_fares = %{
        subway: %{
          mode: %{
            fares: @fares,
            mode_name: "Subway",
            name: "Subway",
            mode: :subway
          }
        },
        bus: %{
          mode: %{
            fares: bus_fares,
            mode_name: "Bus",
            name: "Local Bus",
            mode: :bus
          }
        }
      }

      assert get_calculated_fares(itinerary) == calculated_fares
    end

    test "includes a shuttle fare" do
      itinerary = %Itinerary{
        legs: [
          %Leg{
            description: "BUS",
            from: %NamedPosition{
              latitude: 42.370864,
              longitude: -71.077534,
              name: "Lechmere",
              stop_id: "9070092"
            },
            long_name: "Green Line Shuttle",
            mode: %TransitDetail{
              fares: @shuttle_fares,
              intermediate_stop_ids: ["9070093"],
              route_id: "Shuttle-LechmereNorthStation",
              trip_id: "43831675C0-LechmereNorthStation1"
            },
            name: "Green Line Shuttle",
            to: %NamedPosition{
              latitude: 42.36573,
              longitude: -71.063989,
              name: "North Station",
              stop_id: "9070090"
            },
            type: "1"
          },
          %Leg{
            description: "TRAM",
            from: %NamedPosition{
              latitude: 42.365577,
              longitude: -71.06129,
              name: "North Station",
              stop_id: "70206"
            },
            long_name: "Green Line C",
            mode: %TransitDetail{
              fares: %{
                highest_one_way_fare: @highest_one_way_fare,
                lowest_one_way_fare: @lowest_one_way_fare,
                reduced_one_way_fare: @reduced_one_way_fare
              },
              intermediate_stop_ids: ["70204", "70202", "70197", "70159", "70157"],
              route_id: "Green-C",
              trip_id: "43829886C0-LechmereNorthStation"
            },
            name: "C",
            to: %NamedPosition{
              latitude: 42.350126,
              longitude: -71.077376,
              name: "Copley",
              stop_id: "70155"
            },
            type: "1"
          }
        ],
        start: nil,
        stop: nil
      }

      expected_fares = %{
        bus: %{
          mode: %{
            fares: @shuttle_fares,
            mode_name: "Bus",
            name: "Shuttle",
            mode: :bus
          }
        },
        subway: %{
          mode: %{
            fares: %{
              highest_one_way_fare: @highest_one_way_fare,
              lowest_one_way_fare: @lowest_one_way_fare,
              reduced_one_way_fare: @reduced_one_way_fare
            },
            mode_name: "Subway",
            name: "Subway",
            mode: :subway
          }
        }
      }

      assert get_calculated_fares(itinerary) == expected_fares
    end

    test "when there's a free shuttle and then a transfer to a paid leg, the total should include the cost of the paid leg(s)" do
      itinerary = %Itinerary{
        legs: [
          %Leg{
            description: "BUS",
            from: %TripPlan.NamedPosition{
              latitude: 42.436807,
              longitude: -71.070338,
              name: "Oak Grove Busway",
              stop_id: "9328"
            },
            long_name: "Oak Grove - Government Center",
            mode: %TransitDetail{
              fares: @shuttle_fares,
              intermediate_stop_ids: [
                "53270",
                "5271",
                "28743",
                "29001",
                "9070028",
                "9170206",
                "9070024",
                "65"
              ],
              route_id: "Shuttle-GovernmentCenterOakGrove",
              trip_id: "Orange-AugSuperSurge-Weekday-N-0-16:28:30"
            },
            name: "Orange Line Shuttle",
            to: %NamedPosition{
              latitude: 42.360043,
              longitude: -71.0598,
              name: "Cambridge St @ Government Ctr Sta",
              stop_id: "4510"
            },
            type: "1",
            url: "http://www.mbta.com"
          },
          %Leg{
            description: "TRAM",
            from: %NamedPosition{
              latitude: 42.359705,
              longitude: -71.059215,
              name: "Government Center",
              stop_id: "70202"
            },
            long_name: "Green Line D",
            mode: %TransitDetail{
              fares: %{
                highest_one_way_fare: @highest_one_way_fare,
                lowest_one_way_fare: @lowest_one_way_fare,
                reduced_one_way_fare: @reduced_one_way_fare
              },
              intermediate_stop_ids: ["70198"],
              route_id: "Green-D",
              trip_id: "52140322-CloseUnionGovtGovtCtrNorthSta2"
            },
            name: "D",
            to: %TripPlan.NamedPosition{
              latitude: 42.353214,
              longitude: -71.064545,
              name: "Boylston",
              stop_id: "70159"
            },
            type: "1",
            url: "http://www.mbta.com"
          }
        ],
        start: nil,
        stop: nil
      }

      assert get_one_way_total_by_type(itinerary, :highest_one_way_fare) == 290
    end

    test "removes cash from payment options for Commuter Rail" do
      cr_fare = %Fare{
        media: [:commuter_ticket, :cash, :mticket],
        mode: :commuter_rail
      }

      subway_fare = %Fare{
        media: [:commuter_ticket, :cash],
        mode: :subway
      }

      assert cr_fare |> filter_media() == [
               :commuter_ticket,
               :mticket
             ]

      assert subway_fare |> filter_media() == subway_fare.media
    end

    test "formats mode properly" do
      cr = %{
        mode_name: "Commuter Rail",
        name: "Zone 8",
        mode: :commuter_rail
      }

      bus = %{
        name: "Bus",
        mode: :bus
      }

      subway = %{
        mode_name: "Subway",
        mode: :subway
      }

      assert format_mode(cr) == "Commuter Rail Zone 8"
      assert format_mode(bus) == "Bus"
      assert format_mode(subway) == "Subway"
    end

    test "gets the highest one-way fare correctly with subway -> subway xfer" do
      subway_leg_for_route =
        &%Leg{
          from: %NamedPosition{},
          to: %NamedPosition{},
          mode: %TransitDetail{
            route_id: &1,
            fares: %{
              highest_one_way_fare: %Fares.Fare{
                additional_valid_modes: [:bus],
                cents: 290,
                duration: :single_trip,
                media: [:charlie_ticket, :cash],
                mode: :subway,
                name: :subway,
                price_label: nil,
                reduced: nil
              },
              lowest_one_way_fare: %Fares.Fare{
                additional_valid_modes: [:bus],
                cents: 240,
                duration: :single_trip,
                media: [:charlie_card],
                mode: :subway,
                name: :subway,
                price_label: nil,
                reduced: nil
              }
            }
          }
        }

      red_leg = %{
        subway_leg_for_route.("Red")
        | to: %NamedPosition{
            stop_id: "place-dwnxg"
          }
      }

      orange_leg = %{
        subway_leg_for_route.("Orange")
        | from: %NamedPosition{
            stop_id: "place-dwnxg"
          }
      }

      itinerary = %TripPlan.Itinerary{
        start: nil,
        stop: nil,
        legs: [red_leg, orange_leg]
      }

      assert get_one_way_total_by_type(itinerary, :highest_one_way_fare) == 290
    end

    test "returns 0 when there is no highest one-way fare" do
      itinerary = %TripPlan.Itinerary{
        start: nil,
        stop: nil,
        legs: [
          %TripPlan.Leg{
            description: "WALK",
            from: %TripPlan.NamedPosition{
              latitude: 42.365486,
              longitude: -71.103802,
              name: "Central",
              stop_id: nil
            },
            long_name: nil,
            mode: %TripPlan.PersonalDetail{
              distance: 24.274,
              steps: [
                %TripPlan.PersonalDetail.Step{
                  absolute_direction: :southeast,
                  distance: 24.274,
                  relative_direction: :depart,
                  street_name: "Massachusetts Avenue"
                }
              ]
            },
            name: "",
            polyline: "eoqaGzm~pLTe@BE@A",
            to: %TripPlan.NamedPosition{
              latitude: 42.365304,
              longitude: -71.103621,
              name: "Central",
              stop_id: "70069"
            },
            type: nil,
            url: nil
          },
          %TripPlan.Leg{
            description: "SUBWAY",
            from: %TripPlan.NamedPosition{
              latitude: 42.365304,
              longitude: -71.103621,
              name: "Central",
              stop_id: "70069"
            },
            long_name: "Red Line",
            mode: %TripPlan.TransitDetail{
              fares: %{
                highest_one_way_fare: nil,
                lowest_one_way_fare: nil
              },
              intermediate_stop_ids: ["70071", "70073"],
              route_id: "Red",
              trip_id: "43870769C0"
            },
            name: "Red Line",
            to: %TripPlan.NamedPosition{
              latitude: 42.356395,
              longitude: -71.062424,
              name: "Park Street",
              stop_id: "70075"
            },
            type: "1",
            url: "http://www.mbta.com"
          }
        ]
      }

      assert get_one_way_total_by_type(itinerary, :highest_one_way_fare) == 0
    end

    test "shows a transfer note", %{conn: conn} do
      fares_with_transfer =
        Map.put(@fares_assigns, :itinerary, %{
          @fares_assigns.itinerary
          | legs: [
              %Leg{
                mode: %TransitDetail{route_id: "77"},
                from: %TripPlan.NamedPosition{
                  stop_id: ""
                },
                to: %TripPlan.NamedPosition{
                  stop_id: ""
                }
              },
              %Leg{
                mode: %TransitDetail{route_id: "1"},
                from: %TripPlan.NamedPosition{
                  stop_id: ""
                },
                to: %TripPlan.NamedPosition{
                  stop_id: ""
                }
              }
            ]
        })

      itinerary_fares =
        fares_with_transfer
        |> Map.put(:conn, conn)
        |> Map.put(:show_fares, true)
        |> Map.put(:itinerary_is_from_or_to_airport, false)

      html =
        "_itinerary_fares.html"
        |> render(itinerary_fares)
        |> safe_to_string()

      [{_, _, transfer_note}] = Floki.find(html, ".m-trip-plan-results__itinerary-note")

      assert transfer_note != []
    end

    test "shows no transfer note", %{conn: conn} do
      fares_no_transfer =
        Map.put(@fares_assigns, "itinerary", %{
          @fares_assigns.itinerary
          | legs: [
              %Leg{mode: %TransitDetail{route_id: "77"}}
            ]
        })

      itinerary_fares =
        fares_no_transfer
        |> Map.put(:conn, conn)
        |> Map.put(:show_fares, true)
        |> Map.put(:itinerary_is_from_or_to_airport, false)

      html =
        "_itinerary_fares.html"
        |> render(itinerary_fares)
        |> safe_to_string()

      [{_, _, transfer_note}] = Floki.find(html, ".m-trip-plan-results__itinerary-note")

      assert transfer_note == []
    end

    test "renders the Fare Calculator", %{conn: conn} do
      leg_for_route =
        &%Leg{
          from: %TripPlan.NamedPosition{
            stop_id: ""
          },
          mode: %TransitDetail{
            route_id: &1,
            fares: @fares
          },
          to: %TripPlan.NamedPosition{
            stop_id: ""
          }
        }

      bus_leg = leg_for_route.("77")
      subway_leg = leg_for_route.("Red")

      html =
        "_fare_calculator.html"
        |> render_to_string(
          itinerary: @itinerary,
          fares: get_calculated_fares(@itinerary),
          conn: conn,
          itinerary_is_from_or_to_airport: false,
          show_fares: true
        )

      fare_calc_tables = Floki.find(html, ".m-trip-plan-farecalc__table")
      assert Enum.count(fare_calc_tables) == 2

      titles = Floki.find(html, ".m-trip-plan-farecalc__title")
      assert Enum.count(titles) == 1

      notes_blocks = Floki.find(html, ".m-trip-plan-farecalc__notes-block")
      assert Enum.count(notes_blocks) == 1

      links = Floki.find(html, "a")
      assert Enum.count(links) == 2

      itinerary_with_transfers = %{@itinerary | legs: [bus_leg, subway_leg]}

      html_with_transfer_note =
        "_fare_calculator.html"
        |> render_to_string(
          itinerary: itinerary_with_transfers,
          fares: get_calculated_fares(@itinerary),
          conn: conn,
          itinerary_is_from_or_to_airport: false,
          show_fares: true
        )

      titles = Floki.find(html_with_transfer_note, ".m-trip-plan-farecalc__title")
      assert Enum.count(titles) == 2

      notes_blocks = Floki.find(html_with_transfer_note, ".m-trip-plan-farecalc__notes-block")
      assert Enum.count(notes_blocks) == 2

      links = Floki.find(html_with_transfer_note, "a")
      assert Enum.count(links) == 3
    end

    test "includes Logan in the trip", %{conn: conn} do
      legs = [
        %TripPlan.Leg{
          description: "BUS",
          from: %TripPlan.NamedPosition{
            latitude: 42.366494,
            longitude: -71.017289,
            name: "Terminal C - Arrivals Level",
            stop_id: "17094"
          },
          long_name: "Logan Airport Terminals - South Station",
          mode: %TripPlan.TransitDetail{
            fares: %{
              highest_one_way_fare: %Fares.Fare{
                additional_valid_modes: [],
                cents: 0,
                duration: :single_trip,
                media: [],
                mode: :bus,
                name: :free_fare,
                price_label: nil,
                reduced: nil
              },
              lowest_one_way_fare: %Fares.Fare{
                additional_valid_modes: [],
                cents: 0,
                duration: :single_trip,
                media: [],
                mode: :bus,
                name: :free_fare,
                price_label: nil,
                reduced: nil
              },
              reduced_one_way_fare: nil
            },
            intermediate_stop_ids: ["17095", "17096", "74614", "74615", "74616"],
            route_id: "741",
            trip_id: "44812009"
          },
          name: "SL1",
          to: %TripPlan.NamedPosition{
            latitude: 42.352271,
            longitude: -71.055242,
            name: "South Station",
            stop_id: "74617"
          },
          type: "1",
          url: "http://www.mbta.com"
        }
      ]

      itinerary = %{@itinerary | legs: legs}

      # Render blue summary
      fares_estimate_html =
        "_itinerary_fares.html"
        |> render_to_string(
          itinerary: itinerary,
          one_way_total: nil,
          round_trip_total: nil,
          itinerary_is_from_or_to_airport: true,
          show_fares: true
        )

      [{_, [{_, _}], [{_, [{_, _}, {_, _}], [logan_guide_link]}]}] =
        Floki.find(fares_estimate_html, ".m-trip-plan-results__itinerary-fare--round-trip")

      assert logan_guide_link =~ "Logan Airport destination guide"

      # Render fare calculator
      itinerary_html =
        "_fare_calculator.html"
        |> render_to_string(
          itinerary: itinerary,
          fares: get_calculated_fares(itinerary),
          conn: conn,
          itinerary_is_from_or_to_airport: true,
          show_fares: true
        )

      [{_, [{_, _}, {_, _}], [free_service_text]}] =
        Floki.find(itinerary_html, ".m-trip-plan-farecalc__mode-name")

      assert free_service_text =~ "Free Service"

      [{_, [{_, _}], [{_, [{_, _}], [_]}, logan_blurb, {_, [{_, _}, {_, _}], [_]}]}, _] =
        Floki.find(itinerary_html, ".m-trip-plan-farecalc__notes-block")

      assert logan_blurb =~ "Silver Line service from Logan Airport is always free"
    end
  end

  describe "monthly_pass" do
    test "Formats the media type and price" do
      fare = %Fare{
        additional_valid_modes: [:bus],
        cents: 9_000,
        duration: :month,
        media: [:charlie_card, :charlie_ticket],
        mode: :subway,
        name: :subway,
        price_label: nil,
        reduced: nil
      }

      assert monthly_pass(fare) == "Monthly LinkPass: $90.00"
    end

    test "Includes the zone for CR trips" do
      fare = %Fare{
        additional_valid_modes: [:subway, :bus, :ferry],
        cents: 36_000,
        duration: :month,
        media: [:commuter_ticket],
        mode: :commuter_rail,
        name: {:zone, "7"},
        price_label: nil,
        reduced: nil
      }

      assert monthly_pass(fare) == "Commuter Rail Zone 7: $360.00"
    end

    test "accepts nil" do
      assert monthly_pass(nil) == "Shuttle: None"
    end
  end

  describe "show_monthly_passes?/1" do
    test "returns false if the itinerary contains a single transit leg that's specifically a Silver Line trip from the airport" do
      sl_from_logan_itinerary = %Itinerary{
        legs: [
          %Leg{
            description: "WALK",
            mode: %TripPlan.PersonalDetail{
              distance: 510.2
            }
          },
          %Leg{
            description: "BUS",
            from: %NamedPosition{
              name: "Terminal C - Arrivals Level",
              stop_id: "17094"
            },
            mode: %TransitDetail{
              route_id: "741"
            },
            name: "SL1",
            to: %NamedPosition{
              name: "South Station",
              stop_id: "74617"
            },
            type: "1"
          }
        ],
        start: DateTime.from_unix!(0),
        stop: DateTime.from_unix!(0)
      }

      refute show_monthly_passes?(sl_from_logan_itinerary)
    end

    test "returns true for all other itineraries" do
      login_sl_plus_subway_itinerary = %TripPlan.Itinerary{
        legs: [
          %TripPlan.Leg{
            description: "WALK",
            mode: %TripPlan.PersonalDetail{
              distance: 385.75800000000004
            }
          },
          %TripPlan.Leg{
            description: "BUS",
            from: %TripPlan.NamedPosition{
              name: "Terminal A",
              stop_id: "17091"
            },
            mode: %TripPlan.TransitDetail{
              route_id: "741"
            },
            name: "SL1",
            to: %TripPlan.NamedPosition{
              name: "South Station",
              stop_id: "74617"
            },
            type: "1"
          },
          %TripPlan.Leg{
            description: "WALK",
            mode: %TripPlan.PersonalDetail{
              distance: 0.0
            },
            name: ""
          },
          %TripPlan.Leg{
            description: "SUBWAY",
            from: %TripPlan.NamedPosition{
              name: "South Station",
              stop_id: "70080"
            },
            mode: %TripPlan.TransitDetail{
              route_id: "Red"
            },
            name: "Red Line",
            to: %TripPlan.NamedPosition{
              name: "Downtown Crossing",
              stop_id: "70078"
            },
            type: "1"
          }
        ],
        start: DateTime.from_unix!(0),
        stop: DateTime.from_unix!(0)
      }

      assert show_monthly_passes?(login_sl_plus_subway_itinerary)
    end

    test "returns true for an itinerary without any transit legs" do
      no_transit_legs_itinerary = %TripPlan.Itinerary{
        legs: [
          %TripPlan.Leg{
            description: "WALK",
            mode: %TripPlan.PersonalDetail{
              distance: 385.75800000000004
            }
          },
          %TripPlan.Leg{
            description: "WALK",
            mode: %TripPlan.PersonalDetail{
              distance: 0.0
            }
          }
        ],
        start: DateTime.from_unix!(0),
        stop: DateTime.from_unix!(0)
      }

      assert show_monthly_passes?(no_transit_legs_itinerary)
    end
  end
end
