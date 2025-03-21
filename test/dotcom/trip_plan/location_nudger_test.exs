defmodule Dotcom.TripPlan.LocationNudgerTest do
  alias Dotcom.TripPlan.LocationNudger
  alias Test.Support.Generators
  use ExUnit.Case

  import Dotcom.TripPlan.LocationNudger, only: [nudge: 1, nudge_location: 1]

  @state_house_address_strings ["24 Beacon St", "24 Beacon Street"]
  @state_house_location LocationNudger.state_house_location()
  @state_house_zip_codes LocationNudger.state_house_zip_codes()

  describe "nudge_location/1" do
    test "does not alter a typical location" do
      # Setup
      location = %{
        name: Generators.Address.address(),
        latitude: Faker.Address.latitude(),
        longitude: Faker.Address.longitude()
      }

      # Exercise / Verify
      assert nudge_location(location) == location
    end

    test "nudges addresses associated with the MA State House to the MA State House lat and long" do
      street_address = Faker.Util.pick(@state_house_address_strings)
      zip_code = Faker.Util.pick(@state_house_zip_codes)

      # Setup
      location = %{
        name: "#{Faker.Company.name()}, #{street_address}, Boston, MA, #{zip_code}, USA",
        latitude: Faker.Address.latitude(),
        longitude: Faker.Address.longitude()
      }

      # Exercise
      nudged_location = nudge_location(location)

      # Verify
      assert @state_house_location = nudged_location
    end

    test "does not nudge addresses to the State House if the zip code isn't one of the State House zip codes" do
      street_address = Faker.Util.pick(@state_house_address_strings)

      non_state_house_zip_code =
        fake_with_blocklist(
          fn -> Faker.Address.zip_code() end,
          @state_house_zip_codes
        )

      # Setup
      location = %{
        name:
          "#{Faker.Company.name()}, #{street_address}, Boston, MA, #{non_state_house_zip_code}, USA",
        latitude: Faker.Address.latitude(),
        longitude: Faker.Address.longitude()
      }

      # Exercise
      nudged_location = nudge_location(location)

      # Verify
      assert nudged_location == location
    end

    test "does not nudge addresses to the State House if they're not in Boston" do
      # Setup
      street_address = Faker.Util.pick(@state_house_address_strings)
      zip_code = Faker.Util.pick(@state_house_zip_codes)

      non_boston_city =
        fake_with_blocklist(
          fn -> Faker.Address.city() end,
          ["Boston"]
        )

      location = %{
        name:
          "#{Faker.Company.name()}, #{street_address}, #{non_boston_city}, MA, #{zip_code}, USA",
        latitude: Faker.Address.latitude(),
        longitude: Faker.Address.longitude()
      }

      # Exercise
      nudged_location = nudge_location(location)

      # Verify
      assert nudged_location == location
    end
  end

  describe "nudge/1" do
    test "keeps the 'to' and 'from' fields the same for typical addresses" do
      # Setup
      form_data = %{
        from: %{
          name: Generators.Address.address(),
          latitude: Faker.Address.latitude(),
          longitude: Faker.Address.longitude()
        },
        to: %{
          name: Generators.Address.address(),
          latitude: Faker.Address.latitude(),
          longitude: Faker.Address.longitude()
        }
      }

      # Exercise
      nudged_form_data = nudge(form_data)

      # Verify
      assert nudged_form_data == form_data
    end

    test "nudges the 'from' field when needed" do
      street_address = Faker.Util.pick(@state_house_address_strings)
      zip_code = Faker.Util.pick(@state_house_zip_codes)

      # Setup
      form_data = %{
        from: %{
          name: "#{Faker.Company.name()}, #{street_address}, Boston, MA, #{zip_code}, USA",
          latitude: Faker.Address.latitude(),
          longitude: Faker.Address.longitude()
        },
        to: %{
          name: Generators.Address.address(),
          latitude: Faker.Address.latitude(),
          longitude: Faker.Address.longitude()
        }
      }

      # Exercise
      nudged_form_data = nudge(form_data)

      # Verify
      assert @state_house_location = nudged_form_data.from
      assert nudged_form_data.to == form_data.to
    end

    test "nudges the 'to' field when needed" do
      street_address = Faker.Util.pick(@state_house_address_strings)
      zip_code = Faker.Util.pick(@state_house_zip_codes)

      # Setup
      form_data = %{
        from: %{
          name: Generators.Address.address(),
          latitude: Faker.Address.latitude(),
          longitude: Faker.Address.longitude()
        },
        to: %{
          name: "#{Faker.Company.name()}, #{street_address}, Boston, MA, #{zip_code}, USA",
          latitude: Faker.Address.latitude(),
          longitude: Faker.Address.longitude()
        }
      }

      # Exercise
      nudged_form_data = nudge(form_data)

      # Verify
      assert @state_house_location = nudged_form_data.to
      assert nudged_form_data.from == form_data.from
    end
  end

  defp fake_with_blocklist(fake_fun, blocklist) do
    value = fake_fun.()

    if blocklist |> Enum.member?(value) do
      fake_with_blocklist(fake_fun, blocklist)
    else
      value
    end
  end
end
