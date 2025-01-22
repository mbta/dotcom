defmodule MBTA.Api.StreamTest do
  use ExUnit.Case, async: false

  alias MBTA.Api.Stream

  describe "build_options" do
    test "includes api key" do
      Application.put_env(:dotcom, :mbta_api,
        base_url: "foo",
        headers: [
          {"x-api-key", "bar"}
        ]
      )

      opts = Stream.build_options(path: "/vehicles")
      assert Keyword.get(opts, :url) =~ "/vehicles"
      assert [{"x-api-key", <<_::binary>>}] = Keyword.get(opts, :headers)
    end

    test "throws error if mbta api base url is missing" do
      Application.put_env(:dotcom, :mbta_api, base_url: nil)

      assert_raise ArgumentError, "Missing required configuration for MBTA API", fn ->
        Stream.build_options(path: "/vehicles")
      end
    end

    test "throws error if mbta api key is missing" do
      Application.put_env(:dotcom, :mbta_api,
        headers: [
          {"MBTA-Version", "2019-07-01"},
          {"x-api-key", nil},
          {"x-enable-experimental-features", "true"}
        ]
      )

      assert_raise ArgumentError, "Missing required configuration for MBTA API", fn ->
        Stream.build_options(path: "/vehicles")
      end
    end
  end

  describe "start_link" do
    @tag :external
    test "handles api events" do
      {:ok, sses} =
        [path: "/vehicles"]
        |> Stream.build_options()
        |> ServerSentEventStage.start_link()

      {:ok, pid} = Stream.start_link(name: __MODULE__, subscribe_to: sses)

      types = [:add, :remove, :reset, :update]

      known_events? =
        [pid]
        |> GenStage.stream()
        |> Enum.take(4)
        |> Enum.all?(fn %Stream.Event{event: type} -> Enum.member?(types, type) end)

      assert known_events?
    end
  end

  describe "handle_events/3" do
    test "sets all known events" do
      # Setup
      Enum.each([:add, :remove, :reset, :update], fn type ->
        # Exercise
        event = %ServerSentEventStage.Event{data: %{}, event: Atom.to_string(type)}
        result = [event] |> Stream.handle_events(nil, nil) |> Kernel.elem(1) |> List.first()

        # Verify
        assert Map.get(result, :event) == type
      end)
    end

    test "sets an unknown event" do
      # Setup
      event = %ServerSentEventStage.Event{data: %{}, event: "foo"}

      # Exercise
      result = Stream.handle_events([event], nil, nil)

      # Verify
      assert result == {:noreply, [%Stream.Event{data: {:error, :invalid}, event: :unknown}], nil}
    end
  end
end
