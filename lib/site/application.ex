defmodule Site.Application do
  @moduledoc """
  Starts all processes needed to support the Phoenix application for MBTA.com.
  This includes a variety of caches, Supervisors starting assorted GenServers,
  and finally the Phoenix Endpoint. These are listed in a particular order, as
  some processes depend on other processes having started.
  """

  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    Application.put_env(
      :site,
      :allow_indexing,
      SiteWeb.ControllerHelpers.environment_allows_indexing?()
    )

    # hack to pull the STATIC_SCHEME variable out of the environment
    Application.put_env(
      :site,
      SiteWeb.Endpoint,
      update_static_url(Application.get_env(:site, SiteWeb.Endpoint))
    )

    children =
      [
        # Start the endpoint when the application starts
        %{
          id: ConCache,
          start:
            {ConCache, :start_link,
             [
               [
                 ttl: :timer.seconds(60),
                 ttl_check: :timer.seconds(5),
                 ets_options: [read_concurrency: true]
               ],
               [name: :line_diagram_realtime_cache]
             ]}
        },
        RepoCache.Supervisor,
        V3Api.Supervisor,
        Schedules.Supervisor,
        Facilities.Supervisor,
        Stops.Supervisor
      ] ++
        if Application.get_env(:site, :start_data_processes) do
          [
            Vehicles.Supervisor,
            Supervisor.child_spec(
              {Site.Stream.Vehicles,
               name: :vehicle_marker_channel_broadcaster, topic: "vehicles"},
              id: :vehicle_marker_channel_broadcaster
            ),
            Supervisor.child_spec(
              {Site.Stream.Vehicles, name: :vehicles_channel_broadcaster, topic: "vehicles-v2"},
              id: :vehicles_channel_broadcaster
            ),
            {Site.GreenLine.Supervisor, name: Site.GreenLine.Supervisor}
          ]
        else
          []
        end ++
        [
          {Site.React, name: Site.React},
          CMS.Supervisor,
          Routes.Supervisor,
          Algolia.Supervisor,
          LocationService.Supervisor,
          Services.Supervisor,
          RoutePatterns.Supervisor,
          Predictions.Supervisor,
          Site.RealtimeSchedule,
          {Phoenix.PubSub, name: Site.PubSub},
          Alerts.Supervisor,
          Fares.Supervisor,
          {SiteWeb.Endpoint, name: SiteWeb.Endpoint}
        ]

    opts = [strategy: :one_for_one, name: Site.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    SiteWeb.Endpoint.config_change(changed, removed)
    :ok
  end

  defp update_static_url([{:static_url, static_url_parts} | rest]) do
    static_url_parts = Keyword.update(static_url_parts, :scheme, nil, &update_static_url_scheme/1)
    [{:static_url, static_url_parts} | update_static_url(rest)]
  end

  defp update_static_url([first | rest]) do
    [first | update_static_url(rest)]
  end

  defp update_static_url([]) do
    []
  end

  defp update_static_url_scheme({:system, env_var}), do: System.get_env(env_var)
  defp update_static_url_scheme(scheme), do: scheme
end
