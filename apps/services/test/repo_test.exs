defmodule Services.RepoTest do
  use ExUnit.Case, async: true
  alias Services.{Repo, Service}

  test "by_route_id fetches services for a route" do
    assert [%Service{} | _] = Repo.by_route_id("Red")
  end
end
