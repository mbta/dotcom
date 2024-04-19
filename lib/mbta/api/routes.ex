defmodule MBTA.Api.Routes do
  @moduledoc """
  Responsible for fetching Route data from the V3 API.
  """

  alias Routes.Route
  alias Stops.Stop

  @mbta_api Application.compile_env!(:dotcom, :mbta_api_module)

  @type api_response_t() :: JsonApi.t() | {:error, any}

  @spec all(keyword()) :: api_response_t()
  def all(opts \\ []) do
    @mbta_api.get_json("/routes/", opts)
  end

  @spec get(Route.id_t(), keyword()) :: api_response_t()
  def get(id, opts \\ []) do
    @mbta_api.get_json("/routes/#{id}", opts)
  end

  @spec by_type(Route.type_int(), keyword()) :: api_response_t()
  def by_type(type, opts \\ []) do
    opts = put_in(opts[:type], type)

    @mbta_api.get_json("/routes/", opts)
  end

  @spec by_stop(Stop.id_t(), keyword()) :: api_response_t()
  def by_stop(stop_id, opts \\ []) do
    opts = put_in(opts[:stop], stop_id)

    @mbta_api.get_json("/routes/", opts)
  end

  @spec by_stop_and_direction(Stop.id_t(), 0 | 1, keyword()) :: api_response_t()
  def by_stop_and_direction(stop_id, direction_id, opts \\ []) do
    opts = put_in(opts[:stop], stop_id)
    opts = put_in(opts[:direction_id], direction_id)

    @mbta_api.get_json("/routes/", opts)
  end
end
