defmodule SiteWeb.SearchControllerTest do
  use SiteWeb.ConnCase, async: false
  alias Alerts.Alert
  import Mock

  @params %{"search" => %{"query" => "mbta"}}

  describe "index with js" do
    test "index", %{conn: conn} do
      conn = get(conn, search_path(conn, :index))
      response = html_response(conn, 200)
      assert response =~ "Filter by type"
    end
  end

  describe "query" do
    @tag :capture_log
    test "sends a POST to Algolia and returns the results", %{conn: conn} do
      bypass = Bypass.open()

      Bypass.expect(bypass, fn conn ->
        {status, resp} =
          case Plug.Conn.read_body(conn) do
            {:ok, ~s({"requests":[]}), %Plug.Conn{}} -> {200, ~s({"results": []})}
            {:ok, body, %Plug.Conn{}} -> {500, body}
          end

        Plug.Conn.send_resp(conn, status, resp)
      end)

      assert %{"results" => []} =
               conn
               |> assign(:algolia_host, "http://localhost:#{bypass.port}")
               |> post(search_path(conn, :query), %{requests: []})
               |> json_response(200)
    end

    @tag :capture_log
    test "returns {error: bad_response} if algolia returns a bad response", %{conn: conn} do
      bypass = Bypass.open()
      Bypass.down(bypass)

      assert conn
             |> assign(:algolia_host, "http://localhost:#{bypass.port}")
             |> post(search_path(conn, :query), %{
               requests: [
                 %{
                   indexName: "object",
                   params: %{},
                   query: "something"
                 }
               ]
             })
             |> json_response(200) == %{"error" => "bad_response"}
    end

    @tag :capture_log
    test "handles algolia config errors", %{conn: conn} do
      bypass = Bypass.open()

      config = Application.get_env(:dotcom, :algolia_config)
      bad_config = Keyword.delete(config, :write)
      Application.put_env(:dotcom, :algolia_config, bad_config)

      on_exit(fn -> Application.put_env(:dotcom, :algolia_config, config) end)

      assert conn
             |> assign(:algolia_host, "http://localhost:#{bypass.port}")
             |> post(search_path(conn, :query), %{requests: []})
             |> json_response(200) == %{"error" => "bad_config"}
    end
  end

  describe "log_error/1" do
    test "logs a bad HTTP response" do
      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert SiteWeb.SearchController.log_error({:ok, %HTTPoison.Response{}}) == :ok
        end)

      assert log =~ "bad response"

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert SiteWeb.SearchController.log_error({:error, %HTTPoison.Error{}}) == :ok
        end)

      assert log =~ "bad response"
    end

    test "does not log other types of errors" do
      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert SiteWeb.SearchController.log_error({:error, :bad_config}) == :ok
        end)

      assert log == ""
    end
  end

  describe "click" do
    setup do
      bypass = Bypass.open()

      url = Application.get_env(:dotcom, :algolia_click_analytics_url)
      track? = Application.get_env(:dotcom, :algolia_track_clicks?)

      Application.put_env(:dotcom, :algolia_click_analytics_url, "http://localhost:#{bypass.port}")
      Application.put_env(:dotcom, :algolia_track_clicks?, true)

      on_exit(fn ->
        Application.put_env(:dotcom, :algolia_click_analytics_url, url)
        Application.put_env(:dotcom, :algolia_track_clicks?, track?)
      end)

      {:ok, bypass: bypass}
    end

    test "logs a click", %{conn: conn, bypass: bypass} do
      Bypass.expect(bypass, fn conn -> Plug.Conn.send_resp(conn, 200, "success") end)

      conn =
        post(conn, search_path(conn, :click), %{
          objectID: "objectID",
          position: "1",
          queryID: "queryID"
        })

      assert json_response(conn, 200) == %{"message" => "success"}
    end

    @tag :capture_log
    test "returns error info if Algolia returns a bad response", %{conn: conn, bypass: bypass} do
      Bypass.expect(bypass, fn conn -> Plug.Conn.send_resp(conn, 401, "Feature not available") end)

      conn =
        post(conn, search_path(conn, :click), %{
          objectID: "objectID",
          position: "1",
          queryID: "queryID"
        })

      assert json_response(conn, 200) == %{
               "message" => "bad_response",
               "body" => "Feature not available",
               "status_code" => 401
             }
    end

    @tag :capture_log
    test "returns error info if Algolia is down", %{conn: conn, bypass: bypass} do
      Bypass.down(bypass)

      conn =
        post(conn, search_path(conn, :click), %{
          objectID: "objectID",
          position: "1",
          queryID: "queryID"
        })

      assert json_response(conn, 200) == %{"message" => "error", "reason" => "econnrefused"}
    end
  end

  describe "get_alert_ids/2" do
    test "builds a hash of stop and route ids" do
      dt = Util.to_local_time(~N[2018-03-01T12:00:00])

      route_entity = Alerts.InformedEntity.from_keywords(route: "route_with_alert")
      stop_entity = Alerts.InformedEntity.from_keywords(stop: "stop_with_alert")

      stop_alert =
        Alert.new(
          effect: :station_closure,
          severity: 9,
          updated_at: Timex.shift(dt, hours: -2),
          informed_entity: [stop_entity, route_entity],
          priority: :high
        )

      route_alert =
        Alert.new(
          effect: :suspension,
          severity: 9,
          updated_at: Timex.shift(dt, hours: -1),
          informed_entity: [route_entity],
          priority: :high
        )

      alerts_repo_fn = fn %DateTime{} ->
        [
          stop_alert,
          route_alert
        ]
      end

      result = SiteWeb.SearchController.get_alert_ids(dt, alerts_repo_fn)

      assert result == %{
               stop: MapSet.new(["stop_with_alert"]),
               route: MapSet.new(["route_with_alert"])
             }
    end
  end

  describe "index with params nojs" do
    test "search param", %{conn: conn} do
      conn = get(conn, search_path(conn, :index, @params))
      response = html_response(conn, 200)
      # check pagination
      assert response =~ "Showing results 1-10 of 2083"

      # check highlighting
      assert response =~ "solr-highlight-match"

      # check links from each type of document result
      assert response =~ "/people/monica-tibbits-nutt?from=search"
      assert response =~ "/news/2014-02-13/mbta-payroll?from=search"
      assert response =~ "/safety/transit-police/office-the-chief?from=search"
      assert response =~ "/sites/default/files/2017-01/C. Perkins.pdf?from=search"
      assert response =~ "/events/2006-10-05/board-meeting?from=search"
      assert response =~ "/fares?a=b&amp;from=search"
    end

    test "include offset", %{conn: conn} do
      params = %{@params | "search" => Map.put(@params["search"], "offset", "3")}
      conn = get(conn, search_path(conn, :index, params))
      response = html_response(conn, 200)
      assert response =~ "Showing results 31-40 of 2083"
    end

    test "include filter", %{conn: conn} do
      content_type = %{"event" => "true"}
      params = %{@params | "search" => Map.put(@params["search"], "content_type", content_type)}
      conn = get(conn, search_path(conn, :index, params))
      response = html_response(conn, 200)

      assert [{"input", attrs, _}] = Floki.find(response, "#content_type_event")
      attrs = Map.new(attrs)
      assert Map.get(attrs, "name") == "search[content_type][event]"
      assert Map.get(attrs, "type") == "checkbox"
      assert Map.get(attrs, "value") == "true"
      assert Map.get(attrs, "checked") == "checked"
    end

    test "no matches", %{conn: conn} do
      conn =
        get(conn, search_path(conn, :index, %{"search" => %{"query" => "empty", "nojs" => true}}))

      response = html_response(conn, 200)
      assert response =~ "There are no results matching"
    end

    test "empty search query", %{conn: conn} do
      conn = get(conn, search_path(conn, :index, %{"search" => %{"query" => "", "nojs" => true}}))
      response = html_response(conn, 200)
      assert response =~ "empty-search-page"
    end

    test "search server is returning an error", %{conn: conn} do
      with_mock CMS.Repo, search: fn _, _, _ -> {:error, :error} end do
        conn = get(conn, search_path(conn, :index, @params))
        response = html_response(conn, 200)
        assert response =~ "Whoops"
      end
    end
  end
end
