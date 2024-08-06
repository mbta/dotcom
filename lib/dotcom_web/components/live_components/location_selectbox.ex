defmodule DotcomWeb.LiveComponents.LocationSelectbox do
  @moduledoc """
  YAY
  """
  use DotcomWeb, :live_component

  attr(:field, Phoenix.HTML.FormField, required: true)
  attr(:required, :boolean, default: false)
  attr(:title, :string, default: "Select an Address")
  attr(:on_change, :any)

  def render(assigns) do
    ~H"""
    <div>
      <label><%= @title %></label>
      <div
        phx-hook="AlgoliaAutocompleteInternalLocation"
        id={@id}
      >
        <div
          class="c-search-bar__autocomplete"
          data-popular-locations={true}
          data-initial-state={true}
        />
        <div class="c-search-bar__autocomplete-results" />
      </div>
      <%= for {name, value} <- @field.value do %>
        <input id={"#{@field.name}_#{name}"} name={"#{@field.name}[#{name}]"} value={value} type="hidden" />
      <% end %>
    </div>
    """
  end

  def mount(socket) do
    {:ok, socket}
  end

  def update(assigns, socket) do
    # get subfields
    socket = socket
    |> assign(assigns)
    |> assign(assigns.field.value)

    {:ok, socket}
  end

  def handle_event("autocomplete-update", selected_item, socket) do
    socket.assigns.on_change.(selected_item)
    {:noreply, with_selected(socket, selected_item)}
  end

  defp with_selected(socket, %{"stop_id" => stop_id, "latitude" => lat, "longitude" => lon, "name" => name}) do
    socket
    |> assign(:latitude, lat)
    |> assign(:longitude, lon)
    |> assign(:name, name)
    |> assign(:stop_id, stop_id)
  end

  defp with_selected(socket, %{"stop" => %{"id" => stop_id, "latitude" => lat, "longitude" => lon, "name" => name}}) do
    socket
    |> assign(:latitude, lat)
    |> assign(:longitude, lon)
    |> assign(:name, name)
    |> assign(:stop_id, stop_id)
  end

  defp with_selected(socket, %{"latitude" => lat, "longitude" => lon, "name" => name}) do
    socket
    |> assign(:latitude, lat)
    |> assign(:longitude, lon)
    |> assign(:name, name)
  end

  defp with_selected(socket, %{"latitude" => lat, "longitude" => lon, "address" => address}) do
    socket
    |> assign(:latitude, lat)
    |> assign(:longitude, lon)
    |> assign(:name, address)
  end

  defp with_selected(socket, _), do: socket
end
