defmodule Dotcom.RealtimeScheduleTest do
  use ExUnit.Case, async: true

  import Dotcom.RealtimeSchedule
  import Mox

  # credo:disable-for-lines:6 Credo.Check.Readability.AliasAs
  alias Test.Support.Factories.Predictions.Prediction, as: PredictionFactory
  alias Test.Support.Factories.RoutePatterns.RoutePattern, as: RoutePatternFactory
  alias Test.Support.Factories.Routes.Route, as: RouteFactory
  alias Test.Support.Factories.Schedules.Schedule, as: ScheduleFactory
  alias Test.Support.Factories.Schedules.Trip, as: TripFactory
  alias Test.Support.Factories.Stops.Stop, as: StopFactory

  setup :verify_on_exit!

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  test "stop_data/1 requests alerts, routes, schedules, predictions for stop(s) and returns data" do
    stop_id = Faker.Address.city()
    route = RouteFactory.build(:route)
    route_patterns = RoutePatternFactory.build_list(3, :route_pattern)

    predictions =
      PredictionFactory.build_list(2, :prediction, trip: TripFactory.build(:trip))

    expect(Alerts.Repo.Mock, :by_route_ids, fn routes, _date ->
      assert routes == [route.id]
      []
    end)

    expect(Predictions.Repo.Mock, :all_no_cache, length(route_patterns), fn opts ->
      assert opts[:stop] == stop_id
      assert opts[:route_pattern] in Enum.map(route_patterns, & &1.id)
      predictions
    end)

    expect(Routes.Repo.Mock, :by_stop_with_route_pattern, fn ^stop_id ->
      [{route, route_patterns}]
    end)

    expect(Schedules.RepoCondensed.Mock, :by_route_ids, fn route_ids, opts ->
      assert route_ids == [route.id]
      assert opts[:stop_ids] == [stop_id]
      assert opts[:min_time]

      ScheduleFactory.build_list(5, :schedule_condensed)
    end)

    expect(Stops.Repo.Mock, :get, fn ^stop_id ->
      StopFactory.build(:stop, id: stop_id)
    end)

    assert [
             %{
               stop: %{id: ^stop_id},
               route: route_data,
               predicted_schedules_by_route_pattern: predicted_schedules_by_route_pattern
             }
           ] = stop_data([stop_id])

    assert route_data.id == route.id

    for %{name: name} <- route_patterns do
      assert %{
               ^name => %{
                 direction_id: _,
                 predicted_schedules: predicted_schedules
               }
             } =
               predicted_schedules_by_route_pattern

      assert predicted_schedules
    end
  end

  test "stop_data/1 returns empty when no routes" do
    stop_id = Faker.Address.city()
    expect(Routes.Repo.Mock, :by_stop_with_route_pattern, fn _ -> [] end)

    expect(Stops.Repo.Mock, :get, fn ^stop_id ->
      StopFactory.build(:stop, id: stop_id)
    end)

    deny(Alerts.Repo.Mock, :by_route_ids, 2)
    deny(Predictions.Repo.Mock, :all_no_cache, 1)
    deny(Schedules.RepoCondensed.Mock, :by_route_ids, 2)
    assert stop_data([stop_id]) == []
  end
end
