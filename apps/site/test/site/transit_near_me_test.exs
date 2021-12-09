defmodule Site.TransitNearMeTest do
  use ExUnit.Case

  alias GoogleMaps.Geocode.Address
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.{Schedule, Trip}
  alias Site.TransitNearMe
  alias Stops.Stop

  @address %Address{
    latitude: 42.351,
    longitude: -71.066,
    formatted: "10 Park Plaza, Boston, MA, 02116"
  }

  @date Util.service_date()

  describe "build/2" do
    test "builds a set of data for a location" do
      data = TransitNearMe.build(@address, date: @date, now: Util.now())

      assert Enum.map(data.stops, & &1.name) == [
               "Stuart St @ Charles St S",
               "Charles St S @ Park Plaza",
               "285 Tremont St",
               "Washington St @ Tufts Med Ctr",
               "Tufts Medical Center",
               "Washington St @ Tufts Med Ctr",
               "Tremont St @ Charles St S",
               "Boylston",
               "Kneeland St @ Washington St",
               "Tremont St @ Boylston Station",
               "Park Street",
               "South Station"
             ]

      # stops are in order of distance from location

      assert Enum.map(data.stops, &data.distances[&1.id]) == [
               "238 ft",
               "444 ft",
               "0.1 mi",
               "0.1 mi",
               "0.1 mi",
               "0.2 mi",
               "0.2 mi",
               "0.2 mi",
               "0.2 mi",
               "0.2 mi",
               "0.4 mi",
               "0.6 mi"
             ]
    end
  end

  describe "simple_prediction/2" do
    @now Util.now()

    test "returns nil if no prediction" do
      assert nil == TransitNearMe.simple_prediction(nil, :commuter_rail, @now)
    end

    test "returns up to three keys if a prediction is available" do
      assert %{time: _, track: _, status: _} =
               TransitNearMe.simple_prediction(
                 %Prediction{time: Util.now(), track: 1, status: "On time"},
                 :commuter_rail,
                 @now
               )
    end

    test "returns a AM/PM time for CR" do
      predicted_time =
        TransitNearMe.simple_prediction(%Prediction{time: Util.now()}, :commuter_rail, @now).time

      [time, am_pm] = String.split(predicted_time, " ")
      assert time =~ ~r/\d{1,2}:\d\d/
      assert am_pm =~ ~r/(AM|PM)/
    end

    test "returns a time difference for modes other than CR" do
      predicted_time =
        TransitNearMe.simple_prediction(
          %Prediction{time: Timex.shift(Util.now(), minutes: 5)},
          :subway,
          @now
        ).time

      assert String.contains?(predicted_time, "min")
    end
  end

  @trips %{
    "trip-1" => %Trip{
      id: "trip-1",
      headsign: "Headsign 1",
      shape_id: "shape-id",
      direction_id: 0
    },
    "trip-2" => %Trip{
      id: "trip-2",
      headsign: "Headsign 2",
      shape_id: "shape-id",
      direction_id: 0
    },
    "trip-3" => %Trip{
      id: "trip-3",
      headsign: "Headsign 1",
      shape_id: "shape-id",
      direction_id: 0
    },
    "trip-4" => %Trip{
      id: "trip-4",
      headsign: "Headsign 2",
      shape_id: "shape-id",
      direction_id: 0
    }
  }

  describe "build_direction_map/2" do
    test "returns schedules and predictions for non-subway routes" do
      stop = %Stop{id: "stop"}

      route = %Route{
        id: "route",
        type: 2,
        direction_destinations: %{0 => "First Stop", 1 => "Last Stop"}
      }

      time = DateTime.from_naive!(~N[2019-02-21T12:00:00], "Etc/UTC")

      schedules =
        Enum.map(
          1..4,
          &%PredictedSchedule{
            schedule: %Schedule{
              route: route,
              stop: stop,
              time: time,
              trip: Map.get(@trips, "trip-#{&1}")
            },
            prediction: %Prediction{
              route: route,
              stop: stop,
              time: time,
              trip: Map.get(@trips, "trip-#{&1}")
            }
          }
        )

      assert {%DateTime{}, output} =
               TransitNearMe.build_direction_map(
                 {0, schedules},
                 now: time
               )

      assert output.direction_id == 0

      assert Enum.count(output.headsigns) === 2

      for headsign <- output.headsigns do
        assert Enum.count(headsign.times) === TransitNearMe.schedule_count(route)

        for %{scheduled_time: sched} <- headsign.times do
          assert sched === "12:00 PM"
        end
      end
    end

    test "only uses predictions for subway routes" do
      stop = %Stop{id: "stop"}

      route = %Route{
        id: "route",
        type: 1,
        direction_destinations: %{0 => "First Stop", 1 => "Last Stop"}
      }

      time = DateTime.from_naive!(~N[2019-02-21T12:00:00], "Etc/UTC")

      schedules =
        Enum.map(
          1..4,
          &%PredictedSchedule{
            prediction: %Prediction{
              stop: stop,
              route: route,
              trip: Map.get(@trips, "trip-#{&1}"),
              time: time
            },
            schedule: %Schedule{
              stop: stop,
              route: route,
              trip: Map.get(@trips, "trip-#{&1}"),
              time: time
            }
          }
        )

      assert {%DateTime{}, output} =
               TransitNearMe.build_direction_map(
                 {0, schedules},
                 now: time
               )

      assert output.direction_id == 0

      assert Enum.count(output.headsigns) === 2

      for headsign <- output.headsigns do
        assert Enum.count(headsign.times) === TransitNearMe.schedule_count(route)

        for %{scheduled_time: sched} <- headsign.times do
          assert sched === "12:00 PM"
        end
      end
    end
  end

  describe "filter_headsign_schedules/2" do
    @predicted_schedule %PredictedSchedule{
      schedule: %Schedule{time: DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")}
    }

    @time_data_with_prediction %{
      delay: 0,
      prediction: %{status: nil, time: ["5", " ", "min"], track: nil},
      scheduled_time: ["3:50", " ", "PM"]
    }

    @time_data_without_prediction %{
      delay: 0,
      prediction: nil,
      scheduled_time: ["3:50", " ", "PM"]
    }

    test "result contains a prediction, one result returned" do
      schedules = [
        {@predicted_schedule, @time_data_without_prediction},
        {
          %{
            @predicted_schedule
            | prediction: %Prediction{
                time: DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")
              }
          },
          @time_data_with_prediction
        },
        {@predicted_schedule, @time_data_without_prediction},
        {@predicted_schedule, @time_data_without_prediction}
      ]

      assert [{_predicted_schedule, time_data}] =
               TransitNearMe.filter_headsign_schedules(schedules, %Route{type: 3})

      assert time_data.prediction != nil
    end

    test "neither result contains a prediction" do
      schedules = [
        {@predicted_schedule, @time_data_without_prediction},
        {@predicted_schedule, @time_data_without_prediction},
        {@predicted_schedule, @time_data_without_prediction},
        {@predicted_schedule, @time_data_without_prediction}
      ]

      assert [{_predicted_schedule, time_data}] =
               TransitNearMe.filter_headsign_schedules(schedules, %Route{type: 3})

      assert time_data.prediction == nil
    end
  end
end
