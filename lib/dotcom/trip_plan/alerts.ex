defmodule Dotcom.TripPlan.Alerts do
  @moduledoc """
  Alert matching for itineraries returned from the trip_plan application

  For each itinerary, we want to return relevant alerts:
  * on the routes they'll be travelling
  * at the stops they'll be interacting with
  * at the times they'll be travelling
  """

  import Routes.Route, only: [is_external?: 1]

  alias Alerts.Alert
  alias Alerts.InformedEntity, as: IE
  alias Dotcom.TripPlan.{Itinerary, Leg, TransitDetail}

  @spec from_itinerary(Itinerary.t()) :: [Alerts.Alert.t()]
  def from_itinerary(itinerary) do
    itinerary.start
    |> Alerts.Repo.all()
    |> Alerts.Match.match(
      entities(itinerary),
      itinerary.start
    )
  end

  @doc "Filters a list of Alerts to those relevant to the Itinerary"
  @spec filter_for_itinerary([Alert.t()], Itinerary.t()) :: [Alert.t()]
  def filter_for_itinerary(alerts, itinerary) do
    Alerts.Match.match(
      alerts,
      Enum.concat(intermediate_entities(itinerary), entities(itinerary)),
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

  defp intermediate_entities(itinerary) do
    itinerary
    |> Itinerary.intermediate_stop_ids()
    |> Enum.map(&%IE{stop: &1})
  end

  @spec entities(Itinerary.t()) :: [IE.t()]
  defp entities(itinerary) do
    itinerary
    |> Enum.flat_map(&leg_entities(&1))
    |> Enum.uniq()
  end

  defp leg_entities(%Leg{mode: mode} = leg) do
    for entity <- mode_entities(mode),
        stop_id <- Leg.stop_ids(leg) do
      %{entity | stop: stop_id}
    end
  end

  defp leg_entities_from(%Leg{mode: mode} = leg) do
    for entity <- mode_entities(mode),
        stop_id <- Leg.stop_ids_from(leg) do
      %{entity | stop: stop_id}
    end
  end

  defp leg_entities_to(%Leg{mode: mode} = leg) do
    for entity <- mode_entities(mode),
        stop_id <- Leg.stop_ids_to(leg) do
      %{entity | stop: stop_id}
    end
  end

  defp mode_entities(%TransitDetail{route: route}) when is_external?(route) do
    []
  end

  defp mode_entities(%TransitDetail{
         route: %{id: route_id, type: route_type},
         trip: %{id: trip_id, direction_id: direction_id}
       }) do
    [%IE{route_type: route_type, route: route_id, trip: trip_id, direction_id: direction_id}]
  end

  defp mode_entities(_) do
    []
  end

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

    entities_from = leg_entities_from(leg)
    from = Alerts.Match.match(stop_alerts, entities_from)

    entities_to = leg_entities_to(leg)
    to = Alerts.Match.match(stop_alerts, entities_to)

    %{
      route: route_alerts,
      from: from,
      to: to
    }
  end
end
