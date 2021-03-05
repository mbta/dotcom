defmodule Fares.ProposedLocationsTest do
  use ExUnit.Case, async: true

  import Mock
  import Fares.ProposedLocations

  @location %{latitude: 42.42412295861601, longitude: -71.17941003354629}

  @arcgis_response "{
    \"objectIdFieldName\" : \"FID\",
    \"uniqueIdField\" :
    {
      \"name\" : \"FID\",
      \"isSystemMaintained\" : true
    },
    \"globalIdFieldName\" : \"\",
    \"geometryType\" : \"esriGeometryPoint\",
    \"spatialReference\" : {
      \"wkid\" : 4326,
      \"latestWkid\" : 4326
    },
    \"fields\" : [],
    \"features\" : [
      {
        \"attributes\" : {
          \"FID\" : 124,
          \"stop_id\" : \"2250\",
          \"stop_name\" : \"Massachusetts Ave @ Daniels St\",
          \"municipali\" : \"Arlington\",
          \"Line\" : \"Bus\",
          \"RetailFVM\" : \"Fare vending machine\",
          \"Routes\" : \"77, 79\"
        },
        \"geometry\" :
        {
          \"x\" : -71.17941003354629,
          \"y\" : 42.42412295861601
        }
      }
    ]
  }"

  describe "requests data from ArcGIS and parses the response into a list of locations" do
    test "by_lat_lon - successful parsed response" do
      with_mock HTTPoison,
        get: fn _url -> {:ok, %{status_code: 200, body: @arcgis_response, headers: []}} end do
        assert by_lat_lon(@location) == [
                 %Fares.ProposedLocations.Location{
                   fid: 124,
                   latitude: 42.42412295861601,
                   line: "Bus",
                   longitude: -71.17941003354629,
                   municipality: "Arlington",
                   retail_fvm: "Fare vending machine",
                   routes: ["77", "79"],
                   stop_id: "2250",
                   stop_name: "Massachusetts Ave @ Daniels St"
                 }
               ]
      end
    end

    test "by_lat_lon - unsuccessful response due to error in request" do
      with_mock HTTPoison,
        get: fn _url -> {:error, %{}} end do
        assert by_lat_lon(@location) == nil
      end
    end

    test "by_lat_lon - unsuccessful response due to error in parsing" do
      with_mocks([
        {HTTPoison, [],
         [get: fn _url -> {:ok, %{status_code: 200, body: @arcgis_response, headers: []}} end]},
        {Poison, [], [decode: fn _body -> {:error, nil} end]}
      ]) do
        assert by_lat_lon(@location) == nil
      end
    end
  end
end
