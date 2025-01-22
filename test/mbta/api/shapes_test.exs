defmodule MBTA.Api.ShapesTest do
  use ExUnit.Case, async: false

  import Mox

  alias MBTA.Api.Mock
  alias MBTA.Api.Shapes

  setup :set_mox_global
  setup :verify_on_exit!

  test "all/0 returns a list of shapes" do
    # Setup
    expect(Mock, :get_json, fn url, _ ->
      assert url == "/shapes/"

      []
    end)

    # Exercise
    shapes = Shapes.all()

    # Verify
    assert shapes == []
  end

  test "by_id/1 returns a shape" do
    # Setup
    id = String.downcase(Faker.Team.creature())

    expect(Mock, :get_json, fn url ->
      assert url == "/shapes/#{id}"

      %{}
    end)

    # Exercise
    shape = Shapes.by_id(id)

    # Verify
    assert shape == %{}
  end
end
