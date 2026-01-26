import Config

config :phoenix, :gzippable_exts, ~w(.txt .html .js .css .svg)
config :phoenix, :json_library, Poison

if config_env() == :prod do
  config :dotcom,
    dev_server?: false

  # ## Using releases
  #
  # If you are doing OTP releases, you need to instruct Phoenix
  # to start the server for all endpoints:
  #
  config :phoenix, :serve_endpoints, true
  #
  # Alternatively, you can configure exactly which server to
  # start per endpoint:
  #
  #     config :dotcom, DotcomWeb.Endpoint, server: true
  #
  # You will also need to set the application root to `.` in order
  # for the new static assets to be served after a hot upgrade:
  #
else
  # Set a higher stacktrace during development.
  # Do not configure such in production as keeping
  # and calculating stacktraces is usually expensive.
  config :phoenix, :stacktrace_depth, 20
end
