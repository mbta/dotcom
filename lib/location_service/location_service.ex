defmodule LocationService do
  @moduledoc """
  Interacts with Amazon's Location Service, specifically its Places service, to perform geocoding, reverse geocoding and place lookups.
  """

  require Logger

  use Nebulex.Caching.Decorators

  alias AWSLocation.Request
  alias LocationService.Result

  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.hours(24)

  @behaviour LocationService.Behaviour

  @default_options %{
    FilterBBox: [-71.9380, 41.3193, -69.6189, 42.8266],
    MaxResults: 50
  }

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def geocode(address, options \\ @default_options) when is_binary(address) do
    Request.new(address, options)
    |> Result.handle_response(address)
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def reverse_geocode(latitude, longitude, options \\ @default_options)
      when is_float(latitude) and is_float(longitude) do
    Request.new([latitude, longitude], options)
    |> Result.handle_response([latitude, longitude])
  end

  def autocomplete(text, limit, options \\ @default_options)

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def autocomplete(text, limit, options) when 1 <= limit and limit <= 15 do
    Request.autocomplete(text, limit, options)
    |> Result.handle_response(%{search: text, limit: limit})
  end

  def autocomplete(_, _, _), do: {:error, :invalid_arguments}
end
