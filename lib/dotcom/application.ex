defmodule Dotcom.Application do
  @moduledoc """
  Starts all processes needed to support the Phoenix application for MBTA.com.
  This includes a variety of caches, Supervisors starting assorted GenServers,
  and finally the Phoenix Endpoint. These are listed in a particular order, as
  some processes depend on other processes having started.
  """

  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  @impl Application
  def start(_type, _args) do
    children =
      [
        {Application.get_env(:dotcom, :cache, Dotcom.Cache.Multilevel), []},
        {Dotcom.RateLimit, [clean_period: 60_000 * 10]},
        {Finch, name: Dotcom.Finch, pools: %{default: [size: 300, count: 10]}}
      ] ++
        if Application.get_env(:dotcom, :env) != :test do
          [
            {Finch, name: Telemetry.Finch, pools: %{default: [size: 200]}},
            {Dotcom.Telemetry, []},
            {Dotcom.Cache.Inspector.Subscriber, []},
            {Dotcom.Cache.Telemetry, []},
            {DotcomWeb.Telemetry, []},
            {Req.Telemetry, []}
          ]
        else
          []
        end ++
        if Application.get_env(:dotcom, :start_data_processes) do
          [
            Vehicles.Supervisor,
            Supervisor.child_spec(
              {Dotcom.Stream.Vehicles,
               name: :vehicle_marker_channel_broadcaster, topic: "vehicles"},
              id: :vehicle_marker_channel_broadcaster
            ),
            Supervisor.child_spec(
              {Dotcom.Stream.Vehicles, name: :vehicles_channel_broadcaster, topic: "vehicles-v2"},
              id: :vehicles_channel_broadcaster
            )
          ]
        else
          []
        end ++
        [
          Routes.Supervisor,
          Predictions.Supervisor,
          Alerts.BusStopChangeSupervisor,
          Alerts.CacheSupervisor,
          {Phoenix.PubSub, name: Dotcom.PubSub},
          DotcomWeb.Endpoint
        ] ++
        if Application.get_env(:dotcom, :env) != :test do
          [
            Dotcom.ViaFairmount,
            {Dotcom.SystemStatus.CommuterRailCache, []},
            {Dotcom.SystemStatus.SubwayCache, []}
          ]
        else
          []
        end

    opts = [strategy: :one_for_one, name: Dotcom.Supervisor]

    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl Application
  def config_change(changed, _new, removed) do
    DotcomWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
