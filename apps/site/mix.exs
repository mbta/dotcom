defmodule Site.Mixfile do
  use Mix.Project

  def project do
    [
      app: :site,
      version: "0.0.1",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:gettext] ++ Mix.compilers(),
      build_embedded: Mix.env() == :prod,
      start_permanent: Mix.env() == :prod,
      test_coverage: [tool: ExCoveralls],
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    extra_apps = [
      :logger,
      :runtime_tools,
      :os_mon
    ]

    extra_apps =
      if Mix.env() == :prod do
        [:sasl | extra_apps]
      else
        extra_apps
      end

    [
      mod: {Site.Application, []},
      included_applications: [:laboratory],
      extra_applications: extra_apps
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:alerts, [in_umbrella: true]},
      {:algolia, [in_umbrella: true]},
      {:benchfella, "~> 0.3", [only: :dev]},
      {:bypass, "~> 1.0", [only: :test]},
      {:cms, [in_umbrella: true]},
      {:con_cache, "~> 0.12.0"},
      {:dialyxir, ">= 1.0.0-rc.4", [only: [:test, :dev], runtime: false]},
      {:diskusage_logger, "~> 0.2.0"},
      {:distillery, "~> 2.0"},
      {:ehmon, [github: "mbta/ehmon", only: :prod]},
      {:facilities, [in_umbrella: true]},
      {:fares, [in_umbrella: true]},
      {:feedback, [in_umbrella: true]},
      {:floki, "~> 0.31.0"},
      {:gettext, "~> 0.9"},
      {:hammer, "~> 6.0"},
      {:holiday, [in_umbrella: true]},
      {:html_sanitize_ex, "1.3.0"},
      {:httpoison, "~> 1.5"},
      {:inflex, "~> 1.8.0"},
      {:laboratory, [github: "paulswartz/laboratory", ref: "cookie_opts"]},
      {:location_service, [in_umbrella: true]},
      {:logster, "~> 0.4.0"},
      {:mock, "~> 0.3.3", [only: :test]},
      {:parallel_stream, "~> 1.0.5"},
      {:phoenix, "~> 1.6"},
      {:phoenix_html, "~> 3.3"},
      {:phoenix_live_dashboard, "~> 0.8"},
      {:phoenix_live_reload, "~> 1.0", [only: :dev]},
      {:phoenix_live_view, "~> 0.20"},
      {:plug_cowboy, "~> 2.6.1"},
      {:poison, "~> 3.0"},
      {:polyline, [github: "ryan-mahoney/polyline_ex"]},
      {:poolboy, "~> 1.5"},
      {:predictions, [in_umbrella: true]},
      {:quixir, "~> 0.9", [only: :test]},
      # Required to mock challenge failures. Upgrade once a version > 3.0.0 is released.
      {:recaptcha,
       [
         github: "samueljseay/recaptcha",
         ref: "8ea13f63990ca18725ac006d30e55d42c3a58457"
       ]},
      {:recon, "~> 2.5.1", [only: :prod]},
      {:repo_cache, [in_umbrella: true]},
      {:route_patterns, [in_umbrella: true]},
      {:routes, [in_umbrella: true]},
      {:schedules, [in_umbrella: true]},
      {:sentry, "~> 7.0"},
      {:services, [in_umbrella: true]},
      {:sizeable, "~> 0.1.5"},
      {:stops, [in_umbrella: true]},
      {:telemetry_metrics, "~> 0.6"},
      {:telemetry_poller, "~> 0.5"},
      {:timex, ">= 2.0.0"},
      {:trip_plan, [in_umbrella: true]},
      {:unrooted_polytree, "~> 0.1.1"},
      {:util, [in_umbrella: true]},
      {:vehicles, [in_umbrella: true]},
      {:wallaby, "~> 0.30", [runtime: false, only: [:test, :dev]]}
    ]
  end
end
