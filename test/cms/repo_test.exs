defmodule CMS.RepoTest do
  use ExUnit.Case, async: false

  require Dotcom.Assertions

  import ExUnit.CaptureLog, only: [capture_log: 1]
  import Phoenix.HTML, only: [safe_to_string: 1]
  import Mock

  # Misc
  alias CMS.{
    API.Static,
    Repo
  }

  # Page Content
  alias CMS.Page.{
    Basic,
    Event,
    Landing,
    NewsEntry,
    Project,
    ProjectUpdate,
    Redirect
  }

  # Other Content Types
  alias CMS.Partial.{
    Banner,
    Paragraph,
    RoutePdf,
    Teaser,
    WhatsHappeningItem
  }

  setup do
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    %{cache: cache}
  end

  describe "news_entry_by/1" do
    test "returns the news entry for the given id" do
      assert %NewsEntry{id: 3519} = Repo.news_entry_by(id: 3519)
    end

    test "returns :not_found given no record is found" do
      assert :not_found == Repo.news_entry_by(id: 999)
    end

    test "gracefully handles more than one API result" do
      two_news =
        Enum.map([1, 2], fn n ->
          CMS.Factory.news_entry_factory(n, title: "News #{n}")
        end)

      mock_view = fn
        "/cms/news", _ -> {:ok, two_news}
      end

      with_mocks [
        {Static, [], view: mock_view},
        {NewsEntry, [], [from_api: fn n -> n end]}
      ] do
        assert %NewsEntry{} = Repo.news_entry_by([])
      end
    end
  end

  describe "generate/3" do
    test "generates the correct key for /*" do
      path = "/foo"

      assert Repo.generate(nil, nil, [path, %{}]) == "cms.repo" <> String.replace(path, "/", "|")
    end

    test "generates the correct key for /**/*" do
      path = "/foo/bar"

      assert Repo.generate(nil, nil, [path, %{}]) == "cms.repo" <> String.replace(path, "/", "|")
    end

    test "generates the correct key for /**/*?*=*" do
      path = "/foo/bar"
      params = %{"baz" => "bop"}

      assert Repo.generate(nil, nil, [path, params]) ==
               "cms.repo" <> String.replace(path, "/", "|") <> "?baz=bop"
    end

    test "generates the correct key for /**/*?*=*&*=*" do
      path = "/foo/bar"
      params = %{"bam" => "bop", "baz" => "qux"}

      assert Repo.generate(nil, nil, [path, params]) ==
               "cms.repo" <> String.replace(path, "/", "|") <> "?bam=bop&baz=qux"
    end

    test "generates the correct key for a map" do
      path = "/foo/bar"
      params = %{"biz" => "bang", "data" => %{"some" => "map"}}

      assert Repo.generate(nil, nil, [path, params]) ==
               "cms.repo" <> String.replace(path, "/", "|") <> "?biz=bang&data=?some=map"
    end
  end

  describe "get_page/1" do
    test "caches views", %{cache: cache} do
      path = "/news/2018/news-entry"
      params = %{}
      key = "cms.repo" <> String.replace(path, "/", "|")

      assert cache.get(key) == nil

      Repo.get_page(path, params)

      assert cache.get(key) != nil
    end

    test "sets the ttl to < :infinity", %{cache: cache} do
      path = "/news/2018/news-entry"
      params = %{}
      key = "/cms" <> path

      Repo.get_page(path, params)

      assert cache.ttl(key) != :infinity
    end

    test "does not cache previews", %{cache: cache} do
      path = "/news/2018/news-entry"
      params = %{"preview" => "", "vid" => "112", "nid" => "6"}
      key = "/cms" <> path

      assert cache.get(key) == nil

      Repo.get_page(path, params)

      assert cache.get(key) == nil
    end

    test "given the path for a Basic page" do
      result = Repo.get_page("/basic_page_with_sidebar")
      assert %Basic{} = result
    end

    test "returns a NewsEntry" do
      assert %NewsEntry{} = Repo.get_page("/news/2018/news-entry")
    end

    test "returns an Event" do
      assert %Event{} = Repo.get_page("/events/date/title")
    end

    test "returns a Project" do
      assert %Project{} = Repo.get_page("/projects/project-name")
    end

    test "returns a ProjectUpdate" do
      assert %ProjectUpdate{} = Repo.get_page("/projects/project-name/update/project-progress")
    end

    test "given the path for a Basic page with tracking params" do
      result = Repo.get_page("/basic_page_with_sidebar", %{"from" => "search"})
      assert %Basic{} = result
    end

    test "given the path for a Landing page" do
      result = Repo.get_page("/landing_page")
      assert %Landing{} = result
    end

    test "given the path for a Redirect page" do
      result = Repo.get_page("/redirect_node")
      assert %Redirect{} = result
    end

    test "returns {:error, :not_found} when the path does not match an existing page" do
      assert Repo.get_page("/does/not/exist") == {:error, :not_found}
    end

    test "returns {:error, :invalid_response} when the CMS returns a server error" do
      assert Repo.get_page("/cms/route-pdfs/error") == {:error, :invalid_response}
    end

    test "returns {:error, :invalid_response} when JSON is invalid" do
      assert Repo.get_page("/invalid") == {:error, :invalid_response}
    end

    test "given special preview query params, return certain revision of node" do
      result =
        Repo.get_page("/basic_page_no_sidebar", %{"preview" => "", "vid" => "112", "nid" => "6"})

      assert %Basic{} = result
      assert result.title == "Arts on the T 112"
    end

    test "deprecated use of 'latest' value for revision parameter still returns newest revision" do
      result =
        Repo.get_page("/basic_page_no_sidebar", %{
          "preview" => "",
          "vid" => "latest",
          "nid" => "6"
        })

      assert %Basic{} = result
      assert result.title == "Arts on the T 113"
    end
  end

  describe "get_page_with_encoded_id/2" do
    test "encodes the id param into the request" do
      assert Repo.get_page("/redirect_node_with_query", %{"id" => "5"}) == {:error, :not_found}

      assert %Redirect{} =
               Repo.get_page_with_encoded_id("/redirect_node_with_query", %{"id" => "5"})
    end
  end

  describe "events/1" do
    test "returns list of Event" do
      assert [
               %Event{
                 id: id,
                 body: body
               }
               | _
             ] = Repo.events()

      assert id == 3268

      assert safe_to_string(body) =~
               "(FMCB) closely monitors the T’s finances, management, and operations.</p>"
    end
  end

  describe "event_by/1" do
    test "returns the event for the given id" do
      assert %Event{id: 3268} = Repo.event_by(id: 3268)
    end

    test "returns :not_found given no record is found" do
      assert :not_found == Repo.event_by(id: 999)
    end
  end

  describe "whats_happening" do
    test "returns a list of WhatsHappeningItem" do
      assert [
               %WhatsHappeningItem{
                 blurb: blurb
               }
               | _
             ] = Repo.whats_happening()

      assert blurb =~
               "Visiting Boston? Find your way around with our new Visitor's Guide to the T."
    end
  end

  describe "banner" do
    test "returns a Banner" do
      assert %Banner{
               blurb: blurb
             } = Repo.banner()

      assert blurb == "Headline goes here"
    end
  end

  describe "search" do
    test "with results" do
      {:ok, result} = Repo.search("mbta", 0, [])
      assert result.count == 2083
    end

    test "without results" do
      {:ok, result} = Repo.search("empty", 0, [])
      assert result.count == 0
    end
  end

  describe "get_route_pdfs/1" do
    test "returns list of RoutePdfs" do
      assert [%RoutePdf{}, _, _] = Repo.get_route_pdfs("87")
    end

    test "returns empty list if there's an error" do
      log =
        capture_log(fn ->
          assert [] = Repo.get_route_pdfs("error")
        end)

      assert log =~ "Error getting pdfs"
    end

    test "returns empty list if there's no pdfs for the route id" do
      assert [] = Repo.get_route_pdfs("doesntexist")
    end
  end

  describe "get_schedule_pdfs/1" do
    assert [%RoutePdf{} | _] = Repo.get_schedule_pdfs("87")
  end

  describe "teasers/1" do
    test "returns only teasers for a project type" do
      types =
        [type: [:project]]
        |> Repo.teasers()
        |> MapSet.new(& &1.type)
        |> MapSet.to_list()

      assert types == [:project]
    end

    test "returns teasers for a project and project update type" do
      types =
        [type: [:project, :project_update]]
        |> Repo.teasers()
        |> MapSet.new(& &1.type)
        |> MapSet.to_list()

      assert types == [:project, :project_update]
    end

    test "returns all teasers for a type that are sticky" do
      teasers =
        [type: [:project], sticky: 1]
        |> Repo.teasers()

      assert [%Teaser{}, %Teaser{}, %Teaser{}] = teasers
    end

    test "returns all teasers for a route" do
      types =
        [route_id: "Red", sidebar: 1]
        |> Repo.teasers()
        |> MapSet.new(& &1.type)
        |> MapSet.to_list()

      Dotcom.Assertions.assert_equal_lists(types, [:event, :news_entry, :project])
    end

    test "returns all teasers for a topic" do
      types =
        [topic: "Guides", sidebar: 1]
        |> Repo.teasers()
        |> MapSet.new(& &1.type)
        |> MapSet.to_list()

      Dotcom.Assertions.assert_equal_lists(types, [:event, :news_entry, :project])
    end

    test "returns all teasers for a mode" do
      types =
        [mode: "subway", sidebar: 1]
        |> Repo.teasers()
        |> MapSet.new(& &1.type)
        |> MapSet.to_list()

      Dotcom.Assertions.assert_equal_lists(types, [:event, :news_entry, :project])
    end

    test "returns all teasers for a mode and topic combined" do
      types =
        [mode: "subway", topic: "Guides", sidebar: 1]
        |> Repo.teasers()
        |> MapSet.new(& &1.type)
        |> MapSet.to_list()

      Dotcom.Assertions.assert_equal_lists(types, [:event, :news_entry, :project])
    end

    test "returns all teasers for a route_id and topic combined" do
      types =
        [route_id: "Red", topic: "Guides", sidebar: 1]
        |> Repo.teasers()
        |> MapSet.new(& &1.type)
        |> MapSet.to_list()

      Dotcom.Assertions.assert_equal_lists(types, [:event, :news_entry, :project])
    end

    test "converts generic arguments into path parts for API request" do
      mock_view = fn
        "/cms/teasers/Guides/Red", %{sticky: 0} -> {:ok, []}
      end

      with_mock Static, view: mock_view do
        Repo.teasers(args: ["Guides", "Red"], sticky: 0)

        assert_called(Static.view("/cms/teasers/Guides/Red", %{sticky: 0}))
      end
    end

    test "takes a :type option" do
      teasers = Repo.teasers(route_id: "Red", type: [:project], sidebar: 1)
      assert Enum.all?(teasers, &(&1.type == :project))
    end

    test "takes a :type_op option" do
      all_teasers = Repo.teasers(route_id: "Red", sidebar: 1)
      assert Enum.any?(all_teasers, &(&1.type == :project))

      filtered = Repo.teasers(route_id: "Red", type: [:project], type_op: "not in", sidebar: 1)
      refute Enum.empty?(filtered)
      refute Enum.any?(filtered, &(&1.type == :project))
    end

    test "takes an :items_per_page option" do
      all_teasers = Repo.teasers(route_id: "Red", sidebar: 1)
      assert Enum.count(all_teasers) > 1
      assert [%Teaser{}] = Repo.teasers(route_id: "Red", items_per_page: 1)
    end

    test "takes a :related_to option" do
      mock_view = fn
        "/cms/teasers", %{related_to: 123} -> {:ok, []}
      end

      with_mock Static, view: mock_view do
        Repo.teasers(related_to: 123)

        assert_called(Static.view("/cms/teasers", %{related_to: 123}))
      end
    end

    test "takes an :except option" do
      mock_view = fn
        "/cms/teasers", %{except: 123} -> {:ok, []}
      end

      with_mock Static, view: mock_view do
        Repo.teasers(except: 123)

        assert_called(Static.view("/cms/teasers", %{except: 123}))
      end
    end

    test "takes an :only option" do
      mock_view = fn
        "/cms/teasers", %{only: 123} -> {:ok, []}
      end

      with_mock Static, view: mock_view do
        Repo.teasers(only: 123)

        assert_called(Static.view("/cms/teasers", %{only: 123}))
      end
    end

    test "takes a :date and :date_op option" do
      mock_view = fn
        "/cms/teasers", %{date: "2018-01-01", date_op: ">="} -> {:ok, []}
      end

      with_mock Static, view: mock_view do
        Repo.teasers(date: "2018-01-01", date_op: ">=")

        assert_called(Static.view("/cms/teasers", %{date: "2018-01-01", date_op: ">="}))
      end
    end

    test "accepts and passes through given :sort_order and :sort_by options" do
      mock_view = fn
        "/cms/teasers", %{type: [:page], sort_by: "changed", sort_order: :ASC} ->
          {:ok, []}
      end

      with_mock Static, view: mock_view do
        Repo.teasers(type: [:page], sort_by: "changed", sort_order: :ASC)

        assert_called(
          Static.view("/cms/teasers", %{type: [:page], sort_by: "changed", sort_order: :ASC})
        )
      end
    end

    test "sets correct :sort_by and :sort_order options for project_update and news_entry requests" do
      mock_view = fn
        "/cms/teasers",
        %{type: [:project_update], sort_by: "field_posted_on_value", sort_order: :DESC} ->
          {:ok, []}

        "/cms/teasers",
        %{type: [:news_entry], sort_by: "field_posted_on_value", sort_order: :ASC} ->
          {:ok, []}
      end

      with_mock Static, view: mock_view do
        Repo.teasers(type: [:project_update])
        Repo.teasers(type: [:news_entry], sort_order: :ASC)

        assert_called(
          Static.view("/cms/teasers", %{
            type: [:project_update],
            sort_by: "field_posted_on_value",
            sort_order: :DESC
          })
        )

        assert_called(
          Static.view("/cms/teasers", %{
            type: [:news_entry],
            sort_by: "field_posted_on_value",
            sort_order: :ASC
          })
        )
      end
    end

    test "sets correct :sort_by and :sort_order options for project requests" do
      mock_view = fn
        "/cms/teasers",
        %{type: [:project], sort_by: "field_updated_on_value", sort_order: :DESC} ->
          {:ok, []}
      end

      with_mock Static, view: mock_view do
        Repo.teasers(type: [:project])

        assert_called(
          Static.view("/cms/teasers", %{
            type: [:project],
            sort_by: "field_updated_on_value",
            sort_order: :DESC
          })
        )
      end
    end

    test "sets correct :sort_by and :sort_order options for event requests" do
      mock_view = fn
        "/cms/teasers", %{type: [:event], sort_by: "field_start_time_value", sort_order: :DESC} ->
          {:ok, []}
      end

      with_mock Static, view: mock_view do
        Repo.teasers(type: [:event])

        assert_called(
          Static.view("/cms/teasers", %{
            type: [:event],
            sort_by: "field_start_time_value",
            sort_order: :DESC
          })
        )
      end
    end

    test "drops :sort_by and :sort_order options when either option is missing" do
      mock_view = fn
        "/cms/teasers", %{type: [:page]} ->
          {:ok, []}
      end

      with_mock Static, view: mock_view do
        Repo.teasers(type: [:page], sort_by: :ASC)

        assert_called(Static.view("/cms/teasers", %{type: [:page]}))
      end
    end

    test "returns an empty list and logs a warning if there is an error" do
      log =
        capture_log(fn ->
          assert Repo.teasers(route_id: "NotFound", sidebar: 1) == []
        end)

      assert log =~ "error=:not_found"
    end
  end

  describe "get_paragraph/1" do
    test "returns a single paragraph item" do
      paragraph = Repo.get_paragraph("/paragraphs/custom-html/projects-index")
      assert %Paragraph.CustomHTML{} = paragraph
    end

    test "returns a single paragraph item which has a newer alias" do
      paragraph = Repo.get_paragraph("/admin/content/paragraphs/25")
      assert %Paragraph.CustomHTML{} = paragraph
    end
  end

  describe "events_for_year/1" do
    test "calls /cms/teasers with desired opts for date range" do
      opts = fn year ->
        %{
          date: [min: "#{year}-01-01", max: "#{year + 1}-01-01"],
          date_op: "between",
          items_per_page: 50,
          offset: 0,
          sort_by: "field_start_time_value",
          sort_order: :ASC,
          type: [:event]
        }
      end

      year = 2018
      mock_2018_opts = opts.(year)

      with_mock Static, view: fn "/cms/teasers", ^mock_2018_opts -> {:ok, []} end do
        Repo.events_for_year(year)

        assert_called(Static.view("/cms/teasers", opts.(year)))
      end
    end
  end

  describe "next_n_event_teasers/2" do
    test "calls for upcoming specified number of teasers" do
      num = 3

      with_mocks [
        {Static, [], [view: fn "/cms/teasers", _ -> {:ok, []} end]}
      ] do
        _ = Repo.next_n_event_teasers(~D[1999-01-01], num)

        assert_called(
          Static.view("/cms/teasers", %{
            date: [value: "1999-01-01"],
            date_op: ">=",
            items_per_page: num,
            sort_by: "field_start_time_value",
            sort_order: :ASC,
            type: [:event]
          })
        )
      end
    end
  end
end
