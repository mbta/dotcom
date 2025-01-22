defmodule Stops.RouteStops do
  @moduledoc """
  Helpers for assembling a list of RouteStops.
  """

  alias Routes.Route
  alias Routes.Shape
  alias Stops.RouteStop
  alias Stops.Stop

  defstruct [:branch, :stops]

  @type t :: %__MODULE__{
          branch: RouteStop.branch_name_t(),
          stops: [RouteStop.t()]
        }
  @type direction_id_t :: 0 | 1

  @spec from_route_stop_groups([[RouteStop.t()]]) :: [
          t()
        ]
  def from_route_stop_groups(route_stop_groups) do
    Enum.map(route_stop_groups, &from_list/1)
  end

  @doc """
  Builds a list of all stops (as %RouteStop{}) on a route in a single direction.
  """
  @spec by_direction([Stop.t()], [Shape.t()], Route.t(), direction_id_t) :: [
          t()
        ]
  def by_direction(stops, shapes, %Route{} = route, direction_id) when is_integer(direction_id) do
    shapes
    |> RouteStop.list_from_shapes(stops, route, direction_id)
    |> Task.async_stream(fn route_stop ->
      route_stop
      |> RouteStop.fetch_zone()
      |> RouteStop.fetch_connections()
      |> RouteStop.fetch_stop_features()
    end)
    |> Enum.flat_map(fn
      {:ok, route_stop} -> [route_stop]
      _ -> []
    end)
    |> Enum.chunk_by(& &1.branch)
    |> Enum.map(&from_list/1)
  end

  @spec from_list([RouteStop.t()]) :: t()
  def from_list(stops) do
    %__MODULE__{
      branch: branch(stops),
      stops: stops
    }
  end

  @spec branch([RouteStop.t()]) :: RouteStop.branch_name_t()
  defp branch([first | _] = route_stops) do
    route_stops
    |> Enum.find(first, &green_branch?/1)
    |> Map.get(:branch)
  end

  defp branch(_), do: nil

  @spec green_branch?(RouteStop.t()) :: boolean()
  defp green_branch?(%RouteStop{branch: branch}) when is_binary(branch), do: String.starts_with?(branch, "Green")

  defp green_branch?(_), do: false
end
