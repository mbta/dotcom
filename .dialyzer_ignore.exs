all_files = Dotcom.Utils.File.list_all_files("lib")

# Ignore all call_without_opaque
call_without_opaque =
  all_files
  |> Enum.map(fn path ->
    {path, :call_without_opaque}
  end)

# Ignore all contract_with_opaque
contract_with_opaque =
  all_files
  |> Enum.map(fn path ->
    {path, :contract_with_opaque}
  end)

manual = [
  {"lib/alerts/parser.ex", :unknown_type},
  {"lib/algolia/object.ex", :no_return},
  {"lib/algolia/routes.ex", :call},
  {"lib/algolia/routes.ex", :no_return},
  {"lib/cms/api.ex", :unknown_type},
  {"lib/cms/helpers.ex", :unknown_type},
  {"lib/cms/partial/banner.ex", :unknown_type},
  {"lib/cms/partial/teaser.ex", :unknown_type},
  {"lib/cms/repo.ex", :pattern_match},
  {"lib/cms/repo.ex", :unknown_type},
  {"lib/dotcom/cache/subscriber.ex", :unmatched_return},
  {"lib/dotcom/content_rewriter.ex", :call},
  {"lib/dotcom/content_rewriter.ex", :invalid_contract},
  {"lib/dotcom/content_rewriter.ex", :no_return},
  {"lib/dotcom/content_rewriters/embedded_media.ex", :call},
  {"lib/dotcom/content_rewriters/embedded_media.ex", :invalid_contract},
  {"lib/dotcom/content_rewriters/embedded_media.ex", :no_return},
  {"lib/dotcom/content_rewriters/links.ex", :invalid_contract},
  {"lib/dotcom/content_rewriters/responsive_tables.ex", :invalid_contract},
  {"lib/dotcom/floki_helpers.ex", :invalid_contract},
  {"lib/dotcom/system_status/commuter_rail_cache.ex", :unmatched_return},
  {"lib/dotcom/system_status/subway_cache.ex", :unmatched_return},
  {"lib/dotcom_web/controllers/cms_controller.ex", :pattern_match},
  {"lib/dotcom_web/controllers/cms_controller.ex", :unknown_type},
  {"lib/dotcom_web/controllers/event_controller.ex", :unknown_type},
  {"lib/dotcom_web/controllers/map_config_controller.ex", :unknown_type},
  {"lib/dotcom_web/controllers/mode/hub.ex", :unknown_type},
  {"lib/dotcom_web/controllers/schedule/line/maps.ex", :unknown_type},
  {"lib/dotcom_web/controllers/schedule/predictions.ex", :pattern_match},
  {"lib/dotcom_web/controllers/schedule/timetable_controller.ex", :call},
  {"lib/dotcom_web/controllers/schedule/timetable_controller.ex", :no_return},
  {"lib/dotcom_web/live/commuter_rail_alerts_live.ex", :unmatched_return},
  {"lib/dotcom_web/live/subway_alerts_live.ex", :unmatched_return},
  {"lib/dotcom_web/router.ex", :unused_fun},
  {"lib/dotcom_web/stats.ex", :unmatched_return},
  {"lib/dotcom_web/views/bus_stop_change_view.ex", :unknown_type},
  {"lib/dotcom_web/views/helpers.ex", :unmatched_return},
  {"lib/dotcom_web/views/helpers/cms_helpers.ex", :unknown_type},
  {"lib/dotcom_web/views/page_content_view.ex", :call},
  {"lib/dotcom_web/views/paragraph_view.ex", :unknown_type},
  {"lib/dotcom_web/views/teaser_view.ex", :unknown_type},
  {"lib/fares/fares.ex", :unknown_type},
  {"lib/location_service/address.ex", :call},
  {"lib/location_service/address.ex", :no_return},
  {"lib/location_service/behaviour.ex", :unknown_type},
  {"lib/location_service/location_service.ex", :unmatched_return},
  {"lib/mix/tasks/header_footer.ex", :pattern_match},
  {"lib/mix/tasks/header_footer.ex", :unknown_function},
  {"lib/mix/tasks/header_footer.ex", :unmatched_return},
  {"lib/predictions/pub_sub.ex", :unknown_type},
  {"lib/predictions/pub_sub.ex", :unmatched_return},
  {"lib/predictions/pub_sub/behaviour.ex", :unknown_type},
  {"lib/predictions/repo.ex", :pattern_match},
  {"lib/predictions/stream_supervisor.ex", :unknown_type},
  {"lib/predictions/stream_topic.ex", :unknown_type},
  {"lib/predictions/stream_worker.ex", :unknown_type},
  {"lib/req/stats.ex", :unmatched_return},
  {"lib/routes/populate_caches.ex", :unmatched_return},
  {"lib/schedules/hours_of_operation.ex", :unknown_type},
  {"lib/telemetry/helper.ex", :unmatched_return},
  {"test/support/cms/factory.ex", :call},
  {"test/support/cms/factory.ex", :no_return},
  {"test/support/cms/factory.ex", :unknown_type},
  {"test/support/integration_helpers.ex", :unknown_function},
  {"test/support/page_helpers.ex", :guard_fail}
]

call_without_opaque ++ contract_with_opaque ++ manual
