defmodule SiteWeb.EventControllerTest do
  use SiteWeb.ConnCase
  import Mock

  @current_date ~D[2019-04-15]

  setup_with_mocks([
    {SiteWeb.Plugs.Date, [],
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
      events_hub = html_response(conn, 200) |> Floki.find(".m-events-hub")

      assert Floki.text(events_hub) =~ "MassDOT Finance and Audit Committee"

      event_links = Floki.find(events_hub, ".m-event-listing a")
      assert Enum.count(event_links) > 0
    end

    test "scopes events based on provided dates", %{conn: conn} do
      conn = get(conn, event_path(conn, :index, month: 6, year: 2018))

      events_hub = html_response(conn, 200) |> Floki.find(".m-events-hub")

      refute Floki.text(events_hub) =~ "MassDOT Finance and Audit Committee"
    end

    test "does not include an unavailable_after x-robots-tag HTTP header", %{conn: conn} do
      conn = get(conn, event_path(conn, :index))

      refute Enum.find(conn.resp_headers, fn {key, value} ->
               key == "x-robots-tag" && String.contains?(value, "unavailable_after")
             end)
    end
  end

  @tag todo: "Replacing with events_hub_redesign"
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

  describe "GET show (events_hub_redesign)" do
    setup %{conn: conn} do
      conn = conn |> put_req_cookie("events_hub_redesign", "true")
      {:ok, conn: conn}
    end

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
