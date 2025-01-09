defmodule DotcomWeb.Live.TripPlannerTest do
  use DotcomWeb.ConnCase, async: true

  import Mox
  import Phoenix.LiveViewTest

  alias OpenTripPlannerClient.Test.Support.Factory
  alias Test.Support.Factories.TripPlanner.TripPlanner, as: TripPlannerFactory

  setup :verify_on_exit!

  defp stub_otp_results(itineraries) do
    expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
      {:ok, %OpenTripPlannerClient.Plan{itineraries: itineraries}}
    end)

    # For certain routes, Dotcom.TripPlan.Alerts.mode_entities/1 is called to help fetch the associated alerts
    stub(MBTA.Api.Mock, :get_json, fn "/trips/" <> id, [] ->
      %JsonApi{
        data: [
          Test.Support.Factories.MBTA.Api.build(:trip_item, %{id: id})
        ]
      }
    end)
  end

  defp stub_populated_otp_results do
    itineraries = TripPlannerFactory.build_list(3, :otp_itinerary)

    stub_otp_results(itineraries)
  end

  # For a list of headsigns, create a bunch of itineraries that would be grouped
  # by the Trip Planner's logic
  defp grouped_itineraries_from_headsigns([initial_headsign | _] = headsigns) do
    # Only MBTA transit legs show the headsigns right now, so ensure the
    # generated legs are MBTA-only
    base_leg =
      Factory.build(:transit_leg, %{
        agency: Factory.build(:agency, %{name: "MBTA"}),
        route:
          Factory.build(:route, %{gtfs_id: "mbta-ma-us:internal", type: Faker.Util.pick(0..4)}),
        trip:
          Factory.build(:trip, %{
            direction_id: Faker.Util.pick(["0", "1"]),
            trip_headsign: initial_headsign
          })
      })

    base_itinerary = Factory.build(:itinerary, legs: [base_leg])

    headsigns
    |> Enum.with_index()
    |> Enum.map(fn {headsign, index} ->
      leg = update_in(base_leg, [:trip, :trip_headsign], fn _ -> headsign end)

      %{
        base_itinerary
        | legs: [leg],
          start: Timex.shift(base_itinerary.start, minutes: 10 * index)
      }
    end)
  end

  test "Preview version behind basic auth", %{conn: conn} do
    conn = get(conn, ~p"/preview/trip-planner")

    {_header_name, header_value} = List.keyfind(conn.resp_headers, "www-authenticate", 0)
    assert conn.status == 401
    assert header_value =~ "Basic"
  end

  describe "Trip Planner" do
    setup %{conn: conn} do
      [username: username, password: password] =
        Application.get_env(:dotcom, DotcomWeb.Router)[:basic_auth_readonly]

      {:ok, view, html} =
        conn
        |> put_req_header("authorization", "Basic " <> Base.encode64("#{username}:#{password}"))
        |> live(~p"/preview/trip-planner")

      %{html: html, view: view}
    end

    # test "toggles the date input when changing from 'now'", %{html: html, view: view} do
    # end

    test "summarizes the selected modes", %{view: view, html: html} do
      assert html =~ "All modes"

      html =
        view
        |> element("form")
        |> render_change(%{
          _target: ["input_form", "modes"],
          input_form: %{modes: %{RAIL: true, SUBWAY: true, FERRY: true, BUS: false}}
        })

      assert html =~ "Commuter Rail, Subway, and Ferry"

      html =
        view
        |> element("form")
        |> render_change(%{
          _target: ["input_form", "modes"],
          input_form: %{modes: %{SUBWAY: true, BUS: false, RAIL: false, FERRY: false}}
        })

      assert html =~ "Subway Only"

      html =
        view
        |> element("form")
        |> render_change(%{
          _target: ["input_form", "modes"],
          input_form: %{modes: %{SUBWAY: true, BUS: true, RAIL: false, FERRY: false}}
        })

      assert html =~ "Subway and Bus"
    end

    # test "shows errors on form submit", %{view: view} do
    # end

    # test "pushes updated location to the map", %{view: view} do
    # end
  end

  describe "Trip Planner location validations" do
    setup %{conn: conn} do
      [username: username, password: password] =
        Application.get_env(:dotcom, DotcomWeb.Router)[:basic_auth_readonly]

      %{
        conn:
          conn
          |> put_req_header("authorization", "Basic " <> Base.encode64("#{username}:#{password}"))
      }
    end

    test "shows error if origin and destination are the same", %{conn: conn} do
      latitude = Faker.Address.latitude()
      longitude = Faker.Address.longitude()

      params = %{
        "plan" => %{
          "from_latitude" => "#{latitude}",
          "from_longitude" => "#{longitude}",
          "to_latitude" => "#{latitude}",
          "to_longitude" => "#{longitude}"
        }
      }

      {:ok, view, _html} =
        conn
        |> live(~p"/preview/trip-planner?#{params}")

      assert render_async(view) =~
               "Please select a destination at a different location from the origin."
    end

    test "does not show errors if origin or destination are missing", %{conn: conn} do
      {:ok, view, _html} =
        conn
        |> live(~p"/preview/trip-planner")

      refute render_async(view) =~ "Please specify an origin location."
      refute render_async(view) =~ "Please add a destination."
    end
  end

  describe "Trip Planner with no results" do
    setup %{conn: conn} do
      [username: username, password: password] =
        Application.get_env(:dotcom, DotcomWeb.Router)[:basic_auth_readonly]

      %{
        conn:
          put_req_header(
            conn,
            "authorization",
            "Basic " <> Base.encode64("#{username}:#{password}")
          )
      }
    end

    test "shows 'No trips found' text", %{conn: conn} do
      params = %{
        "plan" => %{
          "from_latitude" => "#{Faker.Address.latitude()}",
          "from_longitude" => "#{Faker.Address.longitude()}",
          "to_latitude" => "#{Faker.Address.latitude()}",
          "to_longitude" => "#{Faker.Address.longitude()}"
        }
      }

      stub_otp_results([])

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      assert render_async(view) =~ "No trips found"
    end
  end

  describe "Trip Planner with results" do
    setup %{conn: conn} do
      [username: username, password: password] =
        Application.get_env(:dotcom, DotcomWeb.Router)[:basic_auth_readonly]

      stub(Stops.Repo.Mock, :get, fn _ ->
        Test.Support.Factories.Stops.Stop.build(:stop)
      end)

      %{
        conn:
          put_req_header(
            conn,
            "authorization",
            "Basic " <> Base.encode64("#{username}:#{password}")
          ),
        params: %{
          "plan" => %{
            "from_latitude" => "#{Faker.Address.latitude()}",
            "from_longitude" => "#{Faker.Address.longitude()}",
            "to_latitude" => "#{Faker.Address.latitude()}",
            "to_longitude" => "#{Faker.Address.longitude()}"
          }
        }
      }
    end

    test "starts out with no 'View All Options' button", %{conn: conn, params: params} do
      stub_populated_otp_results()

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      refute render_async(view) =~ "View All Options"
    end

    test "clicking 'Details' button opens details view", %{conn: conn, params: params} do
      stub_populated_otp_results()

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      render_async(view)
      view |> element("button[phx-value-index=\"0\"]", "Details") |> render_click()

      assert render_async(view) =~ "View All Options"
    end

    test "clicking 'View All Options' button from details view closes it", %{
      conn: conn,
      params: params
    } do
      stub_populated_otp_results()

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      render_async(view)

      view |> element("button[phx-value-index=\"0\"]", "Details") |> render_click()
      view |> element("button", "View All Options") |> render_click()

      refute render_async(view) =~ "View All Options"
    end

    test "'Depart At' buttons toggle which itinerary to show", %{
      conn: conn,
      params: params
    } do
      trip_headsign_1 = "Headsign1"
      trip_headsign_2 = "Headsign2"

      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:ok,
         %OpenTripPlannerClient.Plan{
           itineraries: grouped_itineraries_from_headsigns([trip_headsign_1, trip_headsign_2])
         }}
      end)

      stub(MBTA.Api.Mock, :get_json, fn "/trips/" <> id, [] ->
        %JsonApi{
          data: [
            Test.Support.Factories.MBTA.Api.build(:trip_item, %{id: id})
          ]
        }
      end)

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      render_async(view)

      view |> element("button", "Details") |> render_click()

      assert render_async(view) =~ trip_headsign_1
      refute render_async(view) =~ trip_headsign_2

      view |> element("#itinerary-detail-departure-times button:last-child") |> render_click()

      assert render_async(view) =~ trip_headsign_2
      refute render_async(view) =~ trip_headsign_1
    end

    test "'Depart At' buttons don't appear if there would only be one", %{
      conn: conn,
      params: params
    } do
      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:ok,
         %OpenTripPlannerClient.Plan{
           itineraries: TripPlannerFactory.build_list(1, :otp_itinerary)
         }}
      end)

      stub(MBTA.Api.Mock, :get_json, fn "/trips/" <> id, [] ->
        %JsonApi{
          data: [
            Test.Support.Factories.MBTA.Api.build(:trip_item, %{id: id})
          ]
        }
      end)

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      render_async(view)

      view |> element("button", "Details") |> render_click()

      refute view |> element("#itinerary-detail-departure-times") |> has_element?()
    end

    test "'Depart At' button state is not preserved when leaving details view", %{
      conn: conn,
      params: params
    } do
      trip_headsign_1 = "Headsign1"
      trip_headsign_2 = "Headsign2"

      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:ok,
         %OpenTripPlannerClient.Plan{
           itineraries: grouped_itineraries_from_headsigns([trip_headsign_1, trip_headsign_2])
         }}
      end)

      stub(MBTA.Api.Mock, :get_json, fn "/trips/" <> id, [] ->
        %JsonApi{
          data: [
            Test.Support.Factories.MBTA.Api.build(:trip_item, %{id: id})
          ]
        }
      end)

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      render_async(view)

      view |> element("button", "Details") |> render_click()
      view |> element("#itinerary-detail-departure-times button:last-child") |> render_click()
      view |> element("button", "View All Options") |> render_click()
      view |> element("button", "Details") |> render_click()

      assert render_async(view) =~ trip_headsign_1
      refute render_async(view) =~ trip_headsign_2
    end

    test "displays 'No trips found.' if given an empty list of itineraries", %{
      conn: conn,
      params: params
    } do
      stub_otp_results([])

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      assert render_async(view) =~ "No trips found."
    end

    test "displays error message from the Open Trip Planner client", %{conn: conn, params: params} do
      error_message = Faker.Lorem.sentence()

      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:error, [%OpenTripPlannerClient.Error{message: error_message}]}
      end)

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      assert render_async(view) =~ error_message
    end

    test "does not display 'No trips found.' if there's another error", %{
      conn: conn,
      params: params
    } do
      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:error, [%OpenTripPlannerClient.Error{message: Faker.Lorem.sentence()}]}
      end)

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      refute render_async(view) =~ "No trips found."
    end
  end
end
