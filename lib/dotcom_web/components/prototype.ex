defmodule DotcomWeb.Components.Prototype do
  @moduledoc """
  Throwaway components for prototyping things. May be buggy, temporary, etc
  """

  use DotcomWeb, :component

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  attr :selected_route, Routes.Route
  attr :selected_direction_id, :integer

  def route_stop_picker(%{selected_route: route, selected_direction_id: direction} = assigns) do
    assigns =
      assigns
      |> assign(:all_routes, @routes_repo.all())
      |> assign_new(:stops, fn ->
        if not is_nil(route) and not is_nil(direction) do
          if route.id == "Green" do
            GreenLine.branch_ids() |> @stops_repo.by_routes(direction)
          else
            @stops_repo.by_route(route.id, direction)
          end
        end
      end)

    ~H"""
    <section class="flex gap-lg items-center border-gray-lightest border-lg rounded-full justify-center p-[1px] mb-lg">
      <.button class="rounded-full" popovertarget="route-choice">
        Switch route
      </.button>
      <div id="route-choice" popover>
        <div class="grid grid-cols-6  max-h-[70vh] max-w-[90vw] overflow-scroll z-[1000] border-gray-dark border-lg">
          <.link
            :for={route <- @all_routes}
            patch={~p"/preview/schedules/#{route.id}/0"}
            style={"background-color: ##{route.color}; color: #{if(route.type == 3 and not String.contains?(route.name, "SL"), do: "black", else: "white")};"}
            class={[
              "p-sm border-xs text-sm font-bold text-center break-words leading-none",
              if(@selected_route && route.id == @selected_route.id, do: "!bg-brand-primary")
            ]}
          >
            {route.name}
          </.link>
        </div>
      </div>
      <.link
        class={if(@selected_direction_id == 0, do: "underline")}
        patch={~p"/preview/schedules/#{@selected_route.id}/0"}
      >
        {@selected_route.direction_names[0]}
      </.link>
      |
      <.link
        class={if(@selected_direction_id == 1, do: "underline")}
        patch={~p"/preview/schedules/#{@selected_route.id}/1"}
      >
        {@selected_route.direction_names[1]}
      </.link>
      <%= if @stops do %>
        <.button variant="secondary" class="rounded-full" popovertarget="stop-choice">
          Select stop
        </.button>
        <div id="stop-choice" popover>
          <div class="grid grid-cols-6 max-h-[70vh] max-w-[90vw] overflow-scroll z-[1000] shadow-slate-800 shadow-2xl">
            <.link
              :for={stop <- @stops}
              patch={
                ~p"/preview/schedules/#{@selected_route.id}/#{@selected_direction_id}?stop=#{stop.id}"
              }
              class="p-sm border-xs text-sm font-bold text-center break-words leading-none"
            >
              {stop.name}
            </.link>
          </div>
        </div>
      <% end %>
      <p class="m-0 text-xs">Navigating between routes/stops might take some time, be patient</p>
    </section>
    """
  end
end
