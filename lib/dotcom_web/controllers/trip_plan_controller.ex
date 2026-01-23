defmodule DotcomWeb.TripPlanController do
  @moduledoc """
  Controller for trip plans.
  """

  use DotcomWeb, :controller

  import DotcomWeb.Router.Helpers, only: [live_path: 2]

  alias Dotcom.TripPlan.AntiCorruptionLayer

  @lat_lon_regex ~r/^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/
  @location_service Application.compile_env!(:dotcom, :location_service)

  @doc """
  When visiting /trip-planner/from/lat,lon or /trip-planner/to/some%20address,
  we lookup the location and redirect to the trip planner with that location encoded in the query string.
  """
  def location(conn, %{"direction" => direction, "query" => query})
      when direction in ["from", "to"] do
    path = live_path(conn, DotcomWeb.TripPlannerLive)
    encoded = build_params(direction, query) |> AntiCorruptionLayer.encode()

    conn |> put_status(301) |> redirect(to: "#{path}?plan=#{encoded}") |> halt()
  end

  defp build_params(direction, query) do
    if String.match?(query, @lat_lon_regex) do
      build_latitude_longitude_params(direction, query)
    else
      case @location_service.geocode(query) do
        {:ok, [%LocationService.Address{} = location | _]} ->
          build_location_params(direction, location, query)

        _ ->
          %{}
      end
    end
  end

  defp build_latitude_longitude_params(direction, query) do
    [latitude, longitude] = String.split(query, ",")

    %{
      "#{direction}" => %{
        "latitude" => latitude,
        "longitude" => longitude
      }
    }
  end

  defp build_location_params(direction, location, query) do
    %{
      "#{direction}" => %{
        "latitude" => location.latitude,
        "longitude" => location.longitude,
        "name" => query
      }
    }
  end
end
