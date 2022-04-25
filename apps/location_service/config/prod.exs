use Mix.Config

config :location_service,
  google_api_key: "${GOOGLE_API_KEY}",
  google_client_id: "${GOOGLE_MAPS_CLIENT_ID}",
  google_signing_key: "${GOOGLE_MAPS_SIGNING_KEY}",
  geocode: {:system, "LOCATION_SERVICE", :google},
  reverse_geocode: {:system, "LOCATION_SERVICE", :google},
  autocomplete: {:system, "LOCATION_SERVICE", :google},
  aws_index_prefix: {:system, "AWS_PLACE_INDEX_PREFIX", "dotcom-prod"}
