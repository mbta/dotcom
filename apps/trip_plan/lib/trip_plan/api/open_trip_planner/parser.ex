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

  @doc """
  Parse the JSON output from the plan endpoint.
  """
  @spec parse_json(binary) :: {:ok, [Itinerary.t()]} | {:error, TripPlan.Api.error()}
  def parse_json(json_binary) do
    with {:ok, json} <- Poison.decode(json_binary) do
      parse_map(json)
    end
  rescue
    e in FunctionClauseError ->
      _ =
        Logger.info(fn ->
          "#{__MODULE__} exception=FunctionClauseError function=#{e.function} json=#{json_binary}"
        end)

      {:error, :invalid_json}
  end

  @spec parse_map(map) :: {:ok, [Itinerary.t()]} | {:error, TripPlan.Api.error()}
  defp parse_map(%{"error" => %{"message" => error_message}, "requestParameters" => params}) do
    accessible? = params["wheelchair"] == "true"

    _ =
      Logger.info(fn ->
        "#{__MODULE__} trip_plan=error message=#{inspect(error_message)}"
      end)

    {:error, error_message_atom(error_message, accessible?: accessible?)}
  end

  defp parse_map(json) do
    _ =
      Logger.info(fn ->
        "#{__MODULE__} trip_plan=success count=#{Enum.count(json["plan"]["itineraries"])}"
      end)

    {:ok, Enum.map(json["plan"]["itineraries"], &parse_itinerary(&1, json["requestParameters"]))}
  end

  @doc "Test helper which matches off the :ok"
  def parse_json!(json_binary) do
    {:ok, itineraries} = parse_json(json_binary)
    itineraries
  end

  @spec error_message_atom(String.t(), Keyword.t()) :: TripPlan.Api.error()
  defp error_message_atom("OUTSIDE_BOUNDS", _opts), do: :outside_bounds
  defp error_message_atom("REQUEST_TIMEOUT", _opts), do: :timeout
  defp error_message_atom("NO_TRANSIT_TIMES", _opts), do: :no_transit_times
  defp error_message_atom("TOO_CLOSE", _opts), do: :too_close
  defp error_message_atom("PATH_NOT_FOUND", accessible?: true), do: :location_not_accessible
  defp error_message_atom("PATH_NOT_FOUND", accessible?: false), do: :path_not_found
  defp error_message_atom("LOCATION_NOT_ACCESSIBLE", _opts), do: :location_not_accessible
  defp error_message_atom(_, _opts), do: :unknown

  defp parse_itinerary(json, request_params) do
    %Itinerary{
      start: parse_time(json["startTime"]),
      stop: parse_time(json["endTime"]),
      legs: Enum.map(json["legs"], &parse_leg/1),
      accessible?: request_params["wheelchair"] == "true"
    }
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
      from: parse_named_position(json["from"], "stopId"),
      to: parse_named_position(json["to"], "stopId"),
      polyline: json["legGeometry"]["points"],
      name: json["route"],
      long_name: json["routeLongName"],
      type: json["agencyId"],
      url: json["agencyUrl"],
      description: json["mode"]
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
      route_id: id_after_colon(json["routeId"]),
      trip_id: id_after_colon(json["tripId"]),
      intermediate_stop_ids: Enum.map(json["intermediateStops"], &id_after_colon(&1["stopId"]))
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
        slightly_left
        left
        hard_left
        slightly_right
        right
        hard_right
        continue
        circle_clockwise
        circle_counterclockwise
        elevator
        uturn_left
        uturn_right)a do
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
      _ -> id
    end
  end
end
