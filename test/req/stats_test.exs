defmodule Req.StatsTest do
  use ExUnit.Case

  import TelemetryTest

  alias Req.Stats

  setup [:telemetry_listen]

  setup do
    {:ok, _} = Stats.start_link()

    :ok
  end

  @tag telemetry_listen: [:req, :request]
  test "aggregates and dispatches stats" do
    # Setup
    duration = :rand.uniform(1_000_000_000)

    measurement = %{
      duration: duration
    }

    metadata = %{
      request: %{
        host: Faker.Internet.domain_name(),
        path: "/#{Faker.Internet.slug()}/"
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
        event: [:req, :request],
        measurements: %{avg: _duration, count: 2},
        metadata: %{host: _host, path: _path, status: _status}
      }
    }
  end
end
