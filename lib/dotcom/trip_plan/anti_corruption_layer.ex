defmodule Dotcom.TripPlan.AntiCorruptionLayer do
  @moduledoc """
  This anti-corruption layer is responsible for converting the data from the old trip planner query params to the new trip planner form values.

  Currently, not all modes are sent. So, we default to setting them to 'false' if they aren't set.
  Likewise with wheelchair, we default to 'false' if it isn't set because the old trip planner worked by just not setting it rather than setting it to 'false'.

  We ignore datetime_type and datetime and allow those to be set to 'now' and the current time respectively.
  """

  @doc """
  Given the params from the old trip planner, convert them to the new trip planner form values.

  If no plan is given, then we default to empty form values.
  """
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
    default_modes =
      for {k, _} <- Dotcom.TripPlan.InputForm.initial_modes(), into: %{}, do: {k, "false"}

    modes
    |> Enum.reduce(default_modes, fn {key, value}, acc ->
      Map.put(acc, String.upcase(key), value)
    end)
  end

  defp convert_modes(_), do: Dotcom.TripPlan.InputForm.initial_modes()
end
