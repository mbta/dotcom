defmodule Dotcom.TripPlan.Alerts do
  @moduledoc """
  Alert matching for itineraries returned from the trip_plan application

  For each itinerary, we want to return relevant alerts:
  * on the routes they'll be travelling
  * at the stops they'll be interacting with
  * at the times they'll be travelling
  """

  import Dotcom.TripPlan.Helpers, only: [agency_name?: 2, mbta_id: 1]

  alias Alerts.{Alert, InformedEntity}
  alias OpenTripPlannerClient.Schema.{Itinerary, Leg, LegTime}

  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]

  def by_mode_and_stops(alerts, leg) when agency_name?(leg, "MBTA") do
    {route_alerts, stop_alerts} =
      alerts
      |> Enum.split_with(fn alert ->
        alert.informed_entity.entities
        |> Enum.all?(fn
          %{stop: nil} -> true
          _ -> false
        end)
      end)

    from_stop_id = mbta_id(leg.from.stop)
    to_stop_id = mbta_id(leg.to.stop)
    entities_from = mode_entities_with_stop_ids(leg, [from_stop_id])
    from = Alerts.Match.match(stop_alerts, entities_from)

    entities_to = mode_entities_with_stop_ids(leg, [to_stop_id])
    to = Alerts.Match.match(stop_alerts, entities_to)

    %{
      route: route_alerts,
      from: from,
      to: to
    }
  end

  def by_mode_and_stops(_, _) do
    %{
      route: [],
      from: [],
      to: []
    }
  end

  @spec from_itinerary(Itinerary.t()) :: [Alerts.Alert.t()]
  def from_itinerary(itinerary) do
    itinerary.start
    |> @alerts_repo.all()
    |> Enum.reject(&reject_irrelevant_alert(&1, Itinerary.accessible?(itinerary)))
    |> Alerts.Match.match(
      entities(itinerary),
      itinerary.start
    )
  end

  @doc "Filters a list of Alerts to those relevant to the Leg"
  @spec filter_for_leg([Alert.t()], Leg.t()) :: [Alert.t()]
  def filter_for_leg(alerts, leg) when agency_name?(leg, "MBTA") do
    Alerts.Match.match(
      alerts,
      leg_entities(leg),
      LegTime.time(leg.start)
    )
  end

  def filter_for_leg(_, _), do: []

  # Reject an alert that is not relevant to a trip plan:
  #  - accessibility issue (see `reject_accessibility_alert`)
  #  - bike issue
  #  - facility issue
  #  - parking closure
  #  - parking issue
  defp reject_irrelevant_alert(alert, accessible?) do
    reject_accessibility_alert(alert, accessible?) ||
      Enum.member?(~w[bike_issue facility_issue parking_closure parking_issue]a, alert.effect)
  end

  # Reject an alert that is not relevant to a trip plan *unless* we want an accessible trip:
  # - elevator closure
  # - escalator closure
  defp reject_accessibility_alert(alert, accessible?) do
    is_nil(accessible?) &&
      (alert.effect == :elevator_closure || alert.effect == :escalator_closure)
  end

  @spec entities(Itinerary.t()) :: [InformedEntity.t()]
  defp entities(itinerary) do
    itinerary.legs
    |> Enum.flat_map(&leg_entities(&1))
    |> Enum.uniq()
  end

  defp leg_entities(leg) when agency_name?(leg, "MBTA") do
    from = mbta_id(leg.from.stop)
    to = mbta_id(leg.to.stop)

    mode_entities_with_stop_ids(leg, [from, to])
  end

  defp leg_entities(_), do: []

  defp mode_entities_with_stop_ids(leg, stop_ids) when agency_name?(leg, "MBTA") do
    for entity <- mode_entities(leg),
        stop_id <- stop_ids do
      %{entity | stop: stop_id}
    end
  end

  defp mode_entities_with_stop_ids(_, _), do: []

  defp mode_entities(%Leg{route: route, trip: trip} = leg) when agency_name?(leg, "MBTA") do
    route_type =
      if route do
        route.type
      end

    route_id = mbta_id(route)
    trip_id = mbta_id(trip)

    direction_id =
      if trip do
        trip.direction_id
      end

    [
      %InformedEntity{
        route_type: route_type,
        route: route_id,
        trip: trip_id,
        direction_id: direction_id
      }
    ]
  end

  defp mode_entities(_) do
    []
  end
end
