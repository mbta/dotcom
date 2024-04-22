defmodule MBTA.Api.FacilitiesTest do
  use ExUnit.Case, async: false

  import Mox

  alias MBTA.Api.{Facilities, Mock}

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
    expect(Mock, :get_json, fn url, params ->
      assert url == "/facilities/"

      assert Enum.sort(params) ==
               Enum.sort([{"filter[stop_id]", "place-sstat"}, {"filter[route_type]", "0"}])

      []
    end)

    # Exercise
    facilities = Facilities.filter_by(%{stop_id: "place-sstat", route_type: "0"})

    # Verify
    assert facilities == []
  end
end
