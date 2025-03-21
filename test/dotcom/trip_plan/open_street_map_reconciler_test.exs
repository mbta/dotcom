defmodule Dotcom.TripPlan.OpenStreetMapReconcilerTest do
  use ExUnit.Case

  import Dotcom.TripPlan.OpenStreetMapReconciler, only: [reconcile: 1, reconcile_location: 1]
  import Test.Support.Generators.FakeWithBlocklist, only: [fake_with_blocklist: 2]

  alias Dotcom.TripPlan.OpenStreetMapReconciler
  alias Test.Support.Factories.TripPlanner.TripPlanner

  @state_house_address_strings ["24 Beacon St", "24 Beacon Street"]
  @state_house_location OpenStreetMapReconciler.state_house_location()
  @state_house_zip_codes OpenStreetMapReconciler.state_house_zip_codes()

  describe "reconcile_location/1" do
    test "does not alter a typical location" do
      # Setup
      location = TripPlanner.build(:input_form_location)

      # Exercise / Verify
      assert reconcile_location(location) == location
    end

    test "reconciles addresses associated with the MA State House to the MA State House lat and long" do
      street_address = Faker.Util.pick(@state_house_address_strings)
      zip_code = Faker.Util.pick(@state_house_zip_codes)

      # Setup
      location =
        TripPlanner.build(:input_form_location,
          name: "#{Faker.Company.name()}, #{street_address}, Boston, MA, #{zip_code}, USA"
        )

      # Exercise
      reconciled_location = reconcile_location(location)

      # Verify
      assert @state_house_location = reconciled_location
    end

    test "does not reconcile addresses to the State House if the zip code isn't one of the State House zip codes" do
      street_address = Faker.Util.pick(@state_house_address_strings)

      non_state_house_zip_code =
        fake_with_blocklist(
          fn -> Faker.Address.zip_code() end,
          @state_house_zip_codes
        )

      # Setup
      location =
        TripPlanner.build(:input_form_location,
          name:
            "#{Faker.Company.name()}, #{street_address}, Boston, MA, #{non_state_house_zip_code}, USA"
        )

      # Exercise
      reconciled_location = reconcile_location(location)

      # Verify
      assert reconciled_location == location
    end

    test "does not reconcile addresses to the State House if they're not in Boston" do
      # Setup
      street_address = Faker.Util.pick(@state_house_address_strings)
      zip_code = Faker.Util.pick(@state_house_zip_codes)

      non_boston_city =
        fake_with_blocklist(
          fn -> Faker.Address.city() end,
          ["Boston"]
        )

      location =
        TripPlanner.build(:input_form_location,
          name:
            "#{Faker.Company.name()}, #{street_address}, #{non_boston_city}, MA, #{zip_code}, USA"
        )

      # Exercise
      reconciled_location = reconcile_location(location)

      # Verify
      assert reconciled_location == location
    end

    test "reconciles locations to the State House lat/long if they have 'Massachusetts State House' and 'City of Boston' in the name" do
      # Setup
      location =
        TripPlanner.build(:input_form_location,
          name: "Massachusetts State House #{Faker.Company.name()}, City of Boston, MA, USA"
        )

      # Exercise
      reconciled_location = reconcile_location(location)

      # Verify
      assert @state_house_location = reconciled_location
    end
  end

  describe "reconcile/1" do
    test "keeps the 'to' and 'from' fields the same for typical addresses" do
      # Setup
      form_data = %{
        from: TripPlanner.build(:input_form_location),
        to: TripPlanner.build(:input_form_location)
      }

      # Exercise
      reconciled_form_data = reconcile(form_data)

      # Verify
      assert reconciled_form_data == form_data
    end

    test "reconciles the 'from' field when needed" do
      street_address = Faker.Util.pick(@state_house_address_strings)
      zip_code = Faker.Util.pick(@state_house_zip_codes)

      # Setup
      form_data = %{
        from:
          TripPlanner.build(:input_form_location,
            name: "#{Faker.Company.name()}, #{street_address}, Boston, MA, #{zip_code}, USA"
          ),
        to: TripPlanner.build(:input_form_location)
      }

      # Exercise
      reconciled_form_data = reconcile(form_data)

      # Verify
      assert @state_house_location = reconciled_form_data.from
      assert reconciled_form_data.to == form_data.to
    end

    test "reconciles the 'to' field when needed" do
      street_address = Faker.Util.pick(@state_house_address_strings)
      zip_code = Faker.Util.pick(@state_house_zip_codes)

      # Setup
      form_data = %{
        from: TripPlanner.build(:input_form_location),
        to:
          TripPlanner.build(:input_form_location,
            name: "#{Faker.Company.name()}, #{street_address}, Boston, MA, #{zip_code}, USA"
          )
      }

      # Exercise
      reconciled_form_data = reconcile(form_data)

      # Verify
      assert @state_house_location = reconciled_form_data.to
      assert reconciled_form_data.from == form_data.from
    end
  end
end
