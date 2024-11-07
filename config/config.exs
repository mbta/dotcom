import Config

config :elixir, ansi_enabled: true

config :dotcom, :aws_client, AwsClient.Behaviour

config :dotcom, :cms_api_module, CMS.Api

config :dotcom, :httpoison, HTTPoison

config :dotcom, :mbta_api_module, MBTA.Api

config :dotcom, :location_service, LocationService

config :dotcom, :repo_modules,
  predictions: Predictions.Repo,
  route_patterns: RoutePatterns.Repo,
  routes: Routes.Repo,
  stops: Stops.Repo

config :dotcom, :predictions_phoenix_pub_sub, Predictions.Phoenix.PubSub
config :dotcom, :predictions_pub_sub, Predictions.PubSub
config :dotcom, :predictions_store, Predictions.Store

config :dotcom, :redis, Dotcom.Cache.Multilevel.Redis
config :dotcom, :redix, Redix
config :dotcom, :redix_pub_sub, Redix.PubSub

config :dotcom, :otp_module, OpenTripPlannerClient
config :dotcom, :req_module, Req

config :sentry,
  enable_source_code_context: true,
  root_source_code_paths: [File.cwd!()],
  context_lines: 5

config :dart_sass,
  version: "1.77.8",
  theme: [
    args: ~w(css/_autocomplete-theme.scss ../priv/static/assets/autocomplete.css --style=compressed --load-path=node_modules/@algolia/autocomplete-theme-classic/dist/theme.css --load-path=node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss),
    cd: Path.expand("../assets", __DIR__)
  ]

config :esbuild,
  version: "0.17.11",
  default: [
    args: ~w(js/storybook.js --bundle --target=es2017 --outdir=../priv/static/assets),
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
  ]

config :tailwind,
  version: "3.4.6",
  storybook: [
    args: ~w(
      --config=tailwind.config.js
      --input=css/storybook.css
      --output=../priv/static/assets/storybook.css
    ),
    cd: Path.expand("../assets", __DIR__)
  ]

for config_file <- Path.wildcard("config/{deps,dotcom}/*.exs") do
  import_config("../#{config_file}")
end

config :mbta_metro, :map, %{
  center: [-71.0589, 42.3601],
  style: %{
    "version" => 8,
    "sources" => %{
      "raster-tiles" => %{
        "type" => "raster",
        "tiles" => ["https://mbta-map-tiles-dev.s3.amazonaws.com/osm_tiles/{z}/{x}/{y}.png"],
        "tileSize" => 256,
        "attribution" =>
          "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
      }
    },
    "layers" => [
      %{
        "id" => "mbta-tiles",
        "type" => "raster",
        "source" => "raster-tiles",
        "minzoom" => 9,
        "maxzoom" => 18
      }
    ]
  },
  zoom: 14
}

import_config "#{config_env()}.exs"
