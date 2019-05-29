defmodule SiteWeb.ScheduleController.ExcludedStops do
  @moduledoc """

  Fetch unavailable origin/destination stops for the given route. If no
  origin is set then we don't know which destinations are unavailable yet,
  and only the last origin in @all_stops is excluded. If the route is the red
  line on the Ashmont or Braintree branches, exclude destinations on the
  other branch, and depending on the direction, either Ashmont/Braintree or
  Alewife are unavailable as origins.

  """
  @behaviour Plug
  import Plug.Conn, only: [assign: 3]

  @impl true
  def init([]), do: []

  @impl true
  def call(
        %Plug.Conn{
          assigns: %{
            route: %{id: route_id},
            direction_id: direction_id,
            all_stops: all_stops,
            origin: origin
          }
        } = conn,
        []
      ) do
    origin_id = origin && origin.id

    conn
    |> assign(
      :excluded_origin_stops,
      ExcludedStops.excluded_origin_stops(direction_id, route_id, all_stops)
    )
    |> assign(
      :excluded_destination_stops,
      ExcludedStops.excluded_destination_stops(route_id, origin_id)
    )
  end

  def call(conn, []) do
    conn
    |> assign(:excluded_origin_stops, [])
    |> assign(:excluded_destination_stops, [])
  end
end
