defmodule DotcomWeb.Components.TripPlanner.Helpers do
  @moduledoc """
  Functions for rendering in the trip planner.
  """

  use Dotcom.Gettext.Sigils

  alias OpenTripPlannerClient.Schema.{Leg, Step}

  @doc """
  Generate a friendly description of the walking step or walking leg.

  ## Examples
      iex> walk_summary(%OpenTripPlannerClient.Schema.Step{relative_direction: :DEPART, street_name: "Transfer"})
      "Transfer"

      iex> walk_summary(%OpenTripPlannerClient.Schema.Step{relative_direction: :FOLLOW_SIGNS, street_name: "Rainbow Road"})
      "Follow signs for Rainbow Road"

      iex> walk_summary(%OpenTripPlannerClient.Schema.Step{relative_direction: :CONTINUE, street_name: "Rainbow Road"})
      "Continue onto Rainbow Road"

      iex> walk_summary(%OpenTripPlannerClient.Schema.Step{street_name: "Rainbow Road"})
      "Go onto Rainbow Road"
  """
  @spec walk_summary(Step.t() | Leg.t()) :: String.t()
  def walk_summary(%Step{relative_direction: :DEPART, street_name: "Transfer"}),
    do: ~t"Transfer"

  def walk_summary(%Step{
        relative_direction: relative_direction,
        street_name: street_name
      }) do
    "#{human_relative_direction(relative_direction)} #{human_relative_preposition(relative_direction)} #{street_name}"
  end

  def walk_summary(%Leg{distance: meters, duration: seconds, transit_leg: false}) do
    "#{seconds_to_localized_minutes(seconds)}, #{meters_to_localized_miles(meters)}"
  end

  defp human_relative_direction(:DEPART), do: ~t"Depart"
  defp human_relative_direction(:SLIGHTLY_LEFT), do: ~t"Slightly left"
  defp human_relative_direction(:LEFT), do: ~t"Left"
  defp human_relative_direction(:HARD_LEFT), do: ~t"Hard left"
  defp human_relative_direction(:SLIGHTLY_RIGHT), do: ~t"Slightly right"
  defp human_relative_direction(:RIGHT), do: ~t"Right"
  defp human_relative_direction(:HARD_RIGHT), do: ~t"Hard right"
  defp human_relative_direction(:CONTINUE), do: ~t"Continue"
  defp human_relative_direction(:CIRCLE_CLOCKWISE), do: ~t"Enter the traffic circle"
  defp human_relative_direction(:CIRCLE_COUNTERCLOCKWISE), do: ~t"Enter the traffic circle"
  defp human_relative_direction(:ELEVATOR), do: ~t"Take the elevator"
  defp human_relative_direction(:UTURN_LEFT), do: ~t"Make a U-turn"
  defp human_relative_direction(:UTURN_RIGHT), do: ~t"Make a U-turn"
  defp human_relative_direction(:ENTER_STATION), do: ~t"Enter the station"
  defp human_relative_direction(:EXIT_STATION), do: ~t"Exit the station"
  defp human_relative_direction(:FOLLOW_SIGNS), do: ~t"Follow signs"
  defp human_relative_direction(_), do: ~t"Go"

  defp human_relative_preposition(:FOLLOW_SIGNS), do: ~t"for"
  defp human_relative_preposition(:ENTER_STATION), do: ~t"through"
  defp human_relative_preposition(:EXIT_STATION), do: ~t"towards"
  defp human_relative_preposition(_), do: ~t"onto"

  @doc """
  Render meters into miles, with localized formatting.
  Avoids displaying 0 when under 0.1 mile.

  ## Examples
   		iex> meters_to_localized_miles(1)
   		"0.1 mi"

   		iex> meters_to_localized_miles(3452364)
   		"2,145.2 mi"
  """
  def meters_to_localized_miles(meters) do
    with {:ok, unit} <- Cldr.Unit.new(:meter, meters),
         {:ok, converted_unit} <- Cldr.Unit.convert(unit, :mile) do
      converted_unit
      |> Cldr.Unit.round(1)
      |> at_least(0.1)
      |> Cldr.Unit.to_string!(style: :short)
    end
  end

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
    |> at_least(1)
    |> Cldr.Unit.to_string!(style: :short)
  end

  defp at_least(unit, min_value) do
    if Cldr.Unit.zero?(unit) do
      %{unit | value: min_value}
    else
      unit
    end
  end
end
