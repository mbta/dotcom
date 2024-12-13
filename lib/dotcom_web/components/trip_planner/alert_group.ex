defmodule DotcomWeb.Components.TripPlanner.AlertGroup do
  @moduledoc """
  A component to display an alert for a route or location
  """

  use DotcomWeb, :component

  attr :alerts, :list, required: true

  def alert_group(assigns) do
    ~H"""
    <%= if @alerts do %>
      <div :for={alert <- @alerts} class="col-start-2 mb-2 mr-4">
        <.alert alert={alert} />
      </div>
    <% end %>
    """
  end

  defp alert(assigns) do
    ~H"""
    <details class="group">
      <summary class="flex items-center gap-1.5 mb-1">
        <.icon name="triangle-exclamation" class="w-3 h-3" />
        <span>
          <span class="text-sm">{Phoenix.Naming.humanize(@alert.effect)}</span>
          <span class="group-open:hidden cursor-pointer btn-link text-xs">Show Details</span>
          <span class="hidden group-open:inline cursor-pointer btn-link text-xs">Hide Details</span>
        </span>
      </summary>
      <div class="bg-white p-2 text-sm">
        {@alert.header}
      </div>
    </details>
    """
  end
end
