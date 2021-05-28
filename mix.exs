defmodule DotCom.Mixfile do
  use Mix.Project

  def project do
    [
      apps_path: "apps",
      build_embedded: Mix.env() == :prod,
      start_permanent: Mix.env() == :prod,
      preferred_cli_env: [
        coveralls: :test,
        "coveralls.json": :test,
        "coveralls.detail": :test
      ],
      test_coverage: [tool: ExCoveralls],
      dialyzer: [
        plt_add_apps: [:mix, :phoenix_live_reload, :laboratory, :ex_aws, :ex_aws_ses],
        flags: [:race_conditions, :unmatched_returns],
        ignore_warnings: ".dialyzer.ignore-warnings"
      ],
      deps: deps(),

      # docs
      name: "MBTA Website",
      source_url: "https://github.com/mbta/dotcom",
      homepage_url: "https://www.mbta.com/",
      # The main page in the docs
      docs: [main: "Site", logo: "apps/site/assets/static/images/mbta-logo-t.png"]
    ]
  end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # Type "mix help deps" for more examples and options.
  #
  # Dependencies listed here are available only for this project
  # and cannot be accessed from applications inside the apps folder
  defp deps do
    [
      {:credo, "~> 1.5", only: [:dev, :test]},
      {:excoveralls, "~> 0.5", only: :test},
      {:ex_doc, "~> 0.18", only: :dev},
      {:exvcr, "~> 0.11.0", only: [:dev, :test]},
      {:eflame, "~> 1.0", only: :dev}
    ]
  end
end
