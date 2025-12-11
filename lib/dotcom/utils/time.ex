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
  Wraps calls to `format!/2`.
  """
  @spec format(Timex.Types.valid_datetime(), atom()) :: {:ok, String.t()} | {:error, any()}
  def format(datetime, style) do
    try do
      {:ok, format!(datetime, style)}
    rescue
      e -> {:error, e}
    end
  end

  @doc """
  Formats the given datetime according to a predefined style.

  ## Examples

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :datetime_full)
      "January 1, 2000, 11:59 PM"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :datetime_short)
      "Jan 1 2000 23:59"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :iso)
      "2000-01-01T23:59:00+00:00"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :yyyy_m_d_hour24_m)
      "2000-1-1 23:59"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :mm_dd_yyyy_time)
      "01/01/2000 23:59"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :ical_timestamp)
      "20000101T235900Z"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :weekday_date_full)
      "Saturday, January 1, 2000"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :weekday_date_short)
      "Sat, Jan 1, 2000"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :date_full)
      "January 1, 2000"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :date_short)
      "Jan 1, 2000"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :iso_date)
      "2000-01-01"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :mm_dd_yyyy)
      "01/01/2000"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :m_d_yyyy)
      "1/1/2000"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :hour_12_minutes_tz)
      "11:59 PM UTC"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :hour_12_minutes)
      "11:59 PM"

      iex> t = ~U[2000-01-01 23:00:00Z]
      iex> Dotcom.Utils.Time.format!(t, :hour_12_minutes)
      "11:00 PM"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :hour_12)
      "11 PM"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :hour_24_minutes)
      "23:59"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :weekday_month_day)
      "Saturday, January 1"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :weekday_month_day_short)
      "Sat, Jan 1"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :month_day_short)
      "Jan 1"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :month_year)
      "January 2000"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :month_short)
      "Jan"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :day_of_month_zero)
      "01"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :day_of_month)
      "1"

      iex> t = ~U[2000-01-01 23:59:00Z]
      iex> Dotcom.Utils.Time.format!(t, :hour)
      "11"
  """
  @spec format!(Timex.Types.valid_datetime(), atom()) :: String.t()
  def format!(datetime, style)

  # DATETIMES #

  # January 1, 2000, 11:59 PM
  def format!(datetime, :datetime_full) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "MMMM d, y, h:mm a")

    string
  end

  # Jan 1 2000 23:59
  def format!(datetime, :datetime_short) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "MMM d y HH:mm")

    string
  end

  # 2000-01-01T23:59:00Z
  def format!(datetime, :iso) do
    Timex.format!(datetime, "{ISO:Extended}")
  end

  # 2000-1-1 23:59
  def format!(datetime, :yyyy_m_d_hour24_m) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "y-M-d HH:mm")

    string
  end

  # 01/01/2000 23:59
  def format!(datetime, :mm_dd_yyyy_time) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "MM/dd/y HH:mm")

    string
  end

  # 20000101T235900Z
  def format!(datetime, :ical_timestamp) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "yyyyMMdd'T'HHmmss'Z'")

    string
  end

  # DATES #

  # Saturday, January 1, 2000
  def format!(datetime, :weekday_date_full) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "EEEE, MMMM d, y")

    string
  end

  # Sat, Jan 1, 2000
  def format!(datetime, :weekday_date_short) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "EEE, MMM d, y")

    string
  end

  # January 1, 2000
  def format!(datetime, :date_full) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "MMMM d, y")

    string
  end

  # Jan 1, 2000
  def format!(datetime, :date_short) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "MMM d, y")

    string
  end

  # 2000-01-01
  def format!(datetime, :iso_date) do
    Timex.format!(datetime, "{YYYY}-{0M}-{0D}")
  end

  # 01/01/2000
  def format!(datetime, :mm_dd_yyyy) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "MM/dd/y")

    string
  end

  # 1/1/2000
  def format!(datetime, :m_d_yyyy) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "M/d/y")

    string
  end

  # TIMES #

  # 11:59 PM UTC
  def format!(datetime, :hour_12_minutes_tz) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "h:mm a z")

    string
  end

  # 11:59 PM
  def format!(datetime, :hour_12_minutes) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "h:mm a")

    string
  end

  # 11 PM
  def format!(datetime, :hour_12) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "h a")

    string
  end

  # 23:59
  def format!(datetime, :hour_24_minutes) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "HH:mm")

    string
  end

  # DATETIME PIECES #

  # Saturday, January 1
  def format!(datetime, :weekday_month_day) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "EEEE, MMMM d")

    string
  end

  # Sat, Jan 1
  def format!(datetime, :weekday_month_day_short) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "EEE, MMM d")

    string
  end

  # Jan 1
  def format!(datetime, :month_day_short) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "MMM d")

    string
  end

  # January 2000
  def format!(datetime, :month_year) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "MMMM y")

    string
  end

  # Jan
  def format!(datetime, :month_short) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "MMM")

    string
  end

  # 01
  def format!(datetime, :day_of_month_zero) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "dd")

    string
  end

  # 1
  def format!(datetime, :day_of_month) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "d")

    string
  end

  # 11
  def format!(datetime, :hour) do
    {:ok, string} = Cldr.DateTime.to_string(datetime, Dotcom.Cldr, format: "h")

    string
  end

  def format!(_datetime, other) do
    raise "Dotcom.Utils.Time.format!/2 error: unknown_format_style #{inspect(other)}"
  end
end
