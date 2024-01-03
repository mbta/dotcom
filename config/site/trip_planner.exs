import Config

config :site, TripPlanApi, module: TripPlan.Api.OpenTripPlanner

config :site, TripPlanGeocode, module: TripPlan.Geocode.GoogleGeocode

if config_env() == :test do
  config :site, TripPlanApi, module: TripPlan.Api.MockPlanner

  config :site, TripPlanGeocode, module: TripPlan.Geocode.MockGeocode
end
