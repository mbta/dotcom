defmodule MBTA.Api.AlertsTest do
  use ExUnit.Case, async: false

  import Mox

  alias MBTA.Api.Alerts
  alias MBTA.Api.Mock

  setup :set_mox_global
  setup :verify_on_exit!

  test "all/0 returns a list of alerts" do
    # Setup
    expect(Mock, :get_json, fn url, _ ->
      assert url == "/alerts/"

      []
    end)

    # Exercise
    alerts = Alerts.all()

    # Verify
    assert alerts == []
  end
end
