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
    assert Headers.build("API_KEY", use_cache?: false) |> Enum.map(&elem(&1, 0)) == [
             "x-api-key",
             "MBTA-Version"
           ]

    assert Headers.build("API_KEY", params: [], url: "url") |> Enum.map(&elem(&1, 0)) == [
             "x-api-key",
             "MBTA-Version"
           ]
  end

  test "uses V3_API_VERSION environment variable" do
    original_version = System.get_env("V3_API_VERSION")
    System.put_env("V3_API_VERSION", "3005-01-02")

    assert Headers.build("API_KEY", params: [], url: "url") == [
             {"x-api-key", "API_KEY"},
             {"MBTA-Version", "3005-01-02"}
           ]

    on_exit(fn ->
      System.put_env("V3_API_VERSION", original_version || "")
    end)
  end

  test "adds wiremock proxy header if env var is set" do
    original_env = System.get_env()
    System.put_env("WIREMOCK_PROXY", "true")
    System.put_env("WIREMOCK_PROXY_URL", "proxy_url")

    assert Headers.build("API_KEY", use_cache?: false) |> Keyword.take(["X-WM-Proxy-Url"]) == [
             {"X-WM-Proxy-Url", "proxy_url"}
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
           )
           |> Keyword.take(["x-enable-experimental-features"]) == [
             {"x-enable-experimental-features", "true"}
           ]

    Application.put_env(:site, :enable_experimental_features, nil)

    assert Headers.build("API_KEY",
             url: "URL",
             params: []
           )
           |> Keyword.take(["x-enable-experimental-features"]) == []
  end
end
