defmodule DotcomWeb.Live.StopMap do
  use DotcomWeb, :live_view

  @map_config Application.compile_env(:mbta_metro, :map)

  def(mount(_params, _session, socket)) do
    {
      :ok,
      socket
      |> assign(:stop_id, "place-boyls")
      |> assign(:map_config, @map_config)
    }
  end

  def render(assigns) do
    all_stops =
      (Stops.Repo.by_route_type(0) ++ Stops.Repo.by_route_type(1))
      |> Enum.uniq_by(& &1.id)
      |> Enum.sort_by(& &1.name)

    stop = Stops.Repo.get(assigns.stop_id)

    child_stops = stop.child_ids |> Enum.map(&Stops.Repo.get/1)

    child_stops_by_type = child_stops |> Enum.group_by(& &1.type)
    entrances = child_stops_by_type |> Map.get(:entrance, [])

    assigns =
      assigns
      |> assign(:stop, stop)
      |> assign(:all_stops, all_stops)
      |> assign(:child_stops, child_stops)
      |> assign(:entrances, entrances)

    ~H"""
    <h1>Hello we are your map pin icon</h1>

    <.live_component
      module={MbtaMetro.Live.Map}
      id="stop-page-map"
      class="h-[32rem] w-full"
      config={@map_config}
      icons={
        (@entrances
         |> Enum.map(
           &%{
             class: "size-5 cursor-pointer",
             coordinates: [&1.longitude, &1.latitude],
             name: "door-open",
             type: "solid"
           }
         )) ++
          [
            %{
              anchor: "bottom",
              class: "size-12 cursor-pointer",
              coordinates: [@stop.longitude, @stop.latitude],
              name: "icon-map-station-marker",
              type: "icon-svg"
            }
          ]
      }
    />

    <div class="flex flex-wrap gap-2 mt-4">
      <button
        :for={stop <- @all_stops}
        class={[
          "rounded p-sm",
          stop.id == @stop.id && " bg-brand-primary-lightest"
        ]}
        phx-click="switch-stop"
        phx-value-stop-id={stop.id}
      >
        {stop.name}
      </button>
    </div>
    """
  end

  def handle_event("switch-stop", %{"stop-id" => stop_id}, socket) do
    {
      :noreply,
      socket |> assign(:stop_id, stop_id)
    }
  end
end
