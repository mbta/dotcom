defmodule Test.Support.Factories.TripPlanner.TripPlanner do
  @moduledoc """
  Provides generated test data via ExMachina and Faker.
  """
  use ExMachina

  alias Dotcom.TripPlan.NamedPosition
  alias Dotcom.TripPlan.Parser
  alias OpenTripPlannerClient.Schema.Itinerary
  alias OpenTripPlannerClient.Schema.Leg
  alias OpenTripPlannerClient.Test.Support.Factory

  def itinerary_factory do
    :itinerary
    |> Factory.build()
    |> limit_route_types()
    |> Parser.parse()
  end

  def otp_itinerary_factory do
    :itinerary
    |> Factory.build()
    |> limit_route_types()
  end

  def leg_factory do
    [:walking_leg, :transit_leg]
    |> Faker.Util.pick()
    |> Factory.build()
  end

  def walking_leg_factory do
    :walking_leg
    |> Factory.build()
    |> Parser.parse()
  end

  def transit_leg_factory do
    :transit_leg
    |> Factory.build()
    |> limit_route_types()
    |> Parser.parse()
  end

  def subway_leg_factory do
    :transit_leg
    |> Factory.build(%{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route:
        Factory.build(:route, %{
          type: 1
        })
    })
    |> Parser.parse()
  end

  def bus_leg_factory do
    :transit_leg
    |> Factory.build(%{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route:
        Factory.build(:route, %{
          type: 3
        })
    })
    |> Parser.parse()
  end

  def express_bus_leg_factory do
    :transit_leg
    |> Factory.build(%{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route:
        Factory.build(:route, %{
          gtfs_id: "mbta-ma-us:" <> Faker.Util.pick(Fares.express()),
          type: 3
        })
    })
    |> Parser.parse()
  end

  def sl_rapid_leg_factory do
    :transit_leg
    |> Factory.build(%{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route:
        Factory.build(:route, %{
          gtfs_id: "mbta-ma-us:" <> Faker.Util.pick(Fares.silver_line_rapid_transit()),
          type: 3
        })
    })
    |> Parser.parse()
  end

  def sl_bus_leg_factory do
    :transit_leg
    |> Factory.build(%{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route:
        Factory.build(:route, %{
          gtfs_id: "mbta-ma-us:" <> Faker.Util.pick(["751", "749"]),
          type: 3
        })
    })
    |> Parser.parse()
  end

  def cr_leg_factory do
    :transit_leg
    |> Factory.build(%{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route:
        Factory.build(:route, %{
          type: 2
        })
    })
    |> Parser.parse()
  end

  def ferry_leg_factory do
    :transit_leg
    |> Factory.build(%{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route:
        Factory.build(:route, %{
          type: 4
        })
    })
    |> Parser.parse()
  end

  def shuttle_leg_factory do
    :transit_leg
    |> Factory.build(%{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route:
        Factory.build(:route, %{
          type: 3,
          desc: "Rail Replacement Bus"
        })
    })
    |> Parser.parse()
  end

  def personal_detail_factory do
    :walking_leg
    |> Factory.build()
    |> Parser.parse()
    |> Map.get(:mode)
  end

  def step_factory do
    Factory.build(:step)
  end

  def transit_detail_factory do
    :transit_leg
    |> Factory.build()
    |> limit_route_types()
    |> Parser.parse()
    |> Map.get(:mode)
  end

  # OpenTripPlannerClient supports a greater number of route_type values than
  # Dotcom does! Tweak that here.
  def limit_route_types(%Itinerary{legs: legs} = itinerary) do
    %Itinerary{
      itinerary
      | legs: Enum.map(legs, &limit_route_types/1)
    }
  end

  def limit_route_types(%Leg{route: route} = leg) when route.type > 4 do
    %Leg{
      leg
      | route: %OpenTripPlannerClient.Schema.Route{route | type: Faker.Util.pick([0, 1, 2, 3, 4])}
    }
  end

  def limit_route_types(leg), do: leg

  def stop_named_position_factory do
    %NamedPosition{
      name: Faker.Address.street_name(),
      stop: Test.Support.Factories.Stops.Stop.build(:stop),
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
