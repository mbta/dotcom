defmodule SiteWeb.EventView do
  @moduledoc "Module to display fields on the events view"
  use SiteWeb, :view

  import Site.FontAwesomeHelpers
  import SiteWeb.CMSView, only: [file_description: 1, render_duration: 2, maybe_shift_timezone: 1, format_time: 1]
  import SiteWeb.TimeHelpers, only: [format_month: 1, format_day: 1]

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

  @spec no_results_message(String.t()) :: String.t()
  def no_results_message(month) do
    "There are no events in #{name_of_month(month)}."
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

  @spec month_navigation_header(Plug.Conn.t(), String.t()) :: Phoenix.HTML.Safe.t()
  def month_navigation_header(conn, month) do
    html_escape([
      link(
        to: event_path(conn, :index, month: shift_date_range(month, -1)),
        class: "arrow-icon"
      ) do
        [
          content_tag(:span, "Previous Month", class: "sr-only"),
          fa("chevron-circle-left")
        ]
      end,
      calendar_title(month),
      link(
        to: event_path(conn, :index, month: shift_date_range(month, 1)),
        class: "arrow-icon"
      ) do
        [
          content_tag(:span, "Next Month", class: "sr-only"),
          fa("chevron-circle-right")
        ]
      end
    ])
  end

  @doc "Nicely renders the duration of an event, given two DateTimes."
  @spec render_event_duration(NaiveDateTime.t() | DateTime.t(), NaiveDateTime.t() | DateTime.t() | nil) ::
          String.t()
  def render_event_duration(start_time, end_time)

  # is this needed?
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
    "#{pretty_date(start_time, "{WDshort}, {Mshort} {D}, {YYYY}")} \u2022 #{format_time(start_time)}"
  end

  defp do_render_event_duration(
         %{year: year, month: month, day: day} = start_time,
         %{year: year, month: month, day: day} = end_time
      ) do
    "#{pretty_date(start_time, "{WDshort}, {Mshort} {D}, {YYYY}")} \u2022 #{format_time(start_time)} - #{format_time(end_time)}"
  end

  defp do_render_event_duration(start_time, end_time) do
    "#{pretty_date(start_time, "{WDshort}, {Mshort} {D}, {YYYY}")} #{format_time(start_time)} - #{pretty_date(end_time,  "{WDshort}, {Mshort} {D}, {YYYY}")} #{
      format_time(end_time)
    }"
  end
end
