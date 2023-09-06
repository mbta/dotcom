defmodule Algolia.Mixfile do
  use Mix.Project

  def project do
    [
      app: :algolia,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixirc_paths: elixirc_paths(Mix.env()),
      start_permanent: Mix.env() == :prod,
      test_coverage: [tool: ExCoveralls],
      deps: deps()
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {Algolia.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:stops, in_umbrella: true},
      {:routes, in_umbrella: true},
      {:util, in_umbrella: true},
      {:httpoison, "~> 1.5"},
      {:plug, "~> 1.13.0"},
      {:bypass, "~> 1.0", only: :test}
    ]
  end
end
