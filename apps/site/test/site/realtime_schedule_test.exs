defmodule Site.RealtimeScheduleTest do
  use ExUnit.Case

  alias Predictions.Prediction
  alias RoutePatterns.RoutePattern
  alias Routes.Route
  alias Schedules.{Schedule, Trip}
  alias Site.RealtimeSchedule
  alias Stops.Stop

  @now DateTime.from_naive!(~N[2030-02-19T12:00:00], "Etc/UTC")

  @stop %Stop{id: "place-ogmnl"}

  @route %Route{
    custom_route?: false,
    description: :rapid_transit,
    direction_destinations: %{0 => "Forest Hills", 1 => "Oak Grove"},
    direction_names: %{0 => "Southbound", 1 => "Northbound"},
    id: "Orange",
    long_name: "Orange Line",
    name: "Orange Line",
    type: 1
  }

  @route_with_patterns [
    {@route,
     [
       %RoutePattern{
         direction_id: 0,
         id: "Orange-3-0",
         name: "Forest Hills",
         representative_trip_id: "40709167-20:15-OakGroveWellington",
         route_id: "Orange",
         time_desc: nil,
         typicality: 1
       },
       %RoutePattern{
         direction_id: 1,
         id: "Orange-3-1",
         name: "Oak Grove",
         representative_trip_id: "40709170-20:15-OakGroveWellington",
         route_id: "Orange",
         time_desc: nil,
         typicality: 1
       },
       %RoutePattern{
         direction_id: 0,
         id: "Orange-5-0",
         name: "Forest Hills",
         representative_trip_id: "40709151-20:15-OakGroveWellington",
         route_id: "Orange",
         time_desc: "Weekdays only",
         typicality: 3
       }
     ]}
  ]

  @trip %Trip{
    bikes_allowed?: false,
    direction_id: 1,
    headsign: "Oak Grove",
    id: "40709317",
    name: "",
    route_pattern_id: "Orange-3-1",
    shape_id: "903_0017"
  }

  @predictions [
    %Prediction{
      departing?: false,
      direction_id: 1,
      id: "prediction-40709316-70036-190",
      route: %Routes.Route{
        custom_route?: false,
        description: :rapid_transit,
        direction_destinations: %{0 => "Forest Hills", 1 => "Oak Grove"},
        direction_names: %{0 => "Southbound", 1 => "Northbound"},
        id: "Orange",
        long_name: "Orange Line",
        name: "Orange Line",
        type: 1
      },
      schedule_relationship: nil,
      status: nil,
      stop: @stop,
      stop_sequence: 190,
      time: @now,
      track: nil,
      trip: %Schedules.Trip{
        bikes_allowed?: false,
        direction_id: 1,
        headsign: "Oak Grove",
        id: "40709316",
        name: "",
        route_pattern_id: "Orange-3-1",
        shape_id: "903_0017"
      }
    },
    %Prediction{
      departing?: false,
      direction_id: 1,
      id: "prediction-40709317-70036-190",
      route: @route,
      schedule_relationship: nil,
      status: nil,
      stop_sequence: 190,
      stop: @stop,
      time: @now,
      track: nil,
      trip: @trip
    }
  ]

  @schedules [
    %Schedule{
      early_departure?: true,
      flag?: false,
      last_stop?: false,
      pickup_type: 0,
      route: @route,
      stop: @stop,
      stop_sequence: 1,
      time: @now,
      trip: @trip
    }
  ]

  test "stop_data/3" do
    opts = [
      stops_fn: fn _ -> @stop end,
      routes_fn: fn _ -> @route_with_patterns end,
      predictions_fn: fn _ -> @predictions end,
      schedules_fn: fn _, _ -> @schedules end
    ]

    stops = [@stop]

    expected = [
      %{
        stop: %{accessibility: [], address: nil, id: "place-ogmnl", name: nil},
        predicted_schedules_by_route_pattern: %{
          "Forest Hills" => %{
            direction_id: 0,
            predicted_schedules: [
              %{
                prediction: %{
                  __struct__: Predictions.Prediction,
                  departing?: false,
                  direction_id: 1,
                  id: "prediction-40709316-70036-190",
                  schedule_relationship: nil,
                  status: nil,
                  stop_sequence: 190,
                  time: ["arriving"],
                  track: nil
                },
                schedule: nil
              },
              %{
                prediction: %{
                  __struct__: Predictions.Prediction,
                  departing?: false,
                  direction_id: 1,
                  id: "prediction-40709317-70036-190",
                  schedule_relationship: nil,
                  status: nil,
                  stop_sequence: 190,
                  time: ["arriving"],
                  track: nil
                },
                schedule: nil
              }
            ]
          },
          "Oak Grove" => %{
            direction_id: 1,
            predicted_schedules: [
              %{
                prediction: %{
                  __struct__: Predictions.Prediction,
                  departing?: false,
                  direction_id: 1,
                  id: "prediction-40709316-70036-190",
                  schedule_relationship: nil,
                  status: nil,
                  stop_sequence: 190,
                  time: ["arriving"],
                  track: nil
                },
                schedule: nil
              },
              %{
                prediction: %{
                  __struct__: Predictions.Prediction,
                  departing?: false,
                  direction_id: 1,
                  id: "prediction-40709317-70036-190",
                  schedule_relationship: nil,
                  status: nil,
                  stop_sequence: 190,
                  time: ["arriving"],
                  track: nil
                },
                schedule: nil
              }
            ]
          }
        },
        route: %{
          __struct__: Routes.Route,
          custom_route?: false,
          description: :rapid_transit,
          direction_destinations: %{"0" => "Forest Hills", "1" => "Oak Grove"},
          direction_names: %{"0" => "Southbound", "1" => "Northbound"},
          header: "Orange Line",
          id: "Orange",
          long_name: "Orange Line",
          name: "Orange Line",
          type: 1
        }
      }
    ]

    actual = RealtimeSchedule.stop_data(stops, @now, opts)

    assert actual == expected
  end
end
