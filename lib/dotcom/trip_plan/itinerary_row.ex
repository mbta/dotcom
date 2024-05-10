defmodule Dotcom.TripPlan.ItineraryRow do
  @moduledoc false

  alias Routes.Route
  alias Dotcom.TripPlan.IntermediateStop
  alias TripPlan.{Leg, NamedPosition, PersonalDetail, TransitDetail}
  alias TripPlan.PersonalDetail.Step

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @typep name_and_id :: {String.t(), String.t() | nil}
  @typep step :: String.t()

  defmodule Dependencies do
    @moduledoc false

    @type route_mapper :: (Routes.Route.id_t() -> Routes.Route.t() | nil)
    @type trip_mapper :: (Schedules.Trip.id_t() -> Schedules.Trip.t() | nil)
    @type alerts_repo :: (DateTime.t() -> [Alerts.Alert.t()] | nil)

    defstruct route_mapper: &Routes.Repo.get/1,
              trip_mapper: &Schedules.Repo.trip/1,
              alerts_repo: &Alerts.Repo.all/1

    @type t :: %__MODULE__{
            route_mapper: route_mapper,
            trip_mapper: trip_mapper,
            alerts_repo: alerts_repo
          }
  end

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

  def route_id(%__MODULE__{route: %Route{id: id}}), do: id
  def route_id(_row), do: nil

  def route_type(%__MODULE__{route: %Route{type: type}}), do: type
  def route_type(_row), do: nil

  def route_name(%__MODULE__{route: %Route{name: name}}), do: name
  def route_name(_row), do: nil

  @doc """
  Builds an ItineraryRow struct from the given leg and options
  """
  @spec from_leg(Leg.t(), Dependencies.t(), Leg.t() | nil) :: t
  def from_leg(leg, deps, next_leg) do
    trip = leg |> Leg.trip_id() |> parse_trip_id(deps.trip_mapper)
    route = leg |> Leg.route_id() |> parse_route_id(deps.route_mapper)
    stop = name_from_position(leg.from)

    %__MODULE__{
      stop: stop,
      transit?: Leg.transit?(leg),
      route: route,
      trip: trip,
      departure: leg.start,
      steps: get_steps(leg.mode, next_leg),
      additional_routes: get_additional_routes(route, trip, leg, stop, deps),
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

  def match_step(%IntermediateStop{stop_id: nil} = step, _alerts) do
    step
  end

  def match_step(step, alerts) do
    %{step | alerts: Alerts.Stop.match(alerts, step.stop_id, activities: ~w(ride)a)}
  end

  def intermediate_alerts?(%__MODULE__{steps: steps}) do
    Enum.any?(steps, fn step -> step.alerts != [] end)
  end

  @spec name_from_position(NamedPosition.t()) ::
          {String.t(), String.t()}
  def name_from_position(%NamedPosition{stop_id: stop_id, name: name})
      when not is_nil(stop_id) do
    case @stops_repo.get_parent(stop_id) do
      nil -> {name, nil}
      stop -> {stop.name, stop.id}
    end
  end

  def name_from_position(%NamedPosition{name: name}) do
    {name, nil}
  end

  @spec get_steps(Leg.mode(), Leg.t()) :: [IntermediateStop.t()]

  defp get_steps(%PersonalDetail{steps: steps}, %Leg{mode: %TransitDetail{}}),
    do: Enum.map(steps, &format_personal_to_transit_step/1)

  defp get_steps(%PersonalDetail{steps: steps}, _next_leg),
    do: Enum.map(steps, &format_personal_to_personal_step/1)

  defp get_steps(%TransitDetail{intermediate_stop_ids: stop_ids}, _next_leg) do
    for {:ok, stop} <- Task.async_stream(stop_ids, fn id -> @stops_repo.get_parent(id) end),
        stop do
      %IntermediateStop{
        description: stop.name,
        stop_id: stop.id
      }
    end
  end

  @spec parse_route_id(:error | {:ok, String.t()}, Dependencies.route_mapper()) ::
          Routes.Route.t() | nil
  defp parse_route_id(:error, _route_mapper), do: nil
  defp parse_route_id({:ok, route_id}, route_mapper), do: route_mapper.(route_id)

  @spec parse_trip_id(:error | {:ok, String.t()}, Dependencies.trip_mapper()) ::
          Schedules.Trip.t() | nil
  defp parse_trip_id(:error, _trip_mapper), do: nil
  defp parse_trip_id({:ok, trip_id}, trip_mapper), do: trip_mapper.(trip_id)

  defp format_personal_to_personal_step(%{relative_direction: :depart, street_name: "Transfer"}),
    do: %IntermediateStop{description: "Depart"}

  defp format_personal_to_personal_step(step), do: format_personal_step(step)

  defp format_personal_to_transit_step(%{relative_direction: :depart, street_name: "Transfer"}),
    do: %IntermediateStop{description: "Transfer"}

  defp format_personal_to_transit_step(step), do: format_personal_step(step)

  defp format_personal_step(step) do
    %IntermediateStop{
      description: [
        Step.human_relative_direction(step.relative_direction),
        " ",
        Step.human_relative_preposition(step.relative_direction),
        " ",
        step.street_name
      ]
    }
  end

  @spec get_additional_routes(
          Route.t(),
          Schedules.Trip.t(),
          Leg.t(),
          name_and_id,
          Dependencies.t()
        ) :: [Route.t()]
  defp get_additional_routes(
         %Route{id: "Green" <> _line = route_id},
         trip,
         leg,
         {_name, from_stop_id},
         deps
       )
       when not is_nil(trip) do
    stop_pairs = GreenLine.stops_on_routes(trip.direction_id)
    {_to_stop_name, to_stop_id} = name_from_position(leg.to)
    available_routes(route_id, from_stop_id, to_stop_id, stop_pairs, deps.route_mapper)
  end

  defp get_additional_routes(_route, _trip, _leg, _from, _deps), do: []

  defp available_routes(current_route_id, from_stop_id, to_stop_id, stop_pairs, route_mapper) do
    GreenLine.branch_ids()
    |> List.delete(current_route_id)
    |> Enum.filter(&both_stops_on_route?(&1, from_stop_id, to_stop_id, stop_pairs))
    |> Enum.map(route_mapper)
  end

  defp both_stops_on_route?(route_id, from_stop_id, to_stop_id, stop_pairs) do
    GreenLine.stop_on_route?(from_stop_id, route_id, stop_pairs) &&
      GreenLine.stop_on_route?(to_stop_id, route_id, stop_pairs)
  end
end
