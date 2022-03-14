defmodule SiteWeb.PlacesController do
  @moduledoc """
  Routes for requesting data from Google Maps.
  """
  use SiteWeb, :controller
  alias Plug.Conn
  alias SiteWeb.ControllerHelpers

  @spec autocomplete(Conn.t(), map) :: Conn.t()
  def autocomplete(conn, %{"input" => input, "hit_limit" => hit_limit_str, "token" => token}) do
    autocomplete_fn = Map.get(conn.assigns, :autocomplete_fn, &LocationService.autocomplete/3)

    with {hit_limit, ""} <- Integer.parse(hit_limit_str),
         {:ok, predictions} <-
           autocomplete_fn.(input, hit_limit, token) do
      json(conn, %{predictions: Poison.encode!(predictions)})
    else
      {:error, :internal_error} ->
        ControllerHelpers.return_internal_error(conn)

      _ ->
        ControllerHelpers.return_invalid_arguments_error(conn)
    end
  end

  @spec details(Conn.t(), map) :: Conn.t()
  def details(conn, %{"address" => address}) do
    geocode_fn = Map.get(conn.assigns, :geocode_fn, &LocationService.geocode/1)

    case geocode_fn.(address) do
      {:ok, results} ->
        json(conn, %{result: results |> List.first() |> Poison.encode!()})

      {:error, :internal_error} ->
        ControllerHelpers.return_internal_error(conn)

      {:error, :zero_results} ->
        ControllerHelpers.return_zero_results_error(conn)
    end
  end

  @spec reverse_geocode(Conn.t(), map) :: Conn.t()
  def reverse_geocode(conn, params) do
    reverse_geocode_fn =
      Map.get(conn.assigns, :reverse_geocode_fn, &LocationService.reverse_geocode/2)

    with {:ok, latitude, longitude} <- parse_location(params),
         {:ok, results} <- reverse_geocode_fn.(latitude, longitude) do
      json(conn, %{results: Poison.encode!(results)})
    else
      :invalid_lat_lng ->
        ControllerHelpers.return_invalid_arguments_error(conn)

      {:error, :internal_error} ->
        ControllerHelpers.return_internal_error(conn)

      {:error, :zero_results} ->
        ControllerHelpers.return_zero_results_error(conn)
    end
  end

  defp parse_location(%{"latitude" => latitude_str, "longitude" => longitude_str}) do
    with {latitude, ""} <- Float.parse(latitude_str),
         {longitude, ""} <- Float.parse(longitude_str) do
      {:ok, latitude, longitude}
    else
      _ ->
        :invalid_lat_lng
    end
  end
end
