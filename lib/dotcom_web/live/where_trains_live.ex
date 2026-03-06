defmodule DotcomWeb.WhereTrainsLive do
  use DotcomWeb, :live_view

  @map_config Application.compile_env(:mbta_metro, :map)
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  @impl LiveView
  def mount(_params, _session, socket) do
    {:ok, socket |> assign(:map_config, @map_config)}
  end

  @impl LiveView
  def render(assigns) do
    vehicles = Vehicles.Repo.all()
    assigns = assigns |> assign(:vehicles, vehicles)

    ~H"""
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
