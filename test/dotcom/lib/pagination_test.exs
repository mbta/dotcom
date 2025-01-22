defmodule Dotcom.PaginationTest do
  use ExUnit.Case

  import Dotcom.Pagination

  describe "current_page/1" do
    test "given an integer" do
      default_page = 1
      assert current_page(2, default_page) == 2
    end

    test "given a string" do
      default_page = 1
      assert current_page("2", default_page) == 2
    end

    test "returns the default page, given a value that cannot be converted to an integer" do
      default_page = 1
      assert current_page("abc", default_page) == default_page
    end

    test "returns the default page, given garbage" do
      default_page = 2
      assert current_page("2/3/1", default_page) == default_page
    end

    test "returns the default page, given nil" do
      default_page = 1
      assert current_page(nil, default_page) == default_page
    end
  end
end
