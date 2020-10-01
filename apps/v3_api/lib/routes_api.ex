defmodule V3Api.RoutesApi do
  @moduledoc """
  Behavior for an API client for fetching route data.
  """

  alias Routes.Route
  alias Stops.Stop

  @type api_response_t() :: JsonApi.t() | {:error, any}

  @doc """
  Get all routes.
  """
  @callback all() :: api_response_t()
  @callback all(keyword()) :: api_response_t()

  @doc """
  Get a single route by ID.
  """
  @callback get(Route.id_t()) :: api_response_t()
  @callback get(Route.id_t(), keyword()) :: api_response_t()

  @doc """
  Get routes of a given route type.
  """
  @callback by_type(Route.type_int()) :: api_response_t()
  @callback by_type(Route.type_int(), keyword()) :: api_response_t()

  @doc """
  Get routes serving a given stop.
  """
  @callback by_stop(Stop.id_t()) :: api_response_t()
  @callback by_stop(Stop.id_t(), keyword()) :: api_response_t()

  @doc """
  Get routes serving a given stop, running in a given direction.
  """
  @callback by_stop_and_direction(Stop.id_t(), 0 | 1) :: api_response_t()
  @callback by_stop_and_direction(Stop.id_t(), 0 | 1, keyword()) :: api_response_t()
end
