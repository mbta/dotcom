defmodule DotcomWeb.Components.Stops.Header do
  @moduledoc """
  The header component of a stops page.

  Includes the name of the stop and a set of icons representing general information about the stop.

  Information includes:

  - Route symbols for the routes that serve the stop
  - Accessibility
  - Parking
  - Commuter Rail Zone
  - An optional stop ID if the stop is not a station and all routes are bus routes
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.RouteSymbols, only: [route_symbol: 1]
  import DotcomWeb.Components.TransitIcons, only: [accessibility: 1, parking: 1, zone: 1]
  import MbtaMetro.Components.Icon, only: [icon: 1]

  alias Routes.Route

  @doc """
  Renders the header for the stops page.
  """
  def header(assigns) do
    ~H"""
    <div class="flex items-center justify-content-space-between">
      <h1 class="text-xl mt-3 mb-3">{@stop.name}</h1>
      <div class="mt-3 mb-3">
        <div class="flex items-end justify-items-end gap-2 flex-wrap">
          <.mode_icons routes_by_stop={@routes_by_stop} />
          <.zone stop={@stop} />
          <.accessibility :if={accessible?(assigns)} />
          <.parking :if={parking?(assigns)} />
        </div>
        <div :if={all_bus_routes?(assigns) and not @stop.station?} class="text-sm">
          Stop {@stop.id}
        </div>
      </div>
    </div>
    """
  end

  # A stop is accessible if it is labeled as accessible in GTFS or it doesn't have a parent stop and it serves a bus route.
  defp accessible?(%{stop: stop, routes_by_stop: routes_by_stop}) do
    Enum.member?(stop.accessibility, "accessible") ||
      (is_nil(stop.parent_id) && Enum.any?(routes_by_stop, &(&1.type === 3)))
  end

  # All routes are bus routes if they are all type 3 or are Silver Line.
  defp all_bus_routes?(%{routes_by_stop: routes_by_stop}) do
    Enum.all?(routes_by_stop, &(&1.type === 3 && String.slice(&1.name, 0, 2) != "SL"))
  end

  # The mode is Silver Line if the name starts with 'SL'.
  defp mode(%Route{name: "SL" <> _}), do: "silver_line"

  # The mode is a particular subway line.
  defp mode(%Route{id: id, type: type}) when type in [0, 1] do
    id |> Recase.to_snake()
  end

  # All other modes are just the type as a string.
  defp mode(%Route{type: type}), do: type |> Route.type_atom() |> Atom.to_string()

  # For subway lines, we use the route symbol.
  defp mode_icon(assigns) when assigns.mode in ~w[blue green orange red] do
    ~H"""
    <.route_symbol route={%Route{id: Recase.to_title(@mode)}} class="h-6 w-6 inline-flex" />
    """
  end

  # For subroutes of major lines, we also use the route symbol.
  defp mode_icon(assigns) when assigns.mode in ~w[green_b green_c green_d green_e mattapan] do
    id = assigns.mode |> Recase.to_title() |> String.replace(" ", "-")

    assigns = assign(assigns, :id, id)

    ~H"""
    <.route_symbol route={%Route{id: @id}} class="h-6 w-6 inline-flex" />
    """
  end

  # For Silver Line, we use an icon.
  defp mode_icon(%{mode: "silver_line"} = assigns) do
    ~H"""
    <.icon type="icon-svg" name="icon-silver-line-small" class="h-6 w-6 inline-flex" />
    """
  end

  # For all other modes, we just use the mode icon.
  defp mode_icon(assigns) do
    ~H"""
    <.icon
      type="icon-svg"
      name={"icon-mode-#{Recase.to_kebab(@mode)}-small"}
      class="h-6 w-6 inline-flex"
    />
    """
  end

  # We use all of the routes, get the unique modes, and then sort so commuter rail is last.
  # We do this so that the commuter rail icon will be next to zone information.
  defp mode_icons(assigns) do
    unique_modes =
      assigns.routes_by_stop
      |> Enum.map(&mode/1)
      |> Enum.uniq()
      |> Enum.sort_by(&(&1 === "commuter_rail"), :asc)

    assigns = assign(assigns, :unique_modes, unique_modes)

    ~H"""
    <.mode_icon :for={mode <- @unique_modes} mode={mode} />
    """
  end

  # A stop has parking if it has any parking lots listed.
  defp parking?(%{stop: stop}) do
    not Enum.empty?(stop.parking_lots)
  end
end
