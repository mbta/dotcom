defmodule DotcomWeb.Schedule.PredictionsTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Schedule.Predictions
  import Mox
  import Test.Support.Factories.Predictions.Prediction

  setup %{conn: conn} do
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    conn =
      conn
      |> assign(:date, ~D[2017-01-01])
      |> assign(:date_time, ~N[2017-01-01T12:00:00])

    {:ok, %{conn: conn}}
  end

  describe "all_predictions/1" do
    test "when given a date that isn't the service date, assigns no predictions", %{conn: conn} do
      conn =
        conn
        |> assign(:date, ~D[2016-12-31])
        |> assign(:origin, Faker.Pokemon.location())
        |> all_predictions()

      assert conn.assigns[:predictions] == []
      assert conn.assigns[:vehicle_predictions] == []
    end

    test "when there is no origin, assigns no predictions", %{conn: conn} do
      conn =
        conn
        |> assign(:origin, nil)
        |> all_predictions()

      assert conn.assigns[:predictions] == []
      assert conn.assigns[:vehicle_predictions] == []
    end

    test "assigns predictions for a route, stop, and direction ID", %{conn: conn} do
      route_id = "#{Faker.Util.digit()}"
      direction_id = "#{Faker.Util.digit()}"

      expect(Predictions.Repo.Mock, :all, fn [route: ^route_id, direction_id: ^direction_id] ->
        build_list(1, :prediction, %{})
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: Faker.Pokemon.location()})
        |> assign(:destination, nil)
        |> assign(:route, %{id: route_id})
        |> assign(:direction_id, direction_id)
        |> all_predictions()

      assert conn.assigns[:predictions] == []
    end

    test "ignores predictions which have the origin as their destination", %{conn: conn} do
      stop_id = Faker.Pokemon.location()
      trip_id = Faker.random_between(1000, 9999)

      expect(Predictions.Repo.Mock, :all, fn _ ->
        build_list(1, :prediction, %{
          time: ~N[2017-01-01T00:00:00],
          stop: %Stops.Stop{id: stop_id},
          trip: trip_id,
          departing?: false
        })
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: stop_id})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "#{Faker.Util.digit()}"})
        |> assign(:direction_id, "#{Faker.Util.digit()}")
        |> all_predictions()

      assert conn.assigns.predictions == []
    end

    test "does not ignore predictions which have a trip id but not status", %{conn: conn} do
      stop_id = Faker.Pokemon.location()

      prediction =
        build(:prediction, %{
          time: ~N[2017-01-01T00:00:00],
          stop: %Stops.Stop{id: stop_id},
          trip: Faker.random_between(1000, 9999),
          departing?: true
        })

      expect(Predictions.Repo.Mock, :all, fn _ ->
        [prediction]
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: stop_id})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "#{Faker.Util.digit()}"})
        |> assign(:direction_id, "#{Faker.Util.digit()}")
        |> all_predictions()

      assert conn.assigns.predictions == [prediction]
    end

    test "does not ignore predictions which have a status but not a trip id", %{conn: conn} do
      stop_id = Faker.Pokemon.location()

      prediction =
        build(:prediction, %{
          time: ~N[2017-01-01T00:00:00],
          stop: %Stops.Stop{id: stop_id},
          status: "On Time",
          trip: nil,
          departing?: true
        })

      expect(Predictions.Repo.Mock, :all, fn _ ->
        [prediction]
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: stop_id})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "#{Faker.Util.digit()}"})
        |> assign(:direction_id, "#{Faker.Util.digit()}")
        |> all_predictions()

      assert conn.assigns.predictions == [prediction]
    end

    test "ignores predictions which do not have a trip id or a status", %{conn: conn} do
      stop_id = Faker.Pokemon.location()

      prediction =
        build(:prediction, %{
          time: ~N[2017-01-01T00:00:00],
          stop: %Stops.Stop{id: stop_id},
          status: nil,
          trip: nil,
          departing?: true
        })

      expect(Predictions.Repo.Mock, :all, fn _ ->
        [prediction]
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: stop_id})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "#{Faker.Util.digit()}"})
        |> assign(:direction_id, "#{Faker.Util.digit()}")
        |> all_predictions()

      assert conn.assigns.predictions == []
    end

    test "keeps predictions without a time", %{conn: conn} do
      stop_id = Faker.Pokemon.location()

      prediction =
        build(:prediction, %{
          stop: %Stops.Stop{id: stop_id},
          trip: Faker.random_between(1000, 9999),
          status: "",
          departing?: true
        })

      expect(Predictions.Repo.Mock, :all, fn _ ->
        [prediction]
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: stop_id})
        |> assign(:destination, nil)
        |> assign(:route, %{id: "#{Faker.Util.digit()}"})
        |> assign(:direction_id, "#{Faker.Util.digit()}")
        |> all_predictions()

      assert conn.assigns.predictions == [prediction]
    end

    test "otherwise, assigns no predictions", %{conn: conn} do
      expect(Predictions.Repo.Mock, :all, fn _ ->
        []
      end)

      conn =
        conn
        |> all_predictions()

      assert conn.assigns[:predictions] == []
    end

    test "destination predictions are assigned if destination is assigned", %{conn: conn} do
      route_id = "#{Faker.Util.digit()}"

      expect(Predictions.Repo.Mock, :all, fn [route: ^route_id] ->
        build_list(1, :prediction, %{})
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: Faker.Pokemon.location()})
        |> assign(:destination, %Stops.Stop{id: Faker.Pokemon.location()})
        |> assign(:route, %{id: route_id})
        |> assign(:direction_id, "#{Faker.Util.digit()}")
        |> all_predictions()

      assert conn.assigns[:predictions] == []
    end

    @tag :flaky
    test "assigns a list containing predictions for every stop with a vehicle at it", %{
      conn: conn
    } do
      stop_id_1 = Faker.Pokemon.location()
      stop_id_2 = Faker.Pokemon.location()
      route_id = "#{Faker.Util.digit()}"
      trip_id_1 = "#{Faker.Internet.slug()}"
      trip_id_2 = "#{Faker.Internet.slug()}"

      vehicle_locations = %{
        {trip_id_1, stop_id_1} => %Vehicles.Vehicle{
          trip_id: trip_id_1,
          stop_id: stop_id_1,
          status: :incoming
        },
        {trip_id_2, stop_id_2} => %Vehicles.Vehicle{
          trip_id: trip_id_2,
          stop_id: stop_id_2,
          status: :stopped
        }
      }

      prediction_1 = build(:prediction, %{stop: %Stops.Stop{id: stop_id_1}})
      prediction_2 = build(:prediction, %{stop: %Stops.Stop{id: stop_id_2}})

      trip_id_match = Enum.join(Enum.sort([trip_id_1, trip_id_2]), ",")

      Predictions.Repo.Mock
      |> expect(:all, fn arg ->
        assert arg[:route] == route_id
        []
      end)
      |> expect(:all, fn arg ->
        assert arg[:trip] == trip_id_match
        # we transform the data into this form so that we only need to make one repo call
        [prediction_1, prediction_2]
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: Faker.Pokemon.location()})
        |> assign(:destination, %Stops.Stop{id: Faker.Pokemon.location()})
        |> assign(:route, %{id: route_id})
        |> assign(:direction_id, "#{Faker.Util.digit()}")
        |> assign(:vehicle_locations, vehicle_locations)
        |> all_predictions()

      assert conn.assigns.vehicle_predictions == [
               prediction_1,
               prediction_2
             ]
    end

    @tag :flaky
    test "does not make duplicate requests for vehicles at the same stop", %{conn: conn} do
      stop_id_1 = Faker.Pokemon.location()
      route_id = "#{Faker.Util.digit()}"
      trip_id_1 = "#{Faker.Internet.slug()}"
      trip_id_2 = "#{Faker.Internet.slug()}"

      vehicle_locations = %{
        {trip_id_1, stop_id_1} => %Vehicles.Vehicle{
          trip_id: trip_id_1,
          stop_id: stop_id_1,
          status: :incoming
        },
        {trip_id_2, stop_id_1} => %Vehicles.Vehicle{
          trip_id: trip_id_2,
          stop_id: stop_id_1,
          status: :stopped
        }
      }

      prediction = build(:prediction, %{stop: %Stops.Stop{id: stop_id_1}})

      Predictions.Repo.Mock
      |> expect(:all, fn arg ->
        assert arg[:route] == route_id
        []
      end)
      |> expect(:all, fn arg ->
        assert arg[:trip] == Enum.join(Enum.sort([trip_id_1, trip_id_2]), ",")
        # we transform the data into this form so that we only need to make one repo call
        [
          prediction
        ]
      end)

      conn =
        conn
        |> assign(:origin, %Stops.Stop{id: Faker.Pokemon.location()})
        |> assign(:destination, %Stops.Stop{id: Faker.Pokemon.location()})
        |> assign(:route, %{id: route_id})
        |> assign(:direction_id, Faker.Util.pick([0, 1]))
        |> assign(:vehicle_locations, vehicle_locations)
        |> all_predictions()

      assert conn.assigns.vehicle_predictions == [
               prediction
             ]
    end

    test "assigns empty lists if the predictions return an error", %{conn: conn} do
      route_id = "#{Faker.Util.digit()}"

      expect(Predictions.Repo.Mock, :all, fn [route: ^route_id] ->
        {:error, :no_predictions}
      end)

      conn = all_predictions(conn)

      assert conn.assigns.predictions == []
      assert conn.assigns.vehicle_predictions == []
    end
  end
end
