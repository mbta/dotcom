defmodule DotcomWeb.Live.SubwayAlerts do
  @moduledoc """
  The subway alerts/status page, showing current subway status, planned work, and
  other upcoming and relevant alerts.
  """

  use DotcomWeb, :live_view

  import Dotcom.Alerts, only: [service_impacting_alert?: 1]
  import DotcomWeb.Components.PlannedDisruptions, only: [disruptions: 1]
  import DotcomWeb.Components.SystemStatus.SubwayStatus, only: [alerts_subway_status: 1]
  import DotcomWeb.Components.TAlerts, only: [t_alerts: 1]

  alias Alerts.InformedEntity
  alias Alerts.Match
  alias Dotcom.Alerts.Subway.Disruptions

  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  @date_time Application.compile_env!(:dotcom, :date_time_module)

  embed_templates "layouts/*"

  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(
       :meta_description,
       "Live service alerts for all MBTA transportation modes, including subway, bus, Commuter Rail, and ferry. " <>
         "Updates on delays, construction, elevator outages, and more."
     )
     |> assign(:breadcrumbs, [Breadcrumb.build("Alerts")])
     |> assign_now()
     |> assign_route_type()
     |> assign_routes()
     |> assign(:subway_status, Dotcom.SystemStatus.subway_status())
     |> assign(:disruption_groups, Disruptions.future_disruptions())
     |> assign_alerts()
     |> assign_banner_alert()
     |> assign_alert_groups()}
  end

  def handle_params(%{"alerts_timeframe" => _} = params, _uri, socket) do
    new_path = socket |> live_path(__MODULE__, params |> Map.drop(["alerts_timeframe"]))
    {:noreply, socket |> push_patch(to: new_path)}
  end

  def handle_params(_params, _uri, socket) do
    {:noreply, socket}
  end

  defp assign_alert_groups(%{assigns: %{alerts: alerts, routes: routes}} = socket) do
    non_banner_alerts = excluding_banner(socket, alerts)

    socket
    |> assign(
      :alert_groups,
      routes
      |> attach_alert_lists(non_banner_alerts)
      |> drop_empty_groups()
    )
  end

  defp assign_alerts(%{assigns: %{date_time: date_time}} = socket) do
    alerts = @alerts_repo.all(date_time) |> Enum.reject(&service_impacting_alert?/1)

    socket |> assign(:alerts, alerts)
  end

  defp assign_banner_alert(socket) do
    foo = @alerts_repo.banner()

    case foo do
      nil -> socket
      banner -> socket |> assign(:alert_banner, banner)
    end
  end

  defp assign_now(socket), do: socket |> assign(:date_time, @date_time.now())

  defp assign_route_type(socket), do: socket |> assign(:route_type, [0, 1])

  defp assign_routes(socket), do: socket |> assign(:routes, @routes_repo.by_type([0, 1]))

  defp attach_alert_lists(routes, alerts) do
    routes
    |> Enum.map(fn route ->
      entity = %InformedEntity{
        route_type: route.type,
        route: route.id
      }

      {route, Match.match(alerts, entity)}
    end)
  end

  defp drop_empty_groups(alert_list_tuples),
    do: alert_list_tuples |> Enum.reject(fn {_group_name, group} -> Enum.empty?(group) end)

  defp excluding_banner(%{assigns: %{alert_banner: alert_banner}}, alerts) do
    Enum.reject(alerts, &(&1.id == alert_banner.id))
  end

  defp excluding_banner(_, alerts), do: alerts

  def render(assigns) do
    ~H"""
    <.alerts_layout mode={:subway}>
      <:sidebar_bottom>
        <.t_alerts />
      </:sidebar_bottom>
      <:main_section>
        <section class="mb-lg">
          <.alerts_subway_status subway_status={@subway_status} />
        </section>
        <section id="planned" class="mb-lg">
          <.disruptions disruptions={@disruption_groups} />
        </section>
        <section id="station_and_service">
          <.alerts_page_content_layout
            {assigns}
            empty_message="There are no other subway alerts at this time."
          >
            <:heading>
              <h2 class="mt-0">Station & Service Alerts</h2>
            </:heading>
            <:alert_header_icon :let={route_or_stop}>
              <.subway_route_pill route_ids={[route_or_stop.id]} />
            </:alert_header_icon>
          </.alerts_page_content_layout>
        </section>
      </:main_section>
    </.alerts_layout>
    """
  end
end
