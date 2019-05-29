defmodule SiteWeb.Schedule.TripListViewTest do
  use SiteWeb.ConnCase, async: true

  import SiteWeb.ScheduleView.TripList
  alias Predictions.Prediction
  alias Schedules.{Schedule, Trip}
  alias Stops.Stop
  import Phoenix.HTML, only: [safe_to_string: 1]

  describe "Schedule Alerts" do
    @route %Routes.Route{type: 1, id: "1"}
    @schedule %Schedule{route: @route, trip: %Trip{id: "trip"}, stop: %Stop{id: "stop"}}
    @prediction %Prediction{
      route: @route,
      trip: %Trip{id: "trip_pred"},
      stop: %Stop{id: "stop_pred"},
      status: "Nearby"
    }

    @alerts [
      Alerts.Alert.new(
        informed_entity: [%Alerts.InformedEntity{direction_id: 1, route: "1", trip: "trip"}]
      ),
      Alerts.Alert.new(
        informed_entity: [%Alerts.InformedEntity{direction_id: 1, route: "1", trip: "trip_pred"}]
      ),
      Alerts.Alert.new(
        informed_entity: [%Alerts.InformedEntity{direction_id: 1, route: "1", stop: "stop"}]
      ),
      Alerts.Alert.new(
        informed_entity: [%Alerts.InformedEntity{direction_id: 1, route: "1", stop: "stop_pred"}]
      )
    ]

    test "trip alerts use schedule for match" do
      predicted_schedule = %PredictedSchedule{schedule: @schedule, prediction: @prediction}
      alert = List.first(trip_alerts(predicted_schedule, @alerts, @route, 1))
      assert Enum.at(alert.informed_entity, 0).trip == "trip"
    end

    test "trip alerts use prediction if no schedule is available" do
      alert =
        List.first(trip_alerts(%PredictedSchedule{prediction: @prediction}, @alerts, @route, 1))

      assert Enum.at(alert.informed_entity, 0).trip == "trip_pred"
    end

    test "No trip alerts returned if no predicted schedule is given" do
      alerts = trip_alerts(nil, @alerts, @route, 1)
      assert Enum.empty?(alerts)
    end

    test "No trip alerts return if empty predicted schedule is given" do
      alerts = trip_alerts(%PredictedSchedule{}, @alerts, @route, 1)
      assert alerts == []
    end

    test "Trip alerts are not returned for bus routes" do
      route = %Routes.Route{type: 3, id: "1"}

      alerts =
        trip_alerts(
          %PredictedSchedule{schedule: @schedule, prediction: @prediction},
          @alerts,
          route,
          1
        )

      assert alerts == []
    end

    test "stop alerts use schedule for match" do
      predicted_schedule = %PredictedSchedule{schedule: @schedule, prediction: @prediction}
      alert = List.first(stop_alerts(predicted_schedule, @alerts, "1", 1))
      assert Enum.at(alert.informed_entity, 0).stop == "stop"
    end

    test "stop alerts use prediction if no schedule is avaulable" do
      alert =
        List.first(stop_alerts(%PredictedSchedule{prediction: @prediction}, @alerts, "1", 1))

      assert Enum.at(alert.informed_entity, 0).stop == "stop_pred"
    end

    test "No stop alerts returned if no predicted schedule is given" do
      alerts = stop_alerts(nil, @alerts, "1", 1)
      assert Enum.empty?(alerts)
    end

    test "No stop alerts return if empty predicted schedule is given" do
      alerts = stop_alerts(%PredictedSchedule{}, @alerts, "1", 1)
      assert alerts == []
    end
  end

  describe "frequency_times/1" do
    test "returns \"Every X mins\" if there is service during a time block" do
      frequency = %Schedules.Frequency{max_headway: 11, min_headway: 3, time_block: :am_rush}
      rendered = frequency |> SiteWeb.ScheduleView.TripList.frequency_times() |> safe_to_string
      assert rendered =~ "Every 3-11"
      assert rendered =~ "mins"
      assert rendered =~ "minutes"
    end

    test "returns \"No service between these hours\" if there is no service" do
      rendered =
        %Schedules.Frequency{}
        |> SiteWeb.ScheduleView.TripList.frequency_times()
        |> safe_to_string

      assert rendered == "<span>No service between these hours</span>"
    end
  end

  describe "display_alerts/1" do
    test "alerts are not displayed if no alerts are given" do
      assert safe_to_string(display_alerts([])) == ""
    end

    test "Icon is displayed if alerts are given" do
      assert safe_to_string(display_alerts(["alert"])) =~ "icon-alert"
    end
  end

  describe "stop_name_link_with_alerts/3" do
    test "adds a no-wrap around the last word of the link text and the icon" do
      alerts = [Alerts.Alert.new()]
      result = stop_name_link_with_alerts("name", "url", alerts)
      assert result |> Phoenix.HTML.safe_to_string() =~ "<a href=\"url\">"
      assert result |> Phoenix.HTML.safe_to_string() =~ "<span class=\"inline-block\">name<svg"
    end

    test "when there are no alerts, just makes a link" do
      alerts = []
      result = stop_name_link_with_alerts("name", "url", alerts)
      assert result |> Phoenix.HTML.safe_to_string() =~ "<a href=\"url\">"
      refute result |> Phoenix.HTML.safe_to_string() =~ "<svg"
    end
  end

  describe "trip_expansion_link/3" do
    @date ~D[2017-05-05]

    test "Does not return link when no expansion", %{conn: conn} do
      refute trip_expansion_link(:none, @date, conn)
    end

    test "Shows expand link when collapsed", %{conn: conn} do
      conn = %{conn | query_params: %{}}
      assert safe_to_string(trip_expansion_link(:collapsed, @date, conn)) =~ "Show all trips for"
    end

    test "Shows collapse link when expanded", %{conn: conn} do
      conn = %{conn | query_params: %{}}

      assert safe_to_string(trip_expansion_link(:expanded, @date, conn)) =~
               "Show upcoming trips only"
    end
  end
end
