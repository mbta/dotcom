defmodule DotcomWeb.ScheduleController.LineApi do
  @moduledoc """
  Provides JSON endpoints for retrieving line diagram data.
  """

  use DotcomWeb, :controller

  require Logger

  alias DotcomWeb.ScheduleController.Line.Helpers, as: LineHelpers
  alias Routes.Route
  alias Stops.RouteStop

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{"id" => route_id, "direction_id" => direction_id_str}) do
    direction_id = String.to_integer(direction_id_str)

    case LineHelpers.get_route(route_id) do
      {:ok, route} ->
        conn =
          conn
          |> assign(:route, route)
          |> assign(:direction_id, direction_id)
          |> assign_alerts(filter_by_direction?: true)

        branch_route_stops =
          LineHelpers.get_branch_route_stops(
            route,
            direction_id,
            conn.query_params["route_pattern"]
          )

        other_route_stops =
          other_route_stops(%{
            route: route,
            direction_id: direction_id,
            branch_route_stops: branch_route_stops
          })

        {stop_tree, route_stop_lists} =
          LineHelpers.get_stop_tree_or_lists(branch_route_stops, route.type)

        json(
          conn,
          %{
            other_route_stops: other_route_stops,
            route_stop_lists: route_stop_lists,
            stop_tree: stop_tree
          }
        )

      :not_found ->
        return_invalid_arguments_error(conn)
    end
  end

  defp other_route_stops(%{
         route: %Route{type: 3} = route,
         direction_id: direction_id,
         branch_route_stops: branch_route_stops
       }) do
    branch_route_stop_ids =
      branch_route_stops
      |> Enum.flat_map(fn rs ->
        rs
        |> Map.get(:stops)
        |> Enum.map(& &1.id)
      end)
      |> MapSet.new()

    @stops_repo.by_route(route.id, direction_id)
    |> Enum.reject(&MapSet.member?(branch_route_stop_ids, &1.id))
    |> Enum.map(&RouteStop.build_route_stop(&1, route))
    |> Enum.map(&RouteStop.fetch_connections/1)
  end

  defp other_route_stops(_), do: []
end
