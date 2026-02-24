defmodule DotcomWeb.Mode.Hub do
  @moduledoc "Mode hub pages."

  use Dotcom.Gettext.Sigils
  use Phoenix.Controller, formats: [html: "View"]

  import DotcomWeb.ControllerHelpers, only: [green_routes: 0]
  import DotcomWeb.Router.Helpers, only: [mode_path: 2]
  import Util.AsyncAssign

  alias CMS.{API, Partial.Teaser, Repo}
  alias Routes.Route
  alias Util.Breadcrumb

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  def index(mode_module, conn, params) do
    mode_routes =
      if Kernel.function_exported?(mode_module, :routes, 0) do
        mode_module.routes()
      else
        mode_module.route_type() |> @routes_repo.by_type()
      end

    render_index(conn, mode_module, mode_routes, params)
  end

  defp render_index(conn, mode_module, mode_routes, params) do
    alerts_fn = fn -> alerts(mode_routes, conn.assigns.date_time) end
    guides_fn = fn -> mode_module.mode_name() |> guides() end
    news_fn = fn -> mode_module.mode_name() |> teasers([:news_entry]) end
    projects_fn = fn -> mode_module.mode_name() |> teasers([:project], 2) end

    conn
    |> filter_recently_visited(mode_module.route_type())
    |> async_assign_default(:fares, &mode_module.fares/0, [])
    |> async_assign_default(:alerts, alerts_fn, [])
    |> assign(:meta_description, mode_module.meta_description())
    |> assign(:green_routes, green_routes())
    |> assign(:routes, mode_routes)
    |> assign(:route_type, mode_module.route_type() |> Route.type_atom())
    |> assign(:mode_name, mode_module.mode_name())
    |> assign(:mode_icon, mode_module.mode_icon())
    |> assign(:fare_description, mode_module.fare_description())
    |> assign(:maps, mode_module.mode_icon() |> maps())
    |> assign(:paragraph, mode_module.mode_icon() |> extra_paragraph())
    |> async_assign_default(:guides, guides_fn, [])
    |> async_assign_default(:news, news_fn, [])
    |> async_assign_default(:projects, projects_fn, [])
    |> assign(:breadcrumbs, [
      Breadcrumb.build(~t"Schedules & Maps", mode_path(conn, :index)),
      Breadcrumb.build(mode_module.mode_name())
    ])
    |> await_assign_all_default(__MODULE__)
    |> render("hub.html", params)
  end

  defp filter_recently_visited(
         %{assigns: %{recently_visited: recently_visited}} = conn,
         route_type
       )
       when route_type in [2, 3] do
    filtered = Enum.filter(recently_visited, &(&1.type == route_type))
    assign(conn, :recently_visited, filtered)
  end

  defp filter_recently_visited(conn, _route_type) do
    assign(conn, :recently_visited, [])
  end

  defp alerts(mode_routes, now) do
    mode_routes
    |> Enum.map(& &1.id)
    |> Alerts.Repo.by_route_ids(now)
  end

  def maps(:commuter_rail), do: [:commuter_rail, :commuter_rail_zones]
  def maps(type), do: [type]

  @spec guides(String.t()) :: [Teaser.t()]
  defp guides(mode) do
    Repo.teasers(type: [:page], topic: "guides", sidebar: 1, mode: mode_to_param(mode))
  end

  @spec mode_to_param(String.t()) :: String.t()
  defp mode_to_param(mode) do
    mode
    |> String.downcase()
    |> String.replace(" ", "-")
  end

  @spec teasers(String.t(), [API.type()], integer) :: [Teaser.t()]
  defp teasers(mode, content_type, limit \\ 10) do
    mode
    |> mode_to_param()
    |> do_teasers(content_type, limit)
  end

  @spec do_teasers(String.t(), [API.type()], integer) :: [Teaser.t()]
  defp do_teasers(mode, content_type, limit) do
    [mode: mode, type: content_type, sidebar: 1, items_per_page: limit]
    |> Repo.teasers()
    |> Enum.map(&teaser_url(&1, mode))
  end

  @spec teaser_url(Teaser.t(), String.t()) :: Teaser.t()
  defp teaser_url(%Teaser{} = teaser, mode) do
    url = UrlHelpers.build_utm_url(teaser, source: "hub", term: mode, type: "sidebar")
    %{teaser | path: url}
  end

  defp extra_paragraph(:bus) do
    case Repo.get_paragraph("paragraphs/custom-html/bus-stop-changes-right-rail") do
      {:error, _} -> nil
      result -> result
    end
  end

  defp extra_paragraph(_), do: nil
end
