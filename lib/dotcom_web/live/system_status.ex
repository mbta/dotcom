defmodule DotcomWeb.Live.SystemStatus do
  @moduledoc """
  A temporary LiveView for showing off the system status widget until we
  put it into the homepage (and elsewhere).
  """

  use DotcomWeb, :live_view

  alias Dotcom.SystemStatus

  def render(assigns) do
    alerts = SystemStatus.subway_alerts_for_today()

    statuses = SystemStatus.subway_status()

    assigns =
      assigns
      |> assign(:alerts, alerts)
      |> assign(:statuses, statuses)

    ~H"""
    <h1>System Status</h1>
    <div>
      <.status :for={status <- @statuses} status={status} />
    </div>
    <h1>Alerts</h1>
    <div class="flex flex-col gap-2">
      <.alert :for={alert <- @alerts} alert={alert} />
    </div>
    """
  end

  defp status(assigns) do
    ~H"""
    <pre>{inspect @status, pretty: true}</pre>
    """
  end

  defp alert(assigns) do
    ~H"""
    <details class="border border-gray-lighter p-2">
      <summary>
        <span class="font-bold">{@alert.severity} {@alert.effect}:</span> {@alert.header}
      </summary>
      <details>
        <summary>Raw alert</summary>
        <pre>{inspect(@alert, pretty: true)}</pre>
      </details>
    </details>
    """
  end
end
