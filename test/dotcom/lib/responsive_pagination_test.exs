defmodule Dotcom.ResponsivePaginationTest do
  use ExUnit.Case

  import Dotcom.ResponsivePagination

  @stats %{offset: 4, per_page: 10, total: 100}

  describe "build/2" do
    test "no results" do
      expected = %Dotcom.ResponsivePagination{
        current: nil,
        mobile_range: [],
        next: nil,
        prefix: [],
        previous: nil,
        range: [],
        suffix: []
      }

      assert expected == build(%{offset: 0, per_page: 10, total: 0})
    end

    test "middle of result" do
      expected = %Dotcom.ResponsivePagination{
        current: 5,
        mobile_range: [4, 5, 6],
        next: 6,
        prefix: [1, "…"],
        previous: 4,
        range: [3, 4, 5, 6, 7],
        suffix: ["…", 10]
      }

      assert expected == build(@stats)
      assert expected.current == 5
      assert expected.previous == expected.current - 1
      assert expected.next == expected.current + 1
      assert length(expected.prefix) == 2
      assert length(expected.suffix) == 2
      assert List.last(expected.prefix) == "…"
      assert List.first(expected.suffix) == "…"
      assert expected.mobile_range == Enum.drop(Enum.drop(expected.range, 1), -1)
    end

    test "beggining of results" do
      expected = %Dotcom.ResponsivePagination{
        current: 1,
        mobile_range: [1, 2, 3],
        next: 2,
        prefix: [],
        previous: nil,
        range: [1, 2, 3, 4, 5],
        suffix: ["…", 10]
      }

      assert expected == build(%{@stats | offset: 0})
      assert expected.current == 1
      assert expected.prefix == []
      assert length(expected.suffix) == 2
      assert expected.previous == nil
      assert expected.next == expected.current + 1
      assert expected.mobile_range == Enum.drop(expected.range, -2)
    end

    test "end of results" do
      expected = %Dotcom.ResponsivePagination{
        current: 10,
        mobile_range: [8, 9, 10],
        next: nil,
        prefix: [1, "…"],
        previous: 9,
        range: [6, 7, 8, 9, 10],
        suffix: []
      }

      assert expected == build(%{@stats | offset: 9})
      assert expected.current == 10
      assert expected.next == nil
      assert expected.previous == expected.current - 1
      assert length(expected.prefix) == 2
      assert expected.suffix == []
      assert expected.mobile_range == Enum.drop(expected.range, 2)
    end

    test "shorter prefix" do
      actual = build(%{@stats | offset: 3})
      assert actual.prefix == [1]
    end

    test "shorter suffix" do
      actual = build(%{@stats | offset: 6})
      assert actual.suffix == [10]
    end

    test "impossibly high offset" do
      actual = build(%{@stats | offset: 100})
      assert actual.current == 10
    end

    test "negative offset" do
      actual = build(%{@stats | offset: -5})
      assert actual.current == 1
    end
  end
end
