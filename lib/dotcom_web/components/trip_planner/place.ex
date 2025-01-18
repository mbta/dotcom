defmodule DotcomWeb.Components.TripPlanner.Place do
  @moduledoc """
  A component to display a specific location in the itinerary detail.
  """

  use DotcomWeb, :component

  attr :accessible, :boolean, default: false
  attr :name, :string, required: true
  attr :time, :any, required: true
  attr :url, :string, default: nil
  slot :icon

  def place(assigns) do
    ~H"""
    <div class="flex items-stretch gap-x-3">
      <div class="flex flex-col items-center">
        {render_slot(@icon)}
      </div>

      <.wrap_with_url url={@url}>
        <strong class="text-sm">
          {@name}
          <.icon
            :if={@accessible}
            type="icon-svg"
            name="icon-accessible-default"
            class="h-3 w-3 shrink-0 ml-1.5"
            aria-hidden="true"
          />
        </strong>
      </.wrap_with_url>

      <time class="ml-auto text-right text-sm text-nowrap">{Util.kitchen_downcase_time(@time)}</time>
    </div>
    """
  end

  attr :url, :string, required: true
  slot :inner_block
  defp wrap_with_url(assigns)

  defp wrap_with_url(%{url: nil} = assigns) do
    ~H"""
    {render_slot(@inner_block)}
    """
  end

  defp wrap_with_url(assigns) do
    ~H"""
    <a class="hover:no-underline text-black leading-5" href={@url} target="_blank">
      {render_slot(@inner_block)}
    </a>
    """
  end
end
