defmodule DotcomWeb.SystemStatus.Widget do
  @moduledoc """

  A component that renders the given `@statuses` in a table.

  """

  use DotcomWeb, :component

  @route_ids ["Red", "Orange", "Green", "Blue"]

  def system_status_widget(assigns) do
    assigns = assigns |> assign(:route_ids, @route_ids)

    ~H"""
    <div class="flex flex-col gap-2">
      <.line_status
        :for={route_id <- @route_ids}
        route_id={route_id}
        branches_with_statuses={@routes_with_statuses |> Map.get(route_id)}
      />
    </div>
    """
  end

  defp line_status(assigns) do
    ~H"""
    <div class="border border-gray-lighter p-2">
      <.branch_status
        :for={branch <- @branches_with_statuses}
        route_id={@route_id}
        branch_ids={branch.branch_ids}
        status_entries={branch.status_entries}
      />
    </div>
    """
  end

  defp branch_status(assigns) do
    ~H"""
    <div class="flex gap-2">
      <span class="font-bold">
        {@route_id}<span :for={branch_id <- @branch_ids}>{" "}{branch_id}</span>:
      </span>

      <div class="flex flex-col">
        <div :for={status <- @status_entries}>
          <span :if={show_prefix?(@status_entries)}>{prefix(status)}:</span>
          {description(status)}
        </div>
      </div>
    </div>
    """
  end

  defp description(%{status: :normal}), do: "Normal Service"
  defp description(%{status: :delay}), do: "Delays"
  defp description(%{status: :shuttle}), do: "Shuttle Buses"
  defp description(%{status: :station_closure, multiple: false}), do: "Station Closure"
  defp description(%{status: :station_closure, multiple: true}), do: "Station Closures"
  defp description(%{status: :suspension, multiple: false}), do: "Suspension"
  defp description(%{status: :suspension, multiple: true}), do: "Suspensions"
  defp description(status_entry), do: status_entry.status

  defp show_prefix?(status_entries) do
    status_entries |> Enum.any?(&future?/1)
  end

  defp future?(%{time: {:future, _}}), do: true
  defp future?(_), do: false

  defp prefix(%{time: :current}), do: "Now"
  defp prefix(%{time: {:future, time}}), do: Util.kitchen_downcase_time(time)
end
