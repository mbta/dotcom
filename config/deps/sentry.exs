import Config

# Centralize Error reporting
config :sentry,
  enable_source_code_context: false,
  root_source_code_path: File.cwd!(),
  included_environments: ~w(prod dev dev-green dev-blue),
  json_library: Poison,
  filter: Dotcom.SentryFilter,
  tags: %{"dotcom.application" => "backend"}
