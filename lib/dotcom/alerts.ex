defmodule Dotcom.Alerts do
  @moduledoc """
  A collection of functions that help to work with alerts in a unified way.
  """

  alias Alerts.Alert
  alias Stops.Stop

  @stops_repo_module Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @typedoc "Alert effects associated with disruptions: service alerts which
   typically impact rider experience."
  @type service_effect_t() :: :delay | :shuttle | :suspension | :station_closure

  @service_impacting_effects [:delay, :shuttle, :suspension, :station_closure]

  @doc """
  Get a list of stations that are affected by the alert.
  """
  @spec affected_stations(Alert.t()) :: [Stop.t()]
  def affected_stations(alert) do
    alert
    |> Map.get(:informed_entity, %{stop: nil})
    |> Map.get(:stop, [])
    |> Enum.reject(&is_nil/1)
    |> Enum.map(&@stops_repo_module.get(&1))
    |> Enum.reject(&is_nil/1)
    |> Enum.filter(& &1.station?)
    |> Enum.sort_by(& &1.name)
  end

  @doc """
  Does the alert have an effect that is considered service-impacting?
  """
  @spec service_impacting_alert?(Alert.t()) :: boolean()
  def service_impacting_alert?(%Alert{effect: effect}) do
    effect in @service_impacting_effects
  end

  @doc """
  Returns a list of the alert effects that are considered service-impacting.
  """
  @spec service_impacting_effects() :: [atom()]
  def service_impacting_effects(), do: @service_impacting_effects

  @doc """
  Sort alerts by the start time of the first active period.
  """
  @spec sort_by_start_time_sorter(Alert.t(), Alert.t()) :: boolean()
  def sort_by_start_time_sorter(a, b) do
    a_start_time = sort_by_start_time_mapper(a)
    b_start_time = sort_by_start_time_mapper(b)

    Timex.compare(a_start_time, b_start_time) < 1
  end

  @doc """
  Sort alerts by the list of stations they affect.
  """
  @spec sort_by_station_sorter(Alert.t(), Alert.t()) :: boolean()
  def sort_by_station_sorter(a, b) do
    a_station = sort_by_station_mapper(a)
    b_station = sort_by_station_mapper(b)

    a_station <= b_station
  end

  # Take an alert and return the start time of the first active period.
  # Return nil if there is no active period.
  defp sort_by_start_time_mapper(alert) do
    alert
    |> Map.get(:active_period, [{nil, nil}])
    |> List.first()
    |> Kernel.elem(0)
  end

  # Take an alert and return a unique key for the stations it affects.
  defp sort_by_station_mapper(alert) do
    alert
    |> affected_stations()
    |> stations_key()
  end

  # Take a list of stations and return a unique key.
  # If there is only one station, return the station name in upper snake case; e.g. "PARK_ST".
  # If there are multiple stations, return "ZZZ" because we want to sort these alerts last.
  defp stations_key([station]) do
    station
    |> Map.get(:name, "ZZZ")
    |> Recase.to_snake()
    |> String.upcase()
  end

  defp stations_key(_), do: "ZZZ"
end
