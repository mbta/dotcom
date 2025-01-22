defmodule MBTA.Api.FacilitiesTest do
  use ExUnit.Case, async: false

  import Mox

  alias MBTA.Api.Facilities
  alias MBTA.Api.Mock

  setup :set_mox_global
  setup :verify_on_exit!

  test "all/0 returns a list of facilities" do
    # Setup
    expect(Mock, :get_json, fn url, _ ->
      assert url == "/facilities/"

      []
    end)

    # Exercise
    facilities = Facilities.all()

    # Verify
    assert facilities == []
  end

  test "filter_by/1 sends filters as query parameters" do
    # Setup
    stop_id = String.downcase(Faker.Team.creature())
    route_type = Enum.random(["0", "1", "2", "3"])

    expect(Mock, :get_json, fn url, params ->
      assert url == "/facilities/"

      assert Enum.sort(params) ==
               Enum.sort([{"filter[stop_id]", stop_id}, {"filter[route_type]", route_type}])

      []
    end)

    # Exercise
    facilities = Facilities.filter_by(%{stop_id: stop_id, route_type: route_type})

    # Verify
    assert facilities == []
  end
end
