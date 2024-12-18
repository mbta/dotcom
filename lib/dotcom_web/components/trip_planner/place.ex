defmodule DotcomWeb.Components.TripPlanner.Place do
  @moduledoc """
  A component to display a specific location in the itinerary detail.
  """

  use DotcomWeb, :component

  attr :name, :string, required: true
  attr :time, :any, required: true
  attr :accessible, :boolean, default: false
  slot :icon

  def place(assigns) do
    ~H"""
    <div class="flex items-stretch gap-x-3">
      <div class="flex flex-col items-center">
        {render_slot(@icon)}
      </div>

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

      <time class="ml-auto text-right text-sm text-nowrap">{format_time(@time)}</time>
    </div>
    """
  end

  # defp stop_url(%Route{external_agency_name: nil}, %Stop{} = stop) do
  #   ~p"/stops/#{stop}"
  # end

  # defp stop_url(_, _), do: nil

  defp format_time(datetime), do: Timex.format!(datetime, "%-I:%M %p", :strftime)
end
