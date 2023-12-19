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
      elixirc_paths: elixirc_paths(Mix.env()),
      start_permanent: Mix.env() == :prod,
      test_coverage: [tool: ExCoveralls],
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
      {:bypass, "~> 1.0", only: :test},
      {:html_sanitize_ex, "1.3.0"},
      {:httpoison, ">= 0.0.0"},
      {:mock, "~> 0.3.3", only: :test},
      {:nebulex, "2.5.2"},
      {:nebulex_redis_adapter, "2.3.1"},
      {:phoenix_html, "~> 3.0"},
      {:plug, "~> 1.14.2"},
      {:poison, ">= 0.0.0", override: true},
      {:quixir, "~> 0.9", only: :test},
      {:repo_cache, in_umbrella: true},
      {:timex, ">= 0.0.0"},
      {:util, in_umbrella: true}
    ]
  end
end
