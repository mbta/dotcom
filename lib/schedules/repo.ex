defmodule Schedules.Repo do
  @moduledoc """
  Repo for V3 API Schedule resources.
  """

  use Nebulex.Caching.Decorators

  require Logger

  import Kernel, except: [to_string: 1]

  alias Dotcom.Cache.KeyGenerator
  alias MBTA.Api.Trips
  alias Routes.Route
  alias Schedules.{Parser, Repo.Behaviour, Schedule}
  alias Util

  @behaviour Behaviour

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.hours(1)

  @type schedule_pair :: {Schedule.t(), Schedule.t()}

  @default_params [
    include: "trip,trip.occupancies",
    "fields[schedule]":
      "departure_time,arrival_time,drop_off_type,pickup_type,stop_sequence,stop_headsign,timepoint",
    "fields[trip]": "name,headsign,direction_id,bikes_allowed"
  ]

  def by_route_ids(route_ids, opts \\ []) when is_list(route_ids) do
    opts = Keyword.put_new(opts, :date, Util.service_date())
    no_cache = Keyword.get(opts, :no_cache)

    @default_params
    |> Keyword.put(:route, Enum.join(route_ids, ","))
    |> Keyword.put(:date, Keyword.fetch!(opts, :date) |> to_string())
    |> add_optional_param(opts, :direction_id)
    |> add_optional_param(opts, :stop_sequences, :stop_sequence)
    |> add_optional_param(opts, :stop_ids, :stop)
    |> cache_condition(no_cache)
    |> filter_by_min_time(Keyword.get(opts, :min_time))
    |> load_from_other_repos
  end

  # Will almost always use cache, unless the calling function explicitly passes "no_cache"
  defp cache_condition(params, true), do: all_from_params(params)
  defp cache_condition(params, _), do: cache_all_from_params(params)

  @impl Behaviour
  def schedule_for_trip(trip_id, opts \\ [])

  def schedule_for_trip("", _) do
    # shortcut a known invalid trip ID
    []
  end

  def schedule_for_trip(trip_id, opts) do
    @default_params
    |> Keyword.merge(opts |> Keyword.delete(:min_time))
    |> Keyword.put(:trip, trip_id)
    |> Keyword.put_new_lazy(:date, &Util.service_date/0)
    |> cache_all_from_params()
    |> filter_by_min_time(Keyword.get(opts, :min_time))
    |> load_from_other_repos
  end

  def schedules_for_stop(stop_id, opts) do
    @default_params
    |> Keyword.merge(opts |> Keyword.delete(:min_time))
    |> Keyword.put(:stop, stop_id)
    |> add_optional_param(opts, :trip)
    |> cache_all_from_params()
    |> filter_by_min_time(Keyword.get(opts, :min_time))
    |> load_from_other_repos
  end

  @impl Behaviour
  def trip(trip_id, trip_by_id_fn \\ &Trips.by_id/2)

  def trip("", _trip_fn) do
    # short circuit an known invalid trip ID
    nil
  end

  def trip(trip_id, trip_by_id_fn) do
    case fetch_trip(trip_id, trip_by_id_fn) do
      {:ok, value} ->
        value

      {:error, error} ->
        Logger.error("fetch_trip for ID #{trip_id}: #{inspect(error)}")

        nil
    end
  end

  @impl Behaviour
  def end_of_rating() do
    Map.get(current_rating(), :end_date)
  end

  @impl Behaviour
  def start_of_rating() do
    Map.get(current_rating(), :start_date)
  end

  @doc """
  Returns the current rating as a map.
  If there are any errors in fetching or processing, the dates are given as `nil`.
  """
  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def current_rating() do
    case MBTA.Api.Status.status() do
      {:error, _} -> %{end_date: nil, start_date: nil}
      rating -> process_rating(rating)
    end
  end

  # Process the current rating JSON to return a map with start and end dates.
  # Defaults to returning `nil` if the date is not present or can't be parsed.
  defp process_rating(rating) do
    rating
    |> Map.get(:data, [%{}])
    |> List.first()
    |> Map.get(:attributes, %{})
    |> Map.get("feed", %{})
    |> Map.take(["end_date", "start_date"])
    |> Enum.map(&verify_dates/1)
    |> Map.new()
  end

  # Verifies the dates can be parsed.
  # If they can, the key is returned as an atom along with the parsed date.
  # If they can't, `nil` is returned so that the field gets dropped.
  defp verify_dates({k, v}) do
    case Date.from_iso8601(v) do
      {:ok, date} -> {String.to_atom(k), date}
      _ -> nil
    end
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  defp fetch_trip(trip_id, trip_by_id_fn) do
    trip_opts =
      case Util.config(:dotcom, :enable_experimental_features) do
        "true" -> [include: "occupancies"]
        _ -> []
      end

    case trip_by_id_fn.(trip_id, trip_opts) do
      %JsonApi{} = response ->
        {:ok, Parser.trip(response)}

      error ->
        error
    end
  end

  defp all_from_params(params) do
    with %JsonApi{data: data} <- MBTA.Api.Schedules.all(params) do
      data = Enum.filter(data, &valid?/1)
      insert_trips_into_cache(data)

      data
      |> Stream.map(&Parser.parse/1)
      |> Enum.filter(&has_trip?/1)
      |> Enum.sort_by(&date_sorter/1)
    end
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  defp cache_all_from_params(params) do
    all_from_params(params)
  end

  def has_trip?({_, trip_id, _, _, _, _, _, _, _, _, _, _}) when is_nil(trip_id) do
    false
  end

  def has_trip?(_), do: true

  defp date_sorter({_, _, _, _, _, %DateTime{} = time, _, _, _, _, _, _}) do
    DateTime.to_unix(time)
  end

  defp date_sorter(_), do: 0

  def valid?(%JsonApi.Item{relationships: %{"trip" => [%JsonApi.Item{id: id} | _]}})
      when not is_nil(id) do
    true
  end

  def valid?(_) do
    false
  end

  defp add_optional_param(params, opts, key, param_name \\ nil) do
    param_name = param_name || key

    case Keyword.fetch(opts, key) do
      {:ok, value} ->
        Keyword.put(params, param_name, to_string(value))

      :error ->
        params
    end
  end

  defp to_string(%Date{} = date) do
    Util.convert_to_iso_format(date)
  end

  defp to_string(str) when is_binary(str) do
    str
  end

  defp to_string(atom) when is_atom(atom) do
    Atom.to_string(atom)
  end

  defp to_string(list) when is_list(list) do
    list
    |> Enum.map_join(",", &to_string/1)
  end

  defp to_string(int) when is_integer(int) do
    Integer.to_string(int)
  end

  defp filter_by_min_time({:error, error}, _) do
    {:error, error}
  end

  defp filter_by_min_time(schedules, nil) do
    schedules
  end

  defp filter_by_min_time(schedules, %DateTime{} = min_time) do
    Enum.filter(schedules, fn {
                                _route_id,
                                _trip_id,
                                _stop_id,
                                _arrival_time,
                                _departure_time,
                                %DateTime{} = schedule_time,
                                _flag?,
                                _early_departure?,
                                _last_stop?,
                                _stop_sequence,
                                _stop_headsign,
                                _pickup_type
                              } ->
      Util.time_is_greater_or_equal?(schedule_time, min_time)
    end)
  end

  defp load_from_other_repos({:error, reason} = error) do
    Logger.error("load_from_other_repos: #{inspect(reason)}")

    error
  end

  defp load_from_other_repos(schedules) do
    schedules
    |> Enum.map(fn {route_id, trip_id, stop_id, arrival_time, departure_time, time, flag?,
                    early_departure?, last_stop?, stop_sequence, stop_headsign, pickup_type} ->
      %Schedules.Schedule{
        route: @routes_repo.get(route_id),
        trip: trip(trip_id),
        platform_stop_id: stop_id,
        stop: @stops_repo.get_parent(stop_id),
        arrival_time: arrival_time,
        departure_time: departure_time,
        time: time,
        flag?: flag?,
        early_departure?: early_departure?,
        last_stop?: last_stop?,
        stop_sequence: stop_sequence,
        stop_headsign: stop_headsign,
        pickup_type: pickup_type
      }
    end)
  end

  # Fetching predictions will also insert trips into cache using this function
  # and that happens more frequently than fetching schedules due to realtime tracking
  def insert_trips_into_cache(data) do
    # Since we fetched all the trips along with the schedules, we can insert
    # them into the cache directly. That way, they'll be available when we
    # ask for them via trip/1.
    data
    |> Stream.map(&id_and_trip/1)
    |> Stream.uniq_by(&elem(&1, 0))
    |> Enum.each(fn {id, trip} ->
      key =
        KeyGenerator.generate(__MODULE__, :fetch_trip, [id, &Trips.by_id/2])

      @cache.put(key, {:ok, trip}, ttl: @ttl)
    end)
  end

  defp id_and_trip(%JsonApi.Item{} = item) do
    [%JsonApi.Item{id: trip_id} | _] = item.relationships["trip"]
    trip = Parser.trip(item)
    {trip_id, trip}
  end
end
