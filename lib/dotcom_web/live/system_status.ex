defmodule DotcomWeb.Live.SystemStatus do
  @moduledoc """
  A temporary LiveView for showing off the system status widget until we
  put it into the homepage (and elsewhere).
  """

  alias Dotcom.SystemStatus
  use DotcomWeb, :live_view

  def render(assigns) do
    assigns =
      assigns
      |> assign(:alerts, SystemStatus.subway_alerts_for_today())

    ~H"""
    <div class="flex flex-col gap-2">
      <.alert :for={alert <- @alerts} alert={alert} />
    </div>
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
