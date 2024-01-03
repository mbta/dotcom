import Config

for config_file <- Path.wildcard("config/{deps,site}/*.exs") do
  IO.puts("importing config: #{config_file}")
  import_config("../#{config_file}")
end
