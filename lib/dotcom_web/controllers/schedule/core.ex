defmodule DotcomWeb.ScheduleController.Core do
  @moduledoc """
  Core pipeline for schedules
  """
  use Plug.Builder
  import DotcomWeb.ControllerHelpers, only: [assign_alerts: 2]
  import DotcomWeb.Schedule.VehicleLocations, only: [all_vehicle_locations: 2]
  import DotcomWeb.Schedule.Defaults

  plug(:assign_defaults)
  plug(DotcomWeb.ScheduleController.RouteBreadcrumbs)
  plug(:assign_alerts)
  plug(:all_vehicle_locations)
end
