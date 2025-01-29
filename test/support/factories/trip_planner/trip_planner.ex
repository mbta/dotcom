defmodule Test.Support.Factories.TripPlanner.TripPlanner do
  @moduledoc """
  Provides generated test data via ExMachina and Faker.
  """

  use ExMachina

  alias Dotcom.TripPlan.{NamedPosition, Parser}
  alias OpenTripPlannerClient.Test.Support.Factory

  # FACTORIES

  def bus_leg_factory do
    build(:otp_bus_leg)
    |> Parser.parse()
  end

  def cr_leg_factory do
    Factory.build(:transit_leg, %{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route:
        Factory.build(:route, %{
          type: 2
        })
    })
    |> Parser.parse()
  end

  def express_bus_leg_factory do
    Factory.build(:transit_leg, %{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route:
        Factory.build(:route, %{
          gtfs_id: "mbta-ma-us:" <> Faker.Util.pick(Fares.express()),
          type: 3
        })
    })
    |> Parser.parse()
  end

  def ferry_leg_factory do
    build(:otp_ferry_leg)
    |> Parser.parse()
  end

  def itinerary_factory do
    Factory.build(:itinerary)
    |> limit_route_types()
    |> Parser.parse()
  end

  def leg_factory do
    [:walking_leg, :transit_leg]
    |> Faker.Util.pick()
    |> Factory.build()
  end

  def named_position_factory do
    %NamedPosition{
      name: Faker.Address.city(),
      stop: nil,
      latitude: Faker.Address.latitude(),
      longitude: Faker.Address.longitude()
    }
  end

  def otp_bus_leg_factory do
    Factory.build(:transit_leg, %{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route: Factory.build(:route, %{type: 3})
    })
  end

  def otp_ferry_leg_factory do
    Factory.build(:transit_leg, %{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route: Factory.build(:route, %{type: 4})
    })
  end

  def otp_subway_leg_factory do
    Factory.build(:transit_leg, %{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route: Factory.build(:route, %{type: 1})
    })
  end

  def otp_itinerary_factory do
    Factory.build(:itinerary)
    |> limit_route_types()
  end

  def personal_detail_factory do
    Factory.build(:walking_leg)
    |> Parser.parse()
    |> Map.get(:mode)
  end

  def shuttle_leg_factory do
    Factory.build(:transit_leg, %{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route:
        Factory.build(:route, %{
          type: 3,
          desc: "Rail Replacement Bus"
        })
    })
    |> Parser.parse()
  end

  def sl_bus_leg_factory do
    Factory.build(:transit_leg, %{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route:
        Factory.build(:route, %{
          gtfs_id: "mbta-ma-us:" <> Faker.Util.pick(["751", "749"]),
          type: 3
        })
    })
    |> Parser.parse()
  end

  def sl_rapid_leg_factory do
    Factory.build(:transit_leg, %{
      agency: Factory.build(:agency, %{name: "MBTA"}),
      route:
        Factory.build(:route, %{
          gtfs_id: "mbta-ma-us:" <> Faker.Util.pick(Fares.silver_line_rapid_transit()),
          type: 3
        })
    })
    |> Parser.parse()
  end

  def step_factory do
    Factory.build(:step)
  end

  def stop_named_position_factory do
    %NamedPosition{
      name: Faker.Address.street_name(),
      stop: Test.Support.Factories.Stops.Stop.build(:stop),
      latitude: Faker.Address.latitude(),
      longitude: Faker.Address.longitude()
    }
  end

  def subway_leg_factory do
    build(:otp_subway_leg)
    |> Parser.parse()
  end

  def transit_detail_factory do
    Factory.build(:transit_leg)
    |> limit_route_types()
    |> Parser.parse()
    |> Map.get(:mode)
  end

  def transit_leg_factory do
    Factory.build(:transit_leg)
    |> limit_route_types()
    |> Parser.parse()
  end

  def walking_leg_factory do
    Factory.build(:walking_leg)
    |> Parser.parse()
  end

  # NON-FACTORY FUNCTIONS

  @doc """
  Returns a list of itineraries that can be grouped.

  You can pass in the number of groups you want and the number of itineraries in each group.
  """
  def groupable_otp_itineraries(group_count \\ 2, itinerary_count \\ 1) do
    Enum.map(1..group_count, fn _ ->
      otp_itineraries(itinerary_count)
    end)
    |> List.flatten()
    |> Enum.shuffle()
  end

  # PRIVATE FUNCTIONS

  # OpenTripPlannerClient supports a greater number of route_type values than
  # Dotcom does! Tweak that here.
  defp limit_route_types(%OpenTripPlannerClient.Schema.Itinerary{legs: legs} = itinerary) do
    %OpenTripPlannerClient.Schema.Itinerary{
      itinerary
      | legs: Enum.map(legs, &limit_route_types/1)
    }
  end

  defp limit_route_types(%OpenTripPlannerClient.Schema.Leg{route: route} = leg)
       when route.type > 4 do
    %OpenTripPlannerClient.Schema.Leg{
      leg
      | route: %OpenTripPlannerClient.Schema.Route{route | type: Faker.Util.pick([0, 1, 2, 3, 4])}
    }
  end

  defp limit_route_types(leg), do: leg

  # Create a number of otp itineraries with the same two random legs.
  defp otp_itineraries(itinerary_count) do
    [a, b, c] =
      Enum.map(1..3, fn _ ->
        Factory.build(:place, stop: Factory.build(:stop, gtfs_id: nil))
      end)

    leg_types = [:otp_bus_leg, :otp_ferry_leg, :otp_subway_leg]

    a_b_leg = build(Faker.Util.pick(leg_types), from: a, to: b)
    b_c_leg = build(Faker.Util.pick(leg_types), from: b, to: c)

    build_list(itinerary_count, :otp_itinerary, legs: [a_b_leg, b_c_leg])
  end
end
