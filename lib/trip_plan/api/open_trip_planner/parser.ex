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

  @spec parse_ql(map()) :: {:ok, [Itinerary.t()]} | {:error, TripPlan.Api.error()}
  # A field error is an error raised during the execution of a particular field
  # which results in partial response data. This may occur due to an internal
  # error during value resolution or failure to coerce the resulting value.
  def parse_ql(%{"errors" => [_ | _] = errors, "data" => _}) do
    message = Enum.map_join(errors, ",", & &1["message"])

    Logger.warning(fn ->
      "#{__MODULE__} trip_plan=error message=#{message}"
    end)

    {:error, :graphql_field_error}
  end

  # A request error is an error raised during a request which results in no
  # response data. Typically raised before execution begins, a request error may
  # occur due to a parse grammar or validation error in the Document, an
  # inability to determine which operation to execute, or invalid input values
  # for variables.
  def parse_ql(%{"errors" => [_ | _] = errors}) do
    message = Enum.map_join(errors, ",", & &1["message"])

    Logger.warning(fn ->
      "#{__MODULE__} trip_plan=error message=#{message}"
    end)

    {:error, :graphql_request_error}
  end

  def parse_ql(%{"data" => %{"plan" => %{"routingErrors" => [head | _]}}}) do
    {:error, error_message_atom(head["code"])}
  end

  def parse_ql(%{"data" => %{"plan" => %{"itineraries" => itineraries}}}) do
    Logger.info(fn ->
      "#{__MODULE__} trip_plan=success count=#{Enum.count(itineraries)}"
    end)

    {:ok, Enum.map(itineraries, &parse_itinerary(&1))}
  end

  def parse_ql(_), do: {:error, :invalid}

  @spec error_message_atom(String.t()) :: TripPlan.Api.error()
  defp error_message_atom("OUTSIDE_BOUNDS"), do: :outside_bounds
  defp error_message_atom("REQUEST_TIMEOUT"), do: :timeout
  defp error_message_atom("NO_TRANSIT_TIMES"), do: :no_transit_times
  defp error_message_atom("TOO_CLOSE"), do: :too_close
  defp error_message_atom("PATH_NOT_FOUND"), do: :path_not_found
  defp error_message_atom("LOCATION_NOT_ACCESSIBLE"), do: :location_not_accessible
  defp error_message_atom("NO_STOPS_IN_RANGE"), do: :location_not_accessible
  defp error_message_atom(_), do: :unknown

  defp parse_itinerary(json) do
    score = json["accessibilityScore"]

    %Itinerary{
      start: parse_time(json["startTime"]),
      stop: parse_time(json["endTime"]),
      legs: Enum.map(json["legs"], &parse_leg/1),
      accessible?: if(score, do: score == 1.0)
    }
  end

  defp parse_time(ms_after_epoch) do
    {:ok, ms_after_epoch_dt} =
      ms_after_epoch
      |> DateTime.from_unix(:millisecond)

    Timex.to_datetime(ms_after_epoch_dt, OTP.config(:timezone))
  end

  defp parse_leg(json) do
    %Leg{
      start: parse_time(json["startTime"]),
      stop: parse_time(json["endTime"]),
      mode: parse_mode(json),
      from: parse_named_position(json["from"], "stop"),
      to: parse_named_position(json["to"], "stop"),
      polyline: json["legGeometry"]["points"],
      name: json["route"]["shortName"],
      long_name: json["route"]["longName"],
      type: if(agency = json["agency"], do: id_after_colon(agency["gtfsId"])),
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
