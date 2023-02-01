defmodule SiteWeb.ScheduleController.SchedulesByStopController do
  @moduledoc """
    API for retrieving schedules by trip for a service defined by date
  """
  use SiteWeb, :controller

  def show(conn, %{"stop_id" => stop_id}) do
    # we should only cache the next 36-48 hours worth
    # This should only be cached every day
    # Real time should be a separate request (this is only scheduled)
    # Should not return past schedules by default
    schedules = Schedules.ByStop.SchedulesByStopRepo.departures_for_stop(stop_id, [])
    json(conn, schedules)
  end
end
