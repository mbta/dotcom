defmodule Dotcom.ReactTest do
  use ExUnit.Case, async: true

  alias ExUnit.CaptureLog
  alias LocationService.Address
  alias Dotcom.{React, TransitNearMe}

  @address %Address{
    latitude: 42.352271,
    longitude: -71.055242,
    formatted: "South Station"
  }
  @date Dotcom.Utils.DateTime.service_date()

  describe "render/2" do
    setup do
      now = Dotcom.Utils.DateTime.now()

      data = TransitNearMe.build(@address, date: @date, now: now)

      {:ok, %{stopsWithDistances: data}}
    end

    @tag :external
    test "renders a component, even when the component has a lot of data", %{
      stopsWithDistances: stopsWithDistances
    } do
      assert {:safe, body} =
               React.render("TransitNearMe", %{
                 query: %{},
                 mapId: "map-id",
                 mapData: %{markers: []},
                 stopsWithDistances: stopsWithDistances,
                 routesWithRealtimeSchedules: [],
                 stopsWithRoutes: []
               })

      assert body =~ "m-tnm"
    end

    @tag :external
    test "logs node performance",
         %{
           stopsWithDistances: stopsWithDistances
         } do
      Logger.configure(level: :info)

      log =
        CaptureLog.capture_log(fn ->
          React.render("TransitNearMe", %{
            query: %{},
            mapId: "map-id",
            mapData: %{markers: []},
            stopsWithDistances: stopsWithDistances,
            routesWithRealtimeSchedules: [],
            stopsWithRoutes: []
          })
        end)

      assert log =~
               "node_logging"

      on_exit(fn ->
        compile_time_level = Application.get_env(:logger, :level)
        Logger.configure(level: compile_time_level)
      end)
    end

    @tag :external
    test "fails with unknown component" do
      log =
        CaptureLog.capture_log(fn ->
          assert "" ==
                   React.render("TransitNearMeError", %{
                     query: %{},
                     mapId: "map-id",
                     mapData: %{markers: []},
                     stopsWithDistances: %{stops: [], distances: %{}},
                     routesWithRealtimeSchedules: [],
                     stopsWithRoutes: []
                   })
        end)

      assert log =~
               "react_renderer component=TransitNearMeError Unknown component: TransitNearMeError"
    end

    @tag :external
    test "fails with bad data" do
      log =
        CaptureLog.capture_log(fn ->
          assert "" ==
                   React.render("TransitNearMe", %{})
        end)

      assert log =~
               ~s/react_renderer component=TransitNearMe Cannot read properties of undefined (reading 'filter')/
    end
  end

  describe "dev_build/1" do
    test "builds files if path is a string" do
      assert React.dev_build("/path/to/ts", fn cmd, args, opts ->
               send(self(), {:cmd, cmd, args, opts})
               {"", 0}
             end) == :ok

      assert_receive {:cmd, "npm", ["run", "webpack:build:react"], cd: "/path/to/ts"}
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
