defmodule DotcomWeb.Components.A11yParking do
  @moduledoc """
  A component for showing (or not) parking and a11y icons
  """

  use DotcomWeb, :component

  attr :stop, :map, required: true
  attr :bus_route?, :boolean, default: false
  attr :placement, :atom, default: :top
  attr :rounded?, :boolean, default: false

  def a11y_and_parking(assigns) do
    ~H"""
    <div class="flex items-center gap-1">
      <%= if length(@stop.parking_lots) > 0 do %>
        <.tooltip title={~t(Parking available)} placement={@placement}>
          <.icon
            name="square-parking"
            class={"#{if @rounded?, do: "h-5 w-auto", else: "size-4"} fill-gray-light"}
            aria-hidden="true"
          />
        </.tooltip>
      <% else %>
        <span class="sr-only">{~t(No parking)}</span>
      <% end %>

      <%= if @bus_route? || Stops.Stop.accessible?(@stop) do %>
        <.tooltip title={~t(Accessible)} placement={@placement}>
          <.icon
            type="icon-svg"
            name={"icon-accessible-#{if @rounded?, do: "small", else: "default"}"}
            class={"size-#{if @rounded?, do: "[18px]", else: "4"} fill-brand-primary"}
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
