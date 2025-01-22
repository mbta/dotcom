defmodule MBTA.Api.TripsTest do
  use ExUnit.Case, async: false

  import Mox

  alias MBTA.Api.Mock
  alias MBTA.Api.Trips

  setup :set_mox_global
  setup :verify_on_exit!

  test "by_id/1 returns a trip" do
    # Setup
    id = String.downcase(Faker.Team.creature())

    expect(Mock, :get_json, fn url, _ ->
      assert url == "/trips/#{id}"

      %{}
    end)

    # Exercise
    trip = Trips.by_id(id)

    # Verify
    assert trip == %{}
  end

  test "by_route/1 sends route as query parameter" do
    # Setup
    route = String.downcase(Faker.Team.creature())

    expect(Mock, :get_json, fn url, params ->
      assert url == "/trips/"
      assert Enum.sort(params) == Enum.sort(route: route)

      []
    end)

    # Exercise
    trips = Trips.by_route(route)

    # Verify
    assert trips == []
  end
end
