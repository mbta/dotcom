defmodule Dotcom.SystemStatusTest do
  use ExUnit.Case

  import Dotcom.Alerts, only: [service_impacting_effects: 0]
  import Dotcom.SystemStatus

  import Dotcom.Utils.ServiceDateTime,
    only: [
      service_range_day: 0,
      service_range_next_week: 0
    ]

  import Mox
  import Test.Support.Factories.Alerts.Alert

  setup :verify_on_exit!

  setup _ do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    :ok
  end

  describe "subway_alerts_for_today/0" do
    test "requests alerts for all subway lines @ today datetime" do
      today = Test.Support.Generators.DateTime.random_date_time()

      # called first when fetching alerts, and again when filtering by active period
      expect(Dotcom.Utils.DateTime.Mock, :now, 2, fn ->
        today
      end)

      expect(Alerts.Repo.Mock, :by_route_ids, fn route_ids, datetime ->
        assert Enum.sort(route_ids) == Dotcom.Routes.subway_route_ids() |> Enum.sort()
        assert datetime == today

        []
      end)

      _ = subway_alerts_for_today()
    end

    # does Alerts.Repo.by_route_ids/2 not already scope results to the given day?
    test "filters alerts for falling within a day" do
      alert_today = service_range_day() |> disruption_alert()
      alert_next_week = service_range_next_week() |> disruption_alert()

      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        [alert_today, alert_next_week]
      end)

      assert [^alert_today] = subway_alerts_for_today()
    end

    test "filters alerts for service impact" do
      expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
        build_list(20, :alert, active_period: [service_range_day()])
      end)

      assert subway_alerts_for_today() |> Enum.all?(&(&1.effect in service_impacting_effects()))
    end
  end

  test "subway_status/0" do
    route_id_with_alerts = Dotcom.Routes.subway_route_ids() |> Faker.Util.pick()
    line = Dotcom.Routes.line_name_for_subway_route(route_id_with_alerts)

    alert =
      build(:alert_for_route,
        route_id: route_id_with_alerts,
        active_period: [service_range_day()],
        effect: service_impacting_effects() |> Faker.Util.pick()
      )

    expect(Alerts.Repo.Mock, :by_route_ids, fn _, _ ->
      [alert]
    end)

    assert %{^line => statuses} = subway_status()

    %{alerts: [^alert], status: non_normal_status} =
      Enum.find_value(statuses, fn %{status_entries: status_entries} ->
        Enum.find(status_entries, &(&1.status != :normal))
      end)

    assert non_normal_status == alert.effect
  end

  defp disruption_alert(active_period) do
    build(:alert,
      active_period: [active_period],
      effect: service_impacting_effects() |> Faker.Util.pick()
    )
  end
end
