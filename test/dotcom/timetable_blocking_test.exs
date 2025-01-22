defmodule Dotcom.TimetableBlockingTest do
  @moduledoc false
  use ExUnit.Case, async: true

  alias Dotcom.TimetableBlocking

  @date ~D[2025-01-01]
  @route %Routes.Route{id: "CR-route"}

  describe "blocking_alert/3" do
    test "returns an alert if there's a specially tagged alert without a PDF" do
      alert =
        Alerts.Alert.new(
          header: "No timetable. #{TimetableBlocking.no_pdf_text()}",
          informed_entity: [%Alerts.InformedEntity{route: @route.id}],
          active_period: [{~U[2025-01-01T00:00:00Z], nil}]
        )

      assert TimetableBlocking.blocking_alert([alert], @route, @date) == alert
    end

    test "returns an alert if there's a specially tagged alert with a PDF" do
      alert =
        Alerts.Alert.new(
          header: "No timetable. #{TimetableBlocking.pdf_available_text()}",
          informed_entity: [%Alerts.InformedEntity{route: @route.id}],
          active_period: [{~U[2025-01-01T00:00:00Z], nil}],
          url: "https://www.mbta.com/pdf-link"
        )

      assert TimetableBlocking.blocking_alert([alert], @route, @date) == alert
    end

    test "returns nil if there's no special alert" do
      ie = %Alerts.InformedEntity{route: "CR-route"}
      active_period = {~U[2025-01-01T00:00:00Z], ~U[2025-01-01T23:59:59Z]}

      alerts = [
        Alerts.Alert.new(
          header: "Regular alert.",
          informed_entity: [ie],
          active_period: [active_period]
        ),
        Alerts.Alert.new(
          header: "Not active. #{TimetableBlocking.no_pdf_text()}",
          informed_entity: [ie],
          active_period: [{~U[2025-06-06T00:00:00Z], nil}]
        ),
        Alerts.Alert.new(
          header: "Different route. #{TimetableBlocking.no_pdf_text()}",
          informed_entity: [%Alerts.InformedEntity{route: "bus"}],
          active_period: [active_period]
        )
      ]

      assert TimetableBlocking.blocking_alert(alerts, @route, @date) == nil
    end
  end
end
