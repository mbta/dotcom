defmodule DotcomWeb.ScheduleView.StopList do
  @moduledoc """
  Functions likely associated with an earlier version of the schedules page,
  which manage to still be invoked in other pages.
  """

  alias DotcomWeb.ViewHelpers

  @doc """
  Formats a Schedules.Departures.t to a human-readable time range.
  """
  def display_departure_range(:no_service) do
    "No Service"
  end

  def display_departure_range(%Schedules.Departures{first_departure: nil, last_departure: nil}) do
    "No Service"
  end

  def display_departure_range(%Schedules.Departures{} = departures) do
    [
      ViewHelpers.format_schedule_time(departures.first_departure),
      "-",
      ViewHelpers.format_schedule_time(departures.last_departure)
    ]
  end

  @doc """
  Displays a schedule period.
  """
  def schedule_period(:week), do: "Monday to Friday"

  def schedule_period(period) do
    period
    |> Atom.to_string()
    |> String.capitalize()
  end

  def display_map_link?(type), do: type == 4
end
