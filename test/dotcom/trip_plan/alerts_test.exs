defmodule Dotcom.TripPlan.AlertsTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.Alerts
  import Mox

  alias Alerts.{Alert, InformedEntity}
  alias Dotcom.TripPlan.{Itinerary, Leg}
  alias Test.Support.Factories.{MBTA.Api, Stops.Stop, TripPlanner.TripPlanner}

  setup :verify_on_exit!

  @tag :flaky
  test "by_mode_and_stops/2 groups alerts by route, to, and from" do
    stub(Stops.Repo.Mock, :get, &Stop.build(:stop, id: &1))

    leg = TripPlanner.build(:transit_leg)

    itinerary =
      TripPlanner.build(:itinerary,
        legs: [leg]
      )

    expect(MBTA.Api.Mock, :get_json, fn "/trips/" <> id, [] ->
      %JsonApi{
        data: [
          Api.build(:trip_item, %{id: id})
        ]
      }
    end)

    [leg] = itinerary.legs
    [from_stop_id, to_stop_id] = leg |> Leg.stop_ids()

    route_alert =
      Alert.new(
        active_period: [valid_active_period(itinerary)],
        informed_entity: [%InformedEntity{route: leg.route.id}]
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

  defp valid_active_period(%Itinerary{start: start, stop: stop}) do
    {start, stop}
  end
end
