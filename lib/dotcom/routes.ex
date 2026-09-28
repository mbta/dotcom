defmodule Dotcom.Routes do
  @moduledoc """
  A collection of functions that help to work with routes in a unified way.
  """

  alias Routes.Route
  alias Stops.Stop

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @subway_line_ids ["Red", "Orange", "Green", "Blue"]
  @green_line_branch_ids Enum.map(["B", "C", "D", "E"], fn branch -> "Green-#{branch}" end)
  @red_line_branch_ids ["Mattapan"]

  # Association of subway *line* ids to their respective *branch* ids.
  # This could later be derived from the GTFS line/route relationships.
  @subway_line_route_map %{
    "Blue" => ["Blue"],
    "Green" => ["Green"] ++ @green_line_branch_ids,
    "Orange" => ["Orange"],
    "Red" => ["Red"] ++ @red_line_branch_ids
  }

  @doc """
  Returns a list of all subway route IDs which we'd like to show as branches.
  """
  @spec subway_branch_ids() :: [Route.id_t()]
  def subway_branch_ids, do: @green_line_branch_ids ++ @red_line_branch_ids

  @doc """
  Returns a list of subway lines.
  """
  @spec subway_line_ids() :: [Route.id_t()]
  def subway_line_ids, do: @subway_line_ids

  @doc """
  Returns the list of all subway route IDs.
  """
  @spec subway_route_ids() :: [Route.id_t()]
  def subway_route_ids, do: Map.values(@subway_line_route_map) |> List.flatten()

  @doc """
  For a given route ID, return the relevant subway line name.

  ```elixir
  line_name_for_subway_route("Green-B") == "Green"
  line_name_for_subway_route("CR-Greenbush") == nil
  ```
  """
  @spec line_name_for_subway_route(Route.id_t()) :: String.t() | Route.id_t() | nil
  def line_name_for_subway_route(route_id) do
    with {line_name, _} <-
           Enum.find(@subway_line_route_map, fn {_, route_ids} ->
             route_id in route_ids
           end) do
      line_name
    end
  end

  @doc """
  By default, includes not only routes which are served directly by a stop,
  but also those which serve stops which connect to the given stop. Pass
  `include_connecting_stops?: false` to only return routes served directly
  by the given stop.
  """
  @spec for_stop(Stop.id_t() | Stop.t(), Keyword.t()) :: [Route.t()]
  def for_stop(stop_id, opts \\ [])

  def for_stop(stop_id, opts) when is_binary(stop_id) do
    stop_id
    |> @stops_repo.get()
    |> for_stop(opts)
  end

  def for_stop(%Stops.Stop{id: stop_id, connecting_stops: stop_ids}, opts) do
    stop_ids_to_query =
      if Keyword.get(opts, :include_connecting_stops?, true) do
        [stop_id | stop_ids]
      else
        [stop_id]
      end

    stop_ids_to_query
    |> Enum.join(",")
    |> @routes_repo.by_stop()
    |> Enum.reject(fn route ->
      !route.listed? ||
        route.description == :rail_replacement_bus
    end)
  end

  def for_stop(_, _opts), do: []
end
