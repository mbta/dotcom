defmodule DotcomWeb.TransitNearMeController.Location do
  @moduledoc """
  Fetches location data for the Transit Near Me controller.
  """
  alias LocationService.Address

  @spec get(map(), keyword()) :: LocationService.result() | :no_address
  def get(params, opts) do
    opts =
      Keyword.merge(
        [
          geocode_fn: &LocationService.geocode/1,
          reverse_geocode_fn: &LocationService.reverse_geocode/2
        ],
        opts
      )

    do_get(params, opts)
  end

  @spec do_get(map(), keyword()) :: LocationService.result() | :no_address
  defp do_get(%{"latitude" => lat, "longitude" => lng} = params, opts) do
    lat_lng = %{
      "latitude" => lat,
      "longitude" => lng
    }

    params
    |> Map.delete("latitude")
    |> Map.delete("longitude")
    |> Map.update("location", lat_lng, fn loc -> Map.merge(loc, lat_lng) end)
    |> get(opts)
  end

  defp do_get(%{"location" => %{"latitude" => lat, "longitude" => lng}} = params, opts) do
    with {:ok, lat} <- parse_float(lat),
         {:ok, lng} <- parse_float(lng),
         {:ok, address} <- get_formatted_address(params, {lat, lng}, opts) do
      {:ok,
       [
         %Address{
           latitude: lat,
           longitude: lng,
           formatted: address
         }
       ]}
    else
      {:error, :bad_float} ->
        # lat or lng didn't resolve to a float;
        # remove lat/lng params and retry
        location =
          params
          |> Map.get("location")
          |> Map.delete("latitude")
          |> Map.delete("longitude")

        params
        |> Map.put("location", location)
        |> get(opts)

      {:error, error} ->
        {:error, error}
    end
  end

  defp do_get(%{"location" => %{"address" => address}}, opts) do
    geocode_fn = Keyword.fetch!(opts, :geocode_fn)
    geocode_fn.(address)
  end

  defp do_get(%{}, _opts) do
    :no_address
  end

  defp parse_float(nil), do: {:error, :bad_float}

  defp parse_float(<<str::binary>>) do
    case Float.parse(str) do
      {float, ""} -> {:ok, float}
      :error -> {:error, :bad_float}
    end
  end

  @spec get_formatted_address(map(), {float(), float()}, Keyword.t()) ::
          {:ok, String.t()} | {:error, :zero_results | :internal_error}
  def get_formatted_address(%{"location" => %{"address" => <<address::binary>>}}, _latlng, _opts)
      when address != "" do
    {:ok, address}
  end

  def get_formatted_address(_, {lat, lng}, opts) do
    reverse_geocode_fn = Keyword.fetch!(opts, :reverse_geocode_fn)

    case reverse_geocode_fn.(lat, lng) do
      {:ok, [%{formatted: address} | _]} -> {:ok, address}
      error -> error
    end
  end
end
