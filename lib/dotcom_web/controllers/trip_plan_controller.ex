defmodule DotcomWeb.TripPlanController do
  @moduledoc """
  Controller for trip plans.
  """

  use DotcomWeb, :controller

  require Logger

  alias Dotcom.TripPlan.AntiCorruptionLayer

  @location_service Application.compile_env!(:dotcom, :location_service)

  def location(conn, %{"direction" => direction, "query" => query}) when direction in ["from", "to"] do
    case @location_service.geocode(query) do
      {:ok, [%LocationService.Address{} = location | _]} ->
        encoded = build_params(direction, location) |> AntiCorruptionLayer.encode()

        redirect(conn, to: "/preview/trip-planner?plan=#{encoded}") |> halt()
        _ ->
          redirect(conn, to: "/preview/trip-planner") |> halt()
    end
  end

  def location(conn, _params) do
    redirect(conn, to: "/preview/trip-planner") |> halt()
  end

  defp build_params(direction, location) do
    %{
      "#{direction}" => %{
        "latitude" => location.latitude,
        "longitude" => location.longitude,
      }
    }
  end
end
