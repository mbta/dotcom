defmodule MBTA.Api do
  @moduledoc """
  Handles fetching and caching generic JSON:API responses from the MBTA API.
  """

  @behaviour MBTA.Api.Behaviour

  @req Application.compile_env(:dotcom, :req_module)

  defmacro is_valid_potential_id(id) do
    quote do: is_binary(unquote(id)) and unquote(id) != ""
  end

  @impl MBTA.Api.Behaviour
  def get_json(url, params \\ []) do
    case client() |> @req.get(url: URI.encode(url), params: params) do
      {:ok, response} -> JsonApi.parse(response.body)
      {:error, reason} -> {:error, reason}
    end
  end

  defp client do
    config = Application.get_env(:dotcom, :mbta_api)

    @req.new(
      base_url: config[:base_url],
      headers: config[:headers],
      finch: Dotcom.Finch,
      cache: true,
      compress_body: true
    )
  end
end
