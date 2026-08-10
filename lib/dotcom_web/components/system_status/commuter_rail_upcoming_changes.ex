defmodule DotcomWeb.Components.SystemStatus.CommuterRailUpcomingChanges do
  @moduledoc """
  Component displaying upcoming changes of a specific commuter rail line.
  """

  use DotcomWeb, :component

  import Dotcom.Alerts.StartTime, only: [next_active_time: 1, active_in_next_n_days?: 2]
  import DotcomWeb.Components.Alerts, only: [embedded_alert: 1]
  import DotcomWeb.Components.PlannedDisruptions, only: [format_date_range_for_alert: 1]

  import DotcomWeb.Components.SystemStatus.CommuterRailInfoWidget,
    only: [commuter_rail_info_widget: 1, row: 1]

  import DotcomWeb.Components.SystemStatus.StatusRowHeading, only: [status_row_heading: 1]

  attr :class, :string, default: ""
  attr :route_id, :string, required: true
  attr :alerts, :list, required: true

  def commuter_rail_upcoming_changes(%{alerts: upcoming_alerts} = assigns) do
    grouped_alerts =
      upcoming_alerts
      |> Enum.sort(&alert_period_sorter/2)
      |> Enum.group_by(&if active_in_next_n_days?(&1, 7), do: :soon, else: :later)
      |> Enum.into(%{soon: [], later: []})

    assigns =
      assigns
      |> assign(%{
        soon: grouped_alerts.soon,
        later: grouped_alerts.later
      })

    ~H"""
    <.commuter_rail_info_widget class={@class} heading_text={~t"Upcoming Changes"}>
      <.rows_for_upcoming alerts={@soon} />
      <:postscript>
        <.later_changes_link later_count={Enum.count(@later)} route_id={@route_id} />
      </:postscript>
    </.commuter_rail_info_widget>
    """
  end

  attr :later_count, :integer, default: 0
  attr :route_id, :string, required: true

  defp later_changes_link(%{later_count: 0} = assigns), do: ~H""

  defp later_changes_link(assigns) do
    ~H"""
    <div class="pt-md">
      <.link
        data-test="later_changes_link"
        patch={~p"/schedules/#{@route_id}/alerts"}
      >
        {gettext("%{count} later %{change_text}",
          count: @later_count,
          change_text: Inflex.inflect("change", @later_count)
        )
        |> Phoenix.HTML.raw()}
        <.icon name="chevron-right" class="h-3 w-3 fill-brand-primary shrink-0" />
      </.link>
    </div>
    """
  end

  defp rows_for_upcoming(%{alerts: []} = assigns) do
    ~H"""
    <.row>
      {~t"No changes posted for the next 7 days"}
    </.row>
    """
  end

  defp rows_for_upcoming(assigns) do
    ~H"""
    <.unstyled_accordion
      :for={alert <- @alerts}
      summary_class="flex items-center hover:bg-brand-primary-lightest cursor-pointer group/row"
      chevron_class="border-t-[1px] border-gray-lightest fill-gray-dark px-2 py-3 self-stretch flex items-center"
    >
      <:heading>
        <.status_row_heading
          future
          alerts={[alert]}
          prefix={format_date_range_for_alert(alert)}
          route_ids={[]}
          status={alert.effect}
          remove_pill_col={true}
          hide_route_pill={true}
        />
      </:heading>
      <:content>
        <.embedded_alert alert={alert} />
      </:content>
    </.unstyled_accordion>
    """
  end

  defp alert_period_sorter(a, b) do
    {a_start, a_end} = alert_period_mapper(a)
    {b_start, b_end} = alert_period_mapper(b)

    start_comparison = Date.compare(a_start, b_start)

    case start_comparison do
      :eq -> Util.safe_time_compare(a_end, b_end)
      _ -> start_comparison
    end != :gt
  end

  defp alert_period_mapper(alert) do
    {current, start_time} = next_active_time(alert)

    {period_start, period_end} =
      alert.active_period
      |> Enum.find(fn {start, _} -> DateTime.compare(start, start_time) == :eq end)

    {
      if(current == :current, do: Util.now(), else: period_start),
      period_end
    }
  end
end
