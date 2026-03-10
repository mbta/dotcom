defmodule DotcomWeb.WhereTrainsLive do
  use DotcomWeb, :live_view

  @map_config Application.compile_env(:mbta_metro, :map)
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  @impl LiveView
  def mount(params, _session, socket) do
    show_bus = Map.get(params, "bus", "no") == "yes"
    show_subway = Map.get(params, "subway", "no") == "yes"

    {:ok,
     socket
     |> assign(:map_config, @map_config)
     |> assign(:show_bus, show_bus)
     |> assign(:show_subway, show_subway)}
  end

  @impl LiveView
  def render(assigns) do
    vehicles =
      Vehicles.Repo.all()
      |> Enum.filter(fn %{route_id: route_id} ->
        assigns.show_bus ||
          (route_id |> @routes_repo.get() |> Routes.Route.type_atom() != :bus &&
             (assigns.show_subway ||
                route_id |> @routes_repo.get() |> Routes.Route.type_atom() != :subway))
      end)

    assigns = assigns |> assign(:vehicles, vehicles)

    ~H"""
    <div>
      <a :if={!@show_bus} href={param_link(true, @show_subway)} title="Show busses">
        Show busses
      </a>
      <a :if={@show_bus} href={param_link(false, @show_subway)} title="Show busses">
        Hide busses
      </a>
      <a :if={!@show_subway} href={param_link(@show_bus, true)} title="Show subway">
        Show subway
      </a>
      <a :if={@show_subway} href={param_link(@show_bus, false)} title="Show subway">
        Hide subway
      </a>
    </div>
    <.live_component
      module={MbtaMetro.Live.Map}
      id="train-page-map"
      class="h-[32rem] w-full"
      config={@map_config}
      icons={
        @vehicles
        |> Enum.map(
          &%{
            class: "size-5 cursor-pointer",
            coordinates: [&1.longitude, &1.latitude],
            name: icon_name(&1),
            type: "system",
            title: &1.id <> " on " <> &1.route_id
          }
        )
      }
    />
    """
  end

  def param_link(show_busses, show_subway) do
    ~p"/preview/where-trains/?bus=" <>
      if show_busses,
        do: "yes",
        else: "no" <> "&subway=" <> if(show_subway, do: "yes", else: "no")
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
