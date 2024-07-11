defmodule Dotcom.TripPlan.AlertsTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.Alerts
  import Mox
  import Test.Support.Factories.TripPlanner.TripPlanner

  alias Alerts.Alert
  alias Alerts.InformedEntity, as: IE
  alias TripPlan.Itinerary

  setup :verify_on_exit!

  setup do
    leg = build(:transit_leg)

    itinerary =
      build(:itinerary,
        legs: [leg]
      )

    [route_id] = Itinerary.route_ids(itinerary)
    [trip_id] = Itinerary.trip_ids(itinerary)
    {:ok, %{itinerary: itinerary, route_id: route_id, trip_id: trip_id, route: leg.mode.route}}
  end

  describe "filter_for_itinerary/2" do
    test "returns an alert if it affects the route", %{itinerary: itinerary, route_id: route_id} do
      expect(MBTA.Api.Mock, :get_json, fn "/trips/" <> id, [] ->
        %JsonApi{
          data: [
            Test.Support.Factories.MBTA.Api.build(:trip_item, %{id: id})
          ]
        }
      end)

      good_alert =
        Alert.new(
          active_period: [valid_active_period(itinerary)],
          informed_entity: [%IE{route: route_id}]
        )

      bad_alert = Alert.update(good_alert, informed_entity: [%IE{route: "not_valid"}])
      assert_only_good_alert(good_alert, bad_alert, itinerary)
    end

    test "returns an alert if it affects the trip", %{itinerary: itinerary, trip_id: trip_id} do
      expect(MBTA.Api.Mock, :get_json, fn "/trips/" <> ^trip_id, [] ->
        %JsonApi{
          data: [
            Test.Support.Factories.MBTA.Api.build(:trip_item, %{id: trip_id})
          ]
        }
      end)

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
      expect(MBTA.Api.Mock, :get_json, fn "/trips/" <> id, [] ->
        %JsonApi{
          data: [
            Test.Support.Factories.MBTA.Api.build(:trip_item, %{
              id: id,
              attributes: %{"direction_id" => 1}
            })
          ]
        }
      end)

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
      route: route
    } do
      expect(MBTA.Api.Mock, :get_json, fn "/trips/" <> id, [] ->
        %JsonApi{
          data: [
            Test.Support.Factories.MBTA.Api.build(:trip_item, %{id: id})
          ]
        }
      end)

      good_alert =
        Alert.new(
          active_period: [valid_active_period(itinerary)],
          informed_entity: [%IE{route_type: route.type}]
        )

      bad_alert = Alert.update(good_alert, informed_entity: [%IE{route_type: route.type + 1}])
      assert_only_good_alert(good_alert, bad_alert, itinerary)
    end

    test "returns an alert if it matches a transfer stop", %{itinerary: itinerary} do
      expect(MBTA.Api.Mock, :get_json, fn "/trips/" <> id, [] ->
        %JsonApi{
          data: [
            Test.Support.Factories.MBTA.Api.build(:trip_item, %{id: id})
          ]
        }
      end)

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
      expect(MBTA.Api.Mock, :get_json, fn "/trips/" <> id, [] ->
        %JsonApi{
          data: [
            Test.Support.Factories.MBTA.Api.build(:trip_item, %{id: id})
          ]
        }
      end)

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
