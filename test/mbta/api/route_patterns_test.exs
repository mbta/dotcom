defmodule MBTA.Api.RoutePatternsTest do
  use ExUnit.Case, async: false

  import Mox

  alias MBTA.Api.Mock
  alias MBTA.Api.RoutePatterns

  setup :set_mox_global
  setup :verify_on_exit!

  test "all/0 returns a list of route patterns" do
    # Setup
    expect(Mock, :get_json, fn url, _ ->
      assert url == "/route_patterns/"

      []
    end)

    # Exercise
    route_patterns = RoutePatterns.all()

    # Verify
    assert route_patterns == []
  end

  test "get/1 returns a route pattern" do
    # Setup
    id = Faker.Internet.slug()

    expect(Mock, :get_json, fn url, _ ->
      assert url == "/route_patterns/#{id}"

      %{}
    end)

    # Exercise
    route_pattern = RoutePatterns.get(id)

    # Verify
    assert route_pattern == %{}
  end
end
