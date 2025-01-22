defmodule Dotcom.DateHelpers do
  @moduledoc false
  def non_holiday_date(date) do
    # return a date that's not a holiday
    case Holiday.Repo.by_date(date) do
      [] -> date
      _ -> non_holiday_date(Timex.shift(date, days: 1))
    end
  end

  def non_weekend_date(date) do
    # return only weekdays
    if Date.day_of_week(date) < 6 do
      date
    else
      Timex.shift(date, days: 2)
    end
  end
end
