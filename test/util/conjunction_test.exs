defmodule Util.AndOrTest do
  use ExUnit.Case, async: true

  import IO, only: [iodata_to_binary: 1]
  import Util.AndOr

  describe "join/2" do
    test "joins with 'and'" do
      assert [] |> join(:and) |> iodata_to_binary() == ""
      assert ["1"] |> join(:and) |> iodata_to_binary() == "1"
      assert ["1", "2"] |> join(:and) |> iodata_to_binary() == "1 and 2"
      assert ["1", "2", "3"] |> join(:and) |> iodata_to_binary() == "1, 2, and 3"
      assert ["1", "2", "3", "4"] |> join(:and) |> iodata_to_binary() == "1, 2, 3, and 4"
    end

    test "joins with 'or'" do
      assert [] |> join(:or) |> iodata_to_binary() == ""
      assert ["1"] |> join(:or) |> iodata_to_binary() == "1"
      assert ["1", "2"] |> join(:or) |> iodata_to_binary() == "1 or 2"
      assert ["1", "2", "3"] |> join(:or) |> iodata_to_binary() == "1, 2, or 3"
      assert ["1", "2", "3", "4"] |> join(:or) |> iodata_to_binary() == "1, 2, 3, or 4"
    end

    test "does not join with arbitrary strings" do
      assert_raise FunctionClauseError, fn ->
        join(["1", "2"], :but)
      end
    end
  end
end
