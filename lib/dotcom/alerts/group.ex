defmodule Dotcom.Alerts.Group do
  @moduledoc """
  This module defines a behaviour for grouping alerts by their effects.

  Implementations must provide a list of effect groups: a list of tuples where the
  first element is the group name and the second element is a list of effects.
  Each tuple contains an effect name and its severity. The severity is a number
  that indicates the importance of the effect. The higher the number, the more
  important the effect is.
  """

  @callback effect_groups :: [{String.t(), [{atom(), byte()}]}]

  defmacro __using__(_) do
    quote do
      import Dotcom.Alerts,
        only: [
          effects_match?: 2,
          sort_by_start_time_sorter: 2,
          sort_by_station_sorter: 2
        ]

      alias Alerts.Alert

      @behaviour Dotcom.Alerts.Group

      @doc """
      Given an effect and severity of an Alert, find the group it belongs to.
      Checks all effects in the group and returns the first group that contains the effect.
      If the effects list is empty, we know it belongs in "Other".
      """
      @spec find_group(atom()) :: String.t()
      def find_group(alert) do
        __MODULE__.effect_groups()
        |> Enum.find(&group_match?(&1, alert))
        |> Kernel.elem(0)
      end

      @doc """
      Given a list of alerts, return a map of groups and their associated alerts.
      We merge the empty alerts map with the grouped alerts to ensure all groups are present.
      """
      @spec group_alerts([Alert.t()]) :: %{String.t() => [Alert.t()]}
      def group_alerts(alerts) do
        grouped_alerts =
          Enum.group_by(alerts, fn alert ->
            find_group(alert)
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
      Get the order of the groups as a list.
      """
      def group_order() do
        __MODULE__.effect_groups()
        |> Enum.map(&elem(&1, 0))
      end

      @doc """
      Sort alerts by station and then by start time.
      """
      @spec sort_alerts([Alert.t()]) :: [Alert.t()]
      def sort_alerts(alerts) do
        alerts
        |> Enum.sort(&sort_by_station_sorter/2)
        |> Enum.sort(&sort_by_start_time_sorter/2)
      end

      # Does the alert match the group?
      defp group_match?({_, []}, _), do: true

      defp group_match?({_, effects}, alert) do
        effects_match?(effects, alert)
      end

      # Return a map of groups with no alerts.
      defp empty_alerts() do
        Enum.map(group_order(), fn group ->
          {group, []}
        end)
        |> Enum.into(%{})
      end
    end
  end
end
