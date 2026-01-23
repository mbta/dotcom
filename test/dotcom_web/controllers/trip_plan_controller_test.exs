defmodule DotcomWeb.TripPlanControllerTest do
  use DotcomWeb.ConnCase, async: true

  import Mox

  setup :verify_on_exit!

  describe "location/2" do
    test "from|to/query redirects with an encoded plan when the location is found", %{conn: conn} do
      # Setup
      expect(LocationService.Mock, :geocode, 2, fn _ ->
        {:ok,
         [
           %LocationService.Address{
             latitude: Faker.Address.latitude(),
             longitude: Faker.Address.longitude()
           }
         ]}
      end)

      path = live_path(conn, DotcomWeb.TripPlannerLive)
      query = Faker.Address.street_address() |> URI.encode()

      Enum.each(["from", "to"], fn direction ->
        # Exercise
        conn = get(conn, "#{path}/#{direction}/#{query}")

        # Verify
        assert redirected_to(conn, 301) =~ path <> "?plan="
      end)
    end

    test "from|to/query redirects with an encoded plan when lat/lon are present", %{conn: conn} do
      # Setup
      path = live_path(conn, DotcomWeb.TripPlannerLive)
      latitude = Faker.Address.latitude()
      longitude = Faker.Address.longitude()
      query = "#{latitude},#{longitude}" |> URI.encode()

      Enum.each(["from", "to"], fn direction ->
        # Exercise
        conn = get(conn, "#{path}/#{direction}/#{query}")

        # Verify
        assert redirected_to(conn, 301) =~ path <> "?plan="
      end)
    end
  end
end
