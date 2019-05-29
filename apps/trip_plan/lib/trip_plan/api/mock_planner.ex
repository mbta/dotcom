defmodule TripPlan.Api.MockPlanner do
  @behaviour TripPlan.Api

  alias TripPlan.{Itinerary, NamedPosition, Leg, PersonalDetail, TransitDetail}

  @max_distance 1000
  @max_duration 30 * 60

  @impl true
  def plan(from, to, opts) do
    plan(from, to, opts, self())
  end

  def plan(%NamedPosition{name: "Geocoded path_not_found"}, _to, _opts, _) do
    {:error, :path_not_found}
  end

  def plan(%NamedPosition{name: "Geocoded Accessible error"} = from, to, opts, p) do
    if Keyword.get(opts, :wheelchair_accessible?) do
      {:error, :not_accessible}
    else
      plan(%{from | name: "Accessible error"}, to, opts, p)
    end
  end

  def plan(%NamedPosition{name: "Geocoded Inaccessible error"} = from, to, opts, p) do
    if Keyword.get(opts, :wheelchair_accessible?) do
      plan(%{from | name: "Inaccessible error"}, to, opts, p)
    else
      {:error, :not_accessible}
    end
  end

  def plan(%NamedPosition{name: "Timeout error"}, _, _, _) do
    :timer.sleep(:infinity)
  end

  def plan(from, to, opts, parent) do
    start = DateTime.utc_now()
    duration = :rand.uniform(@max_duration)
    stop = Timex.shift(start, seconds: duration)
    midpoint_stop = without_stop_ids([from.stop_id, to.stop_id], &random_stop/0)
    midpoint_time = Timex.shift(start, seconds: Integer.floor_div(duration, 2))

    itineraries = [
      %Itinerary{
        start: start,
        stop: stop,
        legs: [
          personal_leg(from, midpoint_stop, start, midpoint_time),
          transit_leg(midpoint_stop, to, midpoint_time, stop)
        ],
        accessible?: Keyword.get(opts, :wheelchair_accessible?, false)
      }
    ]

    send(parent, {:planned_trip, {from, to, opts}, {:ok, itineraries}})
    {:ok, itineraries}
  end

  @doc """
  Extend a plan with an additional transit leg

  Used in tests to make longer trip plans.
  """
  @spec add_transit_leg(Itinerary.t()) :: Itinerary.t()
  def add_transit_leg(%Itinerary{} = itinerary) do
    new_to = random_stop()
    new_stop = Timex.shift(itinerary.stop, seconds: :rand.uniform(@max_duration))
    new_leg = transit_leg(Itinerary.destination(itinerary), new_to, itinerary.stop, new_stop)
    %{itinerary | stop: new_stop, legs: itinerary.legs ++ [new_leg]}
  end

  def random_stop(fields \\ []) do
    stop_id = Enum.random(["place-sstat", "North Station", "place-bbsta"])
    stop = Stops.Repo.get!(stop_id)

    fields =
      Keyword.merge(
        [
          name: stop.name,
          stop_id: stop_id,
          latitude: stop.latitude,
          longitude: stop.longitude
        ],
        fields
      )

    struct!(NamedPosition, fields)
  end

  def personal_leg(from, to, start, stop) do
    distance = :rand.uniform() * @max_distance

    %Leg{
      start: start,
      stop: stop,
      from: from,
      to: to,
      mode: %PersonalDetail{
        distance: distance,
        steps: [random_step(), random_step()]
      }
    }
  end

  def random_step do
    distance = :rand.uniform() * @max_distance
    absolute_direction = Enum.random(~w(north east south west)a)
    relative_direction = Enum.random(~w(left right depart continue)a)
    street_name = "Random Street"

    %PersonalDetail.Step{
      distance: distance,
      relative_direction: relative_direction,
      absolute_direction: absolute_direction,
      street_name: street_name
    }
  end

  def transit_leg(from, to, start, stop) do
    route_id = Enum.random(~w(1 Blue CR-Lowell)s)
    schedules = Schedules.Repo.by_route_ids([route_id], stop_sequences: :first)
    trip_id = List.first(schedules).trip.id

    %Leg{
      start: start,
      stop: stop,
      from: from,
      to: to,
      mode: %TransitDetail{
        route_id: route_id,
        trip_id: trip_id,
        intermediate_stop_ids:
          Enum.random([
            [List.first(schedules).stop.id],
            []
          ])
      }
    }
  end

  defp without_stop_ids(excluded_stop_ids, function) do
    # ensure that the stop ID returned from function doesn't have stop ID in
    # the provided list.
    excluded_stop_ids = Enum.reject(excluded_stop_ids, &is_nil/1)
    stop = function.()

    if stop.stop_id in excluded_stop_ids do
      without_stop_ids(excluded_stop_ids, function)
    else
      stop
    end
  end

  def stops_nearby(%NamedPosition{name: "Geocoded stops_nearby error"}), do: {:error, "error"}
  def stops_nearby(%NamedPosition{name: "Geocoded stops_nearby no_results"}), do: {:ok, []}

  def stops_nearby(%NamedPosition{name: "Timeout error"}) do
    :timer.sleep(:infinity)
  end

  def stops_nearby(_location) do
    {:ok, [random_stop(), random_stop(), random_stop()]}
  end
end
