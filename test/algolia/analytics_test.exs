defmodule Algolia.AnalyticsTest do
  use ExUnit.Case, async: false

  import ExUnit.CaptureLog
  import Mox
  import Test.Support.EnvHelpers

  setup :set_mox_global
  setup :verify_on_exit!

  @params %{
    "objectID" => "objectID",
    "position" => "1",
    "queryID" => "queryID"
  }

  describe "when click tracking is disabled" do
    test "does not send request" do
      reassign_env(:dotcom, :algolia_click_analytics_url, "return_error_if_called")

      refute Application.get_env(:dotcom, :algolia_track_clicks?) == true
      assert Algolia.Analytics.click(@params) == :ok
    end
  end

  describe "when click tracking is enabled" do
    setup do
      reassign_env(:dotcom, :algolia_click_analytics_url, Faker.Internet.url())
      reassign_env(:dotcom, :algolia_track_clicks?, true)

      :ok
    end

    test "returns :ok when click is successfully logged" do
      expect(HTTPoison.Mock, :post, fn _, _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      assert Algolia.Analytics.click(@params) == :ok
    end

    test "returns {:error, %HTTPoison.Response{}} and logs a warning when response code is not 200" do
      expect(HTTPoison.Mock, :post, fn _, _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 401}}
      end)

      log =
        capture_log(fn ->
          assert {:error, %HTTPoison.Response{status_code: 401}} =
                   Algolia.Analytics.click(@params)
        end)

      assert log =~ "Bad response"
    end

    test "returns {:error, %HTTPoison.Error{}} and logs a warning when unable to connect to Algolia" do
      expect(HTTPoison.Mock, :post, fn _, _, _, _ ->
        {:error, %HTTPoison.Error{reason: :econnrefused}}
      end)

      log =
        capture_log(fn ->
          assert {:error, %HTTPoison.Error{}} = Algolia.Analytics.click(@params)
        end)

      assert log =~ "Error"
    end
  end
end
