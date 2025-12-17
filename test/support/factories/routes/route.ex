defmodule Test.Support.Factories.Routes.Route do
  @moduledoc """
  Generated fake data for %Routes.Route{}
  """

  use ExMachina

  import Dotcom.TripPlan.Helpers, only: [logan_express_icon_names: 0, massport_icon_names: 0]

  alias Routes.Route
  alias Test.Support.FactoryHelpers

  def bus_route_factory(attrs) do
    %{
      description:
        Faker.Util.pick([
          :local_bus,
          :frequent_bus_route,
          :supplemental_bus,
          :commuter_bus,
          :community_bus
        ]),
      external_agency_name: nil,
      type: 3
    }
    |> Map.merge(attrs)
    |> route_factory()
  end

  def logan_express_route_factory(attrs) do
    %{
      description: nil,
      external_agency_name: "Logan Express",
      name: Faker.Util.pick(logan_express_icon_names()),
      type: 3
    }
    |> Map.merge(attrs)
    |> route_factory()
  end

  def massport_route_factory(attrs) do
    %{
      description: nil,
      external_agency_name: "Massport",
      name: Faker.Util.pick(massport_icon_names()),
      type: 3
    }
    |> Map.merge(attrs)
    |> route_factory()
  end

  def route_factory(attrs) do
    type = attrs[:type] || Faker.Util.pick([0, 1, 2, 3, 4])
    fare_class = fare_class(attrs, type)

    route = %Route{
      id: FactoryHelpers.build(:id),
      type: type,
      name: Faker.App.name(),
      long_name: Faker.Company.catch_phrase(),
      color: Faker.Color.rgb_hex(),
      direction_destinations: %{
        0 => Faker.Address.street_address(),
        1 => Faker.Address.street_address()
      },
      description:
        [
          :airport_shuttle,
          :commuter_rail,
          :rapid_transit,
          :local_bus,
          :ferry,
          :rail_replacement_bus,
          :frequent_bus_route,
          :supplemental_bus,
          :commuter_bus,
          :community_bus,
          :unknown
        ]
        |> Faker.Util.pick(),
      fare_class: fare_class,
      line_id: FactoryHelpers.build(:id)
    }

    merge_attributes(route, attrs)
  end

  def subway_route_factory(attrs),
    do: build(:route, attrs |> Map.put(:type, Faker.Util.pick([0, 1])))

  defp fare_class(%{fare_class: fare_class}, _), do: fare_class
  defp fare_class(%{description: :rail_replacement_bus}, _), do: :free_fare

  defp fare_class(%{id: id}, type) do
    cond do
      id in Fares.silver_line_rapid_transit() ->
        :rapid_transit_fare

      id in Fares.express() ->
        :express_bus_fare

      true ->
        fare_class(%{}, type)
    end
  end

  defp fare_class(_, 0), do: :rapid_transit_fare
  defp fare_class(_, 1), do: :rapid_transit_fare
  defp fare_class(_, 2), do: :commuter_rail_fare
  defp fare_class(_, 3), do: :local_bus_fare
  defp fare_class(_, 4), do: :ferry_fare

  defp fare_class(_, _) do
    [
      :local_bus_fare,
      :express_bus_fare,
      :rapid_transit_fare,
      :commuter_rail_fare,
      :ferry_fare,
      :free_fare,
      :special_fare,
      :unknown_fare
    ]
    |> Faker.Util.pick()
  end
end
