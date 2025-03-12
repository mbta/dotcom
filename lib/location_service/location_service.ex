defmodule LocationService do
  @moduledoc """
  Interacts with Amazon's Location Service, specifically its Places service, to perform geocoding, reverse geocoding and place lookups.
  """

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

  defp get_place(place_id) do
    @aws_client.get_place(index(), place_id)
    |> handle_response()
  end

  defp handle_response({:error, {:unexpected_response, error}}) do
    handle_response({:error, error})
  end

  defp handle_response({:error, error}) do
    error |> inspect() |> Sentry.capture_message()
    {:error, :internal_error}
  end

  defp handle_response({:ok, %{"Place" => place}, _raw_response}) do
    place
  end

  defp handle_response({:ok, %{"Results" => results, "Summary" => summary}, _raw_reponse}) do
    input = Map.get(summary, "Text")

    results =
      results
      |> Stream.map(&parse/1)
      |> Stream.reject(fn suggestion ->
        place_without_placeid(suggestion) || not in_this_region(suggestion)
      end)
      |> Stream.uniq_by(&dedup_place_text/1)
      |> Stream.map(&get_place_from_placeid/1)
      |> Stream.reject(fn place ->
        match?({:error, _}, place) || metro_station?(place)
      end)
      |> Enum.map(&LocationService.Address.new(&1, input))

    {:ok, results}
  end

  defp parse(%{"Place" => place}), do: place
  defp parse(other), do: other

  # sometimes the suggestions return a place with no place ID,
  # just a text result and nothing else. don't need it
  defp place_without_placeid(place), do: Map.keys(place) == ["Text"]

  defp in_this_region(%{"Text" => label}), do: Regex.match?(@filter, label)
  defp in_this_region(%{"Label" => label}), do: Regex.match?(@filter, label)
  defp in_this_region(_), do: true

  defp dedup_place_text(%{"Text" => text}),
    do: LocationService.Address.replace_common_street_suffix(text)

  defp dedup_place_text(other), do: other

  defp get_place_from_placeid(%{"PlaceId" => place_id}) do
    case get_place(place_id) do
      {:ok, %{"Place" => place}, _} ->
        place

      error ->
        error
    end
  end

  defp get_place_from_placeid(other), do: other

  defp metro_station?(%{"SupplementalCategories" => [category]})
       when category in ["Bus Stop", "Metro Station"],
       do: true

  defp metro_station?(_), do: false

  defp index do
    Application.get_env(:dotcom, __MODULE__)[:aws_index]
  end
end
