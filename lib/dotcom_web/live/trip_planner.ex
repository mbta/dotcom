defmodule DotcomWeb.Live.TripPlanner do
  @moduledoc """
  The entire Trip Planner experience, including submitting and validating user
  input, querying and parsing results from OpenTripPlanner, and rendering the
  results in a list and map format.
  """

  use DotcomWeb, :live_view

  alias DotcomWeb.Components.LiveComponents.TripPlannerForm
  alias Dotcom.TripPlan.ItineraryGroups

  import DotcomWeb.Components.TripPlanner.ItineraryGroup, only: [itinerary_group: 1]

  @form_id "trip-planner-form"

  @impl true
  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(:form_name, @form_id)
      |> assign(:submitted_values, nil)
      |> assign(:groups, nil)
      |> assign(:error, nil)

    {:ok, socket}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <h1>Trip Planner <mark style="font-weight: 400">Preview</mark></h1>
    <div style="row">
      <.live_component
        module={TripPlannerForm}
        id={@form_name}
        form_name={@form_name}
        on_submit={fn data -> send(self(), {:updated_form, data}) end}
      />
      <section>
        <p :if={@submitted_values && @groups} class="text-lg text-emerald-700">
          <%= Enum.count(@groups) %> ways to get from <%= @submitted_values.from.name %> to <%= @submitted_values.to.name %>, using <%= inspect(
            @submitted_values.modes
          ) %>
        </p>
      </section>
      <section class="flex w-full border border-solid border-slate-400">
        <div :if={@error} class="w-full p-4 text-rose-400">
          <%= inspect(@error) %>
        </div>
        <div :if={@groups} class="w-full p-4">
          <%= for group <- @groups do %>
            <.itinerary_group group={group} />
          <% end %>
        </div>
        <div id="trip-planner-map-wrapper" class="w-full" phx-update="ignore">
          <div style="min-height: 400px;" id="trip-planner-map" phx-hook="TripPlannerMap" />
        </div>
      </section>
    </div>
    """
  end

  @impl true
  def handle_event("map_change", %{"id" => id} = params, socket) do
    {:noreply, push_event(socket, id, location_props(params))}
  end

  @impl true
  def handle_event(_event, _params, socket) do
    {:noreply, socket}
  end

  @impl true
  def handle_info({:updated_form, %Dotcom.TripPlan.InputForm{} = data}, socket) do
    {:noreply, assign(socket, %{submitted_values: data, groups: nil})}
  end

  def handle_info({:updated_form, {:ok, itineraries}}, socket) do
    groups = ItineraryGroups.from_itineraries(itineraries)
    {:noreply, assign(socket, %{error: nil, groups: groups})}
  end

  def handle_info({:updated_form, {:error, error}}, socket) do
    {:noreply, assign(socket, :error, error)}
  end

  def handle_info(_info, socket) do
    {:noreply, socket}
  end

  # Selected from list of popular locations
  defp location_props(%{"stop_id" => stop} = props) when is_binary(stop) do
    Map.take(props, ["name", "latitude", "longitude", "stop_id"])
  end

  # GTFS stop
  defp location_props(%{"stop" => stop}) when is_map(stop) do
    Map.take(stop, ["name", "latitude", "longitude"])
    |> Map.put("stop_id", stop["id"])
  end

  # From AWS
  defp location_props(%{"address" => address} = props) do
    Map.take(props, ["latitude", "longitude"])
    |> Map.put_new("name", address)
  end

  # Geolocated
  defp location_props(props) do
    Map.take(props, ["name", "latitude", "longitude"])
  end
end
