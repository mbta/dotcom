# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

config :google_maps, :http_pool, :google_http_pool

if Mix.env() == :prod do
  config :google_maps,
    google_api_key: "${GOOGLE_API_KEY}",
    google_client_id: "${GOOGLE_MAPS_CLIENT_ID}",
    google_signing_key: "${GOOGLE_MAPS_SIGNING_KEY}",
    aws_api_key: "${AWS_API_KEY}",
    aws_client_id: "${AWS_CLIENT_ID}",
    aws_signing_key: "${AWS_SIGNING_KEY}"
else
  config :google_maps,
    google_api_key: System.get_env("GOOGLE_API_KEY"),
    google_client_id: System.get_env("GOOGLE_MAPS_CLIENT_ID") || "",
    google_signing_key: System.get_env("GOOGLE_MAPS_SIGNING_KEY") || "",
    aws_api_key: "${AWS_API_KEY}" || "",
    aws_client_id: "${AWS_CLIENT_ID}" || "",
    aws_signing_key: "${AWS_SIGNING_KEY}" || ""
end
