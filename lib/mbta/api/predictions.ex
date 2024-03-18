defmodule MBTA.Api.Predictions do
  @moduledoc """
  Responsible for fetching Prediction data from the V3 API.
  """

  alias MBTA.Api

  def all(params) do
    Api.get_json("/predictions/", params)
  end
end
