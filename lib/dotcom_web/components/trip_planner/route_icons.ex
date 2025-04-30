defmodule DotcomWeb.Components.TripPlanner.RouteIcons do
  @moduledoc """
  Rendering an icon for a route returned from OpenTripPlanner, which may include routes outside of the MBTA.
  """

  use CVA.Component
  use DotcomWeb, :component

  import Dotcom.TripPlan.Helpers
  import MbtaMetro.Components.Icon, only: [icon: 1]

  alias MbtaMetro.Components.SystemIcons
  alias OpenTripPlannerClient.Schema.Route

  @logan_express_icon_names Dotcom.TripPlan.Helpers.logan_express_icon_names()
  @massport_icon_names Dotcom.TripPlan.Helpers.massport_icon_names()

  attr :class, :string, default: ""
  attr :route, Route, required: true

  def otp_route_icon(%{route: route} = assigns) when agency_name?(route, "Massport") do
    name = route_name(route)

    if name in @massport_icon_names do
      assigns = assign(assigns, %{label: route_label(assigns.route), name: name})

      ~H"""
      <.icon
        type="icon-svg"
        name={"icon-massport-#{@name}"}
        class={"#{@class} h-6 w-6"}
        aria-label={@label}
      />
      """
    else
      fallback_icon(assigns)
    end
  end

  def otp_route_icon(%{route: route} = assigns) when agency_name?(route, "Logan Express") do
    if route.short_name in @logan_express_icon_names do
      assigns = assign(assigns, %{label: route_label(assigns.route), name: route.short_name})

      ~H"""
      <.icon
        type="icon-svg"
        name={"icon-logan-express-#{@name}"}
        class={"#{@class} h-6 w-6"}
        aria-label={@label}
      />
      """
    else
      fallback_icon(assigns)
    end
  end

  def otp_route_icon(%{route: route} = assigns) when mbta_shuttle?(route) do
    shuttle_type =
      case route.short_name do
        "Blue" <> _ -> "blue"
        "Green" <> _ -> "green"
        "Orange" <> _ -> "orange"
        "Red" <> _ -> "red"
        _ -> "cr"
      end

    assigns = assign(assigns, :shuttle_type, shuttle_type)

    ~H"""
    <.icon
      type="icon-svg"
      name={"icon-rail-replacement-shuttle-#{@shuttle_type}"}
      class={"#{@class} h-6 w-6"}
      aria-label={@route.short_name}
    />
    """
  end

  def otp_route_icon(%{route: route} = assigns) when agency_name?(route, "MBTA"),
    do: mbta_icon(assigns)

  attr :class, :string, default: ""

  defp fallback_icon(assigns) do
    ~H"""
    <.icon
      type="icon-svg"
      name="icon-mode-shuttle-default"
      class={"#{@class} h-6 w-6"}
      aria-label="Shuttle"
    />
    """
  end

  variant(
    :size,
    [
      small: "w-4 h-4",
      default: "w-6 h-6"
    ],
    default: :default
  )

  attr :class, :string, default: ""
  attr :label, :string
  attr :name, :string, required: true

  def mbta_icon(%{route: %Route{type: 2}} = assigns) do
    ~H"""
    <SystemIcons.mode_icon mode="commuter-rail" class={@class} />
    """
  end

  def mbta_icon(%{route: %Route{type: 4}} = assigns) do
    ~H"""
    <SystemIcons.mode_icon mode="ferry" class={@class} />
    """
  end

  def mbta_icon(%{route: %Route{}} = assigns) do
    assigns = assign_new(assigns, :size, fn -> "default" end)

    case route_line_name(assigns.route) do
      nil ->
        ~H"""
        <SystemIcons.route_icon name={route_name(@route)} class={@class} size={@size} />
        """

      line_name ->
        assigns = assign(assigns, :line, line_name)

        ~H"""
        <SystemIcons.route_icon line={@line} class={@class} size={@size} />
        """
    end
  end
end
