defmodule Predictions.StoreTest do
  @moduledoc false
  use ExUnit.Case, async: true
  import Predictions.Store
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop

  setup_all do
    _ = start_link(name: :test_store)
    :ok = Predictions.Store.update({:add, base_predictions()})
    :ok
  end

  describe "fetch/1" do
    test "fetches for key or keys" do
      trip1_predictions = fetch(trip: "t1")
      assert length(trip1_predictions) > 0
      assert Enum.all?(trip1_predictions, &(&1.trip.id == "t1"))

      other_predictions =
        fetch(route: "purple", trip: "t4", stop: "s2", vehicle_id: "v3", direction: 1)

      assert Enum.all?(
               other_predictions,
               &(&1.trip.id == "t4" && &1.route.id == "purple" && &1.stop.id == "s2" &&
                   &1.vehicle_id == "v3" && &1.direction_id == 1)
             )
    end
  end

  describe "clear/1" do
    test "removes all predictions for a specified route and direction" do
      predictions = fetch(route: "yellow", direction: 1)
      assert length(predictions) > 0
      clear(route: "yellow", direction: 1)
      new_predictions = fetch(route: "yellow", direction: 1)
      refute length(new_predictions) > 0
    end
  end

  describe "update/1" do
    test "adds predictions" do
      assert [] = fetch(prediction_id: "added")
      update({:add, [%Prediction{id: "added"}]})
      assert [%Prediction{id: "added"}] = fetch(prediction_id: "added")
    end

    test "updates predictions" do
      update({:add, [%Prediction{id: "new", stop: %Stop{id: "s1"}}]})

      assert [%Prediction{id: "new", stop: %Stop{id: "s1"}}] = fetch(prediction_id: "new")

      update({:update, [%Prediction{id: "new", stop: %Stop{id: "s3"}}]})

      assert [%Prediction{id: "new", stop: %Stop{id: "s3"}}] = fetch(prediction_id: "new")
    end
  end

  defp base_routes do
    ["red", "orange", "yellow", "green", "blue", "purple"]
    |> Enum.map(&%Route{id: &1})
  end

  defp base_trips do
    ["t1", "t2", "t3", "t4", "t5"]
    |> Enum.map(&%Trip{id: &1})
  end

  defp base_stops do
    ["s1", "s2", "s3", "s4", "s5", "s6"]
    |> Enum.map(&%Stop{id: &1})
  end

  defp base_predictions do
    for r <- base_routes(),
        t <- base_trips(),
        s <- base_stops(),
        v <- ["v1", "v2", "v3", "v4"],
        d <- [0, 1],
        do: %Prediction{
          id: "prediction-#{r.id}-#{d}-#{s.id}-#{v}-#{t.id}",
          route: r,
          trip: t,
          stop: s,
          vehicle_id: v,
          direction_id: d
        }
  end
end
