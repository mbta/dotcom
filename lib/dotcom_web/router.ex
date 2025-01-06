defmodule DotcomWeb.Router do
  @moduledoc false

  use DotcomWeb, :router
  use Plug.ErrorHandler

  alias DotcomWeb.ControllerHelpers

  @impl Plug.ErrorHandler
  def handle_errors(conn, %{reason: reason}) do
    conn
    |> DotcomWeb.Plugs.SecureHeaders.call([])
    |> then(fn conn ->
      case reason do
        %Phoenix.Router.NoRouteError{plug_status: 404} ->
          ControllerHelpers.render_404(conn)

        _ ->
          ControllerHelpers.render_500(conn)
      end
    end)
  end

  pipeline :secure do
    if force_ssl = Application.compile_env(:dotcom, :secure_pipeline)[:force_ssl] do
      plug(Plug.SSL, force_ssl)
    end
  end

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:fetch_cookies)
    plug(:put_root_layout, {DotcomWeb.LayoutView, :root})
    plug(DotcomWeb.Plugs.Banner)
    plug(DotcomWeb.Plugs.CanonicalHostname)
    plug(DotcomWeb.Plugs.ClearCookies)
    plug(DotcomWeb.Plugs.Cookies)
    plug(DotcomWeb.Plugs.CommonFares)
    plug(DotcomWeb.Plugs.Date)
    plug(DotcomWeb.Plugs.DateTime)
    plug(DotcomWeb.Plugs.RewriteUrls)
    plug(DotcomWeb.Plugs.SecureHeaders)
    plug(:optional_disable_indexing)
  end

  pipeline :browser_live do
    plug(:fetch_live_flash)
    plug(:protect_from_forgery)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :cached_hourly do
    plug(DotcomWeb.Plugs.CacheControl, max_age: 3_600)
  end

  pipeline :cached_daily do
    plug(DotcomWeb.Plugs.CacheControl, max_age: 86_400)
  end

  scope "/", DotcomWeb do
    # no pipe
    get("/_health", HealthController, :index)
  end

  scope "/cache", DotcomWeb do
    pipe_through([:basic_auth])

    delete("/*path", CacheController, :flush_cache_keys)
  end

  # redirect 't.mbta.com' and 'beta.mbta.com' to 'https://www.mbta.com'
  scope "/", DotcomWeb, host: "t." do
    # no pipe
    get("/*path", WwwRedirector, [])
  end

  scope "/", DotcomWeb, host: "beta." do
    # no pipe
    get("/*path", WwwRedirector, [])
  end

  scope "/", DotcomWeb do
    pipe_through([:secure, :browser])

    # redirect underscored urls to hyphenated version
    get("/alerts/commuter_rail", Redirector, to: "/alerts/commuter-rail")
    get("/fares/charlie_card", Redirector, to: "/fares/charliecard")
    get("/fares/charlie-card", Redirector, to: "/fares/charliecard")
    get("/fares/commuter_rail", Redirector, to: "/fares/commuter-rail-fares")
    get("/fares/commuter-rail", Redirector, to: "/fares/commuter-rail-fares")
    get("/fares/ferry", Redirector, to: "/fares/ferry-fares")
    get("/fares/retail_sales_locations", Redirector, to: "/fares/retail-sales-locations")
    get("/fare-transformation/proposed-sales-locations", FareController, :show_transformation)
    get("/schedules/commuter_rail", Redirector, to: "/schedules/commuter-rail")
    get("/stops/commuter_rail", Redirector, to: "/stops/commuter-rail")
    get("/style_guide", Redirector, to: "/style-guide")
    get("/transit_near_me", Redirector, to: "/transit-near-me")

    # redirect cape flyer to an external site
    get("/schedules/CapeFlyer", ScheduleController, :cape_flyer)
    # redirect SL and CT to proper route ids
    get("/schedules/SL1", Redirector, to: "/schedules/741")
    get("/schedules/sl1", Redirector, to: "/schedules/741")
    get("/schedules/SL2", Redirector, to: "/schedules/742")
    get("/schedules/sl2", Redirector, to: "/schedules/742")
    get("/schedules/SL3", Redirector, to: "/schedules/743")
    get("/schedules/sl3", Redirector, to: "/schedules/743")
    get("/schedules/SL4", Redirector, to: "/schedules/751")
    get("/schedules/sl4", Redirector, to: "/schedules/751")
    get("/schedules/SL5", Redirector, to: "/schedules/749")
    get("/schedules/sl5", Redirector, to: "/schedules/749")
    get("/schedules/slw", Redirector, to: "/schedules/746")

    get("/schedules/CT2", Redirector, to: "/schedules/747")
    get("/schedules/ct2", Redirector, to: "/schedules/747")
    get("/schedules/CT3", Redirector, to: "/schedules/708")
    get("/schedules/ct3", Redirector, to: "/schedules/708")

    # bus routes eliminated by Better Bus Project
    get("/schedules/CT1", Redirector, to: "/betterbus-CT1")
    get("/schedules/CT1/*path_params", Redirector, to: "/betterbus-CT1")
    get("/schedules/ct1", Redirector, to: "/betterbus-CT1")
    get("/schedules/ct1/*path_params", Redirector, to: "/betterbus-CT1")
    get("/schedules/701", Redirector, to: "/betterbus-CT1")
    get("/schedules/701/*path_params", Redirector, to: "/betterbus-CT1")
    get("/schedules/5", Redirector, to: "/betterbus-5")
    get("/schedules/5/*path_params", Redirector, to: "/betterbus-5")
    get("/schedules/459", Redirector, to: "/betterbus-455-459")
    get("/schedules/459/*path_params", Redirector, to: "/betterbus-455-459")
    get("/schedules/448", Redirector, to: "/betterbus-440s")
    get("/schedules/448/*path_params", Redirector, to: "/betterbus-440s")
    get("/schedules/449", Redirector, to: "/betterbus-440s")
    get("/schedules/449/*path_params", Redirector, to: "/betterbus-440s")
    get("/schedules/70a", Redirector, to: "/betterbus-61-70-70A")
    get("/schedules/70a/*path_params", Redirector, to: "/betterbus-61-70-70A")
    get("/schedules/70A", Redirector, to: "/betterbus-61-70-70A")
    get("/schedules/70A/*path_params", Redirector, to: "/betterbus-61-70-70A")

    # bus routes eliminated by the Bus Network Redesign
    get("/schedules/117", Redirector,
      to: "/projects/bus-network-redesign/phase-1-service-changes#116"
    )

    get("/schedules/117/*path_params", Redirector,
      to: "/projects/bus-network-redesign/phase-1-service-changes#116"
    )

    get("/", PageController, :index)
    get("/menu", PageController, :menu)

    get("/events", EventController, :index)
    get("/events/icalendar/*path_params", EventController, :icalendar)
    get("/node/icalendar/*path_params", EventController, :icalendar)
    get("/events/*path_params", EventController, :show)

    get("/news", NewsEntryController, :index)
    get("/news/rss.xml", StaticFileController, :index)
    get("/news/*path_params", NewsEntryController, :show)

    get("/projects", ProjectController, :index)
    get("/project_api", ProjectController, :api, as: :project_api)

    get("/projects/:project_alias/updates", ProjectController, :project_updates,
      as: :project_updates
    )

    get("/redirect/*path", RedirectController, :show)

    # stop redirects
    get("/stops/Lansdowne", Redirector, to: "/stops/Yawkey")
    get("/stops/place-dudly", Redirector, to: "/stops/place-nubn")

    get("/stops/api", StopController, :api)
    resources("/stops", StopController, only: [:index, :show])
    get("/stops/*path", StopController, :stop_with_slash_redirect)

    get("/api/realtime/stops", RealtimeScheduleApi, :stops)

    get("/schedules", ModeController, :index)
    get("/schedules/schedule_api", ScheduleController.ScheduleApi, :show)
    get("/schedules/map_api", ScheduleController.MapApi, :show)
    get("/schedules/line_api", ScheduleController.LineApi, :show)
    get("/schedules/line_api/realtime", ScheduleController.LineApi, :realtime)

    get("/schedules/green_termini_api", ScheduleController.GreenTerminiApi, :show)

    get("/schedules/subway", ModeController, :subway)
    get("/schedules/bus", ModeController, :bus)
    get("/schedules/ferry", ModeController, :ferry)
    get("/schedules/commuter-rail", ModeController, :commuter_rail)
    get("/schedules/Green/line", ScheduleController.Green, :line)
    get("/schedules/Green/alerts", ScheduleController.Green, :alerts)
    get("/schedules/Green", ScheduleController.Green, :show)
    get("/schedules/finder_api/journeys", ScheduleController.FinderApi, :journeys)
    get("/schedules/finder_api/departures", ScheduleController.FinderApi, :departures)
    get("/schedules/finder_api/trip", ScheduleController.FinderApi, :trip)

    get(
      "/schedules/:route/timetable",
      ScheduleController.TimetableController,
      :show,
      as: :timetable
    )

    get("/schedules/:route/alerts", ScheduleController.AlertsController, :show, as: :alerts)
    get("/schedules/:route/line", ScheduleController.LineController, :show, as: :line)
    get("/schedules/:route/line/hours", ScheduleController.HoursController, :hours_of_operation)

    get(
      "/schedules/:route/line/hours-by-stop",
      ScheduleController.HoursController,
      :hours_of_operation_by_stop
    )

    get("/schedules/:route", ScheduleController, :show, as: :schedule)
    get("/schedules/:route/pdf", ScheduleController.Pdf, :pdf, as: :route_pdf)
    get("/schedules/:route/*path", Plugs.ScheduleRedirector, [])
    get("/style-guide", StyleGuideController, :index)
    get("/style-guide/principles", Redirector, to: "/style-guide")
    get("/style-guide/about", Redirector, to: "/style-guide")
    get("/style-guide/:section", StyleGuideController, :index)
    get("/style-guide/:section/:subpage", StyleGuideController, :show)
    get("/transit-near-me", TransitNearMeController, :index)
    resources("/alerts", AlertController, only: [:index, :show])
    delete("/trip-planner/feedback", TripPlan.Feedback, :delete)
    post("/trip-planner/feedback", TripPlan.Feedback, :put)
    get("/customer-support", CustomerSupportController, :index)
    get("/customer-support/thanks", CustomerSupportController, :thanks)
    post("/customer-support", CustomerSupportController, :submit)
    resources("/fares", FareController, only: [:show])
    get("/search", SearchController, :index)
    post("/search/query", SearchController, :query)
    post("/search/click", SearchController, :click)
    get("/bus-stop-changes", BusStopChangeController, :show)
    get("/vote", VoteController, :show)
  end

  scope "/", DotcomWeb do
    import Phoenix.LiveDashboard.Router

    pipe_through([:browser, :browser_live, :basic_auth_readonly])
    live_dashboard("/dashboard")
  end

  scope "/admin", DotcomWeb do
    import Phoenix.LiveView.Router
    pipe_through([:browser, :browser_live, :basic_auth_readonly])

    live_session :admin, layout: {DotcomWeb.LayoutView, :admin} do
      get("/trip-planner/feedback/download", TripPlan.Feedback, :download)
      live("/", Live.Admin)
      live("/trip-plan-feedback", Live.Admin.TripPlanFeedback)
    end
  end

  scope "/", DotcomWeb do
    import Phoenix.LiveView.Router
    pipe_through([:browser, :browser_live])

    live_session :rider, layout: {DotcomWeb.LayoutView, :live} do
      live("/trip-planner", Live.TripPlanner)
    end
  end

  scope "/api", DotcomWeb do
    pipe_through([:secure, :browser])

    get("/alerts", AlertController, :show_by_routes)
    get("/stops/:stop_id/alerts", AlertController, :show_by_stop)
    get("/stop/:stop_id/facilities", FacilitiesController, :get_facilities)
  end

  scope "/api", DotcomWeb do
    pipe_through([:secure, :browser, :cached_hourly])

    get("/stops/:stop_id/schedules", ScheduleController, :schedules_for_stop)
  end

  scope "/api", DotcomWeb do
    pipe_through([:secure, :browser, :cached_daily])

    get("/stop/:id", StopController, :get)
    get("/stop/:id/route-patterns", StopController, :grouped_route_patterns)
    get("/map-config", MapConfigController, :get)
    get("/routes/:route_ids", RouteController, :get_by_route_ids)
    get("/fares/one-way", FareController, :one_way_by_stop_id)
  end

  scope "/places", DotcomWeb do
    pipe_through([:api])

    get("/autocomplete/:input/:hit_limit", PlacesController, :autocomplete)
    get("/details/:address", PlacesController, :details)
    get("/reverse-geocode/:latitude/:longitude", PlacesController, :reverse_geocode)

    get("/search/:query/:hit_limit", PlacesController, :search)
    get("/popular", PlacesController, :popular)
    get("/urls", PlacesController, :with_urls)
  end

  # static files
  scope "/", DotcomWeb do
    pipe_through([:secure, :browser])
    get("/sites/*path", StaticFileController, :index)
  end

  # old site
  scope "/", DotcomWeb do
    pipe_through([:secure, :browser])

    get("/schedules_and_maps/*path", OldSiteRedirectController, :schedules_and_maps)
    get("/about_the_mbta/public_meetings", Redirector, to: "/events")
    get("/about_the_mbta/news_events", Redirector, to: "/news")
  end

  scope "/", DotcomWeb do
    pipe_through([:secure, :browser])

    get("/*path", CMSController, :page)
  end

  defp basic_auth(conn, _) do
    opts = Application.get_env(:dotcom, DotcomWeb.Router)[:basic_auth]

    Plug.BasicAuth.basic_auth(conn, opts)
  end

  defp basic_auth_readonly(conn, _) do
    opts = Application.get_env(:dotcom, DotcomWeb.Router)[:basic_auth_readonly]

    Plug.BasicAuth.basic_auth(conn, opts)
  end

  defp optional_disable_indexing(conn, _) do
    if Application.get_env(:dotcom, :allow_indexing) do
      conn
    else
      Plug.Conn.put_resp_header(conn, "x-robots-tag", "noindex")
    end
  end
end
