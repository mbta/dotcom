defmodule DotcomWeb.EndpointTest do
  use DotcomWeb.ConnCase, async: false

  alias DotcomWeb.Endpoint

  describe "init/2" do
    test "default value" do
      assert expected =
               :dotcom
               |> Application.get_env(DotcomWeb.Endpoint)
               |> Keyword.get(:secret_key_base)

      assert {:ok, config} = Endpoint.init(:test, [])

      assert config[:secret_key_base] == expected
    end

    test "environment value" do
      key_name = "SITE_SECRET_KEY_BASE"
      key_base = "DCRAXZbR2RNoDgIp4QS6n/bYe5kaw1zJspzo10U8xpbR9pO6Qr/po5OAhdG0zKgI"
      assert :ok = System.put_env(key_name, key_base)
      assert {:ok, config} = Endpoint.init(:test, [])
      assert :ok = System.delete_env(key_name)

      assert config[:secret_key_base] == key_base
    end
  end
end
