defmodule CMS.API.TimeRequestTest do
  use ExUnit.Case

  import CMS.API.TimeRequest
  import Plug.Conn
  import ExUnit.CaptureLog

  defp setup_log_level do
    old_level = Logger.level()

    on_exit(fn ->
      Logger.configure(level: old_level)
    end)

    Logger.configure(level: :info)
  end

  describe "time_request/5" do
    setup do
      bypass = Bypass.open()
      url = "http://127.0.0.1:#{bypass.port}/"
      {:ok, %{bypass: bypass, url: url}}
    end

    @tag :capture_log
    test "returns an HTTP response", %{bypass: bypass, url: url} do
      setup_log_level()

      Bypass.expect(bypass, fn conn ->
        assert fetch_query_params(conn).query_params == %{"param" => "value"}
        send_resp(conn, 200, "ok")
      end)

      response = time_request(:get, url, "", [], params: [param: "value"])
      assert {:ok, %{status_code: 200, body: "ok"}} = response
    end

    test "logs a successful request", %{bypass: bypass, url: url} do
      Bypass.expect(bypass, fn conn ->
        send_resp(conn, 200, "ok")
      end)

      params = [params: [param: "value", _format: "json"]]

      log =
        capture_log(fn ->
          setup_log_level()
          time_request(:get, url, "", [], params)
        end)

      assert log =~ "status=200"
      assert log =~ "url=#{url}"
      assert log =~ params_without__format(params)
      assert log =~ ~r(duration=\d)
    end

    test "logs a failed request", %{bypass: bypass, url: url} do
      Bypass.down(bypass)

      log =
        capture_log(fn ->
          setup_log_level()
          time_request(:get, url)
        end)

      assert log =~ "status=error"
      assert log =~ "error="
      assert log =~ "url=#{url}"
      assert log =~ params_without__format([])
      assert log =~ ~r(duration=\d)
    end
  end

  defp params_without__format(params) do
    params
    |> Keyword.delete(:_format)
    |> Keyword.put(:hackney, pool: Application.get_env(:site, :cms_http_pool))
    |> (fn params -> "options=#{inspect(params)}" end).()
  end
end
