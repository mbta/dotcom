defmodule SiteWeb.EventController do
  @moduledoc "Handles fetching event data for event views"
  use SiteWeb, :controller

  alias CMS.{API, Page, Repo}
  alias CMS.Page.Event
  alias Plug.Conn
  alias Site.IcalendarGenerator
  alias SiteWeb.ControllerHelpers
  alias SiteWeb.EventView

  plug(SiteWeb.Plugs.YearMonth)
  plug(:assign_events)

  def index(conn, _params) do
    conn
    |> assign(:breadcrumbs, [Breadcrumb.build("Events")])
    |> await_assign_all_default(__MODULE__)
    |> render("index.html", conn: conn)
  end

  defp assign_events(conn, _opts) do
    conn
    |> async_assign_default(
      :events,
      fn ->
        Repo.events_for_year(conn.assigns.year)
      end,
      []
    )
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
end
