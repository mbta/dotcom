defmodule CMS.ExternaRequestTest do
  use ExUnit.Case
  import Mock
  import CMS.ExternalRequest
  alias CMS.API.TimeRequest

  describe "process/4" do
    test "issues a request with the provided information" do
      bypass = bypass_cms()

      Bypass.expect(bypass, fn conn ->
        assert "GET" = conn.method
        assert "/get" == conn.request_path
        assert Plug.Conn.fetch_query_params(conn).params["cake"] == "is the best"

        conn
        |> Plug.Conn.put_resp_header("content-type", "application/json")
        |> Plug.Conn.resp(200, "[]")
      end)

      assert process(:get, "/get", "", params: [cake: "is the best"]) == {:ok, []}
    end

    test "handles a request with a body" do
      bypass = bypass_cms()

      Bypass.expect(bypass, fn conn ->
        {:ok, body, %Plug.Conn{}} = Plug.Conn.read_body(conn)
        assert body == "what about pie?"
        Plug.Conn.resp(conn, 201, "{}")
      end)

      process(:post, "/post", "what about pie?")
    end

    test "sets headers for GET requests" do
      bypass = bypass_cms()

      Bypass.expect(bypass, fn conn ->
        assert Plug.Conn.get_req_header(conn, "content-type") == ["application/json"]
        assert Plug.Conn.get_req_header(conn, "authorization") == []
        Plug.Conn.resp(conn, 200, "[]")
      end)

      process(:get, "/get")
    end

    test "sets auth headers for non-GET requests" do
      bypass = bypass_cms()

      Bypass.expect(bypass, fn conn ->
        [basic_auth_header] = Plug.Conn.get_req_header(conn, "authorization")
        assert basic_auth_header =~ "Basic"
        assert Plug.Conn.get_req_header(conn, "content-type") == ["application/json"]
        Plug.Conn.resp(conn, 201, "{}")
      end)

      process(:post, "/post", "body")
    end

    test "returns the HTTP response as an error if the request is not successful" do
      bypass = bypass_cms()

      Bypass.expect(bypass, fn conn ->
        conn
        |> Plug.Conn.put_resp_header("content-type", "application/json")
        |> Plug.Conn.resp(404, "{\"message\":\"No page found\"}")
      end)

      assert process(:get, "/page") == {:error, :not_found}
    end

    test "returns the HTTP response as an error if the request is unauthenticated" do
      bypass = bypass_cms()

      Bypass.expect(bypass, fn conn ->
        conn
        |> Plug.Conn.put_resp_header("content-type", "application/json")
        |> Plug.Conn.resp(401, "{\"message\":\"Access Denied\"}")
      end)

      assert process(:get, "/page") == {:error, :not_found}
    end

    test "returns an unauthorized HTTP response as an error" do
      bypass = bypass_cms()

      Bypass.expect(bypass, fn conn ->
        conn
        |> Plug.Conn.put_resp_header("content-type", "application/json")
        |> Plug.Conn.resp(403, "{\"message\":\"Access Denied\"}")
      end)

      assert process(:get, "/page") == {:error, :not_found}
    end

    test "Logs a warning and returns {:error, :invalid_response} if the request returns an exception" do
      bypass = bypass_cms()

      Bypass.down(bypass)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert process(:get, "/page") == {:error, :invalid_response}
        end)

      assert log =~ "Bad response"
    end

    test "Logs a warning and returns {:error, :invalid_response} if the request returns an unhandled error" do
      bypass = bypass_cms()

      Bypass.expect(bypass, fn conn ->
        conn
        |> Plug.Conn.put_resp_header("content-type", "application/json")
        |> Plug.Conn.resp(418, "I'm a teapot")
      end)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert process(:get, "/page") == {:error, :invalid_response}
        end)

      assert log =~ "Bad response"
    end

    test "Logs a warning and returns {:error, :invalid_response} if the JSON cannot be parsed" do
      bypass = bypass_cms()

      Bypass.expect(bypass, fn conn ->
        conn
        |> Plug.Conn.put_resp_header("content-type", "application/json")
        |> Plug.Conn.resp(200, "{invalid")
      end)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          assert process(:get, "/page") == {:error, :invalid_response}
        end)

      assert log =~ "Error parsing json"
    end

    test "returns {:error, {:redirect, status, path}} when CMS issues a native redirect and removes _format=json" do
      bypass = bypass_cms()

      Bypass.expect(bypass, fn conn ->
        conn = Plug.Conn.fetch_query_params(conn)
        redirected_path = "/redirect?" <> URI.encode_query(conn.query_params)

        conn
        |> Plug.Conn.put_resp_header("location", redirected_path)
        |> Plug.Conn.put_resp_header("content-type", "application/json")
        |> Plug.Conn.resp(302, "redirecting")
      end)

      assert {:error, {:redirect, 302, url}} = process(:get, "/path?_format=json")
      assert url == [to: "/redirect"]
    end

    def mock_timeout(_method, _url, _body, _headers, _opts) do
      {:error, %HTTPoison.Error{reason: :timeout}}
    end

    @tag :capture_log
    test "returns {:error, :timeout} when CMS times out" do
      Mock.with_mock TimeRequest, time_request: &mock_timeout/5 do
        assert process(:get, "/path?_format=json", "", recv_timeout: 100) == {:error, :timeout}
      end
    end

    test "path retains query params and removes _format=json when CMS issues a native redirect" do
      bypass = bypass_cms()

      Bypass.expect(bypass, fn conn ->
        conn = Plug.Conn.fetch_query_params(conn)
        redirected_path = "/redirect?" <> URI.encode_query(conn.query_params)

        conn
        |> Plug.Conn.put_resp_header("location", redirected_path)
        |> Plug.Conn.put_resp_header("content-type", "application/json")
        |> Plug.Conn.resp(302, "redirecting")
      end)

      assert {:error, {:redirect, 302, url}} = process(:get, "/path?_format=json&foo=bar")
      assert url == [to: "/redirect?foo=bar"]
    end

    test "path retains fragment identifiers when CMS issues a native redirect" do
      bypass = bypass_cms()

      Bypass.expect(bypass, fn conn ->
        conn = Plug.Conn.fetch_query_params(conn)
        redirected_path = "/redirect#fragment"

        conn
        |> Plug.Conn.put_resp_header("location", redirected_path)
        |> Plug.Conn.put_resp_header("content-type", "application/json")
        |> Plug.Conn.resp(302, "redirecting")
      end)

      assert {:error, {:redirect, 302, url}} = process(:get, "/path#fragment")
      assert url == [to: "/redirect#fragment"]
    end

    test "Drupal content redirects returned as absolute paths are counted as internal and not external" do
      bypass = bypass_cms()

      Bypass.expect(bypass, fn conn ->
        conn = Plug.Conn.fetch_query_params(conn)
        redirected_path = "http://localhost:#{bypass.port}/redirect"

        conn
        |> Plug.Conn.put_resp_header("location", redirected_path)
        |> Plug.Conn.put_resp_header("content-type", "application/json")
        |> Plug.Conn.resp(302, "redirecting")
      end)

      assert {:error, {:redirect, 302, url}} = process(:get, "/path")
      assert url == [to: "/redirect"]
    end

    test "External redirects result in an absolute destination for Phoenix to follow" do
      bypass = bypass_cms()

      Bypass.expect(bypass, fn conn ->
        conn = Plug.Conn.fetch_query_params(conn)
        redirected_path = "https://www.google.com/"

        conn
        |> Plug.Conn.put_resp_header("location", redirected_path)
        |> Plug.Conn.put_resp_header("content-type", "application/json")
        |> Plug.Conn.resp(302, "redirecting")
      end)

      assert {:error, {:redirect, 302, url}} = process(:get, "/path")
      assert url == [external: "https://www.google.com/"]
    end
  end

  def bypass_cms do
    original_drupal_config = Application.get_env(:dotcom, :drupal)

    bypass = Bypass.open()
    bypass_url = "http://localhost:#{bypass.port}/"

    Application.put_env(
      :dotcom,
      :drupal,
      put_in(original_drupal_config[:cms_root], bypass_url)
    )

    on_exit(fn ->
      Application.put_env(:dotcom, :drupal, original_drupal_config)
    end)

    bypass
  end
end
