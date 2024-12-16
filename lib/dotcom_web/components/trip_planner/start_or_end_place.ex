defmodule DotcomWeb.Components.TripPlanner.StartOrEndPlace do
  @moduledoc """
  A component to display a specific location in the itinerary detail.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.Place, only: [place: 1]

  alias Routes.Route
  alias Stops.Stop

  attr :place, :map, required: true
  attr :time, :any, required: true
  attr :route, :map, default: nil
  attr :alerts, :list, default: []

  def start_or_end_place(assigns) do
    # TODO come back to this

    stop_url = stop_url(assigns.route, assigns.place.stop)

    assigns =
      assign(assigns, %{
        stop_url: stop_url,
        tag_name: if(stop_url, do: "a", else: "div")
      })

    ~H"""
    <div class="bg-gray-bordered-background rounded-lg p-3">
      <.place name={@place.name} time={@time}>
        <:icon>
          <.icon name="location-dot" class="fill-brand-primary h-5 w-5" />
        </:icon>
      </.place>
    </div>
    """
  end

  defp stop_url(%Route{external_agency_name: nil}, %Stop{} = stop) do
    ~p"/stops/#{stop}"
  end

  defp stop_url(_, _), do: nil
end
