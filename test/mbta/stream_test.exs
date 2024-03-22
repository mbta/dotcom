defmodule MBTA.Api.StreamTest do
  use ExUnit.Case

  describe "build_options" do
    @tag :external
    test "includes api key" do
      opts = MBTA.Api.Stream.build_options(path: "/vehicles")
      assert Keyword.get(opts, :url) =~ "/vehicles"
      assert <<_::binary>> = Keyword.get(opts, :api_key)
    end
  end

  describe "start_link" do
    @tag :external
    test "handles api events" do
      {:ok, sses} =
        [path: "/vehicles"]
        |> MBTA.Api.Stream.build_options()
        |> ServerSentEventStage.start_link()

      {:ok, pid} = MBTA.Api.Stream.start_link(name: __MODULE__, subscribe_to: sses)

      types = [:add, :remove, :reset, :update]

      known_events? =
        [pid]
        |> GenStage.stream()
        |> Enum.take(4)
        |> Enum.all?(fn %MBTA.Api.Stream.Event{event: type} -> Enum.member?(types, type) end)

      assert known_events?
    end
  end
end
