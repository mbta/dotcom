defmodule DotcomWeb.Views.Helpers.AlertHelpers do
  @moduledoc false

  use Dotcom.Gettext.Sigils

  import DotcomWeb.Router.Helpers, only: [line_path: 3]

  alias DotcomWeb.PartialView.HeaderTabBadge

  def alert_line_show_path(_conn, "Elevator"), do: "/accessibility"
  def alert_line_show_path(_conn, "Escalator"), do: "/accessibility"
  def alert_line_show_path(_conn, "Other"), do: "/accessibility"
  def alert_line_show_path(conn, route_id), do: line_path(conn, :show, route_id)

  @spec alert_badge(integer) :: nil | HeaderTabBadge
  def alert_badge(0), do: nil

  def alert_badge(count) do
    %HeaderTabBadge{
      content: Integer.to_string(count),
      class: "m-alert-badge",
      aria_label: alert_badge_aria_label(count)
    }
  end

  @spec alert_badge_aria_label(integer) :: String.t()
  defp alert_badge_aria_label(1), do: ~t"1 alert"
  defp alert_badge_aria_label(count), do: gettext("%{count} alerts", count: count)
end
