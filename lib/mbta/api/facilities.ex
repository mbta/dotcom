defmodule MBTA.Api.Facilities do
  @moduledoc """
  Responsible for fetching Stop data from the V3 API.
  """

  @mbta_api Application.compile_env!(:dotcom, :mbta_api_module)

  def all(params \\ []) do
    @mbta_api.get_json("/facilities/", params)
  end

  def filter_by(filters) do
    params = Enum.map(filters, fn {k, v} -> {"filter[#{k}]", v} end)

    @mbta_api.get_json("/facilities/", params)
  end
end
