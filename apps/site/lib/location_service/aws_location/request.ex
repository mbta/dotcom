defmodule AWSLocation.Request do
  @moduledoc """
  Constructs and dispatches requests to AWS Location service
  """

  @base_request_body %{
    FilterBBox: [-71.9380, 41.3193, -69.6189, 42.8266],
    MaxResults: 50
  }

  @spec new(String.t() | [float] | nil) :: ExAws.Operation.RestQuery.t()
  # "Searches for text"
  def new(text) when is_binary(text) do
    @base_request_body
    |> Map.put_new(:Text, text)
    |> request()
  end

  # "Searches for a position"
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
      path: place_index_path(:suggestions)
    })
  end

  defp request(body) do
    path =
      if Map.has_key?(body, :Text) do
        place_index_path(:text)
      else
        place_index_path(:position)
      end

    %ExAws.Operation.RestQuery{
      http_method: :post,
      body: body,
      service: :places,
      path: path
    }
    |> ExAws.request()
  end

  defp place_index_path(:text), do: place_index_base("esri") <> "/search/text"

  defp place_index_path(:position), do: place_index_base("esri") <> "/search/position"

  defp place_index_path(:suggestions), do: place_index_base("esri") <> "/search/suggestions"

  defp place_index_base(data_provider) when data_provider in ["esri", "here"] do
    {:system, env_var, default} = Application.get_env(:site, :aws_index_prefix)
    prefix = if System.get_env(env_var), do: System.get_env(env_var), else: default
    "/places/v0/indexes/#{prefix}-#{data_provider}"
  end
end
