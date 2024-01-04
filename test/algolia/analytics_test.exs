defmodule Algolia.AnalyticsTest do
  use ExUnit.Case, async: false
  import Test.Support.EnvHelpers

  @params %{
    "objectID" => "objectID",
    "position" => "1",
    "queryID" => "queryID"
  }

  describe "when click tracking is disabled" do
    test "does not send request" do
      reassign_env(:site, :algolia_click_analytics_url, "return_error_if_called")

      refute Application.get_env(:site, :algolia_track_clicks?) == true
      assert Algolia.Analytics.click(@params) == :ok
    end
  end

  describe "when click tracking is enabled" do
    setup do
      bypass = Bypass.open()
      reassign_env(:site, :algolia_click_analytics_url, "http://localhost:#{bypass.port}")
      reassign_env(:site, :algolia_track_clicks?, true)

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
