defmodule DotcomWeb.Live.CommuterRailAlerts do
  @moduledoc """
  The commuter rail alerts/status page, showing current subway status, planned work, and
  other upcoming and relevant alerts.
  """

  use DotcomWeb, :live_view

  import DotcomWeb.Components.SystemStatus.CommuterRailStatus,
    only: [alerts_commuter_rail_status: 1]

  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]

  @date_time Application.compile_env!(:dotcom, :date_time_module)

  embed_templates "layouts/*"

  @meta_description ~t"Live service alerts for all MBTA transportation modes, including subway, bus, Commuter Rail, and ferry. Updates on delays, construction, elevator outages, and more."

  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(
       :meta_description,
       @meta_description
     )
     |> assign(:breadcrumbs, [Breadcrumb.build(~t"Alerts")])
     |> assign_result(&@date_time.now/0)
     |> assign_banner_alert()
     |> assign_result(&Dotcom.Alerts.commuter_rail_alert_groups/0)
     |> assign_result(&Dotcom.SystemStatus.CommuterRail.commuter_rail_status/0)}
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
    assigns = assigns |> assign(:id, :commuter_rail)

    ~H"""
    <.alerts_layout mode={@id}>
      <:sidebar_bottom>
        {DotcomWeb.AlertView.render("_t-alerts.html")}
      </:sidebar_bottom>
      <:main_section>
        <section id="current_status">
          <.alerts_commuter_rail_status commuter_rail_status={@commuter_rail_status} />
        </section>
        <section id="station_and_service">
          <.alerts_page_content_layout
            {assigns |> Map.take([:alert_banner])}
            alert_groups={@commuter_rail_alert_groups}
            date_time={@now}
            empty_message={~t"There are no other commuter rail alerts at this time."}
          >
            <:heading>
              <h2 class="mt-8">Station & Service Alerts</h2>
            </:heading>
            <:alert_header_icon>
              <MbtaMetro.Components.SystemIcons.mode_icon mode="commuter-rail" />
            </:alert_header_icon>
          </.alerts_page_content_layout>
        </section>
      </:main_section>
    </.alerts_layout>
    """
  end
end
