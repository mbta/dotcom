defmodule MBTA.Api.Facilities do
  @moduledoc """
  Responsible for fetching Stop data from the V3 API.
  """

  alias MBTA.Api

  def all(params \\ [], opts \\ []) do
    Api.get_json("/facilities/", params, opts)
  end

  def filter_by(filters, opts \\ []) do
    params = Enum.map(filters, fn {k, v} -> {"filter[#{k}]", v} end)

    Api.get_json("/facilities/", params, opts)
  end
end
