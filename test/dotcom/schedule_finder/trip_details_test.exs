defmodule Dotcom.ScheduleFinder.TripDetailsTest do
  use ExUnit.Case

  import Mox

  alias Dotcom.ScheduleFinder.TripDetails
  alias Dotcom.Utils.ServiceDateTime
  alias Test.Support.Factories
  alias Test.Support.FactoryHelpers
  alias Test.Support.Generators

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    stub(Stops.Repo.Mock, :get, fn id ->
      Factories.Stops.Stop.build(:stop, id: id, parent_id: nil)
    end)

    :ok
  end

  describe "trip_details/1" do
    test "maps predicted_schedules into TripDetails, sorted by stop_sequence" do
      trip = Factories.Schedules.Trip.build(:trip)
      stop_ids = Faker.Util.sample_uniq(3, fn -> FactoryHelpers.build(:id) end)
      stop_names = Faker.Util.sample_uniq(3, fn -> Faker.Beer.brand() end)

      stops =
        stop_ids
        |> Enum.zip(stop_names)
        |> Enum.map(fn {id, name} -> Factories.Stops.Stop.build(:stop, id: id, name: name) end)

      stop_sequences = Faker.Util.sample_uniq(3, fn -> Faker.random_between(0, 1000) end)

      predicted_schedules =
        stops
        |> Enum.zip(stop_sequences)
        |> Enum.map(fn {stop, stop_sequence} ->
          %PredictedSchedule{
            prediction:
              Factories.Predictions.Prediction.build(:prediction,
                trip: trip,
                stop: stop,
                stop_sequence: stop_sequence
              ),
            schedule:
              Factories.Schedules.Schedule.build(:schedule,
                trip: trip,
                stop: stop,
                stop_sequence: stop_sequence
              )
          }
        end)
        |> Enum.reverse()

      trip_details =
        TripDetails.trip_details(%{
          predicted_schedules: predicted_schedules,
          trip_vehicle: nil
        })

      assert trip_details.stops |> Enum.map(& &1.stop_id) == stop_ids
      assert trip_details.stops |> Enum.map(& &1.stop_name) == stop_names
      assert trip_details.stops |> Enum.map(& &1.stop_sequence) == stop_sequences
    end

    test "returns {:status, status} as the time field for subway when predictions have a status" do
      trip = Factories.Schedules.Trip.build(:trip)
      route = Factories.Routes.Route.build(:subway_route)
      status = Faker.Lorem.sentence()

      predicted_schedules =
        [
          %PredictedSchedule{
            prediction:
              Factories.Predictions.Prediction.build(:prediction,
                route: route,
                status: status,
                trip: trip
              ),
            schedule:
              Factories.Schedules.Schedule.build(
                :schedule,
                route: route,
                trip: trip
              )
          }
        ]

      trip_details =
        TripDetails.trip_details(%{
          predicted_schedules: predicted_schedules,
          trip_vehicle: nil
        })

      assert [trip_stop] = trip_details.stops
      assert trip_stop.time == {:status, status}
    end

    test "includes platform_names for bus routes in stops when applicable" do
      trip = Factories.Schedules.Trip.build(:trip)
      route = Factories.Routes.Route.build(:bus_route)

      platform_name = Faker.Pizza.sauce()
      platform_stop = Factories.Stops.Stop.build(:stop, platform_name: platform_name)
      platform_stop_id = platform_stop.id

      stub(Stops.Repo.Mock, :get, fn
        ^platform_stop_id -> platform_stop
        _ -> Factories.Stops.Stop.build(:stop)
      end)

      predicted_schedules =
        [
          %PredictedSchedule{
            prediction:
              Factories.Predictions.Prediction.build(:prediction,
                platform_stop_id: platform_stop_id,
                route: route,
                trip: trip
              ),
            schedule:
              Factories.Schedules.Schedule.build(
                :schedule,
                route: route,
                trip: trip
              )
          }
        ]

      trip_details =
        TripDetails.trip_details(%{
          predicted_schedules: predicted_schedules,
          trip_vehicle: nil
        })

      assert [trip_stop] = trip_details.stops
      assert trip_stop.platform_name == platform_name
    end

    test "does not include platform_names for subway routes" do
      trip = Factories.Schedules.Trip.build(:trip)
      route = Factories.Routes.Route.build(:subway_route)

      platform_name = Faker.Pizza.sauce()
      platform_stop = Factories.Stops.Stop.build(:stop, platform_name: platform_name)
      platform_stop_id = platform_stop.id

      stub(Stops.Repo.Mock, :get, fn
        ^platform_stop_id -> platform_stop
        _ -> Factories.Stops.Stop.build(:stop)
      end)

      predicted_schedules =
        [
          %PredictedSchedule{
            prediction:
              Factories.Predictions.Prediction.build(:prediction,
                platform_stop_id: platform_stop_id,
                route: route,
                trip: trip
              ),
            schedule:
              Factories.Schedules.Schedule.build(
                :schedule,
                route: route,
                trip: trip
              )
          }
        ]

      trip_details =
        TripDetails.trip_details(%{
          predicted_schedules: predicted_schedules,
          trip_vehicle: nil
        })

      assert [trip_stop] = trip_details.stops
      assert trip_stop.platform_name == nil
    end

    test "marks a prediction with no time as cancelled" do
      now = Dotcom.Utils.DateTime.now()

      trip = Factories.Schedules.Trip.build(:trip)
      stop_ids = Faker.Util.sample_uniq(3, fn -> FactoryHelpers.build(:id) end)
      stop_names = Faker.Util.sample_uniq(3, fn -> Faker.Beer.brand() end)

      [stop_1, stop_2, stop_3] =
        stop_ids
        |> Enum.zip(stop_names)
        |> Enum.map(fn {id, name} -> Factories.Stops.Stop.build(:stop, id: id, name: name) end)

      [arrival_time_1, arrival_time_2, arrival_time_3] =
        Faker.Util.sample_uniq(3, fn ->
          Generators.DateTime.random_time_range_date_time(
            {now, ServiceDateTime.end_of_service_day(now)}
          )
        end)
        |> Enum.sort(DateTime)

      predicted_schedules =
        [
          %PredictedSchedule{
            prediction:
              Factories.Predictions.Prediction.build(:prediction,
                arrival_time: arrival_time_1,
                stop: stop_1,
                trip: trip
              ),
            schedule: Factories.Schedules.Schedule.build(:schedule, trip: trip, stop: stop_1)
          },
          %PredictedSchedule{
            prediction:
              Factories.Predictions.Prediction.build(:prediction,
                arrival_time: nil,
                departure_time: nil,
                stop: stop_1,
                trip: trip
              ),
            schedule:
              Factories.Schedules.Schedule.build(:schedule,
                trip: trip,
                stop: stop_2,
                arrival_time: arrival_time_2
              )
          },
          %PredictedSchedule{
            prediction:
              Factories.Predictions.Prediction.build(:prediction,
                arrival_time: arrival_time_3,
                stop: stop_3,
                trip: trip
              ),
            schedule: Factories.Schedules.Schedule.build(:schedule, trip: trip, stop: stop_3)
          }
        ]

      trip_details =
        TripDetails.trip_details(%{
          predicted_schedules: predicted_schedules,
          trip_vehicle: nil
        })

      assert [trip_stop_1, trip_stop_2, trip_stop_3] = trip_details.stops

      refute trip_stop_1.cancelled?
      assert trip_stop_2.cancelled?
      refute trip_stop_3.cancelled?
    end

    test "includes vehicle status and stop info" do
      stop = Factories.Stops.Stop.build(:stop, parent_id: nil)
      stop_id = stop.id

      stub(Stops.Repo.Mock, :get, fn
        ^stop_id -> stop
        _ -> Factories.Stops.Stop.build(:stop)
      end)

      predicted_schedules =
        1..3
        |> Enum.map(fn _ ->
          %PredictedSchedule{
            prediction: Factories.Predictions.Prediction.build(:prediction),
            schedule: Factories.Schedules.Schedule.build(:schedule)
          }
        end)

      crowding = Faker.Util.pick([:not_crowded, :crowded, :some_crowding])
      vehicle = Factories.Vehicles.Vehicle.build(:vehicle, stop_id: stop_id, crowding: crowding)

      trip_details =
        TripDetails.trip_details(%{
          predicted_schedules: predicted_schedules,
          trip_vehicle: vehicle
        })

      vehicle_info = trip_details.vehicle_info
      assert vehicle_info.status == vehicle.status
      assert vehicle_info.stop_id == stop_id
      assert vehicle_info.stop_name == stop.name
      assert vehicle_info.crowding == crowding
    end

    test "uses a status of `:location_unavailable` if the vehicle has no stop_id" do
      predicted_schedules =
        1..3
        |> Enum.map(fn _ ->
          %PredictedSchedule{
            prediction: Factories.Predictions.Prediction.build(:prediction),
            schedule: Factories.Schedules.Schedule.build(:schedule)
          }
        end)

      vehicle = Factories.Vehicles.Vehicle.build(:vehicle, stop_id: nil)

      trip_details =
        TripDetails.trip_details(%{
          predicted_schedules: predicted_schedules,
          trip_vehicle: vehicle
        })

      vehicle_info = trip_details.vehicle_info
      assert vehicle_info.status == :location_unavailable
    end

    test "uses the parent stop id if available" do
      [child_stop_id, parent_stop_id] =
        Faker.Util.sample_uniq(2, fn -> FactoryHelpers.build(:id) end)

      stop = Factories.Stops.Stop.build(:stop, id: child_stop_id, parent_id: parent_stop_id)

      stub(Stops.Repo.Mock, :get, fn
        ^child_stop_id -> stop
        _ -> Factories.Stops.Stop.build(:stop)
      end)

      predicted_schedules =
        1..3
        |> Enum.map(fn _ ->
          %PredictedSchedule{
            prediction: Factories.Predictions.Prediction.build(:prediction),
            schedule: Factories.Schedules.Schedule.build(:schedule)
          }
        end)

      vehicle = Factories.Vehicles.Vehicle.build(:vehicle, stop_id: child_stop_id)

      trip_details =
        TripDetails.trip_details(%{
          predicted_schedules: predicted_schedules,
          trip_vehicle: vehicle
        })

      vehicle_info = trip_details.vehicle_info
      assert vehicle_info.status == vehicle.status
      assert vehicle_info.stop_id == parent_stop_id
      assert vehicle_info.stop_name == stop.name
    end
  end

  test "drops the first stop if the vehicle is currently stopped there" do
    trip = Factories.Schedules.Trip.build(:trip)

    stop_ids =
      [current_stop_id | future_stop_ids] =
      Faker.Util.sample_uniq(4, fn -> FactoryHelpers.build(:id) end)

    stop_names =
      [_current_stop_name | future_stop_names] =
      Faker.Util.sample_uniq(4, fn -> Faker.Beer.brand() end)

    stops =
      stop_ids
      |> Enum.zip(stop_names)
      |> Enum.map(fn {id, name} -> Factories.Stops.Stop.build(:stop, id: id, name: name) end)

    predicted_schedules =
      stops
      |> Enum.with_index()
      |> Enum.map(fn {stop, index} ->
        %PredictedSchedule{
          prediction:
            Factories.Predictions.Prediction.build(:prediction,
              trip: trip,
              stop: stop,
              stop_sequence: index
            ),
          schedule:
            Factories.Schedules.Schedule.build(:schedule,
              trip: trip,
              stop: stop,
              stop_sequence: index
            )
        }
      end)

    vehicle =
      Factories.Vehicles.Vehicle.build(:vehicle,
        status: :stopped,
        stop_id: current_stop_id,
        stop_sequence: 0
      )

    trip_details =
      TripDetails.trip_details(%{
        predicted_schedules: predicted_schedules,
        trip_vehicle: vehicle
      })

    assert trip_details.stops |> Enum.map(& &1.stop_id) == future_stop_ids
    assert trip_details.stops |> Enum.map(& &1.stop_name) == future_stop_names
  end

  test "drops earlier stops before the active vehicle" do
    trip = Factories.Schedules.Trip.build(:trip)

    stops = Faker.Util.sample_uniq(20, fn -> Factories.Stops.Stop.build(:stop) end)

    predicted_schedules =
      stops
      |> Enum.with_index()
      |> Enum.map(fn {stop, index} ->
        %PredictedSchedule{
          prediction:
            Factories.Predictions.Prediction.build(:prediction,
              trip: trip,
              stop: stop,
              stop_sequence: index
            ),
          schedule:
            Factories.Schedules.Schedule.build(:schedule,
              trip: trip,
              stop: stop,
              stop_sequence: index
            )
        }
      end)

    current_index = Faker.random_between(5, 15)
    {_earlier_stops, [current_stop | future_stops]} = stops |> Enum.split(current_index)

    vehicle =
      Factories.Vehicles.Vehicle.build(:vehicle,
        status: :stopped,
        stop_id: current_stop.id,
        stop_sequence: current_index,
        trip_id: trip.id
      )

    trip_details =
      TripDetails.trip_details(%{
        predicted_schedules: predicted_schedules,
        trip_vehicle: vehicle
      })

    assert trip_details.stops |> Enum.map(& &1.stop_id) == Enum.map(future_stops, & &1.id)
    assert trip_details.stops |> Enum.map(& &1.stop_name) == Enum.map(future_stops, & &1.name)
  end

  test "does not drop the 'current' stop if the vehicle is :in_transit or :incoming" do
    trip = Factories.Schedules.Trip.build(:trip)

    stops = Faker.Util.sample_uniq(20, fn -> Factories.Stops.Stop.build(:stop) end)

    predicted_schedules =
      stops
      |> Enum.with_index()
      |> Enum.map(fn {stop, index} ->
        %PredictedSchedule{
          prediction:
            Factories.Predictions.Prediction.build(:prediction,
              trip: trip,
              stop: stop,
              stop_sequence: index
            ),
          schedule:
            Factories.Schedules.Schedule.build(:schedule,
              trip: trip,
              stop: stop,
              stop_sequence: index
            )
        }
      end)

    current_index = Faker.random_between(5, 15)
    {_earlier_stops, [current_stop | future_stops]} = stops |> Enum.split(current_index)

    vehicle =
      Factories.Vehicles.Vehicle.build(:vehicle,
        status: Faker.Util.pick([:incoming, :in_transit]),
        stop_id: current_stop.id,
        stop_sequence: current_index,
        trip_id: trip.id
      )

    trip_details =
      TripDetails.trip_details(%{
        predicted_schedules: predicted_schedules,
        trip_vehicle: vehicle
      })

    assert trip_details.stops |> Enum.map(& &1.stop_id) == [
             current_stop.id | Enum.map(future_stops, & &1.id)
           ]

    assert trip_details.stops |> Enum.map(& &1.stop_name) == [
             current_stop.name | Enum.map(future_stops, & &1.name)
           ]
  end
end
