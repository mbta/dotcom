defmodule DotcomWeb.Live.TripPlannerTest do
  use DotcomWeb.ConnCase, async: true

  import Mox
  import Phoenix.LiveViewTest

  setup :verify_on_exit!

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

  describe "Trip Planner with results" do
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

    test "no results", %{conn: conn} do
      params = %{
        "plan" => %{
          "from_latitude" => "#{Faker.Address.latitude()}",
          "from_longitude" => "#{Faker.Address.longitude()}",
          "to_latitude" => "#{Faker.Address.latitude()}",
          "to_longitude" => "#{Faker.Address.longitude()}"
        }
      }

      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:ok, %OpenTripPlannerClient.Plan{itineraries: []}}
      end)

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      # TODO actually wait for the async_result somehow
      Process.sleep(1000)

      assert render(view) =~ "No trips found"
    end

    test "with results", %{conn: conn} do
      params = %{
        "plan" => %{
          "from_latitude" => "#{Faker.Address.latitude()}",
          "from_longitude" => "#{Faker.Address.longitude()}",
          "to_latitude" => "#{Faker.Address.latitude()}",
          "to_longitude" => "#{Faker.Address.longitude()}"
        }
      }

      # called during itinerary parsing
      stub(Stops.Repo.Mock, :get, fn _ ->
        Test.Support.Factories.Stops.Stop.build(:stop)
      end)

      # Uhhh the OTP factory will generate with any route_type value but our
      # parsing will break with unexpected route types
      itineraries =
        OpenTripPlannerClient.Test.Support.Factory.build_list(3, :itinerary)
        |> Enum.map(&Test.Support.Factories.TripPlanner.TripPlanner.limit_route_types/1)

      expect(OpenTripPlannerClient.Mock, :plan, fn _ ->
        {:ok, %OpenTripPlannerClient.Plan{itineraries: itineraries}}
      end)

      {:ok, view, _html} = live(conn, ~p"/preview/trip-planner?#{params}")

      # TODO actually wait for the async_result somehow
      Process.sleep(1000)

      refute render(view) =~ "No trips found"
    end
  end
end
