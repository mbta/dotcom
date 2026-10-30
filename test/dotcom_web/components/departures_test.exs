defmodule DotcomWeb.Components.DeparturesTest do
  use ExUnit.Case, async: true

  import Phoenix.LiveViewTest

  alias Dotcom.InSeatTransfers.TripHeading
  alias Dotcom.ScheduleFinder.TripDetails.TripStop
  alias DotcomWeb.Components.Departures
  alias Test.Support.{Factories, FactoryHelpers}

  defp trip_stop(attrs) do
    struct!(
      %TripStop{
        cancelled?: false,
        stop_id: FactoryHelpers.build(:id),
        stop_name: Faker.Pokemon.location(),
        stop_sequence: 1,
        time: {:time, ~U[2026-10-07 16:30:00Z]}
      },
      attrs
    )
  end

  defp render_trip_stops(assigns) do
    render_component(
      &Departures.trip_stops/1,
      Keyword.merge([route: Factories.Routes.Route.build(:bus_route)], assigns)
    )
    |> Floki.parse_fragment!()
  end

  describe "trip_stops/1" do
    test "renders stops and in-seat transfer headings in order" do
      document =
        render_trip_stops(
          stops: [
            trip_stop(stop_name: "First stop"),
            %TripHeading{
              headsign: "Continuing destination",
              route: Factories.Routes.Route.build(:bus_route)
            },
            trip_stop(stop_name: "Continuing stop")
          ]
        )

      assert Floki.text(document) =~
               ~r/First stop.*Trip continues as.*Continuing destination.*Continuing stop/s
    end

    test "highlights only the first stop when highlight_first? is set" do
      document =
        render_trip_stops(
          highlight_first?: true,
          stops: [trip_stop(stop_name: "Selected stop"), trip_stop(stop_name: "Next stop")]
        )

      assert document |> Floki.find(".font-bold") |> Floki.text() =~ "Selected stop"
      refute document |> Floki.find(".font-bold") |> Floki.text() =~ "Next stop"
    end

    test "doesn't highlight any stops by default" do
      document = render_trip_stops(stops: [trip_stop(stop_name: "Some stop")])

      assert Floki.find(document, ".font-bold") == []
    end

    test "renders statuses and skipped stops" do
      document =
        render_trip_stops(
          stops: [
            trip_stop(stop_name: "Status stop", time: {:status, "Boarding"}),
            trip_stop(stop_name: "Skipped stop", cancelled?: true)
          ]
        )

      text = Floki.text(document)
      assert text =~ "Boarding"
      assert text =~ "Skipped"
      assert document |> Floki.find(".line-through") |> Floki.text() =~ "Skipped stop"
    end
  end
end
