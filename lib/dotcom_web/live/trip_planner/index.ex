defmodule DotcomWeb.Live.TripPlanner do
  use DotcomWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
      <h1>Trip Planner</h1>
      <p>(develop the <a href="https://knowyourmeme.com/memes/how-to-draw-an-owl">rest of the owl</a> here)</p>
      <div style="display: grid; grid-template-columns: 1fr 3fr; gap: .5rem;">
        <section>
          <label>From
          <.algolia_autocomplete
            id="trip-from"
            algolia_indexes={[:stops]}
            geolocation={true}
            locations_count={5}
            placeholder="Enter a location"
            popular_locations={true}
            initial_state={true}
          />
          </label>
          <label>To
          <.algolia_autocomplete
            id="trip-to"
            algolia_indexes={[:stops]}
            geolocation={true}
            locations_count={5}
            placeholder="Enter a location"
            popular_locations={true}
            initial_state={true}
          />
          </label>
        </section>
        <div id="trip-planner-map-wrapper" phx-update="ignore">
          <div style="height: 400px;" id="trip-planner-map" phx-hook="LeafletMap" />
        </div>
      </div>
    """
  end
end
