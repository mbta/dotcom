defmodule Dotcom.InSeatTransfers do
  @moduledoc """
  Shared logic for presenting a trip along with any in-seat transfer trips
  (trips that the same vehicle continues on, linked via `next_trip_id`).

  These functions are generic over the kind of item in the list, so that they
  can be used both for schedule-only data (Schedule Finder) and for realtime
  data (Upcoming Departures).
  """

  alias Routes.Route
  alias Schedules.Trip

  defmodule TripHeading do
    @moduledoc """
    A headsign-route pairing marking where a trip continues as another trip
    """
    defstruct [:headsign, :route]

    @type t :: %__MODULE__{
            headsign: Trip.headsign(),
            route: Route.t()
          }
  end

  @doc """
  Given items ordered by trip (e.g. a trip followed by its in-seat transfer
  trips), marks each boundary between trips with a `TripHeading`.

  The first item of each continuing trip is the same stop as the last item of
  the preceding trip, so it is replaced by the heading rather than repeated.

  `trip_id_fn` returns the trip ID for an item, and `heading_fn` builds a
  `TripHeading` from the first item of a continuing trip.
  """
  @spec insert_trip_headings([item], (item -> Trip.id_t()), (item -> TripHeading.t())) ::
          [item | TripHeading.t()]
        when item: var
  def insert_trip_headings(items, trip_id_fn, heading_fn) do
    items
    |> Enum.chunk_by(trip_id_fn)
    |> Enum.with_index()
    |> Enum.flat_map(fn
      {trip_items, 0} -> trip_items
      {[first_item | more_items], _} -> [heading_fn.(first_item) | more_items]
    end)
  end

  @doc """
  For a list of items starting at the viewed stop, and containing in-seat
  transfer trips, cut off the list where the vehicle returns to the viewed stop
  (e.g. a round trip). The returned list ends with that stop, and never ends with
  a `TripHeading`.

  Lists without a `TripHeading` are returned unchanged.

  `viewed_stop?` returns whether a (non-heading) item is at the viewed stop.
  """
  @spec trim_at_return([item | TripHeading.t()], (item -> boolean())) ::
          [item | TripHeading.t()]
        when item: var
  def trim_at_return(items, viewed_stop?) do
    with true <- Enum.any?(items, &match?(%TripHeading{}, &1)),
         index when is_integer(index) <- return_index(items, viewed_stop?) do
      items
      |> Enum.take(index + 1)
      |> drop_trailing_heading()
    else
      _ -> items
    end
  end

  # The list starts at the viewed stop, so the second match is where the vehicle returns to it
  defp return_index(items, viewed_stop?) do
    items
    |> Enum.with_index()
    |> Enum.flat_map(fn
      {%TripHeading{}, _} -> []
      {item, index} -> if(viewed_stop?.(item), do: [index], else: [])
    end)
    |> Enum.at(1)
  end

  defp drop_trailing_heading(items) do
    case List.last(items) do
      %TripHeading{} -> Enum.drop(items, -1)
      _ -> items
    end
  end
end
