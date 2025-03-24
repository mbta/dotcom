defmodule DotcomWeb.TripPlan.Feedback do
  @moduledoc """
  Handle submission of the feedback form given with each itinerary returned by
  the trip planner. Saves to the Redis cache with the default TTL of :infinity.
  """

  use DotcomWeb, :controller

  alias DotcomWeb.TripPlan.FeedbackCSV

  @cache Application.compile_env!(:dotcom, :trip_plan_feedback_cache)

  def download(conn, _params) do
    data = get_cached_data()

    send_download(conn, {:binary, data},
      content_type: "application/csv",
      filename: "trip_plan_feedback.csv",
      disposition: :attachment
    )
  end

  def get_cached_data do
    @cache.all("dotcom_web.trip_plan.feedback|#{env_name()}*")
    |> @cache.get_all()
    |> Stream.map(&elem(&1, 1))
    |> FeedbackCSV.rows()
  end

  defp env_name do
    System.get_env("SENTRY_ENVIRONMENT", "local")
  end
end
