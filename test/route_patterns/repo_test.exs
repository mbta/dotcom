defmodule RoutePatterns.RepoTest do
  use ExUnit.Case, async: true

  import Mox
  import Test.Support.Factories.MBTA.Api

  alias MBTA.Api.Mock
  alias RoutePatterns.RoutePattern

  setup :verify_on_exit!

  describe "get" do
    test "returns a single route pattern" do
      id = Faker.Internet.slug()

      expect(Mock, :get_json, fn path, _ ->
        assert path == "/route_patterns/" <> id

        %JsonApi{
          data: [
            build(:route_pattern_item, id: id)
          ]
        }
      end)

      assert %RoutePattern{id: ^id} = RoutePatterns.Repo.get(id)
    end

    test "returns nil for an unknown route pattern" do
      id = Faker.Internet.slug()

      expect(Mock, :get_json, fn path, _ ->
        assert path == "/route_patterns/" <> id
        {:error, :not_found}
      end)

      refute RoutePatterns.Repo.get(id)
    end
  end

  describe "by_route_id" do
    test "returns route patterns for a route" do
      expect(Mock, :get_json, fn "/route_patterns/", opts ->
        assert Keyword.get(opts, :route) == "Red"
        %JsonApi{data: build_list(3, :route_pattern_item)}
      end)

      assert [%RoutePattern{} | _] = RoutePatterns.Repo.by_route_id("Red")
    end

    test "handles the Green Line" do
      expect(Mock, :get_json, fn "/route_patterns/", opts ->
        assert Keyword.get(opts, :route) == "Green-B,Green-C,Green-D,Green-E"
        %JsonApi{data: build_list(3, :route_pattern_item)}
      end)

      RoutePatterns.Repo.by_route_id("Green")
    end
  end

  describe "by_stop_id/1" do
    test "requests route patterns for a stop with shape and stops" do
      expect(Mock, :get_json, fn "/route_patterns/", opts ->
        assert Keyword.get(opts, :include) ==
                 "representative_trip.shape,representative_trip.stops"

        %JsonApi{data: []}
      end)

      RoutePatterns.Repo.by_stop_id("place-nonsense")
    end
  end

  test "logs API errors" do
    expect(Mock, :get_json, fn "/route_patterns/", _ ->
      {:error, "some API mishap"}
    end)

    log =
      ExUnit.CaptureLog.capture_log(fn ->
        assert RoutePatterns.Repo.by_stop_id("place-sstat") == []
      end)

    assert log =~ "[warning] module=Elixir.RoutePatterns.Repo"
    assert log =~ "some API mishap"
  end
end
