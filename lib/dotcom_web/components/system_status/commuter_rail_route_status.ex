defmodule DotcomWeb.Components.SystemStatus.CommuterRailRouteStatus do
  @moduledoc """
  Component displaying the status of a specific commuter rail line.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components, only: [bordered_container: 1, unstyled_accordion: 1]
  import DotcomWeb.Components.Alerts, only: [embedded_alert: 1]
  import DotcomWeb.Components.SystemStatus.StatusLabel, only: [status_label: 1]

  alias Alerts.Alert

  attr :status, :map

  def commuter_rail_route_status(%{status: nil} = assigns), do: ~H""

  def commuter_rail_route_status(assigns) do
    ~H"""
    <.bordered_container hide_divider>
      <:heading>Current Status</:heading>
      <div class="border-b-xs border-gray-lightest mt-4">
        <.rows_for_status status={@status} />
      </div>
    </.bordered_container>
    """
  end

  defp rows_for_status(%{status: :normal} = assigns) do
    ~H"""
    <.row>
      <.status_label status={:normal} description="Normal Service" />
    </.row>
    """
  end

  defp rows_for_status(%{status: :no_scheduled_service} = assigns) do
    ~H"""
    <.row>
      <.status_label status={:no_scheduled_service} description="No Scheduled Service" />
    </.row>
    """
  end

  defp rows_for_status(assigns) do
    ~H"""
    <.service_impact_row :for={impact <- @status.service_impacts} impact={impact} />
    <.train_impact_rows impacts={@status.cancellations} effect={:cancellation} />
    <.train_impact_rows impacts={@status.delays} effect={:delay} />
    """
  end

  defp service_impact_row(assigns) do
    prefix =
      case assigns.impact.start_time do
        :current -> ""
        {:future, time} -> "#{Util.narrow_time(time)}: "
      end

    assigns = assigns |> assign(:prefix, prefix)

    ~H"""
    <.unstyled_accordion
      summary_class="flex items-center border-t-xs border-gray-lightest hover:bg-brand-primary-lightest cursor-pointer group/row py-3 pl-1"
      chevron_class="fill-gray-dark px-2 flex items-center"
    >
      <:heading>
        <div class="grow">
          <.status_label
            description={"#{@prefix}#{Alert.human_effect(@impact.alert)}"}
            status={@impact.alert.effect}
          />
        </div>
      </:heading>
      <:content>
        <.embedded_alert alert={@impact.alert} />
      </:content>
    </.unstyled_accordion>
    """
  end

  defp train_impact_rows(%{impacts: []} = assigns), do: ~H""

  defp train_impact_rows(assigns) do
    human_effect = Alert.human_effect(%Alert{effect: assigns.effect})
    count = Enum.count(assigns.impacts)

    assigns = assigns |> assign(:description, "#{count} #{Inflex.inflect(human_effect, count)}")

    ~H"""
    <.row>
      <.status_label status={@effect} description={@description} />
    </.row>

    <div>
      <.unstyled_accordion
        :for={impact <- @impacts}
        class="first:-mt-2"
        summary_class="flex items-center grow pl-7.5 py-1 hover:bg-brand-primary-lightest"
        chevron_class="fill-gray-dark px-2 flex items-center"
      >
        <:heading>
          <span class="grow"><.trip_info_heading trip_info={impact.trip_info} /></span>
        </:heading>
        <:content><.embedded_alert alert={impact.alert} /></:content>
      </.unstyled_accordion>
    </div>
    """
  end

  slot :inner_block

  defp row(assigns) do
    ~H"""
    <div class="border-t-xs border-gray-lightest py-3 px-1">
      {render_slot(@inner_block)}
    </div>
    """
  end

  defp trip_info_heading(%{trip_info: {:trip, trip_info}} = assigns) do
    description =
      case trip_info.direction_id do
        0 -> "to #{trip_info.last_stop.name}"
        1 -> "from #{trip_info.first_stop.name}"
      end

    assigns =
      assigns
      |> assign(:name, trip_info.name)
      |> assign(:description, description)
      |> assign(:first_departure_time, trip_info.first_departure_time)

    ~H"""
    <span class="text-md md:text-lg">{@name}</span>
    <spac class="text-xs md:text-sm">
      {Timex.format!(@first_departure_time, "{h12}:{m} {AM}")} {@description}
    </spac>
    """
  end

  defp trip_info_heading(%{trip_info: {:direction, %{direction_id: 0}}} = assigns) do
    ~H"""
    <span class="text-md md:text-lg">All Outbound Trains</span>
    """
  end

  defp trip_info_heading(%{trip_info: {:direction, %{direction_id: 1}}} = assigns) do
    ~H"""
    <span class="text-md md:text-lg">All Inbound Trains</span>
    """
  end

  defp trip_info_heading(%{trip_info: :all} = assigns) do
    ~H"""
    <span class="text-md md:text-lg">All Trains</span>
    """
  end
end
