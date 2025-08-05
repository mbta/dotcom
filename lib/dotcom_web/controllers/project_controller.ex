defmodule DotcomWeb.ProjectController do
  @moduledoc """
  Controller for project-related CMS content
  """

  use DotcomWeb, :controller

  alias CMS.{Partial.Teaser, Repo}
  alias CMS.Page.{Project, ProjectUpdate}
  alias DotcomWeb.ProjectView
  alias Plug.Conn

  @breadcrumb_base ~t"Projects"
  @placeholder_image_path "/images/project-image-placeholder.png"
  @n_projects_per_page 10
  @n_project_updates_per_page 4
  @n_featured_projects_per_page 5

  def index(conn, _) do
    project_teasers_fn = fn ->
      fetch_teasers(0)
    end

    featured_project_teasers_fn = fn ->
      fetch_featured_teasers()
    end

    project_update_teasers_fn = fn ->
      fetch_update_teasers(0)
    end

    conn
    |> async_assign_default(:project_teasers, project_teasers_fn, [])
    |> async_assign_default(:featured_project_teasers, featured_project_teasers_fn, [])
    |> async_assign_default(:project_update_teasers, project_update_teasers_fn, [])
    |> assign(:breadcrumbs, [Breadcrumb.build(@breadcrumb_base)])
    |> assign(:placeholder_image_url, CMS.Helpers.rewrite_url(@placeholder_image_path))
    |> await_assign_all_default(__MODULE__)
    |> render("index.html")
  end

  @spec sort_by_date([Teaser.t()]) :: [Teaser.t()]
  defp sort_by_date(teasers) do
    Enum.sort(teasers, fn %{date: d1}, %{date: d2} ->
      {d1.year, d1.month, d1.day} >= {d2.year, d2.month, d2.day}
    end)
  end

  def api(conn, %{"offset" => offset, "filter" => filter_params}) do
    line_or_mode = translate_filter_params(filter_params)
    offset = String.to_integer(offset)
    teasers = fetch_teasers(offset, line_or_mode)
    json(conn, teasers)
  end

  def api(conn, %{"filter" => filter_params} = params) do
    line_or_mode = translate_filter_params(filter_params)

    project_teasers_fn = fn ->
      fetch_teasers(0, line_or_mode)
    end

    featured_project_teasers_fn = fn ->
      fetch_featured_teasers(line_or_mode)
    end

    project_update_teasers_fn = fn ->
      fetch_update_teasers(0, line_or_mode)
    end

    project_teasers_task = Task.async(project_teasers_fn)
    featured_project_teasers_task = Task.async(featured_project_teasers_fn)
    project_update_teasers_task = Task.async(project_update_teasers_fn)
    project_teasers = Task.await(project_teasers_task)
    featured_project_teasers = Task.await(featured_project_teasers_task)
    project_update_teasers = Task.await(project_update_teasers_task)

    {featured_project_teasers, project_teasers, offset_start} =
      promote_regular_teasers_to_featured(
        params,
        featured_project_teasers,
        project_teasers
      )

    json(conn, %{
      "projects" => project_teasers,
      "featuredProjects" => featured_project_teasers,
      "projectUpdates" => project_update_teasers,
      "offsetStart" => offset_start
    })
  end

  def project_updates(conn, %{"project_alias" => project_alias}) do
    get_page_fn = Map.get(conn.assigns, :get_page_fn, &Repo.get_page/2)
    teasers_fn = Map.get(conn.assigns, :teasers_fn, &Repo.teasers/1)

    "/projects"
    |> Path.join(project_alias)
    |> get_page_fn.(conn.query_params)
    |> case do
      %Project{} = project ->
        breadcrumbs = [
          Breadcrumb.build(@breadcrumb_base, project_path(conn, :index)),
          Breadcrumb.build(project.title, project_path(conn, :show, project)),
          Breadcrumb.build(~t"Updates")
        ]

        conn
        |> put_view(ProjectView)
        |> render("updates.html", %{
          breadcrumbs: breadcrumbs,
          project: project,
          updates:
            teasers_fn.(
              related_to: project.id,
              type: [:project_update],
              items_per_page: 50
            )
        })

      {:error, {:redirect, status, [to: "/projects/" <> redirect_alias]}} ->
        conn
        |> put_status(status)
        |> redirect(to: project_updates_path(conn, :project_updates, redirect_alias))

      {:error, :not_found} ->
        render_404(conn)

      _ ->
        conn
        |> put_status(:bad_gateway)
        |> put_view(DotcomWeb.ErrorView)
        |> render("crash.html", [])
        |> halt()
    end
  end

  @spec show_project_update(Conn.t(), ProjectUpdate.t()) :: Conn.t()
  def show_project_update(%Conn{} = conn, %ProjectUpdate{} = update) do
    case Repo.get_page(update.project_url) do
      %Project{} = project ->
        breadcrumbs = [
          Breadcrumb.build(@breadcrumb_base, project_path(conn, :index, [])),
          Breadcrumb.build(project.title, project_path(conn, :show, project)),
          Breadcrumb.build(
            ~t"Updates",
            project_updates_path(conn, :project_updates, Project.alias(project))
          ),
          Breadcrumb.build(update.title)
        ]

        conn
        |> put_view(ProjectView)
        |> render("update.html", %{
          breadcrumbs: breadcrumbs,
          update: update
        })

      {:error, {:redirect, _, [to: path]}} ->
        show_project_update(conn, %{update | project_url: path})

      _ ->
        render_404(conn)
    end
  end

  @spec simplify_teaser(map()) :: map()
  defp simplify_teaser(teaser) do
    teaser
    |> Map.put(:path, project_path(DotcomWeb.Endpoint, :show, teaser))
    |> Map.take(~w(id text image path title routes date status)a)
  end

  @spec fetch_featured_teasers(String.t() | nil) :: [map()]
  defp fetch_featured_teasers(line_or_mode \\ nil) do
    api_params = [type: [:project], sticky: 1, items_per_page: @n_featured_projects_per_page]

    api_params =
      if line_or_mode do
        Keyword.merge(api_params, route_id: line_or_mode)
      else
        api_params
      end

    api_params
    |> Repo.teasers()
    |> sort_by_date()
    |> Enum.map(&simplify_teaser/1)
  end

  @spec fetch_teasers(integer, String.t() | nil, integer | nil) :: [map()]
  defp fetch_teasers(offset, line_or_mode \\ nil, n_to_fetch \\ @n_projects_per_page) do
    api_params = [type: [:project], items_per_page: n_to_fetch, offset: offset]

    api_params =
      if line_or_mode do
        Keyword.merge(api_params, route_id: line_or_mode)
      else
        api_params
      end

    Repo.teasers(api_params)
    |> sort_by_date()
    |> Enum.map(&simplify_teaser/1)
  end

  @spec fetch_update_teasers(integer, String.t() | nil) :: [map()]
  defp fetch_update_teasers(offset, line_or_mode \\ nil) do
    api_params = [
      type: [:project_update],
      items_per_page: @n_project_updates_per_page,
      offset: offset
    ]

    api_params =
      if line_or_mode do
        Keyword.merge(api_params, route_id: line_or_mode)
      else
        api_params
      end

    Repo.teasers(api_params)
    |> sort_by_date()
    |> Enum.map(&simplify_teaser/1)
  end

  @spec get_breadcrumb_base :: String.t()
  def get_breadcrumb_base do
    @breadcrumb_base
  end

  @spec translate_filter_params(map() | nil) :: String.t() | nil
  def translate_filter_params(%{"mode" => "subway", "line" => "undefined"}) do
    "subway"
  end

  def translate_filter_params(%{"mode" => "subway", "line" => line}) do
    String.capitalize(line)
  end

  def translate_filter_params(%{"mode" => mode}) do
    case mode do
      "undefined" -> nil
      "commuter_rail" -> "commuter-rail"
      _ -> mode
    end
  end

  def promote_regular_teasers_to_featured(params, featured_project_teasers, project_teasers) do
    filter_params = params |> Map.get("filter")

    if filter_params && length(featured_project_teasers) < @n_featured_projects_per_page do
      n_features_to_promote = @n_featured_projects_per_page - length(featured_project_teasers)
      features_to_promote = Enum.take(project_teasers, n_features_to_promote)
      offset_start = length(features_to_promote)

      project_teasers =
        if offset_start > 0 do
          Enum.concat(
            project_teasers,
            fetch_teasers(
              length(project_teasers),
              translate_filter_params(filter_params),
              offset_start
            )
          )
        else
          project_teasers
        end

      {Enum.concat(featured_project_teasers, features_to_promote),
       Enum.drop(project_teasers, n_features_to_promote), offset_start}
    else
      {featured_project_teasers, project_teasers, 0}
    end
  end
end
