defmodule Dotcom.Routes do
  @moduledoc """
  A collection of functions that help to work with routes in a unified way.
  """

  alias Routes.Route

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
  def subway_branch_ids, do: @green_line_branch_ids ++ @red_line_branch_ids

  @doc """
  Returns a list of subway lines.
  """
  def subway_line_ids, do: @subway_line_ids

  @doc """
  Returns the list of all subway route IDs.
  """
  def subway_route_ids, do: Map.values(@subway_line_route_map) |> List.flatten()

  @doc """
  For a given route ID, return the relevant subway line name.

  ```elixir
  line_name_for_subway_route("Green-B") == "Green"
  line_name_for_subway_route("CR-Greenbush") == nil
  ```
  """
  def line_name_for_subway_route(route_id) do
    with {line_name, _} <-
           Enum.find(@subway_line_route_map, fn {_, route_ids} ->
             route_id in route_ids
           end) do
      line_name
    end
  end
end
