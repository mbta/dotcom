defmodule RoutePatterns.RepoTest do
  use ExUnit.Case, async: true
  alias RoutePatterns.{Repo, RoutePattern}

  describe "get" do
    test "returns a single route pattern" do
      assert %RoutePattern{id: "111-5-0"} = Repo.get("111-5-0")
    end

    test "returns nil for an unknown route pattern" do
      refute Repo.get("unknown_route_pattern")
    end
  end

  describe "by_route_id" do
    test "returns route patterns for a route" do
      assert [%RoutePattern{} | _] = Repo.by_route_id("Red")
    end

    test "returns route patterns for all Green line branches" do
      assert [%RoutePattern{} | _] = Repo.by_route_id("Green")
    end

    test "takes a direction_id param" do
      all_patterns = Repo.by_route_id("Red")
      assert all_patterns |> Enum.map(& &1.direction_id) |> Enum.uniq() == [0, 1]
      alewife_patterns = Repo.by_route_id("Red", direction_id: 1)
      assert alewife_patterns |> Enum.map(& &1.direction_id) |> Enum.uniq() == [1]
    end

    test "takes a route_pattern_id param" do
      all_patterns = Repo.by_route_id("Red")
      assert all_patterns |> Enum.map(& &1.direction_id) |> Enum.uniq() == [0, 1]
      alewife_patterns = Repo.by_route_id("Red", direction_id: 1)
      assert alewife_patterns |> Enum.map(& &1.direction_id) |> Enum.uniq() == [1]
    end
  end
end
