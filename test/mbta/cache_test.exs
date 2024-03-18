defmodule MBTA.CacheTest do
  use ExUnit.Case, async: true

  alias HTTPoison.Response
  alias MBTA.Cache

  @url "/url"
  @params []
  @last_modified "Fri, 06 Jul 2018 14:03:30 GMT"
  @response %Response{
    status_code: 200,
    body: "body",
    headers: [
      {"Server", "Fake Server"},
      {"Last-Modified", @last_modified}
    ]
  }

  setup do
    num = Enum.random(1..500)
    name = String.to_atom("#{__MODULE__}#{num}")
    {:ok, _pid} = Cache.start_link(name: name, size: 2)
    {:ok, name: name}
  end

  describe "cache_response/3" do
    test "304 response: returns a previously cached response", %{name: name} do
      _ = Cache.cache_response(name, @url, @params, @response)
      not_modified = %{@response | status_code: 304}
      assert {:ok, @response} == Cache.cache_response(name, @url, @params, not_modified)
    end

    test "200 response: returns the same response", %{name: name} do
      assert {:ok, @response} == Cache.cache_response(name, @url, @params, @response)
    end

    test "400 response: returns the same response", %{name: name} do
      response = %{@response | status_code: 400}
      assert {:ok, response} == Cache.cache_response(name, @url, @params, response)
    end

    test "404 response: returns the same response", %{name: name} do
      response = %{@response | status_code: 404}
      assert {:ok, response} == Cache.cache_response(name, @url, @params, response)
    end

    test "500 response: returns the same response if not cached", %{name: name} do
      response = %{@response | status_code: 500}
      assert {:ok, response} == Cache.cache_response(name, @url, @params, response)
    end

    test "500 response: returns a cached response if available", %{name: name} do
      Cache.cache_response(name, @url, @params, @response)

      response = %{@response | status_code: 500}
      assert {:ok, @response} == Cache.cache_response(name, @url, @params, response)
    end
  end

  describe "cache_headers/2" do
    test "returns an empty list if there's nothing cached", %{name: name} do
      assert Cache.cache_headers(name, @url, @params) == []
    end

    test "once a response is cached, returns the last-modified header", %{name: name} do
      Cache.cache_response(name, @url, @params, @response)

      assert Cache.cache_headers(name, @url, @params) == [{"if-modified-since", @last_modified}]
    end
  end

  describe "expire!/0" do
    test "removes the least-recently-used items to get the cache down to the right size", %{
      name: name
    } do
      Cache.cache_response(name, "one", @params, @response)
      Cache.cache_response(name, "expire", @params, @response)
      Cache.cache_response(name, "also expire", @params, @response)
      Cache.cache_response(name, "one", @params, %{@response | status_code: 304})

      Cache.expire!(name)

      assert Cache.cache_headers(name, "expire", @params) == []
      assert Cache.cache_headers(name, "also expire", @params) == []
      refute Cache.cache_headers(name, "one", @params) == []
    end
  end

  describe "handle_info(:expire)" do
    test "expires the cache and sends an :expire message" do
      name = :test_expire

      {:ok, state} = Cache.init(name: name, timeout: 50, size: 0)
      Cache.cache_response(name, @url, @params, @response)

      assert {:noreply, ^state} = Cache.handle_info(:expire, state)
      assert Cache.cache_headers(name, @url, @params) == []
      assert_receive :expire
    end
  end
end
