defmodule Dotcom.TripPlan.OpenStreetMapReconcilerTest do
  use ExUnit.Case

  import Dotcom.TripPlan.OpenStreetMapReconciler, only: [reconcile: 1, reconcile_location: 1]
  import Mox

  alias Dotcom.TripPlan.InputForm
  alias Dotcom.TripPlan.OpenStreetMapReconciler
  alias Test.Support.Factories.TripPlanner.InputForm

  @location_inside_state_house %{latitude: 42.35878, longitude: -71.063812}
  @location_outside_state_house %{latitude: 42.35754, longitude: -71.06377}

  @state_house_location OpenStreetMapReconciler.state_house_location()

  setup :verify_on_exit!

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  describe "reconcile_location/1" do
    test "does not alter a typical location" do
      # Setup
      location =
        InputForm.build(:location, @location_outside_state_house)

      # Exercise / Verify
      assert reconcile_location(location) == location
    end

    test "reconciles a location inside of the MA State House to the security booth outside instead" do
      # Setup
      location =
        InputForm.build(:location, @location_inside_state_house)

      # Exercise
      reconciled_location = reconcile_location(location)

      # Verify
      assert @state_house_location = reconciled_location
    end
  end

  describe "reconcile/1" do
    test "keeps the 'to' and 'from' fields the same for typical addresses" do
      # Setup
      form_data =
        InputForm.build(:form,
          from: InputForm.build(:location, @location_outside_state_house),
          to: InputForm.build(:location, @location_outside_state_house)
        )

      # Exercise
      reconciled_form_data = reconcile(form_data)

      # Verify
      assert reconciled_form_data == form_data
    end

    test "reconciles the 'from' field when needed" do
      # Setup
      form_data =
        InputForm.build(:form,
          from: InputForm.build(:location, @location_inside_state_house),
          to: InputForm.build(:location, @location_outside_state_house)
        )

      # Exercise
      reconciled_form_data = reconcile(form_data)

      # Verify
      assert @state_house_location = reconciled_form_data.from
      assert reconciled_form_data.to == form_data.to
    end

    test "reconciles the 'to' field when needed" do
      # Setup
      form_data =
        InputForm.build(:form,
          from: InputForm.build(:location, @location_outside_state_house),
          to: InputForm.build(:location, @location_inside_state_house)
        )

      # Exercise
      reconciled_form_data = reconcile(form_data)

      # Verify
      assert @state_house_location = reconciled_form_data.to
      assert reconciled_form_data.from == form_data.from
    end
  end
end
