defmodule Dotcom.TripPlan.AntiCorruptionLayer do
  @moduledoc """
  This anti-corruption layer is responsible for converting the data from the old trip planner query params to the new trip planner form values.

  Currently, not all modes are sent. So, we default to setting them to 'false' if they aren't set.
  Likewise with wheelchair, we default to 'false' if it isn't set because the old trip planner worked by just not setting it rather than setting it to 'false'.

  We ignore datetime_type and datetime and allow those to be set to 'now' and the current time respectively.
  """

  @default_modes Dotcom.TripPlan.InputForm.initial_modes()
  @default_params %{
    "datetime_type" => "now",
    "modes" => @default_modes,
    "wheelchair" => "false"
  }

  @doc """
  Given the params from the old trip planner, convert them to the new trip planner form values.

  If no plan is given, then we default to empty form values.
  """
  def convert_old_params(%{"plan" => params}) do
    Map.merge(
      @default_params,
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
    )
  end

  def convert_old_params(_), do: convert_old_params(%{"plan" => %{}})

  # Decode a string into form values.
  # Add in defaults if they were omitted.
  def decode(string) do
    with {:ok, binary} <- Base.url_decode64(string),
         {:ok, params} <- :msgpack.unpack(binary) do
      params
      |> decode_datetime()
      |> add_defaults()
    else
      _ -> @default_params
    end
  end

  def default_params, do: @default_params

  # Encode form values into a single string.
  # Strip out defaults so we don't waste space encoding them.
  def encode(params) do
    params
    |> strip_defaults()
    |> encode_datetime()
    |> :msgpack.pack()
    |> Base.url_encode64()
  end

  # Make sure that the params have all of the defaults set.
  defp add_defaults(params) do
    Map.merge(@default_params, params)
  end

  # All other modes but commuter rail are just the mode in uppercase.
  defp convert_mode("commuter_rail"), do: "RAIL"
  defp convert_mode(mode), do: String.upcase(mode)

  # When modes are given, we set all non-given modes to false.
  defp convert_modes(modes) when is_map(modes) do
    default_modes = for {k, _} <- @default_modes, into: %{}, do: {k, "false"}

    Enum.reduce(modes, default_modes, fn {key, value}, acc ->
      Map.put(acc, convert_mode(key), value)
    end)
  end

  # When no modes are given, we use the initial modes--all modes are true.
  defp convert_modes(_), do: @default_modes

  defp decode_datetime(%{"datetime" => datetime} = params) do
    case DateTime.from_iso8601(datetime) do
      {:ok, datetime, _} -> Map.put(params, "datetime", datetime)
      _ -> params
    end
  end

  defp decode_datetime(params), do: params

  # Encode the datetime into an ISO8601 string.
  defp encode_datetime(params) do
    case params |> Map.get("datetime") do
      %DateTime{} = datetime -> Map.put(params, "datetime", DateTime.to_iso8601(datetime))
      _ -> params
    end
  end

  # If the params have a key set and it's just the default value, then remove it.
  defp strip_default(params, key) do
    if Map.has_key?(params, key) && Map.get(params, key) == Map.get(@default_params, key) do
      Map.delete(params, key)
    else
      params
    end
  end

  # Strip default params so we don't waste space encoding them.
  defp strip_defaults(params) do
    Enum.reduce(@default_params, params, fn {key, _}, acc -> strip_default(acc, key) end)
  end
end
