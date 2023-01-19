defmodule Algolia.ApplicationTest do
  use ExUnit.Case, async: true

  describe "start/2" do
    test "can start the application" do
      Application.stop(:algolia)
      assert {:ok, _} = Application.ensure_all_started(:algolia)
    end
  end
end
