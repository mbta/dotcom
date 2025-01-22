defmodule Dotcom.TripPlan.AntiCorruptionLayer do
  @moduledoc """
  This anti-corruption layer is responsible for converting the data from the old trip planner query params to the new trip planner form values.

  Currently, not all modes are sent. So, we default to setting them to 'false' if they aren't set.
  Likewise with wheelchair, we default to 'false' if it isn't set because the old trip planner worked by just not setting it rather than setting it to 'false'.

  We ignore datetime_type and datetime and allow those to be set to 'now' and the current time respectively.
  """

  alias Dotcom.TripPlan.InputForm

  @location_service Application.compile_env!(:dotcom, :location_service)

  @doc """
  Given a query for the old trip planner /to or /from actions, replicate the old
  behavior by searching for a location and using the first result. Convert this
  to the new trip planner form values.
  """
  def convert_old_action(action) do
    with [key] when key in [:from, :to] <- Map.keys(action),
         query when is_binary(query) <- Map.get(action, key),
         {:ok, [%LocationService.Address{} = geocoded | _]} <- @location_service.geocode(query) do
      %{
        "plan" => %{
          "#{key}_latitude" => geocoded.latitude,
          "#{key}_longitude" => geocoded.longitude,
          "#{key}" => geocoded.formatted
        }
      }
    else
      _ ->
        %{"plan" => %{}}
    end
  end

  @doc """
  Given the params from the old trip planner, convert them to the new trip planner form values.

  If no plan is given, then we default to empty form values.
  """
  def convert_old_params(%{"plan" => params}) do
    %{
      "from" => %{
        "latitude" => Map.get(params, "from_latitude"),
        "longitude" => Map.get(params, "from_longitude"),
        "name" => Map.get(params, "from"),
        "stop_id" => Map.get(params, "from_stop_id", "")
      },
      "modes" => params |> Map.get("modes") |> convert_modes(),
      "to" => %{
        "latitude" => Map.get(params, "to_latitude"),
        "longitude" => Map.get(params, "to_longitude"),
        "name" => Map.get(params, "to"),
        "stop_id" => Map.get(params, "to_stop_id", "")
      },
      "wheelchair" => Map.get(params, "wheelchair") || "false"
    }
  end

  def convert_old_params(_), do: convert_old_params(%{"plan" => %{}})

  defp convert_modes(modes) when is_map(modes) do
    default_modes =
      for {k, _} <- InputForm.initial_modes(), into: %{}, do: {k, "false"}

    Enum.reduce(modes, default_modes, fn {key, value}, acc ->
      Map.put(acc, convert_mode(key), value)
    end)
  end

  defp convert_modes(_), do: InputForm.initial_modes()

  defp convert_mode("commuter_rail"), do: "RAIL"
  defp convert_mode(mode), do: String.upcase(mode)
end
