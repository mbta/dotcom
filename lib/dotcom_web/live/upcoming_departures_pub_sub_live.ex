defmodule DotcomWeb.UpcomingDeparturesPubSubStateLive do
  @moduledoc """
  A page that shows some stuff about who is looking at predictions
  """

  use DotcomWeb, :live_view

  alias Dotcom.Playground.UpcomingDeparturesPubsub

  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(:pub_sub_state, UpcomingDeparturesPubsub.state())}
  end

  def render(assigns) do
    ~H"""
    <div class="container">
      <p>Note: This page does not live update. You'll have to refresh to get updated info</p>

      <pre>{inspect @pub_sub_state, pretty: true}</pre>
    </div>
    """
  end
end
