defmodule Stops.Repo.Behaviour do
  @moduledoc """
  Behavior for an API client for fetching stop data
  """
  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop

  @type stop_feature ::
          Route.route_type()
          | Route.subway_lines_type()
          | :access
          | :parking_lot
          | :"Green-B"
          | :"Green-C"
          | :"Green-D"
          | :"Green-E"
  @type stops_response :: [Stop.t()] | {:error, any}

  @callback old_id_to_gtfs_id(Stop.id_t()) :: Stop.id_t() | nil

  @callback get(Stop.id_t()) :: Stop.t() | nil
  @callback get!(Stop.id_t()) :: Stop.t()

  @callback has_parent?(Stop.t() | Stop.id_t() | nil) :: boolean

  @callback get_parent(Stop.t() | Stop.id_t() | nil) :: Stop.t() | nil

  @callback by_route(Route.id_t(), 0 | 1) :: stops_response()
  @callback by_route(Route.id_t(), 0 | 1, Keyword.t()) :: stops_response()

  @callback by_routes([Route.id_t()], 0 | 1) :: stops_response()
  @callback by_routes([Route.id_t()], 0 | 1, Keyword.t()) :: stops_response()

  @callback by_route_type(Route.type_int()) :: stops_response()
  @callback by_route_type(Route.type_int(), Keyword.t()) :: stops_response()

  @callback by_trip(Trip.id_t()) :: stops_response()

  @callback stop_features(Stop.t()) :: [stop_feature()]
  @callback stop_features(Stop.t(), Keyword.t()) :: [stop_feature()]

  @callback all() :: [Stop.t()]
end
