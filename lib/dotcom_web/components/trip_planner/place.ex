defmodule DotcomWeb.Components.TripPlanner.Place do
  @moduledoc """
  A component to display a specific location in the itinerary detail.
  """

  use DotcomWeb, :component

  alias Routes.Route
  alias Stops.Stop

  attr :place, :map, required: true
  attr :time, :any, required: true
  attr :route, :map, default: nil

  def place(assigns) do
    stop_url = stop_url(assigns.route, assigns.place.stop)

    assigns =
      assign(assigns, %{
        stop_url: stop_url,
        tag_name: if(stop_url, do: "a", else: "div")
      })

    ~H"""
    <.dynamic_tag
      tag_name={@tag_name}
      href={@stop_url}
      class="bg-gray-bordered-background px-3 py-2 rounded flex flex-nowrap items-center gap-2 w-full hover:no-underline text-black"
    >
      <.location_icon route={@route} class="grow-0 h-6 w-6" />
      <strong class="grow-0">{@place.name}</strong>
      <.icon
        :if={!is_nil(@place.stop) and Stop.accessible?(@place.stop)}
        type="icon-svg"
        name="icon-accessible-default"
        class="h-6 w-6 ml-0.5 grow-0"
        aria-hidden="true"
      />
      <time class="grow text-right">{format_time(@time)}</time>
    </.dynamic_tag>
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
