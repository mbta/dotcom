defmodule SiteWeb.PlacesController do
  @moduledoc """
  Routes for requesting data from Google Maps.
  """
  use SiteWeb, :controller
  alias LocationService.Address
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

  @doc """
  /places/urls with latitude and longitude params will return an object containing URLs specific to that location for Transit Near Me, the Retail Sales Location page, and the Proposed Sales Location pages, e.g.

  %{
    "latitude" => "1",
    "longitude" => "2",
    "url" => null,
    "urls" => %{
      "proposed-sales-locations" => "/fare-transformation/proposed-sales-locations?latitude=1&longitude=2",
      "retail-sales-locations" => "/fares/retail-sales-locations?location[latitude]=1&location[longitude]=2",
      "transit-near-me" => "/transit-near-me?latitude=1&longitude=2"
    }
  }
  """
  def with_urls(conn, %{"latitude" => lat, "longitude" => lon} = _params) do
    json(conn, %{result: add_urls(%{latitude: lat, longitude: lon})})
  end

  @doc """
  /places/popular returns a static list of popular locations, each with an object containing URLs specific to that location for Transit Near Me, the Retail Sales Location page, and the Proposed Sales Location pages, e.g.

  %{
    "urls" => {
      "transit_near_me" => "/transit-near-me?latitude=42.352271&longitude=-71.055242&name=South+Station",
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
  /places/search/Prudential/6 returns 6 results, each with an object containing URLs specific to that location for Transit Near Me, the Retail Sales Location page, and the Proposed Sales Location pages.
  """
  def search(conn, %{"query" => query, "hit_limit" => hit_limit_str}) do
    with {hit_limit, ""} <- Integer.parse(hit_limit_str) do
      case AWSLocation.autocomplete(query, hit_limit) do
        {:ok, suggestions} ->
          json(conn, %{result: with_coordinates(suggestions)})

        {:error, error} ->
          case error do
            :zero_results ->
              json(conn, %{result: []})

            _ ->
              ControllerHelpers.return_internal_error(conn)
          end
      end
    else
      _ ->
        ControllerHelpers.return_invalid_arguments_error(conn)
    end
  end

  @spec with_coordinates([Suggestion.t()]) :: [
          %{
            required(:latitude) => number,
            required(:longitude) => number,
            required(:address) => String.t(),
            required(:highlighted_spans) => [LocationService.Utils.HighlightedSpan.t()] | nil,
            required(:url) => nil,
            required(:urls) => %{
              required(:"transit-near-me") => String.t(),
              required(:"retail-sales-locations") => String.t(),
              required(:"proposed-sales-locations") => String.t()
            }
          }
        ]
  defp with_coordinates(suggestions) do
    suggestions
    |> Enum.map(&{&1, AWSLocation.geocode(&1.address)})
    |> Enum.filter(&match?({_suggestion, {:ok, [%Address{} | _]}}, &1))
    |> Enum.map(fn {suggestion, {:ok, [address | _]}} ->
      address
      |> Map.take([:latitude, :longitude])
      |> Map.merge(Map.from_struct(suggestion))
      |> add_urls()
    end)
  end

  defp add_urls(map) do
    params =
      case map do
        %{address: _} -> Map.take(map, [:address, :latitude, :longitude])
        %{name: _} -> Map.take(map, [:name, :latitude, :longitude])
        %{latitude: _} -> Map.take(map, [:latitude, :longitude])
      end

    map
    |> Map.put_new(:urls, %{
      "retail-sales-locations" =>
        fare_path(SiteWeb.Endpoint, :show, "retail-sales-locations", params),
      "proposed-sales-locations" =>
        fare_path(
          SiteWeb.Endpoint,
          :show_transformation,
          params
        ),
      "transit-near-me" => transit_near_me_path(SiteWeb.Endpoint, :index, params)
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

  defp popular_locations() do
    # copied from TripPlannerLocControls.POPULAR
    [
      %{
        icon: "airplane",
        name: "Boston Logan Airport",
        features: [],
        latitude: 42.365396,
        longitude: -71.017547
      },
      %{
        icon: "station",
        name: "South Station",
        features: ["red_line", "bus", "commuter_rail", "access"],
        latitude: 42.352271,
        longitude: -71.055242,
        stop_id: "place-sstat"
      },
      %{
        icon: "station",
        name: "North Station",
        features: [
          "orange_line",
          "green-line-c",
          "green-line-e",
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
