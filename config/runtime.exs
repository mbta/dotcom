import Config

config :cms, CMS.Cache,
  conn_opts: [
    host: System.get_env("REDIS_HOST", "127.0.0.1"),
    port: 6379
  ],
  stats: false,
  telemetry: false

config :site, SiteWeb.Router,
  cms_basic_auth: [
    username: System.get_env("CMS_BASIC_AUTH_USERNAME", "username"),
    password: System.get_env("CMS_BASIC_AUTH_PASSWORD", "password")
  ]
