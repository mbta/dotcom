defmodule RoutePatterns.RoutePattern do
  @moduledoc """
  Route patterns are used to describe the subsets of a route, representing different
  possible patterns of where trips may serve. For example, a bus route may have multiple
  branches, and each branch may be modeled as a separate route pattern per direction.
  Hierarchically, the route pattern level may be considered to be larger than the trip
  level and smaller than the route level.

  For most MBTA modes, a route pattern will typically represent a unique set of stops
  that may be served on a route-trip combination. Seasonal schedule changes may result
  in trips within a route pattern having different routings. In simple changes, such a
  single bus stop removed or added between one schedule rating and the next (for example,
  between the Summer and Fall schedules), trips will be maintained on the same
  route_pattern_id. If the changes are significant, a new route_pattern_id may be introduced.

  For Commuter Rail, express or skip-stop trips use the same route pattern as local trips.
  Some branches do have multiple route patterns when the train takes a different path.
  For example, CR-Providence has two route patterns per direction, one for the Wickford
  Junction branch and the other for the Stoughton branch.
  """

  alias JsonApi.Item
  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop

  defstruct [
    :direction_id,
    :id,
    :name,
    :representative_trip_id,
    :representative_trip_polyline,
    :shape_id,
    :shape_priority,
    :headsign,
    :stop_ids,
    :route_id,
    :time_desc,
    :typicality,
    :service_id,
    sort_order: 0
  ]

  @type id_t :: String.t()
  @type typicality_t :: 0 | 1 | 2 | 3 | 4
  @type t :: %__MODULE__{
          direction_id: 0 | 1,
          id: id_t(),
          name: String.t(),
          representative_trip_id: Trip.id_t(),
          representative_trip_polyline: String.t(),
          shape_id: String.t(),
          shape_priority: number,
          headsign: String.t(),
          stop_ids: [Stop.id_t()],
          route_id: Route.id_t(),
          time_desc: String.t(),
          typicality: typicality_t(),
          sort_order: integer(),
          service_id: String.t()
        }

  def new(%Item{
        id: id,
        attributes: %{
          "direction_id" => direction_id,
          "name" => name,
          "time_desc" => time_desc,
          "typicality" => typicality,
          "sort_order" => sort_order
        },
        relationships: %{
          "representative_trip" => [
            %Item{
              attributes: %{
                "headsign" => headsign
              },
              id: representative_trip_id,
              relationships: trip_relationships
            }
          ],
          "route" => [%Item{id: route_id}]
        }
      }) do
    %__MODULE__{
      direction_id: direction_id,
      id: id,
      name: name,
      representative_trip_id: representative_trip_id,
      representative_trip_polyline: polyline(trip_relationships),
      shape_id: shape_id(trip_relationships),
      headsign: headsign,
      stop_ids: stop_ids(trip_relationships),
      route_id: route_id,
      time_desc: time_desc,
      typicality: typicality,
      sort_order: sort_order,
      service_id: service_id(trip_relationships)
    }
  end

  def new(%Item{
        id: id,
        attributes: %{
          "direction_id" => direction_id,
          "name" => name,
          "time_desc" => time_desc,
          "typicality" => typicality,
          "sort_order" => sort_order
        },
        relationships: %{
          "representative_trip" => [%Item{id: representative_trip_id}],
          "route" => [%Item{id: route_id}]
        }
      }) do
    %__MODULE__{
      direction_id: direction_id,
      id: id,
      name: name,
      representative_trip_id: representative_trip_id,
      route_id: route_id,
      time_desc: time_desc,
      typicality: typicality,
      sort_order: sort_order
    }
  end

  defp polyline(%{
         "shape" => [
           %Item{
             attributes: %{
               "polyline" => polyline
             }
           }
         ]
       }),
       do: polyline

  defp polyline(_), do: nil

  defp shape_id(%{
         "shape" => [
           %Item{
             id: shape_id
           }
         ]
       }),
       do: shape_id

  defp shape_id(_), do: nil

  # Note: these are child stop IDs
  defp stop_ids(%{"stops" => stops}) when is_list(stops) do
    Enum.map(stops, & &1.id)
  end

  defp stop_ids(_), do: nil

  defp service_id(%{
         "service" => [
           %Item{
             id: service_id
           }
         ]
       }),
       do: service_id

  defp service_id(_), do: nil
end
