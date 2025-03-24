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

      path = live_path(conn, DotcomWeb.Live.TripPlanner)
      query = Faker.Address.street_address() |> URI.encode()

      Enum.each(["from", "to"], fn direction ->
        # Exercise
        conn = get(conn, "#{path}/#{direction}/#{query}")

        # Verify
        assert redirected_to(conn, 301) =~ path <> "?plan="
      end)
    end

    test "from|to/query redirects w/out an encoded plan when no location is found", %{conn: conn} do
      # Setup
      expect(LocationService.Mock, :geocode, fn _ ->
        {:error, :not_found}
      end)

      path = live_path(conn, DotcomWeb.Live.TripPlanner)
      direction = Faker.Util.pick(["from", "to"])
      query = Faker.Address.street_address() |> URI.encode()

      # Exercise
      conn = get(conn, "#{path}/#{direction}/#{query}")

      # Verify
      assert redirected_to(conn, 301) == path
    end
  end
end
