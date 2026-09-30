defmodule LocationService do
  @moduledoc """
  Interacts with Amazon's Location Service, specifically its Places service, to perform geocoding, reverse geocoding and place lookups.
  """

  use Nebulex.Caching.Decorators
  require Logger

  @aws_client Application.compile_env!(:dotcom, :aws_client)
  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.hours(24)
  @max_query_bytes 200
  @max_results 10
  @max_transient_retries 2
  @retry_delay_ms 50

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
    if valid_autocomplete_request?(text, limit) do
      request = Map.merge(options, %{"Text" => text, "MaxResults" => limit})

      aws_request(:autocomplete, fn ->
        @aws_client.search_place_index_for_suggestions(index(), request)
      end)
      |> handle_response(:autocomplete)
    else
      {:error, :invalid_arguments}
    end
  end

  @spec valid_autocomplete_request?(term(), term()) :: boolean()
  def valid_autocomplete_request?(text, limit)
      when is_binary(text) and is_integer(limit) do
    byte_size(text) in 1..@max_query_bytes and limit in 1..@max_results
  end

  def valid_autocomplete_request?(_text, _limit), do: false

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  @impl LocationService.Behaviour
  def geocode(address, options \\ @bounding_options) do
    request = Map.put(options, "Text", address)

    aws_request(:geocode, fn ->
      @aws_client.search_place_index_for_text(index(), request)
    end)
    |> handle_response(:geocode)
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  @impl LocationService.Behaviour
  def reverse_geocode(latitude, longitude, options \\ @bounding_options) do
    request = Map.put(options, "Position", [longitude, latitude])

    aws_request(:reverse_geocode, fn ->
      @aws_client.search_place_index_for_position(index(), request)
    end)
    |> handle_response(:reverse_geocode)
  end

  defp get_place(place_id) do
    aws_request(:get_place, fn -> @aws_client.get_place(index(), place_id) end)
    |> handle_response(:get_place)
  end

  defp aws_request(operation, request_fun, retries \\ 0) do
    case request_fun.() do
      {:error, reason} = error when retries < @max_transient_retries ->
        if transient_connection_error?(reason) do
          delay = @retry_delay_ms * (retries + 1)

          Logger.warning(
            "Retrying Location Service #{operation} request after #{inspect(reason)}"
          )

          Process.sleep(delay)
          aws_request(operation, request_fun, retries + 1)
        else
          error
        end

      response ->
        response
    end
  end

  defp transient_connection_error?(:closed), do: true
  defp transient_connection_error?({:closed, _reason}), do: true
  defp transient_connection_error?({:goaway, :no_error}), do: true

  defp transient_connection_error?({:unexpected_response, %{status_code: status}})
       when status >= 500 or status == 429,
       do: true

  defp transient_connection_error?(%{status_code: status}) when status >= 500 or status == 429,
    do: true

  defp transient_connection_error?(_reason), do: false

  defp validation_exception?(headers) when is_list(headers) do
    Enum.any?(headers, fn
      {name, value} when is_binary(name) and is_binary(value) ->
        String.downcase(name) == "x-amzn-errortype" and
          String.starts_with?(value, "ValidationException")

      _ ->
        false
    end)
  end

  defp validation_exception?(_headers), do: false

  defp handle_response(
         {:error, {:unexpected_response, %{status_code: 400, headers: headers} = error}},
         operation
       ) do
    if validation_exception?(headers) do
      Sentry.capture_message("Location Service #{operation} rejected request: #{inspect(error)}")
      {:error, :invalid_arguments}
    else
      handle_response({:error, error}, operation)
    end
  end

  defp handle_response({:error, {:unexpected_response, error}}, operation) do
    handle_response({:error, error}, operation)
  end

  defp handle_response({:error, error}, operation) do
    Sentry.capture_message("Location Service #{operation} failed: #{inspect(error)}")
    {:error, :internal_error}
  end

  defp handle_response({:ok, %{"Place" => place}, _raw_response}, _operation) do
    place
  end

  defp handle_response(
         {:ok, %{"Results" => results, "Summary" => summary}, _raw_reponse},
         _operation
       ) do
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
