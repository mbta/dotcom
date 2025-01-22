defmodule DotcomWeb.CmsRouterHelpersTest do
  @moduledoc false
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.CmsRouterHelpers

  alias CMS.Page.Event
  alias CMS.Page.NewsEntry
  alias CMS.Page.Project
  alias CMS.Page.ProjectUpdate

  describe "news_entry_path/3" do
    test "handles :index", %{conn: conn} do
      assert news_entry_path(conn, :index) == "/news"
    end

    test "handles :show with no path_alias", %{conn: conn} do
      assert news_entry_path(conn, :show, %NewsEntry{id: 12, path_alias: nil}) ==
               "/node/12"
    end

    test "handles :show with path_alias", %{conn: conn} do
      assert news_entry_path(conn, :show, %NewsEntry{
               id: 12,
               path_alias: "/news/date/title"
             }) == "/news/date/title"
    end

    test "handles :show with non-conforming path_alias", %{conn: conn} do
      assert news_entry_path(conn, :show, "incorrect-pattern") == "/news/incorrect-pattern"
    end
  end

  describe "news_entry_path/4" do
    test "handles :show", %{conn: conn} do
      assert news_entry_path(conn, :show, "date", "title") == "/news/date/title"
    end
  end

  describe "event_path/3" do
    test "handles :index", %{conn: conn} do
      assert event_path(conn, :index) == "/events"
    end

    test "handles :show with no path_alias", %{conn: conn} do
      assert event_path(conn, :show, %Event{id: 12, path_alias: nil}) == "/node/12"
    end

    test "handles :show with path_alias", %{conn: conn} do
      assert event_path(conn, :show, %Event{id: 12, path_alias: "/events/date/title"}) ==
               "/events/date/title"
    end

    test "handles :show with non-conforming path_alias", %{conn: conn} do
      assert event_path(conn, :show, "incorrect-pattern") == "/events/incorrect-pattern"
    end
  end

  describe "event_path/4" do
    test "handles :show", %{conn: conn} do
      assert event_path(conn, :show, "date", "title") == "/events/date/title"
    end
  end

  describe "project_path/3" do
    test "handles :index", %{conn: conn} do
      assert project_path(conn, :index) == "/projects"
    end

    test "handles :show with no path_alias", %{conn: conn} do
      assert project_path(conn, :show, %Project{id: 12, path_alias: nil}) == "/node/12"
    end

    test "handles :show with path_alias", %{conn: conn} do
      assert project_path(conn, :show, %Project{
               id: 12,
               path_alias: "/projects/project-name"
             }) == "/projects/project-name"
    end

    test "handles :show with teaser", %{conn: conn} do
      assert project_path(conn, :show, %CMS.Partial.Teaser{
               id: 12,
               type: :project,
               title: "Project Name",
               path: "/projects/project-name"
             }) == "/projects/project-name"
    end

    test "handles :show with project name", %{conn: conn} do
      assert project_path(conn, :show, "project-title") == "/projects/project-title"
    end
  end

  describe "project_update_path/3" do
    test "handles :project_update with no path alias", %{conn: conn} do
      assert project_update_path(conn, :project_update, %ProjectUpdate{
               id: 12,
               project_id: 13,
               path_alias: nil
             }) == "/node/12"
    end

    test "handles :project_update with path alias", %{conn: conn} do
      project_update = %ProjectUpdate{
        id: 12,
        project_id: 13,
        path_alias: "/projects/project-name/update/update-name"
      }

      result = project_update_path(conn, :project_update, project_update)
      assert result == "/projects/project-name/update/update-name"
    end
  end

  describe "project_update_path/4" do
    test "handles :project_update", %{conn: conn} do
      assert project_update_path(conn, :project_update, "project-name", "update-name") ==
               "/projects/project-name/update/update-name"
    end
  end
end
