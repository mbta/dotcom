defmodule Predictions.Mixfile do
  use Mix.Project

  def project do
    [
      app: :predictions,
      version: "0.1.0",
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
    [extra_applications: [:logger], mod: {Predictions, []}]
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
      {:timex, ">= 0.0.0"},
      {:bypass, "~> 1.0", only: :test},
      {:repo_cache, in_umbrella: true},
      {:server_sent_event_stage, "~> 1.0"},
      {:phoenix_pubsub, "~> 2.1.3"}
    ]
  end
end
