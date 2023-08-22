# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

# This configuration is loaded before any dependency and is restricted
# to this project. If another project depends on this project, this
# file won't be loaded nor affect the parent project. For this reason,
# if you want to provide default values for your application for
# 3rd-party users, it should be done in your "mix.exs" file.

# You can configure for your application as:
#
#     config :trip_plan, key: :value
#
# And access this configuration in your application as:
#
#     Application.get_env(:trip_plan, :key)
#
# Or configure a 3rd-party app:
#
#     config :logger, level: :info
#

# It is also possible to import configuration files, relative to this
# directory. For example, you can emulate configuration per environment
# by uncommenting the line below and defining dev.exs, test.exs and such.
# Configuration from the imported file will override the ones defined
# here (which is why it is important to import them last).
#

config :trip_plan, Api, module: TripPlan.Api.OpenTripPlanner

config :trip_plan, Geocode, module: TripPlan.Geocode.GoogleGeocode

config :trip_plan, OpenTripPlanner,
  timezone: {:system, "OPEN_TRIP_PLANNER_TIMEZONE", "America/New_York"},
  otp1_url: {:system, "OPEN_TRIP_PLANNER_URL"},
  otp2_url: {:system, "OPEN_TRIP_PLANNER_2_URL"},
  otp2_percentage: {:system, "OPEN_TRIP_PLANNER_2_PERCENTAGE"},
  wiremock_proxy: {:system, "WIREMOCK_PROXY", "false"},
  wiremock_proxy_url: System.get_env("WIREMOCK_TRIP_PLAN_PROXY_URL")

# defines polygon to be used in trip planner to determine max walk distance for a trip
config :trip_plan, ReducedWalkingArea, [
  {42.41092718, -70.9912490},
  {42.42055885, -71.1368179},
  {42.36122457, -71.1951828},
  {42.30386558, -71.1265182},
  {42.29370809, -71.0544204},
  {42.35361356, -70.9891891},
  {42.41092718, -70.9912490}
]

import_config "#{Mix.env()}.exs"
