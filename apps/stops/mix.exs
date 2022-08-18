defmodule Stops.Mixfile do
  @moduledoc false
  use Mix.Project

  def project do
    [
      app: :stops,
      version: "0.0.1",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
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
    [extra_applications: [:logger], mod: {Stops, []}]
  end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # Type "mix help deps" for more examples and options
  defp deps do
    [
      {:httpoison, ">= 0.0.0"},
      {:v3_api, in_umbrella: true},
      {:json_api, in_umbrella: true},
      {:routes, in_umbrella: true},
      {:repo_cache, in_umbrella: true},
      {:timex, "~> 3.7.8"},
      {:bypass, "~> 1.0", only: :test},
      {:csv, "~> 2.3"},
      {:util, in_umbrella: true},
      {:zones, in_umbrella: true},
      {:exvcr_helpers, in_umbrella: true, only: :test}
    ]
  end
end
