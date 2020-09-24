defmodule SiteWeb.ScheduleController.Line.DiagramFormatTest do
  use ExUnit.Case, async: true

  import SiteWeb.DiagramHelpers
  import SiteWeb.ScheduleController.Line.DiagramFormat

  @now Timex.now()

  setup_all do
    {:ok,
     simple_line_diagram: setup_simple_line_diagram(),
     outward_line_diagram: setup_outward_line_diagram(),
     inward_line_diagram: setup_inward_line_diagram()}
  end

  describe "do_stops_list_with_disruptions/2" do
    test "formats shuttle stops", %{outward_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(line_diagram, ["place-nqncy", "place-brntn"], :shuttle, @now)

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-nqncy"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats detour stops", %{outward_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(line_diagram, ["place-nqncy", "place-brntn"], :detour, @now)

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-jfk", "place-nqncy", "place-brntn"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stop closure stops", %{outward_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(
          line_diagram,
          ["place-nqncy", "place-brntn"],
          :stop_closure,
          @now
        )

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-jfk", "place-nqncy", "place-brntn"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stops list with first shuttle", %{outward_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(line_diagram, ["place-alfcl", "place-jfk"], :shuttle, @now)

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-alfcl"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stops list with second shuttle", %{outward_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(line_diagram, ["place-shmnl", "place-asmnl"], :shuttle, @now)

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-shmnl"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stops list with first and second shuttle", %{outward_line_diagram: line_diagram} do
      adjusted_stops =
        stops_with_current_effect(line_diagram, ["place-alfcl", "place-jfk"], :shuttle, @now)
        |> stops_with_current_effect(["place-shmnl", "place-asmnl"], :shuttle, @now, 2)
        |> do_stops_list_with_disruptions(@now)

      assert ["place-alfcl", "place-shmnl"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stops list with detour and shuttle", %{
      outward_line_diagram: line_diagram
    } do
      adjusted_stops =
        stops_with_current_effect(
          line_diagram,
          ["place-alfcl", "place-jfk"],
          :detour,
          @now
        )
        |> stops_with_current_effect(["place-shmnl", "place-asmnl"], :shuttle, @now, 2)
        |> do_stops_list_with_disruptions(@now)

      disrupted_stops = adjusted_stops |> disrupted_stop_ids()

      assert ["place-alfcl", "place-jfk"] |> Enum.all?(&Enum.member?(disrupted_stops, &1)),
             "detour disruption"

      assert "place-shmnl" in disrupted_stops, "shuttle disruption (styled)"
      refute "place-asmnl" in disrupted_stops, "shuttle disruption (unstyled)"
    end

    test "formats stops list through merge stop", %{outward_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(
          line_diagram,
          ["place-jfk", "place-shmnl", "place-asmnl"],
          :shuttle,
          @now
        )

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-jfk", "place-shmnl"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stops for some other alert effect", %{outward_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(line_diagram, ["place-nqncy", "place-brntn"], :unknown, @now)

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert [] = adjusted_stops |> disrupted_stop_ids()
    end

    test "handles no alerts", %{outward_line_diagram: line_diagram} do
      adjusted_stops = do_stops_list_with_disruptions(line_diagram, @now)
      refute Enum.any?(adjusted_stops, &disruption(&1.stop_data))
    end
  end

  defp disruption(stop_data) do
    %{has_disruption?: has_disruption} = List.last(stop_data)
    has_disruption
  end

  defp disrupted_stop_ids(stops_list) do
    stops_list
    |> Enum.filter(&disruption(&1.stop_data))
    |> Enum.map(& &1.route_stop.id)
  end

  defp setup_simple_line_diagram do
    [
      {"place-alfcl", [stop: nil]},
      {"place-jfk", [stop: nil]},
      {"place-nqncy", [stop: nil]},
      {"place-brntn", [stop: nil]},
      {"place-shmnl", [stop: nil]},
      {"place-asmnl", [stop: nil]}
    ]
    |> route_stops_to_line_diagram_stops()
  end

  defp setup_inward_line_diagram do
    [
      {"place-asmnl", [terminus: "Alewife - Ashmont"]},
      {"place-shmnl", [stop: "Alewife - Ashmont"]},
      {"place-brntn", [line: "Alewife - Ashmont", terminus: "Alewife - Braintree"]},
      {"place-nqncy", [line: "Alewife - Ashmont", stop: "Alewife - Braintree"]},
      {"place-jfk", [merge: "Alewife - Ashmont", merge: "Alewife - Braintree"]},
      {"place-alfcl", [terminus: nil]}
    ]
    |> route_stops_to_line_diagram_stops()
  end

  defp setup_outward_line_diagram do
    [
      {"place-alfcl", [terminus: nil]},
      {"place-jfk", [merge: "Alewife - Ashmont", merge: "Alewife - Braintree"]},
      {"place-nqncy", [line: "Alewife - Ashmont", stop: "Alewife - Braintree"]},
      {"place-brntn", [line: "Alewife - Ashmont", terminus: "Alewife - Braintree"]},
      {"place-shmnl", [stop: "Alewife - Ashmont"]},
      {"place-asmnl", [terminus: "Alewife - Ashmont"]}
    ]
    |> route_stops_to_line_diagram_stops()
  end
end
