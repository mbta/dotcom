defmodule Dotcom.SystemStatus.AlertsTest do
  use ExUnit.Case, async: true

  import Test.Support.Factories.Alerts.Alert

  alias Dotcom.SystemStatus.Alerts

  defp local_datetime(naive) do
    DateTime.from_naive!(naive, "America/New_York")
  end

  describe "active_today?/2" do
    test "returns true if the alert is currently active" do
      assert Alerts.active_today?(
               build(:alert,
                 active_period: [
                   {
                     local_datetime(~N[2025-01-09 12:00:00]),
                     local_datetime(~N[2025-01-09 20:00:00])
                   }
                 ]
               ),
               local_datetime(~N[2025-01-09 13:00:00])
             )
    end

    test "returns false if the alert starts after end-of-service" do
      refute Alerts.active_today?(
               build(:alert,
                 active_period: [
                   {
                     local_datetime(~N[2025-01-10 12:00:00]),
                     local_datetime(~N[2025-01-10 20:00:00])
                   }
                 ]
               ),
               local_datetime(~N[2025-01-09 13:00:00])
             )
    end

    test "returns true if the alert starts later, but before end-of-service" do
      assert Alerts.active_today?(
               build(:alert,
                 active_period: [
                   {
                     local_datetime(~N[2025-01-09 20:00:00]),
                     local_datetime(~N[2025-01-10 20:00:00])
                   }
                 ]
               ),
               local_datetime(~N[2025-01-09 13:00:00])
             )
    end

    test "returns false if the alert has already ended" do
      refute Alerts.active_today?(
               build(:alert,
                 active_period: [
                   {
                     local_datetime(~N[2025-01-09 10:00:00]),
                     local_datetime(~N[2025-01-09 12:00:00])
                   }
                 ]
               ),
               local_datetime(~N[2025-01-09 13:00:00])
             )
    end

    test "returns true if the alert has no end time" do
      alert =
        build(:alert,
          active_period: [
            {
              local_datetime(~N[2025-01-09 10:00:00]),
              nil
            }
          ]
        )

      assert Alerts.active_today?(
               alert,
               local_datetime(~N[2025-01-09 13:00:00])
             )
    end

    test "returns false if the alert has no end time but hasn't started yet" do
      refute Alerts.active_today?(
               build(:alert,
                 active_period: [
                   {
                     local_datetime(~N[2025-01-10 10:00:00]),
                     nil
                   }
                 ]
               ),
               local_datetime(~N[2025-01-09 13:00:00])
             )
    end

    test "returns true if a later part of the alert's active period is active" do
      assert Alerts.active_today?(
               build(:alert,
                 active_period: [
                   {
                     local_datetime(~N[2025-01-08 10:00:00]),
                     local_datetime(~N[2025-01-08 12:00:00])
                   },
                   {
                     local_datetime(~N[2025-01-09 10:00:00]),
                     local_datetime(~N[2025-01-09 12:00:00])
                   }
                 ]
               ),
               local_datetime(~N[2025-01-09 11:00:00])
             )
    end
  end

  describe "for_today/2" do
    test "includes alerts that are active today" do
      alert1 =
        build(:alert,
          active_period: [
            {
              local_datetime(~N[2025-01-09 12:00:00]),
              local_datetime(~N[2025-01-09 20:00:00])
            }
          ]
        )

      alert2 =
        build(:alert,
          active_period: [
            {
              local_datetime(~N[2025-01-10 12:00:00]),
              local_datetime(~N[2025-01-10 20:00:00])
            }
          ]
        )

      assert Alerts.for_today(
               [alert1, alert2],
               local_datetime(~N[2025-01-09 13:00:00])
             ) == [alert1]
    end
  end

  describe "filter_relevant/1" do
    test "includes an alert if its effect is :delay" do
      alert = build(:alert, effect: :delay)
      assert Alerts.filter_relevant([alert]) == [alert]
    end

    test "includes an alert if its effect is :shuttle" do
      alert = build(:alert, effect: :shuttle)
      assert Alerts.filter_relevant([alert]) == [alert]
    end

    test "includes an alert if its effect is :suspension" do
      alert = build(:alert, effect: :suspension)
      assert Alerts.filter_relevant([alert]) == [alert]
    end

    test "includes an alert if its effect is :station_closure" do
      alert = build(:alert, effect: :station_closure)
      assert Alerts.filter_relevant([alert]) == [alert]
    end

    test "does not include alerts with other effects" do
      assert Alerts.filter_relevant([
               build(:alert, effect: :policy_change),
               build(:alert, effect: :extra_service),
               build(:alert, effect: :stop_closure)
             ]) == []
    end
  end
end
