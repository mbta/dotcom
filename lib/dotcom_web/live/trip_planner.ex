defmodule DotcomWeb.Live.TripPlanner do
  @moduledoc """
  The entire Trip Planner experience, including submitting and validating user
  input, querying and parsing results from OpenTripPlanner, and rendering the
  results in a list and map format.
  """

  use DotcomWeb, :live_view

  import MbtaMetro.Components.{Feedback, Spinner}

  alias DotcomWeb.Components.LiveComponents.{TripPlannerForm, TripPlannerResultsSection}
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
        <p class="text-lg font-semibold mb-0">{submission_summary(@submitted_values)}</p>
        <p>{time_summary(@submitted_values)}</p>
        <.async_result :let={results} assign={@results}>
          <:failed :let={{:error, errors}}>
            <.error_container title="Unable to plan your trip">
              <p :for={%OpenTripPlannerClient.Error{message: message} <- errors} class="last:mb-0">
                <%= message %>
              </p>
            </.error_container>
          </:failed>
          <:loading>
            <.spinner aria_label="Waiting for results" /> Waiting for results...
          </:loading>
          <%= if results do %>
            <%= if Enum.count(results) == 0 do %>
              <.feedback kind={:warning}>No trips found.</.feedback>
            <% else %>
              <.feedback kind={:success}>
                Found {Enum.count(results)} {Inflex.inflect("way", Enum.count(results))} to go.
              </.feedback>
            <% end %>
          <% end %>
        </.async_result>
      </section>

      <.live_component
        module={TripPlannerResultsSection}
        id="trip-planner-results"
        results={@results}
        error={@error}
        map_config={@map_config}
        from={@from}
        to={@to}
      />
    </div>
    """
  end

  @impl true
  def handle_event(_event, _params, socket) do
    {:noreply, socket}
  end

  @impl true
  def handle_info({:changed_form, params}, socket) do
    new_socket =
      socket
      |> update_from_pin(params)
      |> update_to_pin(params)

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

  def handle_info(_info, socket) do
    {:noreply, socket}
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

  defp to_geojson(%{"longitude" => longitude, "latitude" => latitude})
       when longitude != "" and latitude != "" do
    [String.to_float(longitude), String.to_float(latitude)]
  end

  defp to_geojson(_coordinates) do
    []
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
