import Config

# ## Using releases
#
# If you use `mix release`, you need to explicitly enable the server
# by passing the PHX_SERVER=true when you start it:
#
#     PHX_SERVER=true bin/site start
#
# Alternatively, you can use `mix phx.gen.release` to generate a `bin/server`
# script that automatically sets the env var above.
if System.get_env("PHX_SERVER") do
  config :site, SiteWeb.Endpoint, server: true
end

if config_env() == :prod do
  config :alerts, bus_stop_change_bucket: System.get_env("S3_PREFIX_BUSCHANGE")

  config :site, SiteWeb.Endpoint,
    url: [host: System.get_env("HOST"), port: System.get_env("PORT")]

  config :site, :react, build_path: System.get_env("REACT_BUILD_PATH") || "/root/rel/site/app.js"
end

if System.get_env("LOGGER_LEVEL") in ~w(emergency alert critical error warning notice info debug all none) do
  config :logger, level: String.to_atom(System.get_env("LOGGER_LEVEL"))
  config :logger, :console, level: String.to_atom(System.get_env("LOGGER_LEVEL"))
end
