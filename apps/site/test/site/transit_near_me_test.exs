defmodule Site.TransitNearMeTest do
  use ExUnit.Case

  alias Alerts.Alert
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

      assert %TransitNearMe{} = data

      assert Enum.map(data.stops, & &1.name) == [
               "Stuart St @ Charles St S",
               "Charles St S @ Park Plaza",
               "285 Tremont St",
               "Tufts Medical Center",
               "Tremont St @ Charles St S",
               "Boylston",
               "Kneeland St @ Washington St",
               "Tremont St @ Boylston Station",
               "Washington St @ Essex St",
               "Washington St @ Essex St",
               "Park Street",
               "South Station"
             ]

      ordered_distances = Enum.map(data.stops, &Map.fetch!(data.distances, &1.id))

      # stops are in order of distance from location
      assert ordered_distances == Enum.sort(ordered_distances)
    end

    test "filters out bus routes which are more than 24 hours from now" do
      now = Util.now()

      now_date =
        now
        |> DateTime.to_date()
        |> Date.to_string()

      time_tomorrow_within_24 = Timex.shift(now, hours: 23)
      time_too_far_in_future = Timex.shift(now, hours: 25)
      api_tomorrow = Util.tomorrow_date(now)

      schedules_fn = fn _stop, time ->
        case time do
          # always within service date, so within 24 hours
          [date: ^now_date] ->
            []

          # when search is expanded to tomorrow's service date, limit buses to within 24 hours
          [date: ^api_tomorrow] ->
            [
              %Schedules.Schedule{
                early_departure?: true,
                flag?: false,
                pickup_type: 0,
                route: %Routes.Route{
                  custom_route?: false,
                  description: :local_bus,
                  direction_destinations: %{0 => "Roberts", 1 => "Downtown Boston"},
                  direction_names: %{0 => "Outbound", 1 => "Inbound"},
                  id: "fakeID",
                  long_name: "Roberts - Downtown Boston",
                  name: "553",
                  type: 3
                },
                stop: %Stops.Stop{
                  accessibility: ["accessible"],
                  address: nil,
                  closed_stop_info: nil,
                  has_charlie_card_vendor?: false,
                  has_fare_machine?: false,
                  id: "6542",
                  is_child?: false,
                  latitude: 42.350845,
                  longitude: -71.062868,
                  name: "Kneeland St @ Washington St",
                  note: nil,
                  parking_lots: [],
                  station?: false
                },
                stop_sequence: 32,
                time: time_tomorrow_within_24,
                trip: %Schedules.Trip{
                  bikes_allowed?: true,
                  direction_id: 1,
                  headsign: "Downtown via Copley (Express)",
                  id: "39426144",
                  name: "",
                  shape_id: "5530078"
                }
              },
              %Schedules.Schedule{
                early_departure?: true,
                flag?: false,
                pickup_type: 0,
                route: %Routes.Route{
                  custom_route?: false,
                  description: :local_bus,
                  direction_destinations: %{0 => "Roberts", 1 => "Downtown Boston"},
                  direction_names: %{0 => "Outbound", 1 => "Inbound"},
                  id: "553",
                  long_name: "Roberts - Downtown Boston",
                  name: "553",
                  type: 3
                },
                stop: %Stops.Stop{
                  accessibility: ["accessible"],
                  address: nil,
                  closed_stop_info: nil,
                  has_charlie_card_vendor?: false,
                  has_fare_machine?: false,
                  id: "6542",
                  is_child?: false,
                  latitude: 42.350845,
                  longitude: -71.062868,
                  name: "Kneeland St @ Washington St",
                  note: nil,
                  parking_lots: [],
                  station?: false
                },
                stop_sequence: 32,
                time: time_too_far_in_future,
                trip: %Schedules.Trip{
                  bikes_allowed?: true,
                  direction_id: 1,
                  headsign: "Downtown via Copley (Express)",
                  id: "39426144",
                  name: "",
                  shape_id: "5530078"
                }
              },
              %Schedules.Schedule{
                early_departure?: true,
                flag?: false,
                pickup_type: 0,
                route: %Routes.Route{
                  custom_route?: false,
                  description: :rapid_transit,
                  direction_destinations: %{0 => "Ashmont/Braintree", 1 => "Alewife"},
                  direction_names: %{0 => "South", 1 => "North"},
                  id: "Red",
                  long_name: "Red Line",
                  name: "Red Line",
                  type: 1
                },
                stop: %Stops.Stop{
                  accessibility: ["accessible"],
                  address: nil,
                  closed_stop_info: nil,
                  has_charlie_card_vendor?: false,
                  has_fare_machine?: false,
                  id: "place-sstat",
                  is_child?: true,
                  latitude: 42.352271,
                  longitude: -71.055242,
                  name: "South Station",
                  note: nil,
                  parking_lots: [],
                  station?: false
                },
                stop_sequence: 90,
                time: time_too_far_in_future,
                trip: %Schedules.Trip{
                  bikes_allowed?: false,
                  direction_id: 0,
                  headsign: "Ashmont",
                  id: "38899812-21:00-LL",
                  name: "",
                  shape_id: "931_0009"
                }
              }
            ]
        end
      end

      %{schedules: schedules} =
        TransitNearMe.build(@address, date: @date, now: now, schedules_fn: schedules_fn)

      # Filter applies to bus routes…
      assert Enum.find(Map.get(schedules, "6542"), &(PredictedSchedule.route(&1).id == "fakeID"))
      refute Enum.find(Map.get(schedules, "6542"), &(PredictedSchedule.route(&1).id == "553"))
      # …but not other route types
      assert Enum.find(
               Map.get(schedules, "place-sstat"),
               &(PredictedSchedule.route(&1).id == "Red")
             )
    end
  end

  describe "routes_for_stop/2" do
    test "returns a list of routes that visit a stop" do
      data = TransitNearMe.build(@address, date: @date, now: Util.now())
      routes = TransitNearMe.routes_for_stop(data, "place-pktrm")

      assert Enum.map(routes, & &1.name) == [
               "Red Line",
               "Green Line B",
               "Green Line C",
               "Green Line E",
               "Green Line D"
             ]
    end
  end

  describe "schedules_for_routes/3" do
    test "returns a list of custom route structs" do
      now = Util.now()
      data = TransitNearMe.build(@address, date: @date, now: now)

      alerts = [
        Alert.new(
          id: "id",
          informed_entity: [%Alerts.InformedEntity{route: "Orange"}]
        )
      ]

      routes = TransitNearMe.schedules_for_routes(data, alerts, now: now)

      [%{id: closest_stop} | _] = data.stops

      assert [route_with_stops_with_directions | _] = routes

      assert route_with_stops_with_directions |> Map.keys() |> Enum.sort() == [
               :alert_count,
               :route,
               :stops_with_directions
             ]

      assert %Route{} = route_with_stops_with_directions.route

      assert %{stops_with_directions: [stop_with_directions | _]} =
               route_with_stops_with_directions

      assert %{alert_count: 1} = Enum.find(routes, &(&1.route.id == "Orange"))

      stop = stop_with_directions.stop
      assert %Stop{} = stop
      assert stop.id == closest_stop

      assert stop_with_directions |> Map.keys() |> Enum.sort() == [
               :directions,
               :distance,
               :href,
               :stop
             ]

      assert stop_with_directions.distance == "238 ft"

      assert %{directions: [direction | _]} = stop_with_directions

      assert direction.direction_id in [0, 1]

      assert Map.keys(direction) == [:direction_id, :headsigns]

      assert %{headsigns: [headsign | _]} = direction

      assert Map.keys(headsign) == [:name, :times, :train_number]

      assert length(headsign.times) <= 2

      assert %{times: [time | _]} = headsign

      assert Map.keys(time) == [:delay, :prediction, :scheduled_time]

      assert %{scheduled_time: scheduled_time, prediction: prediction} = time

      assert {:ok, _} = Timex.parse(Enum.join(scheduled_time), "{h12}:{m} {AM}")

      if prediction do
        assert Map.keys(prediction) == [:seconds, :status, :time, :track]
      end
    end

    test "sorts directions and headsigns within stops" do
      route = %Route{
        id: "subway",
        type: 1,
        direction_destinations: %{0 => "Direction 0", 1 => "Direction 1"}
      }

      stop = %Stop{
        id: "stop",
        latitude: @address.latitude + 0.01,
        longitude: @address.longitude - 0.01
      }

      trips = [
        %Trip{
          id: "trip-0",
          headsign: "Headsign B",
          direction_id: 0,
          shape_id: "shape-1"
        },
        %Trip{
          id: "trip-1",
          headsign: "Headsign A",
          direction_id: 0,
          shape_id: "shape-2"
        },
        %Trip{
          id: "trip-2",
          headsign: "Headsign B",
          direction_id: 0,
          shape_id: "shape-1"
        }
      ]

      base_schedule = %Schedule{stop: stop, route: route}

      pm_12_00 = DateTime.from_naive!(~N[2030-02-19T12:00:00], "Etc/UTC")
      pm_12_01 = DateTime.from_naive!(~N[2030-02-19T12:01:00], "Etc/UTC")
      pm_12_02 = DateTime.from_naive!(~N[2030-02-19T12:02:00], "Etc/UTC")

      input = %TransitNearMe{
        distances: %{"stop" => 0.1},
        schedules: %{
          "stop-1" => [
            %PredictedSchedule{
              schedule: %{
                base_schedule
                | # Headsign B -- 12:00
                  trip: Enum.at(trips, 0),
                  time: pm_12_00
              },
              prediction: %Prediction{route: route, time: pm_12_00, trip: Enum.at(trips, 0)}
            },
            %PredictedSchedule{
              schedule: %{
                base_schedule
                | # Headsign A -- 12:01
                  trip: Enum.at(trips, 1),
                  time: pm_12_01
              },
              prediction: %Prediction{route: route, time: pm_12_01, trip: Enum.at(trips, 1)}
            },
            %PredictedSchedule{
              schedule: %{
                base_schedule
                | # Headsign B -- 12:02
                  trip: Enum.at(trips, 2),
                  time: pm_12_02
              },
              prediction: %Prediction{route: route, time: pm_12_02, trip: Enum.at(trips, 2)}
            }
          ]
        },
        stops: [stop]
      }

      stop_repo_fn = fn "stop" -> stop end

      output =
        TransitNearMe.schedules_for_routes(
          input,
          [],
          stops_fn: stop_repo_fn,
          now: pm_12_00
        )

      assert Enum.count(output) === 1
      [%{stops_with_directions: stops_with_directions}] = output

      assert Enum.count(stops_with_directions) === 1
      [stop] = stops_with_directions

      assert Enum.count(stop.directions) === 1
      [%{headsigns: headsigns}] = stop.directions

      assert Enum.map(headsigns, fn headsign -> headsign.name end) == [
               "Headsign B",
               "Headsign A"
             ]

      [headsign_b, _headsign_a] = headsigns

      assert [
               %{prediction: %{time: ["arriving"]}},
               %{prediction: %{time: ["2", " ", "min"]}}
             ] = headsign_b.times
    end

    test "Adds a formatted header to each route" do
      now = Util.now()

      data = %TransitNearMe{
        stops: [
          %Stops.Stop{
            accessibility: ["accessible", "escalator_both", "elevator", "fully_elevated_platform"],
            address: "700 Atlantic Ave, Boston, MA 02110",
            closed_stop_info: nil,
            has_charlie_card_vendor?: false,
            has_fare_machine?: true,
            id: "place-sstat",
            is_child?: false,
            latitude: 42.352271,
            longitude: -71.055242,
            name: "South Station",
            note: nil,
            parking_lots: [
              %Stops.Stop.ParkingLot{
                address: nil,
                capacity: %Stops.Stop.ParkingLot.Capacity{
                  accessible: 4,
                  total: 210,
                  type: "Garage"
                },
                latitude: 42.349838,
                longitude: -71.055963,
                manager: %Stops.Stop.ParkingLot.Manager{
                  contact: "ProPark",
                  name: "ProPark",
                  phone: "617-345-0202",
                  url: "https://www.propark.com/propark-locator2/south-station-garage/"
                },
                name: "South Station Bus Terminal Garage",
                note: nil,
                payment: %Stops.Stop.ParkingLot.Payment{
                  daily_rate:
                    "Hourly: 30 min: $5, 1 hr: $10, 1.5 hrs: $15, 2 hrs: $20, 2.5 hrs: $25, 3+ hrs: $30 | Daily Max: $30 | Early Bird (in by 8:30 AM, out by 6 PM): $26 | Nights/Weekends: $10",
                  methods: ["Credit/Debit Card", "Cash"],
                  mobile_app: nil,
                  monthly_rate: "$150 regular, $445 overnight"
                },
                utilization: nil
              }
            ],
            station?: true
          }
        ],
        distances: %{
          "place-sstat" => 0.5562971500164419
        },
        schedules: %{
          "place-sstat" => [
            %PredictedSchedule{
              schedule: %Schedules.Schedule{
                early_departure?: true,
                flag?: false,
                pickup_type: 0,
                route: %Routes.Route{
                  custom_route?: false,
                  description: :rapid_transit,
                  direction_destinations: %{0 => "Ashmont/Braintree", 1 => "Alewife"},
                  direction_names: %{0 => "South", 1 => "North"},
                  id: "Red",
                  long_name: "Red Line",
                  name: "Red Line",
                  type: 1
                },
                stop: %Stops.Stop{
                  accessibility: ["accessible"],
                  address: nil,
                  closed_stop_info: nil,
                  has_charlie_card_vendor?: false,
                  has_fare_machine?: false,
                  id: "place-sstat",
                  is_child?: true,
                  latitude: 42.352271,
                  longitude: -71.055242,
                  name: "South Station",
                  note: nil,
                  parking_lots: [],
                  station?: false
                },
                stop_sequence: 90,
                time: now,
                trip: %Schedules.Trip{
                  bikes_allowed?: false,
                  direction_id: 0,
                  headsign: "Ashmont",
                  id: "38899812-21:00-LL",
                  name: "",
                  shape_id: "931_0009"
                }
              }
            },
            %PredictedSchedule{
              schedule: %Schedules.Schedule{
                early_departure?: true,
                flag?: false,
                pickup_type: 0,
                route: %Routes.Route{
                  custom_route?: false,
                  description: :local_bus,
                  direction_destinations: %{0 => "Roberts", 1 => "Downtown Boston"},
                  direction_names: %{0 => "Outbound", 1 => "Inbound"},
                  id: "553",
                  long_name: "Roberts - Downtown Boston",
                  name: "553",
                  type: 3
                },
                stop: %Stops.Stop{
                  accessibility: ["accessible"],
                  address: nil,
                  closed_stop_info: nil,
                  has_charlie_card_vendor?: false,
                  has_fare_machine?: false,
                  id: "place-sstat",
                  is_child?: true,
                  latitude: 42.352271,
                  longitude: -71.055242,
                  name: "South Station",
                  note: nil,
                  parking_lots: [],
                  station?: false
                },
                stop_sequence: 90,
                time: now,
                trip: %Schedules.Trip{
                  bikes_allowed?: false,
                  direction_id: 0,
                  headsign: "Ashmont",
                  id: "38899812-21:00-LL",
                  name: "",
                  shape_id: "931_0009"
                }
              }
            },
            %PredictedSchedule{
              schedule: %Schedules.Schedule{
                early_departure?: true,
                flag?: false,
                pickup_type: 0,
                route: %Routes.Route{
                  custom_route?: false,
                  description: :key_bus_route,
                  direction_destinations: %{0 => "Logan Airport", 1 => "South Station"},
                  direction_names: %{0 => "Outbound", 1 => "Inbound"},
                  id: "741",
                  long_name: "Logan Airport - South Station",
                  name: "SL1",
                  type: 3
                },
                stop: %Stops.Stop{
                  accessibility: ["accessible"],
                  address: nil,
                  closed_stop_info: nil,
                  has_charlie_card_vendor?: false,
                  has_fare_machine?: false,
                  id: "place-sstat",
                  is_child?: true,
                  latitude: 42.352271,
                  longitude: -71.055242,
                  name: "South Station",
                  note: nil,
                  parking_lots: [],
                  station?: false
                },
                stop_sequence: 90,
                time: now,
                trip: %Schedules.Trip{
                  bikes_allowed?: false,
                  direction_id: 0,
                  headsign: "Ashmont",
                  id: "38899812-21:00-LL",
                  name: "",
                  shape_id: "931_0009"
                }
              }
            }
          ]
        }
      }

      [bus_route, silver_line_route, subway_route] =
        TransitNearMe.schedules_for_routes(data, [], now: now)

      assert bus_route.route.header == "553"
      assert silver_line_route.route.header == "Silver Line SL1"
      assert subway_route.route.header == "Red Line"
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
      [time, _, am_pm] =
        TransitNearMe.simple_prediction(%Prediction{time: Util.now()}, :commuter_rail, @now).time

      assert time =~ ~r/\d{1,2}:\d\d/
      assert am_pm =~ ~r/(AM|PM)/
    end

    test "returns a time difference for modes other than CR" do
      assert [_, _, "min"] =
               TransitNearMe.simple_prediction(
                 %Prediction{time: Timex.shift(Util.now(), minutes: 5)},
                 :subway,
                 @now
               ).time
    end
  end

  describe "format_min_time/1" do
    test "returns hour greater than 24 between midnight and 3:00am" do
      {:ok, midnight} = DateTime.from_naive(~N[2019-02-22T00:00:00], "Etc/UTC")
      assert midnight.hour === 0
      assert TransitNearMe.format_min_time(midnight) === "24:00"

      {:ok, one_thirty} = DateTime.from_naive(~N[2019-02-22T01:30:00], "Etc/UTC")
      assert one_thirty.hour === 1
      assert TransitNearMe.format_min_time(one_thirty) === "25:30"

      {:ok, two_fifty_nine} = DateTime.from_naive(~N[2019-02-22T02:59:00], "Etc/UTC")
      assert two_fifty_nine.hour === 2
      assert TransitNearMe.format_min_time(two_fifty_nine) === "26:59"

      {:ok, three_am} = DateTime.from_naive(~N[2019-02-22T03:00:00], "Etc/UTC")
      assert three_am.hour === 3
      assert TransitNearMe.format_min_time(three_am) === "03:00"
    end
  end

  describe "late_night?/1" do
    test "returns true between midnight and 3:00am" do
      {:ok, midnight} = DateTime.from_naive(~N[2019-02-22T00:00:00], "Etc/UTC")
      assert DateTime.to_time(midnight) == ~T[00:00:00]
      # assert Time.compare(~T[03:00:00], midnight |> DateTime.to_time()) == :eq
      assert midnight.hour === 0
      assert TransitNearMe.late_night?(midnight) == true

      {:ok, one_thirty} = DateTime.from_naive(~N[2019-02-22T01:30:00], "Etc/UTC")
      assert one_thirty.hour === 1
      assert TransitNearMe.late_night?(one_thirty) == true

      {:ok, two_fifty_nine} = DateTime.from_naive(~N[2019-02-22T02:59:00], "Etc/UTC")
      assert two_fifty_nine.hour === 2
      assert TransitNearMe.late_night?(two_fifty_nine) == true

      {:ok, three_am} = DateTime.from_naive(~N[2019-02-22T03:00:00], "Etc/UTC")
      assert three_am.hour === 3
      assert TransitNearMe.late_night?(three_am) == false
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
          assert sched === ["12:00", " ", "PM"]
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
          assert sched === ["12:00", " ", "PM"]
        end
      end
    end
  end

  describe "filter_predicted_schedules/3" do
    test "does not remove schedules without predictions for commuter rail, bus, or ferry" do
      now = DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")

      for type <- 2..4 do
        route = %Route{id: "route", type: type}
        stop = %Stop{id: "stop"}
        trip = %Trip{direction_id: 0}

        schedule = %PredictedSchedule{
          schedule: %Schedule{route: route, stop: stop, trip: trip},
          prediction: nil
        }

        assert TransitNearMe.filter_predicted_schedules([schedule], route, stop.id, now) == [
                 schedule
               ]
      end
    end

    test "filters schedules without predictions for subway if predictions exist" do
      now = DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")
      prediction_time = DateTime.from_naive!(~N[2019-02-27T12:05:00], "Etc/UTC")

      for type <- [0, 1] do
        route = %Route{id: "route", type: type}
        stop = %Stop{id: "stop"}
        trip_1 = %Trip{direction_id: 0, id: "trip-1"}
        trip_2 = %Trip{direction_id: 0, id: "trip-2"}

        schedule_1 = %PredictedSchedule{
          schedule: %Schedule{route: route, stop: stop, trip: trip_1},
          prediction: %Prediction{route: route, stop: stop, trip: trip_1, time: prediction_time}
        }

        schedule_2 = %PredictedSchedule{
          schedule: %Schedule{route: route, stop: stop, trip: trip_2},
          prediction: nil
        }

        assert TransitNearMe.filter_predicted_schedules(
                 [schedule_1, schedule_2],
                 route,
                 stop.id,
                 now
               ) ==
                 [schedule_1]
      end
    end

    test "returns empty list for subway if no predictions during normal hours" do
      now = DateTime.from_naive!(~N[2019-02-27T12:00:00], "Etc/UTC")

      for type <- [0, 1] do
        route = %Route{id: "route", type: type}
        stop = %Stop{id: "stop"}
        trip = %Trip{direction_id: 0}
        schedule = %PredictedSchedule{schedule: %Schedule{route: route, stop: stop, trip: trip}}

        assert TransitNearMe.filter_predicted_schedules([schedule], route, stop.id, now) == []
      end
    end

    test "returns schedules for subway if no predictions during late night" do
      now = DateTime.from_naive!(~N[2019-02-27T02:00:00], "Etc/UTC")

      for type <- [0, 1] do
        route = %Route{id: "route", type: type}
        stop = %Stop{id: "stop"}
        trip = %Trip{direction_id: 0}

        schedule = %PredictedSchedule{
          schedule: %Schedule{route: route, stop: stop, trip: trip}
        }

        assert TransitNearMe.filter_predicted_schedules([schedule], route, stop.id, now) == [
                 schedule
               ]
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

  describe "time_data_for_route_by_stop/3" do
    @now Util.now()
    @schedule_time Timex.shift(@now, minutes: 3)
    @prediction_time Timex.shift(@now, minutes: 5)

    @route %Route{
      id: "Blue",
      type: 1,
      direction_destinations: %{0 => "Bowdoin", 1 => "Wonderland"}
    }

    @stop %Stop{id: "place-wimnl"}
    @trip %Trip{direction_id: 1, id: "39783542"}

    @schedule %Schedule{
      route: @route,
      stop: @stop,
      trip: @trip,
      time: @schedule_time
    }

    @prediction %Prediction{
      departing?: true,
      direction_id: 1,
      id: "prediction-39783543-70050-60",
      route: @route,
      schedule_relationship: nil,
      status: nil,
      stop: @stop,
      stop_sequence: 60,
      time: @prediction_time,
      track: "2",
      trip: @trip
    }

    test "get time data for a subway route" do
      predictions_fn = fn _ -> [@prediction] end

      schedules_fn = fn _, _ ->
        [@schedule]
      end

      actual =
        TransitNearMe.time_data_for_route_by_stop(@route.id, 1,
          schedules_fn: schedules_fn,
          predictions_fn: predictions_fn,
          now: @now
        )

      expected = %{
        "place-wimnl" => [
          %{
            name: nil,
            times: [
              %{
                prediction: %{
                  seconds: 300,
                  status: nil,
                  time: ["5", " ", "min"],
                  track: "2"
                },
                scheduled_time: nil,
                delay: 0
              }
            ],
            train_number: nil
          }
        ]
      }

      assert actual == expected
    end

    test "get time data for a subway route when schedules is empty" do
      predictions_fn = fn _ -> [@prediction] end

      schedules_fn = fn _, _ ->
        []
      end

      actual =
        TransitNearMe.time_data_for_route_by_stop(@route.id, 1,
          schedules_fn: schedules_fn,
          predictions_fn: predictions_fn,
          now: @now
        )

      assert %{"place-wimnl" => [%{}]} = actual
    end
  end
end
