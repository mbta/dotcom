defmodule MBTA.Api.PredictionsTest do
  use ExUnit.Case, async: false

  import Mox

  alias MBTA.Api.Mock
  alias MBTA.Api.Predictions

  setup :set_mox_global
  setup :verify_on_exit!

  test "all/1 returns a list of predictions" do
    # Setup
    expect(Mock, :get_json, fn url, params ->
      assert url == "/predictions/"
      assert Enum.sort(params) == Enum.sort(foo: 1, bar: 2)

      []
    end)

    # Exercise
    predictions = Predictions.all(foo: 1, bar: 2)

    # Verify
    assert predictions == []
  end
end
