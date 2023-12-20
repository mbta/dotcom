import Config

config :cms, CMS.Cache,
  conn_opts: [
    host: "dotcom-dev-blue-elasticache-cluster.yeunjj.0001.use1.cache.amazonaws.com",
    port: 6379
  ],
  stats: false,
  telemetry: false

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
