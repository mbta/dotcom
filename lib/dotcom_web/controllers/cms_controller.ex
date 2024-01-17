defmodule DotcomWeb.CMSController do
  @moduledoc """
  Handles rendering of CMS content based on content type.
  """

  use DotcomWeb, :controller

  require Logger

  alias CMS.{API, Page, Repo}
  alias CMS.Page.Project
  alias Plug.Conn

  alias DotcomWeb.{
    EventController,
    NewsEntryController,
    ProjectController
  }

  @generic [
    Page.Basic,
    Page.Person,
    Page.Landing,
    Page.Project,
    Page.Redirect
  ]

  @routed [
    Page.Event,
    Page.NewsEntry
  ]

  @transitional [
    Page.ProjectUpdate
  ]

  @cache Application.get_env(:dotcom, :cms_cache)

  @spec page(Conn.t(), map) :: Conn.t()
  def page(%Conn{request_path: path, query_params: query_params} = conn, _params) do
    conn = Conn.assign(conn, :try_encoded_on_404?, Map.has_key?(query_params, "id"))

    path
    |> Repo.get_page(query_params)
    |> handle_page_response(conn)
  end

  @doc """
  Resets a cache key based on the URL params.
  PATCH /cms/foo/bar will reset the cache key /cms/foo/bar.
  This corresponds to the CMS page /foo/bar.
  """
  def reset_cache_key(conn, %{"object" => object, "id" => id}) do
    try do
      @cache.delete("/cms/#{object}/#{id}")

      Logger.notice("cms.cache.delete path=/cms/#{object}/#{id}")
    rescue
      e in Redix.ConnectionError -> Logger.warning("cms.cache.delete error=redis-#{e.reason}")
      e in Redix.Error -> Logger.warning("cms.cache.delete error=redis-#{e.message}")
    end

    send_resp(conn, 202, "") |> halt()
  end

  def reset_cache_key(conn, %{"id" => id}) do
    try do
      @cache.delete("/cms/#{id}")

      Logger.notice("cms.cache.delete path=/cms/#{id}")
    rescue
      e in Redix.ConnectionError -> Logger.warning("cms.cache.delete error=redis-#{e.reason}")
      e in Redix.Error -> Logger.warning("cms.cache.delete error=redis-#{e.message}")
    end

    send_resp(conn, 202, "") |> halt()
  end

  @spec handle_page_response(Page.t() | {:error, API.error()}, Conn.t()) ::
          Plug.Conn.t()
  defp handle_page_response(%{__struct__: struct} = page, conn)
       when struct in @routed do
    # If these content types reach this point with a 200, something is wrong with their path alias
    # (the type-specific route controller is not being invoked due to the path not matching).
    case struct do
      Page.NewsEntry -> NewsEntryController.show_news_entry(conn, page)
      Page.Event -> EventController.show_event(conn, page)
    end
  end

  defp handle_page_response(%{__struct__: struct, paragraphs: []} = page, conn)
       when struct in @transitional do
    # If transitional types are found w/o paragraphs, use the original controller to render.
    case struct do
      Page.ProjectUpdate -> ProjectController.show_project_update(conn, page)
    end
  end

  defp handle_page_response(%{__struct__: struct} = page, conn)
       when struct in @generic or struct in @transitional do
    conn
    |> put_layout({DotcomWeb.LayoutView, :app})
    |> render_page(page)
  end

  defp handle_page_response({:error, {:redirect, status, opts}}, conn) do
    conn
    |> put_status(status)
    |> redirect(opts)
  end

  defp handle_page_response(
         {:error, :not_found},
         %Conn{assigns: %{try_encoded_on_404?: true}} = conn
       ) do
    conn = Conn.assign(conn, :try_encoded_on_404?, false)

    conn.request_path
    |> Repo.get_page_with_encoded_id(conn.query_params)
    |> handle_page_response(conn)
  end

  defp handle_page_response({:error, :not_found}, %Conn{} = conn) do
    render_404(conn)
  end

  defp handle_page_response({:error, _}, conn) do
    conn
    |> put_status(500)
    |> put_view(DotcomWeb.ErrorView)
    |> render("500.html", [])
  end

  @spec render_page(Conn.t(), Page.t()) :: Conn.t()
  defp render_page(conn, %Page.Project{} = project) do
    base = ProjectController.get_breadcrumb_base()

    breadcrumbs = [
      Breadcrumb.build(base, project_path(conn, :index)),
      Breadcrumb.build(project.title)
    ]

    conn = assign(conn, :alerts, Alerts.Repo.all(conn.assigns.date_time))

    render_generic(conn, project, breadcrumbs)
  end

  defp render_page(conn, %Page.ProjectUpdate{} = update) do
    base = ProjectController.get_breadcrumb_base()
    conn = assign(conn, :alerts, Alerts.Repo.all(conn.assigns.date_time))

    case Repo.get_page(update.project_url) do
      %Page.Project{} = project ->
        breadcrumbs = [
          Breadcrumb.build(base, project_path(conn, :index, [])),
          Breadcrumb.build(project.title, project_path(conn, :show, project)),
          Breadcrumb.build(
            "Updates",
            project_updates_path(conn, :project_updates, Project.alias(project))
          ),
          Breadcrumb.build(update.title)
        ]

        render_generic(conn, update, breadcrumbs)

      {:error, {:redirect, _, [to: path]}} ->
        render_page(conn, %{update | project_url: path})

      _ ->
        render_404(conn)
    end
  end

  defp render_page(conn, %Page.Basic{} = page) do
    render_generic(conn, page, page.breadcrumbs)
  end

  defp render_page(conn, %Page.Landing{} = page) do
    conn
    |> assign(:breadcrumbs, page.breadcrumbs)
    |> assign(:page, page)
    |> render("landing_page.html")
  end

  defp render_page(conn, %Page.Person{} = person) do
    conn
    |> assign(:breadcrumbs, [Breadcrumb.build("People"), Breadcrumb.build(person.name)])
    |> render("person.html", person: person)
  end

  defp render_page(conn, %Page.Redirect{link: link}) do
    redirect(conn, external: link.url)
  end

  @spec render_generic(Conn.t(), Page.t(), [any()]) :: Conn.t()
  defp render_generic(conn, page, breadcrumbs) do
    conn
    |> assign(:breadcrumbs, breadcrumbs)
    |> assign(:page, page)
    |> render("page.html", conn: conn)
  end
end
