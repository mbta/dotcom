defmodule Alerts.TripTest do
  use ExUnit.Case, async: true

  alias Alerts.Alert
  alias Alerts.InformedEntity, as: IE
  alias Alerts.Trip

  @trip_id "trip_id"
  @route_id "route_id"

  test "includes alerts that apply directly to the given trip" do
    alert = Alert.new(informed_entity: [%IE{trip: @trip_id}])
    wrong_alert = Alert.new(informed_entity: [%IE{trip: "other trip"}])

    assert [alert] == Trip.match([alert, wrong_alert], @trip_id)
  end

  test "can query multiple trip IDs" do
    alert = Alert.new(informed_entity: [%IE{trip: @trip_id}])
    alert_two = Alert.new(informed_entity: [%IE{trip: "other_trip"}])

    alert_both =
      Alert.new(
        informed_entity: [
          %IE{trip: @trip_id},
          %IE{trip: "other_trip"}
        ]
      )

    expected = [alert, alert_both, alert_two]
    actual = Trip.match([alert, alert_two, alert_both], [@trip_id, "other_trip"])
    assert Enum.sort(expected) == Enum.sort(actual)
  end

  test "includes delays that apply to the route" do
    alert =
      Alert.new(
        effect: :delay,
        informed_entity: [%IE{route: @route_id}]
      )

    suspension =
      Alert.new(
        effect: :suspension,
        informed_entity: [%IE{route: @route_id}]
      )

    wrong_route =
      Alert.new(
        header: "Wrong Route",
        effect: :delay,
        informed_entity: [%IE{route: "other route"}]
      )

    wrong_effect =
      Alert.new(
        header: "Wrong Effect",
        informed_entity: [%IE{route: @route_id}]
      )

    assert [alert, suspension] ==
             Trip.match(
               [alert, suspension, wrong_route, wrong_effect],
               @trip_id,
               route: @route_id
             )

    assert [alert, suspension] ==
             Trip.match(
               [alert, suspension, wrong_route, wrong_effect],
               [@trip_id],
               route: @route_id
             )
  end

  test "does not double-count delays on a trip" do
    alert =
      Alert.new(
        effect: :delay,
        informed_entity: [%IE{trip: @trip_id}]
      )

    assert [alert] == Trip.match([alert], @trip_id)
    assert [alert] == Trip.match([alert], [@trip_id])
  end

  test "does not count delays on a different trip even on the same route" do
    alert =
      Alert.new(
        effect: :delay,
        informed_entity: [%IE{route: @route_id, trip: "different trip"}]
      )

    assert [] == Trip.match([alert], @trip_id, route: @route_id)
    assert [] == Trip.match([alert], [@trip_id], route: @route_id)
  end

  test "includes delays that are active at :time" do
    now = DateTime.utc_now()

    alert =
      Alert.new(
        informed_entity: [%IE{trip: @trip_id}],
        active_period: [{now, nil}]
      )

    wrong_alert =
      Alert.new(
        informed_entity: [%IE{trip: @trip_id}],
        active_period: []
      )

    assert [alert] == Trip.match([alert, wrong_alert], @trip_id, time: now)
    assert [alert] == Trip.match([alert, wrong_alert], [@trip_id], time: now)
  end

  test "does not include alerts which only apply to the route type of the trip" do
    alert =
      Alert.new(
        severity: 7,
        informed_entity: [%IE{route_type: 1}]
      )

    assert [] == Trip.match([alert], @trip_id, route_type: 1, route: @route_id)
    assert [] == Trip.match([alert], [@trip_id], route_type: 1, route: @route_id)
  end
end
