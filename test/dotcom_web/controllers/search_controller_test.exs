defmodule DotcomWeb.SearchControllerTest do
  use DotcomWeb.ConnCase, async: false

  import ExUnit.CaptureLog
  import Mox

  alias Alerts.Alert

  setup :set_mox_global
  setup :verify_on_exit!

  @url "http://localhost:9999"

  describe "query" do
    test "sends a POST to Algolia and returns the results", %{conn: conn} do
      response_body = Poison.encode!(%{"results" => []})

      expect(HTTPoison.Mock, :post, fn _url, _body, _headers, _opts ->
        {:ok, %HTTPoison.Response{status_code: 200, body: response_body}}
      end)

      response =
        conn
        |> assign(:algolia_host, @url)
        |> post("/search/query", %{requests: []})
        |> json_response(200)

      assert response == Poison.decode!(response_body)
    end

    test "returns {error: bad_response} if algolia returns a bad response", %{conn: conn} do
      expect(HTTPoison.Mock, :post, fn _url, _body, _headers, _opts ->
        {:error, %HTTPoison.Error{reason: :bad_response}}
      end)

      assert conn
             |> assign(:algolia_host, @url)
             |> post("/search/query/", %{
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

    test "handles algolia config errors", %{conn: conn} do
      config = Application.get_env(:dotcom, :algolia_config)
      bad_config = Keyword.delete(config, :search)
      Application.put_env(:dotcom, :algolia_config, bad_config)

      on_exit(fn -> Application.put_env(:dotcom, :algolia_config, config) end)

      assert conn
             |> assign(:algolia_host, @url)
             |> post("/search/query/", %{requests: []})
             |> json_response(200) == %{"error" => "bad_config"}
    end
  end

  describe "log_error/1" do
    test "logs a bad HTTP response" do
      log =
        capture_log(fn ->
          assert DotcomWeb.SearchController.log_error({:ok, %HTTPoison.Response{}}) == :ok
        end)

      assert log =~ "bad response"

      log =
        capture_log(fn ->
          assert DotcomWeb.SearchController.log_error({:error, %HTTPoison.Error{}}) == :ok
        end)

      assert log =~ "bad response"
    end

    test "does not log other types of errors" do
      log =
        capture_log(fn ->
          assert DotcomWeb.SearchController.log_error({:error, :bad_config}) == :ok
        end)

      assert log == ""
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

      result = DotcomWeb.SearchController.get_alert_ids(dt, alerts_repo_fn)

      assert result == %{
               stop: MapSet.new(["stop_with_alert"]),
               route: MapSet.new(["route_with_alert"])
             }
    end
  end
end
