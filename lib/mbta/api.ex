defmodule MBTA.Api do
  @moduledoc """
  Handles fetching and caching generic JSON:API responses from the MBTA API.
  """

  @behaviour MBTA.Api.Behaviour

  @req Application.compile_env(:dotcom, :req_module)

  @impl MBTA.Api.Behaviour
  def get_json(url, params \\ []) do
    case client() |> @req.get(url: url, params: params) do
      {:ok, response} -> JsonApi.parse(response.body)
      {:error, reason} -> {:error, reason}
    end
  end

  defp client do
    config = Application.get_env(:dotcom, :mbta_api)

    @req.new(
      base_url: config[:base_url],
      headers: [
        {"MBTA-Version", config[:version]},
        {"x-api-key", config[:key]},
        {"x-enable-experimental-features", "true"}
      ]
    )
  end
end
