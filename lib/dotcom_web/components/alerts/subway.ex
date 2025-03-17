defmodule DotcomWeb.Components.Alerts.Subway do
  @moduledoc false

  use DotcomWeb, :component

  import Dotcom.Alerts.Subway, only: [group_alerts: 1, group_counts: 1, groups: 0, sort_alerts: 1]

  import DotcomWeb.Components, only: [count: 1]

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  def alerts_by_effect(%{alerts: alerts} = assigns) do
    grouped_alerts = group_alerts(alerts)
    grouped_counts = group_counts(alerts)
    now = @date_time_module.now()

    assigns =
      assign(assigns, grouped_alerts: grouped_alerts, grouped_counts: grouped_counts, now: now)

    ~H"""
    <div>
      <%= for {group, _} <- groups() do %>
        <div>
          <h3 id={anchor(group)}>{group}</h3>
          <%= if Map.get(@grouped_counts, group, 0) == 0 do %>
            <p>No {String.downcase(group)} alerts</p>
          <% else %>
            {Phoenix.View.render(DotcomWeb.AlertView, "group.html",
              alerts: @grouped_alerts |> Map.get(group, []) |> sort_alerts(),
              date_time: @now
            )}
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
    <div class="m-alerts__time-filters">
      <a
        :for={{group, _} <- groups()}
        href={"#" <> anchor(group)}
        class="m-alerts__time-filter leading-[2]"
      >
        {group}<span class="float-right"><.count count={Map.get(@grouped_counts, group, 0)} /></span>
      </a>
    </div>
    """
  end

  defp anchor(group), do: Recase.to_kebab(group)
end
