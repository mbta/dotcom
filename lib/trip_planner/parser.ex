defmodule Dotcom.TripPlanner.Parser do
  @moduledoc """
  Parse results from OpenTripPlanner:

  1. Convert all distances from meters, to miles.
  2. Convert all durations from seconds, to minutes.
  3. Add fare passes to each itinerary
  4. Add fare to each leg.
  5. For places, get more information for Stops and Routes if they're within the
     MBTA system.
  """

  alias TripPlan.{Itinerary, Leg, NamedPosition, PersonalDetail, TransitDetail}
  alias Dotcom.TripPlanner.FarePasses
  alias OpenTripPlannerClient.Schema

  @spec parse(Schema.Itinerary.t()) :: Itinerary.t()
  def parse(
        %Schema.Itinerary{
          accessibility_score: accessibility_score,
          duration: seconds,
          legs: legs,
          walk_distance: meters
        } = itinerary
      ) do
    legs_with_fares =
      Enum.map(legs, fn leg ->
        leg
        |> parse()
        |> FarePasses.leg_with_fares()
      end)

    # Enumerable not implemented for the map?
    struct(
      Itinerary,
      Map.merge(Map.from_struct(itinerary), %{
        accessible?: accessibility_score == 1,
        duration: minutes(seconds),
        legs: legs_with_fares,
        stop: itinerary.end,
        walk_distance: miles(meters)
      })
    )
    |> FarePasses.with_passes()
    |> FarePasses.with_free_legs_if_from_airport()
  end

  @spec parse(Schema.Leg.t()) :: Leg.t()
  def parse(%Schema.Leg{agency: agency} = leg) do
    agency_name = if(agency, do: agency.name)

    %Leg{
      from: place(leg.from),
      mode: mode(leg, agency_name),
      start: leg.start,
      stop: leg.end,
      to: place(leg.to),
      polyline: leg.leg_geometry.points,
      distance: miles(leg.distance),
      duration: minutes(leg.duration)
    }
  end

  @spec place(Schema.Place.t()) :: NamedPosition.t()
  def place(%Schema.Place{
        stop: stop,
        lon: longitude,
        lat: latitude,
        name: name
      }) do
    stop =
      if(match?(%Schema.Stop{}, stop),
        do: build_stop(stop, %{latitude: latitude, longitude: longitude})
      )

    %NamedPosition{
      stop: stop,
      name: name,
      latitude: latitude,
      longitude: longitude
    }
  end

  def mode(%Schema.Leg{distance: distance, mode: "WALK", steps: steps}, _) do
    %PersonalDetail{
      distance: miles(distance),
      steps: Enum.map(steps, &step/1)
    }
  end

  def mode(
        %Schema.Leg{
          intermediate_stops: stops,
          mode: mode,
          route: route,
          transit_leg: true,
          trip: trip
        },
        agency_name
      ) do
    %TransitDetail{
      mode: mode,
      intermediate_stops: Enum.map(stops, &build_stop/1),
      route: build_route(route, agency_name),
      trip_id: id_from_gtfs(trip.gtfs_id)
    }
  end

  def step(%Schema.Step{
        distance: distance,
        absolute_direction: absolute_direction,
        relative_direction: relative_direction,
        street_name: street_name
      }) do
    struct(PersonalDetail.Step, %{
      distance: miles(distance),
      street_name: street_name,
      absolute_direction:
        if(absolute_direction, do: String.downcase(absolute_direction) |> String.to_atom()),
      relative_direction:
        if(relative_direction, do: String.downcase(relative_direction) |> String.to_atom())
    })
  end

  defp build_route(
         %Schema.Route{
           gtfs_id: gtfs_id,
           short_name: short_name,
           long_name: long_name,
           type: type,
           color: color
         },
         agency_name
       ) do
    id = id_from_gtfs(gtfs_id)

    %Routes.Route{
      id: id,
      external_agency_name: if(agency_name !== "MBTA", do: agency_name),
      # Massport GTFS sometimes omits short_name
      name: short_name || id,
      long_name: route_name(agency_name, short_name, long_name),
      type: type,
      color: color
    }
  end

  defp route_name("Logan Express", _short_name, long_name), do: "#{long_name} Logan Express"

  defp route_name("Massport", short_name, long_name) do
    name = if long_name, do: long_name, else: short_name
    "Massport Shuttle #{name}"
  end

  defp route_name(_, short_name, long_name) do
    if long_name, do: long_name, else: short_name
  end

  defp build_stop(
         %Schema.Stop{
           gtfs_id: gtfs_id,
           name: name
         },
         attributes \\ %{}
       ) do
    %Stops.Stop{
      id: id_from_gtfs(gtfs_id),
      name: name
    }
    |> struct(attributes)
  end

  defp id_from_gtfs(gtfs_id) do
    case String.split(gtfs_id, ":") do
      [_, id] -> id
      _ -> nil
    end
  end

  defp miles(meters) do
    Float.ceil(meters / 1609.34, 1)
  end

  defp minutes(seconds) do
    minutes = Timex.Duration.to_minutes(seconds, :seconds)
    Kernel.max(1, Kernel.round(minutes))
  end
end