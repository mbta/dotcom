defmodule DotcomWeb.Components.Map do
  @moduledoc """
  A live component that renders a MapLibre map using MaplibreX.

  The component accepts a MapLibre configuration, route lines, pins, points,
  and icons. Lines are rendered as a GeoJSON layer; markers use the existing
  MBTA SVG icons.
  """

  use Phoenix.LiveComponent

  import MaplibreX.Components
  import MbtaMetro.Components.Icon, only: [icon: 1]

  @impl true
  def update(assigns, socket) do
    new_socket =
      socket
      |> assign(assigns)
      |> assign_new(:class, fn -> "" end)
      |> assign_new(:config, fn -> %{} end)
      |> assign_new(:lines, fn -> [] end)
      |> assign_new(:icons, fn -> [] end)
      |> assign_new(:pins, fn -> [] end)
      |> assign_new(:points, fn -> [] end)
      |> assign(:map_id, "#{assigns.id}-map")
      |> push_event("update-markers", %{})

    {:ok, new_socket}
  end

  @impl true
  def render(assigns) do
    assigns =
      assigns
      |> assign(:markers, markers(assigns))
      |> assign(:bounds, marker_bounds(markers(assigns)))
      |> assign(:center, config_value(assigns.config, :center))
      |> assign(:zoom, config_value(assigns.config, :zoom))
      |> assign(:min_zoom, config_value(assigns.config, :minZoom))
      |> assign(:max_zoom, config_value(assigns.config, :maxZoom))
      |> assign(:style, config_value(assigns.config, :style))
      |> assign(:fit_max_zoom, config_value(assigns.config, :zoom) || 16)
      |> assign(:line_data, line_geojson(assigns.lines))

    ~H"""
    <div
      id={@id}
      class={"mbta-map #{@class}"}
      phx-hook="MapBounds"
      data-map-id={@map_id}
      data-max-zoom={@fit_max_zoom}
    >
      <.map
        id={@map_id}
        center={@center}
        zoom={@zoom}
        min_zoom={@min_zoom}
        max_zoom={@max_zoom}
        style={@style}
        bounds={@bounds}
        class="mbta-map-wrapper maplibrex-map"
      />
      <.navigation_control id={"#{@map_id}-navigation"} map_id={@map_id} position="top-left" />
      <.geojson_layer
        :if={@line_data.features != []}
        id={"#{@map_id}-lines"}
        map_id={@map_id}
        data={@line_data}
        type="line"
        paint={
          %{
            "line-color" => ["get", "color"],
            "line-width" => ["get", "width"]
          }
        }
        layout={
          %{
            "line-cap" => "round",
            "line-join" => "round"
          }
        }
      />
      <div class="hidden">
        <.map_icon :for={marker <- @markers} marker={marker} map_id={@map_id} />
      </div>
    </div>
    """
  end

  defp map_icon(assigns) do
    ~H"""
    <.icon
      id={@marker.id}
      type={@marker.type}
      name={@marker.name}
      class={@marker.class}
      data-coordinates={Jason.encode!(@marker.coordinates)}
      data-map-id={@map_id}
      data-anchor={@marker.anchor}
      data-rotation={@marker.rotation}
      data-popup={@marker.popup}
      phx-hook="MapIcon"
    />
    """
  end

  defp markers(assigns) do
    points =
      Enum.map(assigns.points, fn coordinates ->
        %{type: "metro", name: "point", class: "mbta-map-point", coordinates: coordinates}
      end)

    pins =
      assigns.pins
      |> Enum.with_index()
      |> Enum.map(fn {coordinates, index} ->
        %{
          type: "metro",
          name: index_to_pin(index),
          class: "mbta-map-pin",
          coordinates: coordinates
        }
      end)

    icons =
      Enum.map(assigns.icons, fn marker ->
        %{
          type: marker.type,
          name: marker.name,
          class: "mbta-map-icon#{concat_classes(Map.get(marker, :class))}",
          coordinates: marker.coordinates,
          anchor: Map.get(marker, :anchor, "center"),
          rotation: Map.get(marker, :rotation, "0"),
          popup: marker |> Map.get(:popup) |> render_popup()
        }
      end)

    (points ++ pins ++ icons)
    |> Enum.with_index()
    |> Enum.map(fn {marker, index} ->
      Map.put(marker, :id, "#{assigns.id}-marker-#{index}")
    end)
  end

  defp marker_bounds([]), do: nil

  defp marker_bounds(markers) do
    coordinates = Enum.map(markers, & &1.coordinates)
    longitudes = Enum.map(coordinates, &Enum.at(&1, 0))
    latitudes = Enum.map(coordinates, &Enum.at(&1, 1))

    [
      [Enum.min(longitudes), Enum.min(latitudes)],
      [Enum.max(longitudes), Enum.max(latitudes)]
    ]
  end

  defp line_geojson(lines) do
    %{
      type: "FeatureCollection",
      features:
        Enum.map(lines, fn line ->
          %{
            type: "Feature",
            properties: %{color: line.color, width: line.width},
            geometry: %{type: "LineString", coordinates: line.coordinates}
          }
        end)
    }
  end

  defp config_value(config, key), do: Map.get(config, key, Map.get(config, Atom.to_string(key)))

  defp concat_classes(nil), do: ""
  defp concat_classes(classes) when is_binary(classes), do: " #{classes}"
  defp concat_classes(classes) when is_list(classes), do: " #{Enum.join(classes, " ")}"

  defp render_popup(%Phoenix.LiveView.Rendered{} = heex) do
    heex
    |> Phoenix.HTML.Safe.to_iodata()
    |> IO.iodata_to_binary()
  end

  defp render_popup(html), do: html

  defp index_to_pin(idx) when idx >= 0 and idx < 26 do
    alphabet = ~w(a b c d e f g h i j k l m n o p q r s t u v w x y z)

    "location-pin-#{Enum.at(alphabet, idx)}"
  end
end
