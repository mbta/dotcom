defmodule CMS.ExternaRequestTest do
  use ExUnit.Case

  import CMS.ExternalRequest
  import ExUnit.CaptureLog
  import Mox

  setup :set_mox_global
  setup :verify_on_exit!

  @headers [{"content-type", "application/json"}]

  describe "process/4" do
    test "issues a request with the provided information" do
      expected = [param: Faker.Pizza.style()]

      expect(HTTPoison.Mock, :request, fn method, _, _, _, opts ->
        assert method == :get
        [_, {:params, param}] = opts
        assert param == expected

        {:ok, %HTTPoison.Response{status_code: 200, headers: @headers, body: "[]"}}
      end)

      assert process(:get, "/get", "", params: expected) == {:ok, []}
    end

    test "handles a request with a body" do
      expected = Faker.Pizza.style()

      expect(HTTPoison.Mock, :request, fn method, _, body, _, _ ->
        assert method == :post
        assert body == expected

        {:ok, %HTTPoison.Response{status_code: 201, headers: @headers, body: "[]"}}
      end)

      process(:post, "/post", expected)
    end

    test "sets headers for GET requests" do
      expect(HTTPoison.Mock, :request, fn method, _, _, headers, _ ->
        assert method == :get
        assert headers == ["Content-Type": "application/json"]

        {:ok, %HTTPoison.Response{status_code: 200, headers: @headers, body: "[]"}}
      end)

      process(:get, "/get")
    end

    test "sets auth headers for non-GET requests" do
      expect(HTTPoison.Mock, :request, fn method, _, _, headers, _ ->
        assert method != :get
        assert headers == ["Content-Type": "application/json", Authorization: "Basic Og=="]

        {:ok, %HTTPoison.Response{status_code: 201, headers: @headers, body: "[]"}}
      end)

      process(:post, "/post", "body")
    end

    test "forbidden is :not_found" do
      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 401, headers: @headers}}
      end)

      assert process(:get, "/page") == {:error, :not_found}
    end

    test "unauthorized is :not_found" do
      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 403, headers: @headers}}
      end)

      assert process(:get, "/page") == {:error, :not_found}
    end

    test "not found is :not_found" do
      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 404, headers: @headers}}
      end)

      assert process(:get, "/page") == {:error, :not_found}
    end

    test "Logs a warning and returns {:error, _} if the request returns an exception" do
      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        {:error, %HTTPoison.Error{reason: :timeout}}
      end)

      log =
        capture_log(fn ->
          assert process(:get, "/page") == {:error, :timeout}
        end)

      assert log =~ "request timed out"
    end

    test "Logs a warning and returns {:error, _} if the request returns an unhandled error" do
      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, headers: @headers}}
      end)

      log =
        capture_log(fn ->
          assert process(:get, "/page") == {:error, :invalid_response}
        end)

      assert log =~ "Bad response"
    end

    test "Logs a warning and returns {:error, _} if the JSON cannot be parsed" do
      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, headers: @headers, body: "not json"}}
      end)

      log =
        capture_log(fn ->
          assert process(:get, "/page") == {:error, :invalid_response}
        end)

      assert log =~ "Error parsing json"
    end

    test "returns {:error, {:redirect, status, path}} when CMS issues a native redirect and removes _format=json" do
      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        headers = [{"location", "/redirect"}, {"content-type", "application/json"}]
        {:ok, %HTTPoison.Response{status_code: 302, headers: headers}}
      end)

      assert {:error, {:redirect, 302, url}} = process(:get, "/path?_format=json")
      assert url == [to: "/redirect"]
    end

    test "returns {:error, :timeout} when CMS times out" do
      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        {:error, %HTTPoison.Error{reason: :timeout}}
      end)

      assert process(:get, "/path?_format=json", "", recv_timeout: 100) == {:error, :timeout}
    end

    test "path retains query params and removes _format=json when CMS issues a native redirect" do
      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        headers = [{"location", "/redirect?foo=bar"}, {"content-type", "application/json"}]
        {:ok, %HTTPoison.Response{status_code: 302, headers: headers}}
      end)

      assert {:error, {:redirect, 302, url}} = process(:get, "/path?_format=json&foo=bar")
      assert url == [to: "/redirect?foo=bar"]
    end

    test "path retains fragment identifiers when CMS issues a native redirect" do
      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        headers = [{"location", "/redirect#fragment"}, {"content-type", "application/json"}]
        {:ok, %HTTPoison.Response{status_code: 302, headers: headers}}
      end)

      assert {:error, {:redirect, 302, url}} = process(:get, "/path#fragment")
      assert url == [to: "/redirect#fragment"]
    end

    test "Drupal content redirects returned as absolute paths are counted as internal and not external" do
      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        headers = [{"location", "/redirect"}, {"content-type", "application/json"}]
        {:ok, %HTTPoison.Response{status_code: 302, headers: headers}}
      end)

      assert {:error, {:redirect, 302, url}} = process(:get, "/path")
      assert url == [to: "/redirect"]
    end

    test "External redirects result in an absolute destination for Phoenix to follow" do
      expect(HTTPoison.Mock, :request, fn _, _, _, _, _ ->
        headers = [{"location", "https://www.google.com/"}, {"content-type", "application/json"}]
        {:ok, %HTTPoison.Response{status_code: 302, headers: headers}}
      end)

      assert {:error, {:redirect, 302, url}} = process(:get, "/path")
      assert url == [external: "https://www.google.com/"]
    end
  end
end
