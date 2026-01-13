defmodule MBTA.Api.RoutesTest do
  use ExUnit.Case, async: false

  import Mox

  alias MBTA.Api.{Mock, Routes}

  setup :set_mox_global
  setup :verify_on_exit!

  test "all/0 returns a list of routes" do
    # Setup
    expect(Mock, :get_json, fn url, _ ->
      assert url == "/routes/"

      []
    end)

    # Exercise
    routes = Routes.all()

    # Verify
    assert routes == []
  end

  test "get/1 returns a route" do
    # Setup
    id = Faker.Internet.slug()

    expect(Mock, :get_json, fn url, _ ->
      assert url == "/routes/#{id}"

      %{}
    end)

    # Exercise
    route = Routes.get(id)

    # Verify
    assert route == %{}
  end

  test "by_type/1 sends type as query parameter" do
    # Setup
    type = :rand.uniform(100)

    expect(Mock, :get_json, fn url, params ->
      assert url == "/routes/"
      assert Enum.sort(params) == Enum.sort(type: type)

      []
    end)

    # Exercise
    routes = Routes.by_type(type)

    # Verify
    assert routes == []
  end

  test "by_stop/1 sends stop as query parameter" do
    # Setup
    stop = Faker.Team.creature() |> String.downcase()

    expect(Mock, :get_json, fn url, params ->
      assert url == "/routes/"
      assert Enum.sort(params) == Enum.sort(stop: stop)

      []
    end)

    # Exercise
    routes = Routes.by_stop(stop)

    # Verify
    assert routes == []
  end
end
