defmodule DotCom.Mixfile do
  use Mix.Project

  def project do
    [
      apps_path: "apps",
      elixir: "~> 1.12",
      build_embedded: Mix.env() == :prod,
      start_permanent: Mix.env() == :prod,
      test_coverage: [tool: ExCoveralls],
      preferred_cli_env: [
        coveralls: :test,
        "coveralls.html": :test
      ],
      dialyzer: [
        plt_add_apps: [:mix, :phoenix_live_reload, :laboratory, :ex_aws, :ex_aws_ses],
        flags: [:race_conditions, :unmatched_returns],
        ignore_warnings: ".dialyzer.ignore-warnings"
      ],
      deps: deps(),
      aliases: aliases(),

      # docs
      name: "MBTA Website",
      source_url: "https://github.com/mbta/dotcom",
      homepage_url: "https://www.mbta.com/",
      # The main page in the docs
      docs: [main: "Site", logo: "apps/site/assets/static/images/mbta-logo-t.png"]
    ]
  end

  defp deps do
    [
      {:credo, "~> 1.5", only: [:dev, :test]},
      {:excoveralls, "~> 0.14", only: :test},
      {:ex_doc, "~> 0.18", only: :dev},
      {:eflame, "~> 1.0", only: :dev},
      # Can replace with release after 2.2.10
      {:ex_aws,
       github: "ex-aws/ex_aws", ref: "08cbbd2aef4ebf52796e48761d1351b5c87c4c5e", override: true}
    ]
  end

  defp aliases do
    [
      "compile.assets": &compile_assets/1,
      "phx.server": [&server_setup/1, "phx.server"]
    ]
  end

  defp compile_assets(_) do
    # starts the Phoenix framework mix phx.digest command, that takes content
    # from apps/site/static and processes it into apps/site/priv/static
    print("(1/3) mix phx.digest")
    Mix.Task.run("phx.digest", [])

    # builds the node script that lets us render some react components
    # server-side, compiling apps/site/assets/react_app.js,
    # outputting apps/site/react_renderer/dist/app.js
    print("(2/3) webpack --config webpack.config.react_app.js --env.production")

    {_, 0} =
      System.cmd("npm", ["run", "--prefix", "apps/site/assets", "webpack:build:react"],
        stderr_to_stdout: true
      )

    # 3 - transpiles/builds our typescript/CSS/everything else for production
    print("(3/3) webpack --config webpack.config.prod.js --env.production (long)")

    {_, 0} =
      System.cmd("npm", ["run", "--prefix", "apps/site/assets", "webpack:build"],
        stderr_to_stdout: true
      )
  end

  defp server_setup(_) do
    env = Mix.env()

    # the test environment server needs assets compiled for production,
    # in the dev environment the dev server would normally serve those
    if env == :test, do: compile_assets([])

    print_with_bg([
      "\nCompiling Dotcom for the ",
      :light_magenta_background,
      " #{env} ",
      :white_background,
      " Mix environment."
    ])

    Mix.Task.run("compile")

    print_with_bg([
      "\nReady to start server @ ",
      :light_green_background,
      " #{site_url()} ",
      :white_background,
      " now."
    ])
  end

  defp site_url do
    host = Application.get_env(:site, SiteWeb.Endpoint)[:url][:host]
    port = Application.get_env(:site, SiteWeb.Endpoint)[:http][:port]
    "#{host}:#{port}"
  end

  defp print(text), do: Mix.shell().info([:cyan, text, :reset])

  defp print_with_bg(text_list),
    do: Mix.shell().info([:white_background, :blue] ++ text_list ++ [:reset])
end
