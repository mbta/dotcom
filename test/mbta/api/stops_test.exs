defmodule MBTA.Api.StopsTest do
  use ExUnit.Case, async: false

  import Mox

  setup :set_mox_global
  setup :verify_on_exit!

  @url Faker.Internet.url()

  describe "by_gtfs_id/1" do
    test "gets the parent station info" do
      expect(HTTPoison.Mock, :get, fn url, _, opts ->
        assert url == "#{@url}/stops/123"
        assert opts[:params] == [include: "parent_station,facilities"]

        {:ok, %HTTPoison.Response{status_code: 200, body: ~s({"data": []})}}
      end)

      response =
        MBTA.Api.Stops.by_gtfs_id("123", [include: "parent_station,facilities"], base_url: @url)

      assert %JsonApi{} = response
    end
  end
end
