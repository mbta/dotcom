defmodule Dotcom.Utils.ListTest do
  use ExUnit.Case, async: true

  import Dotcom.Utils.List

  describe "find_first/3" do
    @list [1, 2, 3, 4, 5, 6, 7, 8, 9]

    test "returns the first given element if it appears first" do
      assert find_first(@list, 4, 5) == 4
      assert find_first(@list, 4, 11) == 4
    end

    test "returns the second given element if it appears first" do
      assert find_first(@list, 7, 5) == 5
      assert find_first(@list, 13, 5) == 5
    end

    test "returns nil when neither element is in the given list" do
      refute find_first(@list, 10, 11)
    end
  end
end
