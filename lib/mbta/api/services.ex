defmodule MBTA.Api.Services do
  @moduledoc false

  @mbta_api Application.compile_env!(:dotcom, :mbta_api_module)

  def all(params \\ []) do
    @mbta_api.get_json("/services/", params)
  end

  def get(id, params \\ []) do
    @mbta_api.get_json("/services/#{id}", params)
  end
end
