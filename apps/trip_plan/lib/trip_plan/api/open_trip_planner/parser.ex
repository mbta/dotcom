defmodule TripPlan.Api.OpenTripPlanner.Parser do
  @moduledoc "Module for parsing the itinerary-related data from Open Trip Planner"
  require Logger
  alias TripPlan.Api.OpenTripPlanner, as: OTP

  alias TripPlan.{
    Itinerary,
    Leg,
    NamedPosition,
    PersonalDetail,
    PersonalDetail.Step,
    TransitDetail
  }

  @transit_modes ~w(SUBWAY TRAM BUS RAIL FERRY)s

  @spec parse_ql(map(), boolean()) :: {:ok, [Itinerary.t()]} | {:error, TripPlan.Api.error()}
  def parse_ql(%{"data" => %{"plan" => nil}, "errors" => [head | _]}, _accessible?) do
    _ =
      Logger.warn(fn ->
        "#{__MODULE__} trip_plan=error message=#{inspect(head["message"])}"
      end)

    {:error, :unknown}
  end

  def parse_ql(%{"data" => data}, accessible?) do
    parse_map(data, accessible?)
  end

  @spec parse_map(map(), boolean()) :: {:ok, [Itinerary.t()]} | {:error, TripPlan.Api.error()}
  defp parse_map(%{"plan" => %{"routingErrors" => [head | _]}}, accessible?) do
    _ =
      Logger.warn(fn ->
        "#{__MODULE__} trip_plan=error message=#{inspect(head["code"])}"
      end)

    {:error, error_message_atom(head["code"], accessible?: accessible?)}
  end

  defp parse_map(json, _) do
    _ =
      Logger.info(fn ->
        "#{__MODULE__} trip_plan=success count=#{Enum.count(json["plan"]["itineraries"])}"
      end)

    {:ok, Enum.map(json["plan"]["itineraries"], &parse_itinerary(&1))}
  end

  @doc "Test helper which matches off the :ok"
  def parse_json(json_binary, accessible? \\ false) do
    with {:ok, json} <- Poison.decode(json_binary) do
      parse_map(json, accessible?)
    end
  rescue
    _e in FunctionClauseError ->
      {:error, :invalid_json}
  end

  @spec error_message_atom(String.t(), Keyword.t()) :: TripPlan.Api.error()
  defp error_message_atom("OUTSIDE_BOUNDS", _opts), do: :outside_bounds
  defp error_message_atom("REQUEST_TIMEOUT", _opts), do: :timeout
  defp error_message_atom("NO_TRANSIT_TIMES", _opts), do: :no_transit_times
  defp error_message_atom("TOO_CLOSE", _opts), do: :too_close
  defp error_message_atom("PATH_NOT_FOUND", accessible?: true), do: :location_not_accessible
  defp error_message_atom("PATH_NOT_FOUND", accessible?: false), do: :path_not_found
  defp error_message_atom("LOCATION_NOT_ACCESSIBLE", _opts), do: :location_not_accessible
  defp error_message_atom("NO_STOPS_IN_RANGE", _opts), do: :location_not_accessible
  defp error_message_atom(_, _opts), do: :unknown

  defp parse_itinerary(json) do
    %Itinerary{
      start: parse_time(json["startTime"]),
      stop: parse_time(json["endTime"]),
      legs: Enum.map(json["legs"], &parse_leg/1),
      accessible?: parse_float(json["accessibilityScore"]) == 1.0
    }
  end

  defp parse_float(fl) when is_float(fl), do: fl

  defp parse_float(nil), do: 0.0

  defp parse_float(str) do
    result = Float.parse(str)

    case result do
      :error -> 0.0
      _ -> result
    end
  end

  defp parse_time(ms_after_epoch) do
    {:ok, ms_after_epoch_dt} =
      ms_after_epoch
      |> Integer.floor_div(1000)
      |> FastLocalDatetime.unix_to_datetime(OTP.config(:timezone))

    ms_after_epoch_dt
  end

  defp parse_leg(json) do
    %Leg{
      start: parse_time(json["startTime"]),
      stop: parse_time(json["endTime"]),
      mode: parse_mode(json),
      from: parse_named_position(json["from"], "stop"),
      to: parse_named_position(json["to"], "stop"),
      polyline: json["legGeometry"]["points"],
      name: json["route"],
      long_name: json["routeLongName"],
      type: json["agencyId"],
      url: json["agencyUrl"],
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

  def parse_named_position(json, id_field) do
    %NamedPosition{
      name: json["name"],
      stop_id: if(id_str = json[id_field], do: id_after_colon(id_str)),
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
