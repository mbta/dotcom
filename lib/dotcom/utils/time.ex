defmodule Dotcom.Utils.Time do
  @moduledoc """
  Functions for working with dates, datetimes, times, or any combination thereof.
  """

  @default_between_opts [inclusive: true]

  @doc """
  Nearly identical to [`Timex.between?/4`](https://hexdocs.pm/timex/Timex.html#between?/4),
  with these caveats:

  * Defaults to inclusive bounds
  * Supports `nil` values for the start, ending, or both. These are treated as infinitely
  past or future, respectively.
  """
  @spec between?(
          Timex.Types.valid_datetime(),
          Timex.Types.valid_datetime() | nil,
          Timex.Types.valid_datetime() | nil,
          Timex.between_options()
        ) ::
          boolean()
  def between?(t, start, ending, opts \\ @default_between_opts)

  def between?(t, start, ending, opts) do
    start = if(start, do: start, else: ~D[0000-01-01])
    ending = if(ending, do: ending, else: ~D[9999-12-31])
    Timex.between?(t, start, ending, Keyword.merge(@default_between_opts, opts))
  end

  @doc """
  """
  @spec format(Timex.Types.valid_datetime(), any()) :: {:ok, String.t()} | {:error, any()}
  def format(datetime, style \\ :full_date) do
    try do
      {:ok, format!(datetime, style)}
    rescue
      e -> {:error, e}
    end
  end

  @doc """
  """
  @spec format!(Timex.Types.valid_datetime(), atom()) :: String.t()
  def format!(datetime, style \\ :full_date)
  # Example (2000-01-01 00:00 UTC): "January 1, 2000"
  def format!(datetime, :full_date) do
    Timex.format!(datetime, "{Mfull} {D}, {YYYY}")
  end

  # Example (2000-01-01 00:00 UTC): "Jan 1, 2000"
  def format!(datetime, :short_date) do
    Timex.format!(datetime, "{Mshort} {D}, {YYYY}")
  end

  # Example (2000-01-01 00:00 UTC): "January 1, 2000, 12:00 AM"
  def format!(datetime, :full_datetime) do
    Timex.format!(datetime, "{Mfull} {D}, {YYYY}, {h12}:{m} {AM}")
  end

  # Example (2000-01-01 00:00 UTC): "12 AM"
  def format!(datetime, :time_12h) do
    Timex.format!(datetime, "{h12} {AM}")
  end

  # Example (2000-01-01 00:00 UTC): "12:00 AM"
  def format!(datetime, :time_12h_with_minutes) do
    Timex.format!(datetime, "{h12}:{m} {AM}")
  end

  # Example (2000-01-01 00:00 UTC): "00:00"
  def format!(datetime, :time_24h) do
    Timex.format!(datetime, "{h24}:{m}")
  end

  # Example (2000-01-01 00:00 UTC): "2000-01-01T00:00:00Z"
  def format!(datetime, :iso) do
    Timex.format!(datetime, "{ISO:Extended}")
  end

  # Example (2000-01-01 00:00 UTC): "01/01/2000"
  def format!(datetime, :mm_dd_yyyy) do
    Timex.format!(datetime, "{0M}/{0D}/{YYYY}")
  end

  # Example (2000-01-01 00:00 UTC): "01/01/2000 00:00"
  def format!(datetime, :mm_dd_yyyy_time) do
    Timex.format!(datetime, "{0M}/{0D}/{YYYY} {h24}:{m}")
  end

  # Example (2000-01-01 00:00 UTC): "Saturday, January 1, 2000"
  def format!(datetime, :weekday_full_date) do
    Timex.format!(datetime, "{WDfull}, {Mfull} {D}, {YYYY}")
  end

  # Example (2000-01-01 00:00 UTC): "1"
  def format!(datetime, :strftime_day) do
    Timex.format!(datetime, "%-d", :strftime)
  end

  # Example (2000-01-01 00:00 UTC): "Sat, Jan  1"
  def format!(datetime, :strftime_abbrev) do
    Timex.format!(datetime, "%a, %b %e", :strftime)
  end

  # Example (2000-01-01 00:00 UTC): "January 2000"
  def format!(datetime, :mfull_year) do
    Timex.format!(datetime, "{Mfull} {YYYY}")
  end

  # Example (2000-01-01 00:00 UTC): "Jan"
  def format!(datetime, :mshort) do
    Timex.format!(datetime, "{Mshort}")
  end

  # Example (2000-01-01 00:00 UTC): "01"
  def format!(datetime, :zero_d) do
    Timex.format!(datetime, "{0D}")
  end

  # Example (2000-01-01 00:00 UTC): "2000-1-1 00:00"
  def format!(datetime, :yyyy_m_d_h24_m) do
    Timex.format!(datetime, "{YYYY}-{M}-{D} {h24}:{m}")
  end

  # Small additional atoms used in templates
  # Example (2000-01-01 00:00 UTC): "12"
  def format!(datetime, :h12) do
    Timex.format!(datetime, "{h12}")
  end

  # Example (2000-01-01 00:00 UTC): "1/1/2000"
  def format!(datetime, :m_d_y) do
    Timex.format!(datetime, "{M}/{D}/{YYYY}")
  end

  # Additional atom mappings for patterns found in the codebase.
  # Example (2000-01-01 00:00 UTC): "Saturday, January 1"
  def format!(datetime, :weekday_month_day) do
    Timex.format!(datetime, "{WDfull}, {Mfull} {D}")
  end

  # Example (2000-01-01 00:00 UTC): "2000-01-01"
  def format!(datetime, :iso_date) do
    Timex.format!(datetime, "{YYYY}-{0M}-{0D}")
  end

  # Example (2000-01-01 00:00 UTC): "20000101T000000Z"
  def format!(datetime, :ical_timestamp) do
    Timex.format!(datetime, "{YYYY}{0M}{0D}T{h24}{m}{s}Z")
  end

  # Example (2000-01-01 00:00 UTC): "Jan 1 2000 00:00"
  def format!(datetime, :mshort_d_y_h24_m) do
    Timex.format!(datetime, "{Mshort} {D} {YYYY} {h24}:{m}")
  end

  # Example (2000-01-01 00:00 UTC): "12:00 AM UTC"
  def format!(datetime, :time_12h_with_zone) do
    Timex.format!(datetime, "{h12}:{m} {AM} {Zabbr}")
  end

  def format!(_datetime, other) do
    raise "Dotcom.Utils.Time.format!/2 error: unknown_format_style #{inspect(other)}"
  end
end
