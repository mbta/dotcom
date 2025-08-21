defmodule DotcomWeb.Views.Helpers.AlertHelpers do
  import DotcomWeb.Router.Helpers, only: [line_path: 3]
  alias DotcomWeb.PartialView.HeaderTabBadge

  def alert_line_show_path(_conn, "Elevator"), do: "/accessibility"
  def alert_line_show_path(_conn, "Escalator"), do: "/accessibility"
  def alert_line_show_path(_conn, "Other"), do: "/accessibility"
  def alert_line_show_path(conn, route_id), do: line_path(conn, :show, route_id)

  def alert_badge(0), do: nil

  def alert_badge(count) do
    %HeaderTabBadge{
      content: Integer.to_string(count),
      class: "m-alert-badge",
      aria_label: alert_badge_aria_label(count)
    }
  end

  defp alert_badge_aria_label(1), do: "1 alert"
  defp alert_badge_aria_label(count), do: "#{count} alerts"
end
