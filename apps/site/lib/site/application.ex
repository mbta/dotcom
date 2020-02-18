defmodule Site.Application do
  @moduledoc false

  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    # hack to pull the STATIC_SCHEME variable out of the environment
    Application.put_env(
      :site,
      SiteWeb.Endpoint,
      update_static_url(Application.get_env(:site, SiteWeb.Endpoint))
    )

    children = [
      # Start the endpoint when the application starts
      supervisor(ConCache, [[], [name: :line_diagram_realtime_cache, ttl: :timer.seconds(60)]]),
      supervisor(SiteWeb.Endpoint, []),
      supervisor(Site.GreenLine.Supervisor, []),
      supervisor(Site.Stream.Vehicles, []),
      supervisor(Site.React, []),
      supervisor(Site.RealtimeSchedule, [])
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
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
