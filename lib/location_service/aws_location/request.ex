defmodule AWSLocation.Request do
  @moduledoc """
  Constructs and dispatches requests to AWS Location service
  """

  @aws Application.compile_env!(:dotcom, :aws)

  @doc """
  Searches for a location based on text or a lat, long pair.
  """
  @spec new(String.t() | [float], map()) :: LocationService.Address.result()
  def new(text, options) when is_binary(text) do
    options
    |> Map.put_new(:Text, text)
    |> request()
  end

  def new([lat, lon], options) when is_number(lon) and is_number(lat) do
    options
    |> Map.put_new(:Position, [lon, lat])
    |> request()
  end

  @doc "Autocompletes some text, limiting the number of results returned"
  @spec autocomplete(String.t(), number, map()) :: LocationService.Suggestion.result()
  def autocomplete(text, limit, options) when 1 <= limit and limit <= 15 do
    @aws.request(%ExAws.Operation.RestQuery{
      http_method: :post,
      body:
        options
        |> Map.put(:Text, text)
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
    |> @aws.request()
  end

  defp place_index_path(:text), do: place_index_base("esri") <> "/search/text"

  defp place_index_path(:position), do: place_index_base("esri") <> "/search/position"

  defp place_index_path(:suggestions), do: place_index_base("esri") <> "/search/suggestions"

  defp place_index_base(data_provider) when data_provider in ["esri", "here"] do
    prefix = Application.get_env(:dotcom, :aws_index_prefix)
    "/places/v0/indexes/#{prefix}-#{data_provider}"
  end
end
