import Config

config :site, :algolia_repos,
  stops: Stops.Api,
  routes: Routes.Repo

config :site, :algolia_indexes, [
  Algolia.Stops,
  Algolia.Routes
]

config :site, :algolia_track_clicks?, false

config :site, :algolia_index_suffix, "_test"

config :site, :algolia_http_pool, :algolia_http_pool

if config_env() == :prod do
  config :site, :algolia_click_analytics_url, "https://insights.algolia.io"
  config :site, :algolia_track_clicks?, true
  config :site, :algolia_track_analytics?, true
  config :site, :algolia_index_suffix, ""
end

if config_env() == :test do
  config :site, :algolia_config,
    app_id: "ALGOLIA_APP_ID",
    search: "ALGOLIA_SEARCH_KEY",
    write: "ALGOLIA_WRITE_KEY"

  config :site, :algolia_repos,
    stops: Algolia.MockStopsRepo,
    routes: Algolia.MockRoutesRepo

  config :site, :algolia_indexes, [
    Algolia.MockObjects
  ]

  config :site, :algolia_click_analytics_url, :not_set
end
