defmodule SiteWeb.ScheduleController.ClosedStops do
  import SiteWeb.ViewHelpers, only: [cms_static_page_path: 2]

  @spec wollaston_stop(Stops.Stop.t() | Stops.RouteStop.t()) ::
          Stops.Stop.t() | Stops.RouteStop.t()
  def wollaston_stop(stop) do
    reason = "closed for renovation"

    %{
      stop
      | name: "Wollaston",
        id: "place-wstn",
        closed_stop_info: %Stops.Stop.ClosedStopInfo{
          reason: reason,
          info_link: wollaston_update_link()
        }
    }
  end

  def add_wollaston(stops, direction_id, extract_fn, build_fn) do
    Enum.flat_map(
      stops,
      fn elem -> insert_wollaston_node(elem, direction_id, extract_fn, build_fn) end
    )
  end

  defp insert_wollaston_node(elem, direction_id, extract_fn, build_fn) do
    stop = extract_fn.(elem)
    new_stop = wollaston_stop(stop)

    cond do
      stop.id == "place-qnctr" && direction_id == 0 ->
        [build_fn.(elem, new_stop), elem]

      stop.id == "place-nqncy" && direction_id == 1 ->
        [build_fn.(elem, new_stop), elem]

      true ->
        [elem]
    end
  end

  def wollaston_update_link do
    cms_static_page_path(SiteWeb.Endpoint, "/wollaston-learn-more")
  end
end
