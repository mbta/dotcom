defmodule MBTA.Api.StreamTest do
  use ExUnit.Case, async: false

  alias MBTA.Api.Stream

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
        result = Stream.handle_events([event], nil, nil) |> Kernel.elem(1) |> List.first()

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
