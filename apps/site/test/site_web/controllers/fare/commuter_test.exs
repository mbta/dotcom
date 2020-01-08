defmodule SiteWeb.FareController.CommuterTest do
  use SiteWeb.ConnCase, async: true

  alias SiteWeb.FareController.Commuter

  test "finds fares based on origin and destination", %{conn: conn} do
    origin = Stops.Repo.get("place-north")
    destination = Stops.Repo.get("Concord")

    valid_fares =
      conn
      |> assign(:date, ~D[2019-10-21])
      |> assign(:origin, origin)
      |> assign(:destination, destination)
      |> Commuter.fares()

    assert valid_fares == Fares.Repo.all(name: {:zone, "5"})
    refute Enum.any?(valid_fares, fn fare -> match?(%Fares.Fare{name: :foxboro}, fare) end)
  end

  test "includes Zone 4 fares for Foxboro if selection includes Foxboro", %{conn: conn} do
    origin = Stops.Repo.get("place-sstat")
    destination = Stops.Repo.get("place-FS-0049")

    valid_fares =
      conn
      |> assign(:date, ~D[2019-10-21])
      |> assign(:origin, origin)
      |> assign(:destination, destination)
      |> Commuter.fares()

    assert Enum.any?(valid_fares, fn fare -> match?(%Fares.Fare{name: {:zone, "4"}}, fare) end)
    assert Enum.any?(valid_fares, fn fare -> match?(%Fares.Fare{name: :foxboro}, fare) end)
  end
end
