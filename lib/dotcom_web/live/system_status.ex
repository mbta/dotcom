defmodule DotcomWeb.Live.SystemStatus do
  @moduledoc """
  A temporary LiveView for showing off the system status widget until we
  put it into the homepage (and elsewhere).
  """

  use DotcomWeb, :live_view

  import DotcomWeb.Components.RoutePills
  import DotcomWeb.Components.SystemStatus.StatusLabel
  import DotcomWeb.Components.SystemStatus.Widget

  alias Dotcom.SystemStatus

  def render(assigns) do
    alerts = SystemStatus.subway_alerts_for_today()

    statuses = SystemStatus.subway_status()

    assigns =
      assigns
      |> assign(:alerts, alerts)
      |> assign(:statuses, statuses)

    Widget

    ~H"""
    <h1>System Status</h1>
    <.system_status_widget routes_with_statuses={@statuses} />

    <h1>Examples</h1>
    <.system_status_widget routes_with_statuses={fake_statuses_1()} />

    <h1>Alerts</h1>
    <div class="flex flex-col gap-2">
      <.alert :for={alert <- @alerts} alert={alert} />
    </div>

    <h1>Misc Components</h1>
    <h2>Status Labels</h2>
    <div class="flex flex-col gap-2">
      <.status_label status={:normal} />
      <.status_label status={:shuttle} />
      <.status_label status={:shuttle} plural />
      <.status_label status={:shuttle} prefix="8:30pm" />
      <.status_label status={:shuttle} prefix="Wed, Feb 12 - Fri, Feb 14" />
      <.status_label status={:station_closure} />
      <.status_label status={:delay} />
    </div>

    <h2>Route Pills</h2>
    <div class="flex flex-col gap-2">
      <.route_pill route_id="Blue" />
      <.route_pill route_id="Green" />
      <.route_pill route_id="Orange" />
      <.route_pill route_id="Red" />
      <.route_pill_with_modifiers route_id="Green" modifier_ids={["Green-B", "Green-C"]} />
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

  defp fake_statuses_1() do
    %{
      "Blue" => [
        %{
          branch_ids: [],
          status_entries: [%{time: :current, status: :normal, multiple: false}]
        }
      ],
      "Orange" => [
        %{
          branch_ids: [],
          status_entries: [
            %{time: :current, status: :delay, multiple: false},
            %{
              time: {:future, Timex.now() |> Timex.set(hour: 20, minute: 30)},
              status: :shuttle,
              multiple: false
            }
          ]
        }
      ],
      "Red" => [
        %{
          branch_ids: [],
          status_entries: [%{time: :current, status: :normal, multiple: false}]
        },
        %{
          branch_ids: ["Mattapan"],
          status_entries: [%{time: :current, status: :suspension, multiple: false}]
        }
      ],
      "Green" => [
        %{
          branch_ids: ["Green-D", "Green-E"],
          status_entries: [
            %{
              time: {:future, Timex.now() |> Timex.set(hour: 18, minute: 0)},
              status: :station_closure,
              multiple: true
            }
          ]
        },
        %{
          branch_ids: ["Green-B", "Green-C"],
          status_entries: [%{time: :current, status: :normal, multiple: false}]
        }
      ]
    }
  end
end
