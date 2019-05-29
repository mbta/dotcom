defmodule V3Api.Predictions do
  @moduledoc """

  Responsible for fetching Prediction data from the V3 API.

  """
  import V3Api

  def all(params) do
    get_json("/predictions/", params)
  end
end
