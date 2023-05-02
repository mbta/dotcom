defmodule Schedules.Repo do
  @moduledoc "Repo for V3 API Schedule resources."
  import Kernel, except: [to_string: 1]
  use RepoCache, ttl: :timer.hours(1)

  alias Schedules.{HoursOfOperation, Parser, Schedule}
  alias Stops.Stop
  alias Routes.Route
  alias Util

  @type schedule_pair :: {Schedule.t(), Schedule.t()}

  @default_params [
    include: "trip,trip.occupancies",
    "fields[schedule]":
      "departure_time,arrival_time,drop_off_type,pickup_type,stop_sequence,timepoint",
    "fields[trip]": "name,headsign,direction_id,bikes_allowed"
  ]

  @spec by_route_ids([Route.id_t()], Keyword.t()) :: [Schedule.t()] | {:error, any}
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
  defp cache_condition(params, _), do: cache(params, &all_from_params/1)

  @spec schedule_for_trip(Schedules.Trip.id_t(), Keyword.t()) :: [Schedule.t()] | {:error, any}
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
    |> cache(&all_from_params/1)
    |> filter_by_min_time(Keyword.get(opts, :min_time))
    |> load_from_other_repos
  end

  @spec schedules_for_stop(Stop.id_t(), Keyword.t()) :: [Schedule.t()] | {:error, any}
  def schedules_for_stop(stop_id, opts) do
    @default_params
    |> Keyword.merge(opts |> Keyword.delete(:min_time))
    |> Keyword.put(:stop, stop_id)
    |> add_optional_param(opts, :trip)
    |> cache(&all_from_params/1)
    |> filter_by_min_time(Keyword.get(opts, :min_time))
    |> load_from_other_repos
  end

  @spec trip(String.t(), trip_by_id_fn) :: Schedules.Trip.t() | nil
        when trip_by_id_fn: (String.t() -> JsonApi.t() | {:error, any})
  def trip(trip_id, trip_by_id_fn \\ &V3Api.Trips.by_id/2)

  def trip("", _trip_fn) do
    # short circuit an known invalid trip ID
    nil
  end

  def trip(trip_id, trip_by_id_fn) do
    case cache(trip_id, &fetch_trip(&1, trip_by_id_fn)) do
      {:ok, value} -> value
      {:error, _} -> nil
    end
  end

  defp fetch_trip(trip_id, trip_by_id_fn) do
    trip_opts =
      case Util.config(:site, :enable_experimental_features) do
        "true" -> [include: "occupancies"]
        _ -> []
      end

    case trip_by_id_fn.(trip_id, trip_opts) do
      %JsonApi{} = response ->
        {:ok, Parser.trip(response)}

      {:error, [%JsonApi.Error{code: "not_found"} | _]} ->
        {:ok, nil}

      error ->
        error
    end
  end

  @spec end_of_rating() :: Date.t() | nil
  def end_of_rating(all_fn \\ &V3Api.Schedules.all/1) do
    case rating_dates(all_fn) do
      {_start_date, end_date} -> end_date
      :error -> nil
    end
  end

  @spec rating_dates() :: {Date.t(), Date.t()} | :error
  def rating_dates(all_fn \\ &V3Api.Schedules.all/1) do
    cache(all_fn, fn all_fn ->
      with {:error, [%{code: "no_service"} = error]} <- all_fn.(route: "Red", date: "1970-01-01"),
           {:ok, start_date} <- Date.from_iso8601(error.meta["start_date"]),
           {:ok, end_date} <- Date.from_iso8601(error.meta["end_date"]) do
        {start_date, end_date}
      else
        _ -> :error
      end
    end)
  end

  @spec hours_of_operation(
          Routes.Route.id_t() | [Routes.Route.id_t()],
          Date.t(),
          Routes.Route.gtfs_route_desc()
        ) ::
          HoursOfOperation.t()
  def hours_of_operation(route_id_or_ids, date, description) do
    {route_id_or_ids, date}
    |> cache(fn _ ->
      HoursOfOperation.hours_of_operation(route_id_or_ids, date, description)
    end)
    |> Util.error_default(%HoursOfOperation{})
  end

  @spec all_from_params(Keyword.t()) :: [Parser.record()] | {:error, any}
  defp all_from_params(params) do
    with %JsonApi{data: data} <- V3Api.Schedules.all(params) do
      data = Enum.filter(data, &valid?/1)
      insert_trips_into_cache(data)

      data
      |> Stream.map(&Parser.parse/1)
      |> Enum.filter(&has_trip?/1)
      |> Enum.sort_by(&DateTime.to_unix(elem(&1, 3)))
    end
  end

  def has_trip?({_, trip_id, _, _, _, _, _, _, _}) when is_nil(trip_id) do
    false
  end

  def has_trip?({_, _, _, _, _, _, _, _, _}) do
    true
  end

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
    |> Enum.map(&to_string/1)
    |> Enum.join(",")
  end

  defp to_string(int) when is_integer(int) do
    Integer.to_string(int)
  end

  @spec filter_by_min_time([Parser.record()] | {:error, any}, DateTime.t() | nil) ::
          [Parser.record()] | {:error, any}
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
                                %DateTime{} = schedule_time,
                                _flag?,
                                _early_departure?,
                                _last_stop?,
                                _stop_sequence,
                                _pickup_type
                              } ->
      Util.time_is_greater_or_equal?(schedule_time, min_time)
    end)
  end

  defp load_from_other_repos({:error, _} = error) do
    error
  end

  defp load_from_other_repos(schedules) do
    schedules
    |> Enum.map(fn {route_id, trip_id, stop_id, time, flag?, early_departure?, last_stop?,
                    stop_sequence, pickup_type} ->
      Task.async(fn ->
        %Schedules.Schedule{
          route: Routes.Repo.get(route_id),
          trip: trip(trip_id),
          stop: Stops.Repo.get_parent(stop_id),
          time: time,
          flag?: flag?,
          early_departure?: early_departure?,
          last_stop?: last_stop?,
          stop_sequence: stop_sequence,
          pickup_type: pickup_type
        }
      end)
    end)
    |> Enum.map(&Task.await/1)
  end

  # Fetching predictions will also insert trips into cache using this function
  # and that happens more frequently than fetching schedules due to realtime tracking
  @spec insert_trips_into_cache([JsonApi.Item.t()]) :: :ok
  def insert_trips_into_cache(data) do
    # Since we fetched all the trips along with the schedules, we can insert
    # them into the cache directly. That way, they'll be available when we
    # ask for them via trip/1.
    data
    |> Stream.map(&id_and_trip/1)
    |> Stream.uniq_by(&elem(&1, 0))
    |> Enum.each(fn {id, trip} ->
      ConCache.dirty_put(__MODULE__, {:trip, id}, {:ok, trip})
    end)
  end

  @spec id_and_trip(JsonApi.Item.t()) :: {Schedules.Trip.id_t(), Schedules.Trip.t() | nil}
  defp id_and_trip(%JsonApi.Item{} = item) do
    [%JsonApi.Item{id: trip_id} | _] = item.relationships["trip"]
    trip = Parser.trip(item)
    {trip_id, trip}
  end
end
