defmodule V3Api.HeadersTest do
  alias V3Api.Headers

  use ExUnit.Case, async: true

  test "always adds api header" do
    assert Headers.build("API_KEY", use_cache?: false) == [
             {"x-api-key", "API_KEY"}
           ]

    assert Headers.build("API_KEY", params: [], url: "url") == [
             {"x-api-key", "API_KEY"}
           ]
  end

  test "adds wiremock proxy header if env var is set" do
    System.put_env("WIREMOCK_PROXY", "true")

    assert Headers.build("API_KEY", use_cache?: false) == [
             {"X-WM-Proxy-Url", "https://dev.api.mbtace.com/"},
             {"x-api-key", "API_KEY"}
           ]

    on_exit(fn ->
      System.delete_env("WIREMOCK_PROXY")
    end)
  end

  test "calls cache header fn if use_cache? is true" do
    opts = [
      use_cache?: true,
      url: "URL",
      params: [],
      cache_headers_fn: fn "URL", [] -> [{"if-modified-since", "LAST_MODIFIED"}] end
    ]

    assert Headers.build("API_KEY", opts) == [
             {"if-modified-since", "LAST_MODIFIED"},
             {"x-api-key", "API_KEY"}
           ]
  end
end
