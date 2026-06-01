defmodule Dotcom.Utils.Diff do
  @moduledoc """
  Functions for working with durations
  """

  @doc """
  Render seconds into minutes, with localized formatting. Rounds to
  the nearest minute (rounds up for >= 30 seconds between minutes,
  rounds down if < 30 seconds). Avoids displaying 0 when under 30
  seconds. If the number of minutes is greater than 60, then split
  it out into hours and minutes.


  ## Examples
      iex> seconds_to_localized_minutes(29)
      "< 1 min"

      iex> seconds_to_localized_minutes(30)
      "1 min"

      iex> seconds_to_localized_minutes(62)
      "1 min"

      iex> seconds_to_localized_minutes(3601)
      "1 hr"

      iex> seconds_to_localized_minutes(3660)
      "1 hr 1 min"

      iex> seconds_to_localized_minutes(3452364)
      "958 hr 59 min"

      iex> seconds_to_localized_minutes(523.0)
      "9 min"
  """
  def seconds_to_localized_minutes(seconds) when is_float(seconds) do
    trunc(seconds) |> seconds_to_localized_minutes()
  end

  def seconds_to_localized_minutes(seconds) when is_integer(seconds) do
    div(seconds + 30, 60) |> minutes_to_localized_minutes()
  end

  @doc """
  Render minutes with localized formatting. If the number of minutes
  is greater than 60, then split it out into hours and minutes. Avoids
  displaying '0 min'.

  ## Examples
      iex> minutes_to_localized_minutes(0)
      "< 1 min"

      iex> minutes_to_localized_minutes(1)
      "1 min"

      iex> minutes_to_localized_minutes(60)
      "1 hr"

      iex> minutes_to_localized_minutes(61)
      "1 hr 1 min"

      iex> minutes_to_localized_minutes(7362)
      "122 hr 42 min"
  """
  def minutes_to_localized_minutes(0) do
    "< #{minutes_to_localized_minutes(1)}"
  end

  def minutes_to_localized_minutes(minutes) when minutes < 60 do
    Cldr.Unit.new!(:minute, minutes)
    |> Cldr.Unit.to_string!(style: :short)
  end

  def minutes_to_localized_minutes(minutes) do
    num_hours = div(minutes, 60)

    hours =
      Cldr.Unit.new!(:hour, num_hours)
      |> Cldr.Unit.round(0)
      |> Cldr.Unit.to_string!(style: :short)

    case rem(minutes, 60) do
      0 ->
        hours

      num_minutes ->
        minutes = minutes_to_localized_minutes(num_minutes)

        "#{hours} #{minutes}"
    end
  end
end
