defmodule Dotcom.TripPlan.AntiCorruptionLayer do
  @moduledoc false

  def convert(%{"plan" => params}) do
    %{
      "from" => %{
        "latitude" => Map.get(params, "from_latitude"),
        "longitude" => Map.get(params, "from_longitude"),
        "name" => Map.get(params, "from"),
        "stop_id" => Map.get(params, "from_stop_id", "")
      },
      "modes" => Map.get(params, "modes") |> convert_modes(),
      "to" => %{
        "latitude" => Map.get(params, "to_latitude"),
        "longitude" => Map.get(params, "to_longitude"),
        "name" => Map.get(params, "to"),
        "stop_id" => Map.get(params, "to_stop_id", "")
      },
      "wheelchair" => Map.get(params, "wheelchair") || "false"
    }
  end

  def convert(_), do: convert(%{"plan" => %{}})

  defp convert_modes(modes) when is_map(modes) do
    default_modes = for {k, _} <- Dotcom.TripPlan.InputForm.initial_modes(), into: %{}, do: {k, "false"}

    modes
    |> Enum.reduce(default_modes, fn {key, value}, acc ->
      Map.put(acc, String.upcase(key), value)
    end)
  end

  defp convert_modes(_), do: Dotcom.TripPlan.InputForm.initial_modes()
end
