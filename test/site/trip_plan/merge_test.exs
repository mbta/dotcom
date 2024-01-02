defmodule Site.TripPlan.MergeTest do
  @moduledoc false
  use ExUnit.Case
  use Quixir

  import Site.TripPlan.Merge

  doctest Site.TripPlan.Merge

  defp do_merge(accessible, unknown) do
    accessible = accessible |> Enum.sort() |> Enum.dedup()
    unknown = unknown |> Enum.sort() |> Enum.dedup()
    merged = merge(accessible, unknown, &==/2)
    {accessible, unknown, merged}
  end

  describe "merge/3" do
    test "includes no duplicates" do
      ptest accessible: list(of: positive_int(), max: 5),
            unknown: list(of: positive_int(), max: 5) do
        {_, _, merged} = do_merge(accessible, unknown)
        assert Enum.uniq(merged) == merged
      end
    end

    test "includes no duplicates when the first elements don't match" do
      unknown = [{1, :unknown}, {2, :unknown}, {3, :unknown}]
      accessible = [{2, :accessible}, {3, :accessible}]
      equal_fn = fn {accessible, _}, {unknown, _} -> accessible == unknown end

      merged = merge(accessible, unknown, equal_fn, needed_accessible: 2, needed_unknown: 2)
      assert merged == [{1, :unknown}, {2, :accessible}, {3, :accessible}]
    end

    test "includes no more than total items" do
      ptest accessible: list(of: positive_int(), max: 5),
            unknown: list(of: positive_int(), max: 5),
            total: int(min: 2) do
        merged = merge(accessible, unknown, &==/2, total: total)
        assert length(merged) <= total
      end
    end

    test "always includes the first items in the lists" do
      ptest accessible: list(of: positive_int(), max: 5),
            unknown: list(of: positive_int(), max: 5) do
        {accessible, unknown, merged} = do_merge(accessible, unknown)

        unless accessible == [] do
          assert List.first(accessible) in merged
        end

        unless unknown == [] do
          assert List.first(unknown) in merged
        end
      end
    end
  end
end
