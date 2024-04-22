defmodule MBTA.Api.StatsTest do
  use ExUnit.Case

  import TelemetryTest

  alias MBTA.Api.Stats

  setup [:telemetry_listen]

  setup do
    {:ok, _} = Stats.start_link()

    :ok
  end

  @tag telemetry_listen: [:mbta_api, :request]
  test "aggregates and dispatches stats" do
    # Setup
    # 1 second in nanoseconds
    duration = :rand.uniform(1_000_000_000)

    measurement = %{
      duration: duration
    }

    metadata = %{
      request: %{
        path: "/#{Faker.Team.creature()}/"
      },
      status: Enum.random([200, 404, 500])
    }

    # Exercise
    :telemetry.execute([:finch, :recv, :stop], measurement, metadata)
    :telemetry.execute([:finch, :recv, :stop], measurement, metadata)

    Stats.dispatch_stats()

    # Verify
    assert_receive {
      :telemetry_event,
      %{
        event: [:mbta_api, :request],
        measurements: %{avg: ^duration, count: 2},
        metadata: %{path: _path, status: _status}
      }
    }
  end
end
