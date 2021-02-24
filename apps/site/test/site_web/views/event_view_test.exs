defmodule SiteWeb.EventViewTest do
  use Site.ViewCase, async: true
  import SiteWeb.EventView
  import CMS.Helpers, only: [parse_iso_datetime: 1]
  alias CMS.Partial.Teaser

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

  test "render_event_month/2 displays month and year" do
    assert render_event_month(3, 2020) == "March 2020"
  end

  test "grouped_by_month/2 for a given year" do
    events =
      for y <- 2018..2020, m <- 1..12, into: [] do
        {:ok, date} = Date.new(y, m, 1)

        for t <- 1..(2 * m), into: [] do
          %Teaser{
            id: "#{y}-#{m}-#{t}",
            path: "/#{y}-#{m}/#{t}",
            title: "Event #{t} during #{m}/#{y}",
            type: :event,
            date: date
          }
        end
      end
      |> List.flatten()

    grouped_2020_events = grouped_by_month(events, 2020)

    assert grouped_2020_events
    assert {1, [january_event, another_january_event]} = List.first(grouped_2020_events)
    assert january_event.date.month == 1
    assert january_event.date.year == 2020
  end
end
