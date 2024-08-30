defmodule LocationService do
  @moduledoc """
  Interacts with Amazon's Location Service, specifically its Places service, to perform geocoding, reverse geocoding and place lookups.
  """

  require Logger

  use Nebulex.Caching.Decorators

  @aws_client Application.compile_env!(:dotcom, :aws_client)
  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.hours(24)

  @base_options %{
    "FilterCountries" => ["USA"],
    "FilterCategories" => [
      "AddressType",
      "PointOfInterestType"
    ],
    "MaxResults" => 15
  }
  @bias_options Map.put(@base_options, "BiasPosition", [-71.0660, 42.3548])
  @bounding_options Map.put(@base_options, "FilterBBox", [-71.9380, 41.3193, -69.6189, 42.8266])

  @filter ~r/,\s(MA|NH|RI),\s/

  @behaviour LocationService.Behaviour

  @impl LocationService.Behaviour
  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def autocomplete(text, limit, options \\ @bias_options) do
    options
    |> Map.merge(%{"Text" => text, "MaxResults" => limit})
    |> then(&@aws_client.search_place_index_for_suggestions(index(), &1))
    |> handle_response()
  end

  defp filter_results(results) do
    results
    |> Enum.filter(fn
      %LocationService.Address{formatted: address} -> Regex.match?(@filter, address)
      %LocationService.Suggestion{address: address} -> Regex.match?(@filter, address)
    end)
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  @impl LocationService.Behaviour
  def geocode(address, options \\ @bounding_options) do
    options
    |> Map.merge(%{"Text" => address})
    |> then(&@aws_client.search_place_index_for_text(index(), &1))
    |> handle_response()
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  @impl LocationService.Behaviour
  def reverse_geocode(latitude, longitude, options \\ @bounding_options) do
    options
    |> Map.merge(%{"Position" => [longitude, latitude]})
    |> then(&@aws_client.search_place_index_for_position(index(), &1))
    |> handle_response()
  end

  defp handle_response({:error, error}) do
    error |> inspect() |> Sentry.capture_message()
    {:error, :internal_error}
  end

  defp handle_response({:ok, %{"Results" => results, "Summary" => summary}, _raw_reponse}) do
    results =
      results
      |> Enum.map(fn
        # AWS suggestions
        %{"Text" => address} ->
          %LocationService.Suggestion{
            address: address,
            highlighted_spans:
              LocationService.Utils.get_highlighted_spans(%{
                search: summary["Text"],
                text: address
              })
          }

        # AWS format
        %{"Place" => %{"Label" => label, "Geometry" => %{"Point" => [lon, lat]}}} ->
          %LocationService.Address{
            formatted: label,
            latitude: lat,
            longitude: lon
          }
      end)
      |> filter_results()

    {:ok, results}
  end

  defp index do
    prefix = Application.get_env(:dotcom, :aws_index_prefix)
    "#{prefix}-esri"
  end
end
