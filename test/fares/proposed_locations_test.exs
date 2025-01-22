defmodule Fares.ProposedLocationsTest do
  use ExUnit.Case, async: false

  import Fares.ProposedLocations
  import Mock

  @location %{latitude: 42.42412295861601, longitude: -71.17941003354629}

  @proposed_location %Fares.ProposedLocations.Location{
    fid: 124,
    latitude: 42.42412295861601,
    line: "Bus",
    longitude: -71.17941003354629,
    municipality: "Arlington",
    retail_fvm: "Fare vending machine",
    routes: ["77", "79"],
    stop_id: "2250",
    name: "Massachusetts Ave @ Daniels St"
  }
  @arcgis_response ~s({
    "objectIdFieldName" : "FID",
    "uniqueIdField" :
    {
      "name" : "FID",
      "isSystemMaintained" : true
    },
    "globalIdFieldName" : "",
    "geometryType" : "esriGeometryPoint",
    "spatialReference" : {
      "wkid" : 4326,
      "latestWkid" : 4326
    },
    "fields" : [],
    "features" : [
      {
        "attributes" : {
          "FID" : 124,
          "stop_id" : "2250",
          "stop_name" : "Massachusetts Ave @ Daniels St",
          "municipali" : "Arlington",
          "Line" : "Bus",
          "RetailFVM" : "Fare vending machine",
          "Routes" : "77, 79"
        },
        "geometry" :
        {
          "x" : -71.17941003354629,
          "y" : 42.42412295861601
        }
      }
    ]
  })

  describe "coordinates" do
    test "latitude" do
      assert Util.Position.latitude(@proposed_location) == 42.42412295861601
    end

    test "longitude" do
      assert Util.Position.longitude(@proposed_location) == -71.17941003354629
    end
  end

  describe "requests data from ArcGIS and parses the response into a list of locations" do
    test "by_lat_lon - successful parsed response" do
      with_mock HTTPoison,
        get: fn _url -> {:ok, %{status_code: 200, body: @arcgis_response, headers: []}} end do
        assert by_lat_lon(@location) == [@proposed_location]
      end
    end

    test "by_lat_lon - unsuccessful response due to error in request" do
      with_mock HTTPoison,
        get: fn _url -> {:error, %{}} end do
        log =
          ExUnit.CaptureLog.capture_log(fn ->
            assert by_lat_lon(@location) == nil
          end)

        assert log =~ "error in http request"
      end
    end

    test "by_lat_lon - unsuccessful response due to error in parsing" do
      with_mocks([
        {HTTPoison, [], [get: fn _url -> {:ok, %{status_code: 200, body: @arcgis_response, headers: []}} end]},
        {Poison, [], [decode: fn _body -> {:error, nil} end]}
      ]) do
        log =
          ExUnit.CaptureLog.capture_log(fn ->
            assert by_lat_lon(@location) == nil
          end)

        assert log =~ "error decoding json"
      end
    end

    @tag :external
    test "returns nearby locations given a lat and a long" do
      locations =
        Fares.ProposedLocations.get_nearby(%{latitude: 42.352271, longitude: -71.055242})

      assert is_list(locations)
      assert length(locations) > 0
    end
  end
end
