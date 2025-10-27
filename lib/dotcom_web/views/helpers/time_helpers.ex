defmodule DotcomWeb.TimeHelpers do
  use Timex

  @doc "Returns a string with the full month, day and year."
  @spec format_date(DateTime.t() | Date.t()) :: String.t()
  def format_date(date) do
    Dotcom.Utils.Time.format!(date, :date_full)
  end
end
