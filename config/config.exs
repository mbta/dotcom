# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
import Config

# Enable colorization in terminal
# https://github.com/rrrene/bunt/issues/4#issuecomment-301350784
config :elixir, ansi_enabled: true

# Used by several applications to turn off a subset of child processes in the
# test environment.
config :elixir, start_data_processes: config_env() != :test

# By default, the umbrella project as well as each child
# application will require this configuration file, ensuring
# they all use the same configuration. While one could
# configure all applications here, we prefer to delegate
# back to each application for organization purposes.
for config <- "../apps/*/config/config.exs" |> Path.expand(__DIR__) |> Path.wildcard() do
  import_config config
end

# Sample configuration (overrides the imported configuration above):
#
#     config :logger, :console,
#       level: :info,
#       format: "$date $time [$level] $metadata$message\n",
#       metadata: [:user_id]
