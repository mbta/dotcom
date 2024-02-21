import Config

config :dotcom, TripPlanApi, module: TripPlan.Api.OpenTripPlanner

config :dotcom, TripPlanGeocode, module: TripPlan.Geocode

config :dotcom,
       :open_trip_planner,
       implementation: TripPlan.Api.OpenTripPlanner

if config_env() == :test do
  config :dotcom,
         :open_trip_planner,
         implementation: TripPlan.Api.OpenTripPlanner.Mock

  config :dotcom, TripPlanGeocode, module: TripPlan.Geocode.MockGeocode
end
