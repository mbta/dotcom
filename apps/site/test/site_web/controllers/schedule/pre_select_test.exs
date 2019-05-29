defmodule SiteWeb.ScheduleController.PreSelectTest do
  use SiteWeb.ConnCase, async: true
  alias SiteWeb.ScheduleController.PreSelect
  alias Stops.Stop

  describe "call/2" do
    @all_stops [
      %Stop{id: "stop 1"},
      %Stop{id: "stop 2"},
      %Stop{id: "stop 3"}
    ]

    test "Assigns origin if only one is available", %{conn: conn} do
      conn =
        conn
        |> assign(:origin, nil)
        |> assign(:destination, nil)
        |> assign(:all_stops, @all_stops)
        |> assign(:excluded_origin_stops, ["stop 1", "stop 2"])
        |> assign(:excluded_destination_stops, [])
        |> PreSelect.call([])

      assert conn.assigns.origin.id == "stop 3"
    end

    test "Assigns destination if only one is available", %{conn: conn} do
      conn =
        conn
        |> assign(:origin, List.first(@all_stops))
        |> assign(:destination, nil)
        |> assign(:all_stops, @all_stops)
        |> assign(:excluded_origin_stops, [])
        |> assign(:excluded_destination_stops, ["stop 3"])
        |> PreSelect.call([])

      assert conn.assigns.destination.id == "stop 2"
      assert conn.assigns[:preselected_destination?]
    end

    test "Does not preselect if more options are available", %{conn: conn} do
      conn =
        conn
        |> assign(:origin, nil)
        |> assign(:destination, nil)
        |> assign(:all_stops, @all_stops)
        |> assign(:excluded_origin_stops, [])
        |> assign(:excluded_destination_stops, ["stop 3"])
        |> PreSelect.call([])

      refute conn.assigns.origin
      refute conn.assigns.destination
      refute conn.assigns[:preselected_destination?]
    end

    test "Does not preselect if origin or destination are already selected", %{conn: conn} do
      conn =
        conn
        |> assign(:origin, List.first(@all_stops))
        |> assign(:destination, List.last(@all_stops))
        |> assign(:all_stops, @all_stops)
        |> assign(:excluded_origin_stops, ["stop 2", "stop 3"])
        |> assign(:excluded_destination_stops, ["stop 3"])
        |> PreSelect.call([])

      assert conn.assigns.origin.id == "stop 1"
      assert conn.assigns.destination.id == "stop 3"
      refute conn.assigns[:preselected_destination?]
    end
  end
end
