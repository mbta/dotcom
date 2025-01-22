defmodule MBTA.Api.SchedulesTest do
  use ExUnit.Case, async: false

  import Mox

  alias MBTA.Api.Mock
  alias MBTA.Api.Schedules

  setup :set_mox_global
  setup :verify_on_exit!

  test "all/0 returns a list of schedules" do
    # Setup
    expect(Mock, :get_json, fn url, _ ->
      assert url == "/schedules/"

      []
    end)

    # Exercise
    schedules = Schedules.all()

    # Verify
    assert schedules == []
  end
end
