defmodule MBTA.Api.HeadersTest do
  use ExUnit.Case

  import Test.Support.EnvHelpers

  alias MBTA.Headers

  setup do
    reassign_env(:dotcom, :enable_experimental_features, "false")

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

  test "uses application config for API key version" do
    reassign_env(:dotcom, :v3_api_version, "3005-01-02")

    assert Headers.build("API_KEY", params: [], url: "url") == [
             {"x-api-key", "API_KEY"},
             {"MBTA-Version", "3005-01-02"}
           ]
  end

  test "adds wiremock proxy header if env var is set" do
    reassign_env(:dotcom, :v3_api_wiremock_proxy_url, "proxy_url")
    reassign_env(:dotcom, :v3_api_wiremock_proxy, "true")

    assert Headers.build("API_KEY", use_cache?: false) |> Keyword.take(["X-WM-Proxy-Url"]) == [
             {"X-WM-Proxy-Url", "proxy_url"}
           ]
  end

  test "adds experimental features header if application config is set" do
    Application.put_env(:dotcom, :enable_experimental_features, "true")

    assert Headers.build("API_KEY",
             url: "URL",
             params: []
           )
           |> Keyword.take(["x-enable-experimental-features"]) == [
             {"x-enable-experimental-features", "true"}
           ]

    Application.put_env(:dotcom, :enable_experimental_features, nil)

    assert Headers.build("API_KEY",
             url: "URL",
             params: []
           )
           |> Keyword.take(["x-enable-experimental-features"]) == []
  end
end
