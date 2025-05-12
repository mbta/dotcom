defmodule DotcomWeb.ProjectControllerTest do
  use DotcomWeb.ConnCase

  import DotcomWeb.ProjectController, only: [get_breadcrumb_base: 0]

  alias CMS.{Page.Project, Page.ProjectUpdate, Repo}
  alias Plug.Conn

  describe "project_updates" do
    test "successfully renders the project update list", %{conn: conn} do
      path = project_updates_path(conn, :project_updates, "project-name")

      conn = get(conn, path)
      assert conn.status == 200
    end

    test "renders a list of updates related to a project", %{conn: conn} do
      project = project_factory(0)
      project_id = project.id

      teaser = teaser_factory(:project_updates, 0)

      teasers_fn = fn [related_to: ^project_id, type: [:project_update], items_per_page: 50] ->
        [teaser]
      end

      resp =
        conn
        |> assign(:get_page_fn, fn _, _ -> project end)
        |> assign(:teasers_fn, teasers_fn)
        |> get(project_updates_path(conn, :project_updates, Project.alias(project)))
        |> html_response(200)

      assert [update] = Floki.find(resp, ".m-project-updates__teaser")
      assert Floki.text(update) =~ "How the Wollaston Station Closure Affects Your Trip"
      assert {"a", attrs, _} = update
      assert attrs |> Map.new() |> Map.get("href") == teaser.path

      assert [view_project] = Floki.find(resp, ".c-descriptive-link")
      assert Floki.text(view_project) =~ project.title
      assert {"a", attrs, _} = view_project
      assert attrs |> Map.new() |> Map.get("href") == project_path(conn, :show, project)
    end

    test "renders an empty page when project has no updates", %{conn: conn} do
      project = project_factory(0)
      project_id = project.id

      teasers_fn = fn [related_to: ^project_id, type: [:project_update], items_per_page: 50] ->
        []
      end

      resp =
        conn
        |> assign(:get_page_fn, fn _, _ -> project end)
        |> assign(:teasers_fn, teasers_fn)
        |> get(project_updates_path(conn, :project_updates, Project.alias(project)))
        |> html_response(200)

      assert Floki.find(resp, ".m-project-updates__teaser") == []

      assert Floki.text(resp) =~ "no updates"

      assert [view_project] = Floki.find(resp, ".c-descriptive-link")
      assert Floki.text(view_project) =~ project.title
      assert {"a", attrs, _} = view_project
      assert attrs |> Map.new() |> Map.get("href") == project_path(conn, :show, project)
    end

    test "redirects when project returns a redirect", %{conn: conn} do
      project = project_factory(1)

      for status <- [301, 302] do
        conn
        |> assign(:get_page_fn, fn _, _ ->
          {:error, {:redirect, status, to: project.path_alias}}
        end)
        |> assign(:teasers_fn, fn _ ->
          send(self(), :teasers_fn)
          []
        end)
        |> get(project_updates_path(conn, :project_updates, Project.alias(project)))
        |> html_response(status)

        refute_received :teasers_fn
      end
    end

    test "404s when project 404s", %{conn: conn} do
      conn
      |> assign(:get_page_fn, fn _, _ -> {:error, :not_found} end)
      |> assign(:teasers_fn, fn _ ->
        send(self(), :teasers_fn)
        []
      end)
      |> get(project_updates_path(conn, :project_updates, "does-not-exist"))
      |> html_response(404)

      refute_received :teasers_fn
    end

    test "returns 502 when repo returns error", %{conn: conn} do
      conn
      |> assign(:get_page_fn, fn _, _ -> {:error, :invalid_response} end)
      |> assign(:teasers_fn, fn _ ->
        send(self(), :teasers_fn)
        []
      end)
      |> get(project_updates_path(conn, :project_updates, "error"))
      |> html_response(:bad_gateway)

      refute_received :teasers_fn
    end
  end

  describe "project_update" do
    test "renders and does not rewrite an unaliased project update response", %{conn: conn} do
      project_update = project_update_factory(0, path_alias: nil)

      assert project_update.path_alias == nil
      assert project_update.title == "How the Wollaston Station Closure Affects Your Trip"
      path = project_update_path(conn, :project_update, project_update)
      assert path == "/node/3005"

      conn = get(conn, path)
      assert conn.status == 200
      assert html_response(conn, 200) =~ "How the Wollaston Station Closure Affects Your Trip"
    end

    test "renders a project update with a path alias", %{conn: conn} do
      project_update = project_update_factory(1)

      assert project_update.path_alias == "/projects/project-name/update/project-progress"

      conn = get(conn, project_update_path(conn, :project_update, project_update))
      assert conn.status == 200
      assert html_response(conn, 200) =~ "<p>Wollaston Station on the Red Line closed"
    end

    test "renders a preview of the requested project update", %{conn: conn} do
      project_update = project_update_factory(1)

      conn =
        get(
          conn,
          project_update_path(conn, :project_update, project_update) <>
            "?preview&vid=112&nid=3174"
        )

      assert conn.status == 200
      assert html_response(conn, 200) =~ "Construction 1-Week Look Ahead 112"
      assert %{"preview" => "", "vid" => "112", "nid" => "3174"} == conn.query_params
    end

    test "returns a 404 if the given node is missing", %{conn: conn} do
      project_update = project_update_factory(1)

      conn =
        get(
          conn,
          project_update_path(conn, :project_update, project_update) <>
            "?preview&vid=112&nid=#{Faker.random_between(9000, 9999)}"
        )

      assert conn.status == 404
    end

    test "doesn't redirect update when project part of path would by itself return a native redirect",
         %{conn: conn} do
      conn =
        get(
          conn,
          project_update_path(
            conn,
            :project_update,
            "redirected-project",
            "not-redirected-update"
          )
        )

      assert conn.status == 200
    end

    test "retains params and redirects with correct status code when CMS returns a native redirect",
         %{conn: conn} do
      conn =
        get(
          conn,
          project_update_path(conn, :project_update, "project-name", "redirected-update") <>
            "?preview&vid=999"
        )

      assert conn.status == 301

      assert Conn.get_resp_header(conn, "location") == [
               "/projects/project-name/update/project-progress?preview=&vid=999"
             ]
    end

    test "renders a 404 given an valid id but mismatching content type", %{conn: conn} do
      conn = get(conn, project_update_path(conn, :project_update, "3004", "3268"))
      assert conn.status == 404
    end

    test "renders a 404 given an invalid id", %{conn: conn} do
      conn = get(conn, project_update_path(conn, :project_update, "999", "999"))
      assert conn.status == 404
    end

    test "renders a 404 given an invalid id when project found", %{conn: conn} do
      conn = get(conn, project_update_path(conn, :project_update, "3004", "999"))
      assert conn.status == 404
    end

    test "renders a 404 when project update exists but project does not exist", %{conn: conn} do
      path =
        project_update_path(conn, :project_update, "project-deleted", "project-deleted-progress")

      assert %ProjectUpdate{project_url: "/projects/project-deleted"} = Repo.get_page(path)

      assert conn
             |> project_path(:show, "project-deleted")
             |> Repo.get_page() == {:error, :not_found}

      conn = get(conn, path)
      assert conn.status == 404
    end
  end

  describe "api" do
    test "returns a list of project structs JSON-encoded", %{conn: conn} do
      path = project_api_path(conn, :api, %{offset: 0, filter: %{mode: "undefined"}})

      response =
        conn
        |> get(path)
        |> json_response(200)

      assert(length(response) > 0)
      expected_keys = ~w[date id image path routes status title]

      Enum.each(response, fn project ->
        Enum.each(expected_keys, fn key ->
          assert(key in Map.keys(project))
        end)
      end)
    end
  end

  describe "get_breadcrumb_base" do
    test "returns the static base breadcrumb for projects" do
      assert get_breadcrumb_base() == "Projects"
    end
  end
end
