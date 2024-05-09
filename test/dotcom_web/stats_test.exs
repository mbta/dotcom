defmodule DotcomWeb.StatsTest do
  use ExUnit.Case

  import TelemetryTest

  alias DotcomWeb.Stats

  setup [:telemetry_listen]

  setup do
    {:ok, _} = Stats.start_link()

    :ok
  end

  @tag telemetry_listen: [:dotcom_web, :request]
  test "aggregates and dispatches stats" do
    # Setup
    duration = :rand.uniform(1_000_000_000)

    measurement = %{
      duration: duration
    }

    metadata = %{
      conn: %{
        method: Enum.random(["GET", "POST", "PUT", "DELETE"]),
        status: Enum.random([200, 404, 500])
      },
      route: "/#{Faker.Internet.slug()}/"
    }

    # Exercise
    :telemetry.execute([:phoenix, :router_dispatch, :stop], measurement, metadata)
    :telemetry.execute([:phoenix, :router_dispatch, :stop], measurement, metadata)

    Stats.dispatch_stats()

    # Verify
    assert_receive {
      :telemetry_event,
      %{
        event: [:dotcom_web, :request],
        measurements: %{avg: _duration, count: 2},
        metadata: %{method: _host, path: _path, status: _status}
      }
    }
  end
end
