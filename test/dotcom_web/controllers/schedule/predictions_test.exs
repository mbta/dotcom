defmodule DotcomWeb.ScheduleController.PredictionsTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.ScheduleController.Predictions
  import Mox
  alias Predictions.Prediction

  @empty [%Prediction{}]

  setup %{conn: conn} do
    conn =
      conn
      |> assign(:date, ~D[2017-01-01])
      |> assign(:date_time, ~N[2017-01-01T12:00:00])

    {:ok, %{conn: conn}}
  end

  describe "call/2" do
    test "when given a date that isn't the service date, assigns no predictions", %{conn: conn} do
      conn =
        conn
        |> assign(:date, ~D[2016-12-31])
        |> assign(:origin, Faker.Pokemon.location())
        |> call()

      assert conn.assigns[:predictions] == []
      assert conn.assigns[:vehicle_predictions] == []
    end

    test "when there is no origin, assigns no predictions", %{conn: conn} do
      conn =
        conn
        |> assign(:origin, nil)
        |> call()

      assert conn.assigns[:predictions] == []
      assert conn.assigns[:vehicle_predictions] == []
    end

    test "assigns predictions for a route, stop, and direction ID", %{conn: conn} do
      expect(Predictions.Repo.Mock, :all, fn [route: "4", direction_id: "0"] ->
        @empty
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "place-sstat"})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "4"})
        |> assign(:direction_id, "0")
        |> call()

      assert conn.assigns[:predictions] == []
    end

    test "ignores predictions which have the origin as their destination", %{conn: conn} do
      expect(Predictions.Repo.Mock, :all, fn _ ->
        [
          %Predictions.Prediction{
            time: ~N[2017-01-01T00:00:00],
            stop: %Stops.Stop{id: "origin"},
            trip: 1234,
            departing?: false
          }
        ]
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "origin"})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "4"})
        |> assign(:direction_id, "0")
        |> call()

      assert conn.assigns.predictions == []
    end

    test "does not ignore predictions which have a trip id but not status", %{conn: conn} do
      prediction = %Predictions.Prediction{
        time: ~N[2017-01-01T00:00:00],
        stop: %Stops.Stop{id: "origin"},
        status: nil,
        trip: 1234,
        departing?: true
      }

      expect(Predictions.Repo.Mock, :all, fn _ ->
        [prediction]
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "origin"})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "4"})
        |> assign(:direction_id, "0")
        |> call()

      assert conn.assigns.predictions == [prediction]
    end

    test "does not ignore predictions which have a status but not a trip id", %{conn: conn} do
      prediction = %Predictions.Prediction{
        time: ~N[2017-01-01T00:00:00],
        stop: %Stops.Stop{id: "origin"},
        status: "On Time",
        trip: nil,
        departing?: true
      }

      expect(Predictions.Repo.Mock, :all, fn _ ->
        [prediction]
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "origin"})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "4"})
        |> assign(:direction_id, "0")
        |> call()

      assert conn.assigns.predictions == [prediction]
    end

    test "ignores predictions which do not have a trip id or a status", %{conn: conn} do
      prediction = %Predictions.Prediction{
        time: ~N[2017-01-01T00:00:00],
        stop: %Stops.Stop{id: "origin"},
        status: nil,
        trip: nil,
        departing?: true
      }

      expect(Predictions.Repo.Mock, :all, fn _ ->
        [prediction]
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "origin"})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "4"})
        |> assign(:direction_id, "0")
        |> call()

      assert conn.assigns.predictions == []
    end

    test "keeps predictions without a time", %{conn: conn} do
      prediction = %Predictions.Prediction{
        stop: %Stops.Stop{id: "origin"},
        trip: 1234,
        status: "",
        departing?: true
      }

      expect(Predictions.Repo.Mock, :all, fn _ ->
        [prediction]
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "origin"})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "4"})
        |> assign(:direction_id, "0")
        |> call()

      assert conn.assigns.predictions == [prediction]
    end

    test "otherwise, assigns no predictions", %{conn: conn} do
      expect(Predictions.Repo.Mock, :all, fn _ ->
        []
      end)

      conn =
        conn
        |> call()

      assert conn.assigns[:predictions] == []
    end

    test "destination predictions are assigned if destination is assigned", %{conn: conn} do
      expect(Predictions.Repo.Mock, :all, fn [route: "66"] ->
        @empty
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "1148"})
        |> assign(:destination, %Stops.Stop{id: "21148"})
        |> assign(:route, %{id: "66"})
        |> assign(:direction_id, "0")
        |> call()

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

      Predictions.Repo.Mock
      |> expect(:all, fn [route: "66"] -> [] end)
      |> expect(:all, fn [trip: "1,2"] ->
        # we transform the data into this form so that we only need to make one repo call
        [
          %Prediction{stop: %Stops.Stop{id: "place-sstat"}},
          %Prediction{stop: %Stops.Stop{id: "place-north"}}
        ]
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "1148"})
        |> assign(:destination, %Stops.Stop{id: "21148"})
        |> assign(:route, %{id: "66"})
        |> assign(:direction_id, "0")
        |> assign(:vehicle_locations, vehicle_locations)
        |> call()

      assert conn.assigns.vehicle_predictions == [
               %Prediction{stop: %Stops.Stop{id: "place-sstat"}},
               %Prediction{stop: %Stops.Stop{id: "place-north"}}
             ]
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

      Predictions.Repo.Mock
      |> expect(:all, fn [route: "66"] -> [] end)
      |> expect(:all, fn [trip: "1,2"] ->
        # we transform the data into this form so that we only need to make one repo call
        [
          %Prediction{stop: %Stops.Stop{id: "place-sstat"}}
        ]
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: "1148"})
        |> assign(:destination, %Stops.Stop{id: "21148"})
        |> assign(:route, %{id: "66"})
        |> assign(:direction_id, "0")
        |> assign(:vehicle_locations, vehicle_locations)
        |> call()

      assert conn.assigns.vehicle_predictions == [
               %Prediction{stop: %Stops.Stop{id: "place-sstat"}}
             ]
    end

    test "assigns empty lists if the predictions return an error", %{conn: conn} do
      expect(Predictions.Repo.Mock, :all, fn [route: "66"] ->
        {:error, :no_predictions}
      end)

      conn = call(conn)

      assert conn.assigns.predictions == []
      assert conn.assigns.vehicle_predictions == []
    end
  end
end
