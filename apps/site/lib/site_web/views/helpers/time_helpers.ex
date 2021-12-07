defmodule SiteWeb.TimeHelpers do
  @moduledoc """
  Functions to manipulate and format times.
  """
  use Timex

  @doc "Returns a string with the full month, day and year."
  @spec format_date(DateTime.t() | Date.t()) :: String.t()
  def format_date(date) do
    Timex.format!(date, "{Mfull} {D}, {YYYY}")
  end

  @spec format_time(Timex.Types.valid_datetime()) :: String.t()
  def format_time(%{minute: 0} = time), do: Timex.format!(time, "{h12} {AM}")
  def format_time(time), do: Timex.format!(time, "{h12}:{m} {AM}")

  @spec format_schedule_time(Timex.Types.valid_datetime()) :: String.t()
  def format_schedule_time(time) do
    time
    |> Timex.format!("{h12}:{m} {AM}")
  end
end
