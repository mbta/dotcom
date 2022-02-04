# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

config :location_service, :http_pool, :google_http_pool

if Mix.env() == :prod do
  config :location_service,
    google_api_key: "${GOOGLE_API_KEY}",
    google_client_id: "${GOOGLE_MAPS_CLIENT_ID}",
    google_signing_key: "${GOOGLE_MAPS_SIGNING_KEY}"
else
  config :location_service,
    google_api_key: System.get_env("GOOGLE_API_KEY"),
    google_client_id: System.get_env("GOOGLE_MAPS_CLIENT_ID") || "",
    google_signing_key: System.get_env("GOOGLE_MAPS_SIGNING_KEY") || ""
end
