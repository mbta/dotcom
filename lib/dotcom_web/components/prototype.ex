defmodule DotcomWeb.Components.Prototype do
  @moduledoc """
  Throwaway components for prototyping things. May be buggy, temporary, etc
  """

  use DotcomWeb, :live_component

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @impl Phoenix.LiveComponent
  def mount(socket) do
    {:ok,
     socket
     |> assign_new(:all_routes, fn ->
       all_routes_with_green_line()
     end)
     |> stream_configure(:async_stops, dom_id: & &1.id)}
  end

  @impl Phoenix.LiveComponent
  def update(%{selected_route: route, selected_direction_id: direction_id} = assigns, socket)
      when route != nil and direction_id != nil do
    {:ok,
     socket
     |> assign(assigns)
     |> stream_async(:async_stops, fn ->
       {:ok,
        @stops_repo.by_route(route.id, direction_id)
        |> Enum.map(&Map.take(&1, [:id, :name])), reset: true}
     end)}
  end

  def update(_assigns, socket), do: {:ok, socket}

  @impl Phoenix.LiveComponent
  def render(assigns) do
    ~H"""
    <section class="flex gap-lg items-center border-gray-lightest border-lg rounded-full justify-center">
      <.button class="rounded-full" popovertarget="route-choice">
        Switch route
      </.button>
      <div
        id="route-choice"
        popover
        style="position: absolute; inset: unset; bottom: 0; overflow-y: scroll; max-height: 60vh; scrollbar-color: hotpink blue; scrollbar-gutter: stable; left: 0; right: 0; padding: 0;"
      >
        <div class="grid grid-cols-6 w-full border-gray-dark border-lg">
          <.link
            :for={route <- @all_routes}
            patch={~p"/departures/?route_id=#{route.id}&direction_id=#{@selected_direction_id}"}
            style={"background-color: ##{route.color}; color: #{if(route.type == 3 and not String.contains?(route.name, "SL"), do: "black", else: "white")};"}
            class={[
              "py-sm px-xs border-xs border-gray-dark text-sm font-bold text-center break-words leading-none",
              if(@selected_route && route.id == @selected_route.id, do: "!bg-brand-primary")
            ]}
          >
            {route.name}
          </.link>
        </div>
      </div>
      <.link
        class={if(@selected_direction_id == 0, do: "underline")}
        patch={~p"/departures/?route_id=#{@selected_route.id}&direction_id=0"}
      >
        {@selected_route.direction_names[0]}
      </.link>
      |
      <.link
        class={if(@selected_direction_id == 1, do: "underline")}
        patch={~p"/departures/?route_id=#{@selected_route.id}&direction_id=1"}
      >
        {@selected_route.direction_names[1]}
      </.link>

      <.button variant="secondary" class="rounded-full" popovertarget="stop-choice">
        <%= if @async_stops.loading do %>
          <.icon name="spinner" class="size-3 fa-spin" /> Loading..
        <% else %>
          <.icon name="shuffle" class="size-3" /> Pick stop
        <% end %>
      </.button>

      <div
        :if={@streams.async_stops}
        id="stop-choice"
        popover
        style="overflow-y: scroll; scrollbar-color: hotpink blue; scrollbar-gutter: stable; padding: 0;"
        class="shadow-slate-800 shadow-2xl"
      >
        <div
          class="grid grid-cols-3 max-h-[70vh] max-w-[90vw] overflow-scroll"
          id="stop-choice-list"
          phx-update="stream"
        >
          <.link
            :for={{stop_id, stop} <- @streams.async_stops}
            id={stop_id}
            patch={
              ~p"/departures/?route_id=#{@selected_route.id}&direction_id=#{@selected_direction_id}&stop_id=#{stop_id}"
            }
            class="p-sm border-xs text-sm font-bold text-center break-words leading-none"
          >
            {stop.name}
          </.link>
        </div>
      </div>
    </section>
    """
  end

  defp all_routes_with_green_line() do
    all_routes = @routes_repo.all()

    first_gl_index = all_routes |> Enum.find_index(&(&1.line_id == "line-Green"))

    all_routes
    |> List.insert_at(first_gl_index, @routes_repo.green_line())
    |> Enum.map(&Map.take(&1, [:id, :color, :name, :type]))
  end
end
