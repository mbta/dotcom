defmodule CMS.Api.StaticTest do
  use ExUnit.Case

  import CMS.Api.Static

  describe "view/2" do
    test "stubs /news when given a page parameter and returns valid json" do
      assert {:ok, [record]} = view("/cms/news", page: 1)
      assert record_type(record) == "news_entry"
    end

    test "/projects/project-deleted/update/project-deleted-update" do
      assert {:ok, %{"field_project" => [project]}} =
               view("/projects/project-deleted/update/project-deleted-progress", %{})

      assert %{"url" => "/projects/project-deleted"} = project
    end

    test "basic page w/o alias" do
      assert {:ok, %{"uuid" => [uuid]}} = view("/node/3183", %{})
      assert %{"value" => "d78c7dbe-9474-41df-816a-e0f670ba01f3"} = uuid
    end

    test "diversion page" do
      assert {:ok, %{"uuid" => [uuid]}} = view("/diversions/diversion", %{})
      assert %{"value" => "a1a62980-4a8f-4de8-baab-2beb6a95659b"} = uuid
    end

    test "redirects" do
      assert {:error, {:redirect, 302, _}} = view("/redirected-url", %{})
      assert {:error, {:redirect, 301, _}} = view("/news/redirected-url", %{})
      assert {:error, {:redirect, 301, _}} = view("/events/redirected-url", %{})
      assert {:error, {:redirect, 301, _}} = view("/projects/redirected-project", %{})

      assert {:error, {:redirect, 301, _}} =
               view("/projects/project-name/update/redirected-update", %{})

      assert {:error, {:redirect, 301, _}} =
               view("/projects/project-name/update/redirected-update-with-paragraphs", %{})

      assert {:error, {:redirect, 301, _}} = view("/node/3518", %{})
      assert {:error, {:redirect, 301, _}} = view("/node/3458", %{})
      assert {:error, {:redirect, 301, _}} = view("/node/3480", %{})
      assert {:error, {:redirect, 301, _}} = view("/node/3174", %{})
    end

    test "/cms/teasers/guides" do
      assert {:ok, guides} = view("/cms/teasers/guides", %{})
      refute Enum.empty?(guides)

      for guide <- guides do
        assert Map.fetch(guide, "topic") == {:ok, "Guides"}
      end
    end

    test "/cms/teasers?type[]=news_entry" do
      assert {:ok, news_entries} = view("/cms/teasers", %{type: [:news_entry]})
      refute Enum.empty?(news_entries)

      for news_entry <- news_entries do
        assert Map.fetch(news_entry, "type") == {:ok, "news_entry"}
      end
    end

    test "/cms/teasers?type[]=project_update" do
      assert {:ok, updates} = view("/cms/teasers", %{type: [:project_update]})
      refute Enum.empty?(updates)

      for update <- updates do
        assert Map.fetch(update, "type") == {:ok, "project_update"}
      end
    end

    test "/cms/teasers?type[]=project" do
      assert {:ok, projects} = view("/cms/teasers", %{type: [:project]})
      refute Enum.empty?(projects)

      for project <- projects do
        assert Map.fetch(project, "type") == {:ok, "project"}
      end
    end

    test "/cms/teasers?type[]=event" do
      assert {:ok, events} = view("/cms/teasers", %{type: [:event]})
      refute Enum.empty?(events)

      for event <- events do
        assert Map.fetch(event, "type") == {:ok, "event"}
      end
    end

    test "/cms/teasers?type[]=diversion" do
      assert {:ok, diversions} = view("/cms/teasers", %{type: [:diversion]})
      refute Enum.empty?(diversions)

      for diversion <- diversions do
        assert Map.fetch(diversion, "type") == {:ok, "diversion"}
      end
    end

    test "/admin/content/paragraphs/25" do
      assert {:error, {:redirect, 301, to: new_location}} =
               view("/admin/content/paragraphs/25", %{})

      assert "/paragraphs/custom-html/projects-index" = new_location
    end

    test "/paragraphs/custom-html/projects-index" do
      assert {:ok, library_paragraph_item} = view("/paragraphs/custom-html/projects-index", %{})
      assert %{"id" => [%{"value" => 25}]}
      assert %{"paragraphs" => [_]} = library_paragraph_item
    end
  end

  describe "redirect/3" do
    test "redirects with params if they exist" do
      assert redirect("path", %{}, 302) == {:error, {:redirect, 302, [to: "path"]}}
    end

    test "redirects without params if they do not exist" do
      assert redirect("path", %{"foo" => "bar"}, 302) ==
               {:error, {:redirect, 302, [to: "path?foo=bar"]}}
    end
  end

  defp record_type(%{"type" => [%{"target_id" => type}]}), do: type
end
