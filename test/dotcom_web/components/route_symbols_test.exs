defmodule DotcomWeb.Components.RouteSymbolsTest do
  @moduledoc false
  use ExUnit.Case

  import Phoenix.LiveViewTest
  import DotcomWeb.Components.RouteSymbols
  import Test.Support.Factories.Routes.Route

  describe "route_symbol/1" do
    test "supports size variant" do
      route = build(:route)

      assert render_component(&route_symbol/1, %{route: route, size: :default}) !=
               render_component(&route_symbol/1, %{route: route, size: :small})
    end

    test "handles Logan Express, falling back to generic shuttle bus" do
      assert render_component(&route_symbol/1, %{
               route: build(:logan_express_route)
             })
             |> get_title_text() =~ "Logan Express"

      assert render_component(&route_symbol/1, %{
               route: build(:logan_express_route, name: "unknown")
             })
             |> get_title_text() =~ "Shuttle Bus"
    end

    test "handles Massport, falling back to generic shuttle bus" do
      assert render_component(&route_symbol/1, %{
               route: build(:massport_route)
             })
             |> get_title_text() =~ "Massport"

      assert render_component(&route_symbol/1, %{
               route: build(:massport_route, name: "unknown")
             })
             |> get_title_text() =~ "Shuttle Bus"
    end

    test "handles buses" do
      route = build(:bus_route)

      assert render_component(&route_symbol/1, %{
               route: route
             }) =~ route.name
    end

    test "handles Silver Live rapid transit" do
      route =
        build(:bus_route,
          description: :rapid_transit,
          id: Faker.Util.pick(Routes.Route.silver_line())
        )

      assert render_component(&route_symbol/1, %{
               route: route
             })
             |> get_title_text() =~ "Silver Line"
    end

    test "handles Silver Live buses" do
      route =
        build(:bus_route,
          id: Faker.Util.pick(Routes.Route.silver_line())
        )

      assert render_component(&route_symbol/1, %{
               route: route
             }) =~ route.name
    end

    test "handles rail replacement buses" do
      replaced_route = Faker.Util.pick(~w(Red Orange Blue Green Worcester))
      route_name = replaced_route <> " Line Shuttle"

      route =
        build(:bus_route,
          description: :rail_replacement_bus,
          name: route_name
        )

      icon =
        render_component(&route_symbol/1, %{
          route: route
        })

      assert icon |> get_title_text() =~ "Shuttle Bus"
      classnames = icon |> Floki.attribute("class") |> List.first()

      assert classnames =~ "text-#{String.downcase(replaced_route)}-line" ||
               classnames =~ "text-commuter-rail"
    end
  end

  describe "route_icon/1" do
    test "supports size variant" do
      route = build(:route)

      assert render_component(&route_icon/1, %{route: route, size: :default}) !=
               render_component(&route_icon/1, %{route: route, size: :small})
    end
  end

  defp get_title_text(html) do
    html
    |> Floki.find("title")
    |> Floki.text()
  end
end
