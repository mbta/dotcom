# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
# TODO: add aws keys and host(https://places.geo.us-east-1.amazonaws.com)
use Mix.Config

config :location_service, :http_pool, :google_http_pool

if Mix.env() == :prod do
  config :location_service,
    geocode: if("${LOCATION_SERVICE}" == "AWS", do: :aws, else: :google),
    reverse_geocode: if("${LOCATION_SERVICE}" == "AWS", do: :aws, else: :google)

  # place: :google,
  # maps: :google

  config :location_service,
    google_api_key: "${GOOGLE_API_KEY}",
    google_client_id: "${GOOGLE_MAPS_CLIENT_ID}",
    google_signing_key: "${GOOGLE_MAPS_SIGNING_KEY}"
else
  config :location_service,
    geocode: if(System.get_env("LOCATION_SERVICE") == "GOOGLE", do: :google, else: :aws),
    reverse_geocode: if(System.get_env("LOCATION_SERVICE") == "GOOGLE", do: :google, else: :aws)

  # place: :google,
  # maps: :google

  config :location_service,
    google_api_key: System.get_env("GOOGLE_API_KEY"),
    google_client_id: System.get_env("GOOGLE_MAPS_CLIENT_ID") || "",
    google_signing_key: System.get_env("GOOGLE_MAPS_SIGNING_KEY") || ""
end
