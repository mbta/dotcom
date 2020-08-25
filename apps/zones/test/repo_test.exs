defmodule Zones.RepoTest do
  use ExUnit.Case, async: true
  alias Zones.Repo

  test "it finds the zone of a commuter rail stop" do
    assert Repo.get("South Acton") == "6"
  end

  test "it finds the zone of a zone 1a stop" do
    assert Repo.get("place-sstat") == "1A"
  end

  test "it finds the zone of a 'combo' zone stop (e.g. 1A-1 or 1A-2)" do
    assert Repo.get("place-qnctr") == "1A-1"
    assert Repo.get("place-ER-0115") == "1A-2"
  end

  test "it finds the zones for all stops" do
    assert length(Map.keys(Repo.all())) == length(Map.values(Repo.all()))
  end
end
