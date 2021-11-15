defmodule V3Api.HeadersTest do
  alias V3Api.Headers

  use ExUnit.Case

  setup do
    enabled = Application.get_env(:site, :enable_experimental_features)
    Application.put_env(:site, :enable_experimental_features, "false")

    on_exit(fn ->
      Application.put_env(:site, :enable_experimental_features, enabled)
    end)

    :ok
  end

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
    original_env = System.get_env()
    System.put_env("WIREMOCK_PROXY", "true")
    System.put_env("WIREMOCK_PROXY_URL", "proxy_url")

    assert Headers.build("API_KEY", use_cache?: false) == [
             {"X-WM-Proxy-Url", "proxy_url"},
             {"x-api-key", "API_KEY"}
           ]

    on_exit(fn ->
      System.delete_env("WIREMOCK_PROXY")
      System.delete_env("WIREMOCK_PROXY_URL")

      for {key, value} <- original_env do
        System.put_env(key, value)
      end
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

  test "adds experimental features header if application config is set" do
    Application.put_env(:site, :enable_experimental_features, "true")

    assert Headers.build("API_KEY",
             url: "URL",
             params: []
           ) == [
             {"x-enable-experimental-features", "true"},
             {"x-api-key", "API_KEY"}
           ]

    Application.put_env(:site, :enable_experimental_features, nil)

    assert Headers.build("API_KEY",
             url: "URL",
             params: []
           ) == [
             {"x-api-key", "API_KEY"}
           ]
  end
end
