defmodule DotcomWeb.Schedule.LineControllerTest do
  use DotcomWeb.ConnCase, async: false

  import Mock

  alias DotcomWeb.ScheduleController.LineController
  alias Services.Service

  @moduletag :external

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

  describe "services/3" do
    test "omits services in the past" do
      service_date = ~D[2019-05-01]

      past_service = %Service{
        start_date: ~D[2019-04-30],
        end_date: ~D[2019-04-30]
      }

      current_service = %Service{
        start_date: ~D[2019-05-01],
        end_date: ~D[2019-05-01]
      }

      future_service = %Service{
        start_date: ~D[2019-05-02],
        end_date: ~D[2019-05-02]
      }

      repo_fn = fn _ ->
        [
          past_service,
          current_service,
          future_service
        ]
      end

      services = LineController.services("1", service_date, repo_fn)
      assert length(services) == 2
      refute Enum.member?(services, past_service)
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
