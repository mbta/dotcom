defmodule Test.Support.Factory.TripPlanner do
  @moduledoc """
  Provides generated test data via ExMachina and Faker.
  """
  use ExMachina

  alias Dotcom.TripPlanner.Parser
  alias OpenTripPlannerClient.Test.Factory
  alias TripPlan.NamedPosition

  def itinerary_factory do
    legs = Factory.build_list(3, :transit_leg) |> Enum.map(&limit_route_types/1)

    Factory.build(:itinerary, legs: legs)
    |> Parser.parse()
  end

  def leg_factory do
    Factory.build(:leg)
    |> limit_route_types()
    |> Parser.parse()
  end

  def walking_leg_factory do
    Factory.build(:walking_leg)
    |> Parser.parse()
  end

  def transit_leg_factory do
    Factory.build(:transit_leg)
    |> limit_route_types()
    |> Parser.parse()
  end

  def personal_detail_factory do
    Factory.build(:walking_leg)
    |> Parser.parse()
    |> Map.get(:mode)
  end

  def step_factory do
    Factory.build(:step)
    |> Parser.step()
  end

  def transit_detail_factory do
    Factory.build(:transit_leg)
    |> limit_route_types()
    |> Parser.parse()
    |> Map.get(:mode)
  end

  # OpenTripPlannerClient supports a greater number of route_type values than
  # Dotcom does! Tweak that here.
  defp limit_route_types(%OpenTripPlannerClient.Schema.Leg{route: route} = leg)
       when route.type > 4 do
    %OpenTripPlannerClient.Schema.Leg{
      leg
      | route: %OpenTripPlannerClient.Schema.Route{route | type: Faker.Util.pick([0, 1, 2, 3, 4])}
    }
  end

  defp limit_route_types(leg), do: leg

  def stop_named_position_factory do
    %NamedPosition{
      name: Faker.Address.street_name(),
      stop: Test.Support.Factory.Stop.build(:stop),
      latitude: Faker.Address.latitude(),
      longitude: Faker.Address.longitude()
    }
  end

  def named_position_factory do
    %NamedPosition{
      name: Faker.Address.city(),
      stop: nil,
      latitude: Faker.Address.latitude(),
      longitude: Faker.Address.longitude()
    }
  end
end
