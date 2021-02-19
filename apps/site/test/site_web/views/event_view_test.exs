defmodule SiteWeb.EventViewTest do
  use Site.ViewCase, async: true
  import SiteWeb.EventView
  import CMS.Helpers, only: [parse_iso_datetime: 1]

  describe "index.html" do
    test "includes links to the previous and next month", %{conn: conn} do
      html =
        SiteWeb.EventView
        |> render_to_string(
          "index.html",
          conn: conn,
          events: [],
          month: "2017-01-15"
        )

      assert html =~ "href=\"/events?month=2016-12-01\""
      assert html =~ "href=\"/events?month=2017-02-01\""
    end
  end

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

  describe "no_results_message/1" do
    test "includes the name of the month" do
      expected_message = "There are no events in January."

      assert no_results_message("2017-01-01") == expected_message
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

  describe "month_navigation_header/2" do
    test "links to next and previous months", %{conn: conn} do
      [prev_link, _title, next_link] =
        conn
        |> month_navigation_header("2018-06-01")
        |> Phoenix.HTML.safe_to_string()
        |> Floki.parse()

      assert Floki.attribute(prev_link, "a", "href") == ["/events?month=2018-05-01"]
      assert Floki.attribute(next_link, "a", "href") == ["/events?month=2018-07-01"]
    end

    test "displays current month", %{conn: conn} do
      [_prev_link, title, _next_link] =
        conn
        |> month_navigation_header("2018-06-01")
        |> Phoenix.HTML.safe_to_string()
        |> Floki.parse()

      assert title == "June"
    end
  end

  describe "render_event_duration/2" do
    test "with no end time, only renders start time" do
      actual = render_event_duration(~N[2016-11-15T10:00:00], nil)
      expected = "Tue, Nov 15, 2016 \u2022 10 AM"
      assert expected == actual
    end

    test "with start/end on same day, only renders date once" do
      actual = render_event_duration(~N[2016-11-14T12:00:00], ~N[2016-11-14T14:30:00])
      expected = "Mon, Nov 14, 2016 \u2022 12 PM - 2:30 PM"
      assert expected == actual
    end

    test "with start/end on different days, renders both dates" do
      actual = render_event_duration(~N[2016-11-14T12:00:00], ~N[2016-12-01T14:30:00])
      expected = "Mon, Nov 14, 2016 12 PM - Thu, Dec 1, 2016 2:30 PM"
      assert expected == actual
    end

    test "with DateTimes, shifts them to America/New_York" do
      actual =
        render_event_duration(
          Timex.to_datetime(~N[2016-11-05T05:00:00], "Etc/UTC"),
          Timex.to_datetime(~N[2016-11-06T06:00:00], "Etc/UTC")
        )

      # could also be November 6th, 1:00 AM (test daylight savings)
      expected = "Sat, Nov 5, 2016 1 AM - Sun, Nov 6, 2016 2 AM"
      assert expected == actual
    end

    test "with ISO:Extended DateTimes, does not shift timezone" do
      actual =
        render_event_duration(
          parse_iso_datetime("2016-11-06T01:00:00-04:00"),
          parse_iso_datetime("2016-11-06T02:00:00-04:00")
        )

      expected = "Sun, Nov 6, 2016 \u2022 1 AM - 2 AM"
      assert expected == actual
    end
  end
end
