defmodule Dotcom.TripPlan.Alerts do
  @moduledoc """
  Alert matching for itineraries returned from the trip_plan application

  For each itinerary, we want to return relevant alerts:
  * on the routes they'll be travelling
  * at the stops they'll be interacting with
  * at the times they'll be travelling
  """
  alias TripPlan.{Itinerary, Leg, TransitDetail}
  alias Alerts.Alert
  alias Alerts.InformedEntity, as: IE

  @default_opts [
    route_by_id: &Routes.Repo.get/1,
    trip_by_id: &Schedules.Repo.trip/1
  ]

  @doc "Filters a list of Alerts to those relevant to the Itinerary"
  @spec filter_for_itinerary([Alert.t()], Itinerary.t(), Keyword.t()) :: [Alert.t()]
  def filter_for_itinerary(alerts, itinerary, opts \\ []) do
    opts = Keyword.merge(@default_opts, opts)

    Alerts.Match.match(
      alerts,
      Enum.concat(intermediate_entities(itinerary), entities(itinerary, opts)),
      itinerary.start
    )
  end

  defp intermediate_entities(itinerary) do
    itinerary
    |> Itinerary.intermediate_stop_ids()
    |> Enum.map(&%IE{stop: &1})
  end

  @spec entities(Itinerary.t(), Keyword.t()) :: [IE.t()]
  defp entities(itinerary, opts) do
    itinerary
    |> Enum.flat_map(&leg_entities(&1, opts))
    |> Enum.uniq()
  end

  defp leg_entities(%Leg{mode: mode} = leg, opts) do
    for entity <- mode_entities(mode, opts),
        stop_id <- Leg.stop_ids(leg) do
      %{entity | stop: stop_id}
    end
  end

  defp mode_entities(%TransitDetail{route_id: route_id, trip_id: trip_id}, opts) do
    route = Keyword.get(opts, :route_by_id).(route_id)
    trip = Keyword.get(opts, :trip_by_id).(trip_id)

    route_type =
      if route do
        route.type
      end

    direction_id =
      if trip do
        trip.direction_id
      end

    [%IE{route_type: route_type, route: route_id, trip: trip_id, direction_id: direction_id}]
  end

  defp mode_entities(_, _opts) do
    []
  end
end
