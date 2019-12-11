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
      service_date = ~D[2019-05-01]

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
  end
end
