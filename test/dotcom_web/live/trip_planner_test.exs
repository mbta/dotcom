defmodule DotcomWeb.Live.TripPlannerTest do
  use DotcomWeb.ConnCase, async: true

  import Mox
  import Phoenix.LiveViewTest
  import Test.Support.Factories.TripPlanner.TripPlanner, only: [limit_route_types: 1]

  alias OpenTripPlannerClient.Test.Support.Factory, as: OtpFactory

  setup :verify_on_exit!

  def stub_otp_results(itineraries) do
    expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
      {:ok, %OpenTripPlannerClient.Plan{itineraries: itineraries}}
    end)
  end

  def stub_populated_otp_results() do
    # Uhhh the OTP factory will generate with any route_type value but our
    # parsing will break with unexpected route types
    itineraries =
      OtpFactory.build_list(3, :itinerary)
      |> Enum.map(&limit_route_types/1)

    stub_otp_results(itineraries)
  end

  def update_trip_details(itinerary, trip_id: trip_id, start_time: start_time) do
    updated_transit_leg =
      itinerary.legs
      |> Enum.at(1)
      |> update_in([:trip, :gtfs_id], fn _ -> "ma_mbta_us:#{trip_id}" end)

    itinerary
    |> Map.update!(:legs, &List.replace_at(&1, 1, updated_transit_leg))
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
      base_itinerary =
        OtpFactory.build(:itinerary)
        |> limit_route_types()

      # TODO: Right now, the headsign (which is what we actually want
      # to show) is not available from OTP client, but we're rendering
      # the trip ID in its place. Once the headsign is available, we
      # should update these updates and the assertions below to use
      # the headsign instead of the trip ID.
      stub_otp_results([
        update_trip_details(base_itinerary, trip_id: "trip_id_1", start_time: ~T[09:26:00]),
        update_trip_details(base_itinerary, trip_id: "trip_id_2", start_time: ~T[10:46:00])
      ])

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      render_async(view)

      view |> element("button", "Details") |> render_click()

      assert render_async(view) =~ "trip_id_1"
      refute render_async(view) =~ "trip_id_2"

      view |> element("button", "10:46AM") |> render_click()

      assert render_async(view) =~ "trip_id_2"
      refute render_async(view) =~ "trip_id_1"
    end
  end
end
