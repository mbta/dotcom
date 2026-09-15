defmodule DotcomWeb.StopMapLive do
  @moduledoc """
  A page with a map showing where a stop is. This could eventually be
  promoted into the full stop page.
  """

  use DotcomWeb, :live_view

  @map_config Application.compile_env(:mbta_metro, :map)
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  def mount(_params, session, socket) do
    stop_id = session["stop_id"]
    stop = @stops_repo.get(stop_id)

    child_stops_by_type =
      stop.child_ids
      |> Enum.map(&@stops_repo.get/1)
      |> Enum.group_by(& &1.type)

    entrance_icons =
      child_stops_by_type
      |> Map.get(:entrance, [])
      |> Enum.map(
        &%{
          class: "size-5 cursor-pointer",
          coordinates: [&1.longitude, &1.latitude],
          name: "door-open",
          type: "solid"
        }
      )

    station_icon = %{
      anchor: "bottom",
      class: "size-12 cursor-pointer",
      coordinates: [stop.longitude, stop.latitude],
      name: "icon-map-station-marker",
      type: "icon-svg"
    }

    {
      :ok,
      socket
      |> assign(:map_config, zoom_to_stop(@map_config, stop))
      |> assign(:icons, [station_icon | entrance_icons])
    }
  end

  def render(assigns) do
    ~H"""
    <.live_component
      module={DotcomWeb.Components.Map}
      id="stop-page-map"
      class="h-96 w-full"
      config={@map_config}
      icons={@icons}
    />
    """
  end

  defp zoom_to_stop(config, %{latitude: lat, longitude: lon}) do
    config
    |> Map.put(:center, [lon, lat])
    |> Map.put(:zoom, 17)
  end

  defp zoom_to_stop(config, _), do: config
end
