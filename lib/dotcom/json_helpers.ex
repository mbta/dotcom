defmodule Dotcom.JsonHelpers do
  @moduledoc """
  Helper functions for converting structs to JSON encodable values.
  """

  def alert_active_period({first, last}) do
    [first, last] |> Enum.map(&format_time(&1))
  end

  defp format_time(t) do
    case Timex.format(t, "{YYYY}-{M}-{D} {h24}:{m}") do
      {:ok, formatted_time} -> formatted_time
      _ -> nil
    end
  end

  def update_map_for_encoding(:unknown) do
    :unknown
  end

  def update_map_for_encoding(map) do
    Map.new(map, fn {key, val} -> {Integer.to_string(key), val} end)
  end
end
