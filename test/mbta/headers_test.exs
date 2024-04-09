defmodule MBTA.Api.HeadersTest do
  use ExUnit.Case

  import Test.Support.EnvHelpers

  alias MBTA.Headers

  setup do
    reassign_env(:dotcom, :enable_experimental_features, "false")

    :ok
  end

  test "always adds api header" do
    assert Headers.build("API_KEY") |> Enum.map(&elem(&1, 0)) == [
             "x-api-key",
             "MBTA-Version"
           ]

    assert Headers.build("API_KEY") |> Enum.map(&elem(&1, 0)) == [
             "x-api-key",
             "MBTA-Version"
           ]
  end

  test "uses application config for API key version" do
    reassign_env(:dotcom, :v3_api_version, "3005-01-02")

    assert Headers.build("API_KEY") == [
             {"x-api-key", "API_KEY"},
             {"MBTA-Version", "3005-01-02"}
           ]
  end

  test "adds experimental features header if application config is set" do
    Application.put_env(:dotcom, :enable_experimental_features, "true")

    assert Headers.build("API_KEY")
           |> Keyword.take(["x-enable-experimental-features"]) == [
             {"x-enable-experimental-features", "true"}
           ]

    Application.put_env(:dotcom, :enable_experimental_features, nil)

    assert Headers.build("API_KEY")
           |> Keyword.take(["x-enable-experimental-features"]) == []
  end
end
