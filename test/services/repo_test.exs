defmodule Services.RepoTest do
  use ExUnit.Case

  alias Services.Repo
  alias Services.Service

  @moduletag :external

  test "by_id fetches service by ID" do
    assert %Service{} = Repo.by_id("canonical")
  end

  test "by_route_id fetches services for a route" do
    assert [%Service{} | _] = Repo.by_route_id("Red")
  end

  test "by_route_id fetches services for a list" do
    assert [%Service{} | _] = Repo.by_route_id(["Red"])
  end

  test "by_route_id fetches services for the green line" do
    assert Repo.by_route_id("Green") == Repo.by_route_id("Green-B,Green-C,Green-D,Green-E")
  end
end
