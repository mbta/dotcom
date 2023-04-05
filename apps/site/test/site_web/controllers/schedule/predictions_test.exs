defmodule SiteWeb.ScheduleController.PredictionsTest do
  use SiteWeb.ConnCase, async: true

  import SiteWeb.ScheduleController.Predictions
  alias Predictions.Prediction

  defmodule PredictionsTest do
    # needs to be a separate module so that it's defined before the test uses
    # it
    def all(_) do
      []
    end
  end

  @empty [%Prediction{}]

  @opts init(predictions_fn: &PredictionsTest.all/1)

  setup %{conn: conn} do
    conn =
      conn
      |> assign(:date, ~D[2017-01-01])
      |> assign(:date_time, ~N[2017-01-01T12:00:00])

    {:ok, %{conn: conn}}
  end

  describe "init/1" do
    test "defaults to using Predictions.Repo.all" do
      assert init([]) == [predictions_fn: &Predictions.Repo.all/1]
    end
  end

  describe "call/2" do
    test "when given a date that isn't the service date, assigns no predictions", %{conn: conn} do
      conn =
        conn
        |> assign(:date, ~D[2016-12-31])
        |> call(@opts)

      assert conn.assigns[:predictions] == []
      assert conn.assigns[:vehicle_predictions] == []
    end

    test "assigns predictions for a route, stop, and direction ID", %{conn: conn} do
      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "place-sstat"})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "4"})
        |> assign(:direction_id, "0")
        |> call(
          predictions_fn: fn [route: "4", stop: "place-sstat", direction_id: "0"] -> @empty end
        )

      assert conn.assigns[:predictions] == []
    end

    test "ignores predictions which have the origin as their destination", %{conn: conn} do
      prediction = %Predictions.Prediction{
        time: ~N[2017-01-01T00:00:00],
        stop: %Stops.Stop{id: "origin"},
        trip: 1234,
        departing?: false
      }

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "origin"})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "4"})
        |> assign(:direction_id, "0")
        |> call(predictions_fn: fn _ -> [prediction] end)

      assert conn.assigns.predictions == []
    end

    test "does not ignore predictions which have a trip id but not status", %{conn: conn} do
      prediction = %Predictions.Prediction{
        time: ~N[2017-01-01T00:00:00],
        stop: %Stops.Stop{id: "destination"},
        status: nil,
        trip: 1234,
        departing?: false
      }

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "origin"})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "4"})
        |> assign(:direction_id, "0")
        |> call(predictions_fn: fn _ -> [prediction] end)

      assert conn.assigns.predictions == [prediction]
    end

    test "does not ignore predictions which have a status but not a trip id", %{conn: conn} do
      prediction = %Predictions.Prediction{
        time: ~N[2017-01-01T00:00:00],
        stop: %Stops.Stop{id: "destination"},
        status: "On Time",
        trip: nil,
        departing?: false
      }

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "origin"})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "4"})
        |> assign(:direction_id, "0")
        |> call(predictions_fn: fn _ -> [prediction] end)

      assert conn.assigns.predictions == [prediction]
    end

    test "ignores predictions which do not have a trip id or a status", %{conn: conn} do
      prediction = %Predictions.Prediction{
        time: ~N[2017-01-01T00:00:00],
        stop: %Stops.Stop{id: "destination"},
        status: nil,
        trip: nil,
        departing?: false
      }

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "origin"})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "4"})
        |> assign(:direction_id, "0")
        |> call(predictions_fn: fn _ -> [prediction] end)

      assert conn.assigns.predictions == []
    end

    test "keeps predictions without a time", %{conn: conn} do
      prediction = %Predictions.Prediction{
        stop: %Stops.Stop{id: "origin"},
        trip: 1234,
        departing?: false
      }

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "origin"})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "4"})
        |> assign(:direction_id, "0")
        |> call(predictions_fn: fn _ -> [prediction] end)

      assert conn.assigns.predictions == [prediction]
    end

    test "otherwise, assigns no predictions", %{conn: conn} do
      conn =
        conn
        |> call(@opts)

      assert conn.assigns[:predictions] == []
    end

    test "destination predictions are assigned if destination is assigned", %{conn: conn} do
      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "1148"})
        |> assign(:destination, %Stops.Stop{id: "21148"})
        |> assign(:route, %{id: "66"})
        |> assign(:direction_id, "0")
        |> call(predictions_fn: fn [route: "66", stop: "1148,21148"] -> @empty end)

      assert conn.assigns[:predictions] == []
    end

    test "assigns a list containing predictions for every stop with a vehicle at it", %{
      conn: conn
    } do
      vehicle_locations = %{
        {"1", "place-sstat"} => %Vehicles.Vehicle{
          trip_id: "1",
          stop_id: "place-sstat",
          status: :incoming
        },
        {"2", "place-north"} => %Vehicles.Vehicle{
          trip_id: "2",
          stop_id: "place-north",
          status: :stopped
        }
      }

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "1148"})
        |> assign(:destination, %Stops.Stop{id: "21148"})
        |> assign(:route, %{id: "66"})
        |> assign(:direction_id, "0")
        |> assign(:vehicle_locations, vehicle_locations)
        |> call(
          predictions_fn: fn
            [route: "66", stop: "1148,21148"] ->
              []

            # we transform the data into this form so that we only need to make one repo call
            [trip: "1,2", stop: "place-sstat,place-north"] ->
              @empty
          end
        )

      assert conn.assigns.vehicle_predictions == @empty
    end

    test "does not make duplicate requests for vehicles at the same stop", %{conn: conn} do
      vehicle_locations = %{
        {"1", "place-sstat"} => %Vehicles.Vehicle{
          trip_id: "1",
          stop_id: "place-sstat",
          status: :incoming
        },
        {"2", "place-sstat"} => %Vehicles.Vehicle{
          trip_id: "2",
          stop_id: "place-sstat",
          status: :stopped
        }
      }

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "1148"})
        |> assign(:destination, %Stops.Stop{id: "21148"})
        |> assign(:route, %{id: "66"})
        |> assign(:direction_id, "0")
        |> assign(:vehicle_locations, vehicle_locations)
        |> call(
          predictions_fn: fn
            [route: "66", stop: "1148,21148"] ->
              []

            # we transform the data into this form so that we only need to make one repo call
            [trip: "1,2", stop: "place-sstat"] ->
              @empty
          end
        )

      assert conn.assigns.vehicle_predictions == @empty
    end

    test "assigns empty lists if the predictions return an error", %{conn: conn} do
      predictions_fn = fn _ -> {:error, :no_predictions} end
      conn = call(conn, init(predictions_fn: predictions_fn))

      assert conn.assigns.predictions == []
      assert conn.assigns.vehicle_predictions == []
    end
  end
end
