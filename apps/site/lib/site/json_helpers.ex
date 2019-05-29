defmodule Site.JsonHelpers do
  @moduledoc """
  Helper functions for converting structs to JSON encodable values.
  """

  alias Phoenix.HTML.Safe
  alias Routes.Route
  alias SiteWeb.{ScheduleView, ViewHelpers}

  @spec stringified_route(Route.t()) :: map
  def stringified_route(route) do
    route
    |> Map.update!(:direction_names, fn map ->
      Map.new(map, fn {key, val} ->
        {Integer.to_string(key), val}
      end)
    end)
    |> Map.update!(:direction_destinations, fn map ->
      Map.new(map, fn {key, val} -> {Integer.to_string(key), val} end)
    end)
    |> Map.put(:header, route_header(route))
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
end
