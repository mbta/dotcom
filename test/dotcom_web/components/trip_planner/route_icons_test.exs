defmodule DotcomWeb.Components.TripPlanner.RouteIconsTest do
  @moduledoc false
  use ExUnit.Case

  import Phoenix.LiveViewTest
  import DotcomWeb.Components.TripPlanner.RouteIcons
  import OpenTripPlannerClient.Test.Support.Factory

  alias Dotcom.TripPlan.Helpers

  describe "otp_route_icon/1" do
    test "handles Logan Express, falling back to generic shuttle bus" do
      route =
        build(:route,
          agency: build(:agency, name: "Logan Express"),
          short_name: Faker.Util.pick(Helpers.logan_express_icon_names())
        )

      assert render_component(&otp_route_icon/1, %{
               route: route
             })
             |> matches_label?(route.long_name <> " " <> route.agency.name)

      assert render_component(&otp_route_icon/1, %{
               route:
                 build(:route,
                   agency: build(:agency, name: "Logan Express"),
                   short_name: "unknown"
                 )
             })
             |> matches_label?("Shuttle")
    end

    test "handles Massport, falling back to generic shuttle bus" do
      route =
        build(:route,
          agency: build(:agency, name: "Massport"),
          short_name: Faker.Util.pick(Helpers.massport_icon_names()),
          long_name: nil
        )

      assert render_component(&otp_route_icon/1, %{
               route: route
             })
             |> matches_label?(route.agency.name <> " Shuttle " <> route.short_name)

      assert render_component(&otp_route_icon/1, %{
               route:
                 build(:route,
                   agency: build(:agency, name: "Massport"),
                   short_name: "unknown"
                 )
             })
             |> matches_label?("Shuttle")
    end

    test "handles MBTA routes" do
      assert render_component(&otp_route_icon/1, %{route: build(:route)})
    end
  end

  defp matches_label?(html, text) do
    {:ok, document} = Floki.parse_document(html)

    title =
      document
      |> Floki.attribute("svg", "aria-label")
      |> Floki.text()
      |> String.trim()

    text
    |> Regex.compile!("i")
    |> Regex.match?(title)
  end
end
