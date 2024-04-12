defmodule TripPlan.Api.OpenTripPlanner do
  @moduledoc "Fetches data from the OpenTripPlanner API."
  alias TripPlan.{
    Itinerary,
    Leg,
    NamedPosition,
    PersonalDetail,
    PersonalDetail.Step,
    TransitDetail
  }

  @transit_modes ~w(SUBWAY TRAM BUS RAIL FERRY)s

  def plan(%NamedPosition{} = from, %NamedPosition{} = to, opts) do
    plan(NamedPosition.to_keywords(from), NamedPosition.to_keywords(to), opts)
  end

  def plan(from, to, opts) do
    otp_impl().plan(from, to, opts)
    |> parse()
  end

  defp otp_impl, do: Application.get_env(:dotcom, :trip_planner, OpenTripPlannerClient)

  defp parse({:error, _} = error), do: error

  defp parse({:ok, itineraries}) do
    {:ok, Enum.map(itineraries, &parse_itinerary/1)}
  end

  defp parse_itinerary(json) do
    score = json["accessibilityScore"]

    %Itinerary{
      start: parse_time(json["start"]),
      stop: parse_time(json["end"]),
      legs: Enum.map(json["legs"], &parse_leg/1),
      accessible?: if(score, do: score == 1.0),
      tag: json["tag"]
    }
  end

  defp parse_time(iso8601_formatted_datetime) do
    Timex.parse!(iso8601_formatted_datetime, "{ISO:Extended}")
  end

  defp parse_leg(json) do
    estimated_or_scheduled = fn key ->
      if json[key]["estimated"] do
        json[key]["estimated"]["time"]
      else
        json[key]["scheduledTime"]
      end
    end

    %Leg{
      start: parse_time(estimated_or_scheduled.("start")),
      stop: parse_time(estimated_or_scheduled.("end")),
      mode: parse_mode(json),
      from: parse_named_position(json["from"], "stop"),
      to: parse_named_position(json["to"], "stop"),
      polyline: json["legGeometry"]["points"],
      name: json["route"]["shortName"],
      long_name: json["route"]["longName"],
      type: json["agency"]["name"],
      url: json["agency"]["url"],
      description: json["mode"]
    }
  end

  def parse_named_position(json, "stop") do
    stop = json["stop"]

    %NamedPosition{
      name: json["name"],
      stop_id: if(stop, do: id_after_colon(stop["gtfsId"])),
      longitude: json["lon"],
      latitude: json["lat"]
    }
  end

  defp parse_mode(%{"mode" => "WALK"} = json) do
    %PersonalDetail{
      distance: json["distance"],
      steps: Enum.map(json["steps"], &parse_step/1)
    }
  end

  defp parse_mode(%{"mode" => mode} = json) when mode in @transit_modes do
    %TransitDetail{
      route_id: id_after_colon(json["route"]["gtfsId"]),
      trip_id: id_after_colon(json["trip"]["gtfsId"]),
      intermediate_stop_ids: Enum.map(json["intermediateStops"], &id_after_colon(&1["gtfsId"]))
    }
  end

  defp parse_step(json) do
    %Step{
      distance: json["distance"],
      relative_direction: parse_relative_direction(json["relativeDirection"]),
      absolute_direction: parse_absolute_direction(json["absoluteDirection"]),
      street_name: json["streetName"]
    }
  end

  # http://dev.opentripplanner.org/apidoc/1.0.0/json_RelativeDirection.html
  for dir <- ~w(
        depart
        hard_left
        left
        slightly_left
        continue
        slightly_right
        right
        hard_right
        circle_clockwise
        circle_counterclockwise
        elevator
        uturn_left
        uturn_right
        enter_station
        exit_station
        follow_signs)a do
    defp parse_relative_direction(unquote(String.upcase(Atom.to_string(dir)))), do: unquote(dir)
  end

  # http://dev.opentripplanner.org/apidoc/1.0.0/json_AbsoluteDirection.html
  for dir <- ~w(north northeast east southeast south southwest west northwest)a do
    defp parse_absolute_direction(unquote(String.upcase(Atom.to_string(dir)))), do: unquote(dir)
  end

  defp parse_absolute_direction(nil), do: nil

  defp id_after_colon(feed_colon_id) do
    [feed, id] = String.split(feed_colon_id, ":", parts: 2)

    # feed id is either mbta-ma-us (MBTA) or 22722274 (Massport), if it's neither, assume it's MBTA
    case feed do
      "mbta-ma-us" -> id
      "22722274" -> "Massport-" <> id
      "2272_2274" -> "Massport-" <> id
      _ -> id
    end
  end
end
