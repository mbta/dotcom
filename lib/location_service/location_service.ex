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

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def geocode(address) when is_binary(address) do
    Request.new(address)
    |> Result.handle_response(address)
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def reverse_geocode(latitude, longitude) when is_float(latitude) and is_float(longitude) do
    Request.new([latitude, longitude])
    |> Result.handle_response([latitude, longitude])
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def autocomplete(search, limit) when 1 <= limit and limit <= 15 do
    Request.autocomplete(search, limit)
    |> Result.handle_response(%{search: search, limit: limit})
  end

  def autocomplete(_, _), do: {:error, :invalid_arguments}
end
