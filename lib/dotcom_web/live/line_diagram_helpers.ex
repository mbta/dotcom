defmodule DotcomWeb.LineDiagramHelpers do
  @moduledoc """
  Helpers for extracting GTFS route branching data and
  drawing the line diagram.
  """
  use Phoenix.Component

  @spec route_to_diagram_class(Routes.Route.t()) :: String.t()
  def route_to_diagram_class(%{id: "Green-" <> _branch}), do: "green-line"
  def route_to_diagram_class(%{id: "Mattapan"}), do: "red-line"

  def route_to_diagram_class(route),
    do: route |> Routes.Route.icon_atom() |> Atom.to_string() |> String.replace("_", "-")

  @spec get_segments(Routes.Route.t(), 0 | 1, %{String.t() => Stops.Stop.t()}, [
          RoutePatterns.RoutePattern.t()
        ]) :: [GTFSRouteBranching.Segment.t()]
  def get_segments(route, direction_id, stops_by_id, selected_route_patterns) do
    route_patterns_by_id =
      Map.new(selected_route_patterns, fn pattern ->
        normalized_pattern =
          if route.id == "Green" do
            %{pattern | route_id: "Green"}
          else
            pattern
          end
          |> atomize_typicality()

        {pattern.id, normalized_pattern}
      end)

    representative_trips_by_id =
      selected_route_patterns
      |> Enum.map(fn pattern ->
        trip_id = pattern.representative_trip_id
        {trip_id, %{id: trip_id, stop_ids: pattern.stop_ids}}
      end)
      |> Map.new()

    canon_stop_ids = Map.keys(stops_by_id)

    {_stop_graph, _segment_graph, segments} =
      GTFSRouteBranching.calculate(
        route,
        direction_id,
        canon_stop_ids,
        %{
          route_patterns: route_patterns_by_id,
          representative_trips: representative_trips_by_id,
          stops: stops_by_id
        }
      )

    segments
  end

  defp atomize_typicality(%{typicality: typicality} = pattern) when is_atom(typicality),
    do: pattern

  defp atomize_typicality(%{typicality: typicality} = pattern) when is_integer(typicality) do
    typicality_atom =
      case typicality do
        1 -> :typical
        2 -> :deviation
        3 -> :atypical
        4 -> :diversion
        5 -> :canonical_only
        # undefined typicality value will cause GTFSRouteBranching to throw an error
        _ -> nil
      end

    %{pattern | typicality: typicality_atom}
  end

  defp atomize_typicality(pattern), do: pattern

  attr :segment_data, :map, required: true

  def stop_card_segment(assigns) do
    ~H"""
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      class="line-diagram-svg"
      aria-hidden
      height="100%"
    >
      <defs>
        <pattern
          id={"diagonalHatch-#{@segment_data.stop_id}"}
          width="10"
          height="10"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line
            class="line-diagram-svg__line"
            y2="8"
            stroke-width="16px"
          />
        </pattern>
      </defs>
      <%= for connection <- @segment_data.connections do %>
        <line
          x1={lane_to_x(connection.from_lane)}
          y1={vpos_to_y(connection.from_vpos)}
          x2={lane_to_x(connection.to_lane)}
          y2={vpos_to_y(connection.to_vpos)}
          stroke-width="10"
          stroke={"url(#diagonalHatch-#{@segment_data.stop_id})"}
          class="line-diagram-svg__line"
        />
      <% end %>
      <circle
        cx={lane_to_x(@segment_data.stop_lane)}
        cy="1em"
        r="4"
        class="line-diagram-svg__stop"
        data-stop-id={@segment_data.stop_id}
      />
    </svg>
    """
  end

  defp lane_to_x(:left), do: 20
  defp lane_to_x(:center), do: 50
  defp lane_to_x(:right), do: 80

  defp vpos_to_y(:top), do: 0
  defp vpos_to_y(:center), do: "1em"
  defp vpos_to_y(:bottom), do: "100%"
end
