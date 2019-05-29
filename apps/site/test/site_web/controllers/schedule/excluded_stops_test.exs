defmodule SiteWeb.ScheduleController.ExcludedStopsTest do
  use SiteWeb.ConnCase, async: true
  alias SiteWeb.ScheduleController.AllStops
  alias SiteWeb.ScheduleController.ExcludedStops
  alias Stops.Stop

  defp conn_with_route(conn, route_id, opts) do
    conn =
      conn
      |> assign(:date, Util.service_date())
      |> assign(:date_in_rating?, true)
      |> assign(:route, %Routes.Route{id: route_id})

    conn = Enum.reduce(opts, conn, fn {key, value}, conn -> assign(conn, key, value) end)

    AllStops.call(conn, repo_fn: &stops_by_route/3)
  end

  test "exclusions use normal lines on non-red lines", %{conn: conn} do
    conn =
      conn
      |> conn_with_route("Green-B", origin: %Stop{id: "place-lake"}, direction_id: 1)
      |> ExcludedStops.call([])

    assert conn.assigns.excluded_origin_stops == ["place-pktrm"]
    assert conn.assigns.excluded_destination_stops == []
  end

  test "exclusions use the direction_id to exclude the last stop", %{conn: conn} do
    conn =
      conn
      |> conn_with_route("Green-B", origin: %Stop{id: "place-pktrm"}, direction_id: 0)
      |> ExcludedStops.call([])

    assert conn.assigns.excluded_origin_stops == ["place-lake"]
    assert conn.assigns.excluded_destination_stops == []
  end

  test "destination_stops and all_stops are the same on southbound red line trips", %{conn: conn} do
    conn =
      conn
      |> conn_with_route("Red", origin: %Stop{id: "place-alfcl"}, direction_id: 0)
      |> ExcludedStops.call([])

    assert conn.assigns.excluded_origin_stops == ["place-brntn", "place-asmnl"]
    assert conn.assigns.excluded_destination_stops == []
  end

  test "destination_stops does not include Ashmont stops on northbound Braintree trips", %{
    conn: conn
  } do
    conn =
      conn
      |> conn_with_route("Red", origin: %Stop{id: "place-brntn"}, direction_id: 1)
      |> ExcludedStops.call([])

    assert "place-smmnl" in conn.assigns.excluded_destination_stops
  end

  test "destination_stops does not include Braintree stops on northbound Ashmont trips", %{
    conn: conn
  } do
    conn =
      conn
      |> conn_with_route("Red", origin: %Stop{id: "place-asmnl"}, direction_id: 1)
      |> ExcludedStops.call([])

    assert "place-qamnl" in conn.assigns.excluded_destination_stops
  end

  test "assigns both to an empty list if there aren't any stops or a route", %{conn: conn} do
    result = ExcludedStops.call(conn, []).assigns

    assert result.excluded_origin_stops == []
    assert result.excluded_destination_stops == []
  end

  def stops_by_route("Green-B", 0, date: %Date{}) do
    [
      "place-pktrm",
      "place-boyls",
      "place-armnl",
      "place-coecl",
      "place-hymnl",
      "place-kencl",
      "place-bland",
      "place-buest",
      "place-bucen",
      "place-buwst",
      "place-stplb",
      "place-plsgr",
      "place-babck",
      "place-brico",
      "place-harvd",
      "place-grigg",
      "place-alsgr",
      "place-wrnst",
      "place-wascm",
      "place-sthld",
      "place-chswk",
      "place-chill",
      "place-sougr",
      "place-lake"
    ]
    |> Enum.map(&%Stop{id: &1})
  end

  def stops_by_route("Green-B", 1, date: %Date{}) do
    [
      "place-lake",
      "place-sougr",
      "place-chill",
      "place-chswk",
      "place-sthld",
      "place-wascm",
      "place-wrnst",
      "place-alsgr",
      "place-grigg",
      "place-harvd",
      "place-brico",
      "place-babck",
      "place-plsgr",
      "place-stplb",
      "place-buwst",
      "place-bucen",
      "place-buest",
      "place-bland",
      "place-kencl",
      "place-hymnl",
      "place-coecl",
      "place-armnl",
      "place-boyls",
      "place-pktrm"
    ]
    |> Enum.map(&%Stop{id: &1})
  end

  def stops_by_route("Red", 0, date: %Date{}) do
    [
      "place-alfcl",
      "place-davis",
      "place-portr",
      "place-harsq",
      "place-cntsq",
      "place-knncl",
      "place-chmnl",
      "place-pktrm",
      "place-dwnxg",
      "place-sstat",
      "place-brdwy",
      "place-andrw",
      "place-jfk",
      "place-shmnl",
      "place-fldcr",
      "place-smmnl",
      "place-asmnl",
      "place-nqncy",
      "place-qnctr",
      "place-qamnl",
      "place-brntn"
    ]
    |> Enum.map(&%Stop{id: &1})
  end

  def stops_by_route("Red", 1, date: %Date{}) do
    [
      "place-brntn",
      "place-qamnl",
      "place-qnctr",
      "place-nqncy",
      "place-asmnl",
      "place-smmnl",
      "place-fldcr",
      "place-shmnl",
      "place-jfk",
      "place-andrw",
      "place-brdwy",
      "place-sstat",
      "place-dwnxg",
      "place-pktrm",
      "place-chmnl",
      "place-knncl",
      "place-cntsq",
      "place-harsq",
      "place-portr",
      "place-davis",
      "place-alfcl"
    ]
    |> Enum.map(&%Stop{id: &1})
  end
end
