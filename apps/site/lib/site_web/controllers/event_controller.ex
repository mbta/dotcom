defmodule SiteWeb.EventController do
  @moduledoc "Handles fetching event data for event views"
  use SiteWeb, :controller

  alias CMS.{API, Page, Repo}
  alias CMS.Page.Event
  alias CMS.Partial.Teaser
  alias Plug.Conn
  alias Site.IcalendarGenerator
  alias SiteWeb.ControllerHelpers
  alias SiteWeb.EventDateRange
  alias SiteWeb.EventView

  def index(conn, params) do
    date_range = get_date_range(params)
    event_teasers_fn = get_events_for_current_month_fn(params)

    conn
    |> assign(:year, date_range.start_time_gt)
    |> async_assign_default(:events, event_teasers_fn, [])
    |> assign(:breadcrumbs, [Breadcrumb.build("Events")])
    |> await_assign_all_default(__MODULE__)
    |> render("index.html", conn: conn)
  end

  def calendar(%Conn{assigns: %{events: _events}} = conn, _params) do
    conn
    # |> assign(:breadcrumbs, [Breadcrumb.build("Events")])
    |> render("calendar.html", conn: conn)
  end

  def calendar(conn, params) do
    date_range = get_date_range(params)
    event_teasers_fn = get_events_for_current_month_fn(params)

    conn
    |> assign(:month, date_range.start_time_gt)
    |> async_assign_default(:events, event_teasers_fn, [])
    # |> assign(:breadcrumbs, [Breadcrumb.build("Events")])
    |> await_assign_all_default(__MODULE__)
    |> process_location()
    |> render("calendar.html", conn: conn)
  end

  def process_location(%{assigns: assigns} = conn) do
    if Map.has_key?(assigns, :events) do
      events = assigns.events

      events_with_encoded_location =
        Enum.map(events, fn event ->
          %{event | location: encode_location(event.location)}
        end)

      assign(conn, :events, events_with_encoded_location)
    else
      conn
    end
  end

  defp encode_location(place: place, address: address, city: city, state: state) do
    %{
      place: place,
      address: address,
      city: city,
      state: state
    }
  end

  def show(conn, %{"path_params" => path}) do
    case List.last(path) do
      "icalendar" ->
        redirect(conn, to: Path.join(["/events", "icalendar" | Enum.slice(path, 0..-2)]))

      _ ->
        conn.request_path
        |> Repo.get_page(conn.query_params)
        |> do_show(conn)
    end
  end

  defp do_show(%Event{} = event, conn) do
    show_event(conn, event)
  end

  defp do_show({:error, {:redirect, status, opts}}, conn) do
    conn
    |> put_status(status)
    |> redirect(opts)
  end

  defp do_show(_404_or_mismatch, conn) do
    render_404(conn)
  end

  @spec show_event(Conn.t(), Event.t()) :: Conn.t()
  def show_event(conn, %Event{start_time: start_time} = event) do
    conn
    |> ControllerHelpers.unavailable_after_one_year(start_time)
    |> assign_breadcrumbs(event)
    |> put_view(EventView)
    |> render("show.html", event: event)
  end

  @spec assign_breadcrumbs(Conn.t(), Event.t()) :: Conn.t()
  defp assign_breadcrumbs(conn, event) do
    conn
    |> assign(:breadcrumbs, [
      Breadcrumb.build("Events", event_path(conn, :index)),
      Breadcrumb.build(event.title)
    ])
  end

  @spec icalendar(Conn.t(), map) :: Conn.t()
  def icalendar(%{request_path: path} = conn, _) do
    path
    |> String.replace("/icalendar", "")
    |> Repo.get_page(conn.query_params)
    |> do_icalendar(conn)
  end

  @spec do_icalendar(Page.t() | {:error, API.error()}, Conn.t()) :: Conn.t()
  defp do_icalendar(%Event{} = event, conn) do
    conn
    |> put_resp_content_type("text/calendar")
    |> put_resp_header("content-disposition", "attachment; filename=#{filename(event.title)}.ics")
    |> send_resp(200, IcalendarGenerator.to_ical(conn, event))
  end

  defp do_icalendar({:error, {:redirect, _status, [to: path]}}, conn) do
    path
    |> Repo.get_page(conn.query_params)
    |> do_icalendar(conn)
  end

  defp do_icalendar(_, conn) do
    render_404(conn)
  end

  @spec filename(String.t()) :: String.t()
  defp filename(title) do
    title
    |> String.downcase()
    |> String.replace(" ", "_")
    |> decode_ampersand_html_entity
  end

  @spec decode_ampersand_html_entity(String.t()) :: String.t()
  defp decode_ampersand_html_entity(string) do
    String.replace(string, "&amp;", "&")
  end

  @spec get_date_range(map) :: map
  defp get_date_range(params) do
    {:ok, current_month} = Date.new(Util.today().year, Util.today().month, 1)
    EventDateRange.build(params, current_month)
  end

  @spec get_events_for_current_month_fn(map) :: (() -> [Teaser.t()])
  defp get_events_for_current_month_fn(params) do
    date_range = get_date_range(params)

    fn ->
      Repo.teasers(
        type: [:event],
        items_per_page: 50,
        date_op: "between",
        date: [min: date_range.start_time_gt, max: date_range.start_time_lt],
        sort_order: "ASC"
      )
    end
  end
end
