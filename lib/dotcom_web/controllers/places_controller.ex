defmodule DotcomWeb.PlacesController do
  @moduledoc """
  Routes for requesting data from AWS Location Service
  """
  use DotcomWeb, :controller
  alias DotcomWeb.ControllerHelpers
  alias LocationService.Address
  alias Plug.Conn

  @location_service Application.compile_env!(:dotcom, :location_service)

  def autocomplete(conn, %{"input" => input, "hit_limit" => hit_limit_str}) do
    with {hit_limit, ""} <- Integer.parse(hit_limit_str),
         {:ok, predictions} <-
           @location_service.autocomplete(input, hit_limit) do
      json(conn, %{predictions: Jason.encode!(predictions)})
    else
      {:error, :internal_error} ->
        ControllerHelpers.return_internal_error(conn)

      _ ->
        ControllerHelpers.return_invalid_arguments_error(conn)
    end
  end

  def details(conn, %{"address" => address}) do
    case @location_service.geocode(address) do
      {:ok, results} ->
        json(conn, %{result: results |> List.first() |> Jason.encode!()})

      {:error, :internal_error} ->
        ControllerHelpers.return_internal_error(conn)
    end
  end

  def reverse_geocode(conn, params) do
    with {:ok, latitude, longitude} <- parse_location(params),
         {:ok, results} <- @location_service.reverse_geocode(latitude, longitude) do
      json(conn, %{results: Jason.encode!(results)})
    else
      :invalid_lat_lng ->
        ControllerHelpers.return_invalid_arguments_error(conn)

      {:error, :internal_error} ->
        ControllerHelpers.return_internal_error(conn)
    end
  end

  @doc """
  /places/urls with latitude and longitude params will return an object containing URLs specific to that location for the Retail Sales Location page, and the Proposed Sales Location pages, e.g.

  %{
    "latitude" => "1",
    "longitude" => "2",
    "url" => null,
    "urls" => %{
      "proposed-sales-locations" => "/fare-transformation/proposed-sales-locations?latitude=1&longitude=2",
      "retail-sales-locations" => "/fares/retail-sales-locations?location[latitude]=1&location[longitude]=2"
    }
  }
  """
  def with_urls(conn, %{"latitude" => lat, "longitude" => lon} = _params) do
    json(conn, %{result: add_urls(%{latitude: lat, longitude: lon})})
  end

  @doc """
  /places/popular returns a static list of popular locations, each with an object containing URLs specific to that location for the Retail Sales Location page, and the Proposed Sales Location pages, e.g.

  %{
    "urls" => {
      "retail-sales-locations" => "/fares/retail-sales-locations?location[latitude]=42.352271&location[longitude]=-71.055242&location[name]=South+Station",
      "proposed_sales_locations" => "/fare-transformation/proposed-sales-locations?location[latitude]=42.352271&location[longitude]=-71.055242&location[name]=South+Station"
    },
    "url" => null,
    "name" => "South Station",
    "longitude" => -71.055242,
    "latitude" => 42.352271,
    "icon" => "station",
    "features" => ["red_line", "bus", "commuter_rail", "access"]
  }
  """
  def popular(conn, _) do
    json(conn, %{result: Enum.map(popular_locations(), &add_urls/1)})
  end

  @doc """
  First fetches address suggestions, then geocodes each suggestion to get a list of coordinates for a search query.
  /places/search/Prudential/6 returns 6 results, each with an object containing URLs specific to that location for the Retail Sales Location page, and the Proposed Sales Location pages.
  """
  def search(conn, %{"query" => query, "hit_limit" => hit_limit_str}) do
    case Integer.parse(hit_limit_str) do
      {hit_limit, ""} when hit_limit > 0 ->
        do_search(conn, query, hit_limit)

      _ ->
        ControllerHelpers.return_invalid_arguments_error(conn)
    end
  end

  defp do_search(conn, query, hit_limit) do
    case @location_service.autocomplete(query, hit_limit) do
      {:ok, suggestions} ->
        json(conn, %{result: with_coordinates(suggestions)})

      {:error, :invalid_arguments} ->
        ControllerHelpers.return_invalid_arguments_error(conn)

      _ ->
        ControllerHelpers.return_internal_error(conn)
    end
  end

  defp with_coordinates(addresses) do
    addresses
    |> Enum.map(fn address ->
      address
      |> Map.take([:latitude, :longitude])
      |> Map.merge(Map.from_struct(address))
      |> add_urls()
    end)
  end

  defp add_urls(map) do
    params =
      case map do
        %{street_address: street_address} ->
          Map.take(map, [:latitude, :longitude]) |> Map.put_new(:address, street_address)

        %{address: _} ->
          Map.take(map, [:address, :latitude, :longitude])

        %{name: _} ->
          Map.take(map, [:name, :latitude, :longitude])

        %{latitude: _} ->
          Map.take(map, [:latitude, :longitude])
      end

    vote_params =
      case map do
        %{formatted: formatted} ->
          map
          |> Map.take([:latitude, :longitude])
          |> Map.put(:address, formatted)

        _ ->
          %{}
      end

    map
    |> Map.put_new(:urls, %{
      "retail-sales-locations" =>
        fare_path(DotcomWeb.Endpoint, :show, "retail-sales-locations", params),
      "proposed-sales-locations" =>
        fare_path(
          DotcomWeb.Endpoint,
          :show_transformation,
          params
        ),
      "vote" => vote_path(DotcomWeb.Endpoint, :show, vote_params)
    })
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

  defp popular_locations do
    # copied from TripPlannerLocControls.POPULAR
    [
      %{
        icon: "airplane",
        municipality: "East Boston",
        state: "MA",
        name: "Boston Logan Airport",
        features: ["blue_line", "silver_line", "ferry", "bus"],
        latitude: 42.365396,
        longitude: -71.017547
      },
      %{
        icon: "station",
        municipality: "Boston",
        state: "MA",
        name: "South Station",
        features: ["red_line", "silver_line", "bus", "commuter_rail", "access"],
        latitude: 42.352271,
        longitude: -71.055242,
        stop_id: "place-sstat"
      },
      %{
        icon: "station",
        municipality: "Boston",
        state: "MA",
        name: "North Station",
        features: [
          "orange_line",
          "green_line_d",
          "green_line_e",
          "bus",
          "commuter_rail",
          "access"
        ],
        latitude: 42.365577,
        longitude: -71.06129,
        stop_id: "place-north"
      }
    ]
  end
end
