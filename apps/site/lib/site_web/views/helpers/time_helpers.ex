defmodule SiteWeb.TimeHelpers do
  @moduledoc """
  Various helper functions for formatting dates/times.
  """
  use Timex

  @type format_type :: atom()

  @doc "Returns a string with the month, day and year, according to format type"
  @spec format_date(DateTime.t() | Date.t(), format_type() | nil) :: String.t()
  @spec format_date(DateTime.t() | Date.t()) :: String.t()
  def format_date(date, format_type \\ nil)

  def format_date(date, :event) do
    Timex.format!(date, "{WDshort}, {Mshort} {D}, {YYYY}")
  end

  def format_date(date, nil) do
    Timex.format!(date, "{Mfull} {D}, {YYYY}")
  end

  @doc "Returns a string with the month"
  @spec format_month(DateTime.t() | Date.t()) :: String.t()
  def format_month(date), do: Timex.format!(date, "{Mshort}")

  @doc "Returns a string with the day"
  @spec format_day(DateTime.t() | Date.t()) :: String.t()
  def format_day(date), do: Timex.format!(date, "{D}")
end
