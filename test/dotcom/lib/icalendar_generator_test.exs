defmodule IcalendarGeneratorTest do
  use DotcomWeb.ConnCase, async: true

  import CMS.Factory
  import Phoenix.HTML, only: [raw: 1]

  alias Dotcom.IcalendarGenerator

  describe "to_ical/1" do
    test "includes the appropriate headers for the iCalendar file format", %{conn: conn} do
      event = event_factory(0)

      result =
        conn
        |> IcalendarGenerator.to_ical(event)
        |> IO.iodata_to_binary()

      assert result =~ "BEGIN:VCALENDAR"
      assert result =~ "VERSION:2.0"
      assert result =~ "PRODID:-//www.mbta.com//Events//EN"
      assert result =~ "BEGIN:VEVENT"
    end

    test "includes the event details", %{conn: conn} do
      event =
        event_factory(
          0,
          title: "Event Title",
          body: raw("<p>Here is a <strong>description</strong></p>."),
          location: "MassDot",
          path_alias: "/events/2018/event-title",
          street_address: "10 Park Plaza",
          city: "Boston",
          state: "MA"
        )

      result =
        conn
        |> IcalendarGenerator.to_ical(event)
        |> IO.iodata_to_binary()

      assert result =~ "DESCRIPTION:Here is a description."
      assert result =~ "LOCATION:MassDot 10 Park Plaza Boston, MA"
      assert result =~ "SUMMARY:Event Title"
      assert result =~ "URL:#{DotcomWeb.Endpoint.url()}#{event.path_alias}"
    end

    test "includes unique identifiers for updating an existing calendar event", %{conn: conn} do
      event = event_factory(0)

      result =
        conn
        |> IcalendarGenerator.to_ical(event)
        |> IO.iodata_to_binary()

      assert result =~ "UID:event#{event.id}@mbta.com\r\n"
      assert result =~ "SEQUENCE:"
      refute result =~ "SEQUENCE:\r\n"
    end

    test "includes the event start and end time with timezone information", %{conn: conn} do
      start_datetime = Timex.to_datetime(~N[2017-02-28T09:00:00], "America/New_York")
      end_datetime = Timex.to_datetime(~N[2017-02-28T11:00:00], "America/New_York")

      event = event_factory(0, start_time: start_datetime, end_time: end_datetime)

      result =
        conn
        |> IcalendarGenerator.to_ical(event)
        |> IO.iodata_to_binary()

      assert result =~ "DTSTART:20170228T140000Z"
      assert result =~ "DTEND:20170228T160000Z"
    end

    test "when the event does not have an end time, it just adds an hour", %{conn: conn} do
      start_datetime = Timex.to_datetime(~N[2017-02-28T09:00:00], "America/New_York")
      event = event_factory(0, start_time: start_datetime, end_time: nil)

      result =
        conn
        |> IcalendarGenerator.to_ical(event)
        |> IO.iodata_to_binary()

      assert result =~ "DTEND:20170228T150000Z"
    end

    test "the imported_address field decode the ampersand html entity", %{conn: conn} do
      event =
        event_factory(
          0,
          title: "Bidding Process & Procedures",
          location: nil,
          imported_address: raw("Conference Rooms 2 &amp; 3")
        )

      result =
        conn
        |> IcalendarGenerator.to_ical(event)
        |> IO.iodata_to_binary()

      assert result =~ "SUMMARY:Bidding Process & Procedures"
      assert result =~ "LOCATION:Conference Rooms 2 & 3"
    end

    test "the location field takes precedence over the imported_address field", %{conn: conn} do
      event =
        event_factory(
          0,
          location: "MassDot",
          imported_address: raw("Somewhere else")
        )

      result =
        conn
        |> IcalendarGenerator.to_ical(event)
        |> IO.iodata_to_binary()

      assert result =~ "LOCATION:MassDot"
    end

    test "the imported address is used when the location field is empty", %{conn: conn} do
      event =
        event_factory(
          0,
          location: nil,
          imported_address: raw("MassDot")
        )

      result =
        conn
        |> IcalendarGenerator.to_ical(event)
        |> IO.iodata_to_binary()

      assert result =~ "LOCATION:MassDot"
    end

    test "can handle location without details", %{conn: conn} do
      event =
        event_factory(
          0,
          location: "Virtual",
          street_address: "Zoom",
          city: nil,
          state: nil
        )

      result =
        conn
        |> IcalendarGenerator.to_ical(event)
        |> IO.iodata_to_binary()

      assert result =~ "LOCATION:Virtual Zoom"
    end
  end
end
