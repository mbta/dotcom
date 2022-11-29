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
      compilers: [:phoenix, :gettext] ++ Mix.compilers(),
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
      :logger
    ]

    extra_apps =
      if Mix.env() == :prod do
        [:sasl | extra_apps]
      else
        extra_apps
      end

    [mod: {Site.Application, []}, included_applications: [:laboratory], extra_apps: extra_apps]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.4.1"},
      {:phoenix_pubsub, "~> 1.1.2"},
      {:phoenix_html, "~> 2.13.1"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:gettext, "~> 0.9"},
      {:plug_cowboy, "~> 2.0"},
      {:timex, ">= 2.0.0"},
      {:ehmon, github: "mbta/ehmon", only: :prod},
      {:distillery, "~> 2.0"},
      {:inflex, "~> 1.8.0"},
      {:html_sanitize_ex, "1.3.0"},
      {:logster, "~> 0.4.0"},
      {:quixir, "~> 0.9", only: :test},
      {:sizeable, "~> 0.1.5"},
      {:poison, "~> 2.2", override: true},
      {:laboratory, github: "paulswartz/laboratory", ref: "cookie_opts"},
      {:parallel_stream, "~> 1.0.5"},
      {:bypass, "~> 1.0", only: :test},
      {:dialyxir, ">= 1.0.0-rc.4", only: [:test, :dev], runtime: false},
      {:benchfella, "~> 0.3", only: :dev},
      {:floki, "~> 0.31.0"},
      {:httpoison, "~> 1.5"},
      {:mock, "~> 0.3.3", only: :test},
      {:polyline, github: "ryan-mahoney/polyline_ex"},
      {:sentry, "~> 7.0"},
      {:recon, "~> 2.5.1", only: :prod},
      {:diskusage_logger, "~> 0.2.0"},
      {:hammer, "~> 6.0"},
      {:poolboy, "~> 1.5"},
      {:wallaby, "~> 0.22", runtime: false, only: :test},
      {:con_cache, "~> 0.12.0"},
      {:unrooted_polytree, "~> 0.1.1"},
      # Required to mock challenge failures. Upgrade once a version > 3.0.0 is released.
      {:recaptcha,
       github: "samueljseay/recaptcha", ref: "8ea13f63990ca18725ac006d30e55d42c3a58457"},
      {:route_patterns, in_umbrella: true},
      {:stops, in_umbrella: true},
      {:routes, in_umbrella: true},
      {:alerts, in_umbrella: true},
      {:holiday, in_umbrella: true},
      {:schedules, in_umbrella: true},
      {:algolia, in_umbrella: true},
      {:feedback, in_umbrella: true},
      {:zones, in_umbrella: true},
      {:fares, in_umbrella: true},
      {:cms, in_umbrella: true},
      {:vehicles, in_umbrella: true},
      {:location_service, in_umbrella: true},
      {:util, in_umbrella: true},
      {:predictions, in_umbrella: true},
      {:trip_plan, in_umbrella: true},
      {:services, in_umbrella: true},
      {:repo_cache, in_umbrella: true},
      {:exvcr_helpers, in_umbrella: true, only: :test}
    ]
  end
end
