defmodule DotcomWeb.Live.Admin do
  use DotcomWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok,
     assign(
       socket,
       :admin_features,
       [
         %{
           url: Helpers.live_path(socket, DotcomWeb.Live.Admin.TripPlanFeedback),
           title: "Trip Planner Feedback",
           description: "Find and download the latest comments and votes."
         },
         %{
           url: Helpers.live_path(socket, DotcomWeb.Live.SystemStatus),
           title: "System Status Widget Preview",
           description: "WIP on the system status widget."
         }
       ]
     )}
  end

  def render(assigns) do
    ~H"""
    <section class="grid gap-2 grid-cols-3">
      <%= for feature <- @admin_features do %>
        <%= link to: feature.url, class: "btn btn-secondary", style: "white-space: inherit;" do %>
          <header class="h3">{feature.title}</header>
          <p class="mb-0">{feature.description}</p>
        <% end %>
      <% end %>
      <div class="btn btn-secondary disabled" style="white-space: inherit;">
        <header class="h3">???</header>
        <p class="mb-0">Your idea here (just send a message to <code>@thecristen</code>)</p>
      </div>
    </section>
    """
  end
end
