defmodule MBTA.Api.Shapes do
  @moduledoc """
  Responsible for fetching Shape data from the V3 API.
  """

  alias MBTA.Api

  def all(params \\ []) do
    Api.get_json("/shapes/", params)
  end

  def by_id(id, opts \\ []) do
    Api.get_json("/shapes/" <> id, [], opts)
  end
end
