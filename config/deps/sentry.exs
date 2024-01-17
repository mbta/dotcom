import Config

# Centralize Error reporting
# Expanded upon in runtime.exs
config :sentry,
  enable_source_code_context: false,
  root_source_code_path: File.cwd!(),
  json_library: Poison,
  filter: Dotcom.SentryFilter,
  tags: %{"dotcom.application" => "backend"}
