defmodule Dotcom.SystemStatus.CommuterRail do
  @moduledoc """
  Provides a simple view into the status of the
  commuter rail system, for each line, showing whether it's running normally,
  or whether there are alerts that impact service.
  """

  use Nebulex.Caching.Decorators

  import Dotcom.Alerts, only: [in_effect_today?: 1, service_impacting_alert?: 1]

  alias Routes.Route

  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.seconds(30)

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @repos_module Application.compile_env!(:dotcom, :repo_modules)

  @alerts_repo @repos_module[:alerts]
  @routes_repo @repos_module[:routes]
  @schedules_repo @repos_module[:schedules_condensed]

  @doc """
  Returns a map where the key is the Route ID of a commuter rail line
  and the value includes alerts grouped by effect, the name of the line,
  and whether the line is running service today.
  """
  @spec commuter_rail_status() :: %{
          String.t() => %{
            alert_counts: map(),
            name: String.t(),
            service_today?: boolean(),
            sort_order: integer()
          }
        }
  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def commuter_rail_status() do
    status =
      commuter_rail_routes()
      |> Enum.map(&route_info/1)
      |> Map.new()

    Phoenix.PubSub.broadcast(
      Dotcom.PubSub,
      "commuter-rail-system-status",
      {:commuter_rail_status, status}
    )

    IO.puts("COMMUTER RAIL STATUS PUSHED: #{:erlang.phash2(status)}")

    status
  end

  # Return all service impacting alerts for a given Route ID.
  @spec commuter_rail_route_alerts(String.t()) :: [Alerts.Alert.t()]
  defp commuter_rail_route_alerts(id) do
    [id]
    |> @alerts_repo.by_route_ids(@date_time_module.now())
    |> Enum.filter(fn alert ->
      service_impacting_alert?(alert) && in_effect_today?(alert)
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
    |> @schedules_repo.by_route_ids()
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
