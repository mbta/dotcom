import Config

config :algolia, :keys,
  app_id: "${ALGOLIA_APP_ID}",
  search: "${ALGOLIA_SEARCH_KEY}",
  write: "${ALGOLIA_WRITE_KEY}"

config :algolia, :click_analytics_url, "https://insights.algolia.io"
config :algolia, :track_clicks?, true
config :algolia, :track_analytics?, true
config :algolia, :index_suffix, ""
