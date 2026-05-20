defmodule DotcomWeb.TransitStar2000 do
  use DotcomWeb, :live_view
  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  def mount(params, _session, socket) do
    dbg(params)
    location = params |> Map.get("location", "place-sstat")
    scene = params |> Map.get("scene", "current_conditions") |> String.to_atom()
    now = @date_time_module.now()
    subway_alerts = @alerts_repo.by_route_types([0, 1], now)
    rail_alerts = @alerts_repo.by_route_types([2], now)
    bus_alerts = @alerts_repo.by_route_types([3], now)
    subway_ids = @routes_repo.by_type([0, 1]) |> Enum.map(& &1.id)
    rail_ids = @routes_repo.by_type([2]) |> Enum.map(& &1.id)
    bus_ids = @routes_repo.by_type([3]) |> Enum.map(& &1.id)

    {:ok,
     socket
     |> assign(%{
       scene: scene,
       location: location,
       now: now,
       subway_alerts: subway_alerts,
       rail_alerts: rail_alerts,
       bus_alerts: bus_alerts,
       subway_ids: subway_ids,
       rail_ids: rail_ids,
       bus_ids: bus_ids
     })}
  end

  def route_alert_count(alerts, route) do
    alerts
    |> Enum.filter(fn alert ->
      alert.informed_entity.entities
      |> Enum.any?(fn entity ->
        entity.route == route
      end)
    end)
    |> Enum.count()
  end

  def render(%{scene: :current_conditions} = assigns) do
    ~H"""
    <div class="w-full m-1">
      <div class="w-full flex flex-row">
        <div class="flex w-[4em] h-[4em] items-center justify-center">
          T
        </div>
        <h2 class="flex items-end">
          Current<br />Conditions
        </h2>
        <div class="flex items-end ml-auto mr-[1em]">
          {pretty_time(%{now: @now})}
        </div>
      </div>
      <div class="flex flex-row justify-evenly h-[60vh]">
        <div id="subway" class="border w-full m-1">
          <h3 class="bold">
            Subway Alerts
          </h3>
          <ul>
            <li :for={route <- @subway_ids}>
              {route} Line: {route_alert_count(@subway_alerts, route)}
            </li>
          </ul>
        </div>
        <div id="rail" class="border w-full m-1 overflow-auto">
          <h3 class="bold">
            Commuter Rail Alerts
          </h3>
          <ul>
            <%= for route <- @rail_ids do %>
              <li :if={route_alert_count(@rail_alerts, route) > 0}>
                {route}: {route_alert_count(@rail_alerts, route)}
              </li>
            <% end %>
          </ul>
        </div>
        <div id="bus" class="border w-full m-1">
          <h3 class="bold">
            Bus Alerts
          </h3>
          <ul>
            <%= for route <- @bus_ids do %>
              <li :if={route_alert_count(@bus_alerts, route) > 0}>
                {route}: {route_alert_count(@bus_alerts, route)}
              </li>
            <% end %>
          </ul>
        </div>
      </div>
    </div>
    """
  end

  def render(assigns) do
    ~H"""
    Hello
    """
  end

  def pretty_time(assigns) do
    dbg(assigns)

    ~H"""
    {@now |> Dotcom.Utils.Time.format(:hour_12_minutes) |> elem(1)}
    <br />
    {@now |> Dotcom.Utils.Time.format(:date_short) |> elem(1)}
    """
  end
end
