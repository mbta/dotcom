defmodule Dotcom.Alerts do
  @moduledoc """
  A collection of functions that help to work with alerts in a unified way.
  """

  import Dotcom.Utils.DateTime, only: [in_range?: 2]

  alias Dotcom.SystemStatus
  alias Alerts.Alert
  alias Alerts.InformedEntity
  alias Alerts.Match
  alias Routes.Route
  alias Stops.Stop

  @alerts_repo_module Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @routes_repo_module Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo_module Application.compile_env!(:dotcom, :repo_modules)[:stops]
  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @type diversion_effect_t() ::
          :detour | :service_change | :shuttle | :station_closure | :stop_closure | :suspension

  @typedoc "Service alerts which typically impact rider experience."
  @type service_effect_t() ::
          :cancellation
          | :delay
          | :detour
          | :dock_closure
          | :service_change
          | :shuttle
          | :single_tracking
          | :snow_route
          | :station_closure
          | :stop_closure
          | :suspension

  # A keyword list of effects and the severity level necessary to make an alert 'service impacting.'
  @service_impacting_effects [
    cancellation: 1,
    delay: 2,
    detour: 1,
    dock_closure: 1,
    service_change: 3,
    shuttle: 1,
    single_tracking: 1,
    snow_route: 1,
    station_closure: 1,
    stop_closure: 1,
    suspension: 1
  ]

  @doc """
  Get a list of stations that are affected by the alert.
  """
  @spec affected_stations(Alert.t()) :: [Stop.t()]
  def affected_stations(alert) do
    alert
    |> Map.get(:informed_entity, %{stop: nil})
    |> Map.get(:stop, [])
    |> Enum.reject(&is_nil/1)
    |> Enum.map(&@stops_repo_module.get(&1))
    |> Enum.reject(&is_nil/1)
    |> Enum.filter(& &1.station?)
    |> Enum.sort_by(& &1.name)
  end

  @doc """
  Does the alert match a group of effects/severities?
  """
  @spec effects_match?(list(), Alert.t()) :: boolean()
  def effects_match?(effects, alert) do
    Enum.any?(effects, &effect_match?(&1, alert))
  end

  @doc """
  Does the alert have an effect/severity that is considered service impacting?
  And, was it planned?
  """
  @spec planned_service_impacting_alert?(Alert.t()) :: boolean()
  def planned_service_impacting_alert?(alert) do
    service_impacting_alert?(alert) && planned_alert?(alert)
  end

  @doc """
  Does the alert have an effect/severity that is considered service-impacting?
  """
  @spec service_impacting_alert?(Alert.t()) :: boolean()
  def service_impacting_alert?(alert) do
    effects_match?(@service_impacting_effects, alert)
  end

  @doc """
  Returns a boolean indicating whether or not the alert is in effect right now.
  """
  @spec in_effect_now?(Alerts.Alert.t()) :: boolean()
  def in_effect_now?(%Alerts.Alert{active_period: active_period}) do
    Enum.any?(active_period, fn {start, stop} ->
      in_range?({start, stop}, @date_time_module.now())
    end)
  end

  @doc """
  Returns a keyword list of the alert effects that are considered service-impacting and their severity levels.
  """
  @spec service_impacting_effects() :: [{service_effect_t(), integer()}]
  def service_impacting_effects(), do: @service_impacting_effects

  @doc """
  Sort alerts by the start time of the first active period.
  """
  @spec sort_by_start_time_sorter(Alert.t(), Alert.t()) :: boolean()
  def sort_by_start_time_sorter(a, b) do
    sort_by_start_time_mapper(a) <= sort_by_start_time_mapper(b)
  end

  @doc """
  Sort alerts by the list of stations they affect.
  """
  @spec sort_by_station_sorter(Alert.t(), Alert.t()) :: boolean()
  def sort_by_station_sorter(a, b) do
    a_station = sort_by_station_mapper(a)
    b_station = sort_by_station_mapper(b)

    a_station <= b_station
  end

  @spec subway_alert_groups() :: [{Route.t(), [Alert.t()]}]
  def subway_alert_groups() do
    alerts =
      @alerts_repo_module.all(@date_time_module.now())
      |> Enum.reject(&service_impacting_alert?/1)

    non_banner_alerts = excluding_banner(@alerts_repo_module.banner(), alerts)

    [0, 1]
    |> @routes_repo_module.by_type()
    |> with_alert_lists(non_banner_alerts)
    |> drop_empty_groups()
  end

  @spec commuter_rail_alert_groups() :: [{Route.t(), [Alert.t()]}]
  def commuter_rail_alert_groups() do
    now = @date_time_module.now()

    alerts =
      @alerts_repo_module.all(now)
      |> Enum.reject(&SystemStatus.status_alert?(&1, now))

    non_banner_alerts = excluding_banner(@alerts_repo_module.banner(), alerts)

    2
    |> @routes_repo_module.by_type()
    |> with_alert_lists(non_banner_alerts)
    |> drop_empty_groups()
  end

  defp with_alert_lists(routes, alerts) do
    routes
    |> Enum.map(fn route ->
      entity =
        InformedEntity.from_keywords(
          route_type: route.type,
          route: route.id
        )

      {route, Match.match(alerts, entity)}
    end)
  end

  defp drop_empty_groups(alert_list_tuples),
    do: alert_list_tuples |> Enum.reject(fn {_group_name, group} -> Enum.empty?(group) end)

  defp excluding_banner(nil = _banner, alerts), do: alerts
  defp excluding_banner(banner, alerts), do: alerts |> Enum.reject(&(&1.id == banner.id))

  # Does the alert:
  #   1. Have an effect that is in the list of given effects?
  #   2. Have a severity that is greater than or equal to the effect's severity?
  defp effect_match?({effect, severity}, alert) do
    effect == alert.effect && alert.severity >= severity
  end

  # We consider an alert planned if the first active period starts after the alert was created.
  defp planned_alert?(alert) do
    alert.active_period
    |> List.first()
    |> Kernel.elem(0)
    |> Timex.after?(alert.created_at)
  end

  # Take an alert and return the start time of the first active period.
  # Return nil if there is no active period.
  defp sort_by_start_time_mapper(%{active_period: []}), do: nil
  defp sort_by_start_time_mapper(%{active_period: nil}), do: nil

  defp sort_by_start_time_mapper(alert) do
    time =
      alert
      |> Map.get(:active_period, [{nil, nil}])
      |> List.first()
      |> Kernel.elem(0)

    if time, do: DateTime.to_unix(time)
  end

  # Take an alert and return a unique key for the stations it affects.
  defp sort_by_station_mapper(alert) do
    alert
    |> affected_stations()
    |> stations_key()
  end

  # Take a list of stations and return a unique key.
  # If there is only one station, return the station name in upper snake case; e.g. "PARK_ST".
  # If there are multiple stations, return "ZZZ" because we want to sort these alerts last.
  defp stations_key([station]) do
    station
    |> Map.get(:name, "ZZZ")
    |> Recase.to_snake()
    |> String.upcase()
  end

  defp stations_key(_), do: "ZZZ"

  # Systemwide alerts can be made to apply to an entire mode.
  # These special alerts can be identified by the absence of a specified route.
  def systemwide_mode_alert?(%Alert{informed_entity: informed_entity}, mode) do
    matched_entity? = fn entity ->
      case mode do
        :subway ->
          entity.route_type in [0, 1]

        :commuter_rail ->
          entity.route_type == 2

        :bus ->
          entity.route_type == 3

        :ferry ->
          entity.route_type == 4

        _ ->
          false
      end
    end

    informed_entity.entities
    |> Enum.filter(&(is_nil(&1.route) && !is_nil(&1.route_type)))
    |> Enum.find(&matched_entity?.(&1)) != nil
  end

  def route_alert?(%Alert{informed_entity: informed_entity}, route_id) do
    Enum.any?(informed_entity, fn
      %{route: ^route_id} -> true
      %{} -> false
    end)
  end

  def route_type_alert?(%Alert{informed_entity: informed_entity}, route_type) do
    Enum.any?(informed_entity, fn
      %{route_type: ^route_type} -> true
      %{} -> false
    end)
  end

  def routes_with_high_priority_alerts_by_mode(alerts) do
    modes = [:subway, :bus, :commuter_rail, :ferry]
    empty_by_mode = Map.new(modes, fn mode -> {mode, MapSet.new()} end)

    route_ids_by_mode =
      alerts
      |> Enum.filter(&(Alerts.Priority.priority(&1) == :high))
      |> Enum.reduce(empty_by_mode, fn alert, acc ->
        route_ids = Alert.get_entity(alert, :route) |> MapSet.delete(nil)

        alert
        |> alert_route_type()
        |> Enum.map(&Route.type_atom/1)
        |> Enum.reduce(acc, fn mode, acc2 ->
          Map.update!(acc2, mode, &MapSet.union(&1, route_ids))
        end)
      end)

    Enum.map(modes, fn mode_key ->
      route_ids =
        route_ids_by_mode
        |> Map.fetch!(mode_key)
        |> MapSet.to_list()

      {mode_key,
       get_many(route_ids, &@routes_repo_module.get/1)
       |> Stream.filter(&match?({:ok, %Route{}}, &1))
       |> Stream.map(fn {:ok, route} -> route end)
       |> Enum.sort_by(& &1.sort_order)}
    end)
  end

  defp get_many([], _), do: []

  defp get_many(ids, func) do
    Task.async_stream(ids, func, max_concurrency: 8, on_timeout: :kill_task, ordered: false)
  end

  def stops_with_access_alerts_by_effect(alerts) do
    access_effects = Alerts.Accessibility.effect_types()
    empty_by_effect = Map.new(access_effects, &{&1, MapSet.new()})

    stop_ids_by_effect =
      alerts
      |> Enum.reduce(empty_by_effect, fn alert, acc ->
        if Map.has_key?(acc, alert.effect) do
          stop_id = alert_stop_ids(alert) |> List.last()
          Map.update!(acc, alert.effect, &MapSet.put(&1, stop_id))
        else
          acc
        end
      end)

    Enum.map(access_effects, fn effect ->
      stops =
        stop_ids_by_effect
        |> Map.fetch!(effect)
        |> get_many(&@stops_repo_module.get_parent/1)
        |> Stream.filter(&match?({:ok, %Stop{}}, &1))
        |> Stream.map(fn {:ok, stop} -> stop end)
        |> Enum.sort_by(& &1.name)

      {effect, stops}
    end)
  end

  def alert_route_type(alert) do
    alert
    |> Alert.get_entity(:route_type)
    |> MapSet.delete(nil)
    |> MapSet.to_list()
  end

  def alert_stop_ids(alert) do
    alert
    |> Alert.get_entity(:stop)
    |> MapSet.delete(nil)
    |> MapSet.to_list()
  end
end
