defmodule Dotcom.Alerts.Subway do
  @moduledoc false

  import Dotcom.Alerts,
    only: [
      service_impacting_effects: 0,
      sort_by_start_time_sorter: 2,
      sort_by_station_sorter: 2
    ]

  alias Alerts.Alert

  @group_order ["Service", "Elevator & Escalator", "Bike", "Parking", "Other"]
  @effects %{
    "Bike" => [:bike_issue],
    "Elevator & Escalator" => [:elevator_closure, :escalator_closure],
    "Other" => [],
    "Parking" => [:parking_issue],
    "Service" => service_impacting_effects() ++ [:service_change],
  }

  @doc """
  Given an effect, find the group it belongs to.
  Checks all effects in the group and returns the first group that contains the effect.
  If the effects list is empty, we know it belongs in "Other".
  """
  @spec find_group(atom()) :: String.t()
  def find_group(effect) do
    groups()
    |> Enum.find(fn {_group, effects} -> Enum.empty?(effects) || Enum.member?(effects, effect) end)
    |> Kernel.elem(0)
  end

  @doc """
  Given a list of alerts, return a map of groups and their associated alerts.
  We merge the empty alerts map with the grouped alerts to ensure all groups are present.
  """
  @spec group_alerts([Alert.t()]) :: %{String.t() => [Alert.t()]}
  def group_alerts(alerts) do
    grouped_alerts =
      Enum.group_by(alerts, fn %{effect: effect} ->
        find_group(effect)
      end)

    Map.merge(empty_alerts(), grouped_alerts)
  end

  @doc """
  Given a list of alerts, return a map of groups and their associated alert counts.
  Because this uses `group_alerts/1`, we can be sure that all groups are present.
  """
  @spec group_counts([Alert.t()]) :: %{String.t() => integer()}
  def group_counts(alerts) do
    alerts
    |> group_alerts()
    |> Enum.map(fn {group, alerts} -> {group, Enum.count(alerts)} end)
    |> Enum.into(%{})
  end

  @doc """
  Returns the order of groups.
  """
  @spec group_order() :: [String.t()]
  def group_order(), do: @group_order

  @doc """
  Get an ordered list of groups and their associated effects.
  """
  @spec groups() :: [{String.t(), [atom()]}]
  def groups() do
    Enum.map(@group_order, fn group ->
      {group, @effects[group]}
    end)
  end

  @doc """
  Sort alerts by station and then by start time.
  """
  @spec sort_alerts([Alert.t()]) :: [Alert.t()]
  def sort_alerts(alerts) do
    alerts
    |> Enum.sort(&sort_by_start_time_sorter/2)
    |> Enum.sort(&sort_by_station_sorter/2)
  end

  # Return a map of groups with no alerts.
  defp empty_alerts() do
    Enum.map(@group_order, fn group ->
      {group, []}
    end)
    |> Enum.into(%{})
  end
end
