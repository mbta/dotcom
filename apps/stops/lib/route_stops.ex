defmodule Stops.RouteStops do
  defstruct [:branch, :stops]

  @type t :: %__MODULE__{
          branch: String.t(),
          stops: [Stops.RouteStop.t()]
        }
  @type direction_id_t :: 0 | 1

  alias Stops.RouteStop

  @doc """
  Builds a list of all stops (as %RouteStop{}) on a route in a single direction.
  """
  @spec by_direction([Stops.Stop.t()], [Routes.Shape.t()], Routes.Route.t(), direction_id_t) :: [
          t
        ]
  def by_direction(stops, shapes, %Routes.Route{} = route, direction_id)
      when is_integer(direction_id) do
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

  @spec from_list([RouteStop.t()]) :: t
  defp from_list([%RouteStop{branch: branch} | _] = stops) do
    %__MODULE__{
      branch: branch,
      stops: stops
    }
  end
end
