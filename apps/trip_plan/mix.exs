defmodule TripPlan.Mixfile do
  use Mix.Project

  def project do
    [
      app: :trip_plan,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.4",
      build_embedded: Mix.env() == :prod,
      start_permanent: Mix.env() == :prod,
      test_coverage: [tool: LcovEx],
      deps: deps()
    ]
  end

  # Configuration for the OTP application
  #
  # Type "mix help compile.app" for more information
  def application do
    # Specify extra applications you'll use from Erlang/Elixir
    [extra_applications: [:logger]]
  end

  # Dependencies can be Hex packages:
  #
  #   {:my_dep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:my_dep, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"}
  #
  # To depend on another app inside the umbrella:
  #
  #   {:my_app, in_umbrella: true}
  #
  # Type "mix help deps" for more examples and options
  defp deps do
    [
      {:stops, in_umbrella: true},
      {:routes, in_umbrella: true},
      {:schedules, in_umbrella: true},
      {:poison, "~> 2.2", override: true},
      {:location_service, in_umbrella: true},
      {:lcov_ex, "~> 0.2", only: [:dev, :test], runtime: false},
      {:bypass, "~> 1.0", only: :test},
      {:mock, "~> 0.3.3", only: :test},
      {:exvcr_helpers, in_umbrella: true, only: :test},
      {:fast_local_datetime, "~> 0.1.0"}
    ]
  end
end
