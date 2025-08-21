defmodule DotcomWeb.ScheduleView.Timetable do
  @moduledoc """
  Functions for showing timetable content.
  """

  alias Routes.Route
  alias Schedules.Schedule
  alias Stops.Stop

  @type vehicle_tooltip_key :: {Schedules.Trip.id_t(), Stops.Stop.id_t()}

  def stop_tooltip(%Schedule{} = schedule, track_change_stop) do
    stop_type_description = stop_type(schedule)

    track_change_tooltip =
      if track_change_stop do
        station_name = schedule.stop.name
        track_change_description(station_name, track_change_stop)
      else
        nil
      end

    [stop_type_description, track_change_tooltip]
    |> Enum.reject(&is_nil(&1))
    |> do_stop_tooltip()
  end

  def stop_tooltip(nil, nil) do
    nil
  end

  defp do_stop_tooltip([]) do
    nil
  end

  defp do_stop_tooltip(contents) do
    Enum.join(contents, "\n")
  end

  def stop_type(%Schedule{early_departure?: true}) do
    "Early Departure Stop"
  end

  def stop_type(%Schedule{flag?: true}) do
    "Flag Stop"
  end

  def stop_type(_) do
    nil
  end

  def track_change_description(station_name, track_change_stop) do
    "Train scheduled to board from #{track_change_stop.platform_name} at #{station_name}"
  end

  def stop_row_class(idx) do
    ["js-tt-row", "m-timetable__row"]
    |> do_stop_row_class(idx)
    |> Enum.join(" ")
  end

  defp do_stop_row_class(class_list, 0) do
    ["m-timetable__row--first" | class_list]
  end

  defp do_stop_row_class(class_list, idx) when rem(idx, 2) == 1 do
    ["m-timetable__row--gray" | class_list]
  end

  defp do_stop_row_class(class_list, _) do
    class_list
  end

  def cell_flag_class(%Schedule{flag?: true}), do: " m-timetable__cell--flag-stop"

  def cell_flag_class(%Schedule{early_departure?: true}),
    do: " m-timetable__cell--early-departure"

  def cell_flag_class(_), do: ""

  def cell_via_class(nil), do: ""
  def cell_via_class(<<_::binary>>), do: " m-timetable__cell--via"

  def ferry?(route), do: Routes.Route.type_atom(route) == :ferry

  def commuter_rail?(route), do: Routes.Route.type_atom(route) == :commuter_rail
end
