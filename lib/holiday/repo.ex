defmodule Holiday.Repo.Helpers do
  @moduledoc """

  Helper functions used by the compilation of Holiday.Repo.

  """

  @doc """

  Generates a list of Holidays from the shorthand.

  iex> Holiday.Repo.Helpers.make_holiday({"Name", [{1, 2}, {3, 4}]}, 1000)
  [%Holiday{date: ~D[1000-01-02], name: "Name"},
   %Holiday{date: ~D[1001-03-04], name: "Name"}]
  """
  def make_holiday({name, list_of_dates}, start_year) do
    list_of_dates
    |> Enum.with_index(start_year)
    |> Enum.map(fn {{month, day}, year} ->
      %Holiday{date: Date.from_erl!({year, month, day}), name: name}
    end)
  end

  @doc """

  If a holiday falls on a Sunday, it is observed on that Monday.

  iex> Holiday.Repo.Helpers.observe_holiday(%Holiday{date: ~D[2018-11-11], name: "Name"})
  [%Holiday{date: ~D[2018-11-11], name: "Name"},
   %Holiday{date: ~D[2018-11-12], name: "Name (Observed)"}]

  iex> Holiday.Repo.Helpers.observe_holiday(%Holiday{date: ~D[2018-01-01], name: "Name"})
  [%Holiday{date: ~D[2018-01-01], name: "Name"}]
  """
  def observe_holiday(%Holiday{date: date} = holiday) do
    # Sunday
    if Date.day_of_week(date) == 7 do
      [holiday, %{holiday | date: Date.add(date, 1), name: "#{holiday.name} (Observed)"}]
    else
      [holiday]
    end
  end

  @doc """

  Used by Map.new to build the Holiday map: returns the date as the key for the Map.

  iex> Holiday.Repo.Helpers.build_map(%Holiday{date: ~D[2016-01-01], name: "Name"})
  {~D[2016-01-01], %Holiday{date: ~D[2016-01-01], name: "Name"}}
  """
  def build_map(%Holiday{date: date} = holiday) do
    {date, holiday}
  end
end

defmodule Holiday.Repo do
  import Holiday.Repo.Helpers
  # from https://www.sec.state.ma.us/divisions/cis/holiday-info.htm
  @start_year 2023
  @holidays [
              # { name, [{month, day}, {month, day}, ...]},
              {"New Year’s Day", [{1, 1}, {1, 1}, {1, 1}]},
              {"Martin Luther King, Jr. Day", [{1, 16}, {1, 15}, {1, 20}]},
              {"Washington’s Birthday", [{2, 20}, {2, 19}, {2, 17}]},
              {"Patriots’ Day", [{4, 17}, {4, 15}, {4, 21}]},
              {"Memorial Day", [{5, 29}, {5, 27}, {5, 26}]},
              {"Juneteenth Independence Day", [{6, 19}, {6, 19}, {6, 19}]},
              {"Independence Day", [{7, 4}, {7, 4}, {7, 4}]},
              {"Labor Day", [{9, 4}, {9, 2}, {9, 1}]},
              {"Columbus Day", [{10, 9}, {10, 14}, {10, 13}]},
              {"Veterans Day", [{11, 11}, {11, 11}, {11, 11}]},
              {"Thanksgiving Day", [{11, 23}, {11, 28}, {11, 27}]},
              {"Christmas Day", [{12, 25}, {12, 25}, {12, 25}]}
            ]
            |> Enum.flat_map(&make_holiday(&1, @start_year))
            |> Enum.flat_map(&observe_holiday/1)
            |> Map.new(&build_map/1)

  @doc "Returns the list of Holidays, sorted by date."
  def all do
    @holidays
    |> Map.values()
    |> Enum.sort_by(& &1.date, &(Timex.compare(&1, &2) == -1))
  end

  @doc "Returns the list of holidays for the given Date."
  def by_date(date) do
    case Map.fetch(@holidays, date) do
      {:ok, holiday} -> [holiday]
      _ -> []
    end
  end

  @doc "Returns the list of holidays in the given month."
  def holidays_in_month(date) do
    same_time_frame? = fn tf, d -> Map.fetch!(d, tf) == Map.fetch!(date, tf) end

    upcoming? = fn %Holiday{date: h} ->
      same_time_frame?.(:year, h) and same_time_frame?.(:month, h)
    end

    all()
    |> Enum.filter(upcoming?)
  end

  @doc "Returns all holidays after the given date"
  def following(date) do
    all()
    |> Enum.drop_while(fn day -> Timex.before?(day.date, date) end)
  end
end
