defmodule DotcomWeb.Components.Stops.HeaderTest do
  use ExUnit.Case

  import Phoenix.LiveViewTest

  import DotcomWeb.Components.Stops.Header, only: [header: 1]

  alias Routes.Route
  alias Stops.Stop

  describe "header/1" do
    test "renders only one of each mode icon" do
      # Setup
      stop = %Stop{}

      routes_by_stop = [
        %Route{type: 3},
        %Route{type: 3}
      ]

      # Exercise
      html = render_component(&header/1, %{stop: stop, routes_by_stop: routes_by_stop})

      # Verify
      assert html |> Floki.find("title") |> Kernel.length() == 1
    end

    test "renders the commuter rail icon last" do
      # Setup
      stop = %Stop{}

      routes_by_stop = [
        # Commuter Rail
        %Route{type: 2},
        # Bus
        %Route{type: 3}
      ]

      # Exercise
      html = render_component(&header/1, %{stop: stop, routes_by_stop: routes_by_stop})

      # Verify
      assert html |> Floki.find("title") |> Enum.at(-1) |> Floki.text() == "Commuter Rail"
    end

    test "renders the accessibility icon when the stop is accessible" do
      # Setup
      stop = %Stop{accessibility: ["accessible"]}
      routes_by_stop = []

      # Exercise
      html = render_component(&header/1, %{stop: stop, routes_by_stop: routes_by_stop})

      # Verify
      assert html =~ "Accessible"
    end

    test "renders the accessibility icon when it is a bus-only stop" do
      # Setup
      stop = %Stop{parent_id: nil, accessibility: []}
      routes_by_stop = [%Route{type: 3}]

      # Exercise
      html = render_component(&header/1, %{stop: stop, routes_by_stop: routes_by_stop})

      # Verify
      assert html =~ "Accessible"
    end

    test "does not render the accessibility icon when the stop is not accessible" do
      # Setup
      stop = %Stop{accessibility: []}
      routes_by_stop = []

      # Exercise
      html = render_component(&header/1, %{stop: stop, routes_by_stop: routes_by_stop})

      # Verify
      refute html =~ "Accessible"
    end

    test "renders the parking icon when parking lots are present" do
      # Setup
      stop = %Stop{parking_lots: [%{}]}
      routes_by_stop = []

      # Exercise
      html = render_component(&header/1, %{stop: stop, routes_by_stop: routes_by_stop})

      # Verify
      assert html =~ "Parking"
    end

    test "does not render the parking icon when no parking lots are present" do
      # Setup
      stop = %Stop{parking_lots: []}
      routes_by_stop = []

      # Exercise
      html = render_component(&header/1, %{stop: stop, routes_by_stop: routes_by_stop})

      # Verify
      refute html =~ "Parking"
    end

    test "renders the zone information when a stop has a zone" do
      # Setup
      zone = Faker.Pizza.topping()
      stop = %Stop{zone: zone}
      routes_by_stop = []

      # Exercise
      html = render_component(&header/1, %{stop: stop, routes_by_stop: routes_by_stop})

      # Verify
      assert html =~ "Zone #{zone}"
    end

    test "does not render the zone information when none is present" do
      # Setup
      stop = %Stop{zone: nil}
      routes_by_stop = []

      # Exercise
      html = render_component(&header/1, %{stop: stop, routes_by_stop: routes_by_stop})

      # Verify
      refute html =~ "Zone"
    end
  end
end
