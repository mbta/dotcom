defmodule LocationService.AWS do
  @moduledoc """
  Functions for interacting with Amazon's Location service, specifocally its Places service.
  """
  alias LocationService.AWS.Request
  require Logger

  @doc """
  Geocodes free-form text, such as an address, name, city, or region to allow
  you to search for Places or points of interest.

  https://docs.aws.amazon.com/location-places/latest/APIReference/API_SearchPlaceIndexForText.html
  """
  @spec geocode(String.t()) :: GoogleMaps.Geocode.t()
  def geocode(address) when is_binary(address) do
    # Google's geocode function returns this type:
    # {:ok, nonempty_list(Address.t())}
    # | {:error, :zero_results | :internal_error}
    case Request.new(address) do
      {:ok, %{status_code: 200, body: body}} ->
        case Jason.decode(body) do
          {:ok, %{"Results" => []}} ->
            {:error, :zero_results}

          {:ok, %{"Results" => results}} ->
            {:ok, parse_results(results)}

          {:error, _} ->
            _ =
              Logger.warn(fn ->
                "#{__MODULE__} error=\"Could not parse response body\""
              end)

            {:error, :internal_error}
        end

      {:ok, %{status_code: status}} ->
        # No response body? Not sure how but ExAws request might return this
        _ =
          Logger.warn(fn ->
            "#{__MODULE__} error=\"No response body for #{address} status=#{status}\""
          end)

        {:error, :zero_results}

      {:error, error} ->
        handle_error(error)
    end
  end

  @spec reverse_geocode(number, number) :: GoogleMaps.Geocode.t()
  def reverse_geocode(latitude, longitude) when is_float(latitude) and is_float(longitude) do
    # Google's geocode function returns this type:
    # {:ok, nonempty_list(Address.t())}
    # | {:error, :zero_results | :internal_error}
    case Request.new([latitude, longitude]) do
      {:ok, %{status_code: 200, body: body}} ->
        case Jason.decode(body) do
          {:ok, %{"Results" => []}} ->
            {:error, :zero_results}

          {:ok, %{"Results" => results}} ->
            {:ok, parse_results(results)}

          {:error, _} ->
            _ =
              Logger.warn(fn ->
                "#{__MODULE__} error=\"Could not parse response body\""
              end)

            {:error, :internal_error}
        end

      {:ok, %{status_code: status}} ->
        # No response body? Not sure how but ExAws request might return this
        _ =
          Logger.warn(fn ->
            "#{__MODULE__} error=\"No response body for #{latitude},#{longitude} status=#{status}\""
          end)

        {:error, :zero_results}

      {:error, error} ->
        handle_error(error)
    end
  end

  ## Can add other functions, e.g. reverse geocode and lookup suggested places,
  ## here or in separate files

  # merge with GoogleMaps.Geocode.parse_google_response?
  defp parse_results(results) do
    results
    |> Enum.map(fn %{"Place" => %{"Label" => label, "Geometry" => %{"Point" => [lon, lat]}}} ->
      %LocationService.Address{
        formatted: label,
        latitude: lat,
        longitude: lon
      }
    end)
  end

  defp handle_error({:http_error, status, reason}) do
    _ =
      Logger.warn(fn ->
        "#{__MODULE__} error=\"#{reason}\" status=\"#{status}\""
      end)

    {:error, :internal_error}
  end

  defp handle_error(_), do: {:error, :internal_error}
end
