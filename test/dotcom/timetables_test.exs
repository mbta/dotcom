defmodule Dotcom.TimetablesTest do
  use ExUnit.Case, async: true
  doctest Dotcom.Timetables

  import Mox

  alias Test.Support.FactoryHelpers
  alias Dotcom.Utils.ServiceDateTime
  alias Dotcom.Timetables
  alias Test.Support.{Factories, Generators}

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  describe "from_schedules/1" do
    test "returns an empty list of rows if there are no schedules" do
      assert %Timetables.Timetable{rows: []} = Timetables.from_schedules([])
    end

    test "serializes a single schedule into a single-cell timetable" do
      stop_1 = Factories.Stops.Stop.build(:stop)

      [time_1] = generate_times(1)
      trip = Factories.Schedules.Trip.build(:trip)

      schedules = [
        Factories.Schedules.Schedule.build(:schedule,
          trip: trip,
          departure_time: time_1,
          stop: stop_1
        )
      ]

      assert %Timetables.Timetable{
               rows: [
                 [entry_1]
               ]
             } = Timetables.from_schedules(schedules)

      assert entry_1.time == format!(time_1)
      assert entry_1.trip.id == trip.id
      assert entry_1.stop_id == stop_1.id
    end

    test "serializes a single trip into a single-column timetable" do
      stop_1 = Factories.Stops.Stop.build(:stop)
      stop_2 = Factories.Stops.Stop.build(:stop)

      [time_1, time_2] = generate_times(2)
      trip = Factories.Schedules.Trip.build(:trip)

      schedules =
        [
          Factories.Schedules.Schedule.build(:schedule,
            trip: trip,
            departure_time: time_1,
            stop: stop_1
          ),
          Factories.Schedules.Schedule.build(:schedule,
            trip: trip,
            departure_time: time_2,
            stop: stop_2
          )
        ]

      assert %Timetables.Timetable{
               rows: [
                 [entry_1],
                 [entry_2]
               ]
             } = Timetables.from_schedules(schedules)

      assert entry_1.time == format!(time_1)
      assert entry_1.trip.id == trip.id
      assert entry_1.stop_id == stop_1.id

      assert entry_2.time == format!(time_2)
      assert entry_2.trip.id == trip.id
      assert entry_2.stop_id == stop_2.id
    end

    test "sorts visits within a trip by time" do
      stop_1 = Factories.Stops.Stop.build(:stop)
      stop_2 = Factories.Stops.Stop.build(:stop)

      [time_1, time_2] = generate_times(2)
      trip = Factories.Schedules.Trip.build(:trip)

      schedules =
        [
          Factories.Schedules.Schedule.build(:schedule,
            trip: trip,
            departure_time: time_2,
            stop: stop_2
          ),
          Factories.Schedules.Schedule.build(:schedule,
            trip: trip,
            departure_time: time_1,
            stop: stop_1
          )
        ]

      assert %Timetables.Timetable{
               rows: [
                 [entry_1],
                 [entry_2]
               ]
             } = Timetables.from_schedules(schedules)

      assert entry_1.time == format!(time_1)
      assert entry_1.trip.id == trip.id
      assert entry_1.stop_id == stop_1.id

      assert entry_2.time == format!(time_2)
      assert entry_2.trip.id == trip.id
      assert entry_2.stop_id == stop_2.id
    end

    test "serializes visits to a single stop into a single-row timetable" do
      stop = Factories.Stops.Stop.build(:stop)

      [time_1, time_2] = generate_times(2)
      [trip_1, trip_2] = generate_trips(2)

      schedules = [
        Factories.Schedules.Schedule.build(:schedule,
          trip: trip_1,
          departure_time: time_1,
          stop: stop
        ),
        Factories.Schedules.Schedule.build(:schedule,
          trip: trip_2,
          departure_time: time_2,
          stop: stop
        )
      ]

      assert %Timetables.Timetable{
               rows: [
                 [entry_1, entry_2]
               ]
             } = Timetables.from_schedules(schedules)

      assert entry_1.time == format!(time_1)
      assert entry_1.trip.id == trip_1.id
      assert entry_1.stop_id == stop.id

      assert entry_2.time == format!(time_2)
      assert entry_2.trip.id == trip_2.id
      assert entry_2.stop_id == stop.id
    end

    test "sorts trips by first-stop time" do
      stop = Factories.Stops.Stop.build(:stop)

      [time_1, time_2] = generate_times(2)

      # For actual test coverage purposes, it doesn't matter what
      # order `trip_1` and `trip_2` are defined in, but empirically,
      # this test mostly passed even without the sorting logic when
      # these were assigned as `[trip_1, trip2]`.
      [trip_2, trip_1] = generate_trips(2)

      schedules = [
        Factories.Schedules.Schedule.build(:schedule,
          trip: trip_2,
          departure_time: time_2,
          stop: stop
        ),
        Factories.Schedules.Schedule.build(:schedule,
          trip: trip_1,
          departure_time: time_1,
          stop: stop
        )
      ]

      assert %Timetables.Timetable{
               rows: [
                 [entry_1, entry_2]
               ]
             } = Timetables.from_schedules(schedules)

      assert entry_1.time == format!(time_1)
      assert entry_1.trip.id == trip_1.id
      assert entry_1.stop_id == stop.id

      assert entry_2.time == format!(time_2)
      assert entry_2.trip.id == trip_2.id
      assert entry_2.stop_id == stop.id
    end

    test "inserts a blank cell when a trip does not visit the second stop" do
      stop_1 = Factories.Stops.Stop.build(:stop)
      stop_2 = Factories.Stops.Stop.build(:stop)

      [time_1_1, time_1_2, time_2_1] = generate_times(3)
      [trip_1, trip_2] = generate_trips(2)

      schedules = [
        Factories.Schedules.Schedule.build(:schedule,
          trip: trip_1,
          departure_time: time_1_1,
          stop: stop_1
        ),
        Factories.Schedules.Schedule.build(:schedule,
          trip: trip_1,
          departure_time: time_1_2,
          stop: stop_2
        ),
        Factories.Schedules.Schedule.build(:schedule,
          trip: trip_2,
          departure_time: time_2_1,
          stop: stop_1
        )
      ]

      assert %Timetables.Timetable{
               rows: [
                 [entry_1_1, entry_2_1],
                 [entry_1_2, entry_2_2]
               ]
             } = Timetables.from_schedules(schedules)

      assert entry_1_1.time == format!(time_1_1)
      assert entry_1_1.trip.id == trip_1.id
      assert entry_1_1.stop_id == stop_1.id

      assert entry_1_2.time == format!(time_1_2)
      assert entry_1_2.trip.id == trip_1.id
      assert entry_1_2.stop_id == stop_2.id

      assert entry_2_1.time == format!(time_2_1)
      assert entry_2_1.trip.id == trip_2.id
      assert entry_2_1.stop_id == stop_1.id

      assert entry_2_2.time == ""
      assert entry_2_2.trip.id == trip_2.id
      assert entry_2_2.stop_id == stop_2.id
    end

    test "inserts a blank cell when a trip does not visit the first stop" do
      stop_1 = Factories.Stops.Stop.build(:stop)
      stop_2 = Factories.Stops.Stop.build(:stop)

      [time_1_1, time_1_2, time_2_2] = generate_times(3)
      [trip_1, trip_2] = generate_trips(2)

      schedules = [
        Factories.Schedules.Schedule.build(:schedule,
          trip: trip_1,
          departure_time: time_1_1,
          stop: stop_1
        ),
        Factories.Schedules.Schedule.build(:schedule,
          trip: trip_1,
          departure_time: time_1_2,
          stop: stop_2
        ),
        Factories.Schedules.Schedule.build(:schedule,
          trip: trip_2,
          departure_time: time_2_2,
          stop: stop_2
        )
      ]

      assert %Timetables.Timetable{
               rows: [
                 [entry_1_1, entry_2_1],
                 [entry_1_2, entry_2_2]
               ]
             } = Timetables.from_schedules(schedules)

      assert entry_1_1.time == format!(time_1_1)
      assert entry_1_1.trip.id == trip_1.id
      assert entry_1_1.stop_id == stop_1.id

      assert entry_1_2.time == format!(time_1_2)
      assert entry_1_2.trip.id == trip_1.id
      assert entry_1_2.stop_id == stop_2.id

      assert entry_2_1.time == ""
      assert entry_2_1.trip.id == trip_2.id
      assert entry_2_1.stop_id == stop_1.id

      assert entry_2_2.time == format!(time_2_2)
      assert entry_2_2.trip.id == trip_2.id
      assert entry_2_2.stop_id == stop_2.id
    end

    test "inserts blank cells for the first trip" do
      stop_1 = Factories.Stops.Stop.build(:stop)
      stop_2 = Factories.Stops.Stop.build(:stop)

      [time_1_2, time_2_1, time_2_2] = generate_times(3)
      [trip_1, trip_2] = generate_trips(2)

      schedules = [
        Factories.Schedules.Schedule.build(:schedule,
          trip: trip_1,
          departure_time: time_1_2,
          stop: stop_2
        ),
        Factories.Schedules.Schedule.build(:schedule,
          trip: trip_2,
          departure_time: time_2_1,
          stop: stop_1
        ),
        Factories.Schedules.Schedule.build(:schedule,
          trip: trip_2,
          departure_time: time_2_2,
          stop: stop_2
        )
      ]

      assert %Timetables.Timetable{
               rows: [
                 [entry_1_1, entry_2_1],
                 [entry_1_2, entry_2_2]
               ]
             } = Timetables.from_schedules(schedules)

      assert entry_1_1.time == ""
      assert entry_1_1.trip.id == trip_1.id
      assert entry_1_1.stop_id == stop_1.id

      assert entry_1_2.time == format!(time_1_2)
      assert entry_1_2.trip.id == trip_1.id
      assert entry_1_2.stop_id == stop_2.id

      assert entry_2_1.time == format!(time_2_1)
      assert entry_2_1.trip.id == trip_2.id
      assert entry_2_1.stop_id == stop_1.id

      assert entry_2_2.time == format!(time_2_2)
      assert entry_2_2.trip.id == trip_2.id
      assert entry_2_2.stop_id == stop_2.id
    end
  end

  defp generate_trips(count) do
    count
    |> Faker.Util.sample_uniq(fn -> FactoryHelpers.build(:id) end)
    |> Enum.map(&Factories.Schedules.Trip.build(:trip, id: &1))
  end

  defp generate_times(count) do
    today = Generators.Date.random_date()

    count
    |> Faker.Util.sample_uniq(fn ->
      Generators.DateTime.random_time_range_date_time({
        ServiceDateTime.beginning_of_service_day(today),
        ServiceDateTime.end_of_service_day(today)
      })
    end)
    |> Enum.sort(DateTime)
  end

  defp format!(time) do
    Dotcom.Utils.Time.format!(time, :hour_12_minutes)
  end
end
