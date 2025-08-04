defmodule DotcomWeb.Live.SubwayAlerts do
  @moduledoc """
  The subway alerts/status page, showing current subway status, planned work, and
  other upcoming and relevant alerts.
  """

  use DotcomWeb, :live_view

  import DotcomWeb.Components.PlannedDisruptions, only: [disruptions: 1]
  import DotcomWeb.Components.SystemStatus.SubwayStatus, only: [alerts_subway_status: 1]

  alias Dotcom.Alerts.Subway.Disruptions
  alias Dotcom.SystemStatus

  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @date_time Application.compile_env!(:dotcom, :date_time_module)

  embed_templates "layouts/*"

  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(
       :meta_description,
       ~t"Live service alerts for all MBTA transportation modes, including subway, bus, Commuter Rail, and ferry. Updates on delays, construction, elevator outages, and more."
     )
     |> assign(:breadcrumbs, [Breadcrumb.build(~t"Alerts")])
     |> assign_result(&@date_time.now/0)
     |> assign_banner_alert()
     |> assign_result(&Dotcom.Alerts.subway_alert_groups/0)
     |> assign_result(&SystemStatus.subway_status/0)
     |> assign_result(&Disruptions.future_disruptions/0)}
  end

  def handle_params(%{"alerts_timeframe" => _} = params, _uri, socket) do
    new_path = socket |> live_path(__MODULE__, params |> Map.drop(["alerts_timeframe"]))
    {:noreply, socket |> push_patch(to: new_path)}
  end

  def handle_params(_params, _uri, socket) do
    {:noreply, socket}
  end

  defp assign_banner_alert(socket) do
    case @alerts_repo.banner() do
      nil -> socket
      banner -> socket |> assign(:alert_banner, banner)
    end
  end

  def render(assigns) do
    ~H"""
    <.alerts_layout mode={:subway}>
      <:sidebar_bottom>
        {DotcomWeb.AlertView.render("_t-alerts.html")}
      </:sidebar_bottom>
      <:main_section>
        <section class="mb-lg">
          <.alerts_subway_status subway_status={@subway_status} />
        </section>
        <section id="planned" class="mb-lg">
          <.disruptions disruptions={@future_disruptions} />
        </section>
        <section id="station_and_service">
          <.alerts_page_content_layout
            {assigns |> Map.take([:alert_banner])}
            alert_groups={@subway_alert_groups}
            date_time={@now}
            empty_message={~t"There are no other subway alerts at this time."}
          >
            <:heading>
              <h2 class="mt-0">{~t"Station & Service Alerts"}</h2>
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
