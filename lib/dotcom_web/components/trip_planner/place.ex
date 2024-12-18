defmodule DotcomWeb.Components.TripPlanner.Place do
  @moduledoc """
  A component to display a specific location in the itinerary detail.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.AlertGroup, only: [alert_group: 1]

  alias Routes.Route
  alias Stops.Stop

  attr :place, :map, required: true
  attr :time, :any, required: true
  attr :route, :map, default: nil
  attr :alerts, :list, default: []

  def place(assigns) do
    stop_url = stop_url(assigns.route, assigns.place.stop)

    assigns =
      assign(assigns, %{
        stop_url: stop_url,
        tag_name: if(stop_url, do: "a", else: "div")
      })

    ~H"""
    <div class="bg-gray-bordered-background px-3 py-2 rounded-lg grid grid-cols-[1.5rem_auto_1fr] items-center gap-x-2 w-full">
      <.location_icon route={@route} class="h-6 w-6" />
      <.dynamic_tag class="hover:no-underline text-black" tag_name={@tag_name} href={@stop_url}>
        <strong class="flex items-center gap-2">
          {@place.name}
          <.icon
            :if={!is_nil(@place.stop) and Stop.accessible?(@place.stop)}
            type="icon-svg"
            name="icon-accessible-default"
            class="h-5 w-5 ml-0.5 shrink-0"
            aria-hidden="true"
          />
        </strong>
      </.dynamic_tag>
      <time class="text-right no-wrap">{format_time(@time)}</time>
      <.alert_group class="col-start-2 col-end-4 mr-4" alerts={@alerts} />
    </div>
    """
  end

  defp stop_url(%Route{external_agency_name: nil}, %Stop{} = stop) do
    ~p"/stops/#{stop}"
  end

  defp stop_url(_, _), do: nil

  defp location_icon(%{route: %Route{}} = assigns) do
    icon_name =
      if(Routes.Route.type_atom(assigns.route) in [:bus, :logan_express, :massport_shuttle],
        do: "icon-stop-default",
        else: "icon-circle-t-default"
      )

    assigns = assign(assigns, :icon_name, icon_name)

    ~H"""
    <.icon type="icon-svg" class={@class} name={@icon_name} />
    """
  end

  defp location_icon(assigns) do
    ~H"""
    <.icon class={"#{@class} fill-brand-primary"} name="location-dot" />
    """
  end

  defp format_time(datetime), do: Timex.format!(datetime, "%-I:%M %p", :strftime)
end
