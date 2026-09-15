defmodule DotcomWeb.Live.StopUpcomingArrivals do
  @moduledoc """
  Upcoming arrivals for a station or stop
  """
  use DotcomWeb, :live_view

  alias Phoenix.LiveView

  @impl LiveView
  def mount(_params, %{"stop_id" => stop_id}, socket) do
    {:ok,
     socket
     |> assign(:stop_id, stop_id)}
  end

  @impl LiveView
  def render(assigns) do
    ~H"""
    <p>Something {@stop_id}</p>
    """
  end
end
