defmodule Schedules.RepoCondensed do
  @moduledoc """
  An alternate way to fetch schedules that is more light weight and easier to cache.

  This uses a longer than usual timeout for initial caching as sometime (especially in dev)
  it may take a long time to warm the cache.
  """

  use Nebulex.Caching.Decorators

  import Kernel, except: [to_string: 1]

  alias Schedules.{Parser, Repo, ScheduleCondensed}

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]
  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.hours(1)

  # the long timeout is to address a worst-case scenario of cold schedule cache
  @long_timeout 15_000

  @default_params [
    include: "trip,trip.occupancies",
    "fields[schedule]":
      "departure_time,arrival_time,drop_off_type,pickup_type,stop_sequence,stop_headsign,timepoint",
    "fields[trip]": "name,headsign,direction_id,bikes_allowed"
  ]

  @behaviour Schedules.RepoCondensed.Behaviour

  @impl Schedules.RepoCondensed.Behaviour
  def by_route_ids(route_ids, opts \\ []) when is_list(route_ids) do
    opts = Keyword.put_new(opts, :date, Util.service_date())

    @default_params
    |> Keyword.put(:route, Enum.join(route_ids, ","))
    |> Keyword.put(:date, opts |> Keyword.fetch!(:date) |> to_string())
    |> add_optional_param(opts, :direction_id)
    |> add_optional_param(opts, :stop_sequences, :stop_sequence)
    |> add_optional_param(opts, :stop_ids, :stop)
    |> all_from_params()
    |> filter_by_min_time(Keyword.get(opts, :min_time))
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  defp all_from_params(params) do
    with %JsonApi{data: data} <- MBTA.Api.Schedules.all(params) do
      data = Enum.filter(data, &valid?/1)
      Repo.insert_trips_into_cache(data)

      data
      |> Stream.map(&Parser.parse/1)
      |> Stream.filter(&has_trip?/1)
      |> Task.async_stream(
        fn {_, trip_id, stop_id, _, _, time, _, _, _, stop_sequence, _, _} ->
          trip = Repo.trip(trip_id)
          stop = @stops_repo.get!(stop_id)

          %ScheduleCondensed{
            time: time,
            trip_id: trip_id,
            headsign: trip.headsign,
            route_pattern_id: trip.route_pattern_id,
            stop_id: stop.parent_id || stop.id,
            train_number: trip.name,
            stop_sequence: stop_sequence
          }
        end,
        timeout: @long_timeout
      )
      |> Stream.filter(&match?({:ok, _}, &1))
      |> Stream.map(fn {:ok, result} -> result end)
      |> Enum.to_list()
    end
  end

  defp has_trip?({_, trip_id, _, _, _, _, _, _, _, _, _, _}) when is_nil(trip_id) do
    false
  end

  defp has_trip?(_), do: true

  defp valid?(%JsonApi.Item{relationships: %{"trip" => [%JsonApi.Item{id: id} | _]}})
       when not is_nil(id) do
    true
  end

  defp valid?(_) do
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

  @spec filter_by_min_time([ScheduleCondensed.t()] | {:error, any}, DateTime.t() | nil) ::
          [ScheduleCondensed.t()] | {:error, any}

  defp filter_by_min_time(schedules, %DateTime{} = min_time) when is_list(schedules) do
    Enum.filter(schedules, fn schedule ->
      Util.time_is_greater_or_equal?(schedule.time, min_time)
    end)
  end

  defp filter_by_min_time(schedules, _), do: schedules
end
