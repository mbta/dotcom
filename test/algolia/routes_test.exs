defmodule Algolia.RoutesTest do
  use ExUnit.Case, async: true

  import Mox

  setup do
    stub(Routes.Repo.Mock, :green_line, fn ->
      Routes.Repo.green_line()
    end)

    :ok
  end

  setup :verify_on_exit!

  describe "Algolia.RoutesTest" do
    test "&all/0" do
      assert Enum.all?(Algolia.Routes.all(), &match?(%Routes.Route{}, &1))
    end

    test "&all/0 has an entry for the Green Line" do
      assert Enum.find(Algolia.Routes.all(), fn x -> x.name == "Green Line" end) != nil
    end
  end
end
