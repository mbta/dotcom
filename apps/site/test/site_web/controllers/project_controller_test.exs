defmodule SiteWeb.ProjectControllerTest do
  use SiteWeb.ConnCase

  import Mock

  alias CMS.{API.Static, Page.Project, Page.ProjectUpdate, Repo}
  alias Plug.Conn

  describe "index" do
    test "renders the list of projects", %{conn: conn} do
      conn = get(conn, project_path(conn, :index))
      assert html_response(conn, 200) =~ "<h1>MBTA Projects and Programs</h1>"
    end
  end

  describe "show" do
    test "project calls all secondary endpoints correctly", %{conn: conn} do
      project = Static.project_repo() |> List.first()
      assert %{"nid" => [%{"value" => 3004}]} = project

      mock_view = fn
        "/node/3004", %{} ->
          {:ok, project}

        "/cms/teasers",
        %{
          related_to: 3004,
          sort_by: "field_posted_on_value",
          sort_order: :DESC,
          type: [:project_update]
        } ->
          {:ok, []}

        "/cms/teasers",
        %{
          related_to: 3004,
          type: [:diversion]
        } ->
          {:ok, []}

        "/cms/teasers",
        %{
          related_to: 3004,
          type: [:event],
          date_op: "<"
        } ->
          {:ok, []}

        "/cms/teasers",
        %{
          related_to: 3004,
          type: [:event],
          date_op: ">="
        } ->
          {:ok, []}
      end

      with_mock Static, view: mock_view do
        conn = conn |> get("/node/3004")
        assert html_response(conn, 200) =~ "Wollaston Station Improvements"

        "/cms/teasers"
        |> Static.view(%{
          related_to: 3004,
          sort_by: "field_posted_on_value",
          sort_order: :DESC,
          type: [:project_update]
        })
        |> assert_called()

        "/cms/teasers"
        |> Static.view(%{
          related_to: 3004,
          type: [:diversion]
        })
        |> assert_called()

        "/cms/teasers"
        |> Static.view(%{
          related_to: 3004,
          type: [:event],
          date_op: "<"
        })
        |> assert_called()

        "/cms/teasers"
        |> Static.view(%{
          related_to: 3004,
          type: [:event],
          date_op: ">="
        })
        |> assert_called()
      end
    end

    test "renders and does not rewrite an unaliased project response", %{conn: conn} do
      project = project_factory(0)
      assert project.path_alias == nil
      assert project.title == "Wollaston Station Improvements"
      path = project_path(conn, :show, project)
      assert path == "/node/3004"

      conn = get(conn, path)
      assert html_response(conn, 200) =~ "Wollaston Station Improvements"
    end

    test "renders a project with a path alias", %{conn: conn} do
      project = project_factory(1)

      assert project.path_alias == "/projects/project-name"

      conn = get(conn, project_path(conn, :show, project))
      assert html_response(conn, 200) =~ "<h2>What is the SL3?</h2>"
    end

    test "renders a preview of the requested project", %{conn: conn} do
      project = project_factory(1)
      conn = get(conn, project_path(conn, :show, project) <> "?preview&vid=112&nid=3480")
      assert html_response(conn, 200) =~ "Silver Line 3 Chelsea (SL3) 112"
      assert %{"preview" => nil, "vid" => "112", "nid" => "3480"} == conn.query_params
    end

    test "retains params and redirects with correct status code when CMS returns a native redirect",
         %{conn: conn} do
      conn = get(conn, project_path(conn, :show, "redirected-project") <> "?preview&vid=999")
      assert conn.status == 301

      assert Conn.get_resp_header(conn, "location") == [
               "/projects/project-name?preview=&vid=999"
             ]
    end

    test "renders a 404 given an valid id but mismatching content type", %{conn: conn} do
      conn = get(conn, project_path(conn, :show, "3268"))
      assert conn.status == 404
    end

    test "renders a 404 given an invalid id", %{conn: conn} do
      conn = get(conn, project_path(conn, :show, "this-does-not-exist"))
      assert conn.status == 404
    end
  end

  describe "project_updates" do
    test "renders a list of updates related to a project", %{conn: conn} do
      project = project_factory(0)
      project_id = project.id

      teaser = teaser_factory(:project_updates, 0)

      teasers_fn = fn [related_to: ^project_id, type: [:project_update], items_per_page: 50] ->
        [teaser]
      end

      resp =
        conn
        |> assign(:get_page_fn, fn _ -> project end)
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
        |> assign(:get_page_fn, fn _ -> project end)
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
        |> assign(:get_page_fn, fn _ -> {:error, {:redirect, status, to: project.path_alias}} end)
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
      |> assign(:get_page_fn, fn _ -> {:error, :not_found} end)
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
      |> assign(:get_page_fn, fn _ -> {:error, :invalid_response} end)
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
      assert %{"preview" => nil, "vid" => "112", "nid" => "3174"} == conn.query_params
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
      conn = get(conn, project_path(conn, :project_update, "3004", "3268"))
      assert conn.status == 404
    end

    test "renders a 404 given an invalid id", %{conn: conn} do
      conn = get(conn, project_path(conn, :project_update, "999", "999"))
      assert conn.status == 404
    end

    test "renders a 404 given an invalid id when project found", %{conn: conn} do
      conn = get(conn, project_path(conn, :project_update, "3004", "999"))
      assert conn.status == 404
    end

    test "renders a 404 when project update exists but project does not exist", %{conn: conn} do
      path = project_path(conn, :project_update, "project-deleted", "project-deleted-progress")

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
      path = project_api_path(conn, :api, %{offset: 0})

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
end
