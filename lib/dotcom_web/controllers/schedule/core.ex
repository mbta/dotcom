defmodule DotcomWeb.ScheduleController.Core do
  @moduledoc """
  Core pipeline for schedules
  """
  use Plug.Builder
  import DotcomWeb.ControllerHelpers, only: [call_plug: 2, assign_alerts: 2]

  plug(:schedule_pipeline_setup)
  plug(:schedule_pipeline_with_direction)
  plug(DotcomWeb.ScheduleController.VehicleLocations)

  defp schedule_pipeline_setup(conn, _opts) do
    conn
    |> call_plug(DotcomWeb.ScheduleController.Defaults)
    |> call_plug(DotcomWeb.ScheduleController.RouteBreadcrumbs)
  end

  defp schedule_pipeline_with_direction(conn, _opts) do
    conn
    |> assign_alerts([])
  end
end
