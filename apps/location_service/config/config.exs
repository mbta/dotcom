use Mix.Config

config :location_service, :http_pool, :google_http_pool

config :location_service,
  google_api_key: System.get_env("GOOGLE_API_KEY"),
  google_client_id: System.get_env("GOOGLE_MAPS_CLIENT_ID") || "",
  google_signing_key: System.get_env("GOOGLE_MAPS_SIGNING_KEY") || "",
  geocode: {:system, "LOCATION_SERVICE", :aws},
  reverse_geocode: {:system, "LOCATION_SERVICE", :aws},
  autocomplete: {:system, "LOCATION_SERVICE", :aws},
  aws_index_prefix: {:system, "AWS_PLACE_INDEX_PREFIX", "dotcom-dev"}

import_config "#{Mix.env()}.exs"
