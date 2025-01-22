defmodule DotcomWeb.ScheduleController.LineTest do
  use DotcomWeb.ConnCase, async: false

  import Mock

  alias DotcomWeb.ScheduleController.Line
  alias Services.Service

  @moduletag :external

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
      valid_days: ~c"\a"
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

  doctest DotcomWeb.ScheduleController.Line

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
    setup_with_mocks([
      {Util, [:passthrough],
       [
         now: fn ->
           {:ok, t} = DateTime.from_naive(~N[2021-01-18T00:00:00], "Etc/UTC")
           t
         end,
         service_date: fn -> Util.now() end
       ]}
    ]) do
      :ok
    end

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
      [default_service] = Enum.filter(services_for_route, &(&1.default_service? === true))
      assert default_service.id == @fourtwofour_services |> List.first() |> Map.get(:id)
    end
  end
end
