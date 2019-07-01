defmodule RoutePatterns.RepoTest do
  use ExUnit.Case, async: true
  alias RoutePatterns.{Repo, RoutePattern}

  describe "by_route_id" do
    test "returns route patterns for a route" do
      assert [%RoutePattern{} | _] = Repo.by_route_id("Red")
    end

    test "takes a direction_id param" do
      all_patterns = Repo.by_route_id("Red")
      assert all_patterns |> Enum.map(& &1.direction_id) |> Enum.uniq() == [0, 1]
      alewife_patterns = Repo.by_route_id("Red", direction_id: 1)
      assert alewife_patterns |> Enum.map(& &1.direction_id) |> Enum.uniq() == [1]
    end
  end
end
