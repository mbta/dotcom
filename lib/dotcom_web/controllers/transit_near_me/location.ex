defmodule DotcomWeb.TransitNearMeController.Location do
  @moduledoc """
  Fetches location data for the Transit Near Me controller.
  """
  alias LocationService.Address

  @location_service Application.compile_env!(:dotcom, :location_service)

  @spec get(map()) :: LocationService.Behaviour.result()
  def get(%{"latitude" => lat, "longitude" => lng} = params) do
    lat_lng = %{
      "latitude" => lat,
      "longitude" => lng
    }

    params
    |> Map.delete("latitude")
    |> Map.delete("longitude")
    |> Map.update("location", lat_lng, fn loc -> Map.merge(loc, lat_lng) end)
    |> get()
  end

  def get(%{"location" => %{"latitude" => lat, "longitude" => lng}} = params) do
    with {:ok, lat} <- parse_float(lat),
         {:ok, lng} <- parse_float(lng),
         {:ok, address} <- get_formatted_address(params, {lat, lng}) do
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
        |> get()

      {:error, error} ->
        {:error, error}
    end
  end

  def get(%{"location" => %{"address" => address}}) do
    @location_service.geocode(address)
  end

  def get(%{"address" => address}) do
    @location_service.geocode(address)
  end

  def get(%{}) do
    :no_address
  end

  defp parse_float(nil), do: {:error, :bad_float}

  defp parse_float(<<str::binary>>) do
    case Float.parse(str) do
      {float, ""} -> {:ok, float}
      :error -> {:error, :bad_float}
    end
  end

  @spec get_formatted_address(map(), {float(), float()}) ::
          {:ok, String.t()} | {:error, :zero_results | :internal_error}
  def get_formatted_address(%{"location" => %{"address" => <<address::binary>>}}, _latlng) when address != "" do
    {:ok, address}
  end

  def get_formatted_address(_, {lat, lng}) do
    case @location_service.reverse_geocode(lat, lng) do
      {:ok, [%{formatted: address} | _]} -> {:ok, address}
      error -> error
    end
  end
end
