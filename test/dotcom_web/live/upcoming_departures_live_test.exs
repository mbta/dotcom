defmodule DotcomWeb.Live.UpcomingDeparturesLiveTest do
  use DotcomWeb.ConnCase, async: true

  import Mox
  import Phoenix.LiveViewTest

  alias DotcomWeb.Live.UpcomingDeparturesLive
  alias Test.Support.{Factories, FactoryHelpers}

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @moduletag capture_log: false

  setup :verify_on_exit!

  setup _ do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    stub(Routes.Repo.Mock, :get, fn id ->
      Factories.Routes.Route.build(:route, %{id: id})
    end)

    stub(Stops.Repo.Mock, :get, fn id ->
      Factories.Stops.Stop.build(:stop, %{id: id})
    end)

    stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

    :ok
  end

  test "loads, fetching route, stop info", %{conn: conn} do
    route_id_param = FactoryHelpers.build(:id)
    stop_id_param = FactoryHelpers.build(:id)
    direction_id = FactoryHelpers.build(:direction_id)

    expect(Routes.Repo.Mock, :get, 2, fn route_id ->
      assert route_id == route_id_param
      Factories.Routes.Route.build(:route)
    end)

    expect(Stops.Repo.Mock, :get, 2, fn stop_id ->
      assert stop_id == stop_id_param
      Factories.Stops.Stop.build(:stop, %{id: stop_id})
    end)

    {:ok, _, html} = start_live_view(conn, route_id_param, direction_id, stop_id_param)

    assert html =~ "Loading upcoming departures"
  end

  test "fetches schedules info on load for subway", %{conn: conn} do
    route_id = FactoryHelpers.build(:id)
    route = Factories.Routes.Route.build(:route, %{id: route_id, type: Faker.Util.pick([0, 1])})
    stop_id = FactoryHelpers.build(:id)
    direction_id = FactoryHelpers.build(:direction_id)

    expect(Routes.Repo.Mock, :get, 2, fn ^route_id -> route end)

    expect(Schedules.Repo.Mock, :by_route_ids, 2, fn routes, opts ->
      assert routes == [route_id]
      assert Keyword.get(opts, :direction_id) == direction_id
      assert Keyword.get(opts, :stop_ids) == [stop_id]
      assert Keyword.get(opts, :date) == Dotcom.Utils.ServiceDateTime.service_date()

      []
    end)

    {:ok, _, html} = start_live_view(conn, route_id, direction_id, stop_id)

    assert html =~ "Loading upcoming departures"
  end

  test "requests upcoming departures", %{conn: conn} do
    stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

    route_id = FactoryHelpers.build(:id)
    stop_id = FactoryHelpers.build(:id)
    direction_id = FactoryHelpers.build(:direction_id)

    expect(Dotcom.UpcomingDepartures.Mock, :upcoming_departures, fn arg ->
      assert arg[:stop_id] == stop_id
      assert arg[:route].id == route_id
      assert arg[:direction_id] == direction_id
      assert arg[:now]

      :no_service
    end)

    {:ok, view, _} = start_live_view(conn, route_id, direction_id, stop_id)

    assert render_async(view)
  end

  test "shows last scheduled trip for subway", %{conn: conn} do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    route = Factories.Routes.Route.build(:subway_route)
    stop = Factories.Stops.Stop.build(:stop)
    route_id = route.id
    stop_id = stop.id
    direction_id = FactoryHelpers.build(:direction_id)

    stub(Routes.Repo.Mock, :get, fn _ -> route end)
    stub(Stops.Repo.Mock, :get, fn _ -> stop end)

    schedules = Factories.Schedules.Schedule.build_list(3, :schedule)

    # Last scheduled time is in the future
    last_schedule =
      Factories.Schedules.Schedule.build(:schedule,
        time: @date_time_module.now() |> DateTime.shift(minute: 40)
      )

    expect(Schedules.Repo.Mock, :by_route_ids, 2, fn _, _ ->
      schedules ++ [last_schedule]
    end)

    # Available upcoming departures are earlier than the last scheduled time
    expect(Dotcom.UpcomingDepartures.Mock, :upcoming_departures, fn _ ->
      Factories.UpcomingDepartures.build_list(15, :upcoming_departure,
        time: @date_time_module.now() |> DateTime.shift(minute: 20)
      )
    end)

    {:ok, view, _} = start_live_view(conn, route_id, direction_id, stop_id)

    {:ok, rendered_time} = Dotcom.Utils.Time.format(last_schedule.time, :hour_12_minutes)

    assert render_async(view) =~ "Scheduled service continues until #{rendered_time}"
  end

  test "shows service ended message", %{conn: conn} do
    # Setup
    stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

    expect(Dotcom.UpcomingDepartures.Mock, :upcoming_departures, fn _ ->
      :service_ended
    end)

    {:ok, view, _} =
      live_isolated(conn, UpcomingDeparturesLive,
        session: %{
          "route_id" => FactoryHelpers.build(:id),
          "direction_id" => FactoryHelpers.build(:direction_id),
          "stop_id" => FactoryHelpers.build(:id)
        }
      )

    assert render_async(view) =~ "Service ended"
  end

  describe "for non-subway routes" do
    test "shows no realtime message", %{conn: conn} do
      stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
      route_id = FactoryHelpers.build(:id)

      route =
        Factories.Routes.Route.build(:route, %{id: route_id, type: Faker.Util.pick([2, 3, 4])})

      stub(Routes.Repo.Mock, :get, fn _ -> route end)

      stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

      upcoming_departures =
        Factories.UpcomingDepartures.build_list(15, :upcoming_departure,
          time: @date_time_module.now() |> DateTime.shift(minute: 20)
        )

      expect(Dotcom.UpcomingDepartures.Mock, :upcoming_departures, fn _ ->
        {:no_realtime, upcoming_departures}
      end)

      {:ok, view, _} = start_live_view(conn, route_id)

      assert render_async(view) =~
               "There are currently no realtime departures available. Scheduled departures are shown below."
    end
  end

  describe "for subway routes" do
    test "shows no realtime message", %{conn: conn} do
      route = Factories.Routes.Route.build(:subway_route)
      stub(Routes.Repo.Mock, :get, fn _ -> route end)
      stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

      expect(Dotcom.UpcomingDepartures.Mock, :upcoming_departures, fn _ ->
        :no_realtime
      end)

      {:ok, view, _} = start_live_view(conn, route.id)

      render_async(view) =~ "There are currently no realtime departures available."
    end
  end

  defp start_live_view(conn, route_id, direction_id \\ nil, stop_id \\ nil) do
    live_isolated(conn, UpcomingDeparturesLive,
      session: %{
        "route_id" => route_id || FactoryHelpers.build(:id),
        "direction_id" => direction_id || FactoryHelpers.build(:direction_id),
        "stop_id" => stop_id || FactoryHelpers.build(:id)
      },
      on_error: :warn
    )
  end
end
