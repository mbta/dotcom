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

  defstruct [
    :direction_id,
    :id,
    :name,
    :representative_trip_id,
    :route_id,
    :sort_order,
    :time_desc,
    :typicality
  ]

  def new(%Item{
        id: id,
        attributes: %{
          "direction_id" => direction_id,
          "name" => name,
          "sort_order" => sort_order,
          "time_desc" => time_desc,
          "typicality" => typicality
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
      sort_order: sort_order,
      time_desc: time_desc,
      typicality: typicality
    }
  end
end
