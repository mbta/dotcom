defmodule Dotcom.TripPlan.AlertsTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.Alerts
  import Mox
  import OpenTripPlannerClient.Test.Support.Factory

  alias Alerts.{Alert, InformedEntity}
  alias OpenTripPlannerClient.Schema.Itinerary

  setup :verify_on_exit!

  describe "by_mode_and_stops/2 " do
    test "groups alerts by route, to, and from" do
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

    test "no alerts when outside MBTA" do
      from_stop_id = Faker.Internet.slug()
      to_stop_id = Faker.Internet.slug()
      route_id = Faker.Internet.slug()

      leg =
        build(:transit_leg,
          agency: build(:agency, name: "Massport"),
          from: build(:place, stop: build(:stop, gtfs_id: "massport-ma-us:#{from_stop_id}")),
          to: build(:place, stop: build(:stop, gtfs_id: "massport-ma-us:#{to_stop_id}")),
          route: build(:route, gtfs_id: "massport-ma-us:#{route_id}")
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
               from: [],
               to: [],
               route: []
             }
    end
  end

  describe "from_itinerary/1" do
    test "rejects irrelevant alerts" do
      route_id = Faker.Internet.slug()

      itinerary =
        build(:itinerary,
          accessibility_score: nil,
          legs:
            build_list(1, :transit_leg, route: build(:route, gtfs_id: "mbta-ma-us:#{route_id}"))
        )

      irrelevant_route_alert =
        Alert.new(
          active_period: [valid_active_period(itinerary)],
          effect: Faker.Util.pick(~w[bike_issue facility_issue parking_closure parking_issue]a),
          informed_entity: [%InformedEntity{route: route_id}]
        )

      expect(Alerts.Repo.Mock, :all, fn _ ->
        [irrelevant_route_alert]
      end)

      assert [] = from_itinerary(itinerary)
    end

    test "rejects irrelevant accessibility alerts" do
      route_id = Faker.Internet.slug()

      itinerary =
        build(:itinerary,
          accessibility_score: nil,
          legs:
            build_list(1, :transit_leg, route: build(:route, gtfs_id: "mbta-ma-us:#{route_id}"))
        )

      irrelevant_route_alert =
        Alert.new(
          active_period: [valid_active_period(itinerary)],
          effect: :escalator_closure,
          informed_entity: [%InformedEntity{route: route_id}]
        )

      expect(Alerts.Repo.Mock, :all, fn _ ->
        [irrelevant_route_alert]
      end)

      assert [] = from_itinerary(itinerary)
    end

    test "keeps relevant accessibility alerts" do
      route_id = Faker.Internet.slug()

      itinerary =
        build(:itinerary,
          accessibility_score: 0.4,
          legs:
            build_list(1, :transit_leg, route: build(:route, gtfs_id: "mbta-ma-us:#{route_id}"))
        )

      accessibility_alert =
        Alert.new(
          active_period: [valid_active_period(itinerary)],
          effect: :escalator_closure,
          informed_entity: [%InformedEntity{route: route_id}]
        )

      expect(Alerts.Repo.Mock, :all, fn _ ->
        [accessibility_alert]
      end)

      assert [^accessibility_alert] = from_itinerary(itinerary)
    end
  end

  defp valid_active_period(%Itinerary{start: start, end: stop}) do
    {start, stop}
  end
end
