defmodule DotcomWeb.Components.Departures do
  @moduledoc """
  Components for showing information about departures in various contexts
  """
  use DotcomWeb, :component

  alias Dotcom.InSeatTransfers.TripHeading
  alias Dotcom.ScheduleFinder.TripDetails.TripStop
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

  attr :rest, :global, doc: "Additional attributes (e.g. `id`, `phx-click`) for the `<details>`"

  slot :heading, required: true, doc: "The summary content, typically a `departure_heading/1`"
  slot :content, required: true, doc: "The trip details shown when the accordion is open"

  @doc """
  Expandable row for a single departure which, when opened, shows trip details
  """
  def departure_accordion(assigns) do
    ~H"""
    <.unstyled_accordion
      summary_class="flex items-center gap-sm px-sm py-3 bg-white hover:bg-brand-primary-lightest group-open:bg-gray-lightest group-open:hover:bg-brand-primary-lightest sticky top-0 z-[2] group-open:border-b-xs group-open:border-gray-lightest"
      {@rest}
    >
      <:heading>{render_slot(@heading)}</:heading>
      <:content>{render_slot(@content)}</:content>
    </.unstyled_accordion>
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

  attr :trip_heading, TripHeading, required: true

  @doc """
  A trip stop list item marking where a trip continues as an in-seat transfer trip
  """
  def trip_continues_as(assigns) do
    ~H"""
    <RouteComponents.lined_list_item
      route={@trip_heading.route}
      variant="none"
      class="bg-charcoal-90"
    >
      <div class="flex-col w-full">
        <div class="text-charcoal-30 text-sm text-nowrap">{~t"Trip continues as"}</div>
        <div class="flex items-center gap-sm">
          <RouteComponents.route_icon route={@trip_heading.route} size="small" class="shrink-0" />
          <span>{@trip_heading.headsign}</span>
        </div>
      </div>
    </RouteComponents.lined_list_item>
    """
  end

  attr :route, Routes.Route, required: true
  attr :stops, :list, required: true, doc: "A list of `TripStop`s and `TripHeading`s"

  attr :highlight_first?, :boolean,
    default: false,
    doc: "Whether to highlight the first stop in the list, e.g. as the selected stop"

  @doc """
  Renders the stops visited by a trip as list items, including any
  in-seat transfer headings. Must be rendered within a `lined_list`.
  """
  def trip_stops(assigns) do
    ~H"""
    <%= for {stop_or_heading, index} <- Enum.with_index(@stops) do %>
      <%= if match?(%TripHeading{}, stop_or_heading) do %>
        <.trip_continues_as trip_heading={stop_or_heading} />
      <% else %>
        <.trip_stop
          highlight={@highlight_first? && index == 0}
          route={@route}
          trip_stop={stop_or_heading}
        />
      <% end %>
    <% end %>
    """
  end

  attr :background, :string, default: "white", values: ["white", "charcoal-90"]
  attr :class, :string, default: ""
  attr :highlight, :boolean, default: false
  attr :route, Routes.Route, required: true
  attr :trip_stop, TripStop, required: true

  @doc """
  A single stop visited by a trip, with its arrival time or status.
  Must be rendered within a `lined_list`.
  """
  def trip_stop(assigns) do
    ~H"""
    <RouteComponents.lined_list_item
      background={@background}
      route={@route}
      class={@class}
      stop_pin?={@highlight}
      variant={if @trip_stop.cancelled?, do: "cancelled", else: "default"}
    >
      <div class={["grow", @highlight && "font-bold", @trip_stop.cancelled? && "line-through"]}>
        <.stop_label
          stop_name={@trip_stop.stop_name}
          platform_name={@trip_stop.platform_name}
        />
      </div>
      <div class="ml-auto flex flex-col items-end">
        <div class={[@highlight && "font-bold"]}>
          <.trip_stop_time cancelled?={@trip_stop.cancelled?} time={@trip_stop.time} />
        </div>
      </div>
    </RouteComponents.lined_list_item>
    """
  end

  attr :cancelled?, :boolean, default: false
  attr :time, :any, required: true

  @doc """
  The time (or status) for a trip stop, or a "Skipped" indicator if cancelled.
  """
  def trip_stop_time(%{cancelled?: true} = assigns) do
    ~H"""
    <div class="block text-sm flex items-center gap-0.5">
      <.icon aria-hidden type="icon-svg" name="icon-cancelled-default" class="size-3" /> {~t(Skipped)}
    </div>
    """
  end

  def trip_stop_time(%{time: {:time, time}} = assigns) do
    assigns = assign(assigns, :time, time)

    ~H"""
    <.formatted_time time={@time} />
    """
  end

  def trip_stop_time(%{time: {:status, status}} = assigns) do
    assigns = assign(assigns, :status, status)

    ~H"""
    <span>{@status}</span>
    """
  end
end
