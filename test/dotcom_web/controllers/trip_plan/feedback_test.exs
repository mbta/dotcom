defmodule DotcomWeb.TripPlan.FeedbackTest do
  use DotcomWeb.ConnCase, async: true

  alias DotcomWeb.TripPlan.Feedback

  @arbitrary_data %{
    "itinerary_index" => 2,
    "generated_user_id" => "123",
    "generated_time" => "2024-02-28T12:01:23",
    "and_many_more" => [
      %{"things" => "are in here"}
    ]
  }
  @expected_cache_key "dotcom_web.trip_plan.feedback|local|123|2024-02-28T12:01:23|2"

  @bad_data %{
    "incorrect" => "keys"
  }

  setup %{conn: conn} do
    cache = Application.get_env(:dotcom, :trip_plan_feedback_cache)

    cache.flush()

    {:ok, %{conn: conn, cache: cache}}
  end

  describe "delete/2" do
    test "returns 202 status and deletes from cache", %{conn: conn, cache: cache} do
      cache.put(@expected_cache_key, :doesnt_matter_whats_here)
      assert cache.get(@expected_cache_key)
      conn = Feedback.delete(conn, @arbitrary_data)
      refute cache.get(@expected_cache_key)
      assert response(conn, 202)
    end

    test "doesn't work with invalid data", %{conn: conn} do
      assert_raise FunctionClauseError, fn ->
        Feedback.delete(conn, @bad_data)
      end
    end
  end

  describe "put/2" do
    @tag :flaky
    test "returns 202 status and caches the data", %{conn: conn, cache: cache} do
      refute cache.get(@expected_cache_key)
      conn = Feedback.put(conn, @arbitrary_data)
      assert cache.get(@expected_cache_key)
      assert response(conn, 202)
    end

    test "doesn't work with invalid data", %{conn: conn} do
      assert_raise FunctionClauseError, fn ->
        Feedback.put(conn, @bad_data)
      end
    end
  end
end
