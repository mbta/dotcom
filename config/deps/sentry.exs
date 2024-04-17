import Config

# Centralize Error reporting
config :sentry,
  enable_source_code_context: true,
  filter: Dotcom.SentryFilter,
  included_environments: ~w(prod dev dev-green dev-blue),
  json_library: Poison,
  root_source_code_path: File.cwd!()
