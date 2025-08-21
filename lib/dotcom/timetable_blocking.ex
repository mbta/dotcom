defmodule Dotcom.TimetableBlocking do
  @moduledoc """
  Support for blocking the timetable in the presence of special alert text.
  """
  alias Alerts.Alert
  alias Routes.Route

  def pdf_available_text, do: "View PDF Timetable on the MBTA website."
  def no_pdf_text, do: "Schedule will be available soon on the MBTA website."

  @doc """
  Strips the timetable blocking text from an alert header (if present)
  """
  def strip(header) when is_binary(header) do
    String.replace_trailing(header, pdf_available_text(), "")
  end

  @doc """
  Returns the alert blocking the timetable for a given route/date, or nil if there is no such alert.
  """
  def blocking_alert(alerts, %Route{} = route, %Date{} = date) when is_list(alerts) do
    # we do the filtering in this order to do the cheap string comparison before
    # the more complicated informed entity/time matching
    alerts
    |> Enum.filter(fn alert ->
      String.ends_with?(alert.header, pdf_available_text()) or
        String.ends_with?(alert.header, no_pdf_text())
    end)
    |> Alerts.Match.match(
      %Alerts.InformedEntity{route: route.id},
      date
    )
    |> List.first()
  end

  @doc "Returns true if the given alert is blocking and has a PDF."
  def pdf?(%Alert{} = alert) do
    String.ends_with?(alert.header, pdf_available_text()) and is_binary(alert.url)
  end
end
