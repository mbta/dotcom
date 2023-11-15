defmodule Alerts do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    # Define workers and child supervisors to be supervised
    children =
      case Application.get_env(:alerts, :bus_stop_change_bucket) do
        nil ->
          [Alerts.Supervisor]

        _ ->
          [
            Alerts.Supervisor,
            Alerts.BusStopChangeSupervisor
          ]
      end

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one]
    Supervisor.start_link(children, opts)
  end
end
