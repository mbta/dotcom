defmodule Dotcom.RealtimeScheduleTest do
  use ExUnit.Case, async: true

  import Mox

  alias Alerts.Alert
  alias Alerts.InformedEntity, as: IE
  alias Alerts.InformedEntitySet, as: IESet
  alias Dotcom.JsonHelpers
  alias Dotcom.RealtimeSchedule
  alias Predictions.Prediction
  alias RoutePatterns.RoutePattern
  alias Routes.Route
  alias Schedules.Schedule
  alias Schedules.Trip
  alias Stops.Stop

  @now DateTime.from_naive!(~N[2030-02-19T12:00:00], "Etc/UTC")
  @now_departure Timex.shift(@now, minutes: 2)

  @stop %Stop{id: "place-ogmnl"}

  @route %Route{
    description: :rapid_transit,
    direction_destinations: %{0 => "Forest Hills", 1 => "Oak Grove"},
    direction_names: %{0 => "Southbound", 1 => "Northbound"},
    id: "Orange",
    long_name: "Orange Line",
    name: "Orange Line",
    type: 1,
    color: "ED8B00",
    sort_order: 99_999
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
      platform_stop_id: "70036",
      arrival_time: @now,
      departure_time: @now_departure,
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
      },
      vehicle_id: "vehicle_id"
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
      platform_stop_id: "70036",
      arrival_time: @now,
      departure_time: @now_departure,
      time: @now,
      track: nil,
      trip: @trip,
      vehicle_id: nil
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
      platform_stop_id: "70036",
      stop_sequence: 1,
      time: @now,
      trip: @trip
    }
  ]

  @alerts [
    %Alert{
      id: "1234",
      active_period: [{@now, @now}],
      priority: :high,
      informed_entity: %IESet{
        entities: [
          %IE{route: "Orange"},
          %IE{route: "70"}
        ]
      }
    },
    %Alert{
      id: "2345",
      active_period: [{@now, @now}],
      priority: :high,
      informed_entity: %IESet{
        entities: [
          %IE{route: "Orange"},
          %IE{route: "Red"}
        ]
      }
    }
  ]

  setup :verify_on_exit!

  setup do
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    stub(Stops.Repo.Mock, :get, fn _ ->
      @stop
    end)

    %{cache: cache}
  end

  test "stop_data/3 returns stop" do
    expect(Predictions.Repo.Mock, :all_no_cache, 3, fn _ -> @predictions end)

    expect(Routes.Repo.Mock, :by_stop_with_route_pattern, fn _ ->
      @route_with_patterns
    end)

    opts = [
      routes_fn: fn _ -> @route_with_patterns end,
      schedules_fn: fn _, _ -> @schedules end,
      alerts_fn: fn _, _ -> @alerts end
    ]

    stops = [@stop.id]

    expected = [
      %{
        stop: %{accessibility: [], address: nil, id: "place-ogmnl", name: nil, parking_lots: []},
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
                  arrival_time: @now,
                  departure_time: @now_departure,
                  time: ["arriving"],
                  track: nil,
                  headsign: "Oak Grove",
                  vehicle_id: "vehicle_id",
                  platform_stop_id: "70036"
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
                  arrival_time: @now,
                  departure_time: @now_departure,
                  time: ["arriving"],
                  track: nil,
                  headsign: "Oak Grove",
                  vehicle_id: nil,
                  platform_stop_id: "70036"
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
                  arrival_time: @now,
                  departure_time: @now_departure,
                  time: ["arriving"],
                  track: nil,
                  headsign: "Oak Grove",
                  vehicle_id: "vehicle_id",
                  platform_stop_id: "70036"
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
                  arrival_time: @now,
                  departure_time: @now_departure,
                  time: ["arriving"],
                  track: nil,
                  headsign: "Oak Grove",
                  vehicle_id: nil,
                  platform_stop_id: "70036"
                },
                schedule: nil
              }
            ]
          }
        },
        route: %{
          __struct__: Routes.Route,
          alerts: Enum.map(@alerts, &JsonHelpers.stringified_alert(&1, @now)),
          description: :rapid_transit,
          direction_destinations: %{"0" => "Forest Hills", "1" => "Oak Grove"},
          direction_names: %{"0" => "Southbound", "1" => "Northbound"},
          external_agency_name: nil,
          header: "Orange Line",
          id: "Orange",
          long_name: "Orange Line",
          name: "Orange Line",
          type: 1,
          color: "ED8B00",
          sort_order: 99_999,
          fare_class: :unknown_fare,
          line_id: ""
        }
      }
    ]

    actual = RealtimeSchedule.stop_data(stops, @now, opts)
    assert actual == expected
  end

  test "stop_data/3 returns nil" do
    expect(Routes.Repo.Mock, :by_stop_with_route_pattern, fn _ ->
      []
    end)

    opts = [
      schedules_fn: fn _, _ -> [] end,
      alerts_fn: fn _, _ -> [] end
    ]

    stops = [@stop.id]

    expected = []

    actual = RealtimeSchedule.stop_data(stops, @now, opts)

    assert actual == expected
  end
end
