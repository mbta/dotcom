defmodule DotcomWeb.Components.SystemStatus.SubwayStatusTest do
  use ExUnit.Case

  import Dotcom.Alerts, only: [service_impacting_effects: 0]
  import DotcomWeb.Components.SystemStatus.SubwayStatus
  import Mox
  import Phoenix.LiveViewTest
  import Test.Support.Generators.DateTime, only: [random_time_range_date_time: 1]

  alias Dotcom.SystemStatus.Subway
  alias Test.Support.Factories

  @effects_with_simple_descriptions service_impacting_effects()
                                    |> Enum.reject(fn {effect, _} -> effect == :delay end)
  @alert_effects_with_endpoints [:service_change, :shuttle, :suspension]
  @lines_without_branches List.delete(Subway.lines(), "Green")

  setup :verify_on_exit!

  setup do
    stub(Dotcom.Alerts.AffectedStops.Mock, :affected_stops, fn _, _ -> [] end)
    stub(Dotcom.Alerts.EndpointStops.Mock, :endpoint_stops, fn _, _ -> [] end)
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

    test "does not show any subheadings" do
      # Setup
      alerts = []

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      assert rows
             |> Enum.each(fn row ->
               assert status_subheading_for_row(row) == ""
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

    test "collapses Green line alerts into two rows if there would otherwise be more than five total" do
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
      assert rows
             |> for_route("Green")
             |> Enum.map(&status_label_text_for_row/1) == ["See Alerts", "Normal Service"]
    end

    test "groups Green line alerts correctly between normal and affected rows when collapsed" do
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
      [affected_branch_1, affected_branch_2] = affected_branches

      [normal_branch_1, normal_branch_2] =
        GreenLine.branch_ids() -- affected_branches

      [affected_row, normal_row] =
        rows
        |> for_route("Green")

      assert normal_row |> has_route_symbol_for_branch?(normal_branch_1)
      assert normal_row |> has_route_symbol_for_branch?(normal_branch_2)
      refute normal_row |> has_route_symbol_for_branch?(affected_branch_1)
      refute normal_row |> has_route_symbol_for_branch?(affected_branch_2)

      refute affected_row |> has_route_symbol_for_branch?(normal_branch_1)
      refute affected_row |> has_route_symbol_for_branch?(normal_branch_2)
      assert affected_row |> has_route_symbol_for_branch?(affected_branch_1)
      assert affected_row |> has_route_symbol_for_branch?(affected_branch_2)
    end

    test "does not collapse Green line rows if there are two alerts and other collapsing is happening" do
      # Setup
      affected_branch_id =
        Faker.Util.pick(GreenLine.branch_ids())

      {branch_effect, branch_severity} = Faker.Util.pick(@effects_with_simple_descriptions)
      {line_effect, line_severity} = Faker.Util.pick(@effects_with_simple_descriptions)

      gl_alerts = [
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_branch_id,
          effect: branch_effect,
          severity: branch_severity
        )
        |> Factories.Alerts.Alert.active_now(),
        Factories.Alerts.Alert.build(:alert_for_routes,
          route_ids: GreenLine.branch_ids(),
          effect: line_effect,
          severity: line_severity
        )
        |> Factories.Alerts.Alert.active_now()
      ]

      other_affected_route_id = Faker.Util.pick(@lines_without_branches)

      other_effects =
        Faker.Util.sample_uniq(2, fn -> Faker.Util.pick(service_impacting_effects()) end)

      other_alerts =
        other_effects
        |> Enum.map(fn effect ->
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: other_affected_route_id,
            effect: effect
          )
          |> Factories.Alerts.Alert.active_now()
        end)

      # Exercise
      rows = status_rows_for_alerts(gl_alerts ++ other_alerts)

      # Verify
      assert rows
             |> for_route("Green")
             |> Enum.map(&status_label_text_for_row/1) == [
               status_label_text_for_effect(line_effect),
               status_label_text_for_effect(branch_effect)
             ]
    end

    test "collapses Green line rows if there is a Mattapan alert" do
      # Setup
      {effect, severity} = Faker.Util.pick(service_impacting_effects())

      alerts = [
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: Faker.Util.pick(GreenLine.branch_ids()),
          effect: effect,
          severity: severity
        )
        |> Factories.Alerts.Alert.active_now(),
        Factories.Alerts.Alert.build(:alert_for_routes,
          route_ids: GreenLine.branch_ids(),
          effect: effect,
          severity: severity
        )
        |> Factories.Alerts.Alert.active_now(),
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: "Mattapan",
          effect: effect,
          severity: severity
        )
        |> Factories.Alerts.Alert.active_now()
      ]

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      assert rows
             |> for_route("Green")
             |> Enum.map(&status_label_text_for_row/1) == [
               "See Alerts"
             ]
    end

    test "collapses normal and affected Green line rows together if there is a Mattapan alert" do
      # Setup
      {random_effect, random_severity} = Faker.Util.pick(service_impacting_effects())

      alerts = [
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: Faker.Util.pick(GreenLine.branch_ids()),
          effect: random_effect,
          severity: random_severity
        )
        |> Factories.Alerts.Alert.active_now(),
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: "Mattapan",
          effect: random_effect,
          severity: random_severity
        )
        |> Factories.Alerts.Alert.active_now()
      ]

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      assert rows
             |> for_route("Green")
             |> Enum.map(&status_label_text_for_row/1) == [
               "See Alerts"
             ]
    end

    test "does not collapse Mattapan alerts" do
      # Setup
      {mattapan_effect, mattapan_severity} = Faker.Util.pick(@effects_with_simple_descriptions)

      alerts = [
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: Faker.Util.pick(GreenLine.branch_ids()),
          effect: Faker.Util.pick(@effects_with_simple_descriptions)
        )
        |> Factories.Alerts.Alert.active_now(),
        Factories.Alerts.Alert.build(:alert_for_routes,
          route_ids: GreenLine.branch_ids(),
          effect: Faker.Util.pick(@effects_with_simple_descriptions)
        )
        |> Factories.Alerts.Alert.active_now(),
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: "Mattapan",
          effect: mattapan_effect,
          severity: mattapan_severity
        )
        |> Factories.Alerts.Alert.active_now()
      ]

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      assert rows
             |> for_route("Red")
             |> Enum.map(&status_label_text_for_row/1) == [
               # Red line, main branch
               "Normal Service",

               # Mattapan branch
               status_label_text_for_effect(mattapan_effect)
             ]
    end

    test "shows a subheading for a single stop closure" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      alert =
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_line,
          effect: :station_closure
        )
        |> Factories.Alerts.Alert.active_now()

      stop = Factories.Stops.Stop.build(:stop)
      expect(Dotcom.Alerts.AffectedStops.Mock, :affected_stops, fn _, _ -> [stop] end)

      # Exercise
      rows = status_rows_for_alerts([alert])

      # Verify
      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_subheading_for_row/1) ==
               [stop.name]
    end

    test "shows a correctly-formatted subheading for two stop closures" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      alert =
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_line,
          effect: :station_closure
        )
        |> Factories.Alerts.Alert.active_now()

      stops = Factories.Stops.Stop.build_list(2, :stop)
      expect(Dotcom.Alerts.AffectedStops.Mock, :affected_stops, fn _, _ -> stops end)

      # Exercise
      rows = status_rows_for_alerts([alert])

      # Verify
      [stop1, stop2] = stops

      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_subheading_for_row/1) ==
               ["#{stop1.name} & #{stop2.name}"]
    end

    test "shows a correctly-formatted subheading for three stop closures" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      alert =
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_line,
          effect: :station_closure
        )
        |> Factories.Alerts.Alert.active_now()

      stops = Factories.Stops.Stop.build_list(3, :stop)

      expect(Dotcom.Alerts.AffectedStops.Mock, :affected_stops, fn _, _ -> stops end)

      # Exercise
      rows = status_rows_for_alerts([alert])

      # Verify
      [stop1, stop2, stop3] = stops

      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_subheading_for_row/1) ==
               ["#{stop1.name}, #{stop2.name} & #{stop3.name}"]
    end

    test "does not show individual stop names when four or more stops are closed" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      alert =
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_line,
          effect: :station_closure
        )
        |> Factories.Alerts.Alert.active_now()

      count = Faker.random_between(4, 10)
      stops = Factories.Stops.Stop.build_list(count, :stop)

      expect(Dotcom.Alerts.AffectedStops.Mock, :affected_stops, fn _, _ -> stops end)

      # Exercise
      rows = status_rows_for_alerts([alert])

      # Verify
      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_subheading_for_row/1) ==
               ["#{count} Stops"]
    end

    test "does not attempt to find affected stops when the status isn't station_closure" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      {effect, _severity} =
        Faker.Util.pick(service_impacting_effects() -- [{:station_closure, 1}])

      alert =
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_line,
          effect: effect
        )
        |> Factories.Alerts.Alert.active_now()

      expect(Dotcom.Alerts.AffectedStops.Mock, :affected_stops, 0, fn _, _ -> [] end)

      # Exercise
      status_rows_for_alerts([alert])
    end

    test "shows 'Station Closure' singular if a single station is closed" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      alert =
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_line,
          effect: :station_closure
        )
        |> Factories.Alerts.Alert.active_now()

      expect(Dotcom.Alerts.AffectedStops.Mock, :affected_stops, fn _, _ ->
        [Factories.Stops.Stop.build(:stop)]
      end)

      # Exercise
      rows = status_rows_for_alerts([alert])

      # Verify
      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_label_text_for_row/1) ==
               ["Station Closure"]
    end

    test "shows 'Station Closures' plural if multiple stations are closed" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      alert =
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_line,
          effect: :station_closure
        )
        |> Factories.Alerts.Alert.active_now()

      expect(Dotcom.Alerts.AffectedStops.Mock, :affected_stops, fn _, _ ->
        Factories.Stops.Stop.build_list(Faker.random_between(2, 10), :stop)
      end)

      # Exercise
      rows = status_rows_for_alerts([alert])

      # Verify
      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_label_text_for_row/1) ==
               ["Station Closures"]
    end

    test "shows a subheading for a shuttle or suspension with endpoints" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      alert =
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_line,
          effect: Faker.Util.pick(@alert_effects_with_endpoints)
        )
        |> Factories.Alerts.Alert.active_now()

      first_stop = Factories.Stops.Stop.build(:stop)
      last_stop = Factories.Stops.Stop.build(:stop)

      expect(Dotcom.Alerts.EndpointStops.Mock, :endpoint_stops, fn _, _ ->
        [{first_stop, last_stop}]
      end)

      # Exercise
      rows = status_rows_for_alerts([alert])

      # Verify
      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_subheading_for_row/1) ==
               ["#{first_stop.name} \u2194 #{last_stop.name}"]
    end

    test "shows a single stop instead of an endpoint range if the first and last stops are the same" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      alert =
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_line,
          effect: Faker.Util.pick(@alert_effects_with_endpoints)
        )
        |> Factories.Alerts.Alert.active_now()

      stop = Factories.Stops.Stop.build(:stop)

      expect(Dotcom.Alerts.EndpointStops.Mock, :endpoint_stops, fn _, _ ->
        [{stop, stop}]
      end)

      # Exercise
      rows = status_rows_for_alerts([alert])

      # Verify
      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_subheading_for_row/1) ==
               ["#{stop.name}"]
    end

    test "does not show a subheading if there's more than one endpoint" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      alert =
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_line,
          effect: Faker.Util.pick(@alert_effects_with_endpoints)
        )
        |> Factories.Alerts.Alert.active_now()

      first_stop1 = Factories.Stops.Stop.build(:stop)
      last_stop1 = Factories.Stops.Stop.build(:stop)

      first_stop2 = Factories.Stops.Stop.build(:stop)
      last_stop2 = Factories.Stops.Stop.build(:stop)

      expect(Dotcom.Alerts.EndpointStops.Mock, :endpoint_stops, fn _, _ ->
        [{first_stop1, last_stop1}, {first_stop2, last_stop2}]
      end)

      # Exercise
      rows = status_rows_for_alerts([alert])

      # Verify
      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_subheading_for_row/1) == [""]
    end

    test "renders direction-strings as endpoints when given" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      alert =
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_line,
          effect: Faker.Util.pick(@alert_effects_with_endpoints)
        )
        |> Factories.Alerts.Alert.active_now()

      first_stop = Faker.Cat.breed()
      last_stop = Faker.Cat.breed()

      expect(Dotcom.Alerts.EndpointStops.Mock, :endpoint_stops, fn _, _ ->
        [{first_stop, last_stop}]
      end)

      # Exercise
      rows = status_rows_for_alerts([alert])

      # Verify
      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_subheading_for_row/1) ==
               ["#{first_stop} \u2194 #{last_stop}"]
    end

    test "gives endpoints readable aria labels" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      alert =
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_line,
          effect: Faker.Util.pick(@alert_effects_with_endpoints)
        )
        |> Factories.Alerts.Alert.active_now()

      first_stop = Faker.Cat.breed()
      last_stop = Faker.Cat.breed()

      expect(Dotcom.Alerts.EndpointStops.Mock, :endpoint_stops, fn _, _ ->
        [{first_stop, last_stop}]
      end)

      # Exercise
      rows = status_rows_for_alerts([alert])

      # Verify
      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_subheading_a11y_for_row/1) ==
               ["between #{first_stop} and #{last_stop}"]
    end

    test "shows a subheading of 'Due to Single Tracking' for single-tracking delays" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      alert =
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_line,
          effect: :delay,
          cause: :single_tracking
        )
        |> Factories.Alerts.Alert.active_now()

      # Exercise
      rows = status_rows_for_alerts([alert])

      # Verify
      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_subheading_for_row/1) ==
               ["Due to Single Tracking"]
    end

    test "shows a subheading of 'Due to Single Tracking' for multiple single-tracking delays" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      alerts =
        [
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: affected_line,
            effect: :delay,
            cause: :single_tracking
          )
          |> Factories.Alerts.Alert.active_now(),
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: affected_line,
            effect: :delay,
            cause: :single_tracking
          )
          |> Factories.Alerts.Alert.active_now()
        ]

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_subheading_for_row/1) ==
               ["Due to Single Tracking"]
    end

    test "does not show a single-tracking-subheading if there are non-single-tracking delays" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      alerts =
        [
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: affected_line,
            effect: :delay,
            cause: :single_tracking
          )
          |> Factories.Alerts.Alert.active_now(),
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: affected_line,
            effect: :delay
          )
          |> Factories.Alerts.Alert.active_now()
        ]

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_subheading_for_row/1) ==
               [""]
    end

    test "shows effect name singular if there is a single alert for the effect" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      {effect, _severity} =
        Faker.Util.pick(
          @effects_with_simple_descriptions -- [{:station_closure, 1}, {:shuttle, 1}]
        )

      alert =
        Factories.Alerts.Alert.build(:alert_for_route,
          route_id: affected_line,
          effect: effect
        )
        |> Factories.Alerts.Alert.active_now()

      # Exercise
      rows = status_rows_for_alerts([alert])

      # Verify
      expected_status_text = effect |> status_label_text_for_effect()

      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_label_text_for_row/1) ==
               [expected_status_text]
    end

    test "shows effect name plural if there are multiple alerts for the effect" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      {effect, _severity} =
        Faker.Util.pick(@effects_with_simple_descriptions -- [{:station_closure, 1}])

      alerts =
        1..2
        |> Enum.map(fn _ ->
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: affected_line,
            effect: effect
          )
          |> Factories.Alerts.Alert.active_now()
        end)

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      expected_status_text = effect |> status_label_text_for_effect() |> Inflex.pluralize()

      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_label_text_for_row/1) ==
               [expected_status_text]
    end

    test "shows a prefix if the alert applies in the future" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      start_time =
        random_time_range_date_time({now, Dotcom.Utils.ServiceDateTime.end_of_service_day(now)})

      affected_line = Faker.Util.pick(@lines_without_branches)

      {effect, _severity} = Faker.Util.pick(service_impacting_effects() -- [{:delay, 2}])

      alerts =
        [
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: affected_line,
            effect: effect
          )
          |> Factories.Alerts.Alert.active_starting_at(start_time)
        ]

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      expected_status_desc = effect |> status_label_text_for_effect()
      expected_prefix = Util.narrow_time(start_time)
      expected_status_text = "#{expected_prefix}: #{expected_status_desc}"

      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_label_text_for_row/1) ==
               [expected_status_text]
    end

    test "shows 'Now' as a prefix if there are any alerts in the future" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      start_time =
        random_time_range_date_time({now, Dotcom.Utils.ServiceDateTime.end_of_service_day(now)})

      affected_line = Faker.Util.pick(@lines_without_branches)

      {effect1, _severity} = Faker.Util.pick(@effects_with_simple_descriptions)
      {effect2, _severity} = Faker.Util.pick(@effects_with_simple_descriptions)

      alerts =
        [
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: affected_line,
            effect: effect1
          )
          |> Factories.Alerts.Alert.active_now(),
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: affected_line,
            effect: effect2
          )
          |> Factories.Alerts.Alert.active_starting_at(start_time)
        ]

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      expected_status_desc1 = effect1 |> status_label_text_for_effect()
      expected_status_text1 = "Now: #{expected_status_desc1}"

      expected_status_desc2 = effect2 |> status_label_text_for_effect()
      expected_prefix2 = Util.narrow_time(start_time)
      expected_status_text2 = "#{expected_prefix2}: #{expected_status_desc2}"

      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_label_text_for_row/1) ==
               [expected_status_text1, expected_status_text2]
    end

    test "shows a human-readable delay severity (e.g. 'up to 20 min') for delays" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      severity = Faker.random_between(3, 9)

      alerts =
        [
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: affected_line,
            effect: :delay,
            severity: severity
          )
          |> Factories.Alerts.Alert.active_now()
        ]

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      expected_status_text = "Delays #{human_delay_severity(severity)}"

      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_label_text_for_row/1) ==
               [expected_status_text]
    end

    test "shows the human delay severity for the more severe delay if there are multiple" do
      # Setup
      affected_line = Faker.Util.pick(@lines_without_branches)

      [severity1, severity2] =
        Faker.Util.sample_uniq(2, fn -> Faker.random_between(3, 9) end) |> Enum.sort()

      alerts =
        [severity1, severity2]
        |> Enum.map(fn sev ->
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: affected_line,
            effect: :delay,
            severity: sev
          )
          |> Factories.Alerts.Alert.active_now()
        end)
        |> Enum.shuffle()

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      expected_status_text = "Delays #{human_delay_severity(severity2)}"

      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_label_text_for_row/1) ==
               [expected_status_text]
    end

    test "shows 'Expect Delay' instead of 'Delay' for a future delay" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      start_time =
        random_time_range_date_time({now, Dotcom.Utils.ServiceDateTime.end_of_service_day(now)})

      affected_line = Faker.Util.pick(@lines_without_branches)

      severity = Faker.random_between(3, 9)

      alerts =
        [
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: affected_line,
            effect: :delay,
            severity: severity
          )
          |> Factories.Alerts.Alert.active_starting_at(start_time)
        ]

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      expected_prefix = Util.narrow_time(start_time)

      expected_status_text =
        "#{expected_prefix}: Expect Delays #{human_delay_severity(severity)}"

      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_label_text_for_row/1) ==
               [expected_status_text]
    end

    test "shows 'Now: Delay' instead of 'Now: Expect Delay'" do
      # Setup
      now = Dotcom.Utils.DateTime.now()

      start_time =
        random_time_range_date_time({now, Dotcom.Utils.ServiceDateTime.end_of_service_day(now)})

      affected_line = Faker.Util.pick(@lines_without_branches)

      severity1 = Faker.random_between(3, 9)

      {effect2, _severity} = Faker.Util.pick(service_impacting_effects() -- [{:delay, 2}])

      alerts =
        [
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: affected_line,
            effect: :delay,
            severity: severity1
          )
          |> Factories.Alerts.Alert.active_now(),
          Factories.Alerts.Alert.build(:alert_for_route,
            route_id: affected_line,
            effect: effect2
          )
          |> Factories.Alerts.Alert.active_starting_at(start_time)
        ]

      # Exercise
      rows = status_rows_for_alerts(alerts)

      # Verify
      expected_status_text1 = "Now: Delays #{human_delay_severity(severity1)}"

      expected_status_desc2 = effect2 |> status_label_text_for_effect()
      expected_prefix2 = Util.narrow_time(start_time)
      expected_status_text2 = "#{expected_prefix2}: #{expected_status_desc2}"

      assert rows
             |> for_route(affected_line)
             |> Enum.map(&status_label_text_for_row/1) ==
               [expected_status_text1, expected_status_text2]
    end
  end

  defp has_route_symbol_for_branch?(row, branch_id) do
    row |> Floki.find("[data-test=\"route_symbol:#{branch_id}\"]") != []
  end

  describe "alerts_subway_status/1" do
    test "if no alerts, shows normal service for every subway line" do
      document =
        render_component(&alerts_subway_status/1, %{subway_status: subway_status([])})
        |> Floki.parse_document!()

      for line_name <- Dotcom.Routes.subway_line_ids() do
        assert document
               |> Floki.find("[data-test-row-route-info*=\"#{line_name}\"]")
               |> Floki.text() =~
                 "Normal Service"
      end
    end

    test "displays multiple rows when multiple alerts affect the same line" do
      for {effect, severity} <- @effects_with_simple_descriptions do
        route = Dotcom.Routes.subway_route_ids() |> Faker.Util.pick()
        num_alerts = Faker.Util.pick(2..6)

        subway_status =
          subway_status_alerts(route, num_alerts, %{effect: effect, severity: severity})
          |> subway_status()

        document =
          render_component(&alerts_subway_status/1, %{subway_status: subway_status})
          |> Floki.parse_document!()

        row_count =
          Floki.find(document, "[data-test-row-route-info*=\"#{route}\"]") |> Enum.count()

        assert row_count == num_alerts, "#{row_count} rows don't match #{num_alerts} alerts"

        singular_effect =
          if(effect == :station_closure,
            do: "Station Closure",
            else: effect |> Atom.to_string() |> Recase.to_title()
          )

        assert document |> Floki.text() =~ singular_effect

        if effect != :shuttle do
          refute document |> Floki.text() =~ Inflex.pluralize(singular_effect)
        end
      end
    end

    test "contains alert information in a row with alerts" do
      route = Dotcom.Routes.subway_route_ids() |> Faker.Util.pick()
      alerts = subway_status_alerts(route)
      status = %{subway_status: subway_status(alerts)}

      document =
        render_component(&alerts_subway_status/1, status)
        |> Floki.parse_document!()

      details = Floki.find(document, "[data-test-row-route-info*=\"#{route}\"]")

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
    status = %{subway_status: subway_status(alerts)}

    document =
      render_component(&homepage_subway_status/1, status)
      |> Floki.parse_document!()

    Floki.find(document, "[data-test=\"status-row\"]")
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

  defp status_label_text_for_effect(:delay), do: "Delays"
  defp status_label_text_for_effect(:shuttle), do: "Shuttles"
  defp status_label_text_for_effect(:station_closure), do: "Station Closure"
  defp status_label_text_for_effect(effect), do: effect |> Atom.to_string() |> Recase.to_title()

  defp human_delay_severity(severity) do
    Alerts.Alert.human_severity(%Alerts.Alert{effect: :delay, severity: severity})
  end

  defp status_subheading_for_row(row) do
    row
    |> Floki.find("[data-test=\"status_subheading\"]")
    |> Floki.text()
    |> String.trim()
  end

  defp status_subheading_a11y_for_row(row) do
    row
    |> Floki.find("[data-test=\"status_subheading\"]")
    |> Floki.attribute("aria-label")
    |> List.first()
  end
end
