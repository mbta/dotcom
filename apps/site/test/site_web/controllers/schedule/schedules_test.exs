defmodule SiteWeb.ScheduleController.SchedulesTest do
  use SiteWeb.ConnCase, async: true
  alias Schedules.{Schedule, Trip}
  alias Stops.Stop
  alias Routes.Route

  import Site.DateHelpers
  import SiteWeb.ScheduleController.Schedules

  @route %Route{id: "Red", type: 1, name: "Red"}
  @schedules [
    %Schedule{
      time: ~N[2017-01-01T07:00:00],
      route: @route
    },
    %Schedule{
      time: ~N[2017-01-01T07:30:00],
      route: @route
    },
    %Schedule{
      time: ~N[2017-01-01T07:35:00],
      route: @route
    },
    %Schedule{
      time: ~N[2017-01-01T07:40:00],
      route: @route
    }
  ]
  @od_schedules [
    {
      %Schedule{
        time: ~N[2017-01-01T07:00:00],
        route: @route,
        stop: %Stop{id: "1"},
        trip: %Trip{id: "t2"}
      },
      %Schedule{
        time: ~N[2017-01-01T07:30:00],
        route: @route,
        stop: %Stop{id: "3"},
        trip: %Trip{id: "t2"}
      }
    },
    {
      %Schedule{
        time: ~N[2017-01-01T07:20:00],
        route: @route,
        stop: %Stop{id: "1"},
        trip: %Trip{id: "t1"}
      },
      %Schedule{
        time: ~N[2017-01-01T07:40:00],
        route: @route,
        stop: %Stop{id: "3"},
        trip: %Trip{id: "t1"}
      }
    },
    {
      %Schedule{
        time: ~N[2017-01-01T08:00:00],
        route: @route,
        stop: %Stop{id: "1"},
        trip: %Trip{id: "t3"}
      },
      %Schedule{
        time: ~N[2017-01-01T09:30:00],
        route: @route,
        stop: %Stop{id: "3"},
        trip: %Trip{id: "t3"}
      }
    }
  ]

  @bus_route %Route{id: "1", type: 3, name: "1"}
  @bus_od_schedules [
    {
      %Schedule{
        time: ~N[2017-01-01T07:00:00],
        route: @bus_route,
        stop: %Stop{id: "1"},
        trip: %Trip{id: "t2"}
      },
      %Schedule{
        time: ~N[2017-01-01T07:30:00],
        route: @bus_route,
        stop: %Stop{id: "3"},
        trip: %Trip{id: "t2"}
      }
    },
    {
      %Schedule{
        time: ~N[2017-01-01T07:20:00],
        route: @bus_route,
        stop: %Stop{id: "1"},
        trip: %Trip{id: "t1"}
      },
      %Schedule{
        time: ~N[2017-01-01T07:40:00],
        route: @bus_route,
        stop: %Stop{id: "3"},
        trip: %Trip{id: "t1"}
      }
    },
    {
      %Schedule{
        time: ~N[2017-01-01T08:00:00],
        route: @bus_route,
        stop: %Stop{id: "1"},
        trip: %Trip{id: "t3"}
      },
      %Schedule{
        time: ~N[2017-01-01T09:30:00],
        route: @bus_route,
        stop: %Stop{id: "3"},
        trip: %Trip{id: "t3"}
      }
    }
  ]

  describe "call/2" do
    test "when only an origin is present, only includes schedules for that stop", %{conn: conn} do
      route_id = "CR-Providence"
      direction_id = 0
      stop_id = "place-sstat"

      conn =
        %{conn | params: %{"route" => route_id}}
        |> assign(:date, Util.service_date())
        |> assign(:route, %Routes.Route{id: route_id})
        |> assign(:direction_id, direction_id)
        |> assign(:origin, %Stops.Stop{id: stop_id})
        |> assign(:destination, nil)
        |> call(init([]))

      assert conn.assigns.schedules != []

      for schedule <- conn.assigns.schedules do
        assert schedule.stop.id == stop_id
      end
    end

    test "does not include schedules which stop at the selected origin", %{conn: conn} do
      # 2some mondays are holidays, so check a tuesday
      date = Util.service_date() |> non_holiday_date() |> non_weekend_date()

      route_id = "CR-Providence"
      direction_id = 0
      # some trips stop at Providence, others keep going
      stop_id = "Providence"

      conn =
        %{conn | params: %{"route" => route_id}}
        |> assign(:date, date)
        |> assign(:route, %Routes.Route{id: route_id})
        |> assign(:direction_id, direction_id)
        |> assign(:origin, %Stops.Stop{id: stop_id})
        |> assign(:destination, nil)
        |> call(init([]))

      assert conn.assigns.schedules != []

      for schedule <- conn.assigns.schedules do
        # pickup_type 1 is "no pickups"
        refute schedule.pickup_type == 1
      end
    end
  end

  describe "schedules/2" do
    test "only assigns schedules for the origin-destination that match the provided route id", %{
      conn: conn
    } do
      date = non_holiday_date(Util.service_date())

      o_d_fn = fn o, d, opts ->
        assert opts[:date] == date
        assert opts[:route] == @bus_route.id
        assert o == "1"
        assert d == "3"
        @bus_od_schedules
      end

      conn =
        conn
        |> assign(:date, date)
        |> assign(:route, @bus_route)
        |> assign(:direction_id, 0)
        |> assign(:origin, %Stops.Stop{id: "1"})
        |> assign(:destination, %Stops.Stop{id: "3"})

      schedules = schedules(conn, o_d_fn)
      assert schedules == @bus_od_schedules
    end

    test "returns an error if the repo returned an error (origin only)", %{conn: conn} do
      result =
        conn
        |> assign(:date, ~D[2017-01-01])
        |> assign(:route, @bus_route)
        |> assign(:origin, %Stops.Stop{id: "1"})
        |> assign(:direction_id, 0)
        |> schedules

      assert {:error, _} = result
    end

    test "returns an error if the repo returned an error (origin and destination)", %{conn: conn} do
      result =
        conn
        |> assign(:date, ~D[2017-01-01])
        |> assign(:route, @bus_route)
        |> assign(:origin, %Stops.Stop{id: "1"})
        |> assign(:destination, %Stops.Stop{id: "2"})
        |> schedules

      assert {:error, _} = result
    end
  end

  describe "assign_frequency_table/1" do
    test "when schedules are assigned as a list, assigns a frequency table", %{conn: conn} do
      conn =
        conn
        |> assign_frequency_table(@schedules)

      assert conn.assigns.frequency_table.frequencies ==
               TimeGroup.frequency_by_time_block(@schedules)

      assert conn.assigns.frequency_table.departures.first_departure ==
               List.first(@schedules).time
    end

    test "when schedules are assigned, assigns a frequency table", %{conn: conn} do
      conn =
        conn
        |> assign_frequency_table(@od_schedules)

      # grab the departure schedule
      schedules =
        @od_schedules
        |> Enum.map(&elem(&1, 0))

      assert conn.assigns.frequency_table.frequencies ==
               TimeGroup.frequency_by_time_block(schedules)

      assert conn.assigns.frequency_table.departures.first_departure ==
               elem(List.first(@od_schedules), 0).time
    end

    test "when schedules are light rail, assigns a frequency table", %{conn: conn} do
      route = %Routes.Route{type: 0, id: "Green-B", name: "Green B"}

      schedules =
        @schedules
        |> Enum.map(&%{&1 | route: route})

      conn =
        conn
        |> assign_frequency_table(schedules)

      assert conn.assigns.frequency_table.frequencies ==
               TimeGroup.frequency_by_time_block(schedules)

      assert conn.assigns.frequency_table.departures.first_departure ==
               List.first(@schedules).time
    end

    test "does not assign a frequency table for non-subway routes", %{conn: conn} do
      conn =
        conn
        |> assign_frequency_table(@bus_od_schedules)

      refute :frequency_table in Map.keys(conn.assigns)
    end

    test "does not crash if the schedules returned an error", %{conn: conn} do
      conn = assign_frequency_table(conn, {:error, :error})

      refute :frequency_table in Map.keys(conn.assigns)
    end
  end
end
