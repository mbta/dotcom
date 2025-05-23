defmodule DotcomWeb.Components.PlannedDisruptionsTest do
  use ExUnit.Case

  import DotcomWeb.Components.PlannedDisruptions, only: [disruptions: 1]
  import Mox
  import Phoenix.LiveViewTest
  import Test.Support.Generators.DateTime, only: [random_time_range_date_time: 1]

  alias Dotcom.Utils.ServiceDateTime
  alias Test.Support.Factories

  setup :verify_on_exit!

  setup do
    stub(Dotcom.Alerts.AffectedStops.Mock, :affected_stops, fn _, _ -> [] end)
    stub(Dotcom.Alerts.EndpointStops.Mock, :endpoint_stops, fn _, _ -> [] end)
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    :ok
  end

  describe "disruptions/1" do
    test "formats the start and end dates as dates separated with an endash" do
      {beginning_of_week, _end_of_week} = ServiceDateTime.service_range_next_week()

      start_time =
        random_time_range_date_time(
          {beginning_of_week, beginning_of_week |> DateTime.shift(month: 1)}
        )

      end_time =
        random_time_range_date_time(
          {start_time |> DateTime.shift(day: 2), start_time |> DateTime.shift(month: 1)}
        )

      alerts = [
        Factories.Alerts.Alert.build(:alert, active_period: [{start_time, end_time}])
      ]

      html =
        render_component(&disruptions/1, %{
          disruptions: %{
            next_week: alerts
          }
        })

      formatted_date = date_from_status_label(html)

      assert formatted_date ==
               "#{formatted_date_time(start_time)} – #{formatted_date_time(end_time)}"
    end

    test "doesn't render as a range if the alert is on a single day" do
      {beginning_of_week, _end_of_week} = ServiceDateTime.service_range_next_week()

      start_time =
        random_time_range_date_time(
          {beginning_of_week, beginning_of_week |> DateTime.shift(month: 1)}
        )

      end_time =
        random_time_range_date_time(
          {start_time, start_time |> ServiceDateTime.end_of_service_day()}
        )

      alerts = [
        Factories.Alerts.Alert.build(:alert, active_period: [{start_time, end_time}])
      ]

      html =
        render_component(&disruptions/1, %{
          disruptions: %{
            next_week: alerts
          }
        })

      formatted_date = date_from_status_label(html)

      assert formatted_date ==
               "#{formatted_date_time(start_time)}"
    end

    test "renders a start time of today as 'Today'" do
      start_time = Dotcom.Utils.DateTime.now()

      end_time =
        random_time_range_date_time(
          {start_time |> DateTime.shift(day: 2), start_time |> DateTime.shift(month: 1)}
        )

      alerts = [
        Factories.Alerts.Alert.build(:alert, active_period: [{start_time, end_time}])
      ]

      html =
        render_component(&disruptions/1, %{
          disruptions: %{
            next_week: alerts
          }
        })

      formatted_date = date_from_status_label(html)

      assert formatted_date ==
               "Today – #{formatted_date_time(end_time)}"
    end

    test "renders a start time before today as 'Today'" do
      start_time = Faker.DateTime.backward(10)

      end_time =
        random_time_range_date_time(
          {Dotcom.Utils.DateTime.now() |> DateTime.shift(day: 2),
           start_time |> DateTime.shift(month: 1)}
        )

      alerts = [
        Factories.Alerts.Alert.build(:alert, active_period: [{start_time, end_time}])
      ]

      html =
        render_component(&disruptions/1, %{
          disruptions: %{
            next_week: alerts
          }
        })

      formatted_date = date_from_status_label(html)

      assert formatted_date ==
               "Today – #{formatted_date_time(end_time)}"
    end

    test "renders a nil start time as 'Until'" do
      start_time = nil

      end_time =
        random_time_range_date_time(
          {Dotcom.Utils.DateTime.now() |> DateTime.shift(day: 2),
           Dotcom.Utils.DateTime.now() |> DateTime.shift(month: 1)}
        )

      alerts = [
        Factories.Alerts.Alert.build(:alert, active_period: [{start_time, end_time}])
      ]

      html =
        render_component(&disruptions/1, %{
          disruptions: %{
            next_week: alerts
          }
        })

      formatted_date = date_from_status_label(html)

      assert formatted_date ==
               "Until #{formatted_date_time(end_time)}"
    end

    test "renders a nil end time as 'until further notice'" do
      {beginning_of_week, _end_of_week} = ServiceDateTime.service_range_next_week()

      start_time =
        random_time_range_date_time(
          {beginning_of_week, beginning_of_week |> DateTime.shift(month: 1)}
        )

      end_time = nil

      alerts = [
        Factories.Alerts.Alert.build(:alert, active_period: [{start_time, end_time}])
      ]

      html =
        render_component(&disruptions/1, %{
          disruptions: %{
            next_week: alerts
          }
        })

      formatted_date = date_from_status_label(html)

      assert formatted_date ==
               "#{formatted_date_time(start_time)} until further notice"
    end
  end

  defp date_from_status_label(html) do
    [formatted_date | _] =
      html
      |> Floki.find("[data-test=\"status_label_text\"]")
      |> Floki.text()
      |> String.trim()
      |> String.split(":")

    formatted_date
  end

  defp formatted_date_time(datetime) do
    datetime |> ServiceDateTime.service_date() |> Timex.format!("%a, %b %-d", :strftime)
  end
end
