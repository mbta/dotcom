defmodule SiteWeb.EventView do
  @moduledoc "Module to display fields on the events view"
  use SiteWeb, :view

  import Site.FontAwesomeHelpers

  import SiteWeb.CMSView,
    only: [file_description: 1, render_duration: 2, maybe_shift_timezone: 1, format_time: 1]

  alias CMS.Page.Event

  @spec shift_date_range(String.t(), integer) :: String.t()
  def shift_date_range(iso_string, shift_value) do
    iso_string
    |> Timex.parse!("{ISOdate}")
    |> Timex.shift(months: shift_value)
    |> Timex.beginning_of_month()
    |> Util.convert_to_iso_format()
  end

  @spec calendar_title(String.t()) :: String.t()
  def calendar_title(month), do: name_of_month(month)

  @spec name_of_year(String.t()) :: String.t()
  def name_of_year(iso_string) do
    iso_string
    |> Timex.parse!("{ISOdate}")
    |> Timex.format!("{YYYY}")
  end

  @spec name_of_month(String.t()) :: String.t()
  def name_of_month(iso_string) do
    iso_string
    |> Timex.parse!("{ISOdate}")
    |> Timex.format!("{Mfull}")
  end

  @doc "Returns a pretty format for the event's city and state"
  @spec city_and_state(%Event{}) :: String.t() | nil
  def city_and_state(%Event{city: city, state: state}) do
    if city && state do
      "#{city}, #{state}"
    end
  end

  @doc "Nicely renders the duration of an event, given two DateTimes."
  @spec render_event_duration(
          NaiveDateTime.t() | DateTime.t(),
          NaiveDateTime.t() | DateTime.t() | nil
        ) ::
          String.t()
  def render_event_duration(start_time, end_time)

  def render_event_duration(start_time, nil) do
    start_time
    |> maybe_shift_timezone
    |> do_render_event_duration(nil)
  end

  def render_event_duration(start_time, end_time) do
    start_time
    |> maybe_shift_timezone
    |> do_render_event_duration(maybe_shift_timezone(end_time))
  end

  defp do_render_event_duration(start_time, nil) do
    "#{pretty_date(start_time, "{WDshort}, {Mshort} {D}, {YYYY}")} \u2022 #{
      format_time(start_time)
    }"
  end

  defp do_render_event_duration(
         %{year: year, month: month, day: day} = start_time,
         %{year: year, month: month, day: day} = end_time
       ) do
    "#{pretty_date(start_time, "{WDshort}, {Mshort} {D}, {YYYY}")} \u2022 #{
      format_time(start_time)
    } - #{format_time(end_time)}"
  end

  defp do_render_event_duration(start_time, end_time) do
    "#{pretty_date(start_time, "{WDshort}, {Mshort} {D}, {YYYY}")} #{format_time(start_time)} - #{
      pretty_date(end_time, "{WDshort}, {Mshort} {D}, {YYYY}")
    } #{format_time(end_time)}"
  end

  @spec date_upcoming(%{
          start: NaiveDateTime.t() | DateTime.t(),
          stop: NaiveDateTime.t() | DateTime.t()
        }) :: boolean
  def date_upcoming(range) do
    (!!range.stop and Date.compare(range.stop, Timex.now("America/New_York")) == :gt) or
      (!range.stop and Date.compare(range.start, Timex.now("America/New_York")) == :gt)
  end
end
