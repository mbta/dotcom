defmodule Fares.ProposedLocationsTest do
  use ExUnit.Case, async: false

  import Mox
  import Fares.ProposedLocations

  setup :verify_on_exit!

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
  @arcgis_response %{
    "features" => [
      %{
        "attributes" => %{
          "FID" => 124,
          "Line" => "Bus",
          "RetailFVM" => "Fare vending machine",
          "Routes" => "77, 79",
          "municipali" => "Arlington",
          "stop_id" => "2250",
          "stop_name" => "Massachusetts Ave @ Daniels St"
        },
        "geometry" => %{"x" => -71.17941003354629, "y" => 42.42412295861601}
      }
    ],
    "fields" => [],
    "geometryType" => "esriGeometryPoint",
    "globalIdFieldName" => "",
    "objectIdFieldName" => "FID",
    "spatialReference" => %{"latestWkid" => 4326, "wkid" => 4326},
    "uniqueIdField" => %{"isSystemMaintained" => true, "name" => "FID"}
  }

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
      Req.Mock
      |> expect(:get, fn _, _ ->
        {:ok, %Req.Response{status: 200, body: @arcgis_response}}
      end)

      assert by_lat_lon(@location) == [@proposed_location]
    end

    test "by_lat_lon - unsuccessful response due to error in request" do
      Req.Mock
      |> expect(:get, fn _, _ -> {:error, %{}} end)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert by_lat_lon(@location) == nil
        end)

      assert log =~ "error in http request"
    end

    test "by_lat_lon - unsuccessful response due to unexpected data" do
      Req.Mock
      |> expect(:get, fn _, _ -> {:ok, %Req.Response{status: 200, body: %{}}} end)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert by_lat_lon(@location) == nil
        end)

      assert log =~ "error in http request"
    end

    test "returns nearby locations given a lat and a long" do
      Req.Mock
      |> expect(:get, fn _, _ ->
        {:ok, %Req.Response{status: 200, body: @arcgis_response}}
      end)

      locations =
        Fares.ProposedLocations.get_nearby(%{latitude: 42.352271, longitude: -71.055242})

      assert is_list(locations)
      assert length(locations) > 0
    end
  end
end
