defmodule MBTA.Api.Services do
  @moduledoc false

  alias MBTA.Api

  def all(params \\ []) do
    Api.get_json("/services/", params)
  end

  def get(id, params \\ []) do
    Api.get_json("/services/#{id}", params)
  end
end
