import Config

config :dotcom, :algolia_repos,
  stops: Stops.Api,
  routes: Routes.Repo

config :dotcom, :algolia_indexes, [
  Algolia.Stops,
  Algolia.Routes
]

config :dotcom, :algolia_index_suffix, "_test"

config :dotcom, :algolia_http_pool, :algolia_http_pool

if config_env() == :prod do
  config :dotcom, :algolia_click_analytics_url, "https://insights.algolia.io"
  config :dotcom, :algolia_track_clicks?, true
  config :dotcom, :algolia_track_analytics?, true
  config :dotcom, :algolia_index_suffix, ""
end

if config_env() == :test do
  config :dotcom, :algolia_config,
    app_id: "ALGOLIA_APP_ID",
    search: "ALGOLIA_SEARCH_KEY",
    write: "ALGOLIA_WRITE_KEY"

  config :dotcom, :algolia_repos,
    stops: Algolia.MockStopsRepo,
    routes: Algolia.MockRoutesRepo

  config :dotcom, :algolia_indexes, [
    Algolia.MockObjects
  ]

  config :dotcom, :algolia_click_analytics_url, :not_set
end
