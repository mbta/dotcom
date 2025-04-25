defmodule DotcomWeb.Components.Stops.Header do
  @moduledoc """
  TODO
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.RouteSymbols, only: [route_symbol: 1]
  import MbtaMetro.Components.Badge, only: [badge: 1]
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
        <div class="flex items-end justify-items-end gap-2">
          <.mode_icons routes_by_stop={@routes_by_stop} />
          <.zone_icon stop={@stop} />
          <.accessibility_icon :if={accessible?(assigns)} />
          <.parking_icon :if={parking?(assigns)} />
        </div>
        <div :if={all_bus_routes?(assigns) and not @stop.station?} class="text-sm">
          Stop {@stop.id}
        </div>
      </div>
    </div>
    """
  end

  defp accessibility_icon(assigns) do
    ~H"""
    <.icon type="icon-svg" name="icon-accessible-default" class="h-6 w-6 fill-cobalt-80 inline-flex" />
    """
  end

  defp accessible?(%{stop: stop, routes_by_stop: routes_by_stop}) do
    Enum.member?(stop.accessibility, "accessible") ||
      (is_nil(stop.parent_id) && Enum.any?(routes_by_stop, &(&1.type === 3)))
  end

  defp all_bus_routes?(%{routes_by_stop: routes_by_stop}) do
    Enum.all?(routes_by_stop, &(&1.type === 3 && String.slice(&1.name, 0, 2) != "SL"))
  end

  defp mode(%Route{name: "SL" <> _}), do: "silver_line"

  defp mode(%Route{id: id, type: type}) when type in [0, 1] do
    id |> Recase.to_snake()
  end

  defp mode(%Route{type: type}), do: type |> Route.type_atom() |> Atom.to_string()

  defp mode_icon(assigns) when assigns.mode in ~w[blue green orange red] do
    ~H"""
    <.route_symbol route={%Route{id: Recase.to_title(@mode)}} class="h-6 w-6 inline-flex" />
    """
  end

  defp mode_icon(assigns) when assigns.mode in ~w[green_b green_c green_d green_e] do
    id = assigns.mode |> Recase.to_title() |> String.replace(" ", "-")

    assigns = assign(assigns, :id, id)

    ~H"""
    <.route_symbol route={%Route{id: @id}} class="h-6 w-6 inline-flex" />
    """
  end

  defp mode_icon(%{mode: "silver_line"} = assigns) do
    ~H"""
    <.icon type="icon-svg" name="icon-silver-line-small" class="h-6 w-6 inline-flex" />
    """
  end

  defp mode_icon(assigns) do
    ~H"""
    <.icon
      type="icon-svg"
      name={"icon-mode-#{Recase.to_kebab(@mode)}-small"}
      class="h-6 w-6 inline-flex"
    />
    """
  end

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

  defp parking_icon(assigns) do
    # ~H"""
    # <.icon
    #   name="square-parking"
    #   class="h-7 w-7 pt-[3px] fill-gray-light inline-flex"
    #   aria-hidden="true"
    # />
    # """
    ~H"""
    <.badge
      class="bg-gray-light font-bold text-white max-h-6 !px-1.5 min-w-2 !rounded-sm"
      variant="square"
    >
      P
    </.badge>
    """
  end

  defp parking?(%{stop: stop}) do
    not Enum.empty?(stop.parking_lots)
  end

  defp zone_icon(assigns) when not is_nil(assigns.stop.zone) do
    ~H"""
    <.badge
      class="border-[1px] border-commuter-rail text-commuter-rail max-h-6 !rounded-sm"
      variant="square"
    >
      Zone {@stop.zone}
    </.badge>
    """
  end

  defp zone_icon(assigns), do: ~H""
end
