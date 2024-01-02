defmodule SiteWeb.LocationCardTest do
  use SiteWeb.ConnCase, async: true
  import Phoenix.HTML, only: [safe_to_string: 1]
  alias SiteWeb.PartialView.LocationCard

  @stop %Stops.Stop{
    accessibility: ["accessible", "elevator", "tty_phone", "escalator_up"],
    address: "145 Dartmouth St Boston, MA 02116-5162",
    id: "place-bbsta",
    latitude: 42.34735,
    longitude: -71.075727,
    name: "Back Bay",
    station?: true
  }

  @routes [
    %{
      group_name: :orange_line,
      routes: [
        %{
          id: "Orange",
          description: :rapid_transit,
          name: "Orange Line",
          type: 1,
          href: "/orange-line"
        }
      ]
    },
    %{
      group_name: :commuter_rail,
      routes: [
        %{
          id: "CR-Worcester",
          description: :commuter_rail,
          name: "Framingham/Worcester Line",
          type: 2,
          href: "/cr-worcester"
        },
        %{
          id: "CR-Franklin",
          description: :commuter_rail,
          name: "Franklin Line",
          type: 2,
          href: "/cr-franklin"
        },
        %{
          id: "CR-Needham",
          description: :commuter_rail,
          name: "Needham Line",
          type: 2,
          href: "/cr-needham"
        },
        %{
          id: "CR-Providence",
          description: :commuter_rail,
          name: "Providence/Stoughton Line",
          type: 2,
          href: "/cr-providence"
        }
      ]
    },
    %{
      group_name: :bus,
      routes: [
        %{id: "10", description: :local_bus, name: "10", type: 3, href: "/10"},
        %{id: "39", description: :key_bus_route, name: "39", type: 3, href: "/39"},
        %{id: "170", description: :supplemental_bus, name: "170", type: 3, href: "/170"}
      ]
    }
  ]

  test "render_routes/3" do
    Enum.each(@routes, &test_render_routes(&1.group_name, &1.routes))
  end

  defp test_render_routes(:bus, routes) do
    assert :bus |> LocationCard.render_routes(routes, @stop) |> safe_to_string =~ "Bus: "
  end

  defp test_render_routes(mode_name, routes) do
    expected =
      mode_name
      |> Atom.to_string()
      |> String.split("_")
      |> Enum.map(&String.capitalize/1)
      |> Enum.join(" ")

    actual =
      mode_name
      |> LocationCard.render_routes(routes, @stop)
      |> List.first()
      |> safe_to_string()

    assert actual =~ expected

    if mode_name == :commuter_rail do
      assert actual =~ "/stops/"
    end
  end

  describe "route_path/3" do
    test "route path for commuter rail goes to the stop" do
      assert LocationCard.route_path(
               %Routes.Route{
                 id: "CR-Providence",
                 description: :commuter_rail,
                 name: "Providence/Stoughton Line",
                 type: 2
               },
               @stop,
               :commuter_rail
             ) == "/stops/place-bbsta?tab=schedule"
    end

    test "route path for others returns the route with the stop set the origin" do
      assert LocationCard.route_path(
               %Routes.Route{
                 id: "Orange",
                 description: :rapid_transit,
                 name: "Orange Line",
                 type: 1
               },
               @stop,
               :subway
             ) == "/schedules/Orange?origin=place-bbsta"
    end
  end

  describe "stop_path/1" do
    test "returns the path to the stop page with the schedules tab" do
      assert LocationCard.stop_path(@stop) == "/stops/place-bbsta?tab=schedule"
    end
  end
end
