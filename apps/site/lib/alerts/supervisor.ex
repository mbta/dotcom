defmodule Alerts.Supervisor do
  use Supervisor

  def start_link(_) do
    Supervisor.start_link(__MODULE__, [])
  end

  @impl Supervisor
  def init(_) do
    children =
      case Application.get_env(:alerts, :bus_stop_change_bucket) do
        nil ->
          [Alerts.CacheSupervisor]

        _ ->
          [
            Alerts.CacheSupervisor,
            Alerts.BusStopChangeSupervisor
          ]
      end

    Supervisor.init(children, strategy: :one_for_one)
  end
end
