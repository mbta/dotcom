defmodule Dotcom.TripPlan.AntiCorruptionLayerTest do
  use ExUnit.Case

  import Dotcom.TripPlan.AntiCorruptionLayer, only: [convert_old_action: 1, convert_old_params: 1]
  import Mox
  import Test.Support.Factories.LocationService.LocationService

  setup :verify_on_exit!

  describe "convert_old_action/1" do
    test "returns all defaults when no params are given" do
      assert convert_old_action(%{}) == convert_old_action(%{"plan" => %{}})
    end

    test "returns params representing successfully geocoded result" do
      query = Faker.Address.street_address()
      geocoded_result = build(:address)

      expect(LocationService.Mock, :geocode, fn ^query ->
        {:ok, [geocoded_result]}
      end)

      assert convert_old_action(%{from: query}) == %{
               "plan" => %{
                 "from" => geocoded_result.formatted,
                 "from_latitude" => geocoded_result.latitude,
                 "from_longitude" => geocoded_result.longitude
               }
             }
    end

    test "returns all defaults when no address found" do
      query = Faker.Address.street_address()

      expect(LocationService.Mock, :geocode, fn _ ->
        {:ok, []}
      end)

      assert convert_old_action(%{from: query}) == %{"plan" => %{}}
    end

    test "returns all defaults for geocoding error" do
      query = Faker.Address.street_address()

      expect(LocationService.Mock, :geocode, fn _ ->
        {:error, :internal_error}
      end)

      assert convert_old_action(%{from: query}) == %{"plan" => %{}}
    end
  end

  describe "convert_old_params/1" do
    test "returns all defaults when no params are given" do
      assert convert_old_params(%{}) == convert_old_params(%{"plan" => %{}})
    end

    test "sets all modes to true when no modes are given" do
      old_params = %{
        "plan" => %{}
      }

      new_params = convert_old_params(old_params)

      assert new_params["modes"] == Dotcom.TripPlan.InputForm.initial_modes()
    end

    test "sets given modes as given and all non-given as false" do
      old_params = %{
        "plan" => %{
          "modes" => %{
            "bus" => "true",
            "ferry" => "false",
            "subway" => "true"
          }
        }
      }

      new_params = convert_old_params(old_params)

      assert new_params["modes"]["BUS"] == "true"
      assert new_params["modes"]["FERRY"] == "false"
      assert new_params["modes"]["RAIL"] == "false"
      assert new_params["modes"]["SUBWAY"] == "true"
    end

    test "defaults to wheelchair false when no wheelchair is given" do
      old_params = %{
        "plan" => %{}
      }

      new_params = convert_old_params(old_params)

      assert new_params["wheelchair"] == "false"
    end
  end
end
