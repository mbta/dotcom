defmodule Dotcom.TripPlan.TransferTest do
  use ExUnit.Case, async: true

  import Dotcom.TripPlan.Transfer
  import Mox

  alias Dotcom.TripPlan.Leg
  alias Dotcom.TripPlan.NamedPosition
  alias Dotcom.TripPlan.PersonalDetail
  alias Dotcom.TripPlan.TransitDetail
  alias OpenTripPlannerClient.Schema.Step
  alias Stops.Repo.Mock
  alias Test.Support.Factories.Stops.Stop
  alias Test.Support.Factories.TripPlanner.TripPlanner

  setup :verify_on_exit!

  setup do
    stub(Mock, :get, fn _ ->
      Stop.build(:stop)
    end)

    :ok
  end

  describe "maybe_transfer?/1 correctly identifies the potential presence of a transfer [assumes single ride media]" do
    defp bus_leg, do: TripPlanner.build(:bus_leg)
    defp subway_leg, do: TripPlanner.build(:subway_leg)
    defp cr_leg, do: TripPlanner.build(:cr_leg)
    defp ferry_leg, do: TripPlanner.build(:ferry_leg)
    defp xp_leg, do: TripPlanner.build(:express_bus_leg)
    defp sl_rapid_leg, do: TripPlanner.build(:sl_rapid_leg)
    defp shuttle_leg, do: TripPlanner.build(:shuttle_leg)

    test "if from or to is nil" do
      refute maybe_transfer?([nil, nil])
      refute maybe_transfer?([subway_leg(), nil])
      refute maybe_transfer?([nil, bus_leg()])
    end

    test "subway -> subway" do
      assert maybe_transfer?([subway_leg(), subway_leg()])
    end

    test "subway -> local bus" do
      assert maybe_transfer?([subway_leg(), bus_leg()])
    end

    test "local bus -> subway" do
      assert maybe_transfer?([bus_leg(), subway_leg()])
    end

    test "local bus -> local bus" do
      assert maybe_transfer?([bus_leg(), bus_leg()])
    end

    test "express bus -> subway" do
      assert maybe_transfer?([xp_leg(), subway_leg()])
    end

    test "express bus -> local bus" do
      assert maybe_transfer?([xp_leg(), bus_leg()])
    end

    test "SL1 -> local bus" do
      assert maybe_transfer?([sl_rapid_leg(), bus_leg()])
    end

    test "local bus -> the same local bus" do
      bus_leg = bus_leg()
      refute maybe_transfer?([bus_leg, bus_leg])
    end

    test "express bus -> express bus" do
      assert maybe_transfer?([xp_leg(), xp_leg()])
    end

    test "commuter rail -> any other mode" do
      refute maybe_transfer?([cr_leg(), cr_leg()])
      refute maybe_transfer?([cr_leg(), subway_leg()])
      refute maybe_transfer?([cr_leg(), bus_leg()])
      refute maybe_transfer?([cr_leg(), xp_leg()])
      refute maybe_transfer?([cr_leg(), sl_rapid_leg()])
    end

    test "ferry -> any other mode" do
      refute maybe_transfer?([ferry_leg(), ferry_leg()])
      refute maybe_transfer?([ferry_leg(), subway_leg()])
      refute maybe_transfer?([ferry_leg(), bus_leg()])
      refute maybe_transfer?([ferry_leg(), xp_leg()])
      refute maybe_transfer?([ferry_leg(), sl_rapid_leg()])
    end

    test "shuttle -> subway or bus" do
      refute maybe_transfer?([shuttle_leg(), bus_leg()])
      refute maybe_transfer?([shuttle_leg(), subway_leg()])
    end

    test "bus -> bus -> subway" do
      assert maybe_transfer?([bus_leg(), bus_leg(), subway_leg()])
    end

    test "subway -> bus -> bus" do
      assert maybe_transfer?([subway_leg(), bus_leg(), bus_leg()])
    end
  end

  describe "subway_transfer?/1" do
    test "picks a transit-transit sequence" do
      expect(Mock, :get_parent, 2, fn _ -> %Stops.Stop{id: "parent-station"} end)

      legs_with_transfer = [
        %Leg{
          mode: %PersonalDetail{
            steps: [
              %Step{
                street_name: "Path"
              }
            ]
          }
        },
        %Leg{
          mode: %TransitDetail{
            route: %Routes.Route{id: "Green-C"}
          },
          to: %NamedPosition{
            stop: %Stops.Stop{id: "70202"}
          }
        },
        %Leg{
          mode: %TransitDetail{
            route: %Routes.Route{id: "Blue"}
          },
          from: %NamedPosition{
            stop: %Stops.Stop{id: "70040"}
          }
        }
      ]

      legs_without_transfer = [
        %Leg{
          mode: %TransitDetail{
            route: %Routes.Route{id: "Green-C"}
          },
          to: %NamedPosition{
            stop: %Stops.Stop{id: "70202"}
          }
        },
        %Leg{
          mode: %PersonalDetail{
            steps: [
              %Step{
                street_name: "Path"
              }
            ]
          },
          from: %NamedPosition{
            stop: %Stops.Stop{id: "70202"}
          },
          to: %NamedPosition{
            stop: %Stops.Stop{id: "70040"}
          }
        }
      ]

      assert subway_transfer?(legs_with_transfer)
      refute subway_transfer?(legs_without_transfer)
    end

    test "handles transfers within the Winter St. Concourse" do
      expect(Mock, :get_parent, 2, fn _ -> %Stops.Stop{id: "parent-station"} end)

      leg_to_park = %Leg{
        mode: %TransitDetail{
          route: %Routes.Route{id: "Green-C"}
        },
        to: %NamedPosition{
          stop: %Stops.Stop{id: "70200"}
        }
      }

      leg_from_dtx = %Leg{
        mode: %TransitDetail{
          route: %Routes.Route{id: "Orange"}
        },
        from: %NamedPosition{
          stop: %Stops.Stop{id: "70020"}
        }
      }

      assert subway_transfer?([leg_to_park, leg_from_dtx])
    end
  end
end
