defmodule SiteWeb.ControllerHelpers do
  @moduledoc false

  import Plug.Conn, only: [put_status: 2, halt: 1]
  import Phoenix.Controller, only: [render: 3, put_view: 2]

  alias Alerts.{Alert, InformedEntity, Match, Repo}
  alias Phoenix.Controller
  alias Plug.Conn
  alias Routes.{Group, Route}
  alias SiteWeb.CMSController
  alias Timex.Format.DateTime.Formatters.Strftime

  @content_http_pool Application.get_env(:cms, :http_pool)

  @valid_resp_headers [
    "content-type",
    "date",
    "etag",
    "expires",
    "last-modified",
    "cache-control"
  ]

  defmacro call_plug(conn, module) do
    opts = Macro.expand(module, __ENV__).init([])

    quote do
      unquote(module).call(unquote(conn), unquote(opts))
    end
  end

  def render_404(conn) do
    conn
    |> put_status(:not_found)
    |> put_view(SiteWeb.ErrorView)
    |> render("404.html", [])
    |> halt()
  end

  @spec filter_routes([{atom, [Route.t()]}], [atom]) :: [{atom, [Route.t()]}]
  def filter_routes(grouped_routes, filter_lines) do
    grouped_routes
    |> Enum.map(fn {mode, lines} ->
      if mode in filter_lines do
        {mode, lines |> Enum.filter(&Route.key_route?/1)}
      else
        {mode, lines}
      end
    end)
  end

  @spec filtered_grouped_routes([atom]) :: [{atom, [Route.t()]}]
  def filtered_grouped_routes(filters) do
    Routes.Repo.all()
    |> Group.group()
    |> filter_routes(filters)
  end

  @spec get_grouped_route_ids([{atom, [Route.t()]}]) :: [String.t()]
  def get_grouped_route_ids(grouped_routes) do
    grouped_routes
    |> Enum.flat_map(fn {_mode, routes} -> routes end)
    |> Enum.map(& &1.id)
  end

  @spec green_routes() :: [Route.t()]
  def green_routes, do: Enum.map(GreenLine.branch_ids(), &Routes.Repo.get(&1))

  @spec assign_alerts(Conn.t(), Keyword.t()) :: Conn.t()
  def assign_alerts(
        %{
          assigns:
            %{date_time: date_time, route: %Route{id: route_id, type: route_type}} = assigns
        } = conn,
        opts
      ) do
    filter_by_direction? = Keyword.get(opts, :filter_by_direction?, true)

    alerts =
      route_id
      |> Repo.by_route_id_and_type(route_type, date_time)
      |> Match.match([%InformedEntity{route_type: route_type}, %InformedEntity{route: route_id}])

    filtered_alerts =
      filter_alerts_by_direction(alerts, filter_by_direction?, assigns[:direction_id])

    conn
    |> Conn.assign(:alerts, filtered_alerts)
    |> Conn.assign(:all_alerts_count, length(alerts))
  end

  @doc """
  Gets a remote static file and forwards it to the client.
  If there's a problem with the response, returns a 404 Not Found.
  This also returns some (but not all) headers back to the client.
  Headers like ETag and Last-Modified should help with caching.
  """
  @spec forward_static_file(Conn.t(), String.t()) :: Conn.t()
  def forward_static_file(conn, url) do
    case HTTPoison.get(url, [], hackney: [pool: @content_http_pool]) do
      {:ok, %{status_code: 200, body: body, headers: headers}} ->
        conn
        |> add_headers_if_valid(headers)
        |> Conn.send_resp(:ok, body)

      _ ->
        Conn.send_resp(conn, :not_found, "")
    end
  end

  @spec check_cms_or_404(Conn.t()) :: Conn.t()
  def check_cms_or_404(conn) do
    conn
    |> Controller.put_view(SiteWeb.CMSView)
    |> CMSController.page(%{})
  end

  @spec unavailable_after_one_year(Conn.t(), Date.t() | DateTime.t()) :: Conn.t()
  def unavailable_after_one_year(conn, nil) do
    conn
  end

  def unavailable_after_one_year(conn, posted_on) do
    Conn.put_resp_header(conn, "x-robots-tag", "unavailable_after: #{one_year_after(posted_on)}")
  end

  def noindex(conn) do
    Conn.put_resp_header(conn, "x-robots-tag", "noindex")
  end

  @spec filter_alerts_by_direction([Alert.t()], boolean, map) :: [Alert.t()]
  defp filter_alerts_by_direction(alerts, false, _), do: alerts
  defp filter_alerts_by_direction(alerts, true, nil), do: alerts

  defp filter_alerts_by_direction(alerts, true, direction_id) do
    Enum.filter(alerts, fn %{informed_entity: informed_entity} ->
      # direction matches if the direction of the alert is the same or nil
      Enum.any?(informed_entity, &(&1.direction_id == direction_id or &1.direction_id == nil))
    end)
  end

  @spec add_headers_if_valid(Conn.t(), [{String.t(), String.t()}]) :: Conn.t()
  defp add_headers_if_valid(conn, headers) do
    Enum.reduce(headers, conn, fn {key, value}, conn ->
      if String.downcase(key) in @valid_resp_headers do
        Conn.put_resp_header(conn, String.downcase(key), value)
      else
        conn
      end
    end)
  end

  # Formats the date using RFC-850 style: "25 Jun 2010 00:00:00 EST"
  # See https://developers.google.com/search/reference/robots_meta_tag for reference
  defp one_year_after(posted_on) do
    one_year_after = posted_on |> Date.add(365)

    "#{Strftime.format!(one_year_after, "%d %b %Y")} 00:00:00 EST"
  end
end
