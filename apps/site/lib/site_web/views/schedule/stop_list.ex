defmodule SiteWeb.ScheduleView.StopList do
  import Phoenix.HTML.Tag, only: [content_tag: 3]
  alias SiteWeb.ViewHelpers
  alias Site.StopBubble
  alias Stops.RouteStop

  @doc """
  Link to expand or collapse a route branch.

  Note: The target element (with id `"target_id"`) must also have class `"collapse stop-list"`
  for the javascript to appropriately modify the button and the dotted/solid line
  """
  @spec view_branch_link(String.t(), map, String.t(), String.t()) :: Phoenix.HTML.Safe.t()
  def view_branch_link(nil, _assigns, _target_id, _branch_display), do: []

  def view_branch_link(branch_name, assigns, target_id, branch_display) do
    SiteWeb.ScheduleView.render(
      "_stop_list_expand_link.html",
      Map.merge(
        assigns,
        %{
          branch_name: branch_name,
          branch_display: branch_display,
          target_id: target_id,
          expanded: assigns.expanded == branch_name
        }
      )
    )
  end

  @spec display_expand_link?([{String.t(), StopBubble.Params.t()}]) :: boolean
  @doc "Determine if the expansion link should be shown"
  def display_expand_link?([_, _ | _]), do: true
  def display_expand_link?(_), do: false

  @spec step_bubble_attributes([{String.t(), StopBubble.Params.t()}], String.t(), boolean) ::
          Keyword.t()
  @doc "Returns the html attributes to be used when rendering the intermediate steps"
  def step_bubble_attributes(step_bubble_params, target_id, expanded) do
    case {display_expand_link?(step_bubble_params), expanded} do
      {true, true} -> [id: target_id, class: "collapse stop-list in"]
      {true, _} -> [id: target_id, class: "collapse stop-list"]
      _ -> []
    end
  end

  @doc """
  Sets the direction_id for the "Schedules from here" link. Chooses the opposite of the current direction only for the last stop
  on the line or branch (since there are no trips in that direction from those stops).
  """
  @spec schedule_link_direction_id(RouteStop.t(), [Stops.Stop.t()], 0 | 1) :: 0 | 1 | nil
  def schedule_link_direction_id(%RouteStop{is_terminus?: true, is_beginning?: false}, [], _) do
    # if the reverse direction doesn't have any stops, we don't want to link to it
    nil
  end

  def schedule_link_direction_id(
        %RouteStop{is_terminus?: true, is_beginning?: false} = rs,
        all_stops,
        direction_id
      ) do
    reversed_direction_id =
      case direction_id do
        0 -> 1
        1 -> 0
      end

    # if the stop is also excluded from the reverse direction, we don't want
    # to link to it. This matches the logic we use for redirecting when the
    # origin is selected in the OriginDestination plug.
    excluded = ExcludedStops.excluded_origin_stops(reversed_direction_id, rs.route.id, all_stops)

    unless rs.id in excluded do
      reversed_direction_id
    end
  end

  def schedule_link_direction_id(_, _, direction_id), do: direction_id

  def chunk_branches(stops) do
    Enum.chunk_by(stops, fn {_bubbles, stop} -> stop.branch end)
  end

  def separate_collapsible_rows(branch, direction_id) do
    expand_idx = direction_id - 1
    {expand_row, collapsible_stops} = List.pop_at(branch, expand_idx)
    {expand_row, expand_idx, collapsible_stops}
  end

  def render_row(row, assigns) do
    assigns = row_assigns(row, assigns)

    SiteWeb.ScheduleView.render("_stop_list_row.html", assigns)
  end

  defp row_assigns({bubbles, stop}, assigns) do
    %{
      bubbles: bubbles,
      stop: stop,
      vehicle_tooltip: assigns.vehicle_tooltips[stop.id],
      route: assigns.route,
      direction_id: assigns.direction_id,
      conn: assigns.conn,
      show_checkmark?: false,
      row_content_template: "_line_page_stop_info.html",
      reverse_direction_all_stops: assigns.reverse_direction_all_stops,
      expanded: assigns.expanded
    }
  end

  def merge_rows(
        {{_, %{branch: branch}} = expand_row, expand_idx, collapsible_rows},
        %{expanded: expanded} = assigns
      ) do
    collapse_target_id =
      "branch-#{branch}"
      |> String.downcase()
      |> String.replace(~r/[^a-zA-Z0-9-_]/, "-")

    rendered_expand = render_row(expand_row, assigns)
    rendered_collapse = Enum.map(collapsible_rows, &render_row(&1, assigns))
    stop_list_class = if expanded == branch, do: "in", else: ""

    if match?([_, _ | _], collapsible_rows) && !is_nil(branch) do
      branch_map =
        expand_row
        |> row_assigns(assigns)
        |> Map.put(:intermediate_stop_count, Enum.count(collapsible_rows))

      [
        content_tag(
          :div,
          [id: collapse_target_id, class: "collapse stop-list #{stop_list_class}"],
          do: rendered_collapse
        )
      ]
      |> List.insert_at(expand_idx, rendered_expand)
      |> List.insert_at(
        assigns.direction_id,
        view_branch_link(branch, branch_map, collapse_target_id, branch <> " branch")
      )
    else
      List.insert_at(rendered_collapse, expand_idx, rendered_expand)
    end
  end

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

  def filter_stop_features(icons, %Stops.RouteStop{route: %Routes.Route{id: "Green-" <> _}}) do
    Enum.reject(icons, &is_green_branch_icon?/1)
  end

  def filter_stop_features(icons, %Stops.RouteStop{}) do
    icons
  end

  defp is_green_branch_icon?(icon)
       when icon in [:green_line_b, :green_line_c, :green_line_d, :green_line_e],
       do: true

  defp is_green_branch_icon?(_), do: false

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
