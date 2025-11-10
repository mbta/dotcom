defmodule Dotcom.StopAmenityTest do
  use ExUnit.Case

  alias Test.Support.Factories

  import Dotcom.StopAmenity

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
      assert [%Dotcom.StopAmenity{} | _] = from_stop_facilities(facilities, "")
    end

    test "simplifies certain facility names" do
      facility_type = Faker.Util.pick([:elevator, :escalator])
      stop_name = Faker.Food.spice()

      facilities =
        Factories.Facilities.Facility.build_list(10, :facility,
          type: facility_type,
          long_name: fn ->
            # e.g. "StopName Elevator blah blah blah"
            amenity = String.capitalize("#{facility_type}")
            "#{stop_name} #{amenity} #{Faker.App.name()}"
          end
        )

      assert [%Dotcom.StopAmenity{facilities: amenity_facilities} | _] =
               from_stop_facilities(facilities, stop_name)

      refute Enum.any?(amenity_facilities, &String.starts_with?(&1.long_name, stop_name))
    end
  end
end
