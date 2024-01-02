defmodule V3Api.Shapes do
  @moduledoc """

  Responsible for fetching Shape data from the V3 API.

  """
  import V3Api

  def all(params \\ []) do
    get_json("/shapes/", params)
  end

  def by_id(id, opts \\ []) do
    get_json("/shapes/" <> id, [], opts)
  end
end
