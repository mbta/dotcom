defmodule DotCom.Mixfile do
  use Mix.Project

  def project do
    [
      # app and version expected by `mix compile.app`
      app: :dotcom,
      version: "0.0.1",
      elixir: "~> 1.12",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: Mix.compilers(),
      # configures `mix compile` to embed all code and priv content in the _build directory instead of using symlinks
      build_embedded: Mix.env() == :prod,
      # used by `mix app.start` to start the application and children in permanent mode, which guarantees the node will shut down if the application terminates (typically because its root supervisor has terminated).
      start_permanent: Mix.env() == :prod,
      test_coverage: [tool: ExCoveralls],
      preferred_cli_env: [
        coveralls: :test,
        "coveralls.html": :test
      ],
      dialyzer: [
        plt_add_apps: [:mix, :phoenix_live_reload, :ex_aws, :ex_aws_ses],
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
      docs: [main: "Dotcom", logo: "assets/static/images/mbta-logo-t.png"]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Configuration for the OTP application generated by `mix compile.app`
  def application do
    extra_apps = [
      :logger,
      :runtime_tools,
      :os_mon
    ]

    extra_apps =
      if Mix.env() == :prod do
        [:sasl | extra_apps]
      else
        extra_apps
      end

    [
      # the module to invoke when the application is started
      mod: {Dotcom.Application, []},
      # a list of OTP applications your application depends on which are not included in :deps
      extra_applications: extra_apps
    ]
  end

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  #
  # You can check the status of each dependency by running `mix hex.outdated`.
  defp deps do
    [
      {:absinthe_client, "0.1.0"},
      {:benchfella, "0.3.5", [only: :dev]},
      # latest version 1.0.5; cannot upgrade because of server_sent_event_stage expects castore < 1
      {:castore, "0.1.22"},
      {:crc, "0.10.5"},
      # latest version 1.7.5; cannot upgrade because it causes our ci to fail
      # this version just came out in the last few days, so it might be a bug that gets fixed soon
      {:credo, "1.7.3", only: [:dev, :test]},
      {:csv, "3.2.1"},
      {:decorator, "1.4.0"},
      {:dialyxir, "1.4.3", [only: [:test, :dev], runtime: false]},
      {:diskusage_logger, "0.2.0"},
      {:eflame, "1.0.1", only: :dev},
      {:ehmon, [github: "mbta/ehmon", only: :prod]},
      {:ex_aws, "2.5.1"},
      {:ex_aws_s3, "2.5.3"},
      {:ex_aws_ses, "2.4.1"},
      {:ex_doc, "0.31.2", only: :dev},
      {:ex_machina, "2.7.0", only: :test},
      {:ex_unit_summary, "0.1.0", only: [:dev, :test]},
      # latest version 0.18.0; cannot upgrade because expects castore >= 1
      {:excoveralls, "0.16.1", only: :test},
      {:faker, "0.18.0", only: :test},
      {:floki, "0.36.0"},
      {:gen_stage, "1.2.1"},
      {:gettext, "0.24.0"},
      {:hackney, "1.20.1"},
      {:hammer, "6.2.1"},
      # latest version 1.4.3; cannot upgrade because it changes how we handle telephone links
      {:html_sanitize_ex, "1.3.0"},
      # latest version 2.2.1; cannot upgrade because api has changed
      {:httpoison, "1.8.2"},
      {:inflex, "2.1.0"},
      {:jason, "1.4.1", override: true},
      {:logster, "1.1.1"},
      {:mail, "0.3.1"},
      {:mock, "0.3.8", [only: :test]},
      {:mox, "1.1.0", [only: :test]},
      {:nebulex, "2.6.1"},
      {:nebulex_redis_adapter, "2.4.0"},
      {:open_trip_planner_client,
       [
         github: "thecristen/open_trip_planner_client",
         ref: "v0.6.3"
       ]},
      {:parallel_stream, "1.1.0"},
      # latest version 1.7.11
      {:phoenix, "1.6.16"},
      # latest version 4.1.1; cannot upgrade because we use Phoenix.HTML
      {:phoenix_html, "3.3.3"},
      {:phoenix_live_dashboard, "0.8.3"},
      {:phoenix_live_reload, "1.4.1", [only: :dev]},
      {:phoenix_live_view, "0.20.5"},
      {:phoenix_pubsub, "2.1.3"},
      {:plug, "1.15.3"},
      {:plug_cowboy, "2.7.0"},
      # latest version is 5.0.0; cannot upgrade because we use Poison.Parser.parse!
      {:poison, "3.1.0"},
      {:polyline, "1.4.0"},
      {:poolboy, "1.5.2"},
      {:quixir, "0.9.3", [only: :test]},
      # Required to mock challenge failures. Upgrade once a version > 3.0.0 is released.
      {:recaptcha,
       [
         github: "samueljseay/recaptcha",
         ref: "8ea13f63990ca18725ac006d30e55d42c3a58457"
       ]},
      {:recase, "0.7.0"},
      {:recon, "2.5.4", [only: :prod]},
      {:redix, "1.4.0"},
      {:rstar, github: "armon/erl-rstar"},
      # latest version 10.1.0; cannot upgrade because setup appears to have changed
      {:sentry, "7.2.5"},
      {:server_sent_event_stage, "1.1.0"},
      {:sizeable, "1.0.2"},
      {:sweet_xml, "0.7.4", only: [:prod, :dev]},
      {:telemetry, "1.2.1", override: true},
      {:telemetry_metrics, "0.6.2"},
      {:telemetry_metrics_statsd, "0.7.0"},
      {:telemetry_poller, "1.0.0"},
      # latest version is 3.7.11; cannot upgrade because tests fail
      {:timex, "3.1.24"},
      {:unrooted_polytree, "0.1.1"},
      {:uuid, "1.1.8"},
      {:wallaby, "0.30.6", [runtime: false, only: [:test, :dev]]}
    ]
  end

  defp aliases do
    [
      "compile.assets": &compile_assets/1,
      "phx.server": [&server_setup/1, "phx.server"]
    ]
  end

  defp compile_assets(_) do
    # builds the node script that lets us render some react components
    # server-side, compiling assets/react_app.js,
    # outputting react_renderer/dist/app.js
    print("(1/3) webpack --config webpack.config.react_app.js --env.production")

    {_, 0} =
      System.cmd("npm", ["run", "--prefix", "assets", "webpack:build:react"],
        stderr_to_stdout: true
      )

    # 3 - transpiles/builds our typescript/CSS/everything else for production
    print("2/3) webpack --config webpack.config.prod.js --env.production (long)")

    {_, 0} =
      System.cmd("npm", ["run", "--prefix", "assets", "webpack:build"], stderr_to_stdout: true)

    # starts the Phoenix framework mix phx.digest command, that takes content
    # from assets/static and processes it into priv/static
    print("(3/3) mix phx.digest")

    Mix.Task.run("phx.digest", [])
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
    host = Application.get_env(:dotcom, DotcomWeb.Endpoint)[:url][:host]

    port =
      System.get_env("PORT") || Application.get_env(:dotcom, DotcomWeb.Endpoint)[:http][:port]

    "#{host}:#{port}"
  end

  defp print(text), do: Mix.shell().info([:cyan, text, :reset])

  defp print_with_bg(text_list),
    do: Mix.shell().info([:white_background, :blue] ++ text_list ++ [:reset])
end
