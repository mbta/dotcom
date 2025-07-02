defmodule Dotcom.SystemStatus.CommuterRail do
  @moduledoc """
  Provides a simple view into the status of the
  commuter rail system, for each line, showing whether it's running normally,
  or whether there are alerts that impact service.
  """

  import Dotcom.Alerts, only: [service_impacting_alert?: 1]
  import Dotcom.SystemStatus, only: [active_now_or_later_on_day?: 2]
  import Dotcom.SystemStatus.StartTime, only: [next_active_time: 1]

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

  @typep disrupted_status_t() :: %{
           cancellations: [train_impact_t()],
           delays: [train_impact_t()],
           service_impacts: [Alert.t()]
         }

  @typep route_status_t() ::
           :normal
           | :no_scheduled_service
           | disrupted_status_t()

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
  @spec commuter_rail_route_status(Route.id_t()) :: route_status_t()
  def commuter_rail_route_status(route_id) do
    if service_today?(route_id) do
      route_id
      |> commuter_rail_route_alerts()
      |> group_by_impact()
      |> as_status()
    else
      :no_scheduled_service
    end
  end

  # Groups the alerts given into train impacts (delays and
  # cancellations) versus service impacts (everything else). For
  # train impacts, add trip info (first departure time, train number,
  # etc) as well.
  @spec group_by_impact([Alert.t()]) :: disrupted_status_t()
  defp group_by_impact(alerts) do
    alerts
    |> Enum.group_by(&train_or_service_category/1)
    |> Enum.into(%{cancellations: [], delays: [], service_impacts: []})
    |> Map.update!(:delays, &add_trip_info/1)
    |> Map.update!(:cancellations, &add_trip_info/1)
    |> Map.update!(:service_impacts, &add_impact_info/1)
  end

  # Returns the category into which an alert should be grouped. Delays
  # and cancellations are each their own category, and other alerts
  # are grouped together as `service_impacts`.
  @spec train_or_service_category(Alert.t()) :: :delays | :cancellations | :service_impacts
  defp train_or_service_category(%Alert{effect: :delay}), do: :delays
  defp train_or_service_category(%Alert{effect: :cancellation}), do: :cancellations
  defp train_or_service_category(%Alert{}), do: :service_impacts

  # Given a list of alerts, uses alert_with_trip_info_list/1 to get
  # the trip_info entries for each alert, and flat_maps them all
  # together.
  @spec add_trip_info([Alert.t()]) :: [train_impact_t()]
  defp add_trip_info(alerts) when is_list(alerts) do
    alerts
    |> Enum.flat_map(&alert_with_trip_info_list/1)
    |> Enum.sort_by(&first_departure_mapper/1)
  end

  # A simple mapper used for sorting train impact entries by
  # first-departure-time when that field is available
  defp first_departure_mapper(%{
         trip_info: :all
       }) do
    {0, nil}
  end

  defp first_departure_mapper(%{
         trip_info: {:direction, %{direction_id: direction_id}}
       }) do
    {1, direction_id}
  end

  defp first_departure_mapper(%{
         trip_info: {:trip, %{first_departure_time: nil}}
       }) do
    {2, nil}
  end

  defp first_departure_mapper(%{
         trip_info: {:trip, %{first_departure_time: first_departure_time}}
       }) do
    {3, first_departure_time |> DateTime.to_unix()}
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
    trip_ids |> Enum.flat_map(&trip_info_for_trip/1)
  end

  # Given a trip ID, return a trip_info entry for that trip. A
  # trip_info entry has info about its first and last stop, its first
  # departure time, its name (train number for commuter-rail trips),
  # and its direction.
  @spec trip_info_for_trip(Schedules.Trip.id_t()) :: [trip_info_t()]
  defp trip_info_for_trip(trip_id) do
    trip_id
    |> @schedules_repo.schedule_for_trip("filter[stop_sequence]": "first,last")
    |> case do
      [first_schedule, last_schedule] ->
        trip = first_schedule.trip

        [
          {:trip,
           %{
             direction_id: trip.direction_id,
             first_departure_time: first_schedule.departure_time,
             first_stop: first_schedule.stop,
             last_stop: last_schedule.stop,
             name: trip.name
           }}
        ]

      _ ->
        []
    end
  end

  # Given a list of alerts, returns a list of maps containing the
  # alerts, each bundled with the next time the alert will become
  # active. This list will be sorted by next-active-time.
  defp add_impact_info(alerts) do
    alerts
    |> Enum.map(fn alert ->
      %{alert: alert, start_time: next_active_time(alert)}
    end)
    |> Enum.sort_by(&start_time_mapper/1, DateTime)
  end

  # Returns the start time for a service impact (without
  # :current/:future), for sorting purposes.
  defp start_time_mapper(%{start_time: {_, start_time}}), do: start_time

  # Given a status struct (with service impacts and train impacts),
  # returns that status struct if it has an disruptions, and :normal
  # if all of its disruption lists are empty.
  @spec as_status(disrupted_status_t()) :: disrupted_status_t() | :normal
  defp as_status(%{delays: [], cancellations: [], service_impacts: []}), do: :normal
  defp as_status(status), do: status

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
      {effect, %{count: Kernel.length(alerts), next_active: next_active(alerts)}}
    end)
    |> Map.new()
  end

  defp next_active(alerts) when is_list(alerts) do
    alerts
    |> Enum.filter(&active_now_or_later_on_day?(&1, @date_time_module.now()))
    |> Enum.map(&next_active_time/1)
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
