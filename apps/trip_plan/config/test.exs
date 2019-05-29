use Mix.Config

config :trip_plan, Api, module: TripPlan.Api.MockPlanner

config :trip_plan, Geocode, module: TripPlan.Geocode.MockGeocode
