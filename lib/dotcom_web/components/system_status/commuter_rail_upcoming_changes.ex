defmodule DotcomWeb.Components.SystemStatus.CommuterRailUpcomingChanges do
  @moduledoc """
  Component displaying upcoming changes of a specific commuter rail line.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.Alerts, only: [embedded_alert: 1]
  import DotcomWeb.Components.PlannedDisruptions, only: [format_date_range_for_alert: 1]

  import DotcomWeb.Components.SystemStatus.CommuterRailInfoWidget,
    only: [commuter_rail_info_widget: 1, row: 1]

  import DotcomWeb.Components.SystemStatus.StatusRowHeading, only: [status_row_heading: 1]

  def commuter_rail_upcoming_changes(%{status: nil} = assigns) do
    ~H"""
    <.commuter_rail_info_widget heading_text={~t"Upcoming Changes"}>
      {~t"No changes posted for the next 7 days"}
    </.commuter_rail_info_widget>
    """
  end

  def commuter_rail_upcoming_changes(assigns) do
    ~H"""
    <.commuter_rail_info_widget heading_text={~t"Upcoming Changes"}>
      <.rows_for_upcoming alerts={@alerts} />
      <:postscript>
        {render_slot(@inner_block)}
      </:postscript>
    </.commuter_rail_info_widget>
    """
  end

  def later_changes_link(%{later_count: 0} = assigns), do: ~H""

  def later_changes_link(assigns) do
    ~H"""
    <div class="pt-md">
      <.link patch={~p"/schedules/#{@route_id}/alerts"}>
        {@later_count} later {Inflex.inflect("change", @later_count)}
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
end
