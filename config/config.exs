import Config

config :elixir, ansi_enabled: true

for config_file <- Path.wildcard("config/{deps,dotcom}/*.exs") do
  import_config("../#{config_file}")
end

import_config "#{config_env()}.exs"
