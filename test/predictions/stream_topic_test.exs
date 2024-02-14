defmodule Predictions.StreamTopicTest do
  @moduledoc false

  use ExUnit.Case, async: false

  require Dotcom.Assertions

  import Mock
  import Predictions.StreamTopic

  alias Predictions.StreamTopic
  alias RoutePatterns.RoutePattern

  setup_with_mocks([
    {RoutePatterns.Repo, [], [by_stop_id: fn id -> mock_route_patterns(id) end]}
  ]) do
    :ok
  end

  describe "new/1" do
    test "works for stop id with route patterns" do
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

  defp mock_route_patterns("unserved_stop"), do: []

  defp mock_route_patterns(_id) do
    [
      %RoutePattern{route_id: "Route1", direction_id: 0},
      %RoutePattern{route_id: "Route1", direction_id: 1},
      %RoutePattern{route_id: "Route2", direction_id: 1}
    ]
  end
end
