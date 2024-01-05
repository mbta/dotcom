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

redis_host_env = System.get_env("REDIS_HOST", "127.0.0.1")

redis_host =
  if redis_host_env == "",
    do: "127.0.0.1",
    else: redis_host_env

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
    http: [ip: {127, 0, 0, 1}, port: port],
    static_url: static_url

  config :dotcom,
    dev_server?: true,
    webpack_path: webpack_path

  unless System.get_env("DRUPAL_ROOT") do
    # To see CMS content locally, please read the README on how to setup Kalabox.
    # These instructions will help you run the CMS locally and configure the
    # correct endpoint for the drupal root.
    System.put_env("DRUPAL_ROOT", "http://temp-drupal.invalid")
  end
end

if config_env() == :prod do
  config :dotcom, CMS.Cache,
    mode: :redis_cluster,
    redis_cluster: [
      configuration_endpoints: [
        conn_opts: [
          host: redis_host,
          port: 6379
        ]
      ]
    ],
    stats: false,
    telemetry: false
else
  config :dotcom, CMS.Cache,
    conn_opts: [
      host: redis_host,
      port: 6379
    ],
    stats: false,
    telemetry: false
end

if config_env() == :test do
  config :dotcom, DotcomWeb.Router,
    cms_basic_auth: [
      username: "username",
      password: "password"
    ]
else
  config :dotcom, DotcomWeb.Router,
    cms_basic_auth: [
      username: System.get_env("CMS_BASIC_AUTH_USERNAME"),
      password: System.get_env("CMS_BASIC_AUTH_PASSWORD")
    ]
end

config :dotcom,
  v3_api_base_url: System.get_env("V3_URL"),
  v3_api_key: System.get_env("V3_API_KEY"),
  v3_api_version: System.get_env("V3_API_VERSION", "2019-07-01"),
  v3_api_wiremock_proxy_url: System.get_env("WIREMOCK_PROXY_URL"),
  v3_api_wiremock_proxy: System.get_env("WIREMOCK_PROXY") || "false"

config :dotcom, aws_index_prefix: System.get_env("AWS_PLACE_INDEX_PREFIX") || "dotcom-dev"

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
  otp1_url: System.get_env("OPEN_TRIP_PLANNER_URL"),
  otp2_url: System.get_env("OPEN_TRIP_PLANNER_2_URL"),
  otp2_percentage: System.get_env("OPEN_TRIP_PLANNER_2_PERCENTAGE"),
  wiremock_proxy: System.get_env("WIREMOCK_PROXY", "false"),
  wiremock_proxy_url: System.get_env("WIREMOCK_TRIP_PLAN_PROXY_URL")

if config_env() != :test do
  config :dotcom,
    drupal: [
      cms_root: System.fetch_env!("DRUPAL_ROOT"),
      cms_static_path: "/sites/default/files"
    ]
end

if config_env() == :prod do
  config :dotcom, alerts_bus_stop_change_bucket: System.get_env("S3_PREFIX_BUSCHANGE")

  config :dotcom, DotcomWeb.Endpoint,
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
      ],
      # dispatch websockets but don't dispatch any other URLs, to avoid parsing invalid URLs
      # see https://hexdocs.pm/phoenix/Phoenix.Endpoint.CowboyHandler.html
      dispatch: [
        {:_,
         [
           {:_, Phoenix.Endpoint.Cowboy2Handler, {DotcomWeb.Endpoint, []}}
         ]}
      ]
    ],
    url: [host: host, scheme: "https", port: 443],
    static_url: [
      scheme: System.get_env("STATIC_SCHEME"),
      host: System.get_env("STATIC_HOST"),
      port: System.get_env("STATIC_PORT")
    ]

  unless System.get_env("PORT") do
    # configured separately so that we can have the health check not require
    # SSL
    config :dotcom, :secure_pipeline,
      force_ssl: [
        host: nil,
        rewrite_on: [:x_forwarded_proto]
      ]
  end

  config :dotcom,
    support_ticket_to_email: System.get_env("SUPPORT_TICKET_TO_EMAIL"),
    support_ticket_from_email: System.get_env("SUPPORT_TICKET_FROM_EMAIL"),
    support_ticket_reply_email: System.get_env("SUPPORT_TICKET_REPLY_EMAIL")

  config :dotcom, :react,
    build_path: System.get_env("REACT_BUILD_PATH", "/root/rel/dotcom/app.js")
end

config :dotcom, LocationService,
  google_api_key: System.get_env("GOOGLE_API_KEY"),
  google_client_id: System.get_env("GOOGLE_MAPS_CLIENT_ID") || "",
  google_signing_key: System.get_env("GOOGLE_MAPS_SIGNING_KEY") || "",
  geocode: System.get_env("LOCATION_SERVICE") || "aws",
  reverse_geocode: System.get_env("LOCATION_SERVICE") || "aws",
  autocomplete: System.get_env("LOCATION_SERVICE") || "aws",
  aws_index_prefix: System.get_env("AWS_PLACE_INDEX_PREFIX", "dotcom-prod")

config :dotcom, DotcomWeb.ViewHelpers,
  google_tag_manager_id: System.get_env("GOOGLE_TAG_MANAGER_ID")

config :dotcom,
  enable_experimental_features: System.get_env("ENABLE_EXPERIMENTAL_FEATURES")

config :recaptcha,
  public_key: System.get_env("RECAPTCHA_PUBLIC_KEY"),
  secret: System.get_env("RECAPTCHA_PRIVATE_KEY")

config :sentry,
  dsn: System.get_env("SENTRY_DSN"),
  environment_name: System.get_env("SENTRY_ENVIRONMENT")

if System.get_env("LOGGER_LEVEL") in ~w(emergency alert critical error warning notice info debug all none) &&
     config_env() != :test do
  config :logger, level: String.to_atom(System.get_env("LOGGER_LEVEL"))
  config :logger, :console, level: String.to_atom(System.get_env("LOGGER_LEVEL"))
end
