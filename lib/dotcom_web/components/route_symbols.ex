defmodule DotcomWeb.Components.RouteSymbols do
  @moduledoc """
  Reusable components for displaying UI derived from GTFS data.
  """
  use CVA.Component
  use Phoenix.Component

  import MbtaMetro.Components.Icon

  alias Routes.Route

  @logan_express_icon_names Route.logan_express_icon_names()
  @massport_icon_names Route.massport_icon_names()

  variant(
    :size,
    [
      small: "rounded-[3px] px-[2px] py-[2px] text-sm",
      default: "rounded-[4px] px-[4px] py-[4px]"
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
  def route_symbol(
        %{
          route: %Route{
            description: description,
            external_agency_name: nil,
            type: 3
          }
        } = assigns
      ) do
    if description in [:rail_replacement_bus, :rapid_transit] do
      ~H"""
      <.route_icon {assigns} />
      """
    else
      route_class =
        if(Routes.Route.silver_line?(assigns.route),
          do: "bg-silver-line text-white",
          else: "bg-bus text-black"
        )

      assigns = update(assigns, :class, &"#{&1} #{route_class}")

      ~H"""
      <div class={"#{@class} #{@cva_class} font-heading whitespace-nowrap min-w-8 w-min font-bold inline-flex items-center justify-center leading-[1]"}>
        <%= @route.name %>
      </div>
      """
    end
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

  def route_icon(
        %{
          route: %Route{
            external_agency_name: "Massport",
            name: <<route_number::binary-size(2), _::binary>>
          }
        } = assigns
      )
      when route_number in @massport_icon_names do
    assigns =
      assign(assigns, :route_number, route_number)

    ~H"""
    <.icon type="icon-svg" name={"icon-massport-#{@route_number}"} class={"#{@class} #{@cva_class}"} />
    """
  end

  def route_icon(%{route: %Route{external_agency_name: "Logan Express", name: name}} = assigns)
      when name in @logan_express_icon_names do
    ~H"""
    <.icon
      type="icon-svg"
      name={"icon-logan-express-#{@route.name}"}
      class={"#{@class} #{@cva_class}"}
    />
    """
  end

  def route_icon(%{route: %Route{external_agency_name: agency}} = assigns)
      when not is_nil(agency) do
    ~H"""
    <.icon type="icon-svg" name="icon-mode-shuttle-default" class={"#{@class} #{@cva_class}"} />
    """
  end

  # Rail replacement bus shuttle icon, colored for the route being replaced
  def route_icon(
        %{route: %Route{type: 3, description: :rail_replacement_bus, name: shuttle_name}} =
          assigns
      ) do
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

  def route_icon(%{route: %Route{type: 3, description: :rapid_transit}} = assigns) do
    ~H"""
    <.icon type="icon-svg" name={"icon-silver-line-#{@size}"} class={"#{@class} #{@cva_class}"} />
    """
  end

  def route_icon(%{route: %Route{type: type}} = assigns) when type in [0, 1] do
    ~H"""
    <.icon
      type="icon-svg"
      name={"icon-#{route_class(@route)}-#{@size}"}
      class={"#{@class} #{@cva_class}"}
    />
    """
  end

  def route_icon(%{route: %Route{type: type}} = assigns) when type in [2, 3, 4] do
    ~H"""
    <.icon
      type="icon-svg"
      name={"icon-mode-#{route_class(@route)}-#{@size}"}
      class={"#{@class} #{@cva_class}"}
    />
    """
  end

  defp route_class(route) do
    route
    |> Route.icon_atom()
    |> Atom.to_string()
    |> String.replace("_", "-")
  end
end
