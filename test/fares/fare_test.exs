defmodule Fares.FareTest do
  use ExUnit.Case, async: true
  @moduletag :external

  alias Fares.Fare

  describe "valid_modes/1" do
    test "returns a list containing the primary mode and all other valid modes" do
      fare = %Fare{
        additional_valid_modes: [:bus],
        cents: 9_000,
        duration: :month,
        media: [:charlie_card, :charlie_ticket],
        mode: :subway,
        name: :subway,
        price_label: nil,
        reduced: nil
      }

      assert Fare.valid_modes(fare) == [:subway, :bus]
    end

    test "returns an empty list when given nil" do
      assert Fare.valid_modes(nil) == []
    end
  end
end
