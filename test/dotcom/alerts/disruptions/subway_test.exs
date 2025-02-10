defmodule Dotcom.Alerts.Disruptions.SubwayTest do
  use ExUnit.Case

  describe "future_disruptions/0" do
    test "returns disruptions that occur any time after today's service range" do
      # Exercise/Verify
      assert %{} = Dotcom.Alerts.Disruptions.Subway.future_disruptions()
    end
  end

  describe "todays_disruptions/0" do
    test "returns disruptions that occur during today's service range" do
      # Exercise/Verify
      assert %{} = Dotcom.Alerts.Disruptions.Subway.todays_disruptions()
    end
  end
end
