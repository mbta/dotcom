defmodule V3Api.HeadersTest do
  alias V3Api.Headers

  use ExUnit.Case, async: true

  test "always adds api header" do
    key_tuple =
      Headers.build("API_KEY", use_cache?: false) |> Enum.find(fn {k, _} -> k == "x-api-key" end)

    assert key_tuple == {"x-api-key", "API_KEY"}

    key_tuple =
      Headers.build("API_KEY", params: [], url: "url")
      |> Enum.find(fn {k, _} -> k == "x-api-key" end)

    assert key_tuple == {"x-api-key", "API_KEY"}
  end

  test "adds wiremock proxy header if env var is set" do
    System.put_env("WIREMOCK_PROXY", "true")

    assert Headers.build("API_KEY", use_cache?: false) == [
             {"X-WM-Proxy-Url", "https://dev.api.mbtace.com"},
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

    actual_opts =
      Headers.build("API_KEY", opts)
      |> Keyword.take(["if-modified-since", "x-api-key"])

    assert actual_opts ==
             [
               {"if-modified-since", "LAST_MODIFIED"},
               {"x-api-key", "API_KEY"}
             ]
  end
end
