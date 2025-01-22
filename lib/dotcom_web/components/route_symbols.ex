defmodule DotcomWeb.Components.RouteSymbols do
  @moduledoc """
  Reusable components for displaying route information
  """
  use CVA.Component
  use Phoenix.Component

  import MbtaMetro.Components.Icon
  import Routes.Route, only: [is_external?: 1, is_shuttle?: 1]

  alias Routes.Route

  @logan_express_icon_names Route.logan_express_icon_names()
  @massport_icon_names Route.massport_icon_names()

  variant(
    :size,
    [
      small: "rounded-[3px] px-[2px] py-[2px] min-w-8 text-sm",
      default: "rounded-[4px] px-[4px] py-[4px] min-w-10"
    ],
    default: :default
  )

  attr(:class, :string, default: "")
  attr(:rest, :global)
  attr(:route, Routes.Route, required: true)

  @doc """
  Creates a simple symbol representing a single route. Currently shows rounded
  SVG icons, small pills for bus routes, custom icons for Logan Express and
  Massport routes. Supports a `size` variant defined as either `:default` or
  `:small`.

  ```elixir
  <.route_symbol route={%Routes.Route{id: "Red"}} size="small" />
  ```

  Supports additional CSS class names, though they may have limited effect. Use
  with caution.

  ```elixir
  <.route_symbol route={%Routes.Route{type: 3}} class="mr-3" />
  ```

  Supports custom HTML attributes.

  ```elixir
  <.route_symbol route={%Routes.Route{type: 3}} data-toggle="tooltip" />
  ```
  """
  def route_symbol(%{route: %Route{description: description, type: 3} = route} = assigns)
      when not is_external?(route) and not is_shuttle?(route) and description != :rapid_transit do
    route_class =
      if(Routes.Route.silver_line?(assigns.route),
        do: "bg-silver-line text-white",
        else: "bg-brand-bus text-black"
      )

    assigns = update(assigns, :class, &"#{&1} #{route_class}")

    ~H"""
    <div
      class={"#{@class} #{@cva_class} font-heading whitespace-nowrap w-min font-bold inline-flex items-center justify-center leading-[1]"}
      aria-label={route_label(@route)}
    >
      {@route.name}
    </div>
    """
  end

  def route_symbol(assigns), do: ~H"<.route_icon {assigns} />"

  variant(
    :size,
    [
      small: "w-4 h-4",
      default: "w-6 h-6"
    ],
    default: :default
  )

  attr(:class, :string, default: "")
  attr(:rest, :global)
  attr(:route, Routes.Route, required: true)

  def route_icon(%{route: %Route{name: shuttle_name} = route} = assigns) when is_shuttle?(route) do
    route_class =
      shuttle_name
      |> String.replace(" Shuttle", "")
      |> String.split(" ")
      |> List.first()
      |> then(fn replaced_route_name ->
        if replaced_route_name in ["Red", "Orange", "Blue", "Green"] do
          "#{String.downcase(replaced_route_name)}-line"
        else
          "commuter-rail"
        end
      end)

    assigns = update(assigns, :class, &"#{&1} text-#{route_class}")

    ~H"""
    <.icon type="icon-svg" name="icon-mode-shuttle-default" class={"#{@class} #{@cva_class}"} />
    """
  end

  def route_icon(%{route: route} = assigns) when not is_external?(route) do
    assigns =
      assign_new(assigns, :icon_name, fn %{route: route, size: size} ->
        icon_name =
          route
          |> Routes.Route.icon_atom()
          |> Atom.to_string()
          |> String.replace("_", "-")

        if route.type in [0, 1] or Routes.Route.silver_line?(route) do
          "icon-#{icon_name}-#{size}"
        else
          "icon-mode-#{icon_name}-#{size}"
        end
      end)

    ~H"""
    <.icon
      type="icon-svg"
      name={@icon_name}
      class={"#{@class} #{@cva_class}"}
      aria-label={route_label(@route)}
    />
    """
  end

  def route_icon(
        %{route: %Route{external_agency_name: "Massport", name: <<route_number::binary-size(2), _::binary>>}} = assigns
      )
      when route_number in @massport_icon_names do
    assigns = assign(assigns, :route_number, route_number)

    ~H"""
    <.icon
      type="icon-svg"
      name={"icon-massport-#{@route_number}"}
      class={"#{@class} #{@cva_class}"}
      aria-label={route_label(@route)}
    />
    """
  end

  def route_icon(%{route: %Route{external_agency_name: "Logan Express", name: name}} = assigns)
      when name in @logan_express_icon_names do
    ~H"""
    <.icon
      type="icon-svg"
      name={"icon-logan-express-#{@route.name}"}
      class={"#{@class} #{@cva_class}"}
      aria-label={route_label(@route)}
    />
    """
  end

  def route_icon(assigns) do
    ~H"""
    <.icon
      type="icon-svg"
      name="icon-mode-shuttle-default"
      class={"#{@class} #{@cva_class}"}
      aria-label="Shuttle"
    />
    """
  end

  # Given a route, return a machine-readable label.
  defp route_label(%Route{type: 2}), do: "Commuter Rail"
  defp route_label(%Route{type: 4}), do: "Ferry"
  defp route_label(%Route{external_agency_name: "Logan Express"}), do: "Logan Express"
  defp route_label(%Route{id: "Green-" <> branch}), do: "Green Line #{branch} Branch"

  defp route_label(%Route{external_agency_name: "Massport", name: <<route_number::binary-size(2), _::binary>>}),
    do: "Massport Shuttle #{route_number}"

  # Silver Line and Buses.
  defp route_label(%Route{name: name} = route)
       when not is_external?(route) and not is_shuttle?(route) and route.description != :rapid_transit do
    if Routes.Route.silver_line?(route) do
      name
    else
      "Route #{name}"
    end
  end

  defp route_label(%Route{long_name: long_name}), do: long_name
end
