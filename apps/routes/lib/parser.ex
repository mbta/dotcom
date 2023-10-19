defmodule Routes.Parser do
  @moduledoc "Functions for parsing generic JSON:API structs into Routes structs."

  alias JsonApi.Item
  alias RoutePatterns.RoutePattern
  alias Routes.{Route, Shape}

  @spec parse_route(Item.t()) :: Route.t()
  def parse_route(%Item{id: id, attributes: attributes, relationships: relationships}) do
    %Route{
      id: id,
      type: attributes["type"],
      name: name(attributes),
      long_name: attributes["long_name"],
      color: attributes["color"],
      sort_order: attributes["sort_order"],
      direction_names:
        direction_attrs(attributes["direction_names"], parse_route_patterns(relationships)),
      direction_destinations:
        direction_attrs(attributes["direction_destinations"], parse_route_patterns(relationships)),
      description: parse_gtfs_desc(attributes["description"]),
      fare_class: parse_gtfs_fare_class(attributes["fare_class"]),
      line_id: parse_line_id(relationships)
    }
  end

  defp parse_line_id(%{"line" => [head | _] = _lines}), do: head.id
  defp parse_line_id(_), do: nil

  def parse_route_with_route_pattern(%Item{relationships: relationships} = item) do
    {parse_route(item), parse_route_patterns(relationships)}
  end

  @spec name(map) :: String.t()
  def name(%{"type" => 3, "short_name" => short_name}) when short_name != "", do: short_name
  def name(%{"short_name" => short_name, "long_name" => ""}), do: short_name
  def name(%{"long_name" => long_name}), do: long_name

  defp parse_route_patterns(%{"route_patterns" => route_patterns}) do
    Enum.map(route_patterns, &RoutePattern.new(&1))
  end

  defp parse_route_patterns(_), do: []

  @spec direction_attrs([String.t()], [Item.t()]) :: %{
          0 => String.t() | nil,
          1 => String.t() | nil
        }
  defp direction_attrs([zero, one], route_patterns) do
    %{
      0 => maybe_direction_attr(0, zero, route_patterns),
      1 => maybe_direction_attr(1, one, route_patterns)
    }
  end

  defp maybe_direction_attr(_, attr, []), do: add_direction_suffix(attr)

  defp maybe_direction_attr(direction_id, attr, route_patterns) do
    valid_directions = route_patterns |> Enum.map(& &1.direction_id) |> Enum.uniq()
    if direction_id in valid_directions, do: add_direction_suffix(attr), else: nil
  end

  @spec add_direction_suffix(String.t()) :: String.t()
  defp add_direction_suffix("North"), do: "Northbound"
  defp add_direction_suffix("South"), do: "Southbound"
  defp add_direction_suffix("East"), do: "Eastbound"
  defp add_direction_suffix("West"), do: "Westbound"
  defp add_direction_suffix(nil), do: ""
  defp add_direction_suffix(name), do: name

  @spec parse_gtfs_desc(String.t()) :: Route.gtfs_route_desc()
  defp parse_gtfs_desc(description)
  defp parse_gtfs_desc("Airport Shuttle"), do: :airport_shuttle
  defp parse_gtfs_desc("Commuter Rail"), do: :commuter_rail
  defp parse_gtfs_desc("Rapid Transit"), do: :rapid_transit
  defp parse_gtfs_desc("Local Bus"), do: :local_bus
  defp parse_gtfs_desc("Ferry"), do: :ferry
  defp parse_gtfs_desc("Rail Replacement Bus"), do: :rail_replacement_bus
  defp parse_gtfs_desc("Key Bus"), do: :key_bus_route
  defp parse_gtfs_desc("Supplemental Bus"), do: :supplemental_bus
  defp parse_gtfs_desc("Commuter Bus"), do: :commuter_bus
  defp parse_gtfs_desc("Community Bus"), do: :community_bus
  defp parse_gtfs_desc(_), do: :unknown

  @spec parse_gtfs_fare_class(String.t()) :: Route.gtfs_fare_class()
  defp parse_gtfs_fare_class(fare_class) when fare_class in ["Inner Express", "Outer Express"],
    do: :express_bus_fare

  defp parse_gtfs_fare_class("Local Bus"), do: :local_bus_fare
  defp parse_gtfs_fare_class("Rapid Transit"), do: :rapid_transit_fare
  defp parse_gtfs_fare_class("Commuter Rail"), do: :commuter_rail_fare
  defp parse_gtfs_fare_class("Ferry"), do: :ferry_fare
  defp parse_gtfs_fare_class("Free"), do: :free_fare
  defp parse_gtfs_fare_class("Special"), do: :special_fare
  defp parse_gtfs_fare_class(_), do: :unknown_fare

  @spec parse_shape(Item.t()) :: [Shape.t()]
  def parse_shape(%Item{id: id, attributes: attributes, relationships: relationships}) do
    [
      %Shape{
        id: id,
        name: attributes["name"],
        stop_ids: stop_ids(relationships),
        direction_id: attributes["direction_id"],
        polyline: attributes["polyline"],
        priority: attributes["priority"]
      }
    ]
  end

  @spec stop_ids(%{String.t() => list(JsonApi.Item.t())}) :: [Stops.Stop.id_t()]
  defp stop_ids(%{"stops" => stops}), do: Enum.map(stops, & &1.id)
  defp stop_ids(_), do: []
end
