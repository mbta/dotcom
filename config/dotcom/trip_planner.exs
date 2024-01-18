import Config

config :dotcom, TripPlanApi, module: TripPlan.Api.OpenTripPlanner

config :dotcom, TripPlanGeocode, module: TripPlan.Geocode

if config_env() == :test do
  config :dotcom, TripPlanApi, module: TripPlan.Api.MockPlanner

  config :dotcom, TripPlanGeocode, module: TripPlan.Geocode.MockGeocode
end
