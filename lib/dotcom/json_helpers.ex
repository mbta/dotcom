defmodule Dotcom.JsonHelpers do
  @moduledoc """
  Helper functions for converting structs to JSON encodable values.
  """

  @spec alert_active_period(Alerts.Alert.period_pair()) :: [nil | binary]
  def alert_active_period({first, last}) do
    [first, last] |> Enum.map(&format_time(&1))
  end

  defp format_time(t) do
  case Dotcom.Utils.Time.format(t, :yyyy_m_d_h24_m) do
      {:ok, formatted_time} -> formatted_time
      _ -> nil
    end
  end

  @spec update_map_for_encoding(:unknown | map) :: map
  def update_map_for_encoding(:unknown) do
    :unknown
  end

  def update_map_for_encoding(map) do
    Map.new(map, fn {key, val} -> {Integer.to_string(key), val} end)
  end
end
