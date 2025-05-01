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
    <.icon type="icon-svg" name="icon-accessible-small" class="h-6 w-6" aria-label="Accessible" />
    """
  end

  @doc """
  Icon for parking.
  """
  def parking(assigns) do
    ~H"""
    <div class="bg-gray-light text-white h-6 px-1.5 w-6 rounded-sm inline-flex items-center font-bold justify-center">
      <span class="notranslate" aria-label="Parking">P</span>
    </div>
    """
  end

  @doc """
  Icon for displaying the zone of a stop.
  """
  def zone(assigns) when not is_nil(assigns.stop.zone) do
    ~H"""
    <div
      class="border-[1px] border-commuter-rail text-commuter-rail max-h-6 rounded-sm px-1.5 font-bold inline-flex justify-center"
    >
      Zone {@stop.zone}
    </div>
    """
  end

  def zone(assigns), do: ~H""
end
