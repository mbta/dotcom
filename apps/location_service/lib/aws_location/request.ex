defmodule AWSLocation.Request do
  @moduledoc """
  Constructs and dispatches requests to AWS Location service
  Maybe: handle errors here?
  """

  @base_request_body %{
    FilterBBox: [-71.9380, 41.3193, -69.6189, 42.8266],
    MaxResults: 50
  }

  @spec new(String.t() | [float] | nil) :: ExAws.Operation.RestQuery.t()
  @doc "Searches for text"
  def new(text) when is_binary(text) do
    @base_request_body
    |> Map.put_new(:Text, text)
    |> request()
  end

  @doc "Searches for a position"
  def new([lat, lon]) when is_number(lon) and is_number(lat) do
    @base_request_body
    |> Map.put_new(:Position, [lon, lat])
    |> request()
  end

  @doc "Autocompletes some text, limiting the number of results returned"
  @spec autocomplete(String.t(), number) :: LocationService.Suggestion.result()
  def autocomplete(search, limit) when 1 <= limit and limit <= 15 do
    ExAws.request(%ExAws.Operation.RestQuery{
      http_method: :post,
      body:
        @base_request_body
        |> Map.put(:Text, search)
        |> Map.put(:MaxResults, limit),
      service: :places,
      path: "/places/v0/indexes/dotcom-dev-here/search/suggestions"
    })
  end

  defp request(body) do
    path =
      if Map.has_key?(body, :Text) do
        "/places/v0/indexes/dotcom-dev-esri/search/text"
      else
        "/places/v0/indexes/dotcom-dev-here/search/position"
      end

    %ExAws.Operation.RestQuery{
      http_method: :post,
      body: body,
      service: :places,
      path: path
    }
    |> ExAws.request()
  end
end
