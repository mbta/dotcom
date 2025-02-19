defmodule DotcomWeb.Components.SystemStatus.SubwayStatusTest do
  use ExUnit.Case

  import Dotcom.Alerts, only: [service_impacting_effects: 0]
  import DotcomWeb.Components.SystemStatus.SubwayStatus
  import Phoenix.LiveViewTest

  alias Dotcom.SystemStatus.Subway
  alias Test.Support.Factories

  describe "alerts_subway_status/1" do
    test "if no alerts, shows normal service for every subway line" do
      html = render_component(&alerts_subway_status/1, %{subway_status: subway_status([])})

      for line_name <- Dotcom.Routes.subway_line_ids() do
        assert html |> Floki.find("[data-test-row-route-info*=\"#{line_name}\"]") |> Floki.text() =~
                 "Normal Service"
      end
    end

    test "displays multiple rows when multiple alerts affect the same line" do
      for effect <- service_impacting_effects() do
        route = Dotcom.Routes.subway_route_ids() |> Faker.Util.pick()
        num_alerts = Faker.Util.pick(2..6)

        subway_status =
          subway_status_alerts(route, num_alerts, %{effect: effect})
          |> subway_status()

        html = render_component(&alerts_subway_status/1, %{subway_status: subway_status})
        row_count = Floki.find(html, "[data-test-row-route-info*=\"#{route}\"]") |> Enum.count()
        assert row_count == num_alerts, "#{row_count} rows don't match #{num_alerts} alerts"

        singular_effect =
          if(effect == :station_closure,
            do: "Station Closure",
            else: effect |> Atom.to_string() |> String.capitalize()
          )

        assert html =~ singular_effect
        refute html =~ Inflex.pluralize(singular_effect)
      end
    end

    test "contains alert information in a row with alerts" do
      route = Dotcom.Routes.subway_route_ids() |> Faker.Util.pick()
      alerts = subway_status_alerts(route)
      html = render_component(&alerts_subway_status/1, %{subway_status: subway_status(alerts)})
      details = Floki.find(html, "details[data-test-row-route-info*=\"#{route}\"]")

      [
        %Alerts.Alert{
          header: alert_header,
          image: alert_image,
          image_alternative_text: alert_image_alternative_text
        }
      ] = alerts

      assert Floki.text(details) =~ alert_header
      assert [{"img", img_attrs, _}] = Floki.find(details, "img")
      assert [{"src", ^alert_image}, {"alt", ^alert_image_alternative_text} | _] = img_attrs
    end
  end

  defp subway_status_alerts(route_id, num_alerts \\ 1, attrs \\ %{}) do
    Factories.Alerts.Alert.build_list(
      num_alerts,
      :alert_for_route,
      Map.merge(
        %{route_id: route_id, effect: service_impacting_effects() |> Faker.Util.pick()},
        attrs
      )
    )
  end

  defp subway_status(alerts) do
    Subway.subway_status(alerts, Dotcom.Utils.DateTime.now())
  end
end
