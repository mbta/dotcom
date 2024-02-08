import Config

config :dotcom, TripPlanGeocode, module: TripPlan.Geocode

if config_env() == :test do
  config :dotcom, :trip_planner, OpenTripPlannerClient.Mock

  config :dotcom, TripPlanGeocode, module: TripPlan.Geocode.MockGeocode
end
