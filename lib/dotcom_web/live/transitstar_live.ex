defmodule DotcomWeb.TransitStar2000 do
  use DotcomWeb, :live_view
  import CMS.Repo, only: [photo: 0]

  alias CMS.Repo

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @alerts_repo Application.compile_env!(:dotcom, :repo_modules)[:alerts]
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @sl_routes %{"741": "SL1", "742": "SL2", "743": "SL3", "751": "SL4"}

  def mount(params, _session, socket) do
    location = params |> Map.get("location", "place-sstat")
    scene = params |> Map.get("scene", "current_conditions") |> String.to_atom()
    offset = params |> Map.get("offset", 0)
    now = @date_time_module.now()
    subway_alerts = @alerts_repo.by_route_types([0, 1], now)
    rail_alerts = @alerts_repo.by_route_types([2], now)
    bus_alerts = @alerts_repo.by_route_types([3], now)
    subway_ids = @routes_repo.by_type([0, 1]) |> Enum.map(& &1.id)
    rail_ids = @routes_repo.by_type([2]) |> Enum.map(& &1.id)
    bus_ids = @routes_repo.by_type([3]) |> Enum.map(& &1.id)
    events = CMS.Repo.next_n_event_teasers(@date_time_module.now(), 9)

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
       sl_routes: @sl_routes,
       events: events,
       offset: offset
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
    <div class="transitstar-container">
      <.transitstar_header now={@now} title="Current Conditions" />
      <div class="transitstar-body">
        <div id="subway" class="transitstar-cc-modebox">
          <.transitstar_border />
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
          <.transitstar_border />
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
          <.transitstar_border />
          <h3 class="mt-0">
            Bus
          </h3>
          <ul id="bus_list" class="transitstar-cc-ul">
            <%= for route <- @bus_ids do %>
              <li
                :if={route_alert_count(@bus_alerts, route, @now) > 0}
                class="flex flex-row justify-between mb-1"
              >
                <span class="text-shadow-none">
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
      <.transitstar_footer />
    </div>
    """
  end

  def render(%{scene: :future_outlook} = assigns) do
    ~H"""
    <div class="transitstar-container">
      <.transitstar_header now={@now} title="Future Outlook" />
      <div class="transitstar-body">
        <div
          :for={event <- @events |> Enum.drop(@offset |> String.to_integer()) |> Enum.take(3)}
          class="transitstar-fu-day"
        >
          <.transitstar_border />
          <h3 class="transitstar-fu-day-title">
            {~W(MON TUE WED THU FRI SAT SUN) |> Enum.at(event.date |> Date.day_of_week())}
          </h3>
          <div class="w-100 text-center">{Dotcom.Utils.Time.format!(event.date, :datetime_full)}</div>
          <div
            style={"background-image: url(
            #{
              cond do
                event.location[:address] == "10 Park Plaza" ->
                  "/images/10-park-plaza.jpg"

                event.location[:place] == "Virtual" ->
                  "/images/internet-icon.png"

                true ->
                  "/images/question-mark.png"
              end
            })"}
            class="transitstar-fu-day-image"
          />
          <div class="transitstar-fu-day-desc">{event.text}</div>
        </div>
      </div>
      <.transitstar_footer />
    </div>
    """
  end

  def render(assigns) do
    ~H"""
    Hello
    """
  end

  def transitstar_header(assigns) do
    ~H"""
    <div class="transitstar-header">
      <div class="transitstar-logo">
        <img src="/icon-svg/mbta-logo.svg" class="h-full" />
      </div>
      <h2 class="flex-inline items-end w-4">
        {@title}
      </h2>
      <div class="flex items-end ml-auto mr-6 font-bold mb-2">
        {pretty_time(%{now: @now})}
      </div>
    </div>
    """
  end

  def transitstar_footer(assigns) do
    ~H"""
    <div class="transitstar-cc-lowerbox">
      <audio src="/images/jazz_1.mp3" controls autoplay id="transitstar-music" />
    </div>
    """
  end

  def transitstar_border(assigns) do
    ~H"""
    <div class="transitstar-blend-top transitstar-blend"></div>
    <div class="transitstar-blend-left transitstar-blend"></div>
    <div class="transitstar-blend-right transitstar-blend"></div>
    <div class="transitstar-blend-bottom transitstar-blend"></div>
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
