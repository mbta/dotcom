defmodule CMS.RepoTest do
  use ExUnit.Case, async: false

  import Mox

  alias CMS.Repo

  setup :set_mox_global

  setup do
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    %{cache: cache}
  end

  setup :verify_on_exit!

  describe "generate/3" do
    test "generates the correct key for /*" do
      path = "/foo"

      assert Repo.generate(nil, nil, [path, %{}]) == "cms.repo" <> String.replace(path, "/", "|")
    end

    test "generates the correct key for /**/*" do
      path = "/foo/bar"

      assert Repo.generate(nil, nil, [path, %{}]) == "cms.repo" <> String.replace(path, "/", "|")
    end

    test "ignores params" do
      path = "/foo/bar"
      params = %{"data" => %{"some" => "map"}}

      assert Repo.generate(nil, nil, [path, params]) ==
               "cms.repo" <> String.replace(path, "/", "|")
    end
  end
end
