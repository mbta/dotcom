import Config

if config_env() == :test do
  config :dotcom, :trip_planner, OpenTripPlannerClient.Mock
end
