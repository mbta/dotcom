defmodule TransferTest do
  use ExUnit.Case
  # @moduletag :external

  import TripPlan.Transfer
  alias TripPlan.{Leg, NamedPosition, PersonalDetail, TransitDetail}

  describe "maybe_transfer?/1 correctly identifies the potential presence of a transfer [assumes single ride media]" do
    leg_for_route = fn id -> %Leg{mode: %TransitDetail{route: %Routes.Route{id: id}}} end
    @bus_leg leg_for_route.("77")
    @other_bus_leg leg_for_route.("28")
    @subway_leg leg_for_route.("Red")
    @other_subway_leg leg_for_route.("Orange")
    @cr_leg leg_for_route.("CR-Lowell")
    @ferry_leg leg_for_route.("Boat-F4")
    @xp_leg leg_for_route.("505")
    @other_xp_leg leg_for_route.("553")
    @sl_rapid_leg leg_for_route.("741")
    @sl_bus_leg leg_for_route.("751")
    @shuttle_leg leg_for_route.("Shuttle-GovernmentCenterOakGrove")

    test "if from or to is nil" do
      refute [nil, nil] |> maybe_transfer?
      refute [@subway_leg, nil] |> maybe_transfer?
      refute [nil, @bus_leg] |> maybe_transfer?
    end

    test "subway -> subway" do
      assert [@subway_leg, @other_subway_leg] |> maybe_transfer?
    end

    test "subway -> local bus" do
      assert [@subway_leg, @bus_leg] |> maybe_transfer?
    end

    test "local bus -> subway" do
      assert [@bus_leg, @subway_leg] |> maybe_transfer?
    end

    test "local bus -> local bus" do
      assert [@bus_leg, @other_bus_leg] |> maybe_transfer?
    end

    test "express bus -> subway" do
      assert [@xp_leg, @subway_leg] |> maybe_transfer?
    end

    test "express bus -> local bus" do
      assert [@xp_leg, @bus_leg] |> maybe_transfer?
    end

    test "SL4 -> local bus" do
      assert [@sl_bus_leg, @bus_leg] |> maybe_transfer?
    end

    test "SL1 -> local bus" do
      assert [@sl_rapid_leg, @bus_leg] |> maybe_transfer?
    end

    test "local bus -> the same local bus" do
      refute [@bus_leg, @bus_leg] |> maybe_transfer?
    end

    test "express bus -> express bus" do
      assert [@xp_leg, @other_xp_leg] |> maybe_transfer?
    end

    test "commuter rail -> any other mode" do
      refute [@cr_leg, @cr_leg] |> maybe_transfer?
      refute [@cr_leg, @subway_leg] |> maybe_transfer?
      refute [@cr_leg, @bus_leg] |> maybe_transfer?
      refute [@cr_leg, @xp_leg] |> maybe_transfer?
      refute [@cr_leg, @sl_bus_leg] |> maybe_transfer?
      refute [@cr_leg, @sl_rapid_leg] |> maybe_transfer?
    end

    test "ferry -> any other mode" do
      refute [@ferry_leg, @ferry_leg] |> maybe_transfer?
      refute [@ferry_leg, @subway_leg] |> maybe_transfer?
      refute [@ferry_leg, @bus_leg] |> maybe_transfer?
      refute [@ferry_leg, @xp_leg] |> maybe_transfer?
      refute [@ferry_leg, @sl_bus_leg] |> maybe_transfer?
      refute [@ferry_leg, @sl_rapid_leg] |> maybe_transfer?
    end

    test "shuttle -> subway or bus" do
      refute maybe_transfer?([@shuttle_leg, @bus_leg])
      refute maybe_transfer?([@shuttle_leg, @subway_leg])
    end

    test "bus -> bus -> subway" do
      assert [@other_bus_leg, @bus_leg, @subway_leg] |> maybe_transfer?
    end

    test "subway -> bus -> bus" do
      assert [@subway_leg, @bus_leg, @other_bus_leg] |> maybe_transfer?
    end
  end

  describe "subway_transfer?/1" do
    test "picks a transit-transit sequence" do
      legs_with_transfer = [
        %Leg{
          mode: %PersonalDetail{
            steps: [
              %PersonalDetail.Step{
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
              %PersonalDetail.Step{
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
