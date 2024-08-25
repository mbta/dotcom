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
    <h1>Trip Planner <mark style="font-weight: 400">Preview</mark></h1>
    <div style="row">
      <section class="col-md-12 col-lg-4">
        <label>
          From <.algolia_autocomplete id="trip-from" placeholder="Enter a location" />
        </label>
        <label>
          To <.algolia_autocomplete id="trip-to" placeholder="Enter a location" />
        </label>
      </section>
      <div class="col-md-12 col-lg-8">
        <div id="trip-planner-map-wrapper" phx-update="ignore">
          <div style="height: 400px;" id="trip-planner-map" phx-hook="TripPlannerMap" />
        </div>
      </div>
    </div>
    """
  end
end
