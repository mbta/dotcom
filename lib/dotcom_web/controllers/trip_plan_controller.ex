defmodule DotcomWeb.TripPlanController do
  @moduledoc """
  Controller for trip plans.
  """

  use DotcomWeb, :controller

  import DotcomWeb.Router.Helpers, only: [live_path: 2]

  alias Dotcom.TripPlan.AntiCorruptionLayer

  @location_service Application.compile_env!(:dotcom, :location_service)

  @doc """
  When visiting /trip-planner/:from/some%20address or /trip-planner/:to/some%20address,
  we lookup the location and redirect to the trip planner with that location encoded in the query string.
  """
  def location(conn, %{"direction" => direction, "query" => query})
      when direction in ["from", "to"] do
    case @location_service.geocode(query) do
      {:ok, [%LocationService.Address{} = location | _]} ->
        encoded = build_params(direction, location, query) |> AntiCorruptionLayer.encode()
        path = live_path(conn, DotcomWeb.Live.TripPlanner)

        conn |> put_status(301) |> redirect(to: "#{path}?plan=#{encoded}") |> halt()

      _ ->
        location(conn, %{})
    end
  end

  def location(conn, _params) do
    path = live_path(conn, DotcomWeb.Live.TripPlanner)

    conn |> put_status(301) |> redirect(to: path) |> halt()
  end

  defp build_params(direction, location, query) do
    %{
      "#{direction}" => %{
        "latitude" => location.latitude,
        "longitude" => location.longitude,
        "name" => query
      }
    }
  end
end
