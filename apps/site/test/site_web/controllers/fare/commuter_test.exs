defmodule SiteWeb.FareController.CommuterTest do
  use SiteWeb.ConnCase, async: true

  test "finds fares based on origin and destination", %{conn: conn} do
    origin = Stops.Repo.get("place-north")
    destination = Stops.Repo.get("Concord")

    conn =
      conn
      |> assign(:origin, origin)
      |> assign(:destination, destination)

    assert SiteWeb.FareController.Commuter.fares(conn) == Fares.Repo.all(name: {:zone, "5"})
  end
end
