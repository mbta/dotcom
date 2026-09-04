defmodule DotcomWeb.Components.ScheduleHeaderComponents do
  @moduledoc """
  Components for the shared header for the schedule pages (line, timetable, and route-level alerts pages).
  """

  use DotcomWeb, :component

  import DotcomWeb.ScheduleView, only: [route_header_text: 1]

  def route_header(assigns) do
    ~H"""
    <h1 class="schedule__route-name notranslate">{route_header_text(@route)}</h1>
    """
  end
end
