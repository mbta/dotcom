defmodule SiteWeb.ScheduleController.AllStopsTest do
  use SiteWeb.ConnCase, async: true
  alias SiteWeb.ScheduleController.AllStops
  alias Stops.Stop

  @moduletag :external

  test "gets all Blue line stops", %{conn: conn} do
    conn =
      conn
      |> assign(:date, Util.service_date())
      |> assign(:date_in_rating?, true)
      |> assign(:direction_id, 1)
      |> assign(:route, %Routes.Route{id: "Blue"})
      |> AllStops.call(repo_fn: &stops_by_route/3)

    assert conn.assigns.all_stops == stops_by_route("Blue", 1, date: Util.service_date())
  end

  test "still fetches stops if provided date is outside of the rating", %{conn: conn} do
    date =
      Schedules.Repo.end_of_rating()
      |> Timex.shift(days: 2)

    assert %Plug.Conn{assigns: %{all_stops: outside_rating}} =
             conn
             |> assign(:date, date)
             |> assign(:date_in_rating?, false)
             |> assign(:direction_id, 1)
             |> assign(:route, %Routes.Route{id: "Red"})
             |> AllStops.call(repo_fn: &stops_by_route/3)

    assert %Plug.Conn{assigns: %{all_stops: today}} =
             conn
             |> assign(:date, Util.service_date())
             |> assign(:date_in_rating?, true)
             |> assign(:direction_id, 1)
             |> assign(:route, %Routes.Route{id: "Red"})
             |> AllStops.call(repo_fn: &stops_by_route/3)

    refute Enum.empty?(outside_rating)
    assert outside_rating == today
  end

  test "returns an empty list if repo returns {:error, _}", %{conn: conn} do
    date = Util.service_date()

    repo_fn = fn "Red", 1, [date: ^date] ->
      {:error, "error"}
    end

    conn =
      conn
      |> assign(:date, date)
      |> assign(:date_in_rating?, true)
      |> assign(:direction_id, 1)
      |> assign(:route, %Routes.Route{id: "Red"})
      |> AllStops.call(repo_fn: repo_fn)

    assert conn.assigns.all_stops == []
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

  def stops_by_route("Blue", 1, date: %Date{}) do
    [
      "place-bomnl",
      "place-gover",
      "place-state",
      "place-aqucl",
      "place-mvbcl",
      "place-aport",
      "place-wimnl",
      "place-orhte",
      "place-sdmnl",
      "place-bmmnl",
      "place-rbmnl",
      "place-wondl"
    ]
    |> Enum.map(&%Stop{id: &1})
  end
end
