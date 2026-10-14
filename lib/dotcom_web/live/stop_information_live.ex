defmodule DotcomWeb.StopInformationLive do
  @moduledoc """
  A page with information about a station or stop
  """
  use DotcomWeb, :live_view

  import Dotcom.StopAmenity, only: [alerts_for_amenity: 2]
  import DotcomWeb.Components.Stops
  import DotcomWeb.{Components, ViewHelpers}
  import DotcomWeb.PartialView.SvgIconWithCircle, only: [svg_icon_with_circle: 1]
  import DotcomWeb.StopView, except: [render: 1]
  import Fares.Format, only: [one_way_ranges: 1]

  alias DotcomWeb.PartialView.SvgIconWithCircle
  alias Phoenix.LiveView
  alias Stops.Stop

  # used to display the current static stop page template
  embed_templates "../templates/stop/*"

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @facilities_repo Application.compile_env!(:dotcom, :repo_modules)[:facilities]
  @map_config Application.compile_env(:mbta_metro, :map)

  on_mount {DotcomWeb.Hooks.Assigns, :user_agent}
  on_mount {DotcomWeb.Hooks.Assigns, :stop_page}
  on_mount {DotcomWeb.Hooks.Alerts, :stop_page}
  on_mount {DotcomWeb.Hooks.Breadcrumbs, :stop_page}

  @impl LiveView
  def mount(_params, _session, socket) do
    %{routes_by_stop: routes_by_stop, stop: stop} = socket.assigns

    amenities =
      stop.id
      |> @facilities_repo.get_for_stop()
      |> Dotcom.StopAmenity.from_stop_facilities()
      |> Map.new(&{&1.type, &1})

    socket =
      socket
      |> assign_new(:amenity_param, fn -> nil end)
      |> assign_new(:date_time, fn -> @date_time_module.now() end)
      |> assign_new(:new_stop_page, fn -> false end)
      |> assign(:accessible?, accessible?(stop, routes_by_stop))
      |> assign(:one_way_fares, one_way_ranges(routes_by_stop))
      |> assign(:parking_amenity, amenities[:parking])
      |> assign(:bike_amenity, amenities[:bike])
      |> assign(:elevator_amenity, amenities[:elevator])
      |> assign(:escalator_amenity, amenities[:escalator])
      |> assign(:accessibility_amenity, amenities[:accessibility])
      |> assign(:fare_amenity, amenities[:fare])

    if socket.assigns.new_stop_page do
      socket =
        socket
        |> assign(:map_config, zoom_to_stop(@map_config, stop))
        |> assign(:icons, map_icons(stop))

      {:ok, socket}
    else
      {:ok, render_with(socket, &show/1)}
    end
  end

  @impl LiveView
  def handle_params(%{"amenity" => amenity_param}, _uri, socket) do
    {:noreply, assign(socket, :amenity_param, String.to_existing_atom(amenity_param))}
  end

  def handle_params(_params, _uri, socket) do
    {:noreply, socket}
  end

  # A stop is accessible if it is labeled as accessible in GTFS or it doesn't have a parent stop and it serves a bus route.
  defp accessible?(stop, routes) do
    Enum.member?(stop.accessibility, "accessible") ||
      (is_nil(stop.parent_id) && Enum.any?(routes, &(&1.type === 3)))
  end

  defp map_icons(stop) do
    station_icon = %{
      anchor: "bottom",
      class: "size-12 cursor-pointer",
      coordinates: [stop.longitude, stop.latitude],
      name: "icon-map-station-marker",
      type: "icon-svg"
    }

    [station_icon]
  end

  defp zoom_to_stop(config, %{latitude: lat, longitude: lon}) do
    config
    |> Map.put(:center, [lon, lat])
    |> Map.put(:zoom, 15)
  end
end
