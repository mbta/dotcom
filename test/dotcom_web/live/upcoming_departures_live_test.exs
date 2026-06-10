defmodule DotcomWeb.Live.UpcomingDeparturesLiveTest do
  use DotcomWeb.ConnCase

  import Mox
  import Phoenix.LiveViewTest

  alias DotcomWeb.Live.UpcomingDeparturesLive
  alias Test.Support.{Factories, FactoryHelpers}

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @moduletag capture_log: false

  setup [:verify_on_exit!, :set_mox_global]

  setup _ do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    stub(Routes.Repo.Mock, :get, fn id ->
      Factories.Routes.Route.build(:route, %{id: id})
    end)

    stub(Stops.Repo.Mock, :get, fn id ->
      Factories.Stops.Stop.build(:stop, %{id: id})
    end)

    stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ -> [] end)
    stub(Predictions.Repo.Mock, :all, fn _ -> [] end)

    stub(Dotcom.UpcomingDepartures.Mock, :upcoming_departures, fn _, _ ->
      :no_service
    end)

    :ok
  end

  defp allow_mocks(route_id, stop_id, direction_id) do
    upcoming_departure_params = %{
      route_id: route_id,
      direction_id: direction_id,
      stop_id: stop_id
    }

    allow(Routes.Repo.Mock, self(), fn ->
      GenServer.whereis({:global, upcoming_departure_params})
    end)

    allow(Schedules.Repo.Mock, self(), fn ->
      GenServer.whereis({:global, upcoming_departure_params})
    end)

    allow(Dotcom.Utils.DateTime.Mock, self(), fn ->
      GenServer.whereis({:global, upcoming_departure_params})
    end)
  end

  @tag :flaky
  test "loads, fetching route, stop info & subscribing to upcoming departures", %{conn: conn} do
    route_id_param = FactoryHelpers.build(:id)
    stop_id_param = FactoryHelpers.build(:id)
    direction_id = FactoryHelpers.build(:direction_id)

    expect(Routes.Repo.Mock, :get, 3, fn route_id ->
      assert route_id == route_id_param
      Factories.Routes.Route.build(:route)
    end)

    expect(Stops.Repo.Mock, :get, 2, fn stop_id ->
      assert stop_id == stop_id_param
      Factories.Stops.Stop.build(:stop, %{id: stop_id})
    end)

    {:ok, view, _} = start_live_view(conn, route_id_param, direction_id, stop_id_param)
    pid = view.pid
    :erlang.trace(pid, true, [:receive])

    assert_receive {:trace, ^pid, :receive,
                    %Phoenix.Socket.Broadcast{event: "upcoming_departures"}}

    assert view
           |> element("[data-test=\"u_d:async_success\"]")
           |> has_element?()
  end

  @tag :flaky
  test "shows last scheduled trip for subway", %{conn: conn} do
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

    expect(Schedules.Repo.Mock, :by_route_ids, 3, fn _, _ ->
      schedules ++ [last_schedule]
    end)

    # Available upcoming departures are earlier than the last scheduled time
    expect(Dotcom.UpcomingDepartures.Mock, :upcoming_departures, 1, fn _, _ ->
      Factories.UpcomingDepartures.build_list(15, :upcoming_departure,
        time: @date_time_module.now() |> DateTime.shift(minute: 20)
      )
    end)

    {:ok, view, _} = start_live_view(conn, route_id, direction_id, stop_id)
    pid = view.pid
    :erlang.trace(pid, true, [:receive])

    assert_receive {:trace, ^pid, :receive,
                    %Phoenix.Socket.Broadcast{event: "upcoming_departures"}}

    {:ok, rendered_time} = Dotcom.Utils.Time.format(last_schedule.time, :hour_12_minutes)

    assert view
           |> element("[data-test=\"u_d:async_success\"]")
           |> has_element?()

    assert render(view) =~ "Scheduled service continues until #{rendered_time}"
  end

  @tag :flaky
  test "receives and shows service ended message", %{conn: conn} do
    # Setup
    expect(Dotcom.UpcomingDepartures.Mock, :upcoming_departures, fn _, _ ->
      :service_ended
    end)

    {:ok, view, _} = start_live_view(conn)
    pid = view.pid
    :erlang.trace(pid, true, [:receive])

    assert_receive {:trace, ^pid, :receive,
                    %Phoenix.Socket.Broadcast{event: "upcoming_departures"}}

    assert view
           |> element("[data-test=\"u_d:async_success\"]")
           |> has_element?()

    assert render(view) =~ "Service ended"
  end

  describe "shows no realtime message" do
    setup do
      stub(Schedules.Repo.Mock, :by_route_ids, fn _, _ ->
        Factories.Schedules.Schedule.build_list(1, :schedule,
          time: @date_time_module.now() |> DateTime.shift(minute: 40)
        )
      end)

      :ok
    end

    @tag :flaky
    test "with scheduled departures", %{conn: conn} do
      upcoming_departures =
        Factories.UpcomingDepartures.build_list(15, :upcoming_departure,
          time: @date_time_module.now() |> DateTime.shift(minute: 20)
        )

      expect(Dotcom.UpcomingDepartures.Mock, :upcoming_departures, fn _, _ ->
        {:no_realtime, upcoming_departures}
      end)

      {:ok, view, _} = start_live_view(conn)
      pid = view.pid
      :erlang.trace(pid, true, [:receive])

      assert_receive {:trace, ^pid, :receive,
                      %Phoenix.Socket.Broadcast{event: "upcoming_departures"}}

      assert view
             |> element("[data-test=\"u_d:async_success\"]")
             |> has_element?()

      assert render(view) =~
               "There are currently no realtime departures available. Scheduled departures are shown below."
    end

    @tag :flaky
    test "without scheduled departures", %{conn: conn} do
      expect(Dotcom.UpcomingDepartures.Mock, :upcoming_departures, fn _, _ ->
        :no_realtime
      end)

      {:ok, view, _} = start_live_view(conn)
      pid = view.pid
      :erlang.trace(pid, true, [:receive])

      assert_receive {:trace, ^pid, :receive,
                      %Phoenix.Socket.Broadcast{event: "upcoming_departures"}}

      assert view
             |> element("[data-test=\"u_d:async_success\"]")
             |> has_element?()

      assert render(view) =~ "There are currently no realtime departures available."
    end
  end

  @tag :flaky
  test "shows error when server error occurs", %{conn: conn} do
    stub(Dotcom.UpcomingDepartures.Mock, :upcoming_departures, fn _, _ ->
      :no_realtime
    end)

    route_id = FactoryHelpers.build(:id)
    direction_id = FactoryHelpers.build(:direction_id)
    stop_id = FactoryHelpers.build(:id)
    params = %{route_id: route_id, direction_id: direction_id, stop_id: stop_id}

    {:ok, view, _} = start_live_view(conn, route_id, direction_id, stop_id)
    pid = view.pid
    :erlang.trace(pid, true, [:receive])

    assert_receive {:trace, ^pid, :receive,
                    %Phoenix.Socket.Broadcast{event: "upcoming_departures"}}

    assert view
           |> element("[data-test=\"u_d:async_success\"]")
           |> has_element?()

    # trigger the correct server's terminate/2
    :ok =
      GenServer.whereis({:global, {Dotcom.UpcomingDepartures.Server, params}})
      |> GenServer.stop(:normal)

    assert_receive {:trace, ^pid, :receive,
                    %Phoenix.Socket.Broadcast{event: "upcoming_departures", payload: :terminated}}

    refute view
           |> element("[data-test=\"u_d:async_success\"]")
           |> has_element?()

    assert view
           |> element("[data-test=\"u_d:async_failed\"]")
           |> has_element?()

    assert render(view) =~ "There was a problem loading upcoming departures"
  end

  defp start_live_view(conn, route_id \\ nil, direction_id \\ nil, stop_id \\ nil) do
    route_id = route_id || FactoryHelpers.build(:id)
    direction_id = direction_id || FactoryHelpers.build(:direction_id)
    stop_id = stop_id || FactoryHelpers.build(:id)
    allow_mocks(route_id, stop_id, direction_id)

    live_isolated(conn, UpcomingDeparturesLive,
      session: %{
        "route_id" => route_id,
        "direction_id" => direction_id,
        "stop_id" => stop_id
      },
      on_error: :warn
    )
  end
end
