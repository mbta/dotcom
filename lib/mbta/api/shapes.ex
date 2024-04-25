defmodule MBTA.Api.Shapes do
  @moduledoc """
  Responsible for fetching Shape data from the V3 API.
  """

  @mbta_api Application.compile_env!(:dotcom, :mbta_api_module)

  def all(params \\ []) do
    @mbta_api.get_json("/shapes/", params)
  end

  def by_id(id) do
    @mbta_api.get_json("/shapes/" <> id)
  end
end
