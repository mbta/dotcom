defmodule V3Api.Vehicles do
  @moduledoc """

  Responsible for fetching vehiclde data from the V3 API.

  """
  import V3Api

  def all(params) do
    get_json("/vehicles/", params)
  end
end
