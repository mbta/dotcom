defmodule DotcomWeb.MyTripLive do
  @moduledoc """
    I want to follow my train, and send a link to my friend who can follow it too.  Why not make it work for every vehicle?
  """

  use DotcomWeb, :live_view
  @vehicles_repo Application.compile_env!(:dotcom, :repo_modules)[:vehicles]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  # @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]
  @map_config Application.compile_env(:mbta_metro, :map)

  def mount(params, _session, socket) do
    trip_id = params |> Map.get("trip_id")
    # vehicle = @vehicle_repo.trip(trip_id)

    route_id = params |> Map.get("route_id", "Red")
    route = @routes_repo.get(route_id)
    direction_id = params |> Map.get("direction_id", "0") |> String.to_integer()

    vehicles =
      @vehicles_repo.route(route_id, direction_id: direction_id)
      |> Enum.sort_by(fn v -> v.latitude end)

    offset = params |> Map.get("offset", "0") |> String.to_integer()
    vehicle = vehicles |> Enum.at(offset)

    {:ok,
     socket
     |> assign(:trip_id, trip_id)
     |> assign(:vehicle, vehicle)
     |> assign(:route_id, route_id)
     |> assign(:route, route)
     |> assign(:direction_id, direction_id)
     |> assign(:offset, offset)
     |> assign(:map_config, @map_config)}
  end

  def render(%{vehicle: vehicle} = assigns) when not is_nil(vehicle) do
    ~H"""
    <div>
      <a href={"/preview/my-trip?route_id=#{@route_id}&direction_id=#{@direction_id}&offset=#{@offset-1}"}>
        Prev
      </a>
      <span>{@vehicle.id}: {@vehicle.latitude}, {@vehicle.longitude} @ {@vehicle.bearing}</span>
      <a href={"/preview/my-trip?route_id=#{@route_id}&direction_id=#{@direction_id}&offset=#{@offset+1}"}>
        Next
      </a>
    </div>
    <.live_component
      module={MbtaMetro.Live.Map}
      id="my-trip-map"
      class="h-[32rem] w-full"
      config={@map_config}
      icons={[
        %{
          class: "size-5 cursor-pointer",
          coordinates: [@vehicle.longitude, @vehicle.latitude],
          name: icon_name(assigns),
          type: "system"
        }
      ]}
    />
    """
  end

  def render(assigns) do
    ~H"""
    404
    """
  end

  def icon_name(%{route_id: route_id}) do
    mode = route_id |> @routes_repo.get() |> Routes.Route.type_atom()

    case mode do
      :commuter_rail -> "mode-commuter-rail-small"
      :ferry -> "mode-ferry-small"
      :subway -> "mode-subway-small"
      :bus -> "mode-bus-small"
      _ -> "mode-bus-small"
    end
  end

  def icon_name(_) do
    "mode-bus-small"
  end
end
