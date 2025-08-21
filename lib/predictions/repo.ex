defmodule Predictions.Repo do
  @moduledoc """
  Predictions repo module
  """

  require Logger
  require Routes.Route

  alias Predictions.Parser
  alias Routes.Route
  alias Stops.Stop

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @default_params [
    "fields[prediction]":
      "status,departure_time,arrival_time,direction_id,schedule_relationship,stop_sequence",
    "fields[trip]": "direction_id,headsign,name,bikes_allowed",
    "fields[stop]": "platform_code",
    include: "trip,trip.occupancies,stop"
  ]

  def all(opts) when is_list(opts) and opts != [] do
    _ = Logger.info("predictions_repo_all_cache=call")

    opts
    |> add_all_optional_params()
    |> cache_fetch()
    |> filter_predictions(Keyword.get(opts, :min_time))
    |> load_from_other_repos
  end

  def all_no_cache(opts) when is_list(opts) and opts != [] do
    opts
    |> add_all_optional_params()
    |> fetch()
    |> filter_predictions()
    |> load_from_other_repos
  end

  defp add_all_optional_params(opts) do
    @default_params
    |> add_optional_param(opts, :route)
    |> add_optional_param(opts, :stop)
    |> add_optional_param(opts, :direction_id)
    |> add_optional_param(opts, :trip)
    |> add_optional_param(opts, :route_pattern)
    |> add_optional_param(opts, :"page[limit]")
    |> add_optional_param(opts, :sort)
  end

  defp add_optional_param(params, opts, key) do
    case Keyword.get(opts, key) do
      nil -> params
      value -> Keyword.put(params, key, value)
    end
  end

  defp filter_predictions(predictions, min_time \\ nil)

  defp filter_predictions({:error, error}, _) do
    {:error, error}
  end

  defp filter_predictions(predictions, min_time) do
    Enum.filter(predictions, fn prediction ->
      has_departure_time?(prediction) && after_min_time?(prediction, min_time)
    end)
  end

  defp fetch(params) do
    _ = Logger.info("predictions_repo_all_cache=cache_miss")

    case MBTA.Api.Predictions.all(params) do
      {:error, error} ->
        warn_error(params, error)

      %JsonApi{data: data} ->
        cache_trips(data)
        Enum.flat_map(data, &parse/1)
    end
  end

  defp cache_fetch(opts) do
    fetch(opts)
  end

  defp cache_trips(data) do
    data
    |> Enum.filter(&has_trip?/1)
    |> Schedules.Repo.insert_trips_into_cache()
  end

  def has_trip?(%JsonApi.Item{relationships: %{"trip" => [%JsonApi.Item{id: id} | _]}})
      when not is_nil(id) do
    true
  end

  def has_trip?(%JsonApi.Item{}) do
    false
  end

  defp parse(item) do
    try do
      [Parser.parse(item)]
    rescue
      e -> warn_error(item, e)
    end
  end

  defp warn_error(item, e) do
    _ = Logger.warning("error during Prediction (#{inspect(item)}): #{inspect(e)}")
    []
  end

  defp has_departure_time?(
         {_id, _trip_id, _stop_id, _route_id, _direction_id, _arrival, departure, _time,
          _stop_sequence, _schedule_relationship, _track, _status, _departing?,
          _vehicle_id} = _prediction
       ) do
    departure != nil
  end

  defp has_departure_time?(_), do: false

  defp after_min_time?(_, nil), do: true

  defp after_min_time?(
         {
           _id,
           _trip_id,
           _stop_id,
           _route_id,
           _direction_id,
           _arrival_time,
           _departure_time,
           nil,
           _stop_sequence,
           _schedule_relationship,
           _track,
           _status,
           _departing?,
           _vehicle_id
         },
         %DateTime{}
       ) do
    false
  end

  defp after_min_time?(
         {
           _id,
           _trip_id,
           _stop_id,
           _route_id,
           _direction_id,
           _arrival_time,
           _departure_time,
           %DateTime{} = prediction_time,
           _stop_sequence,
           _schedule_relationship,
           _track,
           _status,
           _departing?,
           _vehicle_id
         },
         min_time
       ) do
    Util.time_is_greater_or_equal?(prediction_time, min_time)
  end

  def load_from_other_repos([]) do
    []
  end

  def load_from_other_repos(predictions) do
    predictions
    |> Task.async_stream(&record_to_structs/1)
    |> Enum.flat_map(fn {:ok, prediction} -> prediction end)
  end

  defp record_to_structs({_, _, nil, _, _, _, _, _, _, _, _, _, _, _}) do
    # no stop ID
    []
  end

  defp record_to_structs({_, _, <<stop_id::binary>>, _, _, _, _, _, _, _, _, _, _, _} = record) do
    stop_id
    |> @stops_repo.get_parent()
    |> do_record_to_structs(record)
    |> discard_if_subway_past_prediction()
  end

  defp do_record_to_structs(
         nil,
         {_, _, <<stop_id::binary>>, _, _, _, _, _, _, _, _, _, _, _} = record
       ) do
    :ok =
      Logger.error(
        "Discarding prediction because stop #{inspect(stop_id)} does not exist. Prediction: #{inspect(record)}"
      )

    []
  end

  defp do_record_to_structs(
         %Stop{} = stop,
         {id, trip_id, platform_stop_id, route_id, direction_id, arrival_time, departure_time,
          time, stop_sequence, schedule_relationship, track, status, departing?, vehicle_id}
       ) do
    trip =
      if trip_id do
        Schedules.Repo.trip(trip_id)
      end

    route = @routes_repo.get(route_id)

    [
      %Predictions.Prediction{
        id: id,
        trip: trip,
        stop: stop,
        platform_stop_id: platform_stop_id,
        route: route,
        direction_id: direction_id,
        arrival_time: arrival_time,
        departure_time: departure_time,
        time: time,
        stop_sequence: stop_sequence,
        schedule_relationship: schedule_relationship,
        track: track,
        status: status,
        departing?: departing?,
        vehicle_id: vehicle_id
      }
    ]
  end

  defp discard_if_subway_past_prediction([]) do
    []
  end

  defp discard_if_subway_past_prediction([prediction]) do
    # For subway, drop predictions if the predicted time is earlier than the current time:
    prediction_in_the_past =
      if prediction.time == nil do
        false
      else
        !Util.time_is_greater_or_equal?(
          Util.to_local_time(prediction.time),
          Util.to_local_time(Util.now())
        )
      end

    if prediction.route == nil do
      []
    else
      if Route.subway?(prediction.route.type, prediction.route.id) && prediction_in_the_past do
        []
      else
        [prediction]
      end
    end
  end
end
