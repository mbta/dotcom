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
            assert Enum.all?(Enum.slice(actual, 1..-2), &(elem(&1, 1) == false))
        end
      end
    end
  end

  describe "pop_off_front_and_back/2" do
    test "splits a list into the first n, last n, and middle portions" do
      ptest l: list(int()), n: int(min: 0) do
        length = Enum.count(l)
        {first, middle, last} = pop_off_front_and_back(l, n)

        assert Enum.count(first) == Enum.min([n, length])
        assert Enum.count(last) == Enum.min([Enum.max([length - n, 0]), n])
        assert first ++ middle ++ last == l
      end
    end
  end

  describe "pop_off_front_and_back/3" do
    test "splits a list into the first n, last m, and middle portions" do
      ptest l: list(int()), n: int(min: 0), m: int(min: 0) do
        length = Enum.count(l)
        {first, middle, last} = pop_off_front_and_back(l, n, m)

        assert Enum.count(first) == Enum.min([n, length])
        assert Enum.count(last) == Enum.min([Enum.max([length - n, 0]), m])
        assert first ++ middle ++ last == l
      end
    end
  end
end
