defmodule MBTA.Api.Routes do
  @moduledoc """
  Responsible for fetching Route data from the V3 API.
  """

  import MBTA.Api, only: [is_valid_potential_id: 1]

  alias Routes.Route
  alias Stops.Stop

  @mbta_api Application.compile_env!(:dotcom, :mbta_api_module)

  @type api_response_t() :: JsonApi.t() | {:error, any}

  @spec all(keyword()) :: api_response_t()
  def all(params \\ []) do
    @mbta_api.get_json("/routes/", params)
  end

  @spec get(Route.id_t(), keyword()) :: api_response_t()
  def get(id, params \\ [])

  def get(id, params) when is_valid_potential_id(id) do
    @mbta_api.get_json("/routes/#{id}", params)
  end

  def get(id, _), do: {:error, {:invalid_id, id}}

  @spec by_type(Route.type_int(), keyword()) :: api_response_t()
  def by_type(type, params \\ []) do
    params = put_in(params[:type], type)

    @mbta_api.get_json("/routes/", params)
  end

  @spec by_stop(Stop.id_t(), keyword()) :: api_response_t()
  def by_stop(stop_id, params \\ []) do
    params = put_in(params[:stop], stop_id)

    @mbta_api.get_json("/routes/", params)
  end
end
