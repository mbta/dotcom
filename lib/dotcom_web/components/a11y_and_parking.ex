defmodule DotcomWeb.Components.A11yParking do
  @moduledoc """
  A component for showing (or not) parking and a11y icons
  """

  use DotcomWeb, :component

  attr :stop, :map, required: true

  def a11y_and_parking(assigns) do
    ~H"""
    <div class="flex items-center gap-0.5">
      <%= if length(@stop.parking_lots) > 0 do %>
        <.tooltip title={~t(Parking available)} placement={:top}>
          <.icon
            name="square-parking"
            class="size-4 fill-gray-light"
            aria-hidden="true"
          />
        </.tooltip>
      <% else %>
        <span class="sr-only">{~t(No parking)}</span>
      <% end %>

      <%= if Stops.Stop.accessible?(@stop) do %>
        <.tooltip title={~t(Accessible)} placement={:top}>
          <.icon
            type="icon-svg"
            name="icon-accessible-default"
            class="size-4 fill-brand-primary"
            aria-hidden="true"
          />
        </.tooltip>
      <% else %>
        <%= if Stops.Stop.accessibility_known?(@stop) do %>
          <span class="sr-only">{~t(Not accessible)}</span>
        <% else %>
          <span class="sr-only">{~t(May not be accessible)}</span>
        <% end %>
      <% end %>
    </div>
    """
  end
end
