defmodule DotcomWeb.Components.SystemStatus.SubwayStatusTest do
  use ExUnit.Case

  import Dotcom.Alerts, only: [service_impacting_effects: 0]
  import DotcomWeb.Components.SystemStatus.SubwayStatus
  import Mox
  import Phoenix.LiveViewTest

  alias Dotcom.SystemStatus.Subway
  alias Test.Support.Factories

  @lines_without_branches List.delete(Subway.lines(), "Green")

  setup :verify_on_exit!

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    :ok
  end

  describe "homepage_subway_status/1" do
    test "renders all rows as 'Normal Service' when there are no alerts" do
      # Setup
      alerts = []

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      rows
      |> Enum.each(fn row ->
        assert status_label_text_for_row(row) == "Normal Service"
      end)
    end

    test "shows all of the route pills by default" do
      # Setup
      alerts = []

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      assert rows
             |> Enum.each(fn row ->
               assert route_pill_visibility_for_row(row) == :visible
             end)
    end

    test "hides the second route pill for a line if that line has more than one alert" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      effects =
        Faker.Util.sample_uniq(2, fn -> Faker.Util.pick(service_impacting_effects()) end)

      alerts =
        effects
        |> Enum.map(
          &(Factories.Alerts.Alert.build(:alert_for_route, route_id: affected_line, effect: &1)
            |> Factories.Alerts.Alert.active_now())
        )

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      assert rows
             |> for_route(affected_line)
             |> Enum.map(&route_pill_visibility_for_row/1) ==
               [:visible, :invisible]
    end

    test "collapses alerts for non-branched lines if there would otherwise be more than five rows" do
      # Setup
      [affected_line_1, affected_line_2] =
        Faker.Util.sample_uniq(2, fn -> Faker.Util.pick(@lines_without_branches) end)

      effects_1 =
        Faker.Util.sample_uniq(2, fn -> Faker.Util.pick(service_impacting_effects()) end)

      effects_2 =
        Faker.Util.sample_uniq(2, fn -> Faker.Util.pick(service_impacting_effects()) end)

      alerts_for_affected_line_1 =
        effects_1
        |> Enum.map(
          &(Factories.Alerts.Alert.build(:alert_for_route,
              route_id: affected_line_1,
              effect: &1
            )
            |> Factories.Alerts.Alert.active_now())
        )

      alerts_for_affected_line_2 =
        effects_2
        |> Enum.map(
          &(Factories.Alerts.Alert.build(:alert_for_route,
              route_id: affected_line_2,
              effect: &1
            )
            |> Factories.Alerts.Alert.active_now())
        )

      # Exercise
      rows = status_rows_for_alerts(alerts_for_affected_line_1 ++ alerts_for_affected_line_2)

      # Verify
      assert rows |> for_route(affected_line_1) |> Enum.map(&status_label_text_for_row/1) == [
               "See Alerts"
             ]

      assert rows |> for_route(affected_line_2) |> Enum.map(&status_label_text_for_row/1) == [
               "See Alerts"
             ]
    end

    test "collapses Green line alerts if there would otherwise be more than five rows" do
      # Setup
      affected_branches =
        Faker.Util.sample_uniq(2, fn -> Faker.Util.pick(GreenLine.branch_ids()) end)

      alerts =
        affected_branches
        |> Enum.map(fn branch_id ->
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: branch_id,
            effect: Faker.Util.pick(service_impacting_effects())
          )
          |> Factories.Alerts.Alert.active_now()
        end)

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      [affected_branch_1, affected_branch_2] = affected_branches |> Enum.sort()

      [affected_row, _normal_row] =
        rows
        |> for_route("Green")

      assert affected_row |> Floki.find("[data-test=\"route_symbol:#{affected_branch_1}\"]") !=
               []

      assert affected_row |> Floki.find("[data-test=\"route_symbol:#{affected_branch_2}\"]") !=
               []

      assert status_label_text_for_row(affected_row) == "See Alerts"
    end

    test "includes normal-status Green line row for non-affected Green line branches when rows are collapsed" do
      # Setup
      affected_branches =
        Faker.Util.sample_uniq(2, fn -> Faker.Util.pick(GreenLine.branch_ids()) end)
        |> Enum.sort()

      alerts =
        affected_branches
        |> Enum.map(fn branch_id ->
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: branch_id,
            effect: Faker.Util.pick(service_impacting_effects())
          )
          |> Factories.Alerts.Alert.active_now()
        end)

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      [normal_branch_1, normal_branch_2] =
        GreenLine.branch_ids() -- affected_branches

      [_disrupted_row, normal_row] =
        rows
        |> for_route("Green")

      assert normal_row |> Floki.find("[data-test=\"route_symbol:#{normal_branch_1}\"]") !=
               []

      assert normal_row |> Floki.find("[data-test=\"route_symbol:#{normal_branch_2}\"]") !=
               []

      assert status_label_text_for_row(normal_row) == "Normal Service"
    end
  end

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
      assert Enum.find(img_attrs, &match?({"src", ^alert_image}, &1))
      assert Enum.find(img_attrs, &match?({"alt", ^alert_image_alternative_text}, &1))
    end
  end

  defp subway_status_alerts(route_id, num_alerts \\ 1, attrs \\ %{})

  defp subway_status_alerts("Green", num_alerts, attrs) do
    Factories.Alerts.Alert.build_list(
      num_alerts,
      :alert_for_routes,
      Map.merge(
        %{
          route_ids: GreenLine.branch_ids(),
          effect: service_impacting_effects() |> Faker.Util.pick()
        },
        attrs
      )
    )
  end

  defp subway_status_alerts(route_id, num_alerts, attrs) do
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

  defp status_rows_for_alerts(alerts) do
    render_component(&homepage_subway_status/1, %{subway_status: alerts |> subway_status()})
    |> Floki.find("a")
  end

  defp for_route(rows, route_id) do
    rows
    |> Enum.filter(fn row ->
      row |> Floki.find("[data-test=\"route_pill:#{route_id}\"]") != []
    end)
  end

  defp route_pill_visibility_for_row(row) do
    classes =
      row
      |> Floki.find("[data-route-pill]")
      |> Floki.attribute("class")
      |> Enum.join(" ")
      |> String.split()

    if "opacity-0" in classes do
      :invisible
    else
      :visible
    end
  end

  defp status_label_text_for_row(row) do
    row
    |> Floki.find("[data-test=\"status_label_text\"]")
    |> Floki.text()
    |> String.trim()
  end
end
