defmodule Dotcom.TripPlan.Parser do
  @moduledoc """
  Parse results from OpenTripPlanner:

  1. Convert all distances from meters, to miles.
  2. Convert all durations from seconds, to minutes.
  3. Add fare passes to each itinerary
  4. Add fare to each leg.
  5. For places, get more information for Stops and Routes if they're within the
     MBTA system.
  """

  alias Dotcom.TripPlan.{FarePasses, Itinerary, Leg, NamedPosition, PersonalDetail, TransitDetail}
  alias OpenTripPlannerClient.Schema

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @spec parse(Schema.Itinerary.t()) :: Itinerary.t()
  def parse(
        %Schema.Itinerary{
          accessibility_score: accessibility_score,
          duration: seconds,
          legs: legs,
          walk_distance: meters
        } = itinerary
      ) do
    legs_with_fares = Enum.map(legs, &parse/1)

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
      start: time(leg.start),
      stop: time(leg.end),
      to: place(leg.to),
      polyline: leg.leg_geometry.points,
      distance: miles(leg.distance),
      duration: minutes(leg.duration)
    }
    |> FarePasses.leg_with_fares()
  end

  defp time(%Schema.LegTime{estimated: nil, scheduled_time: time}), do: time
  defp time(%Schema.LegTime{estimated: %{time: time}}), do: time

  @spec place(Schema.Place.t()) :: NamedPosition.t()
  def place(%Schema.Place{
        stop: stop,
        lon: longitude,
        lat: latitude,
        name: name
      }) do
    stop =
      if(stop,
        do: build_stop(stop, %{latitude: latitude, longitude: longitude})
      )

    %NamedPosition{
      stop: stop,
      name: name,
      latitude: latitude,
      longitude: longitude
    }
  end

  def mode(%Schema.Leg{distance: distance, mode: :WALK, steps: steps}, _) do
    %PersonalDetail{
      distance: miles(distance),
      steps: steps
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

  defp build_route(
         %Schema.Route{
           gtfs_id: gtfs_id,
           short_name: short_name,
           long_name: long_name,
           type: type,
           color: color,
           desc: desc
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
      color: route_color(agency_name, short_name, color),
      description: Routes.Parser.parse_gtfs_desc(desc)
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

  defp route_color("Logan Express", "WO", _), do: "00954c"
  defp route_color("Logan Express", "BB", _), do: "f16823"
  defp route_color("Logan Express", "DV", _), do: "704c9f"
  defp route_color(_, _, color), do: color

  defp build_stop(stop, attributes \\ %{}) do
    case stop.gtfs_id do
      "mbta-ma-us:" <> gtfs_id ->
        @stops_repo.get(gtfs_id)
        |> struct(attributes)

      _ ->
        stop
        |> Map.from_struct()
        |> Map.merge(attributes)
        |> then(&struct(Stops.Stop, &1))
    end
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
