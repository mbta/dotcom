defmodule SiteWeb.PredictionsChannelTest do
  use SiteWeb.ChannelCase

  import Test.Support.EnvHelpers

  alias Phoenix.Socket
  alias Predictions.Prediction
  alias Routes.Route
  alias SiteWeb.{PredictionsChannel, UserSocket}

  @route_39 "39"
  @prediction39 %Prediction{id: "prediction39", route: %Route{id: @route_39}}

  setup do
    reassign_env(:site, :predictions_subscribe_fn, fn route_id ->
      case route_id do
        @route_39 ->
          [@prediction39]

        _ ->
          []
      end
    end)

    socket = socket(UserSocket, "", %{})

    {:ok, socket: socket}
  end

  describe "join/3" do
    test "subscribes to predictions for a route ID and returns the current list of predictions",
         %{
           socket: socket
         } do
      assert {:ok, %{predictions: predictions}, %Socket{}} =
               subscribe_and_join(socket, PredictionsChannel, "predictions:#{@route_39}")

      assert predictions == [@prediction39]
    end
  end

  describe "handle_info/2" do
    test "pushes new data onto the socket", %{socket: socket} do
      predictions = [@prediction39]

      {:ok, _, socket} =
        subscribe_and_join(socket, PredictionsChannel, "predictions:#{@route_39}")

      assert {:noreply, _socket} =
               PredictionsChannel.handle_info(
                 {:new_predictions, predictions},
                 socket
               )

      assert_push("predictions", %{predictions: predictions})
    end
  end
end
