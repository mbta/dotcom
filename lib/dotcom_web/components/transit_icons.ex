defmodule DotcomWeb.Components.TransitIcons do
  @moduledoc """
  An approved set of icons with consistent styling.
  """

  use DotcomWeb, :component

  import MbtaMetro.Components.Icon, only: [icon: 1]

  @doc """
  Icon for accessibility.
  """
  def accessibility(assigns) do
    ~H"""
    <.badge
      class="bg-cobalt-30 h-6 !px-1.5 !min-w-6 max-w-6 !rounded-sm inline-flex"
      variant="square"
    >
      <.icon name="wheelchair" class="h-3.5 w-3.5 fill-white" aria-label="accessible" />
    </.badge>
    """
  end

  @doc """
  Icon for parking.
  """
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

  @doc """
  Icon for displaying the zone of a stop.
  """
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
