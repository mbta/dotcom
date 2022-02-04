defmodule GoogleMapsTest do
  use ExUnit.Case, async: true

  # Needs to be 27 characters followed by =
  @signing_key "testtesttesttesttesttesttes="
  @location_1 %{lat: 42.354199, lng: -71.07399}
  @location_2 %{lat: 42.34735, lng: -71.075727}

  # To verify signatures, you can use the online version at
  # https://developers.google.com/maps/documentation/static-maps/get-api-key#dig-sig-key

  describe "signed_url/2" do
    test "appends the signature to the URL" do
      assert GoogleMaps.signed_url(
               "/maps/api/staticmap/?arg",
               client_id: "test",
               signing_key: @signing_key
             ) ==
               "https://maps.googleapis.com/maps/api/staticmap/?arg&client=test&signature=WsuBDD9RmzhtKESUiUKgzjgRGaU="
    end

    test "appends the signature even without an existing query" do
      assert GoogleMaps.signed_url(
               "/maps/api/staticmap/",
               client_id: "test",
               signing_key: @signing_key
             ) ==
               "https://maps.googleapis.com/maps/api/staticmap/?client=test&signature=GqNL1_FyAXxPIy75Azb7Tohdg-k="
    end
  end

  describe "unsigned_url/2" do
    test "appends the client ID to the URL" do
      assert GoogleMaps.unsigned_url(
               "/maps/api/staticmap/?arg",
               client_id: "test",
               signing_key: @signing_key
             ) == "https://maps.googleapis.com/maps/api/staticmap/?arg&client=test"
    end

    test "appends the API key if the client_id is nil or empty string" do
      for client_id <- ["", nil] do
        opts = [client_id: client_id, signing_key: "", google_api_key: "key"]
        url = GoogleMaps.unsigned_url("/maps/api/staticmap", opts)
        assert url =~ "?key=key"
      end
    end
  end

  describe "direction_map_url/2" do
    test "returns a correctly formatted url" do
      url =
        GoogleMaps.direction_map_url(
          {@location_1.lat, @location_1.lng},
          {@location_2.lat, @location_2.lng}
        )

      assert url ==
               "https://maps.google.com" <>
                 Path.join([
                   "/",
                   "maps",
                   "dir",
                   URI.encode("#{@location_1.lat},#{@location_1.lng}"),
                   URI.encode("#{@location_2.lat},#{@location_2.lng}")
                 ])
    end
  end
end
