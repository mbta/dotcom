defmodule SiteWeb.EventDateRange do
  @moduledoc "Useful functions for date ranges"
  @spec build(map, Date.t()) :: map
  def build(params, fallback_date \\ Util.today())

  def build(%{month: month, year: year}, fallback_date)
      when is_integer(month) and is_integer(year) do
    case Date.new(year, month, 1) do
      {:ok, date} -> for_month(date)
      {:error, _error} -> for_month(fallback_date)
    end
  end

  def build(%{year: year}, fallback_date) when is_integer(year) do
    case Date.new(year, 1, 1) do
      {:ok, date} -> for_year(date)
      {:error, _error} -> for_year(fallback_date)
    end
  end

  def build(_, fallback_date), do: for_year(fallback_date)

  @spec for_month(Date.t()) :: map
  defp for_month(date) do
    start_date = date |> Timex.beginning_of_month()
    end_date = date |> Timex.end_of_month() |> Timex.shift(days: 1)

    date_range(start_date: start_date, end_date: end_date)
  end

  @spec for_year(Date.t()) :: map
  defp for_year(date) do
    start_date = date |> Timex.beginning_of_year()
    end_date = date |> Timex.end_of_year() |> Timex.shift(days: 1)

    date_range(start_date: start_date, end_date: end_date)
  end

  defp date_range(start_date: start_date, end_date: end_date) do
    %{
      start_time_gt: start_date |> Util.convert_to_iso_format(),
      start_time_lt: end_date |> Util.convert_to_iso_format()
    }
  end
end
