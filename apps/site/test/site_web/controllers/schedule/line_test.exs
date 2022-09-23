defmodule SiteWeb.ScheduleController.LineTest do
  use SiteWeb.ConnCase, async: true
  alias Services.Service
  alias SiteWeb.ScheduleController.Line

  doctest SiteWeb.ScheduleController.Line

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

  describe "get_all_route_stops/2" do
    test "works with route with variants" do
      stops = Line.get_all_route_stops(93, 0)
      stop_ids = Enum.map(stops, & &1.id)

      assert Enum.sort(stop_ids) ==
               Enum.sort([
                 "12862",
                 "2634",
                 "12860",
                 "2742",
                 "2860",
                 "2733",
                 "2832",
                 "2720",
                 "2735",
                 "place-sull",
                 "2861",
                 "12858",
                 "2722",
                 "2719",
                 "191",
                 "2715",
                 "2734",
                 "2726",
                 "2862",
                 "2725",
                 "2738",
                 "2636",
                 "2736",
                 "2841",
                 "2865",
                 "2864",
                 "12838",
                 "2637",
                 "11891",
                 "2740",
                 "2867",
                 "2729",
                 "8309",
                 "2743",
                 "6548",
                 "190",
                 "2866",
                 "2731",
                 "2721",
                 "2635",
                 "2863",
                 "2723",
                 "117",
                 "12836",
                 "2741",
                 "2718",
                 "2737",
                 "12859",
                 "12866"
               ])
    end

    test "works with route without variants" do
      stops = Line.get_all_route_stops(65, 0)
      stop_ids = Enum.map(stops, & &1.id)

      assert Enum.sort(stop_ids) ==
               Enum.sort([
                 "1026",
                 "1286",
                 "1287",
                 "1288",
                 "1289",
                 "1290",
                 "1291",
                 "1292",
                 "1293",
                 "1294",
                 "1295",
                 "1296",
                 "1298",
                 "1299",
                 "1300",
                 "1301",
                 "1518",
                 "1519",
                 "1520",
                 "1521",
                 "1523",
                 "1524",
                 "1525",
                 "1526",
                 "1777",
                 "1778",
                 "1994",
                 "8993",
                 "place-kencl"
               ])
    end
  end
end
