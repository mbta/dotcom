defmodule DotcomWeb.ControllerHelpers do
  @moduledoc false

  import Plug.Conn, only: [halt: 1, put_resp_content_type: 2, put_status: 2]
  import Phoenix.Controller, only: [render: 3, put_view: 2]

  alias Alerts.{Alert, InformedEntity, Match, Repo}
  alias DotcomWeb.CMSController
  alias Phoenix.Controller
  alias Plug.Conn
  alias Routes.{Group, Route}
  alias Timex.Format.DateTime.Formatters.Strftime

  @req Application.compile_env!(:dotcom, :req_module)
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

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
    |> put_view(DotcomWeb.ErrorView)
    |> render("404.html", [])
    |> halt()
  end

  def render_500(conn) do
    conn
    |> put_status(:internal_server_error)
    |> put_view(DotcomWeb.ErrorView)
    |> render("500.html", [])
  end

  def return_internal_error(conn),
    do: return_error(conn, :internal_server_error, "Internal error")

  def return_invalid_arguments_error(conn),
    do: return_error(conn, :bad_request, "Invalid arguments")

  def return_zero_results_error(conn),
    do: return_error(conn, :internal_server_error, "Zero results")

  def return_error(conn, response_code, message) do
    conn
    |> put_resp_content_type("application/json")
    |> put_status(response_code)
    |> Controller.json(%{error: message})
  end

  @spec filter_routes([{atom, [Route.t()]}], [atom]) :: [{atom, [Route.t()]}]
  def filter_routes(grouped_routes, filter_lines) do
    grouped_routes
    |> Enum.map(fn {mode, lines} ->
      if mode in filter_lines do
        {mode, lines |> Enum.filter(&Route.frequent_route?/1)}
      else
        {mode, lines}
      end
    end)
  end

  @spec filtered_grouped_routes([atom]) :: [{atom, [Route.t()]}]
  def filtered_grouped_routes(filters) do
    @routes_repo.all()
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
  def green_routes, do: Enum.map(GreenLine.branch_ids(), &@routes_repo.get(&1))

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
    case CMS.Api.client() |> @req.get(url: url, cache: true) do
      {:ok, %{status: 200, body: body, headers: headers}} when not is_nil(body) ->
        conn
        |> add_headers_if_valid(headers)
        |> Conn.send_resp(200, body)

      _ ->
        Conn.send_resp(conn, :not_found, "")
    end
  end

  @spec check_cms_or_404(Conn.t()) :: Conn.t()
  def check_cms_or_404(conn) do
    conn
    |> Controller.put_view(DotcomWeb.CMSView)
    |> CMSController.page(%{})
  end

  @spec unavailable_after_one_year(Conn.t(), Date.t() | DateTime.t()) :: Conn.t()
  def unavailable_after_one_year(conn, nil) do
    conn
  end

  def unavailable_after_one_year(conn, posted_on) do
    # only add tag if there isn't already a "noindex" value
    if Conn.get_resp_header(conn, "x-robots-tag") |> Enum.member?("noindex") do
      conn
    else
      Conn.put_resp_header(
        conn,
        "x-robots-tag",
        "unavailable_after: #{one_year_after(posted_on)}"
      )
    end
  end

  @spec filter_alerts_by_direction([Alert.t()], boolean, String.t() | number | nil) :: [Alert.t()]
  defp filter_alerts_by_direction(alerts, false, _), do: alerts
  defp filter_alerts_by_direction(alerts, true, nil), do: alerts

  defp filter_alerts_by_direction(alerts, true, direction_id) when is_bitstring(direction_id),
    do: filter_alerts_by_direction(alerts, true, String.to_integer(direction_id))

  defp filter_alerts_by_direction(alerts, true, direction_id) when is_number(direction_id) do
    Enum.filter(alerts, fn %{informed_entity: informed_entity} ->
      # direction matches if the direction of the alert is the same or nil
      Enum.any?(informed_entity, &(&1.direction_id == direction_id or is_nil(&1.direction_id)))
    end)
  end

  @spec add_headers_if_valid(Conn.t(), %{optional(binary()) => [binary()]}) :: Conn.t()
  defp add_headers_if_valid(conn, headers) do
    Enum.reduce(headers, conn, fn
      {key, [value]}, conn
      when key in @valid_resp_headers and is_binary(value) ->
        Conn.put_resp_header(conn, key, value)

      _, conn ->
        conn
    end)
  end

  # Formats the date using RFC-850 style: "25 Jun 2010 00:00:00 EST"
  # See https://developers.google.com/search/reference/robots_meta_tag for reference
  defp one_year_after(posted_on) do
    one_year_after = posted_on |> Date.add(365)

    "#{Strftime.format!(one_year_after, "%d %b %Y")} 00:00:00 EST"
  end

  def call_plug_with_opts(conn, module, opts) do
    module.call(conn, module.init(opts))
  end
end
