defmodule Dotcom.Utils.DateTime do
  @moduledoc """
  TODO: Add module documentation
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

  # Timex can give us ambiguous times during DST transitions; we choose the later time.
  # In the *very* rare case that we are given an {:error, _} tuple, we default to now.
  # In the even rarer case that we are given some other argument type, we also default to now.
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
end
