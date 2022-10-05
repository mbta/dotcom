defmodule Schedules.HoursOfOperation do
  @moduledoc false
  alias Schedules.Departures

  @type departure :: Departures.t() | :no_service
  @type t :: %__MODULE__{
          week: {departure, departure},
          saturday: {departure, departure},
          sunday: {departure, departure}
        }
  @derive [Poison.Encoder]
  defstruct week: {:no_service, :no_service},
            saturday: {:no_service, :no_service},
            sunday: {:no_service, :no_service}

  @doc """
  Fetches the hours of operation for a given route.

  The hours of operation are broken into three date ranges:

  * week
  * saturday
  * sunday

  It's possible for one or more of the ranges to be :no_service, if the route
  does not run on that day.
  """
  @spec hours_of_operation(Routes.Route.id_t() | [Routes.Route.id_t()], atom()) ::
          t | {:error, any}
  def hours_of_operation(route_id_or_ids, date \\ Util.service_date(), description) do
    IO.inspect("RAPID RAPID RAPID RAPID RAPID RAPID RAPID RAPID")
    IO.inspect(route_id_or_ids)

    route_id_or_ids
    |> List.wrap()
    # we don't want to filter only the first and last
    |> api_params(date, description)
    |> Task.async_stream(&V3Api.Schedules.all/1, on_timeout: :kill_task)
    # 3 dates * 2 directions == 6 responses per route
    |> Enum.chunk_every(6)
    |> Enum.map(&parse_responses(&1, description))
    |> join_hours(description)
  end

  @doc """
  For a list of route IDs and a date, returns the API queries we'll need to run.

  For a given route, there are 6 queries:

  * weekday, direction 0
  * saturday, direction 0,
  * sunday, direction 0,
  * weekday, direction 1
  * saturday, direction 1
  * sunday, direction 1
  """
  @spec api_params([Routes.Route.id_t()], Date.t(), atom()) :: Keyword.t()
  def api_params(route_ids, today, :rapid_transit) do
    for route_id <- route_ids, direction_id <- [0, 1], date <- week_dates(today) do
      [
        route: route_id,
        date: date,
        direction_id: direction_id,
        "fields[schedule]": "departure_time,arrival_time"
      ]
    end
  end

  def api_params(route_ids, today, _) do
    for route_id <- route_ids, direction_id <- [0, 1], date <- week_dates(today) do
      [
        route: route_id,
        date: date,
        direction_id: direction_id,
        stop_sequence: "first,last",
        "fields[schedule]": "departure_time,arrival_time"
      ]
    end
  end

  @doc """
  Returns the next Monday, Saturday, and Sunday, relative to a given date.

  Returns as a list rather than a tuple for easier iteration.
  """
  @spec week_dates(Date.t()) :: [Date.t()]
  def week_dates(today) do
    dow = Date.day_of_week(today)

    [
      # Monday
      Date.add(today, 8 - dow),
      # Saturday, not going back in time
      Date.add(today, Integer.mod(6 - dow, 7)),
      # Sunday
      Date.add(today, 7 - dow)
    ]
  end

  @doc """
  Parses a block of API responses into an %HoursOfOperation struct, or returns an error.

  It expects 6 responses, in the same order specified in `api_params/2`.
  """
  @spec parse_responses([{:ok, api_response} | {:exit, any}], atom()) :: t | {:error, any}
        when api_response: JsonApi.t() | {:error, any}
  def parse_responses(
        [
          {:ok, week_response_0},
          {:ok, saturday_response_0},
          {:ok, sunday_response_0},
          {:ok, week_response_1},
          {:ok, saturday_response_1},
          {:ok, sunday_response_1}
        ],
        description
      ) do
    with {:ok, week_0} <- departure(week_response_0, description),
         {:ok, week_1} <- departure(week_response_1, description),
         {:ok, saturday_0} <- departure(saturday_response_0, description),
         {:ok, saturday_1} <- departure(saturday_response_1, description),
         {:ok, sunday_0} <- departure(sunday_response_0, description),
         {:ok, sunday_1} <- departure(sunday_response_1, description) do
      %__MODULE__{
        week: {week_0, week_1},
        saturday: {saturday_0, saturday_1},
        sunday: {sunday_0, sunday_1}
      }
    else
      _ -> parse_responses([], description)
    end
  end

  def parse_responses(errors, _) when is_list(errors) do
    {:error, :timeout}
  end

  @doc """
  Merges a list of %HoursOfOperation{} structs, taking the earlier/latest times for each.

  Used to combine %HoursOfOperation structs for different routes into a
  single struct representing all the routes together.
  """
  @spec join_hours([t], atom()) :: t
  # TODO figure out if rapid transit needs to have hours joined
  def join_hours([data], :rapid_transit) do
    data
  end

  def join_hours(data, :rapid_transit) do
    data
  end

  #######

  def join_hours([single], _) do
    single
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

  ## defp time(%{"departure_time" => nil, "arrival_time" => time}), do: time
  defp time(%{"departure_time" => time}), do: time

  defp departure(%JsonApi{data: data}, description) do
    {:ok, departure(data, description)}
  end

  defp departure({:error, [%JsonApi.Error{code: "no_service"}]}, _) do
    {:ok, :no_service}
  end

  defp departure({:error, _} = error, _) do
    error
  end

  defp departure([], _) do
    :no_service
  end

  defp helper(x) do
    # IO.inspect(x)
    obj = Map.get(x, "departure_time")
    # IO.inspect(obj)
    obj != nil
  end

  # This one returns an array of data
  defp departure(data, :rapid_transit) do
    IO.inspect("*****************HERE*********************")

    # This data is already going only one direction so we don't need to worry about that
    times_by_stop =
      Enum.group_by(data, fn x ->
        # How does this become an array?  It looks like the data comes back as just an object from the API
        stop_array = Map.get(x.relationships, "stop")
        # should be exactly one element
        List.first(stop_array).id
      end)

    Enum.map(times_by_stop, fn {id, x} ->
      stop = Stops.Repo.get(id)
      filtered = Enum.filter(x, &helper(&1.attributes))
      IO.inspect(stop)
      IO.inspect(filtered)
      IO.inspect("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")

      {min, max} =
        x
        |> Stream.filter(&helper(&1.attributes))
        |> Stream.map(&Timex.parse!(time(&1.attributes), "{ISO:Extended}"))
        |> Enum.min_max_by(&DateTime.to_unix(&1, :nanosecond))

      %{stop_id: id, first_departure: min, last_departure: max, stop_name: stop.name}
    end)
  end

  defp departure(data, _) do
    {min, max} =
      data
      |> Stream.map(&Timex.parse!(time(&1.attributes), "{ISO:Extended}"))
      |> Enum.min_max_by(&DateTime.to_unix(&1, :nanosecond))

    %Departures{
      first_departure: min,
      last_departure: max
    }
  end
end
