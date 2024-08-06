defmodule DotcomWeb.Live.TripPlanner do
  @moduledoc """
  The entire Trip Planner experience, including submitting and validating user
  input, querying and parsing results from OpenTripPlanner, and rendering the
  results in a list and map format.
  """
  use DotcomWeb, :live_view

  def mount(params, _session, socket) do
    form = params
      |> Map.get("plan", %{})
      |> TripPlanner.Form.new_with_defaults()
    {:ok, assign(socket, :form, form)}
  end

  def render(assigns) do
    ~H"""
      <h1>Trip Planner</h1>
      <p>(develop the <a href="https://knowyourmeme.com/memes/how-to-draw-an-owl">rest of the owl</a> here)</p>
      <div style="display: grid; grid-template-columns: 1fr 3fr; gap: .5rem;">
        <.form
          :let={f}
          for={@form}
          phx-change="change_form"
          phx-submit="save_form"
        >
          <.live_component
            id="trip-plan-from"
            module={DotcomWeb.LiveComponents.LocationSelectbox}
            field={f[:from]}
            title="From"
            on_change={fn location ->
              send(self(), {:update_location, :origin, location})
            end}
            required
          />
          <div id="trip-plan-reverse-control">
            <div class="c-trip-plan-widget__reverse-control">
              <%= fa "long-arrow-down" %>
              <%= fa "long-arrow-up" %>
            </div>
          </div>
          <.live_component
            id="trip-plan-to"
            module={DotcomWeb.LiveComponents.LocationSelectbox}
            field={f[:to]}
            title="To"
            on_change={fn location ->
              send(self(), {:update_location, :destination, location})
            end}
            required
          />

          <button id="trip-plan__submit" type="submit" class="btn btn-primary hidden-print c-trip-plan-widget__submit">
          Get trip suggestions
          </button>
        </.form>

        <div id="trip-planner-map-wrapper" phx-update="ignore">
          <div style="height: 400px;" id="trip-planner-map" phx-hook="LeafletMap" />
        </div>
      </div>
    """
  end

  def handle_info({:update_location, origin_or_destination, location}, socket) do
    IO.inspect(location, label: origin_or_destination)
    {:noreply, socket}
  end
end
