defmodule Alerts.Repo do
  import Dotcom.Alerts, only: [planned_service_impacting_alert?: 1]

  alias Alerts.{Alert, Banner, Priority}
  alias Alerts.Cache.Store
  alias Alerts.Repo.Behaviour

  @behaviour Behaviour

  @impl Behaviour
  def all(now) do
    Store.all_alerts(now)
  end

  @impl Behaviour
  def banner do
    Store.banner()
  end

  def by_id(id) do
    Store.alert(id)
  end

  @impl Behaviour
  def by_route_ids([], _now) do
    []
  end

  def by_route_ids(route_ids, now) do
    route_ids
    |> Store.alert_ids_for_routes()
    |> Store.alerts(now)
  end

  @impl Behaviour
  def planned_service_impacts_by_routes(route_ids, now) do
    route_ids
    |> by_route_ids(now)
    |> Enum.filter(&planned_service_impacting_alert?/1)
    |> Enum.sort(fn a, b ->
      first = a.active_period |> List.first() |> elem(0)
      second = b.active_period |> List.first() |> elem(0)

      Timex.before?(first, second)
    end)
  end

  def by_route_types(types, now) do
    types
    |> Store.alert_ids_for_route_types()
    |> Store.alerts(now)
  end

  def by_route_id_and_type(route_id, route_type, now) do
    route_id
    |> Store.alert_ids_for_route_id_and_type(route_type)
    |> Store.alerts(now)
  end

  @impl Behaviour
  def by_stop_id(stop_id, now \\ DateTime.utc_now()) do
    stop_id
    |> Store.alert_ids_for_stop_id()
    |> Store.alerts(now)
  end

  def by_priority(now, priority) do
    now
    |> Store.all_alerts()
    |> Enum.filter(&(&1.priority == priority))
  end
end
