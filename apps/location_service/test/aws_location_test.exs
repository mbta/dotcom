defmodule AWSLocationTest do
  use ExUnit.Case, async: true

  @base_operation %ExAws.Operation.RestQuery{
    http_method: :post,
    body: %{
      # copied from GoogleMaps.Geocode @bounds, should import later
      FilterBBox: [-71.9380, 41.3193, -69.6189, 42.8266]
    },
    service: :places
  }

  defp create_operation(:Text, text) do
    @base_operation
    |> Map.put(:path, "/places/v0/indexes/dotcom-dev-here/search/text")
    |> Map.update(:body, %{}, &Map.put_new(&1, :Text, text))
  end

  defp create_operation(:Position, coords) do
    @base_operation
    |> Map.put(:path, "/places/v0/indexes/dotcom-dev-here/search/position")
    |> Map.update(:body, %{}, fn body ->
      Map.put_new(body, :Position, coords)
    end)
  end

  describe "Using AWS Location" do
    test "searches place names to get points (geocodes)" do
      {:ok, %{status_code: 200, body: body}} =
        create_operation(:Text, "Quincy m") |> ExAws.request()

      {:ok, %{"Results" => [result | _]}} = Jason.decode(body)
      %{"Place" => %{"Label" => label} = result_map} = result
      assert %{"Geometry" => %{"Point" => [lon, lat]}} = result_map
      assert String.contains?(label, "Quincy Market")
    end

    test "searches addresses to get points (geocodes)" do
      {:ok, %{status_code: 200, body: body}} =
        create_operation(:Text, "4 Merchants Row") |> ExAws.request()

      {:ok, %{"Results" => [result | _]}} = Jason.decode(body)
      %{"Place" => %{"Label" => label} = result_map} = result
      assert %{"Geometry" => %{"Point" => [lon, lat]}} = result_map
      assert String.contains?(label, "4 Merchants Row")
    end

    test "searches coordinates to get a place (reverse geocodes)" do
      {:ok, %{status_code: 200, body: body}} =
        create_operation(:Position, [-71.05566, 42.35913]) |> ExAws.request()

      {:ok, %{"Results" => [result | _]}} = Jason.decode(body)
      %{"Place" => %{"Label" => label} = result_map} = result
      assert %{"Geometry" => %{"Point" => [-71.05566, 42.35913]}} = result_map
      assert String.contains?(label, "Quincy Market")
    end
  end
end
