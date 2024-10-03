defmodule Dotcom.TripPlan.ItineraryRow do
  @moduledoc false

  alias Dotcom.TripPlan.{
    IntermediateStop,
    Leg,
    NamedPosition,
    PersonalDetail,
    TransitDetail
  }

  alias Routes.Route

  defstruct stop: {nil, nil},
            route: nil,
            trip: nil,
            departure: DateTime.from_unix!(-1),
            transit?: false,
            steps: [],
            additional_routes: [],
            alerts: [],
            distance: 0.0,
            duration: 0

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  @typep name_and_id :: {String.t(), String.t() | nil}
  @typep step :: String.t()
  @type t :: %__MODULE__{
          stop: name_and_id,
          transit?: boolean,
          route: Route.t() | nil,
          trip: Schedules.Trip.t() | nil,
          departure: DateTime.t(),
          steps: [step],
          additional_routes: [Route.t()],
          alerts: [Alerts.Alert.t()],
          distance: Float.t(),
          duration: Integer.t()
        }

  defmodule Dependencies do
    @moduledoc false

    defstruct trip_mapper: &Schedules.Repo.trip/1,
              alerts_repo: &Alerts.Repo.all/1

    @type trip_mapper :: (Schedules.Trip.id_t() -> Schedules.Trip.t() | nil)
    @type alerts_repo :: (DateTime.t() -> [Alerts.Alert.t()] | nil)

    @type t :: %__MODULE__{
            trip_mapper: trip_mapper,
            alerts_repo: alerts_repo
          }
  end

  def route_id(%__MODULE__{route: %Route{id: id}}), do: id
  def route_id(_row), do: nil

  def route_type(%__MODULE__{route: %Route{type: type}}), do: type
  def route_type(_row), do: nil

  @doc """
  Returns the name of the route for the given row.
  If there is an external agency name, we use the long name.
  If it is a bus, we use the short name.
  For all others, we use the long name.
  """
  def route_name(%__MODULE__{route: %Route{external_agency_name: agency, long_name: long_name}})
      when is_binary(agency) and is_binary(long_name),
      do: long_name

  def route_name(%__MODULE__{route: %Route{name: name, type: 3}})
      when is_binary(name),
      do: "#{name} bus"

  def route_name(%__MODULE__{route: %Route{long_name: long_name}})
      when is_binary(long_name),
      do: long_name

  def route_name(%__MODULE__{route: %Route{name: name}}), do: name
  def route_name(_row), do: nil

  @doc """
  Builds an ItineraryRow struct from the given leg and options
  """
  @spec from_leg(Leg.t(), Leg.t() | nil) :: t
  def from_leg(leg, next_leg) do
    transit? = Leg.transit?(leg)
    route = if(transit?, do: leg.mode.route)

    trip =
      if(route && is_nil(route.external_agency_name), do: leg |> Leg.trip_id() |> parse_trip_id())

    stop = name_from_position(leg.from)

    %__MODULE__{
      stop: stop,
      transit?: Leg.transit?(leg),
      route: route,
      trip: trip,
      departure: leg.start,
      steps: get_steps(leg.mode, next_leg),
      additional_routes: get_additional_routes(route, trip, leg, stop),
      duration: leg.duration,
      distance: leg.distance
    }
  end

  @spec fetch_alerts(t, [Alerts.Alert.t()]) :: t
  def fetch_alerts(row, alerts)

  def fetch_alerts(%__MODULE__{} = row, []) do
    row
  end

  def fetch_alerts(%__MODULE__{transit?: false, stop: {_name, <<stop_id::binary>>}} = row, alerts) do
    %{row | alerts: Alerts.Stop.match(alerts, stop_id)}
  end

  def fetch_alerts(%__MODULE__{transit?: false} = row, _) do
    row
  end

  def fetch_alerts(%__MODULE__{transit?: true} = row, alerts) do
    entity = build_alert_informed_entity(row)
    row_alerts = Alerts.Match.match(alerts, entity, row.departure)
    steps = fetch_alerts_for_steps(row, alerts)
    %{row | alerts: row_alerts, steps: steps}
  end

  @spec build_alert_informed_entity(t) :: Alerts.InformedEntity.t()
  defp build_alert_informed_entity(
         %__MODULE__{
           route: %Routes.Route{} = route,
           stop: {_name, stop_id}
         } = row
       ) do
    do_build_alert_informed_entity(row, %Alerts.InformedEntity{
      route: route.id,
      route_type: route.type,
      stop: stop_id
    })
  end

  defp build_alert_informed_entity(%__MODULE__{stop: {_name, stop_id}} = row) do
    do_build_alert_informed_entity(row, %Alerts.InformedEntity{stop: stop_id})
  end

  @spec do_build_alert_informed_entity(t, Alerts.InformedEntity.t()) :: Alerts.InformedEntity.t()
  defp do_build_alert_informed_entity(%__MODULE__{trip: %Schedules.Trip{} = trip}, ie) do
    %{ie | trip: trip.id, direction_id: trip.direction_id}
  end

  defp do_build_alert_informed_entity(%__MODULE__{}, ie) do
    ie
  end

  def fetch_alerts_for_steps(%__MODULE__{steps: steps}, alerts) do
    Enum.map(steps, &match_step(&1, alerts))
  end

  def match_step(%IntermediateStop{stop: nil} = step, _alerts) do
    step
  end

  def match_step(step, alerts) do
    %{step | alerts: Alerts.Stop.match(alerts, step.stop.id, activities: ~w(ride)a)}
  end

  def intermediate_alerts?(%__MODULE__{steps: steps}) do
    Enum.any?(steps, fn step -> step.alerts != [] end)
  end

  @spec name_from_position(NamedPosition.t()) ::
          {String.t(), String.t()}
  def name_from_position(%NamedPosition{stop: %Stops.Stop{id: id}, name: name}) do
    {name, id}
  end

  def name_from_position(%NamedPosition{name: name}) do
    {name, nil}
  end

  @spec get_steps(Leg.mode(), Leg.t()) :: [IntermediateStop.t()]

  defp get_steps(%PersonalDetail{steps: steps}, %Leg{mode: %TransitDetail{}}),
    do: Enum.map(steps, &format_personal_to_transit_step/1)

  defp get_steps(%PersonalDetail{steps: steps}, _next_leg),
    do: Enum.map(steps, &format_personal_to_personal_step/1)

  defp get_steps(%TransitDetail{intermediate_stops: stops}, _next_leg) do
    for stop <- stops, stop do
      %IntermediateStop{
        description: stop.name,
        stop: stop
      }
    end
  end

  @spec parse_trip_id(:error | {:ok, String.t()}) ::
          Schedules.Trip.t() | nil
  defp parse_trip_id(:error), do: nil
  defp parse_trip_id({:ok, trip_id}), do: Schedules.Repo.trip(trip_id)

  defp format_personal_to_personal_step(%{relative_direction: :DEPART, street_name: "Transfer"}),
    do: %IntermediateStop{description: "Depart"}

  defp format_personal_to_personal_step(step), do: format_personal_step(step)

  defp format_personal_to_transit_step(%{relative_direction: :DEPART, street_name: "Transfer"}),
    do: %IntermediateStop{description: "Transfer"}

  defp format_personal_to_transit_step(step), do: format_personal_step(step)

  defp format_personal_step(step) do
    %IntermediateStop{
      description: OpenTripPlannerClient.Schema.Step.walk_summary(step)
    }
  end

  @spec get_additional_routes(
          Route.t(),
          Schedules.Trip.t(),
          Leg.t(),
          name_and_id
        ) :: [Route.t()]
  defp get_additional_routes(
         %Route{id: "Green" <> _line = route_id},
         trip,
         leg,
         {_name, from_stop_id}
       )
       when not is_nil(trip) do
    stop_pairs = GreenLine.stops_on_routes(trip.direction_id)
    {_to_stop_name, to_stop_id} = name_from_position(leg.to)
    available_routes(route_id, from_stop_id, to_stop_id, stop_pairs)
  end

  defp get_additional_routes(_route, _trip, _leg, _from), do: []

  defp available_routes(current_route_id, from_stop_id, to_stop_id, stop_pairs) do
    GreenLine.branch_ids()
    |> List.delete(current_route_id)
    |> Enum.filter(&both_stops_on_route?(&1, from_stop_id, to_stop_id, stop_pairs))
    |> Enum.map(&@routes_repo.get/1)
  end

  defp both_stops_on_route?(route_id, from_stop_id, to_stop_id, stop_pairs) do
    GreenLine.stop_on_route?(from_stop_id, route_id, stop_pairs) &&
      GreenLine.stop_on_route?(to_stop_id, route_id, stop_pairs)
  end
end
