defmodule Dotcom.Predictions.EventBroadcasterTest do
  use ExUnit.Case, async: false

  import Mox
  alias Test.Support.Factories

  alias Dotcom.Predictions.EventBroadcaster
  alias Predictions.Prediction
  alias ServerSentEventStage.Event

  setup :verify_on_exit!

  setup do
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    stub(Routes.Repo.Mock, :get, fn _ -> Factories.Routes.Route.build(:route) end)
    # StreamParser.parse always calls Stops.Repo.get_parent/1, even when stop is nil.
    stub(Stops.Repo.Mock, :get, fn _ -> Factories.Stops.Stop.build(:stop) end)
    stub(Stops.Repo.Mock, :get_parent, fn _ -> Factories.Stops.Stop.build(:stop) end)
    stub(Schedules.Repo.Mock, :trip, fn _ -> Factories.Schedules.Trip.build(:trip) end)
    :ok
  end

  # Minimal prediction item in JSON:API map format (accepted by JsonApi.parse/1).
  defp prediction_item(id) do
    Factories.MBTA.Api.build(:raw_prediction_item, id: id)
  end

  @initial_state %{publish_to: nil, predictions: %{}}

  # ---------------------------------------------------------------------------
  # handle_events/3 — reset
  # ---------------------------------------------------------------------------

  describe "handle_events/3 - reset" do
    test "replaces all predictions and publishes them to publish_to" do
      event = %Event{
        event: "reset",
        data: Jason.encode!(%{"data" => [prediction_item("pred-1")]})
      }

      state = %{@initial_state | publish_to: self()}

      {:noreply, [], new_state} = EventBroadcaster.handle_events([event], nil, state)

      assert_receive {:predictions_update, %{predictions: predictions, events: events}}
      assert [%Prediction{id: "pred-1"}] = predictions
      assert [{"reset", [%Prediction{id: "pred-1"}]}] = events
      assert Map.has_key?(new_state.predictions, "pred-1")
    end

    test "clears any previously held predictions" do
      old = Factories.Predictions.Prediction.build(:prediction, id: "old")
      state = %{publish_to: self(), predictions: %{"old" => old}}

      event = %Event{
        event: "reset",
        data: Jason.encode!(%{"data" => [prediction_item("pred-1")]})
      }

      {:noreply, [], new_state} = EventBroadcaster.handle_events([event], nil, state)

      refute Map.has_key?(new_state.predictions, "old")
      assert Map.has_key?(new_state.predictions, "pred-1")
    end
  end

  # ---------------------------------------------------------------------------
  # handle_events/3 — add
  # ---------------------------------------------------------------------------

  describe "handle_events/3 - add" do
    test "inserts a new prediction into state and publishes it" do
      event = %Event{event: "add", data: Jason.encode!(%{"data" => prediction_item("pred-1")})}
      state = %{@initial_state | publish_to: self()}

      {:noreply, [], new_state} = EventBroadcaster.handle_events([event], nil, state)

      assert_receive {:predictions_update, %{predictions: predictions, events: events}}
      assert [%Prediction{id: "pred-1"}] = predictions
      assert [{"add", %Prediction{id: "pred-1"}}] = events
      assert Map.has_key?(new_state.predictions, "pred-1")
    end
  end

  # ---------------------------------------------------------------------------
  # handle_events/3 — update
  # ---------------------------------------------------------------------------

  describe "handle_events/3 - update" do
    test "replaces an existing prediction and publishes the new version" do
      event = %Event{event: "update", data: Jason.encode!(%{"data" => prediction_item("pred-1")})}
      state = %{@initial_state | publish_to: self()}

      {:noreply, [], new_state} = EventBroadcaster.handle_events([event], nil, state)

      assert_receive {:predictions_update, %{predictions: predictions, events: events}}
      assert [%Prediction{id: "pred-1"}] = predictions
      assert [{"update", %Prediction{id: "pred-1"}}] = events
      assert Map.has_key?(new_state.predictions, "pred-1")
    end
  end

  # ---------------------------------------------------------------------------
  # handle_events/3 — remove
  # ---------------------------------------------------------------------------

  describe "handle_events/3 - remove" do
    test "deletes a prediction from state and publishes the update" do
      existing = %Prediction{id: "pred-1"}
      state = %{publish_to: self(), predictions: %{"pred-1" => existing}}

      remove_item = %{
        "id" => "pred-1",
        "type" => "prediction",
        "attributes" => %{},
        "relationships" => %{}
      }

      event = %Event{event: "remove", data: Jason.encode!(%{"data" => remove_item})}

      {:noreply, [], new_state} = EventBroadcaster.handle_events([event], nil, state)

      assert_receive {:predictions_update,
                      %{predictions: [], events: [{"remove", %Prediction{id: "pred-1"}}]}}

      refute Map.has_key?(new_state.predictions, "pred-1")
    end

    test "publishes nil as the removed prediction when id is not in state" do
      state = %{@initial_state | publish_to: self()}

      remove_item = %{
        "id" => "nonexistent",
        "type" => "prediction",
        "attributes" => %{},
        "relationships" => %{}
      }

      event = %Event{event: "remove", data: Jason.encode!(%{"data" => remove_item})}

      {:noreply, [], _new_state} = EventBroadcaster.handle_events([event], nil, state)

      assert_receive {:predictions_update, %{events: [{"remove", nil}]}}
    end
  end

  # ---------------------------------------------------------------------------
  # handle_events/3 — unknown event type
  # ---------------------------------------------------------------------------

  describe "handle_events/3 - unknown event type" do
    test "handles gracefully without crashing and still sends an update" do
      event = %Event{event: "keep-alive", data: Jason.encode!(%{})}
      state = %{@initial_state | publish_to: self()}

      assert {:noreply, [], _new_state} = EventBroadcaster.handle_events([event], nil, state)
      assert_receive {:predictions_update, _}
    end

    test "does not modify the predictions in state" do
      existing = %Prediction{id: "pred-1"}
      state = %{publish_to: self(), predictions: %{"pred-1" => existing}}
      event = %Event{event: "unknown", data: Jason.encode!(%{})}

      {:noreply, [], new_state} = EventBroadcaster.handle_events([event], nil, state)

      assert Map.has_key?(new_state.predictions, "pred-1")
    end
  end

  # ---------------------------------------------------------------------------
  # handle_events/3 — error event
  # ---------------------------------------------------------------------------

  describe "handle_events/3 - error" do
    # The SSE stream sends an "error" event whose data is a JSON:API error
    # document.  The consumer has no dedicated clause for it, so it falls
    # through to the catch-all handler.  JsonApi.parse/1 recognises the
    # {"errors": [...]} shape and returns {:error, [%JsonApi.Error{...}]}.

    @error_data "{\"errors\":[{\"code\":\"internal_error\",\"status\":\"500\"}],\"jsonapi\":{\"version\":\"1.0\"}}\n"

    test "stops the process" do
      event = %Event{event: "error", data: @error_data}
      state = %{@initial_state | publish_to: self()}
      assert {:stop, _, _} = EventBroadcaster.handle_events([event], nil, state)
      refute_receive {:predictions_update, _}
    end
  end

  # ---------------------------------------------------------------------------
  # handle_events/3 — batch processing
  # ---------------------------------------------------------------------------

  describe "handle_events/3 - batch" do
    test "processes all events in one call and sends a single update" do
      events = [
        %Event{event: "add", data: Jason.encode!(%{"data" => prediction_item("pred-1")})},
        %Event{event: "add", data: Jason.encode!(%{"data" => prediction_item("pred-2")})}
      ]

      state = %{@initial_state | publish_to: self()}

      {:noreply, [], new_state} = EventBroadcaster.handle_events(events, nil, state)

      assert_receive {:predictions_update, %{predictions: predictions, events: event_list}}
      assert length(predictions) == 2
      assert length(event_list) == 2
      assert Map.has_key?(new_state.predictions, "pred-1")
      assert Map.has_key?(new_state.predictions, "pred-2")

      # Only one update message is sent per handle_events/3 call.
      refute_receive {:predictions_update, _}
    end
  end

  # ---------------------------------------------------------------------------
  # start_link/1
  # ---------------------------------------------------------------------------

  describe "start_link/1" do
    test "starts the consumer as a GenStage consumer process" do
      {:ok, producer} = GenStage.from_enumerable([])
      n = System.unique_integer([:positive])

      assert {:ok, pid} =
               EventBroadcaster.start_link(
                 publish_to: self(),
                 subscribe_to: producer,
                 name: :"test_consumer_#{n}"
               )

      assert Process.alive?(pid)
    end
  end
end
