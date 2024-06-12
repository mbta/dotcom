defmodule Test.Support.Factory.Route do
  @moduledoc """
  Generated fake data for %Route{}
  """
  use ExMachina

  alias Routes.Route

  def route_factory(attrs) do
    type = attrs[:type] || Faker.Util.pick([0, 1, 2, 3, 4])
    fare_class = fare_class(attrs, type)

    route = %Route{
      id: Faker.Internet.slug(),
      type: type,
      name: Faker.App.name(),
      long_name: Faker.App.name(),
      color: Faker.Color.rgb_hex(),
      direction_names: %{0 => "Outbound", 1 => "Inbound"},
      direction_destinations: %{0 => Faker.Internet.slug(), 1 => Faker.Internet.slug()},
      fare_class: fare_class,
      line_id: Faker.Internet.slug()
    }

    merge_attributes(route, attrs)
  end

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
end
