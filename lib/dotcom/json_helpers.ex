defmodule Dotcom.JsonHelpers do
  @moduledoc """
  Helper functions for converting structs to JSON encodable values.
  """

  alias Alerts.Alert
  alias DotcomWeb.AlertView
  alias DotcomWeb.ScheduleView
  alias DotcomWeb.ViewHelpers
  alias Phoenix.HTML
  alias Phoenix.HTML.Safe
  alias Routes.Route

  @spec stringified_route(Route.t()) :: map
  def stringified_route(route) do
    route
    |> Map.update!(:direction_names, fn map ->
      Map.new(map, fn {key, val} ->
        {Integer.to_string(key), val}
      end)
    end)
    |> Map.update!(:direction_destinations, &update_map_for_encoding(&1))
    |> Map.put(:header, route_header(route))
  end

  @spec stringified_alert(Alert.t(), DateTime.t()) :: map
  def stringified_alert(alert, date) do
    alert
    |> Map.from_struct()
    |> Map.update!(
      :active_period,
      &Enum.map(&1, fn active_period -> alert_active_period(active_period) end)
    )
    |> Map.update!(:updated_at, &IO.iodata_to_binary(AlertView.alert_updated(&1, date)))
    |> Map.update!(:header, &HTML.safe_to_string(AlertView.replace_urls_with_links(&1)))
    |> Map.update!(:description, &HTML.safe_to_string(AlertView.format_alert_description(&1)))
  end

  @spec alert_active_period(Alerts.Alert.period_pair()) :: [nil | binary]
  def alert_active_period({first, last}) do
    Enum.map([first, last], &format_time(&1))
  end

  defp format_time(t) do
    case Timex.format(t, "{YYYY}-{M}-{D} {h24}:{m}") do
      {:ok, formatted_time} -> formatted_time
      _ -> nil
    end
  end

  @spec route_header(Route.t()) :: String.t()
  defp route_header(%Route{} = route) do
    route
    |> ScheduleView.route_header_text()
    |> parse_header()
    |> Enum.join()
    |> ViewHelpers.break_text_at_slash()
  end

  @spec parse_header(Safe.t() | [String.t()]) :: [String.t()]
  defp parse_header(header) when is_list(header), do: header

  # Strip the <div class="bus-route-sign"> added by route_header_text
  defp parse_header({:safe, html_content}), do: [Enum.at(html_content, 4)]

  @spec update_map_for_encoding(:unknown | map) :: map
  def update_map_for_encoding(:unknown) do
    :unknown
  end

  def update_map_for_encoding(map) do
    Map.new(map, fn {key, val} -> {Integer.to_string(key), val} end)
  end
end
