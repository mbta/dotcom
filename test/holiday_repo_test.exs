defmodule Holiday.RepoTest do
  use ExUnit.Case, async: true

  describe "all/0" do
    test "returns a list of Holidays sorted by date" do
      actual = Holiday.Repo.all()

      assert actual != []
      assert Enum.all?(actual, &match?(%Holiday{}, &1))
      assert actual == Enum.sort_by(actual, & &1.date, &(Timex.compare(&1, &2) == -1))
    end
  end

  describe "by_date/1" do
    test "returns Christmas Day on 2023-12-25" do
      date = ~D[2023-12-25]
      assert Holiday.Repo.by_date(date) == [%Holiday{date: date, name: "Christmas Day"}]
    end

    test "returns nothing for 2024-11-01" do
      date = ~D[2024-11-01]
      assert Holiday.Repo.by_date(date) == []
    end
  end

  describe "holidays_in_month/1" do
    test "returns all holidays in the given month" do
      for date <- [~D[2023-12-01], ~D[2023-12-25], ~D[2023-12-31]] do
        assert Holiday.Repo.holidays_in_month(date) == [
                 %Holiday{date: ~D[2023-12-25], name: "Christmas Day"}
               ]
      end
    end
  end

  describe "following/2" do
    test "returns the holidays in the set after the date" do
      date = ~D[2023-01-10]

      assert date
             |> Holiday.Repo.following()
             |> Enum.all?(fn holiday -> Timex.before?(date, holiday.date) end)
    end
  end
end

defmodule Holiday.Repo.HelpersTest do
  use ExUnit.Case, async: true

  doctest Holiday.Repo.Helpers
end
