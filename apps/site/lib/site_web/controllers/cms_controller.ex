defmodule SiteWeb.CMSController do
  @moduledoc """
  Handles rendering of CMS content based on content type.
  """

  use SiteWeb, :controller

  require Logger

  alias CMS.{API, Page, Repo}
  alias Plug.Conn

  alias SiteWeb.{
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
    Page.NewsEntry,
    Page.ProjectUpdate
  ]

  @spec page(Conn.t(), map) :: Conn.t()
  def page(%Conn{request_path: path, query_params: query_params} = conn, _params) do
    conn = Conn.assign(conn, :try_encoded_on_404?, Map.has_key?(query_params, "id"))

    path
    |> Repo.get_page(query_params)
    |> handle_page_response(conn)
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
      Page.ProjectUpdate -> ProjectController.show_project_update(conn, page)
    end
  end

  defp handle_page_response(%{__struct__: struct} = page, conn)
       when struct in @generic do
    conn
    |> put_layout({SiteWeb.LayoutView, :app})
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
    |> put_status(503)
    |> put_view(SiteWeb.ErrorView)
    |> render("crash.html", [])
  end

  @spec render_page(Conn.t(), Page.Basic.t()) :: Conn.t()
  defp render_page(conn, %Page.Project{} = page) do
    base = ProjectController.get_breadcrumb_base()

    breadcrumbs = [
      Breadcrumb.build(base, project_path(conn, :index)),
      Breadcrumb.build(page.title)
    ]

    render_generic(conn, page, breadcrumbs)
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
