import Config

for config_file <- Path.wildcard("config/{deps,site}/*.exs") do
  import_config("../#{config_file}")
end
