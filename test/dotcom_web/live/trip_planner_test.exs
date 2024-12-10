defmodule DotcomWeb.Live.TripPlannerTest do
  use DotcomWeb.ConnCase, async: true

  import Mox
  import Phoenix.LiveViewTest

  alias Test.Support.Factories.TripPlanner.TripPlanner, as: TripPlannerFactory

  setup :verify_on_exit!

  defp stub_otp_results(itineraries) do
    expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
      {:ok, %OpenTripPlannerClient.Plan{itineraries: itineraries}}
    end)
  end

  defp stub_populated_otp_results do
    itineraries = TripPlannerFactory.build_list(3, :otp_itinerary)

    stub_otp_results(itineraries)
  end

  defp update_trip_id(itinerary, trip_id) do
    updated_transit_leg =
      itinerary.legs
      |> Enum.at(1)
      |> update_in([:trip, :gtfs_id], fn _ -> "ma_mbta_us:#{trip_id}" end)

    itinerary
    |> Map.update!(:legs, &List.replace_at(&1, 1, updated_transit_leg))
  end

  defp update_start_time(itinerary, start_time) do
    itinerary
    |> Map.put(:start, DateTime.new!(Date.utc_today(), start_time, "America/New_York"))
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
        Application.get_env(:dotcom, DotcomWeb.Router)[:basic_auth]

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

  describe "Trip Planner with no results" do
    setup %{conn: conn} do
      [username: username, password: password] =
        Application.get_env(:dotcom, DotcomWeb.Router)[:basic_auth]

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
        Application.get_env(:dotcom, DotcomWeb.Router)[:basic_auth]

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
      trip_datetime_1 = Faker.DateTime.forward(2)
      trip_time_1 = trip_datetime_1 |> DateTime.to_time()
      trip_id_1 = Faker.UUID.v4()

      trip_datetime_2 = trip_datetime_1 |> DateTime.shift(hour: 1)
      trip_time_2 = trip_datetime_2 |> DateTime.to_time()
      trip_time_display_2 = trip_time_2 |> Timex.format!("%-I:%M", :strftime)
      trip_id_2 = Faker.UUID.v4()

      base_itinerary = TripPlannerFactory.build(:otp_itinerary)

      # Right now, the headsign (which is what we actually want to
      # show) is not available from OTP client, but we're rendering
      # the trip ID in its place. Once the headsign is available, we
      # should update these updates and the assertions below to use
      # the headsign instead of the trip ID.
      stub_otp_results([
        base_itinerary |> update_trip_id(trip_id_1) |> update_start_time(trip_time_1),
        base_itinerary |> update_trip_id(trip_id_2) |> update_start_time(trip_time_2)
      ])

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      render_async(view)

      view |> element("button", "Details") |> render_click()

      assert render_async(view) =~ trip_id_1
      refute render_async(view) =~ trip_id_2

      view |> element("button", trip_time_display_2) |> render_click()

      assert render_async(view) =~ trip_id_2
      refute render_async(view) =~ trip_id_1
    end

    test "'Depart At' buttons don't appear if there would only be one", %{
      conn: conn,
      params: params
    } do
      trip_time_1 = Faker.DateTime.forward(2) |> DateTime.to_time()
      trip_time_display_1 = trip_time_1 |> Timex.format!("%-I:%M", :strftime)

      base_itinerary = TripPlannerFactory.build(:otp_itinerary)

      stub_otp_results([
        base_itinerary |> update_start_time(trip_time_1)
      ])

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      render_async(view)

      view |> element("button", "Details") |> render_click()

      refute view |> element("button", trip_time_display_1) |> has_element?()
    end

    test "'Depart At' button state is not preserved when leaving details view", %{
      conn: conn,
      params: params
    } do
      trip_datetime_1 = Faker.DateTime.forward(2)
      trip_time_1 = trip_datetime_1 |> DateTime.to_time()
      trip_id_1 = Faker.UUID.v4()

      trip_datetime_2 = trip_datetime_1 |> DateTime.shift(hour: 1)
      trip_time_2 = trip_datetime_2 |> DateTime.to_time()
      trip_time_display_2 = trip_time_2 |> Timex.format!("%-I:%M", :strftime)
      trip_id_2 = Faker.UUID.v4()

      base_itinerary = TripPlannerFactory.build(:otp_itinerary)

      # Right now, the headsign (which is what we actually want to
      # show) is not available from OTP client, but we're rendering
      # the trip ID in its place. Once the headsign is available, we
      # should update these updates and the assertions below to use
      # the headsign instead of the trip ID.
      stub_otp_results([
        base_itinerary |> update_trip_id(trip_id_1) |> update_start_time(trip_time_1),
        base_itinerary |> update_trip_id(trip_id_2) |> update_start_time(trip_time_2)
      ])

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      render_async(view)

      view |> element("button", "Details") |> render_click()
      view |> element("button", trip_time_display_2) |> render_click()
      view |> element("button", "View All Options") |> render_click()
      view |> element("button", "Details") |> render_click()

      assert render_async(view) =~ trip_id_1
      refute render_async(view) =~ trip_id_2
    end

    test "displays error message from the Open Trip Planner client", %{conn: conn, params: params} do
      error_message = Faker.Lorem.sentence()

      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:error, [%OpenTripPlannerClient.Error{message: error_message}]}
      end)

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      assert render_async(view) =~ error_message
    end
  end
end
