defmodule Dotcom.SystemStatus.CommuterRail do
  @moduledoc """
  Provides a simple view into the status of the
  commuter rail system, for each line, showing whether it's running normally,
  or whether there are alerts that impact service.
  """

  import Dotcom.Alerts, only: [service_impacting_alert?: 1]
  import Dotcom.SystemStatus, only: [active_now_or_later_on_day?: 2]

  alias Alerts.Alert
  alias Routes.Route

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @repos_module Application.compile_env!(:dotcom, :repo_modules)

  @alerts_repo @repos_module[:alerts]
  @routes_repo @repos_module[:routes]
  @schedules_repo @repos_module[:schedules]
  @schedules_condensed_repo @repos_module[:schedules_condensed]

  @typep trip_info_t() ::
           {:trip,
            %{
              direction_id: 0 | 1,
              first_departure_time: DateTime.t(),
              first_stop: Stops.Stop.t(),
              last_stop: Stops.Stop.t(),
              name: String.t()
            }}
           | {:direction, %{direction_id: 0 | 1}}
           | :all

  @typep train_impact_t() ::
           %{
             alert: Alert.t(),
             trip_info: trip_info_t()
           }

  @typep status_for_route_t() ::
           :normal
           | :no_scheduled_service
           | %{
               cancellations: [train_impact_t()],
               delays: [train_impact_t()],
               service_alerts: [Alert.t()]
             }

  @doc """
  Returns a map where the key is the Route ID of a commuter rail line
  and the value includes alerts grouped by effect, the name of the line,
  and whether the line is running service today.
  """
  @spec commuter_rail_status() :: %{
          Route.id_t() => %{
            alert_counts: map(),
            name: String.t(),
            service_today?: boolean(),
            sort_order: integer()
          }
        }
  def commuter_rail_status() do
    commuter_rail_routes()
    |> Enum.map(&route_info/1)
    |> Map.new()
  end

  @doc """
  Returns a struct indicating status for the route given. Its `status`
  field will be `:normal` if there are no service-impacting alerts,
  `:no_scheduled_service` if the route is not running today, and the
  service-impacting alerts, grouped by effect, if there are any.
  """
  @spec commuter_rail_status_for_route(Route.id_t()) :: status_for_route_t()
  def commuter_rail_status_for_route(route_id) do
    status_for_alerts(commuter_rail_route_alerts(route_id), service_today?(route_id))
  end

  # Given a list of alerts and a boolean indicating whether service is
  # running today, return the status of the route that provided that
  # info.
  @spec status_for_alerts([Alert.t()], boolean()) :: status_for_route_t()

  # Regardless of alerts, if there's no scheduled service, then the
  # status is :no_scheduled_service
  defp status_for_alerts(_alerts, false = _service_today?) do
    :no_scheduled_service
  end

  # If there are no alerts, then the status is :normal
  defp status_for_alerts([] = _alerts, _service_today?) do
    :normal
  end

  # If there are alerts, then construct a status based on the
  # alerts. For delays and cancellations, add trip info (first
  # departure time, train number, etc) as well.
  defp status_for_alerts(alerts, _service_today?) do
    alerts
    |> Enum.group_by(&train_or_service_category/1)
    |> Enum.into(%{cancellations: [], delays: [], service_alerts: []})
    |> Map.update!(:delays, &add_trip_info/1)
    |> Map.update!(:cancellations, &add_trip_info/1)
  end

  # Returns the category into which an alert should be grouped. Delays
  # and cancellations are each their own category, and other alerts
  # are grouped together as `service_alerts`.
  @spec train_or_service_category(Alert.t()) :: :delays | :cancellations | :service_alerts
  defp train_or_service_category(%Alert{effect: :delay}), do: :delays
  defp train_or_service_category(%Alert{effect: :cancellation}), do: :cancellations
  defp train_or_service_category(%Alert{}), do: :service_alerts

  # Given a list of alerts, uses alert_with_trip_info_list/1 to get
  # the trip_info entries for each alert, and flat_maps them all
  # together.
  @spec add_trip_info([Alert.t()]) :: [train_impact_t()]
  defp add_trip_info(alerts) when is_list(alerts) do
    alerts |> Enum.flat_map(&alert_with_trip_info_list/1)
  end

  # Given an alert, figures a list of trip_info entries for that
  # alert, based on its informed trips and directions, and then
  # returns a list of entries with the alert paired with each
  # trip_info entry.
  @spec alert_with_trip_info_list(Alert.t()) :: [train_impact_t()]
  defp alert_with_trip_info_list(%Alert{} = alert) do
    trip_ids =
      alert
      |> Alert.get_entity(:trip)
      |> Enum.reject(&Kernel.is_nil/1)

    direction_ids =
      alert
      |> Alert.get_entity(:direction_id)
      |> Enum.reject(&Kernel.is_nil/1)

    trip_info(trip_ids, direction_ids)
    |> Enum.map(
      &%{
        alert: alert,
        trip_info: &1
      }
    )
  end

  # Uses the given trip_ids and direction_ids to determine the
  # trip_info that should be associated with a given alert.
  @spec trip_info([Schedules.Trip.id_t()], [0 | 1]) :: [trip_info_t()]

  # If an alert has no trip ID's and precisely one direction ID, then
  # it applies to all trains going in that direction.
  defp trip_info([] = _trip_ids, [direction_id]) do
    [{:direction, %{direction_id: direction_id}}]
  end

  # If an alert has no trip ID's and either no direction ID or both
  # direction ID's, then it applies to all trains.
  defp trip_info([] = _trip_ids, _direction_ids) do
    [:all]
  end

  # If an alert has any trip ID's, then it applies only to those
  # trips, so we return one entry per trip.
  defp trip_info(trip_ids, _direction_ids) do
    trip_ids |> Enum.map(&trip_info_for_trip/1)
  end

  # Given a trip ID, return a trip_info entry for that trip. A
  # trip_info entry has info about its first and last stop, its first
  # departure time, its name (train number for commuter-rail trips),
  # and its direction.
  @spec trip_info_for_trip(Schedules.Trip.id_t()) :: trip_info_t()
  defp trip_info_for_trip(trip_id) do
    trip = @schedules_repo.trip(trip_id)

    {first_schedule, last_schedule} =
      trip_id
      |> @schedules_repo.schedule_for_trip()
      |> Kernel.then(&{List.first(&1), List.last(&1)})

    {:trip,
     %{
       direction_id: trip.direction_id,
       first_departure_time: first_schedule.departure_time,
       first_stop: first_schedule.stop,
       last_stop: last_schedule.stop,
       name: trip.name
     }}
  end

  # Return all service impacting alerts for a given Route ID.
  @spec commuter_rail_route_alerts(String.t()) :: [Alerts.Alert.t()]
  defp commuter_rail_route_alerts(id) do
    [id]
    |> @alerts_repo.by_route_ids(@date_time_module.now())
    |> Enum.filter(fn alert ->
      service_impacting_alert?(alert) &&
        active_now_or_later_on_day?(alert, @date_time_module.now())
    end)
  end

  # Returns a list of all commuter rail routes.
  @spec commuter_rail_routes() :: [Routes.Route.t()]
  defp commuter_rail_routes() do
    @routes_repo.all()
    |> Enum.filter(&Routes.Route.commuter_rail?/1)
  end

  # Returns a map where the key is the effect of the alert
  # and the value is the number of alerts with that effect.
  # For example, if there are 2 delays and 1 cancellation,
  # the map would be `%{delay: 2, cancellation: 1}`.
  @spec alert_counts([Alerts.Alert.t()]) :: map()
  defp alert_counts(alerts) do
    alerts
    |> Enum.group_by(& &1.effect)
    |> Enum.map(fn {effect, alerts} ->
      {effect, Kernel.length(alerts)}
    end)
    |> Map.new()
  end

  # Returns a boolean indicating whether or not the route has a schedule
  # for today. This is used to determine if the route is running service today.
  @spec service_today?(String.t()) :: boolean()
  defp service_today?(id) do
    [id]
    |> @schedules_condensed_repo.by_route_ids()
    |> Enum.any?(fn %{time: time} -> Dotcom.Utils.ServiceDateTime.service_today?(time) end)
  end

  # Returns a tuple with the Route ID and a map containing
  # the alert counts, name of the route, sort order, and whether the route
  # is running service today.
  @spec route_info(Route.t()) ::
          {String.t(),
           %{
             alert_counts: map(),
             name: String.t(),
             service_today?: boolean(),
             sort_order: integer()
           }}
  defp route_info(%Route{id: id, name: name, sort_order: sort_order}) do
    alert_counts =
      id
      |> commuter_rail_route_alerts()
      |> alert_counts()

    service_today? = service_today?(id)

    {id,
     %{
       alert_counts: alert_counts,
       name: name,
       service_today?: service_today?,
       sort_order: sort_order
     }}
  end
end
