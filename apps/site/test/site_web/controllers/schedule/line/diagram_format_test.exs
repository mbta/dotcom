defmodule SiteWeb.ScheduleController.Line.DiagramFormatTest do
  use ExUnit.Case, async: true

  import SiteWeb.ScheduleController.Line.DiagramFormat
  alias Alerts.Alert
  alias Alerts.InformedEntity, as: IE
  alias Routes.Route
  alias Stops.RouteStop

  @now Timex.now()

  @stops_list_base [
    %{
      alerts: [],
      route_stop: %RouteStop{
        connections: [],
        id: "place-alfcl",
        route: %Route{id: "Red"}
      },
      stop_data: [%{branch: nil, has_disruption?: false, type: :terminus}]
    },
    %{
      alerts: [],
      route_stop: %RouteStop{
        connections: [],
        id: "place-jfk",
        route: %Route{id: "Red"}
      },
      stop_data: [
        %{branch: "Alewife - Ashmont", has_disruption?: false, type: :merge},
        %{branch: "Alewife - Braintree", has_disruption?: false, type: :merge}
      ]
    },
    %{
      alerts: [],
      route_stop: %RouteStop{
        connections: [],
        id: "place-nqncy",
        route: %Route{id: "Red"}
      },
      stop_data: [
        %{branch: "Alewife - Ashmont", has_disruption?: false, type: :line},
        %{branch: "Alewife - Braintree", has_disruption?: false, type: :stop}
      ]
    },
    %{
      alerts: [],
      route_stop: %RouteStop{
        connections: [],
        id: "place-brntn",
        route: %Route{id: "Red"}
      },
      stop_data: [
        %{branch: "Alewife - Ashmont", has_disruption?: false, type: :line},
        %{branch: "Alewife - Braintree", has_disruption?: false, type: :terminus}
      ]
    },
    %{
      alerts: [],
      route_stop: %RouteStop{
        connections: [],
        id: "place-shmnl",
        route: %Route{id: "Red"}
      },
      stop_data: [
        %{branch: "Alewife - Ashmont", has_disruption?: false, type: :stop}
      ]
    },
    %{
      alerts: [],
      route_stop: %RouteStop{
        connections: [],
        id: "place-asmnl",
        route: %Route{id: "Red"}
      },
      stop_data: [
        %{branch: "Alewife - Ashmont", has_disruption?: false, type: :terminus}
      ]
    }
  ]

  def stops_with_diversion(effect, stop_ids) do
    stop_list =
      @stops_list_base
      |> Enum.map(fn %{route_stop: %RouteStop{id: id}} = stop ->
        if id in stop_ids do
          %{
            stop
            | alerts: [
                Alert.new(
                  lifecycle: :ongoing,
                  effect: effect,
                  informed_entity: Enum.map(stop_ids, &%IE{stop: &1}),
                  active_period: [{Timex.shift(@now, days: -1), Timex.shift(@now, days: 1)}]
                )
              ]
          }
        else
          stop
        end
      end)

    stop_list
  end

  def disruption(stop_data) do
    %{has_disruption?: has_disruption} = List.last(stop_data)
    has_disruption
  end

  def route_ids(stops_list) do
    stops_list
    |> Enum.filter(&disruption(&1.stop_data))
    |> Enum.map(& &1.route_stop.id)
  end

  describe "do_stops_list_with_disruptions/2" do
    test "formats shuttle stops" do
      stops = stops_with_diversion(:shuttle, ["place-nqncy", "place-brntn"])
      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-nqncy"] = adjusted_stops |> route_ids()
    end

    test "formats detour stops" do
      stops = stops_with_diversion(:detour, ["place-nqncy", "place-brntn"])
      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-jfk", "place-nqncy", "place-brntn"] = adjusted_stops |> route_ids()
    end

    test "formats stop closure stops" do
      stops = stops_with_diversion(:stop_closure, ["place-nqncy", "place-brntn"])
      adjusted_stops = do_stops_list_with_disruptions(stops, @now)
      assert ["place-jfk", "place-nqncy", "place-brntn"] = adjusted_stops |> route_ids()
    end

    test "handles no disruptions" do
      adjusted_stops = do_stops_list_with_disruptions(@stops_list_base, @now)
      refute Enum.any?(adjusted_stops, &disruption(&1.stop_data))
    end
  end
end
