defmodule DotcomWeb.Plugs.RecentlyVisitedTest do
  use DotcomWeb.ConnCase, async: true

  import Mox

  alias DotcomWeb.Plugs.{Cookies, RecentlyVisited}
  alias Routes.Route
  alias Test.Support.Factories

  setup do
    stub(Routes.Repo.Mock, :get, fn
      "Green-" <> _ = route_id -> Factories.Routes.Route.build(:route, id: route_id, type: 0)
      route_id -> Factories.Routes.Route.build(:route, id: route_id)
    end)

    stub(Routes.Repo.Mock, :green_line, fn -> Routes.Repo.green_line() end)
    :ok
  end

  describe "call/2" do
    test "assigns list of routes to :recently_visited if cookie has multiple values", %{
      conn: conn
    } do
      cookies = Map.put(%{}, Cookies.route_cookie_name(), "Red|Green|Green-B|Blue")

      conn =
        conn
        |> Map.put(:cookies, cookies)
        |> RecentlyVisited.call([])

      assert [
               %Route{} = red,
               %Route{} = green,
               %Route{} = green_b,
               %Route{} = blue
             ] = conn.assigns.recently_visited

      assert red.id == "Red"
      assert green.id == "Green"
      assert green_b.id == "Green-B"
      assert blue.id == "Blue"
    end

    test "assigns one route if cookie has a single value", %{conn: conn} do
      cookies = Map.put(%{}, Cookies.route_cookie_name(), "Red")

      conn =
        conn
        |> Map.put(:cookies, cookies)
        |> RecentlyVisited.call([])

      assert [%Route{id: "Red"}] = conn.assigns.recently_visited
    end

    test "does not assign :recently_visited if cookie doesn't exist", %{conn: conn} do
      conn =
        conn
        |> Map.put(:cookies, %{})
        |> RecentlyVisited.call([])

      assert Map.fetch(conn.assigns, :recently_visited) == :error
    end

    test "does not assign :recently_visited if cookie is empty", %{conn: conn} do
      cookies = Map.put(%{}, Cookies.route_cookie_name(), "")

      conn =
        conn
        |> Map.put(:cookies, cookies)
        |> RecentlyVisited.call([])

      assert Map.fetch(conn.assigns, :recently_visited) == :error
    end

    test "does not crash if cookie includes an invalid route id", %{conn: conn} do
      stub(Routes.Repo.Mock, :get, fn
        "fail" -> nil
        route_id -> Factories.Routes.Route.build(:route, id: route_id)
      end)

      cookies = Map.put(%{}, Cookies.route_cookie_name(), "Red|fail")

      conn =
        conn
        |> Map.put(:cookies, cookies)
        |> RecentlyVisited.call([])

      assert {:ok, [%Route{id: "Red"}]} = Map.fetch(conn.assigns, :recently_visited)
    end
  end
end
