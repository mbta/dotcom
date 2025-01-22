defmodule Util.EnumHelpersTest do
  use ExUnit.Case, async: true
  use Quixir

  import Util.EnumHelpers

  doctest Util.EnumHelpers

  describe "with_first_last/1" do
    test "doesn't change the order" do
      ptest l: list(int()) do
        assert l == l |> with_first_last() |> Enum.map(&elem(&1, 0))
      end
    end

    test "puts a true for the first and last items" do
      ptest l: list(int()) do
        actual = with_first_last(l)

        case l do
          [] ->
            assert actual == []

          _ ->
            assert List.first(actual) == {List.first(l), true}
            assert List.last(actual) == {List.last(l), true}
            assert Enum.all?(Enum.slice(actual, 1..-2//1), &(elem(&1, 1) == false))
        end
      end
    end
  end
end
