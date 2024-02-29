defmodule DotcomWeb.TripPlan.Feedback do
  @moduledoc """
  Handle submission of the feedback form given with each itinerary returned by
  the trip planner. Saves to the Redis cache with the default TTL of :infinity.
  """
  use DotcomWeb, :controller
  use Nebulex.Caching

  alias Dotcom.Cache.TripPlanFeedback.KeyGenerator

  @cache Application.compile_env!(:dotcom, :trip_plan_feedback_cache)

  def delete(conn, params), do: cache_and_response(conn, params, :delete)
  def put(conn, params), do: cache_and_response(conn, params, :put)

  defp cache_and_response(conn, params, action) do
    handle_cache(action, params)
    send_resp(conn, :ok, "")
  end

  @decorate cache_evict(cache: @cache, key_generator: KeyGenerator)
  defp handle_cache(:delete, params), do: params

  @decorate cache_put(cache: @cache, key_generator: KeyGenerator)
  defp handle_cache(:put, params), do: params
end
