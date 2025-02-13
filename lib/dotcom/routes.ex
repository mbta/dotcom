defmodule Dotcom.Routes do
  @moduledoc """
  A collection of functions that help to work with routes in a unified way.
  """

  @subway_lines ["Blue", "Green", "Orange", "Red"]
  @green_line_branches Enum.map(["B", "C", "D", "E"], fn branch -> "Green-#{branch}" end)
  @red_line_branches ["Mattapan"]

  @subway_route_ids @subway_lines ++ @green_line_branches ++ @red_line_branches

  @doc """
  Returns a list of subway lines.
  """
  @spec subway_lines() :: [String.t()]
  def subway_lines(), do: @subway_lines

  @doc """
  Returns a list of route ids for all subway routes.
  """
  @spec subway_route_ids() :: [String.t()]
  def subway_route_ids(), do: @subway_route_ids
end
