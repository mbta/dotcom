defmodule DotcomWeb.EventViewTest do
  use Dotcom.ViewCase, async: true
  import DotcomWeb.EventView
  import CMS.Helpers, only: [parse_iso_datetime: 1]
  import Phoenix.HTML, only: [safe_to_string: 1]
  alias CMS.Page.Event
  alias CMS.Page.EventAgenda
  alias CMS.Partial.Teaser

  describe "show.html" do
    test "the notes section is not rendered when the event notes are empty", %{conn: conn} do
      event = event_factory(0, notes: nil)

      html =
        DotcomWeb.EventView
        |> render_to_string("show.html", conn: conn, event: event)

      refute html =~ "Notes"
    end

    test "the agenda section is not rendered when the event agenda is empty", %{conn: conn} do
      event = event_factory(0, agenda: nil)

      html =
        DotcomWeb.EventView
        |> render_to_string("show.html", conn: conn, event: event)

      refute html =~ "Agenda"
    end

    test "the location field takes priority over the imported address", %{conn: conn} do
      event = event_factory(0, location: "MassDot", imported_address: "Meed me at the docks")

      html =
        DotcomWeb.EventView
        |> render_to_string("show.html", conn: conn, event: event)

      assert html =~ event.location
      refute html =~ "Meet me at the docks"
    end

    test "given the location field is empty, the imported address is shown", %{conn: conn} do
      event = event_factory(0, location: nil, imported_address: "Meet me at the docks")

      html =
        DotcomWeb.EventView
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
      actual = render_event_duration_list_view(~N[2016-11-15T10:00:00], nil)
      expected = "Tue, Nov 15, 2016 \u2022 10 AM"
      assert expected == actual
    end

    test "with start/end on same day, only renders date once" do
      actual = render_event_duration_list_view(~N[2016-11-14T12:00:00], ~N[2016-11-14T14:30:00])
      expected = "Mon, Nov 14, 2016 \u2022 12 PM - 2:30 PM"
      assert expected == actual
    end

    test "with start/end on different days, renders both dates" do
      actual = render_event_duration_list_view(~N[2016-11-14T12:00:00], ~N[2016-12-01T14:30:00])
      expected = "Mon, Nov 14, 2016 12 PM - Thu, Dec 1, 2016 2:30 PM"
      assert expected == actual
    end

    test "with DateTimes, shifts them to America/New_York" do
      actual =
        render_event_duration_list_view(
          Timex.to_datetime(~N[2016-11-05T05:00:00], "Etc/UTC"),
          Timex.to_datetime(~N[2016-11-06T06:00:00], "Etc/UTC")
        )

      # could also be November 6th, 1:00 AM (test daylight savings)
      expected = "Sat, Nov 5, 2016 1 AM - Sun, Nov 6, 2016 1 AM"
      assert expected == actual
    end

    test "with ISO:Extended DateTimes, does not shift timezone" do
      actual =
        render_event_duration_list_view(
          parse_iso_datetime("2016-11-06T01:00:00-04:00"),
          parse_iso_datetime("2016-11-06T02:00:00-04:00")
        )

      expected = "Sun, Nov 6, 2016 \u2022 1 AM - 2 AM"
      assert expected == actual
    end

    test "calendar version: no end time, only renders start time" do
      actual =
        get_formatted_date_time_map(~N[2016-11-15T10:00:00], nil, :weekday_date_full)

      expected_date = "Tuesday, November 15, 2016"
      expected_time = "10 AM"
      assert expected_date == actual.date
      assert expected_time == actual.time
    end

    test "calendar version: start/end on same day, only renders date once" do
      actual =
        get_formatted_date_time_map(
          ~N[2016-11-14T12:00:00],
          ~N[2016-11-14T14:30:00],
          :weekday_date_full
        )

      expected_date = "Monday, November 14, 2016"
      expected_time = "12 PM - 2:30 PM"
      assert expected_date == actual.date
      assert expected_time == actual.time
    end

    test "calendar version: start/end on different days, renders both dates" do
      actual =
        get_formatted_date_time_map(
          ~N[2016-11-14T12:00:00],
          ~N[2016-12-01T14:30:00],
          :weekday_date_full
        )

      expected_date = "Monday, November 14, 2016"
      expected_time = "12 PM"
      assert expected_date == actual.date
      assert expected_time == actual.time
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
    assert {1, [january_event, _another_january_event]} = List.first(grouped_2020_events)
    assert january_event.date.month == 1
    assert january_event.date.year == 2020
  end

  test "grouped_by_day/2 for a given month" do
    events =
      for m <- 1..12, into: [] do
        y = 2020

        for d <- 1..m, index <- 1..(2 * d), into: [] do
          {:ok, date} = Date.new(y, m, d)

          %Teaser{
            id: "#{y}-#{m}-#{d}",
            path: "/#{y}-#{m}/#{d}",
            title: "Event #{d}-#{index} during #{m}/#{y}",
            type: :event,
            date: date
          }
        end
      end
      |> List.flatten()

    grouped_april_events = grouped_by_day(events, 4)
    assert grouped_april_events

    x = 3
    assert events_list_for_april_x = Map.get(grouped_april_events, x)
    assert length(events_list_for_april_x) == x * 2

    for event <- events_list_for_april_x do
      assert event.date.day == x
    end
  end

  describe "ended?/2" do
    test ":not_started value read by function" do
      assert ended?(%Event{started_status: :not_started}) == false
    end

    test ":ended value verified" do
      assert ended?(%Event{started_status: :ended}) == true
    end
  end

  describe "has_started?/2" do
    test ":not_started value read by function",
      do: assert(has_started?(%Event{started_status: :not_started}) == false)

    test ":ended value verified",
      do: assert(has_started?(%Event{started_status: :started}) == true)
  end

  describe "agenda_visible?/2 hides unpublished" do
    test "normal published case is shown",
      do: assert(agenda_visible?(%EventAgenda{published: true}) == true)

    test "draft agendas are shown if preview param is present",
      do: assert(agenda_visible?(%EventAgenda{published: false}, %{"preview" => ""}) == true)

    test "false positives do not expose agenda",
      do: assert(agenda_visible?(%EventAgenda{published: false}, %{"foobar" => ""}) == false)

    test "draft agendas are not shown by default",
      do: assert(agenda_visible?(%EventAgenda{published: false}) == false)
  end

  test "agenda_title/2 shows title" do
    assert safe_to_string(agenda_title("Topic title")) =~
             "<h3 class=\"agenda-topic__title\">Topic title"

    assert safe_to_string(agenda_title("Topic title", :h4)) =~
             "<h4 class=\"agenda-topic__title\">Topic title"

    assert "" = agenda_title(nil)
  end

  test "agenda_video_bookmark/1 parses timestamp" do
    time1 = "01:02:03"
    time2 = "12:13"

    assert safe_to_string(agenda_video_bookmark(time1)) =~
             "<span class=\"agenda-topic__timestamp\"><time datetime=\"PT1H2M3S\">#{time1}</time>"

    assert safe_to_string(agenda_video_bookmark(time2)) =~
             "<span class=\"agenda-topic__timestamp\"><time datetime=\"PT12H13M\">#{time2}</time>"
  end

  test "agenda_video_bookmark/1 shows input text if not able to parse the time" do
    assert "" = agenda_video_bookmark(nil)
    assert "" = agenda_video_bookmark("nonsense time")
  end
end
