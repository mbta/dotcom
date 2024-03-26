defmodule CMS.API.TimeRequestTest do
  use ExUnit.Case, async: false

  import ExUnit.CaptureLog
  import Mox

  alias CMS.API.TimeRequest

  setup :set_mox_global
  setup :verify_on_exit!

  defp setup_log_level do
    old_level = Logger.level()

    on_exit(fn ->
      Logger.configure(level: old_level)
    end)

    Logger.configure(level: :info)
  end

  @url Faker.Internet.url()

  describe "time_request/5" do
    @tag :capture_log
    test "returns an HTTP response" do
      setup_log_level()

      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: "ok"}}
      end)

      response = TimeRequest.time_request(:get, @url, "", [], params: [param: "value"])
      assert {:ok, %{status_code: 200, body: "ok"}} = response
    end

    test "logs a successful request" do
      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: "ok"}}
      end)

      params = [params: [param: "value", _format: "json"]]

      log =
        capture_log(fn ->
          setup_log_level()
          TimeRequest.time_request(:get, @url, "", [], params)
        end)

      assert log =~ "status=200"
      assert log =~ "url=#{@url}"
      assert log =~ params_without__format(params)
      assert log =~ ~r(duration=\d)
    end

    test "logs a failed request" do
      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        {:error, %HTTPoison.Error{reason: :econnrefused}}
      end)

      log =
        capture_log(fn ->
          setup_log_level()
          TimeRequest.time_request(:get, @url)
        end)

      assert log =~ "status=error"
      assert log =~ "error="
      assert log =~ "url=#{@url}"
      assert log =~ params_without__format([])
      assert log =~ ~r(duration=\d)
    end
  end

  defp params_without__format(params) do
    params
    |> Keyword.delete(:_format)
    |> Keyword.put(:hackney, pool: Application.get_env(:dotcom, :cms_http_pool))
    |> (fn params -> "options=#{inspect(params)}" end).()
  end
end
