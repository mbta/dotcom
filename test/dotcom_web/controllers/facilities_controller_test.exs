defmodule DotcomWeb.FacilitiesControllerTest do
  use DotcomWeb.ConnCase

  import Mock

  alias MBTA.Api.Facilities

  describe "get_facilities/1" do
    setup_with_mocks([
      {Facilities, [],
       [
         filter_by: fn _x ->
           %{
             data: [
               %{
                 attributes: %{
                   long_name: "the elevator at Davis",
                   short_name: "Davis Elevator",
                   type: "ELEVATOR"
                 },
                 id: "123"
               },
               %{
                 attributes: %{
                   long_name: "Davis bike storage on east side",
                   short_name: "Davis bike storage east",
                   type: "BIKE_STORAGE"
                 },
                 id: "256"
               }
             ],
             links: %{}
           }
         end
       ]}
    ]) do
      :ok
    end

    test "returns facilities data", %{conn: conn} do
      conn = get(conn, facilities_path(conn, :get_facilities, "stop_id"))
      response = json_response(conn, 200)

      assert [
               %{
                 "attributes" => %{
                   "long_name" => "the elevator at Davis",
                   "short_name" => "Davis Elevator",
                   "type" => "ELEVATOR"
                 },
                 "id" => "123"
               },
               %{
                 "attributes" => %{
                   "long_name" => "Davis bike storage on east side",
                   "short_name" => "Davis bike storage east",
                   "type" => "BIKE_STORAGE"
                 },
                 "id" => "256"
               }
             ] = response
    end
  end

  describe "get_facilities/2" do
    setup_with_mocks([
      {Facilities, [],
       [
         filter_by: fn x ->
           {:error, x}
         end
       ]}
    ]) do
      :ok
    end

    test "returns when error happens at filter", %{conn: conn} do
      conn = get(conn, facilities_path(conn, :get_facilities, "stop_id_123"))
      response = json_response(conn, 500)

      assert %{"error" => "Internal error"} = response
    end
  end
end
