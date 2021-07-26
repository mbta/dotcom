defmodule Site.ApplicationTest do
  @moduledoc false
  use ExUnit.Case

  describe "start/2" do
    setup do
      :ok = Application.stop(:site)
      Process.sleep(5000)
      :ok
    end

    test "can start the application" do
      # ensures that our supervision tree gets coverage tracked
      assert {:ok, _} = Application.ensure_all_started(:site)
    end
  end
end
