defmodule Dotcom.Routes do
  @moduledoc """
  A collection of functions that help to work with routes in a unified way.
  """

  alias Routes.Route

  @subway_branch_ids GreenLine.branch_ids() ++ ["Mattapan"]
  @subway_line_names ["Blue", "Green", "Orange", "Red"]

  # Association of subway line names to all their respective subway routes.
  # This could later be derived from the GTFS line/route relationships.
  @subway_line_route_map %{
    "Blue" => ["Blue"],
    "Green" => GreenLine.branch_ids(),
    "Orange" => ["Orange"],
    "Red" => ["Red", "Mattapan"]
  }

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
  Returns a list of all subway route IDs which we'd like to show as branches.
  """
  @spec subway_branch_ids() :: [Route.id_t()]
  def subway_branch_ids, do: @subway_branch_ids

  @doc """
  Returns a list of all subway line names.
  """
  @spec subway_line_names() :: [Route.id_t() | String.t()]
  def subway_line_names, do: @subway_line_names

  @doc """
  Returns the list of all subway route IDs.
  """
  @spec subway_route_ids() :: [Route.id_t()]
  def subway_route_ids, do: Map.values(@subway_line_route_map) |> List.flatten()
end
