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

  test "prior_stop/2 finds prior stop", %{simple_line_diagram: stops} do
    expected_stop_with_previous = [
      {"place-alfcl", nil},
      {"place-jfk", "place-alfcl"},
      {"place-nqncy", "place-jfk"},
      {"place-brntn", "place-nqncy"},
      {"place-shmnl", "place-brntn"},
      {"place-asmnl", "place-shmnl"}
    ]

    for {stop_id, prev_id} <- expected_stop_with_previous do
      stop = Enum.find(stops, &(&1.route_stop.id == stop_id))
      prior = prior_stop(stop, stops)

      if prev_id do
        id = prior |> List.first() |> Map.get(:route_stop) |> Map.get(:id)
        assert id == prev_id, "stop before #{stop_id} should be #{prev_id} but is #{id}"
      else
        refute prior_stop(stop, stops), "stop before #{stop_id} should be nil"
      end
    end
  end

  test "prior_stop/2 finds prior stop (in)", %{inward_line_diagram: stops} do
    expected_stop_with_previous = [
      {"place-asmnl", nil},
      {"place-shmnl", "place-asmnl"},
      {"place-brntn", nil},
      {"place-nqncy", "place-brntn"},
      {"place-jfk", ["place-nqncy", "place-shmnl"]},
      {"place-alfcl", "place-jfk"}
    ]

    for {stop_id, prev_ids} <- expected_stop_with_previous do
      stop = Enum.find(stops, &(&1.route_stop.id == stop_id))
      prior_stops = prior_stop(stop, stops)

      if prev_ids do
        if is_list(prev_ids) do
          for p_stop <- prior_stops do
            %{route_stop: %Stops.RouteStop{id: id}} = p_stop

            assert id in prev_ids,
                   "stop before #{stop_id} should be in #{Enum.join(prev_ids, ",")} but is #{id}"
          end
        else
          [%{route_stop: %Stops.RouteStop{id: id}}] = prior_stops
          assert id == prev_ids, "stop before #{stop_id} should be #{prev_ids}"
        end
      else
        assert is_nil(prior_stops), "stop before #{stop_id} should be nil"
      end
    end
  end

  test "prior_stop/2 finds prior stop (out)", %{outward_line_diagram: stops} do
    expected_stop_with_previous = [
      {"place-alfcl", nil},
      {"place-jfk", "place-alfcl"},
      {"place-nqncy", "place-jfk"},
      {"place-brntn", "place-nqncy"},
      {"place-shmnl", "place-jfk"},
      {"place-asmnl", "place-shmnl"}
    ]

    for {stop_id, prev_id} <- expected_stop_with_previous do
      stop = Enum.find(stops, &(&1.route_stop.id == stop_id))
      prior = prior_stop(stop, stops)

      if prev_id do
        id = prior |> List.first() |> Map.get(:route_stop) |> Map.get(:id)
        assert id == prev_id, "stop before #{stop_id} should be #{prev_id} but is #{id}"
      else
        refute prior_stop(stop, stops), "stop before #{stop_id} should be nil"
      end
    end
  end

  describe "do_stops_list_with_disruptions/2" do
    test "handles no date input", %{simple_line_diagram: line_diagram} do
      adjusted_stops = do_stops_list_with_disruptions(line_diagram, nil)
      assert [] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats shuttle stops", %{simple_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(
          line_diagram,
          ["place-nqncy", "place-brntn"],
          :shuttle,
          @now
        )

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-nqncy"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats detour stops", %{simple_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(
          line_diagram,
          ["place-nqncy", "place-brntn"],
          :detour,
          @now
        )

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-jfk", "place-nqncy", "place-brntn"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stop closure stops", %{simple_line_diagram: line_diagram} do
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

    test "formats stops list with first shuttle", %{simple_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(
          line_diagram,
          ["place-alfcl", "place-jfk"],
          :shuttle,
          @now
        )

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-alfcl"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stops list with second shuttle", %{simple_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(
          line_diagram,
          ["place-shmnl", "place-asmnl"],
          :shuttle,
          @now
        )

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-shmnl"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stops list with first and second shuttle", %{
      simple_line_diagram: line_diagram
    } do
      adjusted_stops =
        stops_with_current_effect(
          line_diagram,
          ["place-alfcl", "place-jfk"],
          :shuttle,
          @now
        )
        |> stops_with_current_effect(["place-shmnl", "place-asmnl"], :shuttle, @now, 2)
        |> do_stops_list_with_disruptions(@now)

      assert ["place-alfcl", "place-shmnl"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stops list with detour and shuttle", %{
      simple_line_diagram: line_diagram
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

    test "formats stops list through merge stop", %{simple_line_diagram: line_diagram} do
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

    test "formats stops for some other alert effect", %{
      simple_line_diagram: line_diagram
    } do
      stops =
        stops_with_current_effect(
          line_diagram,
          ["place-nqncy", "place-brntn"],
          :unknown,
          @now
        )

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert [] = adjusted_stops |> disrupted_stop_ids()
    end

    test "handles no alerts", %{simple_line_diagram: line_diagram} do
      adjusted_stops = do_stops_list_with_disruptions(line_diagram, @now)
      refute Enum.any?(adjusted_stops, &disruption(&1.stop_data))
    end
  end

  describe "do_stops_list_with_disruptions/2 (out)" do
    test "formats overlapping alerts properly" do
      diagram_stops =
        [
          {"place-wondl", [stop: nil]},
          {"place-rbmnl", [stop: nil]},
          {"place-bmmnl", [stop: nil]},
          {"place-sdmnl", [stop: nil]},
          {"place-orhte", [stop: nil]},
          {"place-wimnl", [stop: nil]},
          {"place-aport", [stop: nil]},
          {"place-mvbcl", [stop: nil]},
          {"place-aqucl", [stop: nil]},
          {"place-state", [stop: nil]},
          {"place-gover", [stop: nil]},
          {"place-bomnl", [stop: nil]}
        ]
        |> route_stops_to_line_diagram_stops()
        |> stops_with_current_effect(
          ["place-wondl", "place-rbmnl", "place-bmmnl", "place-sdmnl", "place-orhte"],
          :shuttle,
          @now
        )
        |> stops_with_current_effect(["place-sdmnl"], :closure, @now)

      adjusted_stops = do_stops_list_with_disruptions(diagram_stops, @now)

      assert ["place-wondl", "place-rbmnl", "place-bmmnl", "place-sdmnl"] =
               adjusted_stops |> disrupted_stop_ids()
    end

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

  describe "do_stops_list_with_disruptions/2 (in)" do
    test "formats shuttle stops", %{inward_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(
          line_diagram,
          ["place-brntn", "place-nqncy"],
          :shuttle,
          @now
        )

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-brntn"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats detour stops", %{inward_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(
          line_diagram,
          ["place-brntn", "place-nqncy"],
          :detour,
          @now
        )

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-brntn", "place-nqncy"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stop closure stops", %{inward_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(
          line_diagram,
          ["place-brntn", "place-nqncy"],
          :stop_closure,
          @now
        )

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-brntn", "place-nqncy"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stops list with first shuttle", %{inward_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(
          line_diagram,
          ["place-jfk", "place-alfcl"],
          :shuttle,
          @now
        )

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-jfk"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stops list with second shuttle", %{inward_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(
          line_diagram,
          ["place-asmnl", "place-shmnl"],
          :shuttle,
          @now
        )

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-asmnl"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stops list with first and second shuttle", %{
      inward_line_diagram: line_diagram
    } do
      adjusted_stops =
        stops_with_current_effect(
          line_diagram,
          ["place-jfk", "place-alfcl"],
          :shuttle,
          @now
        )
        |> stops_with_current_effect(["place-asmnl", "place-shmnl"], :shuttle, @now, 2)
        |> do_stops_list_with_disruptions(@now)

      assert ["place-asmnl", "place-jfk"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stops list with detour and shuttle", %{
      inward_line_diagram: line_diagram
    } do
      adjusted_stops =
        stops_with_current_effect(
          line_diagram,
          ["place-jfk", "place-alfcl"],
          :detour,
          @now
        )
        |> stops_with_current_effect(["place-asmnl", "place-shmnl"], :shuttle, @now, 2)
        |> do_stops_list_with_disruptions(@now)

      disrupted_stops = adjusted_stops |> disrupted_stop_ids()

      # detour should show on the previous stop on BOTH branches
      assert "place-nqncy" in disrupted_stops, "detour disruption should mark prior stop"
      assert "place-shmnl" in disrupted_stops, "detour disruption should mark prior stop"
      assert "place-jfk" in disrupted_stops, "detour disruption should mark detoured stop"
      assert "place-alfcl" in disrupted_stops, "detour disruption should mark detoured stop"

      # shuttle should impact all the affected stops except the last
      assert "place-asmnl" in disrupted_stops, "shuttle disruption should mark shuttled stop"

      # refute "place-shmnl" in disrupted_stops, "shuttle disruption should not mark final shuttled stop"
      # this is disrupted by the detour above
    end

    test "formats stops list through merge stop", %{inward_line_diagram: line_diagram} do
      stops =
        stops_with_current_effect(
          line_diagram,
          ["place-asmnl", "place-shmnl", "place-jfk"],
          :shuttle,
          @now
        )

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-asmnl", "place-shmnl"] = adjusted_stops |> disrupted_stop_ids()
    end

    test "formats stops for some other alert effect", %{
      inward_line_diagram: line_diagram
    } do
      stops =
        stops_with_current_effect(
          line_diagram,
          ["place-brntn", "place-nqncy"],
          :unknown,
          @now
        )

      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert [] = adjusted_stops |> disrupted_stop_ids()
    end

    test "handles no alerts", %{inward_line_diagram: line_diagram} do
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
