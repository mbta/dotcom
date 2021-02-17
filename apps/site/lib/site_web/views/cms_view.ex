defmodule SiteWeb.CMSView do
  @moduledoc """
  Handles rendering of partial content from the CMS.
  """

  @type format_type :: atom()

  use SiteWeb, :view

  import SiteWeb.TimeHelpers
  import SiteWeb.CMS.PageView, only: [render_page: 2]
  import SiteWeb.CMS.ParagraphView, only: [render_paragraph: 2]

  alias CMS.Field.File
  alias CMS.Partial.Paragraph

  defdelegate fa_icon_for_file_type(mime), to: Site.FontAwesomeHelpers

  def file_description(%File{description: desc}) when not is_nil(desc) and desc != "" do
    desc
  end

  def file_description(%File{url: url}) do
    url |> Path.basename() |> URI.decode()
  end

  @doc "Nicely renders the duration of an event, given two DateTimes."
  @spec render_duration(NaiveDateTime.t() | DateTime.t(), NaiveDateTime.t() | DateTime.t() | nil,
          format_type()) :: String.t()
  def render_duration(start_time, end_time, format_type \\ nil)

  def render_duration(start_time, nil, format_type) do
    start_time
    |> maybe_shift_timezone
    |> do_render_duration(nil, format_type)
  end

  def render_duration(start_time, end_time, format_type) do
    start_time
    |> maybe_shift_timezone
    |> do_render_duration(maybe_shift_timezone(end_time), format_type)
  end

  defp maybe_shift_timezone(%NaiveDateTime{} = time) do
    time
  end

  defp maybe_shift_timezone(%DateTime{} = time) do
    Util.to_local_time(time)
  end

  defp do_render_duration(start_time, nil, format_type) do
    joiner = if (format_type == :event), do: "\u2022", else: "at"
    "#{format_date(start_time, format_type)} #{joiner} #{format_time(start_time)}"
  end

  defp do_render_duration(
         %{year: year, month: month, day: day} = start_time,
         %{year: year, month: month, day: day} = end_time,
         format_type
       ) do
    joiner = if (format_type == :event), do: "\u2022", else: "at"
    "#{format_date(start_time, format_type)} #{joiner} #{format_time(start_time)} - #{format_time(end_time)}"
  end

  defp do_render_duration(start_time, end_time, format_type) do
    "#{format_date(start_time, format_type)} #{format_time(start_time)} - #{format_date(end_time, format_type)} #{
      format_time(end_time)
    }"
  end

  defp format_time(%{minute: 0} = time) do
    Timex.format!(time, "{h12} {AM}")
  end

  defp format_time(time) do
    Timex.format!(time, "{h12}:{m} {AM}")
  end
end
