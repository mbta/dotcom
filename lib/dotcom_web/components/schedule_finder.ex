defmodule DotcomWeb.Components.ScheduleFinder do
  @moduledoc """
  Components for the schedule finder
  """

  use DotcomWeb, :component

  import CSSHelpers

  alias MbtaMetro.Components.SystemIcons
  alias Routes.Route

  attr :route, Routes.Route, required: true
  attr :direction_id, :string, required: true

  def route_banner(assigns) do
    ~H"""
    <div class={[route_to_class(@route), "font-heading p-md"]}>
      <.link
        class="text-current flex flex-col gap-sm hover:no-underline active:no-underline focus:text-current hover:text-current"
        patch={~p"/schedules/#{@route}"}
      >
        <div class="flex items-center gap-xs font-bold">
          <.route_banner_icon route={@route} class="shrink-0 -ml-xs" />
          <span class="grow notranslate">{@route.name}</span>
          <.icon
            name="arrow-up-right-from-square"
            aria-hidden
            class="size-4 fill-current justify-self-end"
          />
        </div>
        <div class="flex items-center gap-xs">
          <.icon name="arrow-right" aria-hidden class="size-4 mr-xs fill-current" />
          <span>
            {@route.direction_names[@direction_id]} {~t"towards"}
            <strong class="notranslate">{@route.direction_destinations[@direction_id]}</strong>
          </span>
        </div>
      </.link>
    </div>
    """
  end

  attr :route, Routes.Route, required: true
  attr :rest, :global

  def route_banner_icon(assigns) do
    mode = assigns.route |> Route.type_atom() |> atom_to_class()
    line_name = assigns.route |> Route.icon_atom() |> atom_to_class()

    assigns =
      assign(assigns, %{
        line_name: line_name,
        mode: mode
      })

    ~H"""
    <SystemIcons.mode_icon aria-hidden line={@line_name} mode={@mode} {@rest} />
    """
  end

  attr :stop, Stops.Stop

  def stop_banner(assigns) do
    ~H"""
    <.link
      :if={@stop}
      class="bg-gray-lightest p-md flex items-center gap-xs text-black hover:no-underline active:no-underline focus:text-black hover:text-black"
      patch={~p"/stops/#{@stop}"}
    >
      <.icon
        type="icon-svg"
        name={if(@stop.station?, do: "mbta-logo", else: "icon-stop-default")}
        class="size-5 fill-current"
      />
      <span class="grow font-bold font-heading">{@stop.name}</span>
      <.icon name="arrow-up-right-from-square" class="size-4 fill-current" />
    </.link>
    """
  end
end
