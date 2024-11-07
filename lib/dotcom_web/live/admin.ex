defmodule DotcomWeb.Live.Admin do
  use DotcomWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok,
     assign(
       socket,
       :admin_features,
       [
         %{
           url: live_path(socket, DotcomWeb.Live.Admin.TripPlanFeedback),
           title: "Trip Planner Feedback",
           description: "Find and download the latest comments and votes."
         },
         %{
           url: live_path(socket, DotcomWeb.Live.TripPlanner),
           title: "Trip Planner Preview",
           description: "WIP on the trip planner rewrite."
         }
       ]
     )}
  end

  def render(assigns) do
    ~H"""
    <section style="display: grid; gap: .5rem; grid-template-columns: 1fr 1fr 1fr">
      <%= for feature <- @admin_features do %>
        <%= link to: feature.url, class: "btn btn-secondary", style: "white-space: inherit;" do %>
          <header class="font-heading font-bold mb-3 text-2xl mt-0"><%= feature.title %></header>
          <p class="mb-0"><%= feature.description %></p>
        <% end %>
      <% end %>
      <div class="btn btn-secondary disabled" style="white-space: inherit;">
        <header class="font-heading font-bold mb-3 text-2xl mt-0">???</header>
        <p class="mb-0">Your idea here (just send a message to <code>@thecristen</code>)</p>
      </div>
    </section>
    """
  end
end
