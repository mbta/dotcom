defmodule Dotcom.TripPlan.ItineraryRowTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.ItineraryRow
  import Mox

  alias Alerts.{Alert, InformedEntity}
  alias Dotcom.TripPlan.{ItineraryRow, Leg, NamedPosition, PersonalDetail}
  alias Routes.Route
  alias Test.Support.Factories.{MBTA.Api, Stops.Stop, TripPlanner.TripPlanner}

  setup :verify_on_exit!

  setup do
    stub(Stops.Repo.Mock, :get, fn _ ->
      Stop.build(:stop)
    end)

    :ok
  end

  describe "route_id/1" do
    test "returns the route id when a route is present" do
      row = %ItineraryRow{route: %Route{id: "route"}}

      assert route_id(row) == "route"
    end

    test "returns nil when a route is not present" do
      row = %ItineraryRow{route: nil}

      refute route_id(row)
    end
  end

  describe "route_type/1" do
    test "returns the route type when a route is present" do
      row = %ItineraryRow{route: %Route{type: 0}}

      assert route_type(row) == 0
    end

    test "returns nil when a route is not present" do
      row = %ItineraryRow{route: nil}

      refute route_type(row)
    end
  end

  describe "route_name/1" do
    test "returns the route name when a route is present" do
      long_name = "#{Faker.Color.name()} Line"

      row = %ItineraryRow{route: %Route{long_name: long_name}}

      assert route_name(row) == long_name
    end

    test "returns nil when a route is not present" do
      row = %ItineraryRow{route: nil}

      refute route_name(row)
    end
  end

  describe "fetch_alerts/2" do
    @itinerary_row %ItineraryRow{
      stop: {"stop name", "stopid"},
      route: %Routes.Route{id: "routeid", type: 0},
      trip: %Schedules.Trip{id: "tripid"},
      departure: DateTime.from_unix!(2),
      transit?: true,
      steps: [
        %Dotcom.TripPlan.IntermediateStop{
          description: "step1",
          stop: %Stops.Stop{id: "intermediate_stop"}
        },
        %Dotcom.TripPlan.IntermediateStop{description: "step2", stop: nil}
      ],
      additional_routes: []
    }

    test "shows alert associated with stop" do
      alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{
              route: "routeid",
              route_type: 0,
              stop: "stopid",
              trip: nil,
              direction_id: nil
            }
          ],
          active_period: [{DateTime.from_unix!(1), nil}]
        )

      assert fetch_alerts(@itinerary_row, [alert]).alerts == [alert]
    end

    test "shows alert for the whole route" do
      alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{
              route: "routeid",
              route_type: 0,
              stop: nil,
              trip: nil,
              direction_id: nil
            }
          ],
          active_period: [{DateTime.from_unix!(1), nil}]
        )

      assert fetch_alerts(@itinerary_row, [alert]).alerts == [alert]
    end

    test "doesn't show alert for another stop on the route" do
      alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{
              route: "routeid",
              route_type: 0,
              stop: "differentstopid",
              trip: nil,
              direction_id: nil
            }
          ],
          active_period: [{DateTime.from_unix!(1), nil}]
        )

      assert fetch_alerts(@itinerary_row, [alert]).alerts == []
    end

    test "shows alert associated with trip" do
      alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{
              route: "routeid",
              route_type: 0,
              stop: nil,
              trip: "tripid",
              direction_id: 0
            }
          ],
          active_period: [{DateTime.from_unix!(1), nil}]
        )

      assert fetch_alerts(@itinerary_row, [alert]).alerts == [alert]
    end

    test "doesn't show alert for different trip" do
      alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{
              route: "routeid",
              route_type: 0,
              stop: nil,
              trip: "different-tripid",
              direction_id: 0
            }
          ],
          active_period: [{DateTime.from_unix!(1), nil}]
        )

      assert fetch_alerts(@itinerary_row, [alert]).alerts == []
    end

    test "for a personal row, only shows alerts for the stop" do
      good_alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{stop: "stopid"}
          ]
        )

      bad_alert =
        Alert.update(good_alert, informed_entity: [%InformedEntity{stop: "otherstopid"}])

      row = %{@itinerary_row | transit?: false}
      assert fetch_alerts(row, [good_alert, bad_alert]).alerts == [good_alert]
    end

    test "rows without a real stop don't get alerts" do
      alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{stop: "stopid"}
          ]
        )

      row = %{@itinerary_row | transit?: false, stop: {"Stop Name", nil}}
      assert fetch_alerts(row, [alert]).alerts == []
    end

    test "transit rows with intermediate_stops retrieve alerts of activity :ride" do
      good_alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{stop: "intermediate_stop", activities: MapSet.new(~w(ride)a)}
          ]
        )

      bad_alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{stop: "intermediate_stop", activities: MapSet.new(~w(board)a)}
          ]
        )

      row = %{@itinerary_row | transit?: true, stop: {"Stop Name", nil}}
      steps = fetch_alerts(row, [good_alert, bad_alert]).steps
      assert Enum.flat_map(steps, & &1.alerts) == [good_alert]
    end

    test "intermediate stops without a stop_id do not match alerts" do
      good_alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{stop: "intermediate_stop", activities: MapSet.new(~w(ride)a)}
          ]
        )

      bad_alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{stop: "intermediate_stop", activities: MapSet.new(~w(board)a)}
          ]
        )

      row = %{
        @itinerary_row
        | transit?: true,
          stop: {"Stop Name", nil},
          steps: [%Dotcom.TripPlan.IntermediateStop{description: "foo"}]
      }

      steps = fetch_alerts(row, [good_alert, bad_alert]).steps
      assert Enum.flat_map(steps, & &1.alerts) == []
    end

    test "shows stop alerts when row has no trip id" do
      alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{
              route: "routeid",
              route_type: 0,
              stop: "stopid",
              trip: nil,
              direction_id: nil
            }
          ],
          active_period: [{DateTime.from_unix!(1), nil}]
        )

      assert fetch_alerts(%{@itinerary_row | trip: nil}, [alert]).alerts == [alert]
    end

    test "shows route alerts when row has no trip id" do
      alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{
              route: "routeid",
              route_type: 0,
              stop: nil,
              trip: nil,
              direction_id: nil
            }
          ],
          active_period: [{DateTime.from_unix!(1), nil}]
        )

      assert fetch_alerts(%{@itinerary_row | trip: nil}, [alert]).alerts == [alert]
    end

    test "shows alerts if row route is nil" do
      alert =
        Alert.new(
          informed_entity: [
            %InformedEntity{
              route: "routeid",
              route_type: 0,
              stop: "stopid",
              trip: nil,
              direction_id: nil
            }
          ],
          active_period: [{DateTime.from_unix!(1), nil}]
        )

      assert fetch_alerts(%{@itinerary_row | route: nil}, [alert]).alerts == [alert]
    end
  end

  describe "intermediate_alerts/1" do
    @itinerary_row %ItineraryRow{
      stop: {"stop name", "stopid"},
      route: %Routes.Route{id: "routeid", type: 0},
      trip: %Schedules.Trip{id: "tripid"},
      departure: DateTime.from_unix!(2),
      transit?: true,
      steps: [
        %Dotcom.TripPlan.IntermediateStop{alerts: [Alert.new()]},
        %Dotcom.TripPlan.IntermediateStop{description: "step1", stop: %Stops.Stop{}}
      ],
      additional_routes: []
    }
    test "returns true if steps have alerts" do
      assert intermediate_alerts?(@itinerary_row)
    end
  end

  describe "name_from_position" do
    test "doesn't return stop id if stop is nil" do
      name = "stop name"

      assert {^name, nil} =
               name_from_position(%NamedPosition{stop: nil, name: name})
    end
  end

  describe "from_leg/3" do
    stub(Stops.Repo.Mock, :get, fn _ ->
      Stop.build(:stop)
    end)

    @personal_leg TripPlanner.build(:walking_leg)
    @transit_leg TripPlanner.build(:transit_leg)

    setup do
      stub(MBTA.Api.Mock, :get_json, fn path, _ ->
        cond do
          String.contains?(path, "trips") ->
            %JsonApi{data: [Api.build(:trip_item)]}

          String.contains?(path, "routes") ->
            %JsonApi{data: [Api.build(:route_item)]}

          true ->
            %JsonApi{data: []}
        end
      end)

      :ok
    end

    test "returns an itinerary row from a Leg" do
      leg = TripPlanner.build(:transit_leg)

      stub(Stops.Repo.Mock, :get_parent, fn id ->
        %Stops.Stop{id: id}
      end)

      row = from_leg(leg, nil)
      assert %ItineraryRow{} = row
    end

    test "formats transfer steps differently based on subsequent Leg" do
      leg = %Leg{
        @personal_leg
        | mode: %PersonalDetail{
            steps: [
              %PersonalDetail.Step{relative_direction: :depart, street_name: "Transfer"}
              | @personal_leg.mode.steps
            ]
          }
      }

      %ItineraryRow{steps: [xfer_step_to_personal | _]} = from_leg(leg, @personal_leg)
      %ItineraryRow{steps: [xfer_step_to_transit | _]} = from_leg(leg, @transit_leg)
      assert xfer_step_to_personal.description != xfer_step_to_transit.description
    end
  end
end
