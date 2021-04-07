defmodule Fares.Mixfile do
  use Mix.Project

  def project do
    [
      app: :fares,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.3",
      build_embedded: Mix.env() == :prod,
      start_permanent: Mix.env() == :prod,
      test_coverage: [tool: ExCoveralls],
      deps: deps()
    ]
  end

  # Configuration for the OTP application
  #
  # Type "mix help compile.app" for more information
  def application do
    [extra_applications: [:logger], mod: {Fares.Application, []}]
  end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # To depend on another app inside the umbrella:
  #
  #   {:myapp, in_umbrella: true}
  #
  # Type "mix help deps" for more examples and options
  defp deps do
    [
      {:csv, "~> 2.3"},
      {:excoveralls, "~> 0.5", only: :test},
      {:sweet_xml, "~> 0.6.2", only: [:dev, :test]},
      {:repo_cache, in_umbrella: true},
      {:stops, in_umbrella: true},
      {:schedules, in_umbrella: true},
      {:google_maps, in_umbrella: true},
      {:rstar, github: "armon/erl-rstar"},
      {:exvcr_helpers, in_umbrella: true, only: :test}
    ]
  end
end
