defmodule DotcomWeb.ScheduleController.VehicleLocationsTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.ScheduleController.VehicleLocations

  defmodule TestHelpers do
    @moduledoc false
    def location_fn(_, _), do: [%Vehicles.Vehicle{status: :stopped}]
    def schedule_for_trip_fn(_), do: []
  end

  @opts [
    location_fn: &TestHelpers.location_fn/2,
    schedule_for_trip_fn: &TestHelpers.schedule_for_trip_fn/1
  ]

  setup %{conn: conn} do
    conn =
      conn
      |> assign(:date, ~D[2017-01-01])
      |> assign(:date_time, ~N[2017-01-01T12:00:00])
      |> assign(:route, %{id: ""})
      |> assign(:direction_id, nil)

    {:ok, %{conn: conn}}
  end

  describe "init/1" do
    test "takes no options" do
      assert init([]) == [
               location_fn: &Vehicles.Repo.route/2,
               schedule_for_trip_fn: &Schedules.Repo.schedule_for_trip/2
             ]
    end
  end

  describe "call/2" do
    @locations [
      %Vehicles.Vehicle{trip_id: "1", stop_id: "place-sstat", status: :incoming},
      %Vehicles.Vehicle{trip_id: "2", stop_id: "place-north", status: :stopped},
      %Vehicles.Vehicle{trip_id: "3", stop_id: "place-bbsta", status: :in_transit}
    ]

    test "assigns an empty map if the date isn't the service date", %{conn: conn} do
      conn =
        conn
        |> assign(:date, ~D[2016-12-31])
        |> call(@opts)

      assert conn.assigns.vehicle_locations == %{}
    end

    test "works if the route is nil", %{conn: conn} do
      conn =
        conn
        |> assign(:route, nil)
        |> call(@opts)

      assert conn.assigns.vehicle_locations
    end

    test "assigns vehicle locations at a stop if they are stopped or incoming", %{conn: conn} do
      conn = call(conn, location_fn: fn _, _ -> Enum.take(@locations, 2) end)

      assert conn.assigns.vehicle_locations == %{
               {"1", "place-sstat"} => Enum.at(@locations, 0),
               {"2", "place-north"} => Enum.at(@locations, 1)
             }
    end

    test "filters out trips with no vehicle locations", %{conn: conn} do
      conn = call(conn, location_fn: fn _, _ -> Enum.take(@locations, 1) end)

      assert conn.assigns.vehicle_locations == %{{"1", "place-sstat"} => Enum.at(@locations, 0)}
    end

    test "if a vehicle is in transit to a stop, shows the vehicle at the previous scheduled stop",
         %{conn: conn} do
      conn =
        call(conn,
          location_fn: fn _, _ -> Enum.drop(@locations, 2) end,
          schedule_for_trip_fn: fn _, _ ->
            [
              %Schedules.Schedule{stop: %Stops.Stop{id: "Yawkey"}},
              %Schedules.Schedule{stop: %Stops.Stop{id: "place-bbsta"}},
              %Schedules.Schedule{stop: %Stops.Stop{id: "place-sstat"}}
            ]
          end
        )

      assert conn.assigns.vehicle_locations == %{
               {"3", "Yawkey"} => Enum.at(@locations, 2)
             }
    end

    test "if a vehicle is in transit to a stop but we can't find a schedule, shows the vehicle at the provided stop",
         %{conn: conn} do
      conn = call(conn, location_fn: fn _, _ -> Enum.drop(@locations, 2) end, schedule_for_trip_fn: fn _, _ -> [] end)

      assert conn.assigns.vehicle_locations == %{
               {"3", "place-bbsta"} => Enum.at(@locations, -1)
             }
    end

    test "Handles error when schedules can't be found", %{conn: conn} do
      conn =
        call(conn,
          location_fn: fn _, _ -> Enum.drop(@locations, 2) end,
          schedule_for_trip_fn: fn _, _ -> {:error, :timeout} end
        )

      assert conn.assigns.vehicle_locations == %{
               {"3", "place-bbsta"} => Enum.at(@locations, -1)
             }
    end
  end

  describe "active_stop/2" do
    test "Returns empty string when trip_id is not found" do
      vehicle_locations = %{{"trip1", "place-lake"} => %{}, {"trip2", "place-lech"} => %{}}

      assert active_stop(vehicle_locations, "trip3") == ""
    end

    @tag :external
    test "Returns associated stop name when valid stop_id is provided" do
      vehicle_locations = %{{"trip1", "place-lake"} => %{}, {"trip2", "place-lech"} => %{}}

      assert active_stop(vehicle_locations, "trip2") == "Lechmere"
    end
  end
end
