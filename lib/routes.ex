defmodule Dotcom.Routes do
  @moduledoc """
  """

  @subway_route_ids ["Blue", "Green", "Orange", "Red"]

  @doc """
  Returns a list of route ids for all subway routes.
  """
  def subway_route_ids(), do: @subway_route_ids
end
