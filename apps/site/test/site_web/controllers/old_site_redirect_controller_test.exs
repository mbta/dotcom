defmodule SiteWeb.OldSiteRedirectControllerTest do
  use SiteWeb.ConnCase

  @routes_repo_api Application.get_env(:routes, :routes_repo_api)

  describe "/schedules_and_maps" do
    test "redirects to mode root", %{conn: conn} do
      assert redirected_to(get(conn, "/schedules_and_maps"), :moved_permanently) ==
               mode_path(conn, :index)
    end

    test "Redirects to new schedules based on old route", %{conn: conn} do
      old_url = "/schedules_and_maps/anything?route=RED"

      assert redirected_to(get(conn, old_url), :moved_permanently) =~
               schedule_path(SiteWeb.Endpoint, :show, "Red")
    end

    test "Redirects all bus routes correctly", %{conn: conn} do
      3
      |> @routes_repo_api.by_type()
      |> Enum.each(fn %Routes.Route{name: name, id: route_id} ->
        old_bus_url = "/schedules_and_maps/anything?route=#{name}"

        assert redirected_to(get(conn, old_bus_url), :moved_permanently) =~
                 schedule_path(SiteWeb.Endpoint, :show, route_id)
      end)
    end

    test "Redirects to /schedules if unknown route in old format", %{conn: conn} do
      old_url = "/schedules_and_maps/anything?route=unknown"
      assert redirected_to(get(conn, old_url), :moved_permanently) =~ "/schedules"
    end

    test "Subway stop redirected to subway stops page", %{conn: conn} do
      old_url = "/schedules_and_maps/subway/lines/stations/"

      assert redirected_to(get(conn, old_url), :moved_permanently) =~
               stop_path(SiteWeb.Endpoint, :show, :subway)
    end

    test "Commuter stop redirected to commuter rail stops page", %{conn: conn} do
      old_url = "/schedules_and_maps/rail/lines/stations/"

      assert redirected_to(get(conn, old_url), :moved_permanently) =~
               stop_path(SiteWeb.Endpoint, :show, :commuter_rail)
    end

    test "Ferry stop redirected to ferry stops page", %{conn: conn} do
      old_url = "/schedules_and_maps/boats/lines/stations/"

      assert redirected_to(get(conn, old_url), :moved_permanently) =~
               stop_path(SiteWeb.Endpoint, :show, :ferry)
    end

    test "Specific stops redirect to corresponding stop page", %{conn: conn} do
      old_url = "/schedules_and_maps/rail/lines/stations/?stopId=19"

      assert redirected_to(get(conn, old_url), :moved_permanently) =~
               stop_path(SiteWeb.Endpoint, :show, "place-ER-0183")
    end

    test "Other rail routes redirected to commuter rail stops page", %{conn: conn} do
      old_url = "/schedules_and_maps/rail/something/else"

      assert redirected_to(get(conn, old_url), :moved_permanently) =~
               mode_path(SiteWeb.Endpoint, :commuter_rail)
    end

    test "Other ferry routes redirected to ferry stops page", %{conn: conn} do
      old_url = "/schedules_and_maps/boats/something/else"

      assert redirected_to(get(conn, old_url), :moved_permanently) =~
               mode_path(SiteWeb.Endpoint, :ferry)
    end

    test "Other subway routes redirected to subway stops page", %{conn: conn} do
      old_url = "/schedules_and_maps/subway/something/else"

      assert redirected_to(get(conn, old_url), :moved_permanently) =~
               mode_path(SiteWeb.Endpoint, :subway)
    end

    test "Other bus routes redirected to bus stops page", %{conn: conn} do
      old_url = "/schedules_and_maps/bus/something/else"

      assert redirected_to(get(conn, old_url), :moved_permanently) =~
               mode_path(SiteWeb.Endpoint, :bus)
    end

    test "Redirects to stop page regardless of incoming mode", %{conn: conn} do
      north_station_subway = "/schedules_and_maps/subway/lines/stations?stopId=141"
      north_station_rail = "/schedules_and_maps/rail/lines/stations?stopId=13610"

      assert redirected_to(get(conn, north_station_subway), :moved_permanently) =~
               stop_path(SiteWeb.Endpoint, :show, "place-north")

      assert redirected_to(get(conn, north_station_rail), :moved_permanently) =~
               stop_path(SiteWeb.Endpoint, :show, "place-north")
    end

    test "Redirects to /schedules if stopId is not found", %{conn: conn} do
      invalid_rail_url = "/schedules_and_maps/rail/lines/stations?stopId=invalidstopid"
      assert redirected_to(get(conn, invalid_rail_url), :moved_permanently) == "/schedules"
    end

    test "redirects to /maps for system_map", %{conn: conn} do
      assert redirected_to(get(conn, "/schedules_and_maps/system_map"), :moved_permanently) ==
               "/maps"
    end

    test "Redirects to /schedules if unknown route", %{conn: conn} do
      unknown_url = "/schedules_and_maps/something/unknown"
      assert redirected_to(get(conn, unknown_url), :moved_permanently) == "/schedules"
    end
  end
end
