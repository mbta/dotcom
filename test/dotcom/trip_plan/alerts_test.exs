defmodule Dotcom.TripPlan.AlertsTest do
  use ExUnit.Case, async: true
  # @moduletag :external

  import Dotcom.TripPlan.Alerts
  import Mox
  import Test.Support.Factory.TripPlanner

  alias Alerts.Alert
  alias Alerts.InformedEntity, as: IE
  alias TripPlan.Itinerary

  setup :verify_on_exit!

  setup do
    # The itinerary parsing currently queries for trips to aid in assigning fare
    # values to legs, when those legs are transit legs within the MBTA service
    # network.
    stub(MBTA.Api.Mock, :get_json, fn path, _ ->
      case path do
        "/trips/" <> _ ->
          %JsonApi{links: %{}, data: [Test.Support.Factory.MbtaApi.build(:trip_item)]}

        "/routes/" <> _ ->
          %JsonApi{links: %{}, data: [Test.Support.Factory.MbtaApi.build(:route_item)]}

        _ ->
          %JsonApi{links: %{}, data: []}
      end
    end)

    stub(Stops.Repo.Mock, :get, fn _ ->
      Test.Support.Factory.Stop.build(:stop)
    end)

    itinerary =
      build(:itinerary,
        legs: [build(:transit_leg)]
      )

    [route_id] = Itinerary.route_ids(itinerary)
    [trip_id] = Itinerary.trip_ids(itinerary)
    {:ok, %{itinerary: itinerary, route_id: route_id, trip_id: trip_id}}
  end

  describe "filter_for_itinerary/2" do
    test "returns an alert if it affects the route", %{itinerary: itinerary, route_id: route_id} do
      good_alert =
        Alert.new(
          active_period: [valid_active_period(itinerary)],
          informed_entity: [%IE{route: route_id}]
        )

      bad_alert = Alert.update(good_alert, informed_entity: [%IE{route: "not_valid"}])
      assert_only_good_alert(good_alert, bad_alert, itinerary)
    end

    test "returns an alert if it affects the trip", %{itinerary: itinerary, trip_id: trip_id} do
      good_alert =
        Alert.new(
          active_period: [valid_active_period(itinerary)],
          informed_entity: [%IE{trip: trip_id}]
        )

      bad_alert = Alert.update(good_alert, informed_entity: [%IE{trip: "not_valid"}])
      assert_only_good_alert(good_alert, bad_alert, itinerary)
    end

    test "returns an alert if it affects the route in a direction", %{
      itinerary: itinerary,
      route_id: route_id
    } do
      good_alert =
        Alert.new(
          active_period: [valid_active_period(itinerary)],
          informed_entity: [%IE{route: route_id, direction_id: 1}]
        )

      bad_alert =
        Alert.update(good_alert, informed_entity: [%IE{route: route_id, direction_id: 0}])

      assert_only_good_alert(good_alert, bad_alert, itinerary)
    end

    test "returns an alert if it affects the route's type", %{
      itinerary: itinerary,
      route_id: route_id
    } do
      route = %Routes.Route{id: route_id}

      good_alert =
        Alert.new(
          active_period: [valid_active_period(itinerary)],
          informed_entity: [%IE{route_type: route.type}]
        )

      bad_alert = Alert.update(good_alert, informed_entity: [%IE{route_type: 0}])
      assert_only_good_alert(good_alert, bad_alert, itinerary)
    end

    test "returns an alert if it matches a transfer stop", %{itinerary: itinerary} do
      stop_id = itinerary |> Itinerary.stop_ids() |> Enum.at(1)

      good_alert =
        Alert.new(
          active_period: [valid_active_period(itinerary)],
          informed_entity: [%IE{stop: stop_id}]
        )

      bad_alert =
        Alert.update(good_alert, informed_entity: [%IE{stop: stop_id, route: "different route"}])

      assert_only_good_alert(good_alert, bad_alert, itinerary)
    end

    test "ignores an alert if it's at the wrong time", %{itinerary: itinerary, route_id: route_id} do
      good_alert =
        Alert.new(
          active_period: [valid_active_period(itinerary)],
          informed_entity: [%IE{route: route_id}]
        )

      bad_alert = Alert.update(good_alert, active_period: [invalid_active_period(itinerary)])
      assert_only_good_alert(good_alert, bad_alert, itinerary)
    end
  end

  defp assert_only_good_alert(good_alert, bad_alert, itinerary) do
    assert filter_for_itinerary([good_alert, bad_alert], itinerary) == [good_alert]
  end

  defp valid_active_period(%Itinerary{start: start, stop: stop}) do
    {start, stop}
  end

  defp invalid_active_period(%Itinerary{start: start}) do
    {nil, Timex.shift(start, hours: -1)}
  end
end
