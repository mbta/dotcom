defmodule Site.ReactTest do
  use ExUnit.Case, async: true

  alias ExUnit.CaptureLog
  alias GoogleMaps.Geocode.Address
  alias Site.{React, TransitNearMe}
  alias Site.React.Worker
  alias SiteWeb.TransitNearMeController.StopsWithRoutes

  @address %Address{
    latitude: 42.352271,
    longitude: -71.055242,
    formatted: "South Station"
  }
  @date Util.service_date()

  describe "render/2" do
    setup do
      now = Util.now()

      data = TransitNearMe.build(@address, date: @date, now: now)

      route_sidebar_data = TransitNearMe.schedules_for_routes(data, [], now: now)

      stop_sidebar_data = StopsWithRoutes.stops_with_routes(data)

      {:ok, %{route_sidebar_data: route_sidebar_data, stop_sidebar_data: stop_sidebar_data}}
    end

    test "renders a component, even when the component has a lot of data", %{
      route_sidebar_data: route_sidebar_data,
      stop_sidebar_data: stop_sidebar_data
    } do
      assert {:safe, body} =
               React.render("TransitNearMe", %{
                 query: %{},
                 mapId: "map-id",
                 mapData: %{markers: []},
                 routeSidebarData: route_sidebar_data,
                 stopSidebarData: stop_sidebar_data
               })

      assert body =~ "m-tnm-sidebar"
    end

    test "fails with unknown component" do
      log =
        CaptureLog.capture_log(fn ->
          assert "" ==
                   React.render("TransitNearMeError", %{
                     query: %{},
                     mapId: "map-id",
                     mapData: %{markers: []},
                     routeSidebarData: [],
                     stopSidebarData: []
                   })
        end)

      assert log =~
               "react_renderer component=TransitNearMeError Unknown component: TransitNearMeError"
    end

    test "fails with bad data" do
      log =
        CaptureLog.capture_log(fn ->
          assert "" ==
                   React.render("TransitNearMe", %{
                     query: %{},
                     mapId: "map-id",
                     mapData: %{markers: []},
                     routeSidebarData: "crash",
                     stopSidebarData: []
                   })
        end)

      assert log =~ ~r/react_renderer component=TransitNearMe.* is not a function/
    end

    # test "it translates zero-width space HTML entities into UTF-8 characters", %{
    #   route_sidebar_data: route_sidebar_data,
    #   stop_sidebar_data: stop_sidebar_data
    # } do
    #   # There's something between the quotes, really.
    #   zero_width_space = "​"

    #   # Demonstrate that the data going in includes a zero-width space
    #   assert Poison.encode!(route_sidebar_data) =~ zero_width_space

    #   assert {:safe, body} =
    #            React.render("TransitNearMe", %{
    #              query: %{},
    #              mapId: "map-id",
    #              mapData: %{markers: []},
    #              routeSidebarData: route_sidebar_data,
    #              stopSidebarData: stop_sidebar_data
    #            })

    #   assert body =~ zero_width_space
    # end
  end

  describe "init/1" do
    test "initialize the process" do
      assert {:ok,
              {%{intensity: 3, period: 5, strategy: :one_for_one},
               [
                 {:react_render,
                  {:poolboy, :start_link,
                   [
                     [
                       name: {:local, :react_render},
                       worker_module: Worker,
                       size: 1,
                       max_overflow: 0
                     ],
                     []
                   ]}, :permanent, 5000, :worker, [:poolboy]}
               ]}} = React.init(pool_size: 1)
    end
  end

  describe "stop/0" do
    test "stops the process" do
      assert :ok = React.stop()
    end
  end

  describe "dev_build/1" do
    test "builds files if path is a string" do
      assert React.dev_build("/path/to/ts", fn cmd, args, opts ->
               send(self(), {:cmd, cmd, args, opts})
               {"", 0}
             end) == :ok

      assert_receive {:cmd, "npx", ["webpack"], cd: "/path/to/ts"}
    end

    test "does not build files if path is nil" do
      assert React.dev_build(nil, fn cmd, args, opts ->
               send(self(), {:cmd, cmd, args, opts})
               {"", 0}
             end) == :ok

      refute_receive {:cmd, _, _, _}
    end
  end
end
