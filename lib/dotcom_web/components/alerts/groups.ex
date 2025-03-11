defmodule DotcomWeb.Components.Alerts.Groups do
  @moduledoc false

  use DotcomWeb, :component

  import Dotcom.Alerts, only: [
    service_impacting_effects: 0,
    sort_by_ongoing: 1,
    sort_by_start_time: 1,
    sort_by_station: 1
  ]
  import DotcomWeb.Components.Alerts, only: [full_alert: 1]

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @order ["High Priority", "Elevator & Escalator", "Bike", "Parking", "Other"]
  @effects %{
    "Bike" => [:bike_issue],
    "Elevator & Escalator" => [:elevator_closure, :escalator_closure],
    "High Priority" => service_impacting_effects(),
    "Parking" => [:parking_issue],
    "Other" => []
  }

  def alerts_by_effect(%{alerts: alerts} = assigns) do
    grouped_alerts = group_alerts(alerts)
    grouped_counts = group_counts(alerts)
    now = @date_time_module.now()
    assigns = assign(assigns, grouped_alerts: grouped_alerts, grouped_counts: grouped_counts, now: now)

    ~H"""
    <div>
      <%= for {group, _} <- groups() do %>
        <div>
          <h3 id={anchor(group)}>{group}</h3>
          <%= if Map.get(@grouped_counts, group, 0) == 0 do %>
            <p>No {group} alerts</p>
          <% else %>
            <%= for alert <- @grouped_alerts |> Map.get(group, []) |> sort_alerts() do %>
              <.full_alert alert={alert} />
            <% end %>
          <% end %>
        </div>
      <% end %>
    </div>
    """
  end

  def titles_by_effect(%{alerts: alerts} = assigns) do
    grouped_counts = group_counts(alerts)
    assigns = assign(assigns, grouped_counts: grouped_counts)

    ~H"""
    <div>
      <ul>
        <%= for {group, _} <- groups() do %>
          <li><a href={"#" <> anchor(group)}>{group}</a> [ {Map.get(@grouped_counts, group, 0)} ]</li>
        <% end %>
      </ul>
    </div>
    """
  end

  defp anchor(group), do: Recase.to_kebab(group)

  # Return a map of groups with no alerts.
  defp empty_alerts() do
    Enum.map(@order, fn group ->
      {group, []}
    end)
    |> Enum.into(%{})
  end

  # Given a list of alerts, return a map of groups and their associated alerts.
  # We merge the empty alerts map with the grouped alerts to ensure all groups are present.
  defp group_alerts(alerts) do
    grouped_alerts =
      Enum.group_by(alerts, fn %{effect: effect} ->
        find_group(effect)
      end)

    Map.merge(empty_alerts(), grouped_alerts)
  end

  # Given a list of alerts, return a map of groups and their associated alert counts.
  # Because this uses `group_alerts/1`, we can be sure that all groups are present.
  defp group_counts(alerts) do
    alerts
    |> group_alerts()
    |> Enum.map(fn {group, alerts} -> {group, Enum.count(alerts)} end)
    |> Enum.into(%{})
  end

  # Get an ordered list of groups and their associated effects.
  defp groups() do
    Enum.map(@order, fn group ->
      {group, @effects[group]}
    end)
  end

  # Given an effect, find the group it belongs to.
  # Checks all effects in the group and returns the first group that contains the effect.
  # If the effects list is empty, we know it belongs in "Other".
  defp find_group(effect) do
    groups()
    |> Enum.find(fn {_group, effects} -> Enum.empty?(effects) || Enum.member?(effects, effect) end)
    |> Kernel.elem(0)
  end

  # Sort alerts by ongoing and then start time.
  defp sort_alerts(alerts) do
    alerts
    |> sort_by_start_time()
    |> sort_by_station()
    |> sort_by_ongoing()
  end
end
