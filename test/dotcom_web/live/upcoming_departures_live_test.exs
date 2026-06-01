defmodule DotcomWeb.Live.UpcomingDeparturesLiveTest do
  use DotcomWeb.ConnCase, async: true

  import Mox
  import Phoenix.LiveViewTest

  alias DotcomWeb.Live.UpcomingDeparturesLive
  alias Test.Support.{Factories, FactoryHelpers, PredictedScheduleHelper}

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @moduletag capture_log: false

  setup :verify_on_exit!

  setup _ do
    stub(Routes.Repo.Mock, :get, fn id ->
      Factories.Routes.Route.build(:route, %{id: id})
    end)

    stub(Stops.Repo.Mock, :get, fn id ->
      Factories.Stops.Stop.build(:stop, %{id: id})
    end)

    stub(Vehicles.Repo.Mock, :get, fn _ -> nil end)

    :ok
  end

  test "loads, fetching route, stop info", %{conn: conn} do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    route_id = FactoryHelpers.build(:id)

    route =
      Factories.Routes.Route.build(:route, %{id: route_id, type: Faker.Util.pick([2, 3, 4])})

    stop_id = FactoryHelpers.build(:id)
    direction_id = FactoryHelpers.build(:direction_id)

    expect(Routes.Repo.Mock, :get, 2, fn ^route_id -> route end)

    expect(Stops.Repo.Mock, :get, 2, fn ^stop_id ->
      Factories.Stops.Stop.build(:stop, %{id: stop_id})
    end)

    {:ok, _, html} =
      live_isolated(conn, UpcomingDeparturesLive,
        session: %{
          "route_id" => route_id,
          "direction_id" => direction_id,
          "stop_id" => stop_id
        }
      )

    assert html =~ "Loading upcoming departures"
  end

  test "fetches schedules info on load for subway", %{conn: conn} do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
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

    {:ok, _, html} =
      live_isolated(conn, UpcomingDeparturesLive,
        session: %{
          "route_id" => route_id,
          "direction_id" => direction_id,
          "stop_id" => stop_id
        }
      )

    assert html =~ "Loading upcoming departures"
  end

  test "requests predictions info", %{conn: conn} do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> [] end)

    expect(Predictions.Repo.Mock, :all, fn _ -> [] end)

    {:ok, view, _} =
      live_isolated(conn, UpcomingDeparturesLive,
        session: %{
          "route_id" => FactoryHelpers.build(:id),
          "direction_id" => FactoryHelpers.build(:direction_id),
          "stop_id" => FactoryHelpers.build(:id)
        }
      )

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

    last_schedule =
      Factories.Schedules.Schedule.build(:schedule,
        time: @date_time_module.now() |> DateTime.shift(minute: 40)
      )

    expect(Schedules.Repo.Mock, :by_route_ids, 3, fn _, _ ->
      schedules ++ [last_schedule]
    end)

    expect(Predictions.Repo.Mock, :all, fn _ ->
      Factories.Predictions.Prediction.build_list(15, :prediction,
        route: route,
        stop: stop,
        time: @date_time_module.now() |> DateTime.shift(minute: 20)
      )
    end)

    {:ok, view, _} =
      live_isolated(conn, UpcomingDeparturesLive,
        session: %{
          "route_id" => route_id,
          "direction_id" => direction_id,
          "stop_id" => stop_id
        },
        on_error: :warn
      )

    {:ok, rendered_time} = Dotcom.Utils.Time.format(last_schedule.time, :hour_12_minutes)
    assert render_async(view) =~ "Scheduled service continues until #{rendered_time}"
  end

  test "shows service ended message", %{conn: conn} do
    # Setup
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    %{
      route: route,
      scheduled_departure_times: [_, scheduled_time, _],
      schedules: schedules,
      stops: [_, stop, _]
    } =
      PredictedScheduleHelper.predicted_schedule_trip_data(route_factory_types: [:bus_route])

    route_id = route.id
    stop_id = stop.id
    expect(Predictions.Repo.Mock, :all, fn _ -> [] end)

    stub(Dotcom.Utils.DateTime.Mock, :now, fn ->
      Dotcom.Utils.ServiceDateTime.end_of_service_day(scheduled_time)
    end)

    stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ ->
      schedules |> Enum.filter(&(&1.stop.id == stop_id))
    end)

    {:ok, view, _} =
      live_isolated(conn, UpcomingDeparturesLive,
        session: %{
          "route_id" => route_id,
          "direction_id" => FactoryHelpers.build(:direction_id),
          "stop_id" => stop_id
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

      stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ ->
        Factories.Schedules.Schedule.build_list(10, :schedule,
          time: @date_time_module.now() |> DateTime.shift(minute: 40)
        )
      end)

      stub(Predictions.Repo.Mock, :all, fn _ -> [] end)

      {:ok, view, _} =
        live_isolated(conn, UpcomingDeparturesLive,
          session: %{
            "route_id" => route_id,
            "direction_id" => FactoryHelpers.build(:direction_id),
            "stop_id" => FactoryHelpers.build(:id)
          }
        )

      assert render_async(view) =~
               "There are currently no realtime departures available. Scheduled departures are shown below."
    end
  end

  describe "for subway routes" do
    test "shows no realtime message", %{conn: conn} do
      stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
      route_id = FactoryHelpers.build(:id)
      route = Factories.Routes.Route.build(:subway_route, %{id: route_id})
      stub(Routes.Repo.Mock, :get, fn _ -> route end)

      stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ ->
        Factories.Schedules.Schedule.build_list(10, :schedule,
          time: @date_time_module.now() |> DateTime.shift(minute: 40)
        )
      end)

      stub(Predictions.Repo.Mock, :all, fn _ -> [] end)

      {:ok, view, _} =
        live_isolated(conn, UpcomingDeparturesLive,
          session: %{
            "route_id" => route_id,
            "direction_id" => FactoryHelpers.build(:direction_id),
            "stop_id" => FactoryHelpers.build(:id)
          }
        )

      render_async(view) =~ "There are currently no realtime departures available."
    end
  end
end
