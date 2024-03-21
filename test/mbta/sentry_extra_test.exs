defmodule MBTA.SentryExtraTest do
  use ExUnit.Case, async: false

  import Mox

  alias MBTA.SentryExtra

  setup :set_mox_global
  setup :verify_on_exit!

  @process_dictionary_key :sentry_context
  @url Faker.Internet.url()

  describe "log_context/2" do
    test "one message is one entry in process dictionary" do
      expects = %{extra: %{"A-1" => "B"}}
      assert nil == SentryExtra.log_context("A", "B")
      assert expects == Process.get(@process_dictionary_key)
    end

    test "input can be an anonymous function" do
      expects = %{extra: %{"A-1" => "B"}}
      assert nil == SentryExtra.log_context("A", fn -> "B" end)
      assert expects == Process.get(@process_dictionary_key)
    end

    test "52 messages is 2 entries in the process dictionary" do
      expects = %{extra: %{"A-1" => "51", "A-2" => "52"}}
      for n <- 1..52, do: SentryExtra.log_context("A", Integer.to_string(n))
      assert expects == Process.get(@process_dictionary_key)
    end
  end

  describe "check conditions through MBTA.Api.get_json/3" do
    test "bad json response" do
      expects = "MBTA.Api.get_json_response url=\"/bad_json\" params={} response={data: garbage}"

      expect(HTTPoison.Mock, :get, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 200, body: "{data: garbage}"}}
      end)

      MBTA.Api.get_json("/bad_json", [], base_url: @url)

      assert expects == Process.get(@process_dictionary_key).extra["api-response-error-2"]
    end

    test "bad server response" do
      expects = "MBTA.Api.get_json_response url=\"/bad_response\" params={} response="

      expect(HTTPoison.Mock, :get, fn _, _, _ ->
        {:ok, %HTTPoison.Response{status_code: 500, body: ""}}
      end)

      MBTA.Api.get_json("/bad_response", [], base_url: @url)
      assert expects == Process.get(@process_dictionary_key).extra["api-response-error-2"]
    end

    test "can't connect returns an error" do
      expect(HTTPoison.Mock, :get, fn _, _, _ ->
        {:error, %HTTPoison.Error{reason: :econnrefused}}
      end)

      MBTA.Api.get_json("/cant_connect", [], base_url: @url)

      assert Process.get(@process_dictionary_key).extra["api-response-1"] =~ "econnrefused"
    end
  end
end
