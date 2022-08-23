defmodule SiteWeb.ScheduleController.LineTest do
  use SiteWeb.ConnCase, async: true
  import SiteWeb.ScheduleController.Line.Helpers
  import SiteWeb.ScheduleController.Line.DiagramHelpers
  alias Services.Service
  alias Stops.{RouteStop, RouteStops}
  alias SiteWeb.ScheduleController.Line

  doctest SiteWeb.ScheduleController.Line

  @deps %SiteWeb.ScheduleController.Line.Dependencies{}

  @base_end_date ~D[2022-12-08]

  @thirtynine_services [
    %Service{
      added_dates: [],
      added_dates_notes: %{},
      description: "Weekday schedule",
      end_date: Date.add(@base_end_date, 5),
      id: "BUS120-3-Wdy-02",
      name: "Weekday",
      removed_dates: [
        "2021-01-18",
        "2021-02-15",
        "2021-02-16",
        "2021-02-17",
        "2021-02-18",
        "2021-02-19"
      ],
      removed_dates_notes: %{
        "2021-01-18" => "Martin Luther King Day",
        "2021-02-15" => "Washington's Birthday",
        "2021-02-16" => nil,
        "2021-02-17" => nil,
        "2021-02-18" => nil,
        "2021-02-19" => nil
      },
      start_date: ~D[2021-01-02],
      type: :weekday,
      typicality: :typical_service,
      valid_days: [1, 2, 3, 4, 5]
    },
    %Service{
      added_dates: [],
      added_dates_notes: %{},
      description: "Weekday schedule",
      end_date: Date.add(@base_end_date, 5),
      id: "BUS120-Z-Wdy-02",
      name: "Weekday",
      removed_dates: [
        "2021-01-18",
        "2021-02-15",
        "2021-02-16",
        "2021-02-17",
        "2021-02-18",
        "2021-02-19"
      ],
      removed_dates_notes: %{
        "2021-01-18" => "Martin Luther King Day",
        "2021-02-15" => "Washington's Birthday",
        "2021-02-16" => nil,
        "2021-02-17" => nil,
        "2021-02-18" => nil,
        "2021-02-19" => nil
      },
      start_date: ~D[2021-01-02],
      type: :weekday,
      typicality: :typical_service,
      valid_days: [1, 2, 3, 4, 5]
    },
    %Service{
      added_dates: [],
      added_dates_notes: %{},
      description: "Saturday schedule",
      end_date: ~D[2020-12-21],
      id: "BUS419-3-Sa-02",
      name: "Saturday",
      removed_dates: [],
      removed_dates_notes: %{},
      start_date: ~D[2020-12-21],
      type: :saturday,
      typicality: :typical_service,
      valid_days: [6]
    },
    %Service{
      added_dates: [],
      added_dates_notes: %{},
      description: "Saturday schedule",
      end_date: ~D[2020-12-21],
      id: "BUS419-E-Sa-02",
      name: "Saturday",
      removed_dates: [],
      removed_dates_notes: %{},
      start_date: ~D[2020-12-21],
      type: :saturday,
      typicality: :typical_service,
      valid_days: [6]
    },
    %Service{
      added_dates: ["2020-12-25", "2021-01-01"],
      added_dates_notes: %{
        "2020-12-25" => "Christmas Day",
        "2021-01-01" => "New Year's Day"
      },
      description: "Holiday (Sunday schedule)",
      end_date: ~D[2021-01-01],
      id: "ChristmasDay-NewYearsDay",
      name: "Holiday",
      removed_dates: [],
      removed_dates_notes: %{},
      start_date: ~D[2020-12-25],
      type: :sunday,
      typicality: :holiday_service,
      valid_days: []
    },
    %Service{
      added_dates: [],
      added_dates_notes: %{},
      description: "Weekday schedule",
      end_date: ~D[2020-12-20],
      id: "FallWeekday",
      name: "Weekday",
      removed_dates: [],
      removed_dates_notes: %{},
      start_date: ~D[2020-12-20],
      type: :weekday,
      typicality: :typical_service,
      valid_days: [5]
    },
    %Service{
      added_dates: ["2021-01-18", "2021-02-15"],
      added_dates_notes: %{
        "2021-01-18" => "Martin Luther King Day",
        "2021-02-15" => "Washington's Birthday"
      },
      description: "Holiday (Saturday schedule)",
      end_date: ~D[2021-02-15],
      id: "MartinLutherKingDay-WashingtonsBirthday",
      name: "Holiday",
      removed_dates: [],
      removed_dates_notes: %{},
      start_date: ~D[2021-01-18],
      type: :saturday,
      typicality: :holiday_service,
      valid_days: []
    },
    %Service{
      added_dates: [],
      added_dates_notes: %{},
      description: "Saturday schedule",
      end_date: Date.add(@base_end_date, 6),
      id: "WinterSaturday",
      name: "Saturday",
      removed_dates: [],
      removed_dates_notes: %{},
      start_date: ~D[2020-12-28],
      type: :saturday,
      typicality: :typical_service,
      valid_days: [6]
    },
    %Service{
      added_dates: [],
      added_dates_notes: %{},
      description: "Sunday schedule",
      end_date: @base_end_date,
      id: "WinterSunday",
      name: "Sunday",
      removed_dates: [],
      removed_dates_notes: %{},
      start_date: ~D[2020-12-22],
      type: :sunday,
      typicality: :typical_service,
      valid_days: '\a'
    },
    %Service{
      added_dates: ["2021-02-16", "2021-02-17", "2021-02-18", "2021-02-19"],
      added_dates_notes: %{
        "2021-02-16" => nil,
        "2021-02-17" => nil,
        "2021-02-18" => nil,
        "2021-02-19" => nil
      },
      description: "Weekday schedule (no school)",
      end_date: ~D[2020-12-31],
      id: "WinterWeekday",
      name: "Weekday (no school)",
      removed_dates: [],
      removed_dates_notes: %{},
      start_date: ~D[2020-12-23],
      type: :weekday,
      typicality: :typical_service,
      valid_days: [1, 2, 4, 5]
    }
  ]

  @fourtwofour_services [
    %{
      __struct__: Services.Service,
      added_dates: [],
      added_dates_notes: %{},
      description: "Weekday schedule",
      end_date: Date.add(@base_end_date, 5),
      id: "WinterWeekday",
      name: "Weekday",
      removed_dates: [
        "2021-01-18",
        "2021-02-15",
        "2021-02-16",
        "2021-02-17",
        "2021-02-18",
        "2021-02-19"
      ],
      removed_dates_notes: %{
        "2021-01-18" => "Martin Luther King Day",
        "2021-02-15" => "Washington's Birthday",
        "2021-02-16" => nil,
        "2021-02-17" => nil,
        "2021-02-18" => nil,
        "2021-02-19" => nil
      },
      service_date: ~D[2021-01-18],
      start_date: ~D[2021-01-09],
      type: :weekday,
      typicality: :typical_service,
      valid_days: [1, 2, 3, 4, 5]
    }
  ]

  def get_error_stop_list(_, _, _), do: {:error, "error"}

  describe "populate / update conn based on url in do_call: " do
    setup %{conn: conn} do
      conn =
        conn
        |> assign(:route, %Routes.Route{id: "1", type: 3})
        |> assign(:date_time, Util.now())
        |> assign(:date, Util.service_date())
        |> assign(:direction_id, 0)

      {:ok, conn: conn}
    end

    test "updates conn with direction_id from url", %{conn: conn} do
      conn =
        conn
        |> Map.put(:query_params, %{"schedule_direction" => %{"direction_id" => "1"}})
        |> Line.call([])

      assert conn.assigns.direction_id == 1
    end

    test "parses a misshapen direction_id", %{conn: conn} do
      conn =
        conn
        |> Map.put(:query_params, %{"schedule_direction" => %{"direction_id" => "1'[]"}})
        |> Line.call([])

      assert conn.assigns.direction_id == 1
    end

    test "ignores a negative direction_id", %{conn: conn} do
      conn =
        conn
        |> Map.put(:query_params, %{"schedule_direction" => %{"direction_id" => "-1"}})
        |> Line.call([])

      assert conn.assigns.direction_id == 0
    end

    test "ignores url direction_id if it's not a number", %{conn: conn} do
      conn =
        conn
        |> Map.put(:query_params, %{"schedule_direction" => %{"direction_id" => "string"}})
        |> Line.call([])

      assert conn.assigns.direction_id == 0
    end

    test "ignores url direction_id if it's > 1", %{conn: conn} do
      conn =
        conn
        |> Map.put(:query_params, %{"schedule_direction" => %{"direction_id" => "10"}})
        |> Line.call([])

      assert conn.assigns.direction_id == 0
    end
  end

  describe "build_stop_list/2 for Green Line" do
    defp stop_id({_branches, stop_id}), do: stop_id
    defp branches({branches, _stop_id}), do: branches

    test "direction 0 returns a list of all stops in order from east to west" do
      route_stops = get_route_stops("Green", 0, @deps.stops_by_route_fn)

      stops =
        "Green"
        |> get_shapes_by_direction(0, 0)
        |> get_branches(route_stops, %Routes.Route{id: "Green"}, 0)
        |> build_stop_list(0)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      # As of June 2020, Lechmere has been closed so the commented line will make the test fail.
      # We are temporarily adding the fix but this will need to be undone later on.
      for {id, idx} <- [
            # As of Aug 2022, the Green Line Union Square branch is temporarily suspended.
            # {"place-unsqu", 0},
            # {"place-north", 3},
            # {"place-gover", 5},
            # {"place-pktrm", 6},
            # {"place-coecl", 9},
            # {"place-hsmnl", 20},
            # {"place-river", 35},
            # {"place-clmnl", 48},
            # {"place-lake", 64}
            {"place-lech", 0},
            {"place-pktrm", 5},
            {"place-coecl", 8},
            {"place-hsmnl", 19},
            {"place-river", 35},
            {"place-clmnl", 48},
            {"place-lake", 64}
          ] do
        assert stops |> Enum.at(idx) |> elem(1) == id
      end
    end

    test "direction 0 returns the correct number of bubbles for each stop" do
      route_stops = get_route_stops("Green", 0, @deps.stops_by_route_fn)

      stops =
        "Green"
        |> get_shapes_by_direction(0, 0)
        |> get_branches(route_stops, %Routes.Route{id: "Green"}, 0)
        |> build_stop_list(0)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      [trunk, e, hynes, bcd_combined, bc_combined, b] =
        Enum.chunk_by(stops, fn {branches, _stop} -> Enum.count(branches) end)

      assert Enum.all?(trunk, &(&1 |> branches() |> length() == 1))

      # As of Aug 2022, the Green Line Union Square branch is temporarily suspended.
      # assert trunk |> List.first() |> stop_id() == "place-unsqu"
      assert trunk |> List.first() |> stop_id() == "place-lech"
      assert trunk |> List.last() |> stop_id() == "place-armnl"

      # E branch + merge
      assert Enum.all?(e, &(&1 |> branches() |> length() == 2))
      assert e |> List.first() |> stop_id() == "place-coecl"
      assert e |> List.last() |> stop_id() == "place-hsmnl"

      # As of Aug 2022, the Green Line Union Square branch is temporarily suspended.
      # assert Enum.all?(hynes, &(&1 |> branches() |> length() == 1))
      # assert length(hynes) == 1
      assert length(hynes) == 2
      # assert hynes |> List.first() |> stop_id() == "place-hymnl"
      assert hynes |> List.first() |> stop_id() == "place-unsqu"

      assert Enum.all?(bcd_combined, &(&1 |> branches() |> length() == 3))
      assert bcd_combined |> List.first() |> stop_id() == "place-kencl"
      assert bcd_combined |> List.last() |> stop_id() == "place-river"

      assert Enum.all?(bc_combined, &(&1 |> branches() |> length() == 2))
      assert bc_combined |> List.first() |> stop_id() == "place-smary"
      assert bc_combined |> List.last() |> stop_id() == "place-clmnl"

      assert Enum.all?(b, &(&1 |> branches() |> length() == 1))
      assert b |> List.first() |> stop_id() == "place-bland"
      assert b |> List.last() |> stop_id() == "place-lake"
    end

    test "direction 0 handles an empty list of stops" do
      stops =
        [
          %Stops.RouteStops{branch: "Green-E", stops: []},
          %Stops.RouteStops{branch: "Green-D", stops: []},
          %Stops.RouteStops{branch: "Green-C", stops: []},
          %Stops.RouteStops{branch: "Green-B", stops: []}
        ]
        |> build_stop_list(0)

      assert stops == []
    end

    test "direction 1 returns a list of all stops in order from west to east" do
      direction_id = 1

      route_stops = get_route_stops("Green", direction_id, @deps.stops_by_route_fn)

      stops =
        "Green"
        |> get_shapes_by_direction(0, direction_id)
        |> get_branches(route_stops, %Routes.Route{id: "Green"}, direction_id)
        |> build_stop_list(direction_id)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      # As of June 2020, Lechmere has been closed so the commented line will make the test fail.
      # We are temporarily adding the fix but this will need to be undone later on.
      for {id, idx} <- [
            # {"place-lech", 64},
            # As of Aug 2022, the Green Line past Government Center is temporarily suspended.
            # {"place-north", 61},
            {"place-gover", 59},
            {"place-pktrm", 58},
            {"place-coecl", 55},
            {"place-hsmnl", 44},
            {"place-river", 29},
            {"place-clmnl", 16},
            {"place-lake", 0}
          ] do
        assert stops |> Enum.at(idx) |> elem(1) == id
      end
    end

    test "direction 1 returns the correct number of bubbles for each stop" do
      route_stops = get_route_stops("Green", 0, @deps.stops_by_route_fn)

      stops =
        "Green"
        |> get_shapes_by_direction(0, 1)
        |> get_branches(route_stops, %Routes.Route{id: "Green"}, 1)
        |> build_stop_list(1)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      chunked = Enum.chunk_by(stops, fn {branches, _stop} -> Enum.count(branches) end)

      # As of Aug 2022, the Green Line Union Square branch is temporarily suspended.
      # assert [b, bc_combined, bcd_combined, hynes, e, trunk] = chunked
      assert [b, bc_combined, bcd_combined, e, trunk] = chunked

      assert Enum.all?(b, &(&1 |> branches() |> length() == 1))
      assert b |> List.first() |> stop_id() == "place-lake"
      assert b |> List.last() |> stop_id() == "place-bland"

      assert Enum.all?(bc_combined, &(&1 |> branches() |> length() == 2))
      assert bc_combined |> List.first() |> stop_id() == "place-clmnl"
      assert bc_combined |> List.last() |> stop_id() == "place-smary"

      assert Enum.all?(bcd_combined, &(&1 |> branches() |> length() == 3))
      assert bcd_combined |> List.first() |> stop_id() == "place-river"
      assert bcd_combined |> List.last() |> stop_id() == "place-kencl"

      # As of Aug 2022, the Green Line Union Square branch is temporarily suspended.
      # assert Enum.all?(hynes, &(&1 |> branches() |> length() == 1))
      # assert length(hynes) == 1
      # assert hynes |> List.first() |> stop_id() == "place-hymnl"

      # E branch + merge
      # As of Aug 2022, the Green Line Union Square branch is temporarily suspended.
      # assert Enum.all?(e, &(&1 |> branches() |> length() == 2))
      # assert e |> List.first() |> stop_id() == "place-hsmnl"
      # assert e |> List.last() |> stop_id() == "place-coecl"
      assert e |> List.first() |> stop_id() == "place-hymnl"
      assert e |> List.last() |> stop_id() == "place-armnl"

      # As of Aug 2022, the Green Line Union Square branch is temporarily suspended.
      # assert Enum.all?(trunk, &(&1 |> branches() |> length() == 1))
      # assert trunk |> List.first() |> stop_id() == "place-armnl"
      # assert trunk |> List.last() |> stop_id() == "place-unsqu"
      assert trunk |> List.first() |> stop_id() == "place-coecl"
      assert trunk |> List.last() |> stop_id() == "place-hsmnl"
    end
  end

  describe "build_stop_list/2 for branched non-Green routes" do
    test "Red direction 0" do
      direction_id = 0
      route_stops = get_route_stops("Red", direction_id, @deps.stops_by_route_fn)

      stops =
        "Red"
        |> get_shapes_by_direction(1, direction_id)
        |> get_branches(route_stops, %Routes.Route{id: "Red"}, direction_id)
        |> build_stop_list(direction_id)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      for {id, idx} <- [
            {"place-alfcl", 0},
            {"place-jfk", 12},
            {"place-brntn", -5},
            {"place-asmnl", -1}
          ] do
        assert stops |> Enum.at(idx) |> elem(1) == id
      end
    end

    test "direction 0 returns the correct number of bubbles for each stop" do
      direction_id = 0
      route_stops = get_route_stops("Red", direction_id, @deps.stops_by_route_fn)

      stops =
        "Red"
        |> get_shapes_by_direction(1, direction_id)
        |> get_branches(route_stops, %Routes.Route{id: "Red"}, direction_id)
        |> build_stop_list(direction_id)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      [one, two, another_one] =
        Enum.chunk_by(stops, fn {branches, _stop} -> Enum.count(branches) end)

      assert Enum.each(one, &(Enum.count(branches(&1)) == 1))
      assert stop_id(List.first(one)) == "place-alfcl"
      assert stop_id(List.last(one)) == "place-andrw"

      assert Enum.each(two, &(Enum.count(branches(&1)) == 2))
      assert stop_id(List.first(two)) == "place-jfk"
      assert stop_id(List.last(two)) == "place-brntn"

      assert Enum.each(another_one, &(Enum.count(branches(&1)) == 1))
      assert stop_id(List.first(another_one)) == "place-shmnl"
      assert stop_id(List.last(another_one)) == "place-asmnl"
    end

    test "Red direction 1" do
      direction_id = 1
      route_stops = get_route_stops("Red", direction_id, @deps.stops_by_route_fn)

      stops =
        "Red"
        |> get_shapes_by_direction(1, direction_id)
        |> get_branches(route_stops, %Routes.Route{id: "Red"}, direction_id)
        |> build_stop_list(direction_id)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      for {id, idx} <- [
            {"place-alfcl", -1},
            {"place-jfk", -13},
            {"place-brntn", 4},
            {"place-asmnl", 0}
          ] do
        assert stops |> Enum.at(idx) |> elem(1) == id
      end
    end

    test "direction 1 returns the correct number of bubbles for each stop" do
      direction_id = 1
      route_stops = get_route_stops("Red", direction_id, @deps.stops_by_route_fn)

      stops =
        "Red"
        |> get_shapes_by_direction(1, 1)
        |> get_branches(route_stops, %Routes.Route{id: "Red"}, direction_id)
        |> build_stop_list(direction_id)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      [another_one, two, one] =
        Enum.chunk_by(stops, fn {branches, _stop} -> Enum.count(branches) end)

      assert Enum.each(another_one, &(Enum.count(branches(&1)) == 1))
      assert stop_id(List.first(another_one)) == "place-asmnl"
      assert stop_id(List.last(another_one)) == "place-shmnl"

      assert Enum.each(two, &(Enum.count(branches(&1)) == 2))
      assert stop_id(List.first(two)) == "place-brntn"
      assert stop_id(List.last(two)) == "place-jfk"

      assert Enum.each(one, &(Enum.count(branches(&1)) == 1))
      assert stop_id(List.first(one)) == "place-andrw"
      assert stop_id(List.last(one)) == "place-alfcl"
    end

    @tag skip: "FIXME: Failing due to missing Forest Hills stop"
    test "CR-Providence outbound" do
      route_stops = get_route_stops("CR-Providence", 0, @deps.stops_by_route_fn)

      stops =
        "CR-Providence"
        |> get_shapes_by_direction(2, 0)
        |> get_branches(route_stops, %Routes.Route{id: "CR-Providence"}, 0)
        |> build_stop_list(0)
        |> Enum.map(fn {branches, stop} -> {branches, stop.id} end)

      for {id, idx} <- [
            {"place-sstat", 0},
            {"place-NEC-2173", 5},
            {"place-SB-0156", 7},
            {"place-NEC-2108", 9}
          ] do
        assert stops |> Enum.at(idx) |> elem(1) == id
      end
    end
  end

  describe "stop_bubble_type/2" do
    test "copley" do
      stop = %RouteStop{id: "place-coecl"}
      assert stop_bubble_type("Green-B", stop) == {"Green-B", :stop}
      assert stop_bubble_type("Green-C", stop) == {"Green-C", :stop}
      assert stop_bubble_type("Green-D", stop) == {"Green-D", :stop}
      assert stop_bubble_type("Green-E", stop) == {"Green-E", :stop}
    end
  end

  describe "build_branched_stop" do
    # As of June 2020, Lechmere is closed for construction.
    # Replacing with North Station for now

    # test "lechmere" do
    #   stop = %RouteStop{id: "place-lech"}
    #   branches = {nil, GreenLine.branch_ids()}
    #
    #   bubbles = [
    #     {"Green-B", :empty},
    #     {"Green-C", :empty},
    #     {"Green-D", :empty},
    #     {"Green-E", :terminus}
    #   ]
    #
    #   assert build_branched_stop(stop, [], branches) == [{bubbles, stop}]
    # end

    test "North Station" do
      stop = %RouteStop{id: "place-north"}
      branches = {nil, GreenLine.branch_ids()}

      bubbles = [{nil, :stop}]

      assert build_branched_stop(stop, [], branches) == [{bubbles, stop}]
    end

    test "park" do
      stop = %RouteStop{id: "place-pktrm"}
      branches = {nil, GreenLine.branch_ids()}

      bubbles = [{nil, :stop}]

      assert build_branched_stop(stop, [], branches) == [{bubbles, stop}]
    end

    test "copley" do
      stop = %RouteStop{id: "place-coecl"}
      branches = {nil, GreenLine.branch_ids()}

      bubbles = [
        {nil, :merge},
        {"Green-E", :merge}
      ]

      assert build_branched_stop(stop, [], branches) == [{bubbles, stop}]
    end

    test "heath st" do
      assert GreenLine.terminus?("place-hsmnl", "Green-E")
      stop = %RouteStop{id: "place-hsmnl", branch: "Green-E", is_terminus?: true}
      branches = {nil, GreenLine.branch_ids()}

      bubbles = [
        {nil, :line},
        {"Green-E", :terminus}
      ]

      assert build_branched_stop(stop, [], branches) == [{bubbles, stop}]
    end

    test "a terminus on a one-stop trunk is a merge" do
      stop = %RouteStop{id: "new", branch: nil, is_terminus?: true}
      branch_length = 1

      assert build_branched_stop({stop, true}, [], {nil, ["branch 1", "branch 2"]}, branch_length) ==
               [
                 {[{"branch 1", :merge}, {"branch 2", :merge}], stop}
               ]

      assert build_branched_stop(
               {stop, false},
               [],
               {nil, ["branch 1", "branch 2"]},
               branch_length
             ) == [
               {[{"branch 1", :merge}, {"branch 2", :merge}], stop}
             ]
    end

    test "a terminus not on a branch (but also not the ONLY stop on a branch) is always a terminus" do
      stop = %RouteStop{id: "new", branch: nil, is_terminus?: true}
      branch_length = 3

      assert build_branched_stop({stop, true}, [], {nil, []}, branch_length) == [
               {[{nil, :terminus}], stop}
             ]

      assert build_branched_stop({stop, false}, [], {nil, []}, branch_length) == [
               {[{nil, :terminus}], stop}
             ]
    end

    test "non-terminus in unbranched stops is a merge stop when it's first or last in list" do
      new_stop = %RouteStop{id: "new"}
      branch_length = 3

      result =
        build_branched_stop({new_stop, true}, [], {nil, ["branch 1", "branch 2"]}, branch_length)

      assert result == [{[{"branch 1", :merge}, {"branch 2", :merge}], new_stop}]
    end

    test "unbranched stops that aren't first or last in list are just :stop" do
      new_stop = %RouteStop{id: "new"}
      branch_length = 3
      result = build_branched_stop({new_stop, false}, [], {nil, []}, branch_length)
      assert result == [{[{nil, :stop}], new_stop}]
    end

    test "branched terminus includes :terminus in stop bubbles" do
      new_stop = %RouteStop{id: "new", branch: "branch 1", is_terminus?: true}
      branch_length = 3

      result =
        build_branched_stop(
          {new_stop, false},
          [],
          {"branch 1", ["branch 1", "branch 2"]},
          branch_length
        )

      assert result == [{[{"branch 1", :terminus}, {"branch 2", :line}], new_stop}]
    end
  end

  describe "build_branched_stop_list" do
    test "returns stops in reverse order for both directions when branch is nil" do
      stops =
        ["first", "middle", "last"]
        |> Util.EnumHelpers.with_first_last()
        |> Enum.map(fn {stop_id, is_terminus?} ->
          %RouteStop{id: stop_id, is_terminus?: is_terminus?}
        end)

      outbound = build_branched_stop_list(%RouteStops{branch: nil, stops: stops}, {[], []})
      inbound = build_branched_stop_list(%RouteStops{branch: nil, stops: stops}, {[], []})
      assert outbound == inbound
      assert {[last, middle, first], []} = outbound
      assert last == {[{nil, :terminus}], %RouteStop{id: "last", is_terminus?: true}}
      assert middle == {[{nil, :stop}], %RouteStop{id: "middle", is_terminus?: false}}
      assert first == {[{nil, :terminus}], %RouteStop{id: "first", is_terminus?: true}}
    end
  end

  describe "services" do
    test "determines a single, default service for route and date", %{conn: conn} do
      conn =
        conn
        |> assign(:services_fn, fn _ -> @thirtynine_services end)
        |> get(line_path(conn, :show, "39"))

      services_for_route = conn.assigns.schedule_page_data.services
      default_service = Enum.filter(services_for_route, &(&1.default_service? === true))

      assert length(default_service) == 1
    end

    test "uses the first service as a default if no services are valid", %{conn: conn} do
      conn =
        conn
        |> assign(:date_time, ~D[2021-01-18])
        |> assign(:services_fn, fn _ -> @fourtwofour_services end)
        |> get(line_path(conn, :show, "424"))

      services_for_route = conn.assigns.schedule_page_data.services
      default_services = Enum.filter(services_for_route, &(&1.default_service? === true))

      assert length(default_services) == 1
      assert default_services = [%{id: "WinterWeekday1"}]
    end
  end
end
