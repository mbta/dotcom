defmodule Dotcom.Utils.Diff do
  @moduledoc """
  Functions for working with durations
  """

  @doc """
  Render seconds into minutes, with localized formatting.
  Avoids displaying 0 when under 30 seconds. If the number of minutes is
  greater than 60, then split it out into hours and minutes

  ## Examples
   		iex> seconds_to_localized_minutes(3)
   		"1 min"

   		iex> seconds_to_localized_minutes(62)
   		"1 min"

   		iex> seconds_to_localized_minutes(3601)
   		"1 hr 1 min"

   		iex> seconds_to_localized_minutes(3452364)
   		"958 hr 59 min"
  """
  def seconds_to_localized_minutes(seconds) when seconds >= 3600 do
    num_hours = div(seconds, 3600)
    leftover_seconds = rem(seconds, 3600)

    minutes = seconds_to_localized_minutes(leftover_seconds)

    hours =
      Cldr.Unit.new!(:hour, num_hours)
      |> Cldr.Unit.round(0)
      |> Cldr.Unit.to_string!(style: :short)

    "#{hours} #{minutes}"
  end

  def seconds_to_localized_minutes(seconds) do
    Cldr.Unit.new!(:second, seconds)
    |> Cldr.Unit.convert!(:minute)
    |> Cldr.Unit.round(0)
    |> Dotcom.Utils.Unit.at_least(1)
    |> Cldr.Unit.to_string!(style: :short)
  end

  @doc """
  Render minutes, with localized formatting.

  ## Examples
   		iex> minutes_to_localized_minutes(1)
   		"1 min"

   		iex> minutes_to_localized_minutes(7362)
   		"7,362 min"
  """
  def minutes_to_localized_minutes(minutes) do
    Cldr.Unit.new!(:minute, minutes)
    |> Cldr.Unit.to_string!(style: :short)
  end
end
