defmodule MBTA.Api.Status do
  @moduledoc """
  Gets the status from the MBTA Api.
  """

  @mbta_api Application.compile_env!(:dotcom, :mbta_api_module)

  def status() do
    @mbta_api.get_json("/status")
  end
end
