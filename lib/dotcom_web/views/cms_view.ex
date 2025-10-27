defmodule DotcomWeb.CMSView do
  @moduledoc """
  Handles rendering of partial content from the CMS.
  """
  use DotcomWeb, :view

  import DotcomWeb.TimeHelpers
  import DotcomWeb.CMS.PageView, only: [render_page: 2]
  import DotcomWeb.CMS.ParagraphView, only: [render_paragraph: 2]

  alias CMS.Field.File
  alias CMS.Partial.Paragraph

  defdelegate fa_icon_for_file_type(mime), to: Dotcom.FontAwesomeHelpers

  def file_description(%File{description: desc}) when not is_nil(desc) and desc != "" do
    desc
  end

  def file_description(%File{url: url}) do
    url |> Path.basename() |> URI.decode()
  end

  @doc "Nicely renders the duration of an event, given two DateTimes."
  @spec render_duration(NaiveDateTime.t() | DateTime.t(), NaiveDateTime.t() | DateTime.t() | nil) ::
          String.t()
  def render_duration(start_time, end_time)

  def render_duration(start_time, nil) do
    start_time
    |> maybe_shift_timezone
    |> do_render_duration(nil)
  end

  def render_duration(start_time, end_time) do
    start_time
    |> maybe_shift_timezone
    |> do_render_duration(maybe_shift_timezone(end_time))
  end

  def maybe_shift_timezone(%NaiveDateTime{} = time) do
    time
  end

  def maybe_shift_timezone(%DateTime{} = time) do
    Util.to_local_time(time)
  end

  defp do_render_duration(start_time, nil) do
    gettext("%{date} at %{time}", date: format_date(start_time), time: format_time(start_time))
  end

  defp do_render_duration(
         %{year: year, month: month, day: day} = start_time,
         %{year: year, month: month, day: day} = end_time
       ) do
    gettext("%{date} at %{start_time} - %{end_time}",
      date: format_date(start_time),
      start_time: format_time(start_time),
      end_time: format_time(end_time)
    )
  end

  defp do_render_duration(start_time, end_time) do
    gettext(
      "%{sdate} %{stime} - %{edate} %{etime}",
      sdate: format_date(start_time),
      stime: format_time(start_time),
      edate: format_date(end_time),
      etime: format_time(end_time)
    )
  end

  def format_time(%{minute: 0} = time) do
    Timex.format!(time, "{h12} {AM}")
  end

  def format_time(time) do
    Timex.format!(time, "{h12}:{m} {AM}")
  end
end
