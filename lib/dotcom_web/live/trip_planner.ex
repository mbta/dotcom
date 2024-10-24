defmodule DotcomWeb.Live.TripPlanner do
  @moduledoc """
  The entire Trip Planner experience, including submitting and validating user
  input, querying and parsing results from OpenTripPlanner, and rendering the
  results in a list and map format.
  """

  use DotcomWeb, :live_view

  alias DotcomWeb.Components.LiveComponents.TripPlannerForm
  alias Dotcom.TripPlan.{InputForm.Modes, ItineraryGroups}

  import DotcomWeb.Components.TripPlanner.ItineraryGroup, only: [itinerary_group: 1]
  import MbtaMetro.Components.{Feedback, Spinner}

  @form_id "trip-planner-form"

  @impl true
  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(:form_name, @form_id)
      |> assign(:submitted_values, nil)
      |> assign(:error, nil)
      |> assign_async(:groups, fn ->
        {:ok, %{groups: nil}}
      end)

    {:ok, socket}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <h1>Trip Planner <mark style="font-weight: 400">Preview</mark></h1>
    <div style="row">
      <.live_component module={TripPlannerForm} id={@form_name} form_name={@form_name} />
      <section :if={@submitted_values} class="mt-2 mb-6">
        <p class="text-lg font-semibold mb-0"><%= submission_summary(@submitted_values) %></p>
        <p><%= time_summary(@submitted_values) %></p>
        <.async_result :let={groups} assign={@groups}>
          <:failed :let={{:error, reason}}>
            <.feedback kind={:error}>
              <%= Phoenix.Naming.humanize(reason) %>
            </.feedback>
          </:failed>
          <:loading>
            <.spinner aria_label="Waiting for results" /> Waiting for results...
          </:loading>
          <%= if groups do %>
            <%= if Enum.count(groups) == 0 do %>
              <.feedback kind={:warning}>No trips found.</.feedback>
            <% else %>
              <.feedback kind={:success}>
                Found <%= Enum.count(groups) %> <%= Inflex.inflect("way", Enum.count(groups)) %> to go.
              </.feedback>
            <% end %>
          <% end %>
        </.async_result>
      </section>
      <section class="flex w-full border border-solid border-slate-400">
        <div :if={@error} class="w-full p-4 text-rose-400">
          <%= inspect(@error) %>
        </div>
        <.async_result :let={groups} assign={@groups}>
          <div :if={groups} class="w-full p-4">
            <.itinerary_group :for={group <- groups} group={group} />
          </div>
        </.async_result>
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
    socket =
      socket
      |> assign(:submitted_values, data)
      |> assign(:groups, nil)
      |> assign_async(:groups, fn ->
        case Dotcom.TripPlan.OpenTripPlanner.plan(data) do
          {:ok, itineraries} ->
            Process.sleep(1200)
            {:ok, %{groups: ItineraryGroups.from_itineraries(itineraries)}}

          error ->
            error
        end
      end)

    {:noreply, socket}
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

  defp submission_summary(%{from: %{name: from_name}, to: %{name: to_name}, modes: modes}) do
    "Planning trips from #{from_name} to #{to_name} using #{Modes.selected_modes(modes)}"
  end

  defp time_summary(%{datetime_type: datetime_type, datetime: datetime}) do
    preamble = if datetime_type == :arrive_by, do: "Arriving by ", else: "Leaving at "
    time_description = Timex.format!(datetime, "{h12}:{m}{am}")
    date_description = Timex.format!(datetime, "{WDfull}, {Mfull} {D}")
    preamble <> time_description <> " on " <> date_description
  end
end
