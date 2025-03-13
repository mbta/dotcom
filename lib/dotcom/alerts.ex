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
  Is the alert ongoing?
  """
  @spec ongoing?(Alert.t()) :: boolean()
  def ongoing?(%Alert{lifecycle: :ongoing}), do: true

  def ongoing?(_), do: false

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
  Sort alerts by whether or not they are ongoing.
  """
  @spec sort_by_ongoing([Alert.t()]) :: [Alert.t()]
  def sort_by_ongoing(alerts) do
    ongoing = Enum.filter(alerts, &ongoing?/1)
    not_ongoing = Enum.reject(alerts, &ongoing?/1)

    Enum.concat(ongoing, not_ongoing)
  end

  @doc """
  Sort alerts by the start time of the first active period.
  """
  @spec sort_by_start_time([Alert.t()]) :: [Alert.t()]
  def sort_by_start_time(alerts) do
    alerts
    |> Enum.sort_by(
      fn alert ->
        alert |> Map.get(:active_period, [{nil, nil}]) |> List.first() |> Kernel.elem(0)
      end,
      DateTime
    )
  end

  @doc """
  Sort alerts by the list of stations they affect.
  """
  @spec sort_by_station([Alert.t()]) :: [Alert.t()]
  def sort_by_station(alerts) do
    alerts
    |> Enum.sort(fn a_alert, b_alert ->
      a_key = a_alert |> affected_stations() |> stations_key()
      b_key = b_alert |> affected_stations() |> stations_key()

      a_key > b_key
    end)
  end

  # Take a list of stations and return a unique key.
  defp stations_key(stations) do
    stations
    |> Enum.map(& &1.name)
    |> Enum.sort()
    |> Enum.map_join("_", &Recase.to_snake/1)
  end
end
