defmodule SiteWeb.ScheduleController.OriginDestinationTest do
  use SiteWeb.ConnCase, async: true
  alias SiteWeb.ScheduleController.OriginDestination
  alias Stops.Stop
  import Site.DateHelpers

  defp setup_conn(conn) do
    service_date = Util.service_date() |> non_holiday_date() |> non_weekend_date()

    conn
    |> SiteWeb.Plugs.Route.call([])
    |> assign(:date_time, Util.now())
    |> assign(:date, service_date)
    |> assign(:date_in_rating?, true)
    |> fetch_query_params()
    |> SiteWeb.ScheduleController.Defaults.call([])
    |> SiteWeb.ScheduleController.AllStops.call(repo_fn: &stops_by_route/3)
    |> OriginDestination.call([])
  end

  describe "assigns origin to" do
    test "nil when id not in params", %{conn: conn} do
      conn = setup_conn(%{conn | params: %{"route" => "1"}})
      assert conn.assigns.origin == nil
    end

    test "a %Stop{} when id in params", %{conn: conn} do
      conn =
        setup_conn(%{
          conn
          | params: %{"route" => "1"},
            query_params: %{"schedule_direction" => %{"origin" => "2167", "direction_id" => "1"}}
        })

      assert %Stop{id: "2167"} = conn.assigns.origin
    end

    test "the terminal of a CR line for an outbound trip", %{conn: conn} do
      conn =
        setup_conn(%{
          conn
          | params: %{"route" => "CR-Lowell"},
            query_params: %{"schedule_direction" => %{"direction_id" => "0"}}
        })

      assert %Stop{id: "place-north"} = conn.assigns.origin
    end

    test "nil for inbound CR trips", %{conn: conn} do
      conn =
        setup_conn(%{
          conn
          | params: %{"route" => "CR-Lowell"},
            query_params: %{"schedule_direction" => %{"direction_id" => "1"}}
        })

      assert conn.assigns.origin == nil
    end

    test "a hub station for a bus", %{conn: conn} do
      conn =
        setup_conn(%{
          conn
          | params: %{"route" => "741"},
            query_params: %{"schedule_direction" => %{"direction_id" => "0"}}
        })

      assert conn.assigns.origin.id == "place-sstat"
    end
  end

  describe "assigns destination to" do
    test "nil when id not in params", %{conn: conn} do
      conn = setup_conn(%{conn | params: %{"route" => "1"}})
      assert conn.assigns.destination == nil
    end

    test "a %Stop{} when id in params", %{conn: conn} do
      conn =
        setup_conn(%{
          conn
          | query_params: %{
              "schedule_direction" => %{
                "origin" => "64",
                "destination" => "place-hymnl",
                "direction_id" => "0"
              }
            },
            params: %{"route" => "1"}
        })

      assert %Stop{id: "place-hymnl"} = conn.assigns.destination
    end
  end

  describe "assign origin for green routes" do
    test "direction_id 0", %{conn: conn} do
      conn =
        setup_conn(%{
          conn
          | query_params: %{"schedule_direction" => %{"direction_id" => "0"}},
            params: %{"route" => "Green-E"}
        })

      assert conn.assigns.origin.id == "place-lech"
    end

    test "direction_id 1", %{conn: conn} do
      conn =
        setup_conn(%{
          conn
          | query_params: %{"schedule_direction" => %{"direction_id" => "1"}},
            params: %{"route" => "Green-E"}
        })

      assert conn.assigns.origin.id == "place-hsmnl"
    end
  end

  describe "assures that stops exist based on direction:" do
    test "when both origin and destination exist, assigns both as %Stop{} structs", %{conn: conn} do
      conn =
        setup_conn(%{
          conn
          | params: %{"route" => "1"},
            query_params: %{
              "schedule_direction" => %{
                "origin" => "place-hymnl",
                "destination" => "64",
                "direction_id" => "1"
              }
            }
        })

      refute conn.assigns.origin == nil
      assert conn.assigns.origin.id == "place-hymnl"
      refute conn.assigns.destination == nil

      # Temporary fix to cover the transition period from the stop ID "place-dudly" to the new "place-nubn". Once the "place-nubn" data change is live in production, we can revert to the simple equality check. -- MSS 20200914
      # assert conn.assigns.destination.id == "place-dudly"
      assert Enum.member?(["place-dudly", "place-nubn"], conn.assigns.destination.id)
      assert conn.assigns.direction_id == 1
    end

    test "when origin exists and there's no destination, origin is a %Stop{} and destination is nil",
         %{conn: conn} do
      conn =
        setup_conn(%{
          conn
          | params: %{"route" => "1"},
            query_params: %{
              "schedule_direction" => %{"origin" => "place-hymnl", "direction_id" => "1"}
            }
        })

      refute conn.assigns.origin == nil
      assert conn.assigns.origin.id == "place-hymnl"
      assert conn.assigns.destination == nil
      assert conn.assigns.direction_id == 1
    end

    test "when origin does not exist, redirects to schedules page with no stops selected", %{
      conn: conn
    } do
      path = schedule_path(conn, :show, "1")

      conn =
        setup_conn(%{
          conn
          | request_path: path,
            params: %{"route" => "1"},
            query_params: %{
              "schedule_direction" => %{
                "origin" => "87",
                "destination" => "64",
                "direction_id" => "1"
              }
            }
        })

      assert redirected_to(conn, 302) ==
               path <>
                 "?schedule_direction[destination]=&schedule_direction[direction_id]=1&schedule_direction[origin]="
    end

    test "when neither origin or destination exist, redirects to schedules page with no stops selected",
         %{conn: conn} do
      path = schedule_path(conn, :show, "1")

      conn =
        setup_conn(%{
          conn
          | params: %{"route" => "1"},
            request_path: path,
            query_params: %{
              "schedule_direction" => %{
                "origin" => "87",
                "destination" => "101",
                "direction_id" => "1"
              }
            }
        })

      assert redirected_to(conn, 302) ==
               path <>
                 "?schedule_direction[destination]=&schedule_direction[direction_id]=1&schedule_direction[origin]="
    end

    test "when origin exists but is at the end of the line, redirects to the page with no origin selected",
         %{conn: conn} do
      conn =
        setup_conn(%{
          conn
          | params: %{"route" => "Orange"},
            request_path: schedule_path(conn, :show, "Orange"),
            query_params: %{
              "schedule_direction" => %{"origin" => "place-ogmnl", "direction_id" => "1"}
            }
        })

      assert redirected_to(conn, 302) ==
               schedule_path(conn, :show, "Orange",
                 schedule_direction: %{destination: "", direction_id: "1", origin: ""}
               )
    end

    test "when origin and destination are on opposite Red Line branches, redirects to the page with no destination",
         %{conn: conn} do
      conn =
        setup_conn(%{
          conn
          | params: %{"route" => "Red"},
            request_path: schedule_path(conn, :show, "Red"),
            query_params: %{
              "schedule_direction" => %{
                "destination" => "place-asmnl",
                "origin" => "place-qamnl",
                "direction_id" => "0"
              }
            }
        })

      assert redirected_to(conn, 302) ==
               schedule_path(conn, :show, "Red",
                 schedule_direction: %{destination: "", direction_id: "0", origin: "place-qamnl"}
               )
    end

    test "when origin and destination are the same, redirects with only origin selected", %{
      conn: conn
    } do
      conn =
        setup_conn(%{
          conn
          | params: %{"route" => "CR-Lowell"},
            request_path: schedule_path(conn, :show, "CR-Lowell"),
            query_params: %{
              "schedule_direction" => %{
                "destination" => "West Medford",
                "origin" => "West Medford",
                "direction_id" => "0"
              }
            }
        })

      assert redirected_to(conn, 302) ==
               schedule_path(conn, :show, "CR-Lowell",
                 schedule_direction: %{destination: "", direction_id: "0", origin: "West Medford"}
               )
    end
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

  def stops_by_route("1", 1, date: %Date{}) do
    [
      "110",
      "2168",
      "2166",
      "2167",
      "66",
      "67",
      "68",
      "69",
      "71",
      "72",
      "73",
      "74",
      "75",
      "77",
      "place-hymnl",
      "80",
      "82",
      "place-masta",
      "83",
      "84",
      "59",
      "854",
      "856",
      "10100",
      "10101",
      "62",
      "63",
      "64"
    ]
    |> Enum.map(&%Stop{id: &1})
  end

  def stops_by_route("1", 0, date: %Date{}) do
    [
      "64",
      "1",
      "2",
      "6",
      "10003",
      "57",
      "58",
      "10590",
      "87",
      "88",
      "place-masta",
      "89",
      "91",
      "place-hymnl",
      "95",
      "97",
      "99",
      "101",
      "102",
      "104",
      "106",
      "107",
      "108",
      "109",
      "110"
    ]
    |> Enum.map(&%Stop{id: &1})
  end

  def stops_by_route("741", 0, date: %Date{}) do
    ["place-sstat", "place-crtst", "place-wtcst", "74624", "17091"]
    |> Enum.map(&%Stop{id: &1})
  end

  def stops_by_route("CR-Lowell", 0, date: %Date{}) do
    [
      "place-north",
      "West Medford",
      "Wedgemere",
      "Winchester Center",
      "Mishawum",
      "Anderson/ Woburn",
      "Wilmington",
      "North Billerica",
      "Lowell"
    ]
    |> Enum.map(&%Stop{id: &1})
  end

  def stops_by_route("CR-Lowell", 1, date: %Date{}) do
    [
      "Lowell",
      "North Billerica",
      "Wilmington",
      "Anderson/ Woburn",
      "Mishawum",
      "Winchester Center",
      "Wedgemere",
      "West Medford",
      "place-north"
    ]
    |> Enum.map(&%Stop{id: &1})
  end

  def stops_by_route("Green-E", 0, date: %Date{}) do
    [
      "place-lech",
      "place-spmnl",
      "place-north",
      "place-haecl",
      "place-gover",
      "place-pktrm",
      "place-boyls",
      "place-armnl",
      "place-coecl",
      "place-prmnl",
      "place-symcl",
      "place-nuniv",
      "place-mfa",
      "place-lngmd",
      "place-brmnl",
      "place-fenwd",
      "place-mispk",
      "place-rvrwy",
      "place-bckhl",
      "place-hsmnl"
    ]
    |> Enum.map(&%Stop{id: &1})
  end

  def stops_by_route("Green-E", 1, date: %Date{}) do
    [
      "place-hsmnl",
      "place-bckhl",
      "place-rvrwy",
      "place-mispk",
      "place-fenwd",
      "place-brmnl",
      "place-lngmd",
      "place-mfa",
      "place-nuniv",
      "place-symcl",
      "place-prmnl",
      "place-coecl",
      "place-armnl",
      "place-boyls",
      "place-pktrm",
      "place-gover",
      "place-haecl",
      "place-north",
      "place-spmnl",
      "place-lech"
    ]
    |> Enum.map(&%Stop{id: &1})
  end

  def stops_by_route("Orange", 1, date: %Date{}) do
    [
      "place-forhl",
      "place-grnst",
      "place-sbmnl",
      "place-jaksn",
      "place-rcmnl",
      "place-rugg",
      "place-masta",
      "place-bbsta",
      "place-tumnl",
      "place-chncl",
      "place-dwnxg",
      "place-state",
      "place-haecl",
      "place-north",
      "place-ccmnl",
      "place-sull",
      "place-astao",
      "place-welln",
      "place-mlmnl",
      "place-ogmnl"
    ]
    |> Enum.map(&%Stop{id: &1})
  end
end
