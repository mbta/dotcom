defmodule Alerts.RepoTest do
  use ExUnit.Case

  alias Alerts.{Alert, Banner, Cache.Store, InformedEntity, InformedEntitySet, Repo}
  alias Test.Support.Factories

  @now Timex.now()

  setup_all do
    start_supervised(Store)

    :ok
  end

  describe "all/0" do
    test "returns the list of alerts from the store" do
      Store.update([%Alert{id: "alert!"}], nil)
      assert [%Alert{id: "alert!"}] = Repo.all(@now)
    end
  end

  describe "banner/0" do
    test "returns the banner if present" do
      Store.update([], %Banner{})
      assert %Banner{} = Repo.banner()
    end

    test "returns nil if no banner" do
      Store.update([], nil)
      assert nil == Repo.banner()
    end
  end

  describe "by_id/1" do
    setup do
      Store.update([%Alert{id: "alert!"}], nil)
    end

    test "returns an alert for this ID" do
      assert %Alert{id: "alert!"} = Repo.by_id("alert!")
    end
  end

  describe "by_route_ids/2" do
    @orange_entity %InformedEntity{route: "Orange"}
    @red_entity %InformedEntity{route: "Red"}
    @blue_entity %InformedEntity{route: "Blue"}
    @f2h_entity %InformedEntity{route: "Boat-F2H"}
    @f1_entity %InformedEntity{route: "Boat-F1"}
    test "returns the list of alerts from the store with the given route_ids" do
      orange_alert = Alert.new(id: "orange_alert", informed_entity: [@orange_entity])
      red_alert = Alert.new(id: "red_alert", informed_entity: [@red_entity])
      blue_alert = Alert.new(id: "blue_alert", informed_entity: [@blue_entity])
      Store.update([orange_alert, red_alert, blue_alert], nil)
      alerts = Repo.by_route_ids(["Orange", "Red"], @now)

      assert orange_alert in alerts
      assert red_alert in alerts
      refute blue_alert in alerts
    end

    test "returns both hingham/hull ferry alerts when F2H is requested" do
      f2h_alert = Alert.new(id: "ferry_alert", informed_entity: [@f2h_entity])
      f1_alert = Alert.new(id: "ferry_alert2", informed_entity: [@f1_entity])
      Store.update([f2h_alert, f1_alert], nil)
      alerts = Repo.by_route_id_and_type("Boat-F2H", 4, @now)
      assert f2h_alert in alerts
      assert f1_alert in alerts
    end

    test "returns an empty list of alerts when given an empty list of ids" do
      assert [] = Repo.by_route_ids([], @now)
    end
  end

  describe "planned_service_impacts_by_routes/2" do
    test "returns only planned service impacts for the given route_ids" do
      # Setup
      diversion = Factories.Alerts.Alert.build(:alert, effect: :service_change, severity: 3)
      non_diversion = Factories.Alerts.Alert.build(:alert, effect: :amber_alert, severity: 1)

      Store.update([diversion, non_diversion], nil)

      diversion_route =
        diversion.informed_entity.route |> MapSet.to_list() |> List.first()

      non_diversion_route =
        non_diversion.informed_entity.route |> MapSet.to_list() |> List.first()

      # Exercise
      diversions =
        Repo.planned_service_impacts_by_routes(
          [diversion_route, non_diversion_route],
          Timex.now()
        )

      # Verify
      assert [^diversion] = diversions
    end
  end

  describe "by_route_types/1" do
    @commuter_rail_entity %InformedEntity{route_type: 2}
    @bus_entity %InformedEntity{route_type: 3}
    @subway_entity %InformedEntity{route_type: 0}

    test "returns the list of alerts from the store with the given types" do
      commuter_rail_alert = %Alert{
        id: "commuter_rail_alert",
        informed_entity: InformedEntitySet.new([@commuter_rail_entity])
      }

      bus_alert = %Alert{id: "bus_alert", informed_entity: InformedEntitySet.new([@bus_entity])}

      subway_alert = %Alert{
        id: "subway_alert",
        informed_entity: InformedEntitySet.new([@subway_entity])
      }

      Store.update([commuter_rail_alert, bus_alert, subway_alert], nil)
      alerts = Repo.by_route_types([2, 0], @now)

      assert commuter_rail_alert in alerts
      assert subway_alert in alerts
      refute bus_alert in alerts
    end
  end

  describe "by_route_id_and_type/2" do
    @cr_entity1 %InformedEntity{route: "CR-Worcester", route_type: 2}
    @cr_entity2 %InformedEntity{route_type: 2}
    @bus_entity %InformedEntity{route_type: 3}
    @subway_entity %InformedEntity{route: "Green", route_type: 0}
    @subway_entity2 %InformedEntity{route_type: 0}

    test "returns all alerts with given route_id, or route_type when route_id is nil" do
      cr_alert1 = %Alert{id: "cr1", informed_entity: InformedEntitySet.new([@cr_entity1])}
      cr_alert2 = %Alert{id: "cr2", informed_entity: InformedEntitySet.new([@cr_entity2])}
      bus_alert = %Alert{id: "bus", informed_entity: InformedEntitySet.new([@bus_entity])}

      subway_alert = %Alert{
        id: "subway",
        informed_entity: InformedEntitySet.new([@subway_entity, @subway_entity2])
      }

      Store.update([cr_alert1, cr_alert2, bus_alert, subway_alert], nil)

      assert Repo.by_route_id_and_type("CR-Worcester", 2, @now) == [cr_alert1, cr_alert2]
      assert Repo.by_route_id_and_type("Green", 0, @now) == [subway_alert]
      assert Repo.by_route_id_and_type("66", 3, @now) == [bus_alert]
    end
  end

  describe "by_priority/2" do
    test "returns the list of alerts filterd by priority from the store" do
      Store.update(
        [
          %Alert{id: "high", priority: :high},
          %Alert{id: "low", priority: :low},
          %Alert{id: "system", priority: :system}
        ],
        nil
      )

      assert [%Alert{id: "high"}] = Repo.by_priority(@now, :high)
      assert [%Alert{id: "low"}] = Repo.by_priority(@now, :low)
      assert [%Alert{id: "system"}] = Repo.by_priority(@now, :system)
    end
  end
end
