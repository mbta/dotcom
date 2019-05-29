defmodule SiteWeb.ScheduleController.AllStops do
  @moduledoc "Fetch all the stops on a route and assign them as @all_stops"
  @behaviour Plug
  import Plug.Conn, only: [assign: 3]
  import SiteWeb.ScheduleController.ClosedStops, only: [add_wollaston: 4]

  @impl true
  def init([]), do: []

  @impl true
  def call(conn, opts) do
    Util.log_duration(__MODULE__, :do_call, [conn, opts])
  end

  def do_call(conn, opts) do
    repo_fn = Keyword.get(opts, :repo_fn, &Stops.Repo.by_route/3)
    stops = get_all_stops(conn, repo_fn)
    assign_all_stops(conn, stops)
  end

  @typep repo_fn :: (Routes.Route.id_t(), 0 | 1, Keyword.t() -> Stops.Repo.stops_response())
  @spec get_all_stops(Plug.Conn.t(), repo_fn) :: Stops.Repo.stops_response()
  defp get_all_stops(%{assigns: %{all_stops: all_stops}}, _repo_fn) do
    all_stops
  end

  defp get_all_stops(
         %{assigns: %{route: %{id: route_id}, direction_id: direction_id} = assigns},
         repo_fn
       ) do
    date = get_date(assigns)

    route_id
    |> repo_fn.(direction_id, date: date)
    |> maybe_add_wollaston(route_id, direction_id)
  end

  @spec maybe_add_wollaston(Stops.Repo.stops_response(), Routes.Route.id_t(), 0 | 1) ::
          Stops.Repo.stops_response()
  defp maybe_add_wollaston(stops, "Red", direction) when is_list(stops) do
    add_wollaston(stops, direction, & &1, fn _elem, stop -> stop end)
  end

  defp maybe_add_wollaston(stops, _, _) do
    stops
  end

  defp assign_all_stops(conn, stops) when is_list(stops) do
    assign(conn, :all_stops, stops)
  end

  defp assign_all_stops(conn, {:error, _error}) do
    assign(conn, :all_stops, [])
  end

  @spec get_date(map) :: Date.t()
  # We still want to be able to show stops on the line page if the date is
  # outside of the rating, so we default to using today's date
  defp get_date(%{date_in_rating?: true, date: date}) do
    date
  end

  defp get_date(%{date_in_rating?: false}) do
    Util.service_date()
  end
end
