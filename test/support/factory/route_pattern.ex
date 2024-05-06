defmodule Test.Support.Factory.RoutePattern do
  @moduledoc """
  Generated fake data for %RoutePattern{}
  """
  use ExMachina

  alias RoutePatterns.RoutePattern

  def route_pattern_factory(attrs) do
    merge_attributes(%RoutePattern{}, attrs)
  end
end
