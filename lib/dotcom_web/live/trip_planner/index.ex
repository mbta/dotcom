defmodule DotcomWeb.Live.TripPlanner do
  @moduledoc """
  The entire Trip Planner experience, including submitting and validating user
  input, querying and parsing results from OpenTripPlanner, and rendering the
  results in a list and map format.
  """

  use DotcomWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <h1>Trip Planner</h1>
    <p>
      (develop the <a href="https://knowyourmeme.com/memes/how-to-draw-an-owl">rest of the owl</a>
      here)
    </p>
    <div style="display: grid; grid-template-columns: 1fr 3fr; gap: .5rem;">
      <section>
        <label>
          From <.algolia_autocomplete id="trip-from" placeholder="Enter a location" />
        </label>
        <label>
          To <.algolia_autocomplete id="trip-to" placeholder="Enter a location" />
        </label>
      </section>
      <div id="trip-planner-map-wrapper" phx-update="ignore">
        <div style="height: 400px;" id="trip-planner-map" phx-hook="LeafletMap" />
      </div>
    </div>
    """
  end
end
