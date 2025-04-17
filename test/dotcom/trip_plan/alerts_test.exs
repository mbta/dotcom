defmodule Dotcom.TripPlan.AlertsTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.Alerts
  import Mox
  import OpenTripPlannerClient.Test.Support.Factory

  alias Alerts.{Alert, InformedEntity}
  alias OpenTripPlannerClient.Schema.Itinerary

  setup :verify_on_exit!

  test "by_mode_and_stops/2 groups alerts by route, to, and from" do
    from_stop_id = Faker.Internet.slug()
    to_stop_id = Faker.Internet.slug()
    route_id = Faker.Internet.slug()

    leg =
      build(:transit_leg,
        from: build(:place, stop: build(:stop, gtfs_id: "mbta-ma-us:#{from_stop_id}")),
        to: build(:place, stop: build(:stop, gtfs_id: "mbta-ma-us:#{to_stop_id}")),
        route: build(:route, gtfs_id: "mbta-ma-us:#{route_id}")
      )

    itinerary = build(:itinerary, legs: [leg])

    route_alert =
      Alert.new(
        active_period: [valid_active_period(itinerary)],
        informed_entity: [%InformedEntity{route: route_id}]
      )

    from_alert =
      Alert.new(
        active_period: [valid_active_period(itinerary)],
        informed_entity: [%InformedEntity{stop: from_stop_id}]
      )

    to_alert =
      Alert.new(
        active_period: [valid_active_period(itinerary)],
        informed_entity: [%InformedEntity{stop: to_stop_id}]
      )

    assert by_mode_and_stops([route_alert, from_alert, to_alert], leg) == %{
             from: [from_alert],
             to: [to_alert],
             route: [route_alert]
           }
  end

  defp valid_active_period(%Itinerary{start: start, end: stop}) do
    {start, stop}
  end
end
