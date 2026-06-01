defmodule DotcomWeb.Components.Departures do
  @moduledoc """
  Components for showing information about departures in various contexts
  """
  use DotcomWeb, :component

  alias DotcomWeb.RouteComponents

  attr :route, Routes.Route,
    required: true,
    doc: "The route for the departure trip, used to render an icon"

  slot :headsign,
    required: true,
    doc: "The headsign of the departure, describing the trip destination"

  slot :additional_info,
    doc:
      "Additional information to display below the headsign, such as a platform name, vehicle name, or train number"

  slot :time, required: true, doc: "The formatted time of the departure."

  @doc """
  Wrapper for a single row of departure information
  """
  def departure_heading(assigns) do
    ~H"""
    <div class="w-full flex items-center">
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <RouteComponents.route_icon size="small" route={@route} class="shrink-0" />

          <span>{render_slot(@headsign)}</span>
        </div>
        <div
          :if={is_list(@additional_info) and length(@additional_info) > 0}
          class="flex items-center gap-2"
        >
          <div class="h-0 invisible shrink-0">
            <RouteComponents.route_icon size="small" route={@route} />
          </div>

          <div class="leading-none text-sm">
            {render_slot(@additional_info)}
          </div>
        </div>
      </div>

      <div class="ml-auto">
        {render_slot(@time)}
      </div>
    </div>
    """
  end

  attr :time, DateTime, required: true

  def formatted_time(assigns) do
    ~H"""
    <time datetime={@time} class="tabular-nums whitespace-nowrap">
      {Dotcom.Utils.Time.format!(@time, :hour_12_minutes)}
    </time>
    """
  end

  attr :stop_name, :string, required: true
  attr :platform_name, :string, default: nil

  def stop_label(assigns) do
    ~H"""
    <div class="notranslate grow flex flex-wrap gap-x-2 items-center">
      <div>{@stop_name}</div>
      <div :if={@platform_name} class="text-sm">
        {@platform_name}
      </div>
    </div>
    """
  end
end
