# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

# This configuration is loaded before any dependency and is restricted
# to this project. If another project depends on this project, this
# file won't be loaded nor affect the parent project. For this reason,
# if you want to provide default values for your application for
# 3rd-party users, it should be done in your "mix.exs" file.

# You can configure for your application as:
#
#     config :cms, key: :value
#
# And access this configuration in your application as:
#
#     Application.get_env(:cms, :key)
#
# Or configure a 3rd-party app:
#
#     config :logger, level: :info
#

# It is also possible to import configuration files, relative to this
# directory. For example, you can emulate configuration per environment
# by uncommenting the line below and defining dev.exs, test.exs and such.
# Configuration from the imported file will override the ones defined
# here (which is why it is important to import them last).
#

config :cms,
  http_pool: :content_http_pool,
  drupal: [
    root: {:system, "DRUPAL_ROOT"},
    static_path: "/sites/default/files"
  ]

config :cms, :cms_api, CMS.API.HTTPClient

config :cms, CMS.Repo,
  conn_opts: [
    host: "127.0.0.1",
    port: 6379
  ]

import_config "#{Mix.env()}.exs"
