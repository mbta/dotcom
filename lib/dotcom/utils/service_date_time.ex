defmodule Dotcom.Utils.ServiceDateTime do
  @moduledoc """
  A collection of functions that helps to work with date_times with regard to service ranges.
  Currently, we consider the most general case where service starts at 03:00:00am and ends at 02:59:59am.

  In the future, we aim to add route-specific service times.

  The service range continuum:

  <---before today---|---this week---|---next week---|---after next week--->
                     today

  Before today and after next week are open intervals. Today is included in this week.
  """

  use Timex

  require Logger

  alias Dotcom.Utils

  @type named_service_range() ::
          :before_today | :today | :this_week | :next_week | :after_next_week
  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @service_rollover_time Application.compile_env!(:dotcom, :service_rollover_time)
  @timezone Application.compile_env!(:dotcom, :timezone)

  @doc """
  Returns an ordered list of service ranges, from earliest to latest.
  """
  def all_service_ranges,
    do: [:before_today, :today, :this_week, :next_week, :after_next_week]

  @doc """
  Returns the time at which service rolls over from 'today' to 'tomorrow'.
  """
  def service_rollover_time(), do: @service_rollover_time

  @doc """
  Get the service date for the given date_time.
  If the time is before 03:00:00am, we consider it to be the previous day.
  """
  @spec service_date() :: Date.t()
  @spec service_date(DateTime.t()) :: Date.t()
  def service_date(date_time \\ @date_time_module.now()) do
    if date_time.hour < @service_rollover_time.hour do
      Timex.shift(date_time, hours: -@service_rollover_time.hour)
      |> @date_time_module.coerce_ambiguous_date_time()
      |> Timex.to_date()
    else
      Timex.to_date(date_time)
    end
  end

  @doc """
  The service range for the given date_time.
  """
  @spec service_range(DateTime.t()) :: named_service_range()
  def service_range(date_time) do
    Enum.find(
      [
        &service_before_today?/1,
        &service_today?/1,
        &service_this_week?/1,
        &service_next_week?/1,
        &service_after_next_week?/1
      ],
      fn f ->
        f.(date_time)
      end
    )
    |> Kernel.inspect()
    |> Kernel.then(fn module -> Regex.run(~r/_(\w+)\?/, module) end)
    |> List.last()
    |> String.to_atom()
  end

  @doc """
  Converts a service range atom to a title-cased string.
  """
  @spec service_range_string(named_service_range()) :: String.t()
  def service_range_string(service_range) do
    case service_range do
      :after_next_week -> "Later"
      _ -> service_range |> Atom.to_string() |> Recase.to_title()
    end
  end

  @doc """
  Get the beginning of the service day for the day after the given date_time.
  """
  @spec beginning_of_next_service_day() :: DateTime.t()
  @spec beginning_of_next_service_day(DateTime.t()) :: DateTime.t()
  def beginning_of_next_service_day(datetime \\ @date_time_module.now()) do
    datetime
    |> end_of_service_day()
    |> Timex.shift(microseconds: 1)
    |> @date_time_module.coerce_ambiguous_date_time()
  end

  @doc """
  Get the beginning of the service day for the given date_time.
  """
  @spec beginning_of_service_day() :: DateTime.t()
  @spec beginning_of_service_day(DateTime.t()) :: DateTime.t()
  def beginning_of_service_day(date_time \\ @date_time_module.now()) do
    date_time
    |> service_date()
    |> Timex.to_datetime(@timezone)
    |> @date_time_module.coerce_ambiguous_date_time()
    |> Map.put(:hour, @service_rollover_time.hour)
  end

  @doc """
  Get the end of the service day for the given date_time.
  """
  @spec end_of_service_day() :: DateTime.t()
  @spec end_of_service_day(DateTime.t()) :: DateTime.t()
  def end_of_service_day(date_time \\ @date_time_module.now()) do
    date_time
    |> service_date()
    |> Timex.to_datetime(@timezone)
    |> @date_time_module.coerce_ambiguous_date_time()
    |> Timex.shift(days: 1, hours: @service_rollover_time.hour, microseconds: -1)
    |> @date_time_module.coerce_ambiguous_date_time()
    |> Map.put(:hour, @service_rollover_time.hour - 1)
  end

  @doc """
  Get a service range for the day of the given date_time.
  Service days go from 03:00:00am to 02:59:59am the following day.
  """
  @spec service_range_day() :: Utils.DateTime.date_time_range()
  @spec service_range_day(DateTime.t()) :: Utils.DateTime.date_time_range()
  def service_range_day(date_time \\ @date_time_module.now()) do
    beginning_of_service_day = beginning_of_service_day(date_time)
    end_of_service_day = end_of_service_day(date_time)

    {beginning_of_service_day, end_of_service_day}
  end

  @doc """
  Get a service range for the week of the given date_time.
  Service weeks go from Monday at 03:00:00am to the following Monday at 02:59:59am.
  If today is the last day in the service week, the range will be the same as the range for today.
  """
  @spec service_range_this_week() :: Utils.DateTime.date_time_range()
  @spec service_range_this_week(DateTime.t()) :: Utils.DateTime.date_time_range()
  def service_range_this_week(date_time \\ @date_time_module.now()) do
    beginning_of_service_day = beginning_of_service_day(date_time)

    end_of_this_week = date_time |> Timex.end_of_week() |> end_of_service_day()

    case Timex.compare(beginning_of_service_day, end_of_this_week) do
      1 -> service_range_day(date_time)
      _ -> {beginning_of_service_day, end_of_this_week}
    end
  end

  @doc """
  Get a service range for the week following the current week of the given date_time.
  """
  @spec service_range_next_week() :: Utils.DateTime.date_time_range()
  @spec service_range_next_week(DateTime.t()) :: Utils.DateTime.date_time_range()
  def service_range_next_week(date_time \\ @date_time_module.now()) do
    {_, end_of_this_week} = service_range_this_week(date_time)
    beginning_of_next_week = Timex.shift(end_of_this_week, microseconds: 1)

    end_of_next_week =
      beginning_of_next_week |> Timex.end_of_week() |> end_of_service_day()

    {beginning_of_next_week, end_of_next_week}
  end

  @doc """
  Get a service range for all time after the following week of the given date_time.
  """
  @spec service_range_after_next_week() :: Utils.DateTime.date_time_range()
  @spec service_range_after_next_week(DateTime.t()) :: Utils.DateTime.date_time_range()
  def service_range_after_next_week(date_time \\ @date_time_module.now()) do
    {_, end_of_next_week} = date_time |> service_range_next_week()
    beginning_of_after_next_week = Timex.shift(end_of_next_week, microseconds: 1)

    {beginning_of_after_next_week, nil}
  end

  @doc """
  Is the given date_time before the beginning of service today?
  """
  @spec service_before_today?(DateTime.t()) :: boolean
  def service_before_today?(date_time) do
    Timex.before?(date_time, beginning_of_service_day())
  end

  @doc """
  Does the given date_time fall within today's service range?
  """
  @spec service_today?(DateTime.t()) :: boolean
  def service_today?(date_time) do
    service_range_day() |> @date_time_module.in_range?(date_time)
  end

  @doc """
  Does the given date_time fall within the service range of this week?
  """
  @spec service_this_week?(DateTime.t()) :: boolean
  def service_this_week?(date_time) do
    service_range_this_week() |> @date_time_module.in_range?(date_time)
  end

  @doc """
  Does the given date_time fall within the service range of next week?
  """
  @spec service_next_week?(DateTime.t()) :: boolean
  def service_next_week?(date_time) do
    service_range_next_week() |> @date_time_module.in_range?(date_time)
  end

  @doc """
  Does the given date_time fall within the service range after next week?
  """
  @spec service_after_next_week?(DateTime.t()) :: boolean
  def service_after_next_week?(date_time) do
    service_range_after_next_week() |> @date_time_module.in_range?(date_time)
  end

  @doc """
  Returns all service ranges between two datetimes, inclusive, supporting open ends.
  """
  @spec service_range_range(DateTime.t() | nil, DateTime.t() | nil) :: [named_service_range()]
  def service_range_range(start, stop) do
    start_index = if(start, do: service_range_index(start), else: 0)
    stop_index = if(stop, do: service_range_index(stop), else: length(all_service_ranges()) - 1)

    all_service_ranges()
    |> Enum.with_index(&if(&2 in start_index..stop_index, do: &1))
    |> Enum.reject(&is_nil/1)
  end

  defp service_range_index(datetime),
    do: Enum.find_index(all_service_ranges(), &(&1 == service_range(datetime)))
end
