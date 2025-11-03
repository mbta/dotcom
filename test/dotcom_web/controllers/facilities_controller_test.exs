defmodule DotcomWeb.FacilitiesControllerTest do
  use DotcomWeb.ConnCase

  import Mox

  setup :verify_on_exit!

  describe "get_facilities/2" do
    test "returns facilities data", %{conn: conn} do
      stop_id = Faker.Internet.slug()
      facility_data = Test.Support.Factories.MBTA.Api.build_list(2, :facility_item)

      expect(MBTA.Api.Mock, :get_json, fn "/facilities/", opts ->
        assert {"filter[stop]", stop_id} in opts
        %JsonApi{links: %{}, data: facility_data}
      end)

      conn = get(conn, facilities_path(conn, :get_facilities, stop_id))
      assert [_ | _] = json_response(conn, 200)
    end

    test "returns when error happens at filter", %{conn: conn} do
      expect(MBTA.Api.Mock, :get_json, fn _, _ ->
        {:error, nil}
      end)

      conn = get(conn, facilities_path(conn, :get_facilities, Faker.Internet.slug()))
      response = json_response(conn, 500)
      assert %{"error" => "Internal error"} = response
    end
  end
end
