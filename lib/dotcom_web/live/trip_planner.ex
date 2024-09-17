defmodule DotcomWeb.Live.TripPlanner do
  @moduledoc """
  The entire Trip Planner experience, including submitting and validating user
  input, querying and parsing results from OpenTripPlanner, and rendering the
  results in a list and map format.
  """

  use DotcomWeb, :live_view

  alias DotcomWeb.Components.LiveComponents.TripPlannerForm

  @form_id "trip-planner-form"

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def render(assigns) do
    assigns =
      assigns
      |> assign_new(:submitted_values, fn -> nil end)
      |> assign(:form_name, @form_id)

    ~H"""
    <h1>Trip Planner <mark style="font-weight: 400">Preview</mark></h1>
    <div style="row">
      <section class="col-md-12 col-lg-4">
        <.live_component
          module={TripPlannerForm}
          id={@form_name}
          form_name={@form_name}
          on_submit={fn data -> send(self(), {:updated_form, data}) end}
        />
        <code :if={@submitted_values}>
          <%= inspect(@submitted_values) %>
        </code>
      </section>
      <div class="col-md-12 col-lg-8">
        <div id="trip-planner-map-wrapper" phx-update="ignore">
          <div style="height: 400px;" id="trip-planner-map" phx-hook="TripPlannerMap" />
        </div>
      </div>
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
  def handle_info({:updated_form, data}, socket) do
    {:noreply, assign(socket, :submitted_values, data)}
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
