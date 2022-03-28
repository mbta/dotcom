defmodule CMS.Mixfile do
  use Mix.Project

  def project do
    [
      app: :cms,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.3",
      elixirc_paths: elixirc_paths(Mix.env()),
      start_permanent: Mix.env() == :prod,
      test_coverage: [
        tool: LcovEx,
        output: "cover",
        ignore_files: [
          "test/support",
          "lib/custom_html5_scrubber.ex"
        ]
      ],
      deps: deps()
    ]
  end

  # Configuration for the OTP application
  #
  # Type "mix help compile.app" for more information
  def application do
    [
      extra_applications: [
        :logger
      ],
      mod: {CMS, []}
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

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
      {:httpoison, ">= 0.0.0"},
      {:poison, ">= 0.0.0", override: true},
      {:timex, ">= 0.0.0"},
      {:plug, "~> 1.12"},
      {:html_sanitize_ex, "~> 1.3.0"},
      {:bypass, "~> 1.0", only: :test},
      {:quixir, "~> 0.9", only: :test},
      {:lcov_ex, "~> 0.2", only: [:dev, :test], runtime: false},
      {:mock, "~> 0.3.3", only: :test},
      {:phoenix_html, "~> 2.6"},
      {:repo_cache, in_umbrella: true},
      {:util, in_umbrella: true},
      {:exvcr_helpers, in_umbrella: true, only: :test},
      {:lcov_ex, "~> 0.2", only: [:dev, :test], runtime: false}
    ]
  end
end
