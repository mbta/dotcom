import Config

# ## Using releases
#
# If you use `mix release`, you need to explicitly enable the server
# by passing the PHX_SERVER=true when you start it:
#
#     PHX_SERVER=true bin/site start
#
# Alternatively, you can use `mix phx.gen.release` to generate a `bin/server`
# script that automatically sets the env var above.
if System.get_env("PHX_SERVER") do
  config :site, SiteWeb.Endpoint, server: true
end

redis_host_env = System.get_env("REDIS_HOST", "127.0.0.1")

redis_host =
  if redis_host_env == "",
    do: "127.0.0.1",
    else: redis_host_env

if config_env() == :prod do
  config :site, CMS.Cache,
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
  config :site, CMS.Cache,
    conn_opts: [
      host: redis_host,
      port: 6379
    ],
    stats: false,
    telemetry: false
end

if config_env() == :test do
  config :site, SiteWeb.Router,
    cms_basic_auth: [
      username: "username",
      password: "password"
    ]
else
  config :site, SiteWeb.Router,
    cms_basic_auth: [
      username: System.fetch_env!("CMS_BASIC_AUTH_USERNAME"),
      password: System.fetch_env!("CMS_BASIC_AUTH_PASSWORD")
    ]
end

if config_env() == :prod do
  config :site, alerts_bus_stop_change_bucket: System.get_env("S3_PREFIX_BUSCHANGE")

  config :site, SiteWeb.Endpoint,
    url: [host: System.get_env("HOST"), port: System.get_env("PORT")]

  config :site, :react, build_path: System.get_env("REACT_BUILD_PATH") || "/root/rel/site/app.js"
end

if System.get_env("LOGGER_LEVEL") in ~w(emergency alert critical error warning notice info debug all none) do
  config :logger, level: String.to_atom(System.get_env("LOGGER_LEVEL"))
  config :logger, :console, level: String.to_atom(System.get_env("LOGGER_LEVEL"))
end
