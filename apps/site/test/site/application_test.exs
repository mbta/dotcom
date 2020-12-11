defmodule Site.ApplicationTest do
  @moduledoc false
  use ExUnit.Case

  describe "start/2" do
    test "can start the application" do
      # ensures that our supervision tree gets coverage tracked
      Application.stop(:site)
      assert {:ok, _} = Application.ensure_all_started(:site)
    end
  end
end
