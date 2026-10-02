defmodule DotcomWeb.SystemStatus.CommuterRailUpcomingChangesTest do
  use ExUnit.Case

  import DotcomWeb.Components.PlannedDisruptions, only: [format_date_range_for_alert: 1]
  import Mox
  import Phoenix.LiveViewTest

  alias DotcomWeb.Components.SystemStatus.CommuterRailUpcomingChanges
  alias Test.Support.Factories

  setup do
    stub(Dotcom.Alerts.AffectedStops.Mock, :affected_stops, fn _, _ -> [] end)
    stub(Dotcom.Alerts.EndpointStops.Mock, :endpoint_stops, fn _, _ -> [] end)
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  describe "commuter_rail_upcoming_changes/1" do
    test "only shows alerts active in the next seven days" do
      # SETUP
      today = Util.now()
      within_week = DateTime.shift(today, day: 5)
      after_week = DateTime.shift(today, day: 9)

      alert1 = Factories.Alerts.Alert.build(:alert, active_period: [{within_week, nil}])
      alert2 = Factories.Alerts.Alert.build(:alert, active_period: [{after_week, nil}])

      # EXERCISE
      rendered_alert_text = upcoming_alert_rows([alert1, alert2])

      # VERIFY
      assert Enum.count(rendered_alert_text) == 1
      assert row_time_text_matches_alert_data?(Enum.at(rendered_alert_text, 0), alert1)
    end

    test "shows \"No changes posted for the next 7 days\" when there are no alerts in the next seven days" do
      # SETUP
      today = Util.now()
      later = DateTime.shift(today, day: 9)

      alert1 = Factories.Alerts.Alert.build(:alert, active_period: [{later, nil}])
      alert2 = Factories.Alerts.Alert.build(:alert, active_period: [{later, nil}])

      # EXERCISE
      rendered_component = render_upcoming_changes([alert1, alert2])

      # VERIFY
      assert String.contains?(
               rendered_component,
               "No changes posted for the next 7 days"
             )
    end

    test "displays alerts earliest to latest, first on start time bounded by today, then by end time" do
      # SETUP
      today = Util.now()
      earlier = DateTime.shift(today, day: -2)
      even_earlier = DateTime.shift(today, day: -5)
      later = DateTime.shift(today, day: 1)
      even_later = DateTime.shift(later, day: 4)
      most_later = DateTime.shift(today, day: 6)

      alert1 = Factories.Alerts.Alert.build(:alert, active_period: [{earlier, later}])
      alert2 = Factories.Alerts.Alert.build(:alert, active_period: [{today, even_later}])
      alert3 = Factories.Alerts.Alert.build(:alert, active_period: [{even_earlier, nil}])
      alert4 = Factories.Alerts.Alert.build(:alert, active_period: [{later, even_later}])
      alert5 = Factories.Alerts.Alert.build(:alert, active_period: [{later, most_later}])

      ordered_alerts = [alert1, alert2, alert3, alert4, alert5]

      ordered_alerts
      |> Enum.map(&DotcomWeb.Components.PlannedDisruptions.format_date_range_for_alert(&1))

      # EXERCISE
      rendered_alert_text = upcoming_alert_rows(Enum.shuffle(ordered_alerts))

      # VERIFY
      alert_text_matches =
        rendered_alert_text
        |> Enum.with_index()
        |> Enum.map(fn {element, index} ->
          row_time_text_matches_alert_data?(element, Enum.at(ordered_alerts, index))
        end)

      assert Enum.all?(alert_text_matches)
    end

    test "doesn't render a link to alerts if there are no later alerts" do
      # SETUP / EXERCISE / VERIFY
      assert later_changes_link([]) == []
    end

    test "renders a link to alerts if there is at least one later alert" do
      # SETUP
      today = Util.now()
      later = DateTime.shift(today, day: 9)

      alert1 = Factories.Alerts.Alert.build(:alert, active_period: [{later, nil}])
      alert2 = Factories.Alerts.Alert.build(:alert, active_period: [{later, nil}])

      # EXERCISE / VERIFY
      assert length(later_changes_link([alert1, alert2])) == 1
    end
  end

  defp later_changes_link(alerts) do
    render_upcoming_changes(alerts)
    |> Floki.parse_document()
    |> Kernel.then(fn {:ok, document} -> document end)
    |> Floki.find("[data-test=\"later_changes_link\"]")
  end

  defp render_upcoming_changes(alerts) do
    render_component(&CommuterRailUpcomingChanges.commuter_rail_upcoming_changes/1, %{
      alerts: alerts,
      route_id: Faker.Color.fancy_name()
    })
  end

  defp row_time_text_matches_alert_data?(row_text, alert) do
    time_text =
      row_text
      |> String.split(":")
      |> Enum.at(0)

    time_text == format_date_range_for_alert(alert)
  end

  defp upcoming_alert_rows(alerts) do
    render_upcoming_changes(alerts)
    |> Floki.parse_document()
    |> Kernel.then(fn {:ok, document} -> document end)
    |> Floki.find("[data-test=\"status_label_text\"]")
    |> Enum.map(&Floki.text/1)
    |> Enum.map(&String.trim/1)
  end
end
