defmodule DotcomWeb.Components.Alerts.Grouped do
  @moduledoc false

  use DotcomWeb, :component

  import DotcomWeb.Components, only: [count: 1]

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  def alerts_by_effect(%{alerts: alerts, mode: mode} = assigns) do
    module = mode_to_module(mode)

    grouped_alerts = module.group_alerts(alerts)
    grouped_counts = module.group_counts(alerts)
    now = @date_time_module.now()

    assigns =
      assign(assigns, grouped_alerts: grouped_alerts, grouped_counts: grouped_counts, now: now)

    ~H"""
    <div>
      <div :for={group <- apply(module, :group_order, [])}>
        <h3 id={anchor(group)}>{group}</h3>
        <%= if Map.get(@grouped_counts, group, 0) == 0 do %>
          <p>No {String.downcase(group)} alerts</p>
        <% else %>
          {Phoenix.View.render(DotcomWeb.AlertView, "group.html",
            alerts: @grouped_alerts |> Map.get(group, []) |> module.sort_alerts(),
            date_time: @now
          )}
        <% end %>
      </div>
    </div>
    """
  end

  def titles_by_effect(%{alerts: alerts, mode: mode} = assigns) do
    module = mode_to_module(mode)

    grouped_counts = module.group_counts(alerts)

    assigns = assign(assigns, grouped_counts: grouped_counts)

    ~H"""
    <div class="m-alerts__time-filters">
      <a
        :for={group <- module.group_order()}
        href={"#" <> anchor(group)}
        class="m-alerts__time-filter"
      >
        {group}<span class="float-right"><.count count={Map.get(@grouped_counts, group, 0)} /></span>
      </a>
    </div>
    """
  end

  defp anchor(group), do: Recase.to_kebab(group)

  defp mode_to_module(mode) do
    "Elixir.Dotcom.Alerts.#{Recase.to_pascal(mode)}" |> String.to_atom()
  end
end
