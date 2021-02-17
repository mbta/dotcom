defmodule SiteWeb.EventViewTest do
  use Site.ViewCase, async: true
  import SiteWeb.EventView

  describe "show.html" do
    test "the notes section is not rendered when the event notes are empty", %{conn: conn} do
      event = event_factory(0, notes: nil)

      html =
        SiteWeb.EventView
        |> render_to_string("show.html", conn: conn, event: event)

      refute html =~ "Notes"
    end

    test "the agenda section is not renderd when the event agenda is empty", %{conn: conn} do
      event = event_factory(0, agenda: nil)

      html =
        SiteWeb.EventView
        |> render_to_string("show.html", conn: conn, event: event)

      refute html =~ "Agenda"
    end

    test "the location field takes priority over the imported address", %{conn: conn} do
      event = event_factory(0, location: "MassDot", imported_address: "Meed me at the docks")

      html =
        SiteWeb.EventView
        |> render_to_string("show.html", conn: conn, event: event)

      assert html =~ event.location
      refute html =~ "Meet me at the docks"
    end

    test "given the location field is empty, the imported address is shown", %{conn: conn} do
      event = event_factory(0, location: nil, imported_address: "Meet me at the docks")

      html =
        SiteWeb.EventView
        |> render_to_string("show.html", conn: conn, event: event)

      assert html =~ "Meet me at the docks"
    end
  end

  describe "calendar_title/1" do
    test "returns the name of the month" do
      assert calendar_title("2017-01-01") == "January"
    end
  end

  describe "shift_date_range/2" do
    test "shifts the month by the provided value" do
      assert shift_date_range("2017-04-15", -1) == "2017-03-01"
    end

    test "returns the beginning of the month" do
      assert shift_date_range("2017-04-15", 1) == "2017-05-01"
    end
  end

  describe "city_and_state" do
    test "returns the city and state, separated by a comma" do
      event = event_factory(0, city: "Charleston", state: "South Carolina")

      assert city_and_state(event) == "Charleston, South Carolina"
    end

    test "when the city is not provided" do
      event = event_factory(0, city: nil)

      assert city_and_state(event) == nil
    end

    test "when the state is not provided" do
      event = event_factory(0, state: nil)

      assert city_and_state(event) == nil
    end
  end
end
