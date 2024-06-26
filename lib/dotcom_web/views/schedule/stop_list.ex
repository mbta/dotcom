defmodule DotcomWeb.ScheduleView.StopList do
  @moduledoc """
  Functions likely associated with an earlier version of the schedules page,
  which manage to still be invoked in other pages.
  """

  alias Dotcom.StopBubble
  alias DotcomWeb.ViewHelpers

  @spec stop_bubble_row_params(map(), boolean) :: [StopBubble.Params.t()]
  def stop_bubble_row_params(assigns, first_stop? \\ true) do
    for {{bubble_branch, bubble_type}, index} <- Enum.with_index(assigns.bubbles) do
      indent = merge_indent(bubble_type, assigns[:direction_id], index)

      %StopBubble.Params{
        render_type: rendered_bubble_type(bubble_type, index),
        class: Atom.to_string(bubble_type),
        direction_id: assigns[:direction_id],
        merge_indent: indent,
        route_id: bubble_branch,
        route_type: assigns.route.type,
        show_line?: show_line?(bubble_type, indent, first_stop?),
        vehicle_tooltip: vehicle_tooltip(bubble_type, bubble_branch, assigns.vehicle_tooltip),
        content: bubble_content(bubble_branch),
        bubble_branch: bubble_branch,
        show_checkmark?: show_checkmark?(assigns[:show_checkmark?], first_stop?, bubble_type)
      }
    end
  end

  defp show_checkmark?(nil, first_stop?, bubble_type) do
    !first_stop? and bubble_type == :terminus
  end

  defp show_checkmark?(show_checkmark?, _first_stop?, _bubble_type) do
    show_checkmark?
  end

  defp merge_indent(bubble_type, direction_id, index)
  defp merge_indent(:merge, 0, 1), do: :above
  defp merge_indent(:merge, 1, 1), do: :below
  defp merge_indent(_, _, _), do: nil

  defp show_line?(bubble_type, indent, first_stop?)
  defp show_line?(:empty, _, _), do: false
  defp show_line?(:line, _, _), do: true
  defp show_line?(_, :below, _), do: true
  defp show_line?(:terminus, _, first_stop?), do: first_stop? == true
  defp show_line?(_, _, _), do: true

  defp vehicle_tooltip(bubble_type, bubble_branch, tooltip)
  defp vehicle_tooltip(:line, _, _), do: nil

  defp vehicle_tooltip(
         _,
         "Green" <> _ = bubble_branch,
         %VehicleTooltip{vehicle: %Vehicles.Vehicle{route_id: bubble_branch}} = tooltip
       ),
       do: tooltip

  defp vehicle_tooltip(_, "Green" <> _, _), do: nil
  defp vehicle_tooltip(_, _, tooltip), do: tooltip

  defp rendered_bubble_type(bubble_type, index)
  defp rendered_bubble_type(:line, _), do: :empty
  defp rendered_bubble_type(:merge, 1), do: :empty
  defp rendered_bubble_type(bubble_type, _), do: bubble_type

  defp bubble_content(route_id)
  defp bubble_content("Green-" <> letter), do: letter
  defp bubble_content(_), do: ""

  @doc """
  Formats a Schedules.Departures.t to a human-readable time range.
  """
  @spec display_departure_range(Schedules.Departures.t()) :: iodata
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
  @spec schedule_period(atom) :: String.t()
  def schedule_period(:week), do: "Monday to Friday"

  def schedule_period(period) do
    period
    |> Atom.to_string()
    |> String.capitalize()
  end

  @spec display_map_link?(integer) :: boolean
  # only show for ferry
  def display_map_link?(type), do: type == 4
end
