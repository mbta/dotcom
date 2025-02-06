defmodule DotcomWeb.TripPlanViewTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.TripPlanView
  import Mox
  import Phoenix.HTML, only: [safe_to_string: 1]
  import Schedules.Repo, only: [end_of_rating: 0]

  alias Dotcom.TripPlan.{
    IntermediateStop,
    Itinerary,
    ItineraryRow,
    Leg,
    NamedPosition,
    PersonalDetail,
    Query,
    TransitDetail
  }

  alias Fares.Fare
  alias OpenTripPlannerClient.Schema.Step
  alias Test.Support.Factories.{Stops.Stop, TripPlanner.TripPlanner}

  @highest_one_way_fare %Fares.Fare{
    additional_valid_modes: [:bus],
    cents: 240,
    duration: :single_trip,
    media: [:charlie_card, :charlie_ticket, :contactless_payment, :cash],
    mode: :subway,
    name: :subway,
    price_label: nil,
    reduced: nil
  }

  @lowest_one_way_fare %Fares.Fare{
    additional_valid_modes: [:bus],
    cents: 240,
    duration: :single_trip,
    media: [:charlie_card, :charlie_ticket, :contactless_payment, :cash],
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

  setup :verify_on_exit!

  setup do
    stub(Stops.Repo.Mock, :get, fn _ ->
      Stop.build(:stop)
    end)

    stub(MBTA.Api.Mock, :get_json, fn "/schedules/", [route: "Red", date: "1970-01-01"] ->
      {:error,
       [
         %JsonApi.Error{
           code: "no_service",
           source: %{
             "parameter" => "date"
           },
           detail: "The current rating does not describe service on that date.",
           meta: %{
             "end_date" => "2024-06-15",
             "start_date" => "2024-05-10",
             "version" => "Spring 2024, 2024-05-17T21:10:15+00:00, version D"
           }
         }
       ]}
    end)

    :ok
  end

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
          wheelchair: true
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
          wheelchair: false
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
      from = TripPlanner.build(:stop_named_position)

      query = %Query{
        from: {:ok, from},
        to: {:error, :no_results},
        itineraries: {:error, :unknown}
      }

      assert rendered_location_error(conn, query, :from) == ""

      assert rendered_location_error(conn, query, :to) ==
               "We're sorry, but we couldn't find that address."
    end
  end

  describe "mode_class/1" do
    test "returns the icon atom if a route is present" do
      row = %ItineraryRow{route: %Routes.Route{id: "Red"}}

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
    test "builds bubble_params for each step" do
      id = Faker.Color.name()
      long_name = "#{id} Line"

      itinerary_row = %ItineraryRow{
        transit?: true,
        stop: {"Park Street", "place-park"},
        steps: ["Boylston", "Arlington", "Copley"],
        route: %Routes.Route{id: id, long_name: long_name, type: 1}
      }

      params = bubble_params(itinerary_row, nil)

      for {_step, param} <- params do
        assert [
                 %Dotcom.StopBubble.Params{
                   route_id: ^id,
                   route_type: 1,
                   render_type: :stop,
                   bubble_branch: ^long_name
                 }
               ] = param
      end

      assert Enum.map(params, &elem(&1, 0)) == [:transfer | itinerary_row.steps]
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
        date_time: Dotcom.Utils.DateTime.now()
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

  describe "format_additional_route/2" do
    test "Correctly formats Green Line route" do
      destination = Test.Support.Factories.Stops.Stop.build(:stop, %{name: "Destination"})

      expect(Stops.Repo.Mock, :by_route, 8, fn route_id, direction_id ->
        if route_id == "Green-B" && direction_id == 1 do
          [destination]
        else
          Test.Support.Factories.Stops.Stop.build_list(3, :stop)
        end
      end)

      route = %Routes.Route{
        name: "Green Line B",
        id: "Green-B",
        direction_names: %{1 => "Eastbound"}
      }

      actual = route |> format_additional_route(1) |> IO.iodata_to_binary()
      assert actual == "Green Line (B) Eastbound towards #{destination.name}"
    end
  end

  describe "icon_for_routes/1" do
    test "returns a list of icons for the given routes" do
      routes = [
        %Routes.Route{
          id: "Red",
          type: 1
        },
        %Routes.Route{
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
      stub(Routes.Repo.Mock, :green_line, fn ->
        Routes.Repo.green_line()
      end)

      assert transfer_route_name(%Routes.Route{id: "Mattapan", type: 0, name: "Mattapan Trolley"}) ==
               "Mattapan Trolley"

      assert transfer_route_name(%Routes.Route{id: "Green", type: 0, name: "Green Line"}) ==
               "Green Line"

      for branch <- ["B", "C", "D", "E"] do
        assert transfer_route_name(%Routes.Route{
                 id: "Green-" <> branch,
                 type: 0,
                 name: "Green Line " <> branch
               }) == "Green Line"
      end

      for line <- ["Red", "Orange", "Blue"] do
        assert transfer_route_name(%Routes.Route{id: line, type: 1, name: line <> " Line"}) ==
                 line <> " Line"
      end
    end

    test "for other modes" do
      assert transfer_route_name(%Routes.Route{
               id: "CR-Fitchburg",
               type: 2,
               name: "Fitchburg Line"
             }) ==
               "Commuter Rail"

      assert transfer_route_name(%Routes.Route{id: "77", type: 3, name: "77"}) == "Bus"

      assert transfer_route_name(%Routes.Route{id: "Boat-Hingham", type: 4, name: "Hingham Ferry"}) ==
               "Ferry"
    end
  end

  describe "transfer_note/1" do
    setup do
      stub(Stops.Repo.Mock, :get_parent, fn id ->
        %Stops.Stop{id: id}
      end)

      :ok
    end

    @note_text "Total may be less with <a href=\"https://www.mbta.com/fares/transfers\">transfers</a>"
    @base_itinerary %Itinerary{start: nil, stop: nil, legs: []}
    defp bus_leg, do: TripPlanner.build(:bus_leg)
    defp subway_leg, do: TripPlanner.build(:subway_leg)
    defp cr_leg, do: TripPlanner.build(:cr_leg)
    defp ferry_leg, do: TripPlanner.build(:ferry_leg)
    defp xp_leg, do: TripPlanner.build(:express_bus_leg)
    defp sl_rapid_leg, do: TripPlanner.build(:sl_rapid_leg)
    defp sl_bus_leg, do: TripPlanner.build(:sl_bus_leg)

    test "shows note for subway-bus transfer" do
      note = %{@base_itinerary | legs: [subway_leg(), bus_leg()]} |> transfer_note
      assert note |> safe_to_string() =~ @note_text
    end

    test "shows note for bus-subway transfer" do
      note = %{@base_itinerary | legs: [bus_leg(), subway_leg()]} |> transfer_note
      assert note |> safe_to_string() =~ @note_text
    end

    test "shows note for bus-bus transfer" do
      note = %{@base_itinerary | legs: [bus_leg(), bus_leg()]} |> transfer_note
      assert note |> safe_to_string() =~ @note_text
    end

    test "shows note for SL4-bus transfer" do
      note = %{@base_itinerary | legs: [sl_bus_leg(), bus_leg()]} |> transfer_note
      assert note |> safe_to_string() =~ @note_text
    end

    test "shows note for SL1-bus transfer" do
      note = %{@base_itinerary | legs: [sl_rapid_leg(), bus_leg()]} |> transfer_note
      assert note |> safe_to_string() =~ @note_text
    end

    test "shows note for express bus-subway transfer" do
      note = %{@base_itinerary | legs: [xp_leg(), subway_leg()]} |> transfer_note
      assert note |> safe_to_string() =~ @note_text
    end

    test "shows note for express bus-local bus transfer" do
      note = %{@base_itinerary | legs: [xp_leg(), bus_leg()]} |> transfer_note
      assert note |> safe_to_string() =~ @note_text
    end

    test "no note when transfer involves ferry" do
      note = %{@base_itinerary | legs: [ferry_leg(), bus_leg()]} |> transfer_note
      refute note
    end

    test "no note when transfer involves commuter rail" do
      note = %{@base_itinerary | legs: [cr_leg(), bus_leg()]} |> transfer_note
      refute note
    end

    test "no note where no transit" do
      note =
        %{
          @base_itinerary
          | legs: [
              TripPlanner.build(:walking_leg),
              TripPlanner.build(:walking_leg)
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
              TripPlanner.build(:walking_leg),
              bus_leg(),
              TripPlanner.build(:walking_leg)
            ]
        }
        |> transfer_note

      refute note
    end

    test "no note for subway-subway transfer - handles parent stops" do
      expect(Stops.Repo.Mock, :get_parent, 2, fn id ->
        %Stops.Stop{id: id}
      end)

      leg1 = %{subway_leg() | to: %NamedPosition{stop: %Stops.Stop{id: "place-dwnxg"}}}
      leg2 = %{subway_leg() | from: %NamedPosition{stop: %Stops.Stop{id: "place-dwnxg"}}}
      note = %{@base_itinerary | legs: [leg1, leg2]} |> transfer_note
      refute note
    end

    test "no note for subway-subway transfer - handles child stops" do
      expect(Stops.Repo.Mock, :get_parent, 2, fn _ ->
        %Stops.Stop{id: "place-dwnxg"}
      end)

      leg1 = %{subway_leg() | to: %NamedPosition{stop: %Stops.Stop{id: "70020"}}}
      leg2 = %{subway_leg() | from: %NamedPosition{stop: %Stops.Stop{id: "70021"}}}
      note = %{@base_itinerary | legs: [leg1, leg2]} |> transfer_note
      refute note
    end
  end

  describe "format_plan_type_for_title/1" do
    @now Dotcom.Utils.DateTime.now()
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
        Dotcom.Utils.DateTime.now()
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
    @index_assigns %{
      date: Dotcom.Utils.DateTime.now(),
      date_time: Dotcom.Utils.DateTime.now(),
      errors: [],
      modes: %{},
      wheelchair: false,
      initial_map_data: Dotcom.TripPlan.Map.initial_map_data(),
      chosen_date_time: nil,
      chosen_time: nil
    }

    test "renders the form with all fields", %{conn: conn} do
      form =
        "_sidebar.html"
        |> render(Map.put(@index_assigns, :conn, conn))
        |> safe_to_string()

      # to and from selection
      assert [{"input", _, _}] = Floki.find(form, ~s([name="plan[to]"]))
      assert [{"input", _, _}] = Floki.find(form, ~s([name="plan[from]"]))

      # time selection - now, arrive, depart
      assert [{"input", _, _}, {"input", _, _}, {"input", _, _}] =
               Floki.find(form, ~s([name="plan[time]"]))

      # datepicker
      assert [{"input", _, _}] = Floki.find(form, ~s([name="plan[date_time]"]))

      # wheelchair checkbox
      assert [{"input", _, _}] = Floki.find(form, ~s([name="plan[wheelchair]"]))

      # modes. each appears twice because of being duplicated in the <noscript>
      assert [{"input", _, []} | _] = Floki.find(form, ~s([name="plan[modes][subway]"]))
      assert [{"input", _, []} | _] = Floki.find(form, ~s([name="plan[modes][ferry]"]))
      assert [{"input", _, []} | _] = Floki.find(form, ~s([name="plan[modes][bus]"]))
      assert [{"input", _, []} | _] = Floki.find(form, ~s([name="plan[modes][commuter_rail]"]))
    end

    test "includes a text field for the javascript datepicker to attach to", %{conn: conn} do
      html =
        "_sidebar.html"
        |> render(Map.put(@index_assigns, :conn, conn))
        |> safe_to_string()

      assert [
               {
                 "div",
                 attributes,
                 [
                   {
                     "div",
                     [{"class", "flatpickr"}],
                     [{"input", _, _}, {"a", _, _}]
                   }
                 ]
               }
             ] = Floki.find(html, "#trip-plan-datepicker")

      assert Enum.find(attributes, fn {prop, value} ->
               prop == "phx-mounted"
             end)
    end
  end

  describe "trip_plan_metadata/1" do
    test "returns a map repesenting the planned trip", %{conn: conn} do
      assert result = trip_plan_metadata(conn)

      assert %{
               "generated_user_id" => _id,
               "generated_time" => time,
               "modes" => _modes,
               "query" => _query
             } = result

      assert %DateTime{} = time
    end

    test "returns with encdoded %Query{}", %{conn: conn} do
      conn =
        assign(conn, :query, %Query{
          from: TripPlanner.build(:named_position),
          to: TripPlanner.build(:stop_named_position),
          time: {:depart_at, Dotcom.Utils.DateTime.now()},
          wheelchair: true,
          itineraries: {:ok, TripPlanner.build_list(3, :itinerary)}
        })

      assert %{
               "query" => %{
                 "errors" => errors,
                 "from" => %{
                   "latitude" => _,
                   "longitude" => _,
                   "name" => _,
                   "stop" => _
                 },
                 "itineraries" => itineraries,
                 "time_type" => "depart_at",
                 "date_time" => dt,
                 "to" => %{
                   "latitude" => _,
                   "longitude" => _,
                   "name" => _,
                   "stop" => _
                 },
                 "wheelchair" => true
               }
             } = trip_plan_metadata(conn)

      assert errors == []
      assert is_binary(dt)

      assert [
               %{
                 "accessible?" => _,
                 "legs" => _,
                 "start" => _,
                 "stop" => _,
                 "tag" => _
               }
               | _
             ] = itineraries
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

    @itinerary %Itinerary{
      start: nil,
      stop: nil,
      legs: [
        %Leg{
          from: %NamedPosition{
            latitude: 42.365486,
            longitude: -71.103802,
            name: "Central",
            stop: nil
          },
          mode: %PersonalDetail{
            distance: 24.274,
            steps: [
              %Step{
                absolute_direction: :southeast,
                distance: 24.274,
                relative_direction: :depart,
                street_name: "Massachusetts Avenue"
              }
            ]
          },
          polyline: "eoqaGzm~pLTe@BE@A",
          to: %NamedPosition{
            latitude: 42.365304,
            longitude: -71.103621,
            name: "Central",
            stop: %Stops.Stop{id: "70069"}
          }
        },
        %Leg{
          from: %NamedPosition{
            latitude: 42.365304,
            longitude: -71.103621,
            name: "Central",
            stop: %Stops.Stop{id: "70069"}
          },
          mode: %TransitDetail{
            fares: @fares,
            intermediate_stops: [%Stops.Stop{id: "70071"}, %Stops.Stop{id: "70073"}],
            route: %Routes.Route{id: "Red"},
            trip: %Schedules.Trip{id: "43870769C0"}
          },
          to: %NamedPosition{
            latitude: 42.356395,
            longitude: -71.062424,
            name: "Park Street",
            stop: %Stops.Stop{id: "70075"}
          }
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
      assert get_one_way_total_by_type(@itinerary, :highest_one_way_fare) == 240
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

      itinerary = %Itinerary{
        start: nil,
        stop: nil,
        legs: [
          %Leg{
            from: %NamedPosition{
              latitude: 42.365486,
              longitude: -71.103802,
              name: "Central",
              stop: nil
            },
            mode: %PersonalDetail{
              distance: 24.274,
              steps: [
                %Step{
                  absolute_direction: :southeast,
                  distance: 24.274,
                  relative_direction: :depart,
                  street_name: "Massachusetts Avenue"
                }
              ]
            },
            polyline: "eoqaGzm~pLTe@BE@A",
            to: %NamedPosition{
              latitude: 42.365304,
              longitude: -71.103621,
              name: "Central",
              stop: %Stops.Stop{id: "70069"}
            }
          },
          %Leg{
            from: %NamedPosition{
              latitude: 42.365304,
              longitude: -71.103621,
              name: "Central",
              stop: %Stops.Stop{id: "70069"}
            },
            mode: %TransitDetail{
              fares: @fares,
              intermediate_stops: [%Stops.Stop{id: "70071"}, %Stops.Stop{id: "70073"}],
              route: %Routes.Route{id: "Red"},
              trip: %Schedules.Trip{id: "43870769C0"}
            },
            to: %NamedPosition{
              latitude: 42.356395,
              longitude: -71.062424,
              name: "Park Street",
              stop: %Stops.Stop{id: "70075"}
            }
          },
          %Leg{
            from: %NamedPosition{
              latitude: 42.362804,
              longitude: -71.099509,
              name: "Massachusetts Ave @ Sidney St",
              stop: %Stops.Stop{id: "73"}
            },
            mode: %TransitDetail{
              fares: bus_fares,
              intermediate_stops: [
                %Stops.Stop{id: "74"},
                %Stops.Stop{id: "75"},
                %Stops.Stop{id: "77"},
                %Stops.Stop{id: "79"},
                %Stops.Stop{id: "80"}
              ],
              route: %Routes.Route{id: "1"},
              trip: %Schedules.Trip{id: "44170977"}
            },
            to: %NamedPosition{
              latitude: 42.342478,
              longitude: -71.084701,
              name: "Massachusetts Ave @ Huntington Ave",
              stop: %Stops.Stop{id: "82"}
            }
          },
          %Leg{
            from: %NamedPosition{
              latitude: 42.365304,
              longitude: -71.103621,
              name: "Central",
              stop: %Stops.Stop{id: "70069"}
            },
            mode: %TransitDetail{
              fares: @fares,
              intermediate_stops: [%Stops.Stop{id: "70071"}, %Stops.Stop{id: "70073"}],
              route: %Routes.Route{id: "Red"},
              trip: %Schedules.Trip{id: "43870769C0"}
            },
            to: %NamedPosition{
              latitude: 42.356395,
              longitude: -71.062424,
              name: "Park Street",
              stop: %Stops.Stop{id: "70075"}
            }
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
      shuttle_leg = TripPlanner.build(:shuttle_leg)
      bus_leg = TripPlanner.build(:subway_leg)

      itinerary = %Itinerary{
        start: nil,
        stop: nil,
        legs: [shuttle_leg, bus_leg]
      }

      expected_fares = %{
        bus: %{
          mode: %{
            fares: @shuttle_fares,
            mode_name: "Bus",
            name: "Free Service",
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
      free_leg =
        TripPlanner.build(:shuttle_leg)

      paid_leg =
        TripPlanner.build(:subway_leg)

      itinerary =
        %Itinerary{start: nil, stop: nil, legs: [free_leg, paid_leg]}

      assert get_one_way_total_by_type(itinerary, :highest_one_way_fare) == 240
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
            route: %Routes.Route{id: &1},
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
            stop: %Stops.Stop{id: "place-dwnxg"}
          }
      }

      orange_leg = %{
        subway_leg_for_route.("Orange")
        | from: %NamedPosition{
            stop: %Stops.Stop{id: "place-dwnxg"}
          }
      }

      itinerary = %Itinerary{
        start: nil,
        stop: nil,
        legs: [red_leg, orange_leg]
      }

      assert get_one_way_total_by_type(itinerary, :highest_one_way_fare) == 290
    end

    test "returns nil when there is no highest one-way fare" do
      itinerary = %Itinerary{
        start: nil,
        stop: nil,
        legs: [
          %Leg{
            from: %NamedPosition{
              latitude: 42.365486,
              longitude: -71.103802,
              name: "Central",
              stop: nil
            },
            mode: %PersonalDetail{
              distance: 24.274,
              steps: [
                %Step{
                  absolute_direction: :southeast,
                  distance: 24.274,
                  relative_direction: :depart,
                  street_name: "Massachusetts Avenue"
                }
              ]
            },
            polyline: "eoqaGzm~pLTe@BE@A",
            to: %NamedPosition{
              latitude: 42.365304,
              longitude: -71.103621,
              name: "Central",
              stop: %Stops.Stop{id: "70069"}
            }
          },
          %Leg{
            from: %NamedPosition{
              latitude: 42.365304,
              longitude: -71.103621,
              name: "Central",
              stop: %Stops.Stop{id: "70069"}
            },
            mode: %TransitDetail{
              fares: %{
                highest_one_way_fare: nil,
                lowest_one_way_fare: nil
              },
              intermediate_stops: [%Stops.Stop{id: "70071"}, %Stops.Stop{id: "70073"}],
              route: %Routes.Route{id: "Red"},
              trip: %Schedules.Trip{id: "43870769C0"}
            },
            to: %NamedPosition{
              latitude: 42.356395,
              longitude: -71.062424,
              name: "Park Street",
              stop: %Stops.Stop{id: "70075"}
            }
          }
        ]
      }

      assert get_one_way_total_by_type(itinerary, :highest_one_way_fare) == nil
    end

    test "shows a transfer note", %{conn: conn} do
      fares_with_transfer =
        Map.put(@fares_assigns, :itinerary, %{
          @fares_assigns.itinerary
          | legs: [
              %Leg{
                mode: %TransitDetail{route: %Routes.Route{id: "77"}},
                from: %NamedPosition{
                  stop: nil
                },
                to: %NamedPosition{
                  stop: nil
                }
              },
              %Leg{
                mode: %TransitDetail{route: %Routes.Route{id: "1"}},
                from: %NamedPosition{
                  stop: nil
                },
                to: %NamedPosition{
                  stop: nil
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
              %Leg{mode: %TransitDetail{route: %Routes.Route{id: "77"}}}
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
          from: %NamedPosition{
            stop: nil
          },
          mode: %TransitDetail{
            route: %Routes.Route{id: &1},
            fares: @fares
          },
          to: %NamedPosition{
            stop: nil
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
        %Leg{
          from: %NamedPosition{
            latitude: 42.366494,
            longitude: -71.017289,
            name: "Terminal C - Arrivals Level",
            stop: %Stops.Stop{id: "17094"}
          },
          mode: %TransitDetail{
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
            intermediate_stops: [
              %Stops.Stop{id: "17095"},
              %Stops.Stop{id: "17096"},
              %Stops.Stop{id: "74614"},
              %Stops.Stop{id: "74615"},
              %Stops.Stop{id: "74616"}
            ],
            route: %Routes.Route{id: "741"},
            trip: %Schedules.Trip{id: "44812009"}
          },
          to: %NamedPosition{
            latitude: 42.352271,
            longitude: -71.055242,
            name: "South Station",
            stop: %Stops.Stop{id: "74617"}
          }
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
            mode: %PersonalDetail{
              distance: 510.2
            }
          },
          %Leg{
            from: %NamedPosition{
              name: "Terminal C - Arrivals Level",
              stop: %Stops.Stop{id: "17094"}
            },
            mode: %TransitDetail{
              route: %Routes.Route{id: "741"}
            },
            to: %NamedPosition{
              name: "South Station",
              stop: %Stops.Stop{id: "74617"}
            }
          }
        ],
        start: DateTime.from_unix!(0),
        stop: DateTime.from_unix!(0)
      }

      refute show_monthly_passes?(sl_from_logan_itinerary)
    end

    test "returns true for all other itineraries" do
      login_sl_plus_subway_itinerary = %Itinerary{
        legs: [
          %Leg{
            mode: %PersonalDetail{
              distance: 385.75800000000004
            }
          },
          %Leg{
            from: %NamedPosition{
              name: "Terminal A",
              stop: %Stops.Stop{id: "17091"}
            },
            mode: %TransitDetail{
              route: %Routes.Route{id: "741"}
            },
            to: %NamedPosition{
              name: "South Station",
              stop: %Stops.Stop{id: "74617"}
            }
          },
          %Leg{
            mode: %PersonalDetail{
              distance: 0.0
            }
          },
          %Leg{
            from: %NamedPosition{
              name: "South Station",
              stop: %Stops.Stop{id: "70080"}
            },
            mode: %TransitDetail{
              route: %Routes.Route{id: "Red"}
            },
            to: %NamedPosition{
              name: "Downtown Crossing",
              stop: %Stops.Stop{id: "70078"}
            }
          }
        ],
        start: DateTime.from_unix!(0),
        stop: DateTime.from_unix!(0)
      }

      assert show_monthly_passes?(login_sl_plus_subway_itinerary)
    end

    test "returns true for an itinerary without any transit legs" do
      no_transit_legs_itinerary = %Itinerary{
        legs: [
          %Leg{
            mode: %PersonalDetail{
              distance: 385.75800000000004
            }
          },
          %Leg{
            mode: %PersonalDetail{
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

  describe "_stop_list_expand_link template" do
    test "Expand link lists number of collapsed stops" do
      assigns = %{
        bubbles: [{"Green-E", :line}],
        target_id: "target-id",
        intermediate_stop_count: 11,
        branch_name: "Green-E",
        branch_display: "Green-E branch",
        route: %Routes.Route{id: "Green-E"},
        vehicle_tooltip: nil,
        expanded: nil,
        conn: %{query_params: %{}, request_path: ""},
        itinerary_row: %{
          duration: 2,
          trip: %{headsign: nil, direction_id: 0, name: Faker.App.name()}
        }
      }

      rendered =
        "_stop_list_expand_link.html"
        |> DotcomWeb.TripPlanView.render(assigns)
        |> safe_to_string()

      assert rendered =~ "11"
    end

    test "Expand link lists duration" do
      assigns = %{
        bubbles: [{"Green-E", :line}],
        target_id: "target-id",
        intermediate_stop_count: 11,
        branch_name: "Green-E",
        branch_display: "Green-E branch",
        route: %Routes.Route{id: "Green-E"},
        vehicle_tooltip: nil,
        expanded: nil,
        conn: %{query_params: %{}, request_path: ""},
        itinerary_row: %{
          duration: 2,
          trip: %{headsign: nil, direction_id: 0, name: Faker.App.name()}
        }
      }

      rendered =
        "_stop_list_expand_link.html"
        |> DotcomWeb.TripPlanView.render(assigns)
        |> safe_to_string()

      assert rendered =~ "2 min"
    end

    test "Expand link displays branch_display as link text" do
      assigns = %{
        bubbles: [{"Braintree", :line}],
        target_id: "target-id",
        intermediate_stop_count: 9,
        branch_name: "Braintree",
        branch_display: "Braintree branch",
        route: %Routes.Route{id: "Red"},
        vehicle_tooltip: nil,
        expanded: nil,
        conn: %{query_params: %{}, request_path: ""},
        itinerary_row: %{
          duration: 2,
          trip: %{headsign: nil, direction_id: 0, name: Faker.App.name()}
        }
      }

      rendered =
        "_stop_list_expand_link.html"
        |> DotcomWeb.TripPlanView.render(assigns)
        |> safe_to_string()

      assert rendered =~ "Braintree branch"
    end

    test "Expand link starts as expanded when the expanded is true" do
      assigns = %{
        bubbles: [{"Braintree", :line}],
        target_id: "target-id",
        intermediate_stop_count: 9,
        branch_name: "Braintree",
        branch_display: "Braintree branch",
        route: %Routes.Route{id: "Red"},
        vehicle_tooltip: nil,
        expanded: true,
        conn: %{query_params: %{}, request_path: ""},
        itinerary_row: %{
          duration: 2,
          trip: %{headsign: nil, direction_id: 0, name: Faker.App.name()}
        }
      }

      rendered =
        "_stop_list_expand_link.html"
        |> DotcomWeb.TripPlanView.render(assigns)
        |> safe_to_string()

      branch_stop = Floki.find(rendered, ".route-branch-stop")

      assert Floki.attribute(branch_stop, "class") == ["route-branch-stop expanded"]
    end
  end
end
