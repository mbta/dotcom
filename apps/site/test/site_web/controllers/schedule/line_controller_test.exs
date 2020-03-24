defmodule SiteWeb.Schedule.LineControllerTest do
  use SiteWeb.ConnCase
  alias Services.Service
  alias SiteWeb.ScheduleController.LineController

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

    test "omits no-school weekday services" do
      service_date = ~D[2019-12-11]

      school_service = %Service{
        start_date: ~D[2019-12-11],
        end_date: ~D[2019-12-11],
        name: "Weekday"
      }

      no_school_service = %Service{
        start_date: ~D[2019-12-12],
        end_date: ~D[2019-12-12],
        name: "Weekday (no school)"
      }

      repo_fn = fn _ ->
        [
          school_service,
          no_school_service
        ]
      end

      services = LineController.services("1", service_date, repo_fn)
      assert length(services) == 1
      refute Enum.member?(services, no_school_service)
    end

    test "omits services that are subsets of another service" do
      service_date = ~D[2019-05-01]

      subset_service = %Service{
        start_date: ~D[2019-05-30],
        end_date: ~D[2019-06-30]
      }

      superset_service = %Service{
        start_date: ~D[2019-04-29],
        end_date: ~D[2019-07-01]
      }

      unrelated_service = %Service{
        start_date: ~D[2019-07-02],
        end_date: ~D[2019-09-02]
      }

      repo_fn = fn _ ->
        [
          subset_service,
          superset_service,
          unrelated_service
        ]
      end

      services = LineController.services("1", service_date, repo_fn)
      assert length(services) == 2
      refute Enum.member?(services, subset_service)
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
