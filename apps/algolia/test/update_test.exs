defmodule Algolia.UpdateTest do
  use ExUnit.Case, async: true

  describe "&update/0" do
    test "sends a request to the Algolia api" do
      bypass = Bypass.open()

      proc = self()

      Bypass.expect(bypass, fn conn ->
        {:ok, body, conn} = Plug.Conn.read_body(conn)
        send(proc, {conn.request_path, conn.req_headers, body})
        Plug.Conn.send_resp(conn, 200, "ok")
      end)

      assert %{Algolia.MockObjects => result} =
               Algolia.Update.update("http://localhost:#{bypass.port}")

      assert result == :ok
      assert_receive {"/1/indexes/objects/batch", headers, body}
      assert_receive {"/1/indexes/objects/clear", clear_headers, clear_body}

      for header <- ["x-algolia-api-key", "x-algolia-application-id"] do
        assert {^header, val} = Enum.find(headers, &(elem(&1, 0) == header))
        assert {^header, clear_val} = Enum.find(clear_headers, &(elem(&1, 0) == header))
        assert is_binary(val)
        assert is_binary(clear_val)
      end

      assert {:ok, %{requests: [%{action: "addObject", body: obj}]}} =
               Poison.decode(body, keys: :atoms!)

      assert clear_body == ""

      assert obj == %{
               data: %{id: "test"},
               url: "/object/test",
               objectID: "object-test",
               rank: 1
             }
    end
  end

  describe "&build_data_object/1" do
    test "builds a valid Algolia data object" do
      mock = %Algolia.MockObject{id: "place-test"}
      object = Algolia.Update.build_data_object(mock)

      assert object.action == "addObject"
      assert Map.keys(object.body) == [:data, :objectID, :rank, :url]
      assert object.body.objectID == Algolia.Object.object_id(mock)
      assert object.body.url == Algolia.Object.url(mock)
    end
  end
end
