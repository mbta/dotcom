defmodule Schedules.HoursOfOperation do
  @moduledoc false

  use Nebulex.Caching.Decorators

  import Kernel, except: [to_string: 1]

  alias Schedules.Departures
  alias Services.Service

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.hours(1)

  @type departure :: Departures.t() | :no_service
  @type t :: %__MODULE__{
          week: {departure, departure},
          saturday: {departure, departure},
          sunday: {departure, departure},
          special_service: %{String.t() => {departure, departure}}
        }
  @derive [Poison.Encoder]
  defstruct week: {:no_service, :no_service},
            saturday: {:no_service, :no_service},
            sunday: {:no_service, :no_service},
            special_service: %{}

  @doc """
  Fetches the hours of operation for a given route.

  The hours of operation are broken into four date ranges:

  * week
  * saturday
  * sunday
  * special service

  It's possible for one or more of the ranges to be :no_service, if the route
  does not run on that day.
  """
  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  @spec hours_of_operation(
          Routes.Route.id_t() | [Routes.Route.id_t()],
          Date.t(),
          Routes.Route.gtfs_route_desc()
        ) ::
          t | {:error, any}
  def hours_of_operation(route_id_or_ids, date \\ Util.service_date(), description) do
    route_id_or_ids
    |> hours_of_operation_call(date, description, &departure_overall/3)
    |> Util.error_default(%__MODULE__{})
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  @spec hours_of_operation_by_stop(
          Routes.Route.id_t() | [Routes.Route.id_t()],
          Date.t(),
          Routes.Route.gtfs_route_desc()
        ) ::
          t | {:error, any}
  def hours_of_operation_by_stop(route_id_or_ids, date \\ Util.service_date(), description) do
    route_id_or_ids
    |> hours_of_operation_call(date, description, &departure/3)
    |> Util.error_default(%__MODULE__{})
  end

  def hours_of_operation_call(route_id_or_ids, date, description, departure_fn) do
    route_id_list = List.wrap(route_id_or_ids)

    special_service_dates = Enum.flat_map(route_id_list, &Service.special_service_dates(&1))
    params = api_params(route_id_list, date, special_service_dates, description)

    params
    |> Task.async_stream(&MBTA.Api.Schedules.all/1, on_timeout: :kill_task)
    # 3 dates * 2 directions == 6 responses per route
    # 2 directions for each special service day = 2 * n
    # Every 6 + (2 * n) responses is a single route
    # Calling Enum here makes the code wait for a response, as it is not an async function.
    |> Enum.chunk_every(6 + 2 * Kernel.length(special_service_dates))
    |> Enum.map(&parse_responses(&1, description, params, departure_fn))
    |> join_hours(description)
  end

  @doc """
  For a list of route IDs and a date, returns the API queries we'll need to run.

  For a given route, there are 6 + (2 * n) possible queries (n being the number of special service days):

  * weekday, direction 0
  * weekday, direction 1
  * saturday, direction 0,
  * saturday, direction 1,
  * sunday, direction 0,
  * sunday, direction 1,
  * special_service_1, direction 0,
  * special_service_1, direction 1,
  * special_service_2, direction 0,
  * ...
  """
  @spec api_params([Routes.Route.id_t()], Date.t(), [Date.t()], atom()) ::
          Keyword.t()
  def api_params(route_ids, today, special_service_dates, description) do
    # This does some fancy math so its week_0, week_1, saturday_0, saturday_1
    # Basically this order defines how we need to parse the data futher on
    for route_id <- route_ids,
        date <- Enum.concat(week_dates(today, special_service_dates), special_service_dates),
        direction_id <- [0, 1] do
      [
        route: route_id,
        date: date,
        direction_id: direction_id,
        "fields[schedule]": "departure_time,arrival_time",
        include: "trip",
        "fields[trip]": "headsign"
      ] ++ stop_sequence(description)
    end
  end

  defp stop_sequence(:rapid_transit), do: []
  defp stop_sequence(_), do: [stop_sequence: "first,last"]

  @doc """
  Returns the a current or upcoming weekday, Saturday, and Sunday.
  Avoids any dates in the days_to_avoid array (eg Holidays) as they are
  fetched separately

  Returns as a list rather than a tuple for easier iteration.
  """
  @spec week_dates(Date.t(), [Date.t()]) :: [Date.t()]
  def week_dates(today, days_to_avoid) do
    dow = Date.day_of_week(today)

    weekday =
      if dow in 1..5 do
        today
      else
        # Monday
        Date.add(today, 8 - dow)
      end

    # Saturday, not going back in time
    saturday = Date.add(today, Integer.mod(6 - dow, 7))
    sunday = Date.add(today, 7 - dow)

    valid_weekday = get_valid_day(weekday, days_to_avoid)
    valid_saturday = get_valid_day(saturday, days_to_avoid)
    valid_sunday = get_valid_day(sunday, days_to_avoid)

    [
      valid_weekday,
      valid_saturday,
      valid_sunday
    ]
  end

  defp get_valid_day(check_date, days_to_avoid) do
    if Enum.member?(days_to_avoid, check_date) do
      next_date = get_next_date(check_date)
      get_valid_day(next_date, days_to_avoid)
    else
      check_date
    end
  end

  defp get_next_date(check_date) do
    case Date.day_of_week(check_date) do
      d when d in 1..4 -> Date.add(check_date, 1)
      # Friday so skip weekend to Monday
      5 -> Date.add(check_date, 3)
      # Saturday or Sunday so jump to next weeks Sat or Sun
      _ -> Date.add(check_date, 7)
    end
  end

  @doc """
  Parses a block of API responses into an %HoursOfOperation struct, or returns an error.

  It expects 6 + (2 * n) responses, in the same order specified in `api_params/4`.
  """
  @spec parse_responses([{:ok, api_response} | {:exit, any}], atom(), Keyword.t(), Function.t()) ::
          t | {:error, any}
        when api_response: JsonApi.t() | {:error, any}
  def parse_responses(
        [
          {:ok, week_response_0},
          {:ok, week_response_1},
          {:ok, saturday_response_0},
          {:ok, saturday_response_1},
          {:ok, sunday_response_0},
          {:ok, sunday_response_1} | special_service_responses
        ],
        description,
        params,
        departure_fn
      ) do
    [_week_0, _week_1, _saturday_0, _saturday_1, _sunday_0, _sunday_1 | special_service_params] =
      params

    with {:ok, headsigns} <- get_headsigns(week_response_0, week_response_1, description),
         {:ok, week_0} <- departure(week_response_0, headsigns, description, departure_fn),
         {:ok, week_1} <- departure(week_response_1, headsigns, description, departure_fn),
         {:ok, saturday_0} <-
           departure(saturday_response_0, headsigns, description, departure_fn),
         {:ok, saturday_1} <-
           departure(saturday_response_1, headsigns, description, departure_fn),
         {:ok, sunday_0} <- departure(sunday_response_0, headsigns, description, departure_fn),
         {:ok, sunday_1} <- departure(sunday_response_1, headsigns, description, departure_fn),
         {:ok, special_service} <-
           special_service_departures(
             special_service_responses,
             headsigns,
             description,
             special_service_params,
             departure_fn
           ) do
      %__MODULE__{
        week: {week_0, week_1},
        saturday: {saturday_0, saturday_1},
        sunday: {sunday_0, sunday_1},
        special_service: special_service
      }
    else
      _ -> parse_responses([], description, params, departure_fn)
    end
  end

  def parse_responses(errors, _, _, _) when is_list(errors) do
    {:error, :timeout}
  end

  defp special_service_departures({:error, _} = error, _, _, _, _) do
    error
  end

  # No special service
  defp special_service_departures([], _, _, _, _) do
    {:ok, %{}}
  end

  defp special_service_departures(
         special_service_responses,
         headsigns,
         :rapid_transit,
         special_service_params,
         departure_fn
       ) do
    special_service_departures_parser(
      special_service_responses,
      headsigns,
      :rapid_transit,
      special_service_params,
      departure_fn
    )
  end

  defp special_service_departures(_, _, _, _, _) do
    {:ok, %{}}
  end

  # These should come in chunks of 2, anything else and its bad data
  defp special_service_departures_parser(
         [{:ok, %JsonApi{data: data_0}}, {:ok, %JsonApi{data: data_1}} | tail],
         headsigns,
         description,
         [dir_0, _dir_1 | param_tail] = _params,
         departure_fn
       ) do
    date_key = Date.to_string(dir_0[:date])

    direction_tuple =
      {departure_fn.(data_0, headsigns, description), departure_fn.(data_1, headsigns, description)}

    with {:ok, special_service_departures_map} <-
           special_service_departures_parser(
             tail,
             headsigns,
             description,
             param_tail,
             departure_fn
           ) do
      {:ok, Map.put(special_service_departures_map, date_key, direction_tuple)}
    end
  end

  # Reached the end of the array, return the map we build on
  defp special_service_departures_parser([], _, _, _, _) do
    {:ok, %{}}
  end

  defp special_service_departures_parser(_, _, _, _, _) do
    {:error, "Unexpected special service hours data"}
  end

  @doc """
  Merges a list of %HoursOfOperation{} structs, taking the earlier/latest times for each.

  Used to combine %HoursOfOperation structs for different routes into a
  single struct representing all the routes together.
  """
  @spec join_hours([t], atom()) :: t
  def join_hours([single], _) do
    single
  end

  # Repid transit hours don't need to be merged (at least yet)
  def join_hours(multiple, :rapid_transit) do
    multiple
  end

  def join_hours(multiple, _) do
    Enum.reduce(multiple, %__MODULE__{}, &merge/2)
  end

  defimpl Enumerable do
    def count(_hours) do
      {:error, __MODULE__}
    end

    def member?(_hours, _other) do
      {:error, __MODULE__}
    end

    def reduce(hours, acc, fun) do
      [
        week: hours.week,
        saturday: hours.saturday,
        sunday: hours.sunday
      ]
      |> Enum.reject(&(elem(&1, 1) == {:no_service, :no_service}))
      |> Enumerable.reduce(acc, fun)
    end

    def slice(_hours) do
      {:error, __MODULE__}
    end
  end

  defp merge(%__MODULE__{} = first, %__MODULE__{} = second) do
    %__MODULE__{
      week: merge_directions(first.week, second.week),
      saturday: merge_directions(first.saturday, second.saturday),
      sunday: merge_directions(first.sunday, second.sunday)
    }
  end

  defp merge(%__MODULE__{} = first, {:error, :timeout}) do
    first
  end

  defp merge({:error, :timeout}, %__MODULE__{} = second) do
    second
  end

  defp merge_directions({first_0, first_1}, {second_0, second_1}) do
    {
      merge_departure(first_0, second_0),
      merge_departure(first_1, second_1)
    }
  end

  defp merge_departure(:no_service, second) do
    second
  end

  defp merge_departure(first, :no_service) do
    first
  end

  defp merge_departure(%Departures{} = first, %Departures{} = second) do
    %Departures{
      first_departure:
        Enum.min_by(
          [first.first_departure, second.first_departure],
          &DateTime.to_unix(&1, :nanosecond)
        ),
      last_departure:
        Enum.max_by(
          [first.last_departure, second.last_departure],
          &DateTime.to_unix(&1, :nanosecond)
        )
    }
  end

  # Grabs the head sign data from the stops,
  # Letting us know the terminal stops for the trip
  defp get_terminal_stops(data) do
    data
    |> Enum.map(fn data ->
      trips = Map.get(data.relationships, "trip")
      trip = List.first(trips)
      Map.get(trip.attributes, "headsign")
    end)
    |> Enum.uniq()
  end

  defp get_headsigns(%JsonApi{data: data_0}, %JsonApi{data: data_1}, :rapid_transit) do
    headsign_0 = get_terminal_stops(data_0)
    headsign_1 = get_terminal_stops(data_1)

    {:ok, Enum.concat(headsign_0, headsign_1)}
  end

  defp get_headsigns(%JsonApi{data: _data_0}, %JsonApi{data: _data_1}, _) do
    {:ok, []}
  end

  defp get_headsigns({:error, _} = error, _, _) do
    error
  end

  defp terminus?(stop_name, headsigns) do
    Enum.member?(headsigns, stop_name)
  end

  defp time(%{"departure_time" => nil, "arrival_time" => time}), do: time
  defp time(%{"departure_time" => time}), do: time

  defp departure(%JsonApi{data: data}, headsigns, description, departure_fn) do
    {:ok, departure_fn.(data, headsigns, description)}
  end

  defp departure({:error, [%JsonApi.Error{code: "no_service"}]}, _, _, _) do
    {:ok, :no_service}
  end

  defp departure({:error, _} = error, _, _, _) do
    error
  end

  def departure([], _, _) do
    :no_service
  end

  # This one returns an array of hours
  # The hours are departure times leaving the station
  # This will not return terminal stations for the given direction
  # Example: this will never return Wonderland for east bound blue line departures
  # There are never any trains departing Wonderland headed east bound, they
  # are departing heading west bound (the other direction and will be in the other directions data)
  def departure(data, headsigns, :rapid_transit) do
    only_departure_times =
      Enum.filter(data, fn x ->
        Map.get(x.attributes, "departure_time") != nil
      end)

    # This data is already going only one direction so we don't need to worry about that
    times_by_stop =
      Enum.group_by(only_departure_times, fn x ->
        stop_array = Map.get(x.relationships, "stop")
        # should be exactly one element
        List.first(stop_array).id
      end)

    Enum.map(times_by_stop, fn {id, x} ->
      stop = @stops_repo.get!(id)

      {min, max} =
        x
        |> Stream.reject(&no_times?(&1.attributes))
        |> Stream.map(&Timex.parse!(time(&1.attributes), "{ISO:Extended}"))
        |> Enum.min_max_by(&DateTime.to_unix(&1, :nanosecond))

      %Departures{
        stop_id: id,
        first_departure: min,
        last_departure: max,
        stop_name: stop.name,
        parent_stop_id: stop.parent_id,
        is_terminus: terminus?(stop.name, headsigns)
      }
    end)
  end

  @doc """
  This returns a single hours map for rapid transit routes
  It ignores any departures that have the same start and end time, and are not the
  terminus departure
  """
  def departure_overall(data, headsigns, :rapid_transit) do
    case departure(data, headsigns, :rapid_transit) do
      departures when is_list(departures) ->
        departures_filtered =
          Enum.filter(departures, fn x ->
            x.first_departure != x.last_departure && x.is_terminus == true
          end)

        if Enum.empty?(departures_filtered) do
          :no_service
        else
          first_departure =
            Enum.min_by(departures_filtered, &DateTime.to_unix(&1.first_departure, :nanosecond))

          last_departure =
            Enum.min_by(departures_filtered, &DateTime.to_unix(&1.last_departure, :nanosecond))

          %Departures{
            first_departure: first_departure.first_departure,
            last_departure: last_departure.last_departure
          }
        end

      _ ->
        :no_service
    end
  end

  def departure_overall([], _, _) do
    :no_service
  end

  # This returns a single hours map (for non rapid transit routes)
  def departure_overall(data, _headsigns, _description) do
    {min, max} =
      data
      |> Stream.reject(&no_times?(&1.attributes))
      |> Stream.map(&Timex.parse!(time(&1.attributes), "{ISO:Extended}"))
      |> Enum.min_max_by(&DateTime.to_unix(&1, :nanosecond))

    %Departures{
      first_departure: min,
      last_departure: max
    }
  end

  defp no_times?(%{"arrival_time" => nil, "departure_time" => nil}), do: true

  defp no_times?(_), do: false
end
