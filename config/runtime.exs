import Config

redis_host_env = System.get_env("REDIS_HOST", "127.0.0.1")

redis_host =
  if redis_host_env == "",
    do: "127.0.0.1",
    else: redis_host_env

if config_env() == :prod do
  config :cms, CMS.Cache,
    mode: :redis_cluster,
    redis_cluster: [
      configuration_endpoints: [
        conn_opts: [
          host: redis_host,
          port: 6379,
          timeout: 15_000
        ]
      ]
    ],
    stats: true,
    telemetry: true
else
  config :cms, CMS.Cache,
    conn_opts: [
      host: redis_host,
      port: 6379
    ],
    stats: true,
    telemetry: true
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
  config :alerts, bus_stop_change_bucket: System.get_env("S3_PREFIX_BUSCHANGE")
end
