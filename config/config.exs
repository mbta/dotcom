import Config

config :elixir, ansi_enabled: true

for config_file <- Path.wildcard("config/{deps,site}/*.exs") do
  import_config("../#{config_file}")
end
