defmodule SiteWeb.LocationServiceController do
  @moduledoc """
  Routes for requesting data from a location service
  """
  use SiteWeb, :controller

  alias Plug.Conn

  @doc "
  ⚠️ Hacky WIP
  Will phase out our usage of the Google Maps API Place Autocomplete

  This endpoint is set up so we can compare between the two location services.

  In many places throughout Dotcom, we use partial text and Google Maps API 
  provides suggested results, which contain a place_id that we later on geocode
  via Google Maps.

  Of course, AWS Location Service, while it does provide suggested results, does
  not have such a robust place database. It merely gives us a suggested address.

  Anyway, navigating to /locations/suggestions/<search text> will look up the 
  text in both services and return, in JSON format, a list of suggested results.
  "
  @spec suggestions(Conn.t(), map) :: Conn.t()
  def suggestions(conn, %{"input" => input}) do
    # TODO: Add this functionality to AWSLocation.Request
    {:ok, %{status_code: 200, body: body}} =
      %ExAws.Operation.RestQuery{
        http_method: :post,
        body: %{
          Text: input,
          FilterBBox: [-71.9380, 41.3193, -69.6189, 42.8266]
        },
        service: :places,
        path: "/places/v0/indexes/dotcom-dev-esri/search/suggestions"
      }
      |> ExAws.request()

    {:ok, %{"Results" => aws_results}} = Jason.decode(body)

    {:ok, google_results} =
      %GoogleMaps.Place.AutocompleteQuery{
        hit_limit: 15,
        session_token: "",
        input: input
      }
      |> GoogleMaps.Place.autocomplete()

    # TODO: PlacesController.autocomplete returns %{predictions: results} and
    # encodes the results.
    json(conn, %{
      input: input,
      lists: %{
        aws: Enum.map(aws_results, & &1["Text"]),
        google: Enum.map(google_results, & &1.description)
      },
      aws_results: aws_results,
      google_results: google_results
    })
  end

  @doc "/locations/text/<address>"
  @spec geocode(Conn.t(), map) :: Conn.t()
  def geocode(conn, %{"address" => address}) do
    # TODO: Use LocationService.Geocode.geocode(address) and return its result
    # rather than returning both Google and AWS results
    {:ok, a} = AWSLocation.geocode(address)
    {:ok, b} = GoogleMaps.Geocode.geocode(address)

    # TODO: match PlacesController.geocode by returning %{results: results}?
    # TODO: match PlacesController.geocode by encoding the results?
    json(conn, %{input: address, aws_results: a, google_results: b})
  end

  @doc "/locations/position/<lat>/<lon>"
  @spec position(Conn.t(), map) :: Conn.t()
  def position(conn, %{"latitude" => lat, "longitude" => lon}) do
    with {latitude, ""} <- Float.parse(lat),
         {longitude, ""} <- Float.parse(lon) do
      # TODO: Use LocationService.ReverseGeocode.reverse_geocode(address) and return its
      # result rather than returning both Google and AWS results
      {:ok, a} = AWSLocation.reverse_geocode(latitude, longitude)
      {:ok, b} = GoogleMaps.Geocode.reverse_geocode(latitude, longitude)

      # TODO: match PlacesController.reverse_geocode by returning %{results: results}?
      # TODO: match PlacesController.reverse_geocode by encoding the results?
      json(conn, %{input: [latitude, longitude], aws_results: a, google_results: b})
    end
  end
end
