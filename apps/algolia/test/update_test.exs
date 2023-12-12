defmodule Algolia.UpdateTest do
  use ExUnit.Case, async: true

  describe "&update/0" do
    test "sends a request to the Algolia api" do
      bypass = Bypass.open()

      proc = self()

      Bypass.expect_once(bypass, "GET", "/1/indexes/objects/browse", fn conn ->
        body = "{\"hits\": [{\"objectID\": \"test_object_id\"}]}"
        send(proc, {conn.request_path, conn.req_headers, body})
        Plug.Conn.send_resp(conn, 200, body)
      end)

      Bypass.expect(bypass, fn conn ->
        {:ok, body, conn} = Plug.Conn.read_body(conn)
        send(proc, {conn.request_path, conn.req_headers, body})
        Plug.Conn.send_resp(conn, 200, "ok")
      end)

      assert %{Algolia.MockObjects => result} =
               Algolia.Update.update("http://localhost:#{bypass.port}")

      assert result == :ok
      assert_receive {"/1/indexes/objects/batch", delete_headers, delete_body}
      assert_receive {"/1/indexes/objects/batch", add_headers, add_body}
      assert_receive {"/1/indexes/objects/browse", get_headers, get_body}

      for header <- ["x-algolia-api-key", "x-algolia-application-id"] do
        assert {^header, delete_val} = Enum.find(delete_headers, &(elem(&1, 0) == header))
        assert {^header, add_val} = Enum.find(add_headers, &(elem(&1, 0) == header))
        assert {^header, get_val} = Enum.find(get_headers, &(elem(&1, 0) == header))
        assert is_binary(delete_val)
        assert is_binary(add_val)
        assert is_binary(get_val)
      end

      assert {:ok, %{requests: [%{action: "deleteObject", body: delete_obj}]}} =
               Poison.decode(delete_body, keys: :atoms!)

      assert {:ok, %{requests: [%{action: "addObject", body: obj}]}} =
               Poison.decode(add_body, keys: :atoms!)

      assert get_body == "{\"hits\": [{\"objectID\": \"test_object_id\"}]}"

      assert delete_obj == %{objectID: "test_object_id"}

      assert obj == %{
               data: %{id: "test"},
               url: "/object/test",
               objectID: "object-test",
               rank: 1
             }
    end

    test "should call until cursor returns empty" do
      bypass = Bypass.open()

      proc = self()

      Bypass.expect(bypass, "GET", "/1/indexes/objects/browse", fn conn ->
        cursor_string =
          if String.contains?(conn.query_string, "TEST_CURSOR"),
            do: "",
            else: "\"cursor\": \"TEST_CURSOR\","

        body = "{" <> cursor_string <> "\"hits\": [{\"objectID\": \"test_object_id\"}]}"
        send(proc, {conn.request_path, conn.req_headers, body})
        Plug.Conn.send_resp(conn, 200, body)
      end)

      Bypass.expect(bypass, "POST", "/1/indexes/objects/batch", fn conn ->
        {:ok, _body, conn} = Plug.Conn.read_body(conn)
        Plug.Conn.send_resp(conn, 200, "ok")
      end)

      assert %{Algolia.MockObjects => result} =
               Algolia.Update.update("http://localhost:#{bypass.port}")

      assert result == :ok
      assert_receive {"/1/indexes/objects/browse", _get_headers_start, get_body_start}
      assert_receive {"/1/indexes/objects/browse", _get_headers_end, get_body_end}
      # The endpoint in question should only have been called twice
      refute_receive {"/1/indexes/objects/browse", _, _}

      assert get_body_start ==
               "{\"cursor\": \"TEST_CURSOR\",\"hits\": [{\"objectID\": \"test_object_id\"}]}"

      assert get_body_end == "{\"hits\": [{\"objectID\": \"test_object_id\"}]}"
    end
  end

  describe "to_data_object/1" do
    test "builds a Algolia data object" do
      mock = %Algolia.MockObject{id: "place-test"}
      object = Algolia.Update.to_data_object(mock)

      assert Map.keys(object) == [:data, :objectID, :rank, :url]
      assert object.objectID == Algolia.Object.object_id(mock)
      assert object.url == Algolia.Object.url(mock)
    end
  end

  describe "&build_action_map/2" do
    test "builds a Algolia action object" do
      mock = %Algolia.MockObject{id: "place-test"}
      object = Algolia.Update.build_action_map(mock, "addObject")

      assert object.action == "addObject"
      assert object.body == mock
    end
  end
end
