defmodule DotcomWeb.EventControllerTest do
  use DotcomWeb.ConnCase

  import DotcomWeb.EventController
  import Mock

  @current_date ~D[2019-04-15]

  setup_with_mocks([
    {DotcomWeb.Plugs.Date, [],
     [
       call: fn conn, _ -> Plug.Conn.assign(conn, :date, @current_date) end
     ]}
  ]) do
    :ok
  end

  describe "GET index" do
    test "assigns month and year based on query params, defaulting to current", %{conn: conn} do
      conn = get(conn, event_path(conn, :index))
      assert %{year: 2019, month: 4} = conn.assigns
      conn = get(conn, event_path(conn, :index, month: 5, year: 2020))
      assert %{year: 2020, month: 5} = conn.assigns
    end

    test "renders a list of events", %{conn: conn} do
      conn = get(conn, event_path(conn, :index))
      assert conn.assigns.year == 2019
      events_hub = conn |> html_response(200) |> Floki.find(".m-events-hub")

      assert Floki.text(events_hub) =~ "MassDOT Finance and Audit Committee"

      event_links = Floki.find(events_hub, ".m-event__title")
      assert Enum.count(event_links) > 0
    end

    test "renders the calendar view", %{conn: conn} do
      conn = get(conn, event_path(conn, :index, calendar: true))

      events_calendar = conn |> html_response(200) |> Floki.find(".m-event-calendar")

      refute is_nil(events_calendar)
    end

    test "scopes events based on provided dates", %{conn: conn} do
      conn = get(conn, event_path(conn, :index, month: 6, year: 2018))

      events_hub = conn |> html_response(200) |> Floki.find(".m-events-hub")

      refute Floki.text(events_hub) =~ "MassDOT Finance and Audit Committee"
    end

    test "does not include an unavailable_after x-robots-tag HTTP header", %{conn: conn} do
      conn = get(conn, event_path(conn, :index))

      refute Enum.find(conn.resp_headers, fn {key, value} ->
               key == "x-robots-tag" && String.contains?(value, "unavailable_after")
             end)
    end

    test "renders the toggle for calendar view", %{conn: conn} do
      conn = get(conn, event_path(conn, :index, calendar: true))

      events_hub = conn |> html_response(200) |> Floki.find(".m-events-hub__nav--navigation-toggle")
      assert [{"div", [{"class", "m-events-hub__nav--navigation-toggle"}], _}] = events_hub

      event_icons = Floki.find(events_hub, ".m-nav-toggle-icon")
      assert Enum.count(event_icons) == 2
    end
  end

  describe "GET show" do
    test "renders and does not rewrite an unaliased event response", %{conn: conn} do
      event = event_factory(0, path_alias: nil)
      assert event.path_alias == nil
      assert event.title == "Fiscal & Management Control Board Meeting"
      path = event_path(conn, :show, event)
      assert path == "/node/3268"
      conn = get(conn, path)

      assert html_response(conn, 200) =~
               "(FMCB) closely monitors the T’s finances, management, and operations.</p>"
    end

    test "disambiguation: renders an event whose alias pattern is /events/:title instead of /events/:date/:title",
         %{conn: conn} do
      conn = get(conn, event_path(conn, :show, "incorrect-pattern"))
      assert html_response(conn, 200) =~ "Senior CharlieCard Event"
    end

    test "renders the given event with a path_alias", %{conn: conn} do
      event = event_factory(1)

      assert event.path_alias == "/events/date/title"
      conn = get(conn, event_path(conn, :show, event))
      assert html_response(conn, 200) =~ "Senior CharlieCard Event"
    end

    test "renders a preview of the requested event", %{conn: conn} do
      event = event_factory(1)
      conn = get(conn, event_path(conn, :show, event) <> "?preview&vid=112&nid=5")
      assert html_response(conn, 200) =~ "Senior CharlieCard Event 112"
      assert %{"preview" => "", "vid" => "112", "nid" => "5"} == conn.query_params
    end

    test "retains params (except _format) and redirects when CMS returns a native redirect", %{
      conn: conn
    } do
      conn = get(conn, event_path(conn, :show, "redirected-url") <> "?preview&vid=999")
      assert conn.status == 301

      assert Plug.Conn.get_resp_header(conn, "location") == [
               "/events/date/title?preview=&vid=999"
             ]
    end

    test "includes an unavailable_after x-robots-tag HTTP header", %{conn: conn} do
      Application.put_env(:dotcom, :allow_indexing, true)
      event = event_factory(0, path_alias: nil)
      path = event_path(conn, :show, event)

      conn = get(conn, path)

      assert Enum.find(conn.resp_headers, fn {key, value} ->
               key == "x-robots-tag" && String.contains?(value, "unavailable_after")
             end)
    end

    test "renders a 404 given an valid id but mismatching content type", %{conn: conn} do
      conn = get(conn, event_path(conn, :show, "1"))
      assert conn.status == 404
    end

    test "renders a 404 when event does not exist", %{conn: conn} do
      conn = get(conn, event_path(conn, :show, "2018", "invalid-event"))
      assert conn.status == 404
    end
  end

  describe "GET show (events_hub_redesign)" do
    test "renders show.html", %{conn: conn} do
      event = event_factory(0, path_alias: nil)
      conn = get(conn, event_path(conn, :show, event))
      assert conn.status == 200
      refute html_response(conn, 200) =~ "<h3>Agenda</h3>"
    end
  end

  describe "GET icalendar" do
    test "returns an icalendar file as an attachment when event does not have an alias", %{
      conn: conn
    } do
      event = event_factory(0)
      assert event.path_alias == nil
      assert event.title == "Fiscal & Management Control Board Meeting"
      conn = get(conn, event_icalendar_path(conn, :show, event))
      assert conn.status == 200

      assert Plug.Conn.get_resp_header(conn, "content-type") == ["text/calendar; charset=utf-8"]

      assert Plug.Conn.get_resp_header(conn, "content-disposition") == [
               "attachment; filename=fiscal_&_management_control_board_meeting.ics"
             ]
    end

    test "returns an icalendar file as an attachment when event has a valid alias", %{conn: conn} do
      event = event_factory(1)
      assert event.path_alias == "/events/date/title"
      assert event.title == "Senior CharlieCard Event"
      conn = get(conn, event_icalendar_path(conn, :show, event))
      assert conn.status == 200

      assert Plug.Conn.get_resp_header(conn, "content-type") == ["text/calendar; charset=utf-8"]

      assert Plug.Conn.get_resp_header(conn, "content-disposition") == [
               "attachment; filename=senior_charliecard_event.ics"
             ]
    end

    test "returns an icalendar file when only the path_alias is passed", %{conn: conn} do
      event = event_factory(1)
      assert event.path_alias == "/events/date/title"
      conn = get(conn, event_icalendar_path(conn, event.path_alias))
      assert conn.status == 200

      assert Plug.Conn.get_resp_header(conn, "content-type") == ["text/calendar; charset=utf-8"]

      assert Plug.Conn.get_resp_header(conn, "content-disposition") == [
               "attachment; filename=senior_charliecard_event.ics"
             ]
    end

    test "returns an icalendar file as an attachment when event has a non-conforming alias", %{
      conn: conn
    } do
      event = event_factory(0, path_alias: "/events/incorrect-pattern")
      assert event.path_alias == "/events/incorrect-pattern"
      conn = get(conn, event_icalendar_path(conn, :show, event))
      assert conn.status == 200

      assert Plug.Conn.get_resp_header(conn, "content-type") == ["text/calendar; charset=utf-8"]

      assert Plug.Conn.get_resp_header(conn, "content-disposition") == [
               "attachment; filename=senior_charliecard_event.ics"
             ]
    end

    test "renders a 404 given an invalid id", %{conn: conn} do
      event = event_factory(0, id: 999)
      conn = get(conn, event_icalendar_path(conn, :show, event))
      assert conn.status == 404
    end

    test "renders an icalendar file for a redirected event", %{conn: conn} do
      event = event_factory(0, path_alias: "/events/redirected-url")
      assert event.path_alias == "/events/redirected-url"
      conn = get(conn, event_icalendar_path(conn, :show, event))
      assert conn.status == 200
      assert Plug.Conn.get_resp_header(conn, "content-type") == ["text/calendar; charset=utf-8"]

      assert Plug.Conn.get_resp_header(conn, "content-disposition") == [
               "attachment; filename=senior_charliecard_event.ics"
             ]
    end

    test "redirects old icalendar path to new icalendar path", %{conn: conn} do
      event = event_factory(1)
      old_path = Path.join(event_path(conn, :show, event), "icalendar")
      assert old_path == "/events/date/title/icalendar"
      conn = get(conn, old_path)
      assert conn.status == 302
    end
  end

  describe "year_options/1" do
    test "year_options/1 returns a range of -4/+1 years", %{conn: conn} do
      assigns_with_date = Map.put(conn.assigns, :date, ~D[2019-03-03])
      conn = %{conn | assigns: assigns_with_date}
      assert 2015..2020//_ = year_options(conn)
    end

    test "year_options/1 defaults to Util.now", %{conn: conn} do
      with_mock Util, [:passthrough], now: fn -> ~N[2020-01-02T05:00:00] end do
        assert 2016..2021//_ = year_options(conn)
      end
    end
  end
end
