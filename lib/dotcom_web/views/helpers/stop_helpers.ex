defmodule DotcomWeb.Views.Helpers.StopHelpers do
  @moduledoc false
  @spec special_disabled_stops(:origin | :destination) :: [{String.t(), String.t()}]
  def special_disabled_stops(:origin), do: []

  def special_disabled_stops(:destination), do: []

  @spec departure_stop(:origin | :destination, Stops.Stop.t()) :: [{String.t(), String.t()}]
  def departure_stop(:origin, _stop), do: []
  def departure_stop(:destination, stop), do: [{stop.id, "departure stop"}]

  @spec excluded_stops(:origin | :destination, Routes.Route.t(), [Stops.Stop.t()], 0 | 1) :: [
          {String.t(), String.t()}
        ]
  def excluded_stops(:origin, route, excluded_stops, direction_id) do
    Enum.map(
      excluded_stops,
      &{&1, "last #{route |> Routes.Route.direction_name(direction_id) |> String.downcase()} stop"}
    )
  end

  def excluded_stops(:destination, _route, excluded_stops, _direction_id) do
    Enum.map(excluded_stops, &{&1, "not on branch"})
  end

  @spec closed_stops([Stops.Stop.id_t()]) :: [{String.t(), String.t()}]
  def closed_stops(stops) do
    stops
    |> Enum.filter(& &1.closed_stop_info)
    |> Enum.map(&{&1.id, &1.closed_stop_info.reason})
  end

  @doc """
  Walk through the list of disabled reasons and select the first matching reason for
  the stop being processed. Returns nil if no disabled reason is found.
  """
  @spec capitalized_disabled_text([{Stops.Stop.id_t(), String.t()}], Stops.Stop.t()) ::
          String.t() | nil
  def capitalized_disabled_text(disabled_values, stop) do
    disabled_values
    |> Enum.find_value(fn {id, text} -> if stop.id == id, do: text end)
    |> capitalize()
  end

  @spec capitalize(String.t() | nil) :: String.t() | nil
  defp capitalize(nil), do: nil
  defp capitalize(value), do: String.capitalize(value)
end
