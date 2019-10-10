defmodule Stops.RouteStop do
  @moduledoc """
  A helper module for generating some contextual information about stops on a route. RouteStops contain
  the following information:
  ```
    # RouteStop info for South Station on the Red Line (direction_id: 0)
    %Stops.RouteStop{
      id: "place-sstat",                                  # The id that the stop is typically identified by (i.e. the parent stop's id)
      name: "South Station"                               # Stop's display name
      zone: "1A"                                          # Commuter rail zone (will be nil if stop doesn't have CR routes)
      route: %Routes.Route{id: "Red"...}                  # The full Routes.Route for the parent route
      branch: nil                                         # Name of the branch that this stop is on for this route. will be nil unless the stop is actually on a branch.
      station_info: %Stops.Stop{id: "place-sstat"...}     # Full Stops.Stop struct for the parent stop.

      stop_features: [:commuter_rail, :bus, :accessible]  # List of atoms representing the icons that should be displayed for this stop.
      is_terminus?: false                                 # Whether this is either the first or last stop on the route.
    }
  ```

  """
  alias Routes.{Route}
  @type branch_name_t :: String.t() | nil
  @type direction_id_t :: 0 | 1

  @type t :: %__MODULE__{
          id: Stops.Stop.id_t(),
          name: String.t(),
          zone: String.t() | {:error, :not_fetched},
          branch: branch_name_t,
          station_info: Stops.Stop.t(),
          route: Routes.Route.t() | nil,
          connections: [Routes.Route.t()] | {:error, :not_fetched},
          stop_features: [Stops.Repo.stop_feature()] | {:error, :not_fetched},
          is_terminus?: boolean,
          is_beginning?: boolean,
          closed_stop_info: Stops.Stop.ClosedStopInfo.t() | nil
        }

  defstruct [
    :id,
    :name,
    :branch,
    :station_info,
    :route,
    connections: {:error, :not_fetched},
    zone: {:error, :not_fetched},
    stop_features: {:error, :not_fetched},
    is_terminus?: false,
    is_beginning?: false,
    closed_stop_info: nil
  ]

  alias __MODULE__, as: RouteStop

  def to_json_safe(%RouteStop{connections: connections, route: route} = map) do
    %{
      map
      | connections: Enum.map(connections, &Route.to_json_safe/1),
        route: Route.to_json_safe(route)
    }
  end

  @doc """
  Given a route and a list of that route's shapes, generates a list of RouteStops representing all stops on that route. If the route has branches,
  the branched stops appear grouped together in order as part of the list.
  """
  @spec list_from_shapes([Routes.Shape.t()], [Stops.Stop.t()], Routes.Route.t(), direction_id_t) ::
          [RouteStop.t()]
  # Can't build route stops if there are no stops or shapes
  def list_from_shapes([], [], _route, _direction_id), do: []

  def list_from_shapes([], [%Stops.Stop{} | _] = stops, route, _direction_id) do
    # if the repo doesn't have any shapes, just fake one since we only need the name and stop_ids.

    stops
    |> List.last()
    |> Map.get(:id)
    |> do_list_from_shapes(Enum.map(stops, & &1.id), stops, route)
  end

  def list_from_shapes(
        [%Routes.Shape{} = shape],
        [%Stops.Stop{} | _] = stops,
        route,
        _direction_id
      ) do
    # If there is only one route shape, we know that we won't need to deal with merging branches so
    # we just return whatever the list of stops is without calling &merge_branch_list/2.
    do_list_from_shapes(shape.name, shape.stop_ids, stops, route)
  end

  def list_from_shapes(
        [%Routes.Shape{} = shape | _],
        stops,
        %Routes.Route{type: 4} = route,
        _direction_id
      ) do
    # for the ferry, for now, just return a single branch
    do_list_from_shapes(shape.name, Enum.map(stops, & &1.id), stops, route)
  end

  def list_from_shapes(shapes, stops, %Route{id: "CR-Fairmount"} = route, 0) do
    mainline = Enum.find(shapes, &(&1.name == "South Station - Readville via Fairmount"))
    foxboro_extension = Enum.find(shapes, &(&1.name == "South Station - Foxboro via Fairmount"))

    distinct_stop_ids =
      mainline.stop_ids |> Enum.concat(foxboro_extension.stop_ids) |> Enum.uniq()

    [do_list_from_shapes(mainline.name, distinct_stop_ids, stops, route)]
    |> merge_branch_list(0)
  end

  def list_from_shapes(shapes, stops, %Route{id: "CR-Fairmount"} = route, 1) do
    mainline = Enum.find(shapes, &(&1.name == "Readville - South Station via Fairmount"))

    foxboro_extension =
      Enum.find(shapes, &(&1.name == "Forge Park/495 - South Station via Fairmount"))

    distinct_stop_ids =
      ["place-FS-0049" | foxboro_extension.stop_ids]
      |> Enum.concat(mainline.stop_ids)
      |> Enum.uniq()

    [do_list_from_shapes(foxboro_extension.name, distinct_stop_ids, stops, route)]
    |> merge_branch_list(1)
  end

  def list_from_shapes(shapes, stops, route, direction_id) do
    shapes
    |> Enum.map(&do_list_from_shapes(&1.name, &1.stop_ids, stops, route))
    |> merge_branch_list(direction_id)
  end

  @spec do_list_from_shapes(String.t(), [Stops.Stop.id_t()], [Stops.Stop.t()], Routes.Route.t()) ::
          [RouteStop.t()]
  defp do_list_from_shapes(shape_name, stop_ids, [%Stops.Stop{} | _] = stops, route) do
    stops = Map.new(stops, &{&1.id, &1})

    stop_ids
    |> Enum.flat_map(fn stop_id ->
      parent_stop_id =
        stop_id
        |> Stops.Repo.get_parent()
        |> Map.fetch!(:id)

      case Map.fetch(stops, parent_stop_id) do
        {:ok, stop} -> [stop]
        :error -> []
      end
    end)
    |> Util.EnumHelpers.with_first_last()
    |> Enum.with_index()
    |> Enum.map(fn {{stop, first_or_last?}, idx} ->
      first? = idx == 0
      last? = first_or_last? and idx > 0
      build_route_stop(stop, route, first?: first?, last?: last?, branch: shape_name)
    end)
  end

  defp do_list_from_shapes(_name, _stop_ids, _stops, _route) do
    []
  end

  @doc """
  Builds a RouteStop from information about a stop.
  """
  @spec build_route_stop(Stops.Stop.t(), Routes.Route.t(), Keyword.t()) :: RouteStop.t()
  def build_route_stop(%Stops.Stop{} = stop, route, opts \\ []) do
    branch = Keyword.get(opts, :branch)
    first? = Keyword.get(opts, :first?) == true
    last? = Keyword.get(opts, :last?) == true

    %RouteStop{
      id: stop.id,
      name: stop.name,
      station_info: stop,
      route: route,
      branch: branch,
      is_terminus?: first? or last?,
      is_beginning?: first?
    }
  end

  @spec fetch_zone(t) :: t
  def fetch_zone(%__MODULE__{zone: {:error, :not_fetched}} = route_stop) do
    %{route_stop | zone: Zones.Repo.get(route_stop.id)}
  end

  @spec fetch_stop_features(t) :: t
  def fetch_stop_features(%__MODULE__{stop_features: {:error, :not_fetched}} = route_stop) do
    features = route_stop_features(route_stop)
    %{route_stop | stop_features: features}
  end

  def fetch_connections(
        %__MODULE__{route: %Routes.Route{}, connections: {:error, :not_fetched}} = route_stop
      ) do
    connections =
      route_stop.id
      |> Routes.Repo.by_stop()
      |> Enum.reject(&(&1.id == route_stop.route.id))

    %{route_stop | connections: connections}
  end

  @spec route_stop_features(t) :: [Stops.Repo.stop_feature()]
  defp route_stop_features(%__MODULE__{station_info: %Stops.Stop{}} = route_stop) do
    Stops.Repo.stop_features(route_stop.station_info, connections: route_stop.connections)
  end

  defp route_stop_features(%__MODULE__{}) do
    []
  end

  @spec merge_branch_list([[RouteStop.t()]], direction_id_t) :: [RouteStop.t()]
  defp merge_branch_list(branches, direction_id) do
    # If we know a route has branches, then we need to figure out which stops are on a branch vs. which stops
    # are shared. At this point, we have two lists of branches, and at the back end the stops are all the same,
    # but starting at some point in the middle the stops branch.
    branches
    |> Enum.map(&flip_branches_to_front(&1, direction_id))
    |> flatten_branches
    # unflips the branches
    |> flip_branches_to_front(direction_id)
  end

  @spec flatten_branches([[RouteStop.t()]]) :: [RouteStop.t()]
  defp flatten_branches(branches) do
    # We build a list of the shared stops between the branches, then unassign
    # the branch for each stop that's in the list of shared stops.
    shared_stop_ids =
      branches
      |> Enum.map(fn stops ->
        MapSet.new(stops, & &1.id)
      end)
      |> Enum.reduce(&MapSet.intersection/2)

    branches
    |> Enum.map(&unassign_branch_if_shared(&1, shared_stop_ids))
    |> Enum.reduce(&merge_two_branches/2)
  end

  @spec unassign_branch_if_shared([RouteStop.t()], MapSet.t()) :: [RouteStop.t()]
  defp unassign_branch_if_shared(stops, shared_stop_ids) do
    for stop <- stops do
      if MapSet.member?(shared_stop_ids, stop.id) do
        %{stop | branch: nil}
      else
        stop
      end
    end
  end

  @spec merge_two_branches([RouteStop.t()], [RouteStop.t()]) :: [RouteStop.t()]
  defp merge_two_branches(first, second) do
    {first_branch, first_core} = Enum.split_while(first, & &1.branch)
    {second_branch, second_core} = Enum.split_while(second, & &1.branch)

    core =
      [first_core, second_core]
      |> Enum.max_by(&length/1)
      |> Enum.map(&%{&1 | branch: nil})

    second_branch ++ first_branch ++ core
  end

  @spec flip_branches_to_front([RouteStop.t()], direction_id_t) :: [RouteStop.t()]
  defp flip_branches_to_front(branch, 0), do: Enum.reverse(branch)
  defp flip_branches_to_front(branch, 1), do: branch

  defimpl Util.Position do
    def latitude(route_stop), do: route_stop.station_info.latitude
    def longitude(route_stop), do: route_stop.station_info.longitude
  end
end
