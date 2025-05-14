defmodule DotcomWeb.SystemStatus.CommuterRailStatusTest do
  use ExUnit.Case

  import DotcomWeb.Components.SystemStatus.CommuterRailStatus
  import Phoenix.LiveViewTest

  describe "alerts_commuter_rail_status/1" do
    test "shows no service when a route isn't in service" do
      # SETUP
      assigns = %{
        commuter_rail_status: %{
          Faker.Cat.breed() => %{
            alert_counts: %{},
            name: Faker.Cat.breed(),
            service_today?: false,
            sort_order: 0
          }
        }
      }

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "No Scheduled Service"
    end

    test "shows normal service when a route has no alert counts" do
      # SETUP
      assigns = %{
        commuter_rail_status: %{
          Faker.Cat.breed() => %{
            alert_counts: %{},
            name: Faker.Cat.breed(),
            service_today?: true,
            sort_order: 0
          }
        }
      }

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "Normal Service"
    end

    test "combines cancellations and delays into a single row" do
      # SETUP
      assigns = %{
        commuter_rail_status: %{
          Faker.Cat.breed() => %{
            alert_counts: %{
              cancellation: 1,
              delay: 2
            },
            name: Faker.Cat.breed(),
            service_today?: true,
            sort_order: 0
          }
        }
      }

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "3 Cancellations / Delays"
    end

    test "shows service alerts and cancellations/delays in separate rows" do
      # SETUP
      assigns = %{
        commuter_rail_status: %{
          Faker.Cat.breed() => %{
            alert_counts: %{
              cancellation: 1,
              delay: 2,
              shuttle: 1
            },
            name: Faker.Cat.breed(),
            service_today?: true,
            sort_order: 0
          }
        }
      }

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "3 Cancellations / Delays"
      assert html =~ "1 Shuttle"
    end

    test "combines service alerts into a single row" do
      # SETUP
      assigns = %{
        commuter_rail_status: %{
          Faker.Cat.breed() => %{
            alert_counts: %{
              shuttle: 1,
              station_closure: 2
            },
            name: Faker.Cat.breed(),
            service_today?: true,
            sort_order: 0
          }
        }
      }

      # EXERCISE
      html = render_component(&alerts_commuter_rail_status/1, assigns)

      # VERIFY
      assert html =~ "3 Service Alerts"
    end
  end
end
