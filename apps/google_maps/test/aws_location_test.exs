defmodule AWSLocationTest do
  use ExUnit.Case, async: true

  # BBox copied from GoogleMaps.Geocode @bounds, should import later
  @default_options %{
    FilterBBox: [-71.9380, 41.3193, -69.6189, 42.8266]
  }

  # TODO: Move index, urls, etc to config
  @place_index "dotcom-dev-here"
  @client %AWS.Client{
    access_key_id: System.get_env("AWS_ACCESS_KEY_ID", ""),
    secret_access_key: System.get_env("AWS_SECRET_ACCESS_KEY", ""),
    endpoint: "places.geo.us-east-1.amazonaws.com"
  }

  describe "Using AWS Location" do
    test "searches place names to get points (geocodes)" do
      input = Map.put_new(@default_options, :Text, "Quincy m")

      {:ok, %{"Results" => [result | _]}, %{status_code: 200}} =
        AWS.Location.search_place_index_for_text(@client, @place_index, input)

      %{"Place" => %{"Label" => label} = result_map} = result
      assert %{"Geometry" => %{"Point" => [lon, lat]}} = result_map
      assert String.contains?(label, "Quincy Market")
    end

    test "searches addresses to get points (geocodes)" do
      input = Map.put_new(@default_options, :Text, "4 Merchants Row")

      {:ok, %{"Results" => [result | _]}, %{status_code: 200}} =
        AWS.Location.search_place_index_for_text(@client, @place_index, input)

      %{"Place" => %{"Label" => label} = result_map} = result
      assert %{"Geometry" => %{"Point" => [lon, lat]}} = result_map
      assert String.contains?(label, "4 Merchants Row")
    end

    test "searches coordinates to get a place (reverse geocodes)" do
      input = Map.put_new(@default_options, :Position, [-71.05566, 42.35913])

      {:ok, %{"Results" => [result | _]}, %{status_code: 200}} =
        AWS.Location.search_place_index_for_position(@client, @place_index, input)

      %{"Place" => %{"Label" => label} = result_map} = result
      assert %{"Geometry" => %{"Point" => [-71.05566, 42.35913]}} = result_map
      assert String.contains?(label, "Quincy Market")
    end
  end
end
