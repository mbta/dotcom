defmodule Dotcom.TripPlan.Fares.StateTest do
  use ExUnit.Case, async: true

  import OpenTripPlannerClient.Test.Support.Factory

  alias Dotcom.TripPlan.Fares.State

  doctest Dotcom.TripPlan.Fares.State
end
