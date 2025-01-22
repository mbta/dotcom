defmodule UrlHelpersTest do
  use DotcomWeb.ConnCase, async: true

  import UrlHelpers

  @path "/path"
  @original_query %{"param1" => "one", "param2" => "two"}
  @update [param2: "2"]
  @expected_query %{"param1" => "one", "param2" => "2"}

  setup do
    conn =
      :get
      |> build_conn("/path")
      |> fetch_query_params([])
      |> Map.from_struct()
      |> Map.put(:query_params, @original_query)
      |> Plug.Conn.__struct__()

    {:ok, conn: conn}
  end

  describe "update_query/2" do
    test "maintains existing parameters while updating passed params" do
      assert update_query(@original_query, @update) == @expected_query
    end

    test "when updates is an empty list, does not change query" do
      assert update_query(@original_query, []) == @original_query
    end

    test "can take either a map or a keyword list" do
      assert update_query(@original_query, param2: "2") == @expected_query
      assert update_query(@original_query, %{param2: "2"}) == @expected_query
    end

    test "can update a nested query string" do
      original = %{
        "top" => "level",
        "parent" => %{
          "a" => "b",
          "c" => "d"
        }
      }

      actual = update_query(original, %{parent: %{a: "updated"}})
      expected = put_in(original["parent"]["a"], "updated")
      assert actual == expected
    end

    test "can update to a nested query string when old query was nil" do
      original = %{"parent" => nil}
      actual = update_query(original, %{parent: %{a: "b"}})
      expected = %{"parent" => %{a: "b"}}
      assert actual == expected
    end

    test "can update to a nested query string when old query was not nested" do
      original = %{"parent" => "old"}
      actual = update_query(original, %{parent: %{a: "b"}})
      expected = %{"parent" => %{a: "b"}}
      assert actual == expected
    end
  end

  describe "update_url/2" do
    test "doesn't include a ? when there aren't any query strings" do
      conn =
        :get
        |> build_conn(@path)
        |> fetch_query_params([])

      assert update_url(conn, []) == @path
    end

    test "updates are added to url as key=value" do
      conn =
        :get
        |> build_conn(@path)
        |> fetch_query_params([])

      assert update_url(conn, param: "eter") == "/path?param=eter"
    end

    test "params are removed when their updated value is nil", %{conn: conn} do
      assert update_url(conn, param1: nil) == "/path?param2=two"
    end

    test "does not use :params to update :query_params", %{conn: conn} do
      updated_url =
        update_url(
          %{conn | params: %{"incorrect_param" => "incorrect"}},
          correct_params: "correct"
        )

      assert updated_url =~ "/path?"
      assert updated_url =~ "param1=one"
      assert updated_url =~ "param2=two"
      assert updated_url =~ "correct_params=correct"
      refute updated_url =~ "incorrect"
    end

    test "encodes nested URLs" do
      conn = %{build_conn(:get, @path) | query_params: %{"parent" => %{"nested" => "value"}}}
      assert update_url(conn, other: "value") == "/path?other=value&parent[nested]=value"
    end
  end
end
