defmodule DotcomWeb.Components.Alerts.Subway do
  @moduledoc false

  use DotcomWeb, :component

  import Dotcom.Alerts.Subway, only: [group_alerts: 1, group_order: 0, sort_alerts: 1]

  import DotcomWeb.Components, only: [count: 1]

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  def alerts_by_effect(%{alerts: alerts} = assigns) do
    grouped_alerts = group_alerts(alerts)
    now = @date_time_module.now()

    assigns = assign(assigns, grouped_alerts: grouped_alerts, now: now)

    ~H"""
    <div>
      <%= for group <- group_order() do %>
        <% alerts_for_group = @grouped_alerts |> Map.get(group, []) |> sort_alerts() %>
        <div>
          <h3 id={anchor(group)}>{group}</h3>
          <%= if Enum.empty?(alerts_for_group) do %>
            <p>No {String.downcase(group)} alerts</p>
          <% else %>
            {Phoenix.View.render(DotcomWeb.AlertView, "group.html",
              alerts: alerts_for_group,
              date_time: @now
            )}
          <% end %>
        </div>
      <% end %>
    </div>
    """
  end

  def titles_by_effect(%{alerts: alerts} = assigns) do
    grouped_alerts = group_alerts(alerts)
    assigns = assign(assigns, grouped_alerts: grouped_alerts)

    ~H"""
    <div class="m-alerts__time-filters">
      <a
        :for={group <- group_order()}
        href={"#" <> anchor(group)}
        class="m-alerts__time-filter leading-[2]"
      >
        {group}<span class="float-right"><.count count={
            @grouped_alerts |> Map.get(group, []) |> Enum.count()
          } /></span>
      </a>
    </div>
    """
  end

  defp anchor(group), do: Recase.to_kebab(group)
end
