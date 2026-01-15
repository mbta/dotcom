defmodule DotcomWeb.Schedule.LineControllerTest do
  use DotcomWeb.ConnCase, async: false

  alias DotcomWeb.ScheduleController.LineController

  import Mox
  import Test.Support.Factories.Services.Service

  setup :verify_on_exit!

  @moduletag :external

  setup do
    stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)

    :ok
  end

  setup_all do
    # needed by DotcomWeb.ScheduleController.VehicleLocations plug
    _ = start_supervised({Phoenix.PubSub, name: Vehicles.PubSub})
    _ = start_supervised(Vehicles.Repo)
    :ok
  end

  describe "show/2" do
    test "sets a custom meta description", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "1"))

      assert conn.assigns.meta_description ==
               "MBTA bus route 1 stops and schedules, including maps, real-time updates, parking and accessibility information, and connections."
    end

    test "sets a good meta description for buses with names", %{conn: conn} do
      conn = get(conn, line_path(conn, :show, "747"))
      assert "MBTA bus route CT2" <> _ = conn.assigns.meta_description
      conn = get(conn, line_path(conn, :show, "751"))
      assert "MBTA Silver Line route SL4" <> _ = conn.assigns.meta_description
    end
  end

  describe "services/2" do
    test "omits services in the past" do
      past_service =
        build(:service, end_date: Faker.Date.backward(3), typicality: :typical_service)

      expect(Services.Repo.Mock, :by_route_id, fn _ ->
        [past_service]
      end)

      services = LineController.services("1", Faker.Date.forward(3))
      assert Enum.empty?(services)
    end
  end

  describe "with old-style query params" do
    test "redirects to the new style", %{conn: conn} do
      conn =
        get(
          conn,
          line_path(conn, :show, "39", %{
            destination: "qwerty",
            direction_id: "1",
            origin: "asdfg",
            variant: "foobar"
          })
        )

      assert redirected_to(conn, 302)
      location = conn |> Plug.Conn.get_resp_header("location") |> List.first()
      assert String.contains?(location, "schedule_direction%5Bdestination%5D=qwerty")
      assert String.contains?(location, "schedule_direction%5Bdirection_id%5D=1")
      assert String.contains?(location, "schedule_direction%5Borigin%5D=asdfg")
      assert String.contains?(location, "schedule_direction%5Bvariant%5D=foobar")
    end
  end
end
