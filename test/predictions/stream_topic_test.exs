defmodule Predictions.StreamTopicTest do
  @moduledoc false

  use ExUnit.Case, async: true

  import Mox
  import Predictions.StreamTopic
  import Test.Support.Factories.RoutePatterns.RoutePattern

  alias Predictions.StreamTopic
  alias RoutePatterns.Repo.Mock

  require Dotcom.Assertions

  setup :verify_on_exit!

  describe "new/1" do
    test "works for stop id with route patterns" do
      expect(Mock, :by_stop_id, fn "stopId" ->
        build_list(1, :route_pattern, route_id: "Route1", direction_id: 0)
      end)

      topic = "stop:stopId"

      assert %StreamTopic{
               topic: ^topic,
               fetch_keys: [stop: "stopId"],
               streams: streams
             } = new("stop:stopId")

      [{list, string} | _] = streams

      Dotcom.Assertions.assert_equal_lists(list, route: "Route1", direction: 0)

      assert string =~ "filter[direction_id]=0"
      assert string =~ "filter[route]=Route1"
    end

    test "doesn't work for stop without route patterns" do
      expect(Mock, :by_stop_id, fn "unserved_stop" ->
        []
      end)

      assert {:error, :no_streams_found} = new("stop:unserved_stop")
    end

    test "doesn't work for other topics" do
      bad_topics = [
        "trip:tripId",
        "route:routeId",
        "Red:0",
        ""
      ]

      for topic <- bad_topics do
        assert {:error, :unsupported_topic} = new(topic)
      end
    end
  end
end
