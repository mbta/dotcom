defmodule SiteWeb.EventView do
  @moduledoc "Module to display fields on the events view"
  use SiteWeb, :view

  import Phoenix.HTML.Link

  import Site.FontAwesomeHelpers

  import SiteWeb.CMSView,
    only: [file_description: 1, render_duration: 2, maybe_shift_timezone: 1, format_time: 1]

  import Util, only: [time_is_greater_or_equal?: 2, convert_using_timezone: 2, now: 0]

  alias CMS.Page.Event
  alias CMS.Partial.Teaser

  @default_date_format "{WDshort}, {Mshort} {D}, {YYYY}"

  @doc "Returns a pretty format for the event's city and state"
  @spec city_and_state(%Event{}) :: String.t() | nil
  def city_and_state(%Event{city: city, state: state}) do
    if city && state do
      "#{city}, #{state}"
    end
  end

  @doc "Returns a list of years with which we can filter events.
  Defaults to the current datetime if no assigns
  "
  @spec year_options(Plug.Conn.t()) :: %Range{:first => Calendar.year(), :last => Calendar.year()}
  def year_options(%{assigns: %{date: %{year: year}}}) when is_integer(year) do
    do_year_options(year)
  end

  def year_options(_) do
    %{year: year} = Util.now()
    do_year_options(year)
  end

  @spec do_year_options(Calendar.year()) :: %Range{
          :first => Calendar.year(),
          :last => Calendar.year()
        }
  defp do_year_options(year), do: Range.new(year - 4, year + 1)

  @doc "Returns a list of event teasers, grouped/sorted by month"
  @spec grouped_by_month([%Teaser{}], number) :: [{number, [%Teaser{}]}]
  def grouped_by_month(events, year) do
    events
    |> Enum.filter(&(&1.date.year == year))
    |> Enum.group_by(& &1.date.month)
    |> Enum.sort_by(&elem(&1, 0))
  end

  @doc "Returns a list of event teasers, grouped/sorted by day"
  @spec grouped_by_day([%Teaser{}], number) :: %{number => %Teaser{}}
  def grouped_by_day(events, month) do
    events
    |> Enum.filter(&(&1.date.month == month))
    |> Enum.group_by(& &1.date.day)
  end

  @doc "Given two DateTimes, returns a Date / Time map formatted based on the formatter string"
  @spec get_formatted_date_time_map(
          NaiveDateTime.t() | DateTime.t(),
          NaiveDateTime.t() | DateTime.t() | nil,
          String.t()
        ) :: %{date: String.t(), time: String.t()}
  def get_formatted_date_time_map(start_time, end_time, formatter \\ @default_date_format)

  def get_formatted_date_time_map(start_time, nil, formatter) do
    start_time
    |> maybe_shift_timezone
    |> do_date_time_formatting(nil, formatter)
  end

  def get_formatted_date_time_map(start_time, end_time, formatter) do
    start_time
    |> maybe_shift_timezone
    |> do_date_time_formatting(maybe_shift_timezone(end_time), formatter)
  end

  @spec do_date_time_formatting(
          NaiveDateTime.t() | DateTime.t(),
          NaiveDateTime.t() | DateTime.t() | nil,
          String.t()
        ) :: %{date: String.t(), time: String.t()}

  # If the end_time is the same date as the start_time, represent the time as a range
  defp do_date_time_formatting(
         %{year: year, month: month, day: day} = start_time,
         %{year: year, month: month, day: day} = end_time,
         formatter
       ) do
    %{
      date: "#{pretty_date(start_time, formatter)}",
      time: "#{format_time(start_time)} - #{format_time(end_time)}"
    }
  end

  # If the end_time is nil OR a different day than the start time, then only use the start day / time
  defp do_date_time_formatting(start_time, _end_time, formatter) do
    # How to represent an event across multiple days in the calendar?
    %{
      date: "#{pretty_date(start_time, formatter)}",
      time: "#{format_time(start_time)}"
    }
  end

  @doc "Nicely render an event duration for the Event List, given two DateTimes."
  @spec render_event_duration_list_view(
          NaiveDateTime.t() | DateTime.t(),
          NaiveDateTime.t() | DateTime.t() | nil
        ) :: String.t()
  def render_event_duration_list_view(start_time, nil) do
    calendar = get_formatted_date_time_map(start_time, nil)
    "#{calendar.date} \u2022 #{calendar.time}"
  end

  def render_event_duration_list_view(
        %{year: year, month: month, day: day} = start_time,
        %{year: year, month: month, day: day} = end_time
      ) do
    calendar = get_formatted_date_time_map(start_time, end_time)

    "#{calendar.date} \u2022 #{calendar.time}"
  end

  def render_event_duration_list_view(start_time, end_time) do
    start = get_formatted_date_time_map(start_time, nil)
    ending = get_formatted_date_time_map(end_time, nil)
    "#{start.date} #{start.time} - #{ending.date} #{ending.time}"
  end

  @doc "December 2021"
  @spec render_event_month(number, number) :: String.t()
  def render_event_month(month, year) do
    "#{Timex.month_name(month)} #{year}"
  end

  @spec event_ended(%{
          start: NaiveDateTime.t() | DateTime.t(),
          stop: NaiveDateTime.t() | DateTime.t() | nil
        }) :: boolean
  def event_ended(%{start: %NaiveDateTime{} = start, stop: %NaiveDateTime{} = stop}) do
    event_ended(%{
      start: start,
      stop: convert_using_timezone(stop, "")
    })
  end

  def event_ended(%{start: _start, stop: %DateTime{} = stop}) do
    time_is_greater_or_equal?(now(), stop)
  end

  def event_ended(%{start: start, stop: nil}) do
    Date.compare(now(), start) == :gt
  end

  def render_event_month_slug(month_number, year) do
    render_event_month(month_number, year)
    |> String.downcase()
    |> String.replace(~r/(\s)+/, "-")
  end

  defp week_rows(month, year) do
    {:ok, start_date} = Date.new(year, month, 1)

    first =
      start_date
      |> Timex.beginning_of_month()
      |> Timex.beginning_of_week(:sun)

    last =
      start_date
      |> Timex.end_of_month()
      |> Timex.end_of_week(:sun)
      |> Timex.shift(days: 1)

    Timex.Interval.new(from: first, until: last)
    |> Enum.map(& &1)
    |> Enum.chunk_every(7)
  end
end
