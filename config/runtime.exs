import Config

default_port = if config_env() == :test, do: "4002", else: "4001"
port = String.to_integer(System.get_env("PORT") || default_port)
host = System.get_env("HOST", "localhost")
webpack_port = String.to_integer(System.get_env("WEBPACK_PORT") || "8090")

static_url =
  case System.get_env("STATIC_URL") do
    nil -> [host: System.get_env("STATIC_HOST") || host, port: port]
    static_url -> [url: static_url]
  end

# ## Using releases
#
# If you use `mix release`, you need to explicitly enable the server
# by passing the PHX_SERVER=true when you start it:
#
#     PHX_SERVER=true bin/dotcom start
#
# Alternatively, you can use `mix phx.gen.release` to generate a `bin/server`
# script that automatically sets the env var above.
if System.get_env("PHX_SERVER") do
  config :dotcom, DotcomWeb.Endpoint, server: true
end

if config_env() == :dev do
  # For development, we disable any cache and enable
  # debugging and code reloading.
  #
  # The watchers configuration can be used to run external
  # watchers to your application. For example, we use it
  # with Webpack to recompile .js and .css sources.
  webpack_path = "http://#{System.get_env("STATIC_HOST") || host}:#{webpack_port}"

  config :dotcom, DotcomWeb.Endpoint,
    # Binding to loopback ipv4 address prevents access from other machines.
    # Change to `ip: {0, 0, 0, 0}` to allow access from other machines.
    http: [ip: {0, 0, 0, 0}, port: port],
    static_url: static_url

  config :dotcom,
    dev_server?: true,
    webpack_path: webpack_path
end

# Postgres configuration
config :dotcom, ecto_repos: [Dotcom.Repo]

postgres_host = System.get_env("POSTGRES_HOST", "127.0.0.1")
postgres_port = System.get_env("POSTGRES_PORT", "5432")

config :dotcom, Dotcom.Repo,
  database: "postgres",
  username: "postgres",
  password: "postgres",
  hostname: postgres_host,
  port: postgres_port

# Redis cluster configuration
redis_host_env = System.get_env("REDIS_HOST", "127.0.0.1")
redis_port_env = System.get_env("REDIS_PORT", "6379")

redis_mode =
  if System.get_env("REDIS_STANDALONE") == nil do
    :redis_cluster
  else
    :standalone
  end

redis_host =
  if redis_host_env == "",
    do: "127.0.0.1",
    else: redis_host_env

redis_port =
  if redis_port_env == "",
    do: 6379,
    else: String.to_integer(redis_port_env)

redis_conn_opts = [
  host: redis_host,
  port: redis_port
]

redis_config = [
  mode: redis_mode,
  conn_opts: redis_conn_opts,
  redis_cluster: [
    configuration_endpoints: [
      conn_opts: redis_conn_opts
    ]
  ],
  stats: true,
  telemetry: true
]

# This is used by PubSub, we only use the first node in the cluster
config :dotcom, :redis_config, redis_conn_opts

# Set caches that use the Redis cluster
config :dotcom, Dotcom.Cache.Multilevel,
  model: :inclusive,
  levels: [
    {Dotcom.Cache.Multilevel.Local, backend: :ets, stats: true, telemetry: true},
    {Dotcom.Cache.Multilevel.Redis, redis_config},
    {Dotcom.Cache.Multilevel.Publisher, stats: true, telemetry: true}
  ]

if config_env() == :test do
  config :dotcom, DotcomWeb.Router,
    basic_auth: [
      username: "username",
      password: "password"
    ],
    basic_auth_readonly: [
      username: "username",
      password: "password"
    ]
else
  config :dotcom, DotcomWeb.Router,
    basic_auth: [
      username: System.get_env("BASIC_AUTH_USERNAME"),
      password: System.get_env("BASIC_AUTH_PASSWORD")
    ],
    basic_auth_readonly: [
      username: System.get_env("BASIC_AUTH_READONLY_USERNAME"),
      password: System.get_env("BASIC_AUTH_READONLY_PASSWORD")
    ]
end

config :dotcom, :cms_api,
  base_url: System.get_env("CMS_API_BASE_URL"),
  headers: [
    {"Content-Type", "application/json"},
    {"Accept", "application/json"}
  ]

config :dotcom, :mbta_api,
  base_url: System.get_env("MBTA_API_BASE_URL"),
  headers: [
    {"MBTA-Version", "2019-07-01"},
    {"x-api-key", System.get_env("MBTA_API_KEY")},
    {"x-enable-experimental-features", "true"}
  ]

config :dotcom, :telemetry_metrics_splunk,
  index: System.get_env("TELEMETRY_METRICS_SPLUNK_INDEX"),
  token: System.get_env("TELEMETRY_METRICS_SPLUNK_TOKEN"),
  url: "https://http-inputs-mbta.splunkcloud.com/services/collector"

if config_env() != :test do
  config :dotcom, :algolia_config,
    app_id: System.get_env("ALGOLIA_APP_ID"),
    search: System.get_env("ALGOLIA_SEARCH_KEY"),
    write: System.get_env("ALGOLIA_WRITE_KEY")

  config :dotcom,
    support_ticket_to_email: System.get_env("SUPPORT_TICKET_TO_EMAIL", "test@test.com"),
    support_ticket_from_email: System.get_env("SUPPORT_TICKET_FROM_EMAIL", "from@test.com"),
    support_ticket_reply_email: System.get_env("SUPPORT_TICKET_REPLY_EMAIL", "reply@test.com")
end

config :dotcom, OpenTripPlanner,
  timezone: System.get_env("OPEN_TRIP_PLANNER_TIMEZONE", "America/New_York"),
  otp_url: System.get_env("OPEN_TRIP_PLANNER_URL")

if config_env() != :test and System.get_env("OPEN_TRIP_PLANNER_URL") != "" do
  config :open_trip_planner_client,
    otp_url: System.get_env("OPEN_TRIP_PLANNER_URL")
end

if config_env() == :prod do
  config :dotcom, alerts_bus_stop_change_bucket: System.get_env("S3_PREFIX_BUSCHANGE")

  config :dotcom, DotcomWeb.Endpoint,
    check_origin: ["https://#{host}"],
    http: [
      # Enable IPv6 and bind on all interfaces.
      # Set it to  {0, 0, 0, 0, 0, 0, 0, 1} for local network only access.
      # See the documentation on https://hexdocs.pm/plug_cowboy/Plug.Cowboy.html
      # for details about using IPv6 vs IPv4 and loopback vs public addresses.
      ip: {0, 0, 0, 0, 0, 0, 0, 0},
      port: port,
      transport_options: [
        num_acceptors: 2_048,
        max_connections: 32_768,
        socket_opts: [:inet6]
      ],
      compress: true,
      protocol_options: [
        max_header_value_length: 16_384,
        max_request_line_length: 16_384
      ]
    ],
    url: [host: host, scheme: "https", port: 443],
    static_url: [
      scheme: System.get_env("STATIC_SCHEME"),
      host: System.get_env("STATIC_HOST"),
      port: System.get_env("STATIC_PORT")
    ]

  config :dotcom,
    support_ticket_to_email: System.get_env("SUPPORT_TICKET_TO_EMAIL"),
    support_ticket_from_email: System.get_env("SUPPORT_TICKET_FROM_EMAIL"),
    support_ticket_reply_email: System.get_env("SUPPORT_TICKET_REPLY_EMAIL")
end

config :dotcom, LocationService,
  aws_index: System.get_env("AWS_PLACE_INDEX_NAME", "dotcom-dev-esri")

config :dotcom, DotcomWeb.ViewHelpers,
  google_tag_manager_id: System.get_env("GOOGLE_TAG_MANAGER_ID"),
  google_tag_manager_auth: System.get_env("GOOGLE_TAG_MANAGER_AUTH"),
  google_tag_manager_preview: System.get_env("GOOGLE_TAG_MANAGER_PREVIEW")

config :dotcom, google_api_key: System.get_env("GOOGLE_API_KEY")

config :recaptcha,
  public_key: System.get_env("RECAPTCHA_PUBLIC_KEY"),
  secret: System.get_env("RECAPTCHA_PRIVATE_KEY", "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe")

config :sentry,
  dsn: System.get_env("SENTRY_DSN"),
  environment_name: System.get_env("SENTRY_ENVIRONMENT"),
  js_dsn: System.get_env("SENTRY_JS_DSN")

config :dotcom,
  env: config_env(),
  # soon: use a better env var name
  is_prod_env?: System.get_env("SENTRY_ENVIRONMENT") == "prod"

if System.get_env("LOGGER_LEVEL") in ~w(emergency alert critical error warning notice info debug all none) &&
     config_env() != :test do
  config :logger, level: String.to_atom(System.get_env("LOGGER_LEVEL"))
  config :logger, :console, level: String.to_atom(System.get_env("LOGGER_LEVEL"))
end

default_key_base = "yK6hUINZWlq04EPu3SJjAHNDYgka8MZqgXZykF+AQ2PvWs4Ua4IELdFl198aMvw0"
secret_key_base = System.get_env("SITE_SECRET_KEY_BASE", default_key_base)

# Configures the endpoint
config :dotcom, DotcomWeb.Endpoint, secret_key_base: secret_key_base
