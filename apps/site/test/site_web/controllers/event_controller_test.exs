defmodule SiteWeb.EventControllerTest do
  use SiteWeb.ConnCase

  describe "GET index" do
    test "renders a list of events", %{conn: conn} do
      conn = get(conn, event_path(conn, :index))

      event_links =
        html_response(conn, 200)
        |> Floki.find(".event-listing a")

      assert Enum.count(event_links) > 0
    end

    test "scopes events based on provided dates", %{conn: conn} do
      conn = get(conn, event_path(conn, :index, %{month: "2018-06-01"}))
      refute html_response(conn, 200) =~ "Fiscal & Management Control Board Meeting"
    end

    test "does not include an unavailable_after x-robots-tag HTTP header", %{conn: conn} do
      conn = get(conn, event_path(conn, :index))

      refute Enum.find(conn.resp_headers, fn {key, value} ->
               key == "x-robots-tag" && String.contains?(value, "unavailable_after")
             end)
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
      assert %{"preview" => nil, "vid" => "112", "nid" => "5"} == conn.query_params
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
end
