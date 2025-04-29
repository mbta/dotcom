defmodule DotcomWeb.Components.TransitIcons do
  @moduledoc """
  Reusable transit icons.
  """

  use DotcomWeb, :component

  def accessibility(assigns) do
    ~H"""
    <.icon type="icon-svg" name="icon-accessible-default" class="h-6 w-6 fill-cobalt-80 inline-flex" />
    """
  end

  def parking(assigns) do
    ~H"""
    <.badge
      class="bg-gray-light font-bold text-white max-h-6 !px-1.5 !min-w-6 !rounded-sm"
      variant="square"
    >
      <span arial-label="Parking">P</span>
    </.badge>
    """
  end

  def zone(assigns) when not is_nil(assigns.stop.zone) do
    ~H"""
    <.badge
      class="border-[1px] border-commuter-rail text-commuter-rail max-h-6 !rounded-sm"
      variant="square"
    >
      Zone {@stop.zone}
    </.badge>
    """
  end

  def zone(assigns), do: ~H""
end
