# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

config :location_service, :http_pool, :google_http_pool

  geocode_source: "GOOGLE" || "AWS",
  places_source: "GOOGLE" || "AWS",
  map_data_source: System.get_env("MAPS_SOURCE", "GOOGLE"),
  maps_source: "GOOGLE" || "AWS",
  host: "https://maps.googleapis.com" || "https://places.geo.us-east-1.amazonaws.com",
  web: "https://maps.googleapis.com" || "https://places.geo.us-east-1.amazonaws.com"


if Mix.env() == :prod do
  config :location_service,
    google_api_key: System.get_env("${GOOGLE_API_KEY}"),
    google_client_id: System.get_env("${GOOGLE_MAPS_CLIENT_ID}"),
    google_signing_key: System.get_env("${GOOGLE_MAPS_SIGNING_KEY}"),
    aws_api_key: System.get_env("${AWS_API_KEY}"),
    aws_client_id: System.get_env("${AWS_CLIENT_ID}"),
    aws_signing_key: System.get_env("${AWS_SIGNING_KEY}")
else
  config :location_service,
    google_api_key: System.get_env("GOOGLE_API_KEY"),
    google_client_id: System.get_env("GOOGLE_MAPS_CLIENT_ID") || "",
    google_signing_key: System.get_env("GOOGLE_MAPS_SIGNING_KEY") || "",
    aws_api_key: System.get_env("${AWS_API_KEY}") || "",
    aws_client_id: System.get_env("${AWS_CLIENT_ID}") || "",
    aws_signing_key: System.get_env("${AWS_SIGNING_KEY}") || ""
end
