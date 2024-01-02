defmodule CMS.ConfigTest do
  use ExUnit.Case
  alias CMS.Config

  describe "url/1" do
    test "returns a full URL for the given path" do
      assert Config.url("my-path") == "http://cms.test/my-path"
    end

    test "prevents duplicates forward slashes when the root and path have a forward slash" do
      set_drupal_root(%{cms_root: "http://cms.test/"}, fn ->
        assert Config.url("/my-path") == "http://cms.test/my-path"
      end)
    end

    test "removes duplicate leading forward slashes from the path" do
      assert Config.url("//my-path") == "http://cms.test/my-path"
    end

    test "supports the root url being assessed at runtime" do
      env_var_name = "DRUPAL_ROOT"

      set_drupal_root(%{cms_root: {:system, env_var_name}}, fn ->
        System.put_env(env_var_name, "http://cms.test")

        assert Config.url("my-path") == "http://cms.test/my-path"

        System.delete_env("env_var_name")
      end)
    end

    test "supports the root url being set at build time" do
      set_drupal_root(%{cms_root: "http://cms.test"}, fn ->
        assert Config.url("my-path") == "http://cms.test/my-path"
      end)
    end

    test "raises when the root url is not configured" do
      set_drupal_root(%{cms_root: nil}, fn ->
        assert_raise RuntimeError, "Drupal root is not configured", fn ->
          Config.url("will-raise")
        end
      end)
    end
  end

  defp set_drupal_root(value, fun) do
    original_config = Application.get_env(:site, :drupal)
    Application.put_env(:site, :drupal, value)
    fun.()
    Application.put_env(:site, :drupal, original_config)
  end
end
