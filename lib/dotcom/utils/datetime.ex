defmodule Dotcom.Utils.DateTime do
  @moduledoc false

  @tz "America/New_York"

  @doc "The current datetime in the America/New_York timezone."
  @spec now() :: DateTime.t()
  @spec now((String.t() -> DateTime.t())) :: DateTime.t()
  def now(utc_now_fn \\ &Timex.now/1) do
    @tz
    |> utc_now_fn.()
    |> to_local_time()

    # to_local_time(utc_now_fn.())
  end

  def date_as_js_string(%DateTime{} = date_time) do
    Timex.format!(date_time, "%FT%H:%M", :strftime)
  end

  def date_as_js_string(%Date{} = date) do
    Timex.format!(date, "%FT%H:%M", :strftime)
  end

  def date_as_js_string(%NaiveDateTime{} = naive_date_time) do
    Timex.format!(naive_date_time, "%FT%H:%M", :strftime)
  end

  @doc "Today's date in the America/New_York timezone."
  def today do
    now() |> Timex.to_date()
  end

  @spec time_is_greater_or_equal?(
          DateTime.t() | NaiveDateTime.t(),
          DateTime.t() | NaiveDateTime.t()
        ) :: boolean
  def time_is_greater_or_equal?(time, ref_time) do
    compare_fn =
      case {time, ref_time} do
        {%DateTime{}, %DateTime{}} ->
          &DateTime.compare/2

        {%NaiveDateTime{}, %NaiveDateTime{}} ->
          &NaiveDateTime.compare/2
      end

    case compare_fn.(time, ref_time) do
      :gt -> true
      :eq -> true
      :lt -> false
    end
  end

  def parse_date_time(%DateTime{} = date_time) do
    date_time
  end

  def parse_date_time(%NaiveDateTime{} = date_time) do
    date_time
  end

  def parse_date_time(string) when is_binary(string) do
    Timex.parse!(string, "{YYYY}-{M}-{D} {_h24}:{_m} {AM}")
  end

  def parse_date_time(map) when is_map(map) do
    case parse(map) do
      {:error, _} ->
        Timex.now()

      date_time ->
        date_time
    end
  end

  def parse_date_time(_), do: Timex.now()

  @spec parse(map | DateTime.t()) :: NaiveDateTime.t() | DateTime.t() | {:error, :invalid_date}
  def parse(date_params) do
    case date_to_string(date_params) do
      <<str::binary>> ->
        str
        |> Timex.parse("{YYYY}-{M}-{D} {_h24}:{_m} {AM}")
        |> do_parse()

      error ->
        error
    end
  end

  defp do_parse({:ok, %NaiveDateTime{} = naive}) do
    if Timex.is_valid?(naive) do
      naive
    else
      {:error, :invalid_date}
    end
  end

  defp do_parse({:error, _}), do: {:error, :invalid_date}

  @spec date_to_string(map | DateTime.t()) :: String.t() | DateTime.t() | {:error, :invalid_date}
  defp date_to_string(%{
         "year" => year,
         "month" => month,
         "day" => day,
         "hour" => hour,
         "minute" => minute,
         "am_pm" => am_pm
       }) do
    "#{year}-#{month}-#{day} #{hour}:#{minute} #{am_pm}"
  end

  defp date_to_string(date) when is_binary(date), do: date

  defp date_to_string(%DateTime{} = date) do
    date
  end

  defp date_to_string(%{}) do
    {:error, :invalid_date}
  end

  @spec date_to_naive_date(NaiveDateTime.t() | DateTime.t() | Date.t()) :: NaiveDateTime.t()
  def date_to_naive_date(%Date{} = date), do: NaiveDateTime.new(date, ~T[00:00:00.00]) |> elem(1)
  def date_to_naive_date(%DateTime{} = date), do: DateTime.to_naive(date)
  def date_to_naive_date(%NaiveDateTime{} = date), do: date

  def convert_to_iso_format(date) do
    date
    |> Timex.format!("{ISOdate}")
  end

  @doc "Gives the date for tomorrow based on the provided date"
  def tomorrow_date(%DateTime{} = datetime) do
    datetime
    |> DateTime.to_date()
    |> Date.add(1)
    |> Date.to_string()
  end

  @doc "Converts a NaiveDateTime to a DateTime with the given time zone, handling ambiguities. Defaults to America/New_York if errors"
  @spec convert_using_timezone(NaiveDateTime.t(), String.t()) :: DateTime.t()
  def convert_using_timezone(time, time_zone) do
    tz =
      if Timex.Timezone.exists?(time_zone) do
        time_zone
      else
        "America/New_York"
      end

    time
    |> Timex.Timezone.convert(tz)
    |> handle_ambiguous_time()
  end

  @doc "Converts a DateTime.t into the America/New_York zone, handling ambiguities"
  @spec to_local_time(DateTime.t() | NaiveDateTime.t() | Timex.AmbiguousDateTime.t()) ::
          DateTime.t() | {:error, any}
  def to_local_time(%DateTime{zone_abbr: zone} = time)
      when zone in ["EDT", "EST", "-04", "-05"] do
    time
  end

  def to_local_time(%DateTime{zone_abbr: "UTC"} = time) do
    time
    |> Timex.Timezone.convert(@tz)
    |> handle_ambiguous_time()
  end

  # important: assumes the NaiveDateTime is in UTC.
  def to_local_time(%NaiveDateTime{} = time) do
    time
    |> DateTime.from_naive!("Etc/UTC")
    |> to_local_time()
  end

  def to_local_time(%Timex.AmbiguousDateTime{} = time), do: handle_ambiguous_time(time)

  @spec handle_ambiguous_time(Timex.AmbiguousDateTime.t() | DateTime.t() | {:error, any}) ::
          DateTime.t() | {:error, any}
  defp handle_ambiguous_time(%Timex.AmbiguousDateTime{after: aft}) do
    # ambiguous time only happens between midnight and 3am
    # during November daylight saving transition
    aft
  end

  defp handle_ambiguous_time(%DateTime{} = time) do
    time
  end

  defp handle_ambiguous_time({:error, error}) do
    {:error, error}
  end

  def tz, do: @tz

  @doc """
  Provides a user-friendly display of time based on the "kitchen"
  format, but with am/pm instead of AM/PM.

  ## Examples
      iex> Dotcom.Utils.DateTime.kitchen_downcase_time(~T[08:30:00])
      "8:30am"

      iex> Dotcom.Utils.DateTime.kitchen_downcase_time(~T[20:30:00])
      "8:30pm"

      # Works for DateTime and NaiveDateTime inputs as well
      iex> Dotcom.Utils.DateTime.kitchen_downcase_time(~N[2018-01-17T20:30:00])
      "8:30pm"
  """
  @spec kitchen_downcase_time(DateTime.t() | NaiveDateTime.t() | Time.t()) :: String.t()
  def kitchen_downcase_time(time) do
    time |> Timex.format!("{kitchen}") |> String.downcase()
  end

  @doc """
  The current service date.  The service date lasts from 3am to 2:59am, so
  times after midnight belong to the service of the previous date.
  """
  @spec service_date(DateTime.t() | NaiveDateTime.t()) :: Date.t()
  def service_date(current_time \\ Dotcom.Utils.DateTime.now()) do
    current_time
    |> to_local_time()
    |> do_service_date()
  end

  defp do_service_date(%DateTime{hour: hour} = time) when hour < 3 do
    time
    |> Timex.shift(hours: -3)
    |> DateTime.to_date()
  end

  defp do_service_date(%DateTime{} = time) do
    DateTime.to_date(time)
  end


  @doc """
  The time corresponding to end-of-service, given that service day
  boundaries at at 3am each day.

  ## Examples
      iex> time = Timex.to_datetime(~N[2025-01-17T12:00:00], "America/New_York")
      iex> Dotcom.Utils.DateTime.end_of_service(time)
      #DateTime<2025-01-18 03:00:00-05:00 EST America/New_York>

      # Does not shift to the next day if the given time is earlier than end-of-service
      iex> time = Timex.to_datetime(~N[2025-01-17T02:00:00], "America/New_York")
      iex> Dotcom.Utils.DateTime.end_of_service(time)
      #DateTime<2025-01-17 03:00:00-05:00 EST America/New_York>

      # Also handles times in UTC
      iex> time = ~U[2025-01-17T17:00:00Z] # Noon in Eastern Time, given 5-hour offset
      iex> Dotcom.Utils.DateTime.end_of_service(time)
      #DateTime<2025-01-18 03:00:00-05:00 EST America/New_York>

      iex> time = ~U[2025-01-17T06:00:00Z] # Early enough that it's before 3am
      iex> Dotcom.Utils.DateTime.end_of_service(time)
      #DateTime<2025-01-17 03:00:00-05:00 EST America/New_York>

  The time returned is exactly equal to beginning of service the next
  day, so when comparing to the time returned, use `&Timex.before?/2`
  or equivalent for a strictly-less-than comparison.

  ## Examples
      iex> now = Timex.to_datetime(~N[2025-01-17T12:00:00], "America/New_York")
      iex> time_of_interest = Timex.to_datetime(~N[2025-01-18T03:00:00], "America/New_York") # Technically part of "tomorrow"'s service date
      iex> Timex.before?(time_of_interest, Dotcom.Utils.DateTime.end_of_service(now))
      false

      iex> now = Timex.to_datetime(~N[2025-01-17T12:00:00], "America/New_York")
      iex> time_of_interest = Timex.to_datetime(~N[2025-01-18T02:59:59], "America/New_York") # Part of "today"'s service date
      iex> Timex.before?(time_of_interest, Dotcom.Utils.DateTime.end_of_service(now))
      true
  """
  @spec end_of_service(DateTime.t() | NaiveDateTime.t()) :: DateTime.t()
  def end_of_service(current_time \\ Dotcom.Utils.DateTime.now()) do
    current_time
    |> service_date()
    |> Timex.shift(days: 1)
    |> Timex.to_datetime("America/New_York")
    |> Timex.set(hour: 3)
  end
end
