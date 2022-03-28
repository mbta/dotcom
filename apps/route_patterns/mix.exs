defmodule RoutePatterns.MixProject do
  use Mix.Project

  def project do
    [
      app: :route_patterns,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.8",
      start_permanent: Mix.env() == :prod,
      test_coverage: [tool: LcovEx, output: "cover"],
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :repo_cache],
      mod: {RoutePatterns.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"},
      {:repo_cache, in_umbrella: true},
      {:v3_api, in_umbrella: true},
      {:exvcr_helpers, in_umbrella: true, only: :test},
      {:lcov_ex, "~> 0.2", only: [:dev, :test], runtime: false}
    ]
  end
end
