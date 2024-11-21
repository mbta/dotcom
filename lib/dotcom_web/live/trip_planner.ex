defmodule DotcomWeb.Live.TripPlanner do
  @moduledoc """
  The entire Trip Planner experience, including submitting and validating user
  input, querying and parsing results from OpenTripPlanner, and rendering the
  results in a list and map format.
  """

  use DotcomWeb, :live_view

  import DotcomWeb.Components.TripPlanner.ItineraryGroup, only: [itinerary_group: 1]
  import MbtaMetro.Components.{Feedback, Spinner}

  alias DotcomWeb.Components.LiveComponents.TripPlannerForm
  alias Dotcom.TripPlan.{AntiCorruptionLayer, InputForm.Modes, ItineraryGroups}

  @form_id "trip-planner-form"

  @map_config Application.compile_env!(:mbta_metro, :map)

  @impl true
  def mount(params, _session, socket) do
    socket =
      socket
      |> assign(:error, nil)
      |> assign(:form_name, @form_id)
      |> assign(:form_values, AntiCorruptionLayer.convert_old_params(params))
      |> assign(:map_config, @map_config)
      |> assign(:from, [])
      |> assign(:to, [])
      |> assign(:submitted_values, nil)
      |> assign_async(:results, fn ->
        {:ok, %{results: nil}}
      end)

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
        form_values={@form_values}
      />
      <section :if={@submitted_values} class="mt-2 mb-6">
        <p class="text-lg font-semibold mb-0"><%= submission_summary(@submitted_values) %></p>
        <p><%= time_summary(@submitted_values) %></p>
        <.async_result :let={results} assign={@results}>
          <:failed :let={{:error, _reason}}>
            <.feedback kind={:error}>Something else went wrong.</.feedback>
          </:failed>
          <:loading>
            <.spinner aria_label="Waiting for results" /> Waiting for results...
          </:loading>
          <%= if results do %>
            <%= if Enum.count(results) == 0 do %>
              <.feedback kind={:warning}>No trips found.</.feedback>
            <% else %>
              <.feedback kind={:success}>
                Found <%= Enum.count(results) %> <%= Inflex.inflect("way", Enum.count(results)) %> to go.
              </.feedback>
            <% end %>
          <% end %>
        </.async_result>
      </section>
      <section class="flex w-full border border-solid border-slate-400">
        <div :if={@error} class="w-full p-4 text-rose-400">
          <%= inspect(@error) %>
        </div>
        <.async_result :let={results} assign={@results}>
          <div :if={results} class="w-full p-4">
            <.itinerary_group :for={result <- results} {result} />
          </div>
        </.async_result>
        <.live_component
          module={MbtaMetro.Live.Map}
          id="trip-planner-map"
          class="h-96 w-full relative overflow-none"
          config={@map_config}
          pins={[@from, @to]}
        />
      </section>
    </div>
    """
  end

  @impl true
  def handle_event(event, params, socket) do
    IO.inspect({event, params}, label: "LV: Fallback handle_event")
    {:noreply, socket}
  end

  @impl true
  def handle_info({:changed_form, params}, socket) do
    new_socket =
      socket
      |> update_pins(params)

    {:noreply, new_socket}
  end

  @impl true
  def handle_info({:updated_form, %Dotcom.TripPlan.InputForm{} = data}, socket) do
    socket =
      socket
      |> assign(:submitted_values, data)
      |> assign(:results, nil)
      |> assign_async(:results, fn ->
        case Dotcom.TripPlan.OpenTripPlanner.plan(data) do
          {:ok, itineraries} ->
            {:ok, %{results: ItineraryGroups.from_itineraries(itineraries)}}

          error ->
            error
        end
      end)

    {:noreply, socket}
  end

  def handle_info(
        {:autocomplete_change, %{field_name: field_name, location: location}},
        %{assigns: %{form_values: form_values}} = socket
      ) do
    new_form_values = form_values |> Map.put(to_string(field_name), location)

    {:noreply,
     socket
     |> assign(:form_values, new_form_values)
     |> update_pins(new_form_values)}
  end

  def handle_info(info, socket) do
    IO.inspect(info, label: "Fallback handle_info")
    {:noreply, socket}
  end

  defp update_pins(socket, params) do
    socket
    |> update_from_pin(params)
    |> update_to_pin(params)
  end

  defp update_from_pin(socket, %{"from" => from}) do
    assign(socket, :from, to_geojson(from))
  end

  defp update_from_pin(socket, _params) do
    socket
  end

  defp update_to_pin(socket, %{"to" => to}) do
    assign(socket, :to, to_geojson(to))
  end

  defp update_to_pin(socket, _params) do
    socket
  end

  defp to_geojson(%{"longitude" => longitude, "latitude" => latitude}) do
    with {:ok, parsed_lat} <- to_float(latitude),
         {:ok, parsed_long} <- to_float(longitude) do
      [parsed_long, parsed_lat]
    else
      _ -> []
    end
  end

  defp to_geojson(_coordinates) do
    []
  end

  defp to_float(""), do: :error
  defp to_float(nil), do: :error
  defp to_float(arg) when is_float(arg), do: {:ok, arg}

  defp to_float(arg) do
    case Float.parse(arg) do
      {result, ""} -> {:ok, result}
      _ -> :error
    end
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
