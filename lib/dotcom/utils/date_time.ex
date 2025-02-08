defmodule Dotcom.Utils.DateTime do
  @moduledoc """
  TODO: Add module documentation
  """

  require Logger

  use Timex

  @typedoc """
  A range of time that can be open ended.
  """
  @type time_range() :: {DateTime.t() | nil, DateTime.t() | nil}

  @service_rollover_time Application.compile_env!(:dotcom, :service_rollover_time)
  @timezone Application.compile_env!(:dotcom, :timezone)

  @doc """
  Returns the time at which service rolls over from 'today' to 'tomorrow'.
  """
  def service_rollover_time(), do: @service_rollover_time

  @doc """
  Returns the timezone for the application.
  """
  def timezone(), do: @timezone

  @doc """
  Get the date_time in the set @timezone.
  """
  @spec now() :: DateTime.t()
  def now(), do: Timex.now(@timezone)

  @doc """
  Get the service date for the given date_time.
  If the time is before 3am, we consider it to be the previous day.
  """
  @spec service_date() :: Date.t()
  @spec service_date(DateTime.t()) :: Date.t()
  def service_date(date_time \\ now()) do
    if date_time.hour < @service_rollover_time.hour do
      Timex.shift(date_time, hours: -@service_rollover_time.hour) |> Timex.to_date()
    else
      Timex.to_date(date_time)
    end
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
  @spec service_range_day() :: time_range()
  @spec service_range_day(DateTime.t()) :: time_range()
  def service_range_day(date_time \\ now()) do
    beginning_of_service_day = beginning_of_service_day(date_time)
    end_of_service_day = end_of_service_day(date_time)

    {beginning_of_service_day, end_of_service_day}
  end

  @doc """
  Get a service range for the week of the given date_time.
  """
  @spec service_range_current_week() :: time_range()
  @spec service_range_current_week(DateTime.t()) :: time_range()
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
  @spec service_range_following_week() :: time_range()
  @spec service_range_following_week(DateTime.t()) :: time_range()
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
  @spec service_range_later() :: time_range()
  @spec service_range_later(DateTime.t()) :: time_range()
  def service_range_later(date_time \\ now()) do
    {_, end_of_following_week} = date_time |> service_range_following_week()
    beginning_of_later = Timex.shift(end_of_following_week, microseconds: 1)

    {beginning_of_later, nil}
  end

  @doc """
  Given a time_range and a date_time, returns true if the date_time is within the time_range.
  """
  @spec in_range?(time_range(), DateTime.t()) :: boolean
  def in_range?({nil, stop}, date_time) do
    Timex.before?(date_time, stop) || Timex.equal?(date_time, stop)
  end

  def in_range?({start, nil}, date_time) do
    Timex.after?(date_time, start) || Timex.equal?(date_time, start)
  end

  def in_range?({start, stop}, date_time) do
    in_range?({start, nil}, date_time) && in_range?({nil, stop}, date_time)
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

  # Timex can give us ambiguous times during DST transitions.
  # We choose the later time.
  # In the **very** rare case that we are given an {:error, _} tuple, we default to now.
  @spec coerce_ambiguous_time(DateTime.t() | Timex.AmbiguousDateTime.t() | {:error, term()}) :: DateTime.t()
  defp coerce_ambiguous_time(%DateTime{} = date_time), do: date_time
  defp coerce_ambiguous_time(%Timex.AmbiguousDateTime{after: later}), do: later
  defp coerce_ambiguous_time({:error, reason}) do
    Logger.error("#{__MODULE__} failed to coerce ambiguous time: #{inspect(reason)}")

    now()
  end
  defp coerce_ambiguous_time(_), do: now()
end
