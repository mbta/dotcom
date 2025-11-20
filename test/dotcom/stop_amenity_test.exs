defmodule Dotcom.StopAmenityTest do
  use ExUnit.Case

  alias Test.Support.Factories

  import Dotcom.StopAmenity

  setup _ do
    Mox.stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    :ok
  end

  defp current_facility_alert(facility_id) do
    active_period = [
      {Dotcom.Utils.DateTime.now(), Dotcom.Utils.DateTime.now() |> Timex.shift(hours: 1)}
    ]

    Factories.Alerts.Alert.build(:alert_for_informed_entity,
      active_period: active_period,
      informed_entity: %{facility: facility_id}
    )
  end

  describe "affected_by_alerts?/2" do
    test "true if alerts impact a facility" do
      facilities = Factories.Facilities.Facility.build_list(10, :facility)
      alert = List.first(facilities) |> Map.get(:id) |> current_facility_alert()
      assert affected_by_alerts?(%Dotcom.StopAmenity{facilities: facilities}, [alert])
    end

    test "false if alerts do not impact a facility" do
      facilities = Factories.Facilities.Facility.build_list(10, :facility)
      alerts = Factories.Alerts.Alert.build_list(10, :alert)
      refute affected_by_alerts?(%Dotcom.StopAmenity{facilities: facilities}, alerts)
    end
  end

  describe "alerts_for_amenity/2" do
    test "filters bike alerts" do
      alerts = Factories.Alerts.Alert.build_list(10, :alert)
      amenity_alert = Factories.Alerts.Alert.build(:alert, effect: :bike_issue)
      amenity = %Dotcom.StopAmenity{type: :bike}
      assert amenity_alert in alerts_for_amenity(amenity, [amenity_alert | alerts])
    end

    test "filters elevator alerts" do
      alerts = Factories.Alerts.Alert.build_list(10, :alert)
      amenity_alert = Factories.Alerts.Alert.build(:alert, effect: :elevator_closure)
      amenity = %Dotcom.StopAmenity{type: :elevator}
      assert amenity_alert in alerts_for_amenity(amenity, [amenity_alert | alerts])
    end

    test "filters escalator alerts" do
      alerts = Factories.Alerts.Alert.build_list(10, :alert)
      amenity_alert = Factories.Alerts.Alert.build(:alert, effect: :escalator_closure)
      amenity = %Dotcom.StopAmenity{type: :escalator}
      assert amenity_alert in alerts_for_amenity(amenity, [amenity_alert | alerts])
    end

    test "filters parking alerts" do
      alerts = Factories.Alerts.Alert.build_list(10, :alert)

      amenity_alert =
        Factories.Alerts.Alert.build(:alert,
          effect: Faker.Util.pick([:parking_closure, :parking_issue])
        )

      amenity = %Dotcom.StopAmenity{type: :parking}
      assert amenity_alert in alerts_for_amenity(amenity, [amenity_alert | alerts])
    end

    test "other amenities don't have alerts" do
      alerts = Factories.Alerts.Alert.build_list(10, :alert)
      amenity = %Dotcom.StopAmenity{type: Faker.Util.pick([:fare, :accessibility])}
      assert alerts_for_amenity(amenity, alerts) == []
    end
  end

  describe "from_stop_facilities/2" do
    test "creates amenities from a list of facilities" do
      facilities = Factories.Facilities.Facility.build_list(10, :facility)
      assert [%Dotcom.StopAmenity{} | _] = from_stop_facilities(facilities)
    end
  end
end
