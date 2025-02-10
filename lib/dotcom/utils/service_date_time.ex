defmodule Dotcom.Utils.ServiceDateTime do
  @moduledoc """
  A collection of functions that helps to work with date_times with regard to service times.
  Currently, we consider the most general case where service ends at 02:59:59 and starts at 03:00:00.

  In the future, we aim to add route-specific service times.

  Note that functions like `service_today?/1` and `service_this_week?/1` are not exlusive.
  A date_time can have service today and service this week.
  I.e., today is both today and this week.

  However, the `service_range/1` function *is* exclusive.
  Given a date_time in today's service range, it will return :today.
  """

  require Logger

  use Timex

  import Dotcom.Utils.DateTime, only: [coerce_ambiguous_time: 1, now: 0, timezone: 0]

  alias Dotcom.Utils

  @type service_range() :: :past | :today | :this_week | :next_week | :later

  @service_rollover_time Application.compile_env!(:dotcom, :service_rollover_time)
  @timezone timezone()

  @doc """
  Returns the time at which service rolls over from 'today' to 'tomorrow'.
  """
  def service_rollover_time(), do: @service_rollover_time

  @doc """
  Get the service date for the given date_time.
  If the time is before 3am, we consider it to be the previous day.
  """
  @spec service_date() :: Date.t()
  @spec service_date(DateTime.t()) :: Date.t()
  def service_date(date_time \\ now()) do
    if date_time.hour < @service_rollover_time.hour do
      Timex.shift(date_time, hours: -@service_rollover_time.hour)
      |> coerce_ambiguous_time()
      |> Timex.to_date()
    else
      Timex.to_date(date_time)
    end
  end

  @doc """
  The most specific service range for the given date_time.
  A date_time for today can be in the range for today and this week.
  But, we just return :today since that is the most specific range.
  """
  @spec service_range(DateTime.t()) :: service_range()
  def service_range(date_time) do
    Enum.find(
      [
        &service_past?/1,
        &service_today?/1,
        &service_this_week?/1,
        &service_next_week?/1,
        &service_later?/1
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
  Get the beginning of the service day for the day after the given date_time.
  """
  @spec beginning_of_next_service_day() :: DateTime.t()
  @spec beginning_of_next_service_day(DateTime.t()) :: DateTime.t()
  def beginning_of_next_service_day(datetime \\ now()) do
    datetime
    |> end_of_service_day()
    |> Timex.shift(microseconds: 1)
    |> coerce_ambiguous_time()
  end

  @doc """
  Get the beginning of the service day for the given date_time.
  """
  @spec beginning_of_service_day() :: DateTime.t()
  @spec beginning_of_service_day(DateTime.t()) :: DateTime.t()
  def beginning_of_service_day(date_time \\ now()) do
    date_time
    |> service_date()
    |> Timex.to_datetime(@timezone)
    |> coerce_ambiguous_time()
    |> Map.put(:hour, @service_rollover_time.hour)
  end

  @doc """
  Get the end of the service day for the given date_time.
  """
  @spec end_of_service_day() :: DateTime.t()
  @spec end_of_service_day(DateTime.t()) :: DateTime.t()
  def end_of_service_day(date_time \\ now()) do
    date_time
    |> service_date()
    |> Timex.to_datetime(@timezone)
    |> coerce_ambiguous_time()
    |> Timex.shift(days: 1, hours: @service_rollover_time.hour, microseconds: -1)
    |> coerce_ambiguous_time()
    |> Map.put(:hour, @service_rollover_time.hour - 1)
  end

  @doc """
  Get a service range for the day of the given date_time.
  """
  @spec service_range_day() :: Utils.DateTime.time_range()
  @spec service_range_day(DateTime.t()) :: Utils.DateTime.time_range()
  def service_range_day(date_time \\ now()) do
    beginning_of_service_day = beginning_of_service_day(date_time)
    end_of_service_day = end_of_service_day(date_time)

    {beginning_of_service_day, end_of_service_day}
  end

  @doc """
  Get a service range for the week of the given date_time.
  """
  @spec service_range_current_week() :: Utils.DateTime.time_range()
  @spec service_range_current_week(DateTime.t()) :: Utils.DateTime.time_range()
  def service_range_current_week(date_time \\ now()) do
    beginning_of_current_week =
      date_time
      |> Timex.beginning_of_week()
      |> Timex.shift(hours: 24)
      |> beginning_of_service_day()

    end_of_current_week = date_time |> Timex.end_of_week() |> end_of_service_day()

    {beginning_of_current_week, end_of_current_week}
  end

  @doc """
  Get a service range for the week following the current week of the given date_time.
  """
  @spec service_range_following_week() :: Utils.DateTime.time_range()
  @spec service_range_following_week(DateTime.t()) :: Utils.DateTime.time_range()
  def service_range_following_week(date_time \\ now()) do
    {_, end_of_current_week} = service_range_current_week(date_time)
    beginning_of_following_week = Timex.shift(end_of_current_week, microseconds: 1)

    end_of_following_week =
      beginning_of_following_week |> Timex.end_of_week() |> end_of_service_day()

    {beginning_of_following_week, end_of_following_week}
  end

  @doc """
  Get a service range for all time afer the following week of the given date_time.
  """
  @spec service_range_later() :: Utils.DateTime.time_range()
  @spec service_range_later(DateTime.t()) :: Utils.DateTime.time_range()
  def service_range_later(date_time \\ now()) do
    {_, end_of_following_week} = date_time |> service_range_following_week()
    beginning_of_later = Timex.shift(end_of_following_week, microseconds: 1)

    {beginning_of_later, nil}
  end

  @doc """
  Given a time_range and a date_time, returns true if the date_time is within the time_range.
  """
  @spec in_range?(Utils.DateTime.time_range(), DateTime.t()) :: boolean
  def in_range?({nil, stop}, date_time) do
    Timex.before?(date_time, stop) || Timex.equal?(date_time, stop, :microsecond)
  end

  def in_range?({start, nil}, date_time) do
    Timex.after?(date_time, start) || Timex.equal?(date_time, start, :microsecond)
  end

  def in_range?({start, stop}, date_time) do
    in_range?({start, nil}, date_time) && in_range?({nil, stop}, date_time)
  end

  def in_range?(_, _), do: false

  @doc """
  Is the given date_time before the beginning of service today?
  """
  @spec service_past?(DateTime.t()) :: boolean
  def service_past?(date_time) do
    Timex.before?(date_time, beginning_of_service_day())
  end

  @doc """
  Does the given date_time fall within today's service range?
  """
  @spec service_today?(DateTime.t()) :: boolean
  def service_today?(date_time) do
    service_range_day() |> in_range?(date_time)
  end

  @doc """
  Does the given date_time fall within the service range of this week?
  """
  @spec service_this_week?(DateTime.t()) :: boolean
  def service_this_week?(date_time) do
    service_range_current_week() |> in_range?(date_time)
  end

  @doc """
  Does the given date_time fall within the service range of next week?
  """
  @spec service_next_week?(DateTime.t()) :: boolean
  def service_next_week?(date_time) do
    service_range_following_week() |> in_range?(date_time)
  end

  @doc """
  Does the given date_time fall within the service range after next week?
  """
  @spec service_later?(DateTime.t()) :: boolean
  def service_later?(date_time) do
    service_range_later() |> in_range?(date_time)
  end
end
