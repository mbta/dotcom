defmodule DotcomWeb.TimeHelpers do
  @moduledoc false
  use Timex

  @doc "Returns a string with the full month, day and year."
  @spec format_date(DateTime.t() | Date.t()) :: String.t()
  def format_date(date) do
    Timex.format!(date, "{Mfull} {D}, {YYYY}")
  end
end
