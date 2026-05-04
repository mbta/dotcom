defmodule DotcomWeb.PlaygroundComponents do
  @moduledoc """
  Some silly components to be used in non-rider-facing playground explorations
  """

  use DotcomWeb, :component

  attr :clear_button_click, :string, required: true
  attr :class, :string, default: ""
  attr :style, :string, default: ""
  slot :inner_block

  defp banner(assigns) do
    ~H"""
    <div
      class={"w-full py-4 #{@class}"}
      style={@style}
    >
      <div class="container">
        <div class="flex items-center">
          {render_slot(@inner_block)}
          <div
            phx-click={@clear_button_click}
            class="ml-auto cursor-pointer opacity-75 hover:opacity-100"
          >
            <.icon class="size-5" name="circle-xmark" />
          </div>
        </div>
      </div>
    </div>
    """
  end

  attr :route, Routes.Route, required: true

  def route_banner(assigns) do
    ~H"""
    <.banner
      style={"background-color: ##{@route.color}; color: #{text_color(@route)}; fill: #{text_color(@route)};"}
      clear_button_click="clear-route"
    >
      <span class="text-2xl font-bold">{@route.name}</span>
    </.banner>
    """
  end

  attr :direction_id, :string, required: true
  attr :route, Routes.Route, required: true

  def direction_banner(assigns) do
    ~H"""
    <.banner clear_button_click="clear-direction" class="bg-gray-lightest">
      <span class="text-lg font-bold">{direction_description(@route, @direction_id)}</span>
    </.banner>
    """
  end

  attr :stop, Stops.Stop, required: true

  def stop_banner(assigns) do
    ~H"""
    <.banner clear_button_click="clear-stop" class="bg-charcoal-10 text-white fill-white">
      <div class="flex flex-col">
        <span class="text-lg font-bold">{@stop.name}</span>
        <span class="text-md">{@stop.id}</span>
      </div>
    </.banner>
    """
  end

  attr :route, Routes.Route, default: nil
  attr :routes, :list, required: true
  slot :inner_block

  def route_picker_or(%{route: nil} = assigns) do
    ~H"""
    <div class="container">
      <div class="flex gap-2 flex-wrap">
        <button
          :for={route <- @routes}
          class="p-2 rounded opacity-75 hover:opacity-100"
          style={"background-color: ##{route.color}; color: #{text_color(route)};"}
          phx-click="select-route"
          phx-value-route-id={route.id}
        >
          {route.name}
        </button>
      </div>
    </div>
    """
  end

  def route_picker_or(assigns) do
    ~H"""
    {render_slot(@inner_block)}
    """
  end

  attr :route, Routes.Route, required: true
  attr :direction_id, :string, required: true
  slot :inner_block

  def direction_picker_or(%{direction_id: nil} = assigns) do
    ~H"""
    <div class="mt-4 container">
      <div class="w-full flex gap-2 justify-around">
        <button
          :for={
            direction_id <-
              @route.direction_names
              |> Stream.reject(fn {_, name} -> is_nil(name) end)
              |> Stream.map(fn {id, _} -> id end)
          }
          class="bg-gray-lightest opacity-75 hover:opacity-100 p-2 rounded"
          phx-click="select-direction"
          phx-value-direction-id={direction_id}
        >
          {direction_description(@route, direction_id)}
        </button>
      </div>
    </div>
    """
  end

  def direction_picker_or(assigns) do
    ~H"""
    {render_slot(@inner_block)}
    """
  end

  attr :stop, Stops.Stop, default: nil
  attr :stops, :list, required: true
  slot :inner_block

  def stop_picker_or(%{stop: nil} = assigns) do
    ~H"""
    <div class="container">
      <div class="mt-4 flex flex-wrap gap-2">
        <button
          :for={stop <- @stops}
          class="bg-charcoal-10 p-2 rounded text-white opacity-75 hover:opacity-100"
          phx-click="select-stop"
          phx-value-stop-id={stop.id}
        >
          {stop.name}
        </button>
      </div>
    </div>
    """
  end

  def stop_picker_or(assigns) do
    ~H"""
    {render_slot(@inner_block)}
    """
  end

  defp direction_description(route, direction_id) do
    "#{route.direction_names[direction_id]} towards #{route.direction_destinations[direction_id]}"
  end

  defp text_color(route) do
    if(route.type == 3 and not String.contains?(route.name, "SL"), do: "black", else: "white")
  end
end
