defmodule Predictions.Repo do
  @moduledoc "Predictions repo module"

  use RepoCache, ttl: :timer.seconds(10), ttl_check: :timer.seconds(2)
  require Logger
  require Routes.Route
  alias Routes.Route
  alias Predictions.Parser
  alias Stops.Stop

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
    |> cache(&fetch/1)
    |> filter_by_min_time(Keyword.get(opts, :min_time))
    |> load_from_other_repos
  end

  def all_no_cache(opts) when is_list(opts) and opts != [] do
    opts
    |> add_all_optional_params()
    |> fetch()
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

  defp fetch(params) do
    _ = Logger.info("predictions_repo_all_cache=cache_miss")

    case V3Api.Predictions.all(params) do
      {:error, error} ->
        warn_error(params, error)

      %JsonApi{data: data} ->
        cache_trips(data)
        Enum.flat_map(data, &parse/1)
    end
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
    _ = Logger.warn("error during Prediction (#{inspect(item)}): #{inspect(e)}")
    []
  end

  @spec filter_by_min_time([Parser.record()] | {:error, any}, DateTime.t() | nil) ::
          [Parser.record()] | {:error, any}
  defp filter_by_min_time({:error, error}, _) do
    {:error, error}
  end

  defp filter_by_min_time(predictions, nil) do
    predictions
  end

  defp filter_by_min_time(predictions, %DateTime{} = min_time) do
    Enum.filter(predictions, &after_min_time?(&1, min_time))
  end

  defp after_min_time?(
         {
           _id,
           _trip_id,
           _stop_id,
           _route_id,
           _direction_id,
           nil,
           _stop_sequence,
           _schedule_relationship,
           _track,
           _status,
           _departing?
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
           %DateTime{} = prediction_time,
           _stop_sequence,
           _schedule_relationship,
           _track,
           _status,
           _departing?
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

  defp record_to_structs({_, _, nil, _, _, _, _, _, _, _, _}) do
    # no stop ID
    []
  end

  defp record_to_structs({_, _, <<stop_id::binary>>, _, _, _, _, _, _, _, _} = record) do
    stop_id
    |> Stops.Repo.get_parent()
    |> do_record_to_structs(record)
    |> discard_if_subway_past_prediction()
  end

  defp do_record_to_structs(nil, {_, _, <<stop_id::binary>>, _, _, _, _, _, _, _, _} = record) do
    :ok =
      Logger.error(
        "Discarding prediction because stop #{inspect(stop_id)} does not exist. Prediction: #{inspect(record)}"
      )

    []
  end

  defp do_record_to_structs(
         %Stop{} = stop,
         {id, trip_id, raw_stop_id, route_id, direction_id, time, stop_sequence,
          schedule_relationship, track, status, departing?}
       ) do
    trip =
      if trip_id do
        Schedules.Repo.trip(trip_id)
      end

    route = Routes.Repo.get(route_id)

    [
      %Predictions.Prediction{
        id: id,
        trip: trip,
        stop: stop,
        raw_stop_id: raw_stop_id,
        route: route,
        direction_id: direction_id,
        time: time,
        stop_sequence: stop_sequence,
        schedule_relationship: schedule_relationship,
        track: track,
        status: status,
        departing?: departing?
      }
    ]
  end

  @spec discard_if_subway_past_prediction([Predictions.Prediction.t()] | []) ::
          [Predictions.Prediction.t()] | []
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
      route = Routes.Repo.get(prediction.route.id)

      if Route.subway?(route.type, prediction.route.id) && prediction_in_the_past do
        []
      else
        [prediction]
      end
    end
  end
end
