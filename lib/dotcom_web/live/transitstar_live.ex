defmodule DotcomWeb.TransitStar2000 do
  use DotcomWeb, :live_view
  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @sl_routes %{"741": "SL1", "742": "SL2", "743": "SL3", "751": "SL4"}

  def mount(params, _session, socket) do
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
       bus_ids: bus_ids,
       sl_routes: @sl_routes
     })}
  end

  def route_alert_count(alerts, route, now) do
    alerts
    |> Enum.filter(fn alert ->
      alert.effect in [
        :cancellation,
        :delay,
        :detour,
        :dock_closure,
        :service_change,
        :shuttle,
        :single_tracking,
        :snow_route,
        :station_closure,
        :stop_closure,
        :suspension
      ]
    end)
    |> Enum.filter(fn alert ->
      alert.informed_entity.entities
      |> Enum.any?(fn entity ->
        entity.route == route
      end)
    end)
    |> Enum.filter(fn alert ->
      alert.active_period
      |> Enum.any?(fn range ->
        Dotcom.Utils.DateTime.in_range?(range, @date_time_module.now())
      end) or alert.effect == :delay
    end)
    |> Enum.count()
  end

  def render(%{scene: :current_conditions} = assigns) do
    ~H"""
    <div class="transitstar-cc-container">
      <div class="transitstar-cc-header">
        <div class="transitstar-cc-logo">
          <img src="/icon-svg/mbta-logo.svg" class="h-full" />
        </div>
        <h2 class="flex items-end">
          Current<br />Conditions
        </h2>
        <div class="flex items-end ml-auto mr-6 font-bold mb-2">
          {pretty_time(%{now: @now})}
        </div>
      </div>
      <div class="flex flex-row justify-between h-[60vh] font-bold">
        <div id="subway" class="transitstar-cc-modebox">
          <div class="transitstar-cc-blend-top transitstar-cc-blend"></div>
          <div class="transitstar-cc-blend-left transitstar-cc-blend"></div>
          <div class="transitstar-cc-blend-right transitstar-cc-blend"></div>
          <div class="transitstar-cc-blend-bottom transitstar-cc-blend"></div>
          <h3 class="mt-0">
            Subway
          </h3>
          <ul class="transitstar-cc-ul">
            <li :for={route <- @subway_ids} class="flex flex-row justify-between mb-1">
              <span>
                <DotcomWeb.Components.RouteSymbols.route_icon route={%Routes.Route{id: route}} />
                {route} Line
              </span>
              {route_alert_count(
                @subway_alerts,
                route,
                @now
              )} alerts
            </li>
          </ul>
        </div>
        <div id="rail" class="transitstar-cc-modebox">
          <div class="transitstar-cc-blend-top transitstar-cc-blend"></div>
          <div class="transitstar-cc-blend-left transitstar-cc-blend"></div>
          <div class="transitstar-cc-blend-right transitstar-cc-blend"></div>
          <div class="transitstar-cc-blend-bottom transitstar-cc-blend"></div>
          <h3 class="mt-0">
            Commuter Rail
          </h3>
          <ul id="rail_list" class="transitstar-cc-ul">
            <%= for route <- @rail_ids do %>
              <li
                :if={route_alert_count(@rail_alerts, route, @now) > 0}
                class="flex flex-row justify-between mb-1"
              >
                <span>
                  <span class="bg-[#80276c] text-white font-bold rounded-full pl-2 pr-2">
                    {route
                    |> String.replace("CR-", "")}
                  </span>
                </span>
                {route_alert_count(@rail_alerts, route, @now)} alerts
              </li>
            <% end %>
          </ul>
        </div>
        <div id="bus" class="transitstar-cc-modebox">
          <div class="transitstar-cc-blend-top transitstar-cc-blend"></div>
          <div class="transitstar-cc-blend-left transitstar-cc-blend"></div>
          <div class="transitstar-cc-blend-right transitstar-cc-blend"></div>
          <div class="transitstar-cc-blend-bottom transitstar-cc-blend"></div>
          <h3 class="mt-0">
            Bus
          </h3>
          <ul id="bus_list" class="transitstar-cc-ul">
            <%= for route <- @bus_ids do %>
              <li
                :if={route_alert_count(@bus_alerts, route, @now) > 0}
                class="flex flex-row justify-between mb-1"
              >
                <span>
                  {DotcomWeb.ViewHelpers.bus_icon_pill(%Routes.Route{
                    id: route,
                    name: Map.get(@sl_routes, route |> String.to_atom(), route)
                  })}
                </span>
                {route_alert_count(
                  @bus_alerts,
                  route,
                  @now
                )} alerts
              </li>
            <% end %>
          </ul>
        </div>
      </div>
      <div class="mt-4 p-2">
        <audio src="/images/jazz_1.mp3" controls autoplay />
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
    ~H"""
    {@now |> Dotcom.Utils.Time.format(:hour_12_minutes) |> elem(1)}
    <br />
    {@now |> Dotcom.Utils.Time.format(:date_short) |> elem(1)}
    """
  end
end
