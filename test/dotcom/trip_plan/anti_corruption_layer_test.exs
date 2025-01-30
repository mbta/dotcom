defmodule Dotcom.TripPlan.AntiCorruptionLayerTest do
  use ExUnit.Case

  import Dotcom.TripPlan.AntiCorruptionLayer, only: [convert_old_params: 1, decode: 1, encode: 1]
  import Mox

  setup :verify_on_exit!

  describe "decode/1" do
    test "maintains timezone information when decoding datetimes" do
      # Setup
      datetime = Timex.now("America/New_York")
      encoded = encode(%{"datetime" => datetime})

      # Exercise
      decoded = decode(encoded)

      # Verify
      assert decoded["datetime"] == datetime
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
