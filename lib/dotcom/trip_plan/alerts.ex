defmodule Dotcom.TripPlan.Alerts do
  @moduledoc """
  Alert matching for itineraries returned from the trip_plan application

  For each itinerary, we want to return relevant alerts:
  * on the routes they'll be travelling
  * at the stops they'll be interacting with
  * at the times they'll be travelling
  """

  alias Alerts.{Alert, InformedEntity}
  alias Dotcom.TripPlan.{Itinerary, Leg, TransitDetail}

  def by_mode_and_stops(alerts, leg) do
    {route_alerts, stop_alerts} =
      alerts
      |> Enum.split_with(fn alert ->
        alert.informed_entity.entities
        |> Enum.all?(fn
          %{stop: nil} -> true
          _ -> false
        end)
      end)

    %{from: from_stop_ids, to: to_stop_ids} = Leg.stop_ids(leg)

    entities_from = mode_entities_with_stop_ids(leg.mode, from_stop_ids)
    from = Alerts.Match.match(stop_alerts, entities_from)

    entities_to = mode_entities_with_stop_ids(leg.mode, to_stop_ids)
    to = Alerts.Match.match(stop_alerts, entities_to)

    %{
      route: route_alerts,
      from: from,
      to: to
    }
  end

  @spec from_itinerary(Itinerary.t()) :: [Alerts.Alert.t()]
  def from_itinerary(itinerary) do
    itinerary.start
    |> Alerts.Repo.all()
    |> Enum.reject(&reject_irrelevant_alert(&1, itinerary.accessible?))
    |> Alerts.Match.match(
      entities(itinerary),
      itinerary.start
    )
  end

  @doc "Filters a list of Alerts to those relevant to the Leg"
  @spec filter_for_leg([Alert.t()], Leg.t()) :: [Alert.t()]
  def filter_for_leg(alerts, leg) do
    Alerts.Match.match(
      alerts,
      leg_entities(leg),
      leg.start
    )
  end

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
    not accessible? && (alert.effect == :elevator_closure || alert.effect == :escalator_closure)
  end

  @spec entities(Itinerary.t()) :: [InformedEntity.t()]
  defp entities(itinerary) do
    itinerary
    |> Enum.flat_map(&leg_entities(&1))
    |> Enum.uniq()
  end

  defp leg_entities(%Leg{mode: mode} = leg) do
    %{from: from, to: to} = Leg.stop_ids(leg)

    mode_entities_with_stop_ids(mode, from ++ to)
  end

  defp mode_entities_with_stop_ids(mode, stop_ids) do
    for entity <- mode_entities(mode),
        stop_id <- stop_ids do
      %{entity | stop: stop_id}
    end
  end

  defp mode_entities(%TransitDetail{route: route, trip: %{id: trip_id}}) do
    trip =
      if is_nil(route.external_agency_name) do
        Schedules.Repo.trip(trip_id)
      end

    route_type =
      if route do
        route.type
      end

    direction_id =
      if trip do
        trip.direction_id
      end

    [
      %InformedEntity{
        route_type: route_type,
        route: route.id,
        trip: trip_id,
        direction_id: direction_id
      }
    ]
  end

  defp mode_entities(_) do
    []
  end
end
