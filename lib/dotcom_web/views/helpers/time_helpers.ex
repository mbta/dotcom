defmodule DotcomWeb.TimeHelpers do
  use Timex

  @doc "Returns a string with the full month, day and year."
  def format_date(date) do
    Timex.format!(date, "{Mfull} {D}, {YYYY}")
  end
end
