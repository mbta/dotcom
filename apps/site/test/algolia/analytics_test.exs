defmodule Algolia.AnalyticsTest do
  use ExUnit.Case, async: true

  @params %{
    "objectID" => "objectID",
    "position" => "1",
    "queryID" => "queryID"
  }

  describe "when click tracking is disabled" do
    test "does not send request" do
      old_url = Application.get_env(:site, :algolia_click_analytics_url)
      Application.put_env(:site, :algolia_click_analytics_url, "return_error_if_called")

      on_exit(fn ->
        Application.put_env(:site, :algolia_click_analytics_url, old_url)
      end)

      assert Application.get_env(:site, :algolia_track_clicks?) == false
      assert Algolia.Analytics.click(@params) == :ok
    end
  end

  describe "when click tracking is enabled" do
    setup do
      bypass = Bypass.open()
      old_url = Application.get_env(:site, :algolia_click_analytics_url)
      Application.put_env(:site, :algolia_track_clicks?, true)
      Application.put_env(:site, :algolia_click_analytics_url, "http://localhost:#{bypass.port}")

      on_exit(fn ->
        Application.put_env(:site, :algolia_track_clicks?, false)
        Application.put_env(:site, :algolia_click_analytics_url, old_url)
      end)

      {:ok, bypass: bypass}
    end

    test "returns :ok when click is successfully logged", %{bypass: bypass} do
      Bypass.expect(bypass, fn conn -> Plug.Conn.send_resp(conn, 200, "success") end)

      assert Algolia.Analytics.click(@params) == :ok
    end

    test "returns {:error, %HTTPoison.Response{}} and logs a warning when response code is not 200",
         %{bypass: bypass} do
      Bypass.expect(bypass, fn conn -> Plug.Conn.send_resp(conn, 401, "Feature not available") end)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert {:error, %HTTPoison.Response{status_code: 401}} =
                   Algolia.Analytics.click(@params)
        end)

      assert log =~ "Bad response"
    end

    test "returns {:error, %HTTPoison.Error{}} and logs a warning when unable to connect to Algolia",
         %{bypass: bypass} do
      Bypass.down(bypass)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert {:error, %HTTPoison.Error{}} = Algolia.Analytics.click(@params)
        end)

      assert log =~ "Error"
    end
  end
end
