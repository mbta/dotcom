defmodule Dotcom.Utils.DateTime do
  @moduledoc """
  A collection of functions for working with date_times.

  Consuming modules are responsible for parsing or converting date_times.
  They should *always* call `coerce_ambiguous_time/1` before using a date_time.
  This is mainly because Timex has so many functions that serve as entry points to date_times.
  Those functions can return ambiguous date_times during DST transitions.
  """

  require Logger

  use Timex

  @typedoc """
  A range of time that can be open ended on either side.
  """
  @type time_range() :: {DateTime.t() | nil, DateTime.t() | nil}

  @timezone Application.compile_env!(:dotcom, :timezone)

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
  Timex can give us ambiguous times during DST transitions; we choose the later time.
  In the *very* rare case that we are given an {:error, _} tuple, we default to now.
  In the even rarer case that we are given some other argument type, we also default to now.
  """
  @spec coerce_ambiguous_time(DateTime.t() | Timex.AmbiguousDateTime.t() | {:error, term()}) ::
          DateTime.t()
  def coerce_ambiguous_time(%DateTime{} = date_time), do: date_time
  def coerce_ambiguous_time(%Timex.AmbiguousDateTime{after: later}), do: later

  def coerce_ambiguous_time({:error, reason}) do
    Logger.error("#{__MODULE__} failed to coerce ambiguous time: #{inspect(reason)}")

    now()
  end

  def coerce_ambiguous_time(arg) do
    Logger.error("#{__MODULE__} failed to coerce ambiguous time: #{inspect(arg)}")

    now()
  end

  @doc """
  Given a time_range and a date_time, returns true if the date_time is within the time_range.
  """
  @spec in_range?(Utils.DateTime.time_range(), DateTime.t()) :: boolean
  def in_range?({nil, nil}, _), do: false

  def in_range?({nil, %DateTime{} = stop}, %DateTime{} = date_time) do
    Timex.before?(date_time, stop) || Timex.equal?(date_time, stop, :microsecond)
  end

  def in_range?({%DateTime{} = start, nil}, %DateTime{} = date_time) do
    Timex.after?(date_time, start) || Timex.equal?(date_time, start, :microsecond)
  end

  def in_range?({%DateTime{} = start, %DateTime{} = stop}, %DateTime{} = date_time) do
    in_range?({start, nil}, date_time) && in_range?({nil, stop}, date_time)
  end

  def in_range?(_, _), do: false
end
