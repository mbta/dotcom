defmodule DotcomWeb.ScheduleController.OffsetTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.ScheduleController.Offset

  describe "init/1" do
    test "takes no options" do
      assert init([]) == []
    end
  end

  describe "call/2" do
    test "when time is before the first trip offset is 0" do
      now = Dotcom.Utils.DateTime.now()

      conn =
        now
        |> make_timetable_schedules
        |> assign(:date_time, Timex.shift(now, minutes: -1))
        |> call([])

      assert conn.assigns.offset == 0
    end

    test "when time is during the first trip offset is 0" do
      now = Dotcom.Utils.DateTime.now()

      conn =
        now
        |> make_timetable_schedules
        |> assign(:date_time, Timex.shift(now, minutes: 5))
        |> call([])

      assert conn.assigns.offset == 0
    end

    test "when time is right after the first trip offset is 1" do
      now = Dotcom.Utils.DateTime.now()

      conn =
        now
        |> make_timetable_schedules
        |> assign(:date_time, Timex.shift(now, minutes: 21))
        |> call([])

      assert conn.assigns.offset == 1
    end

    test "when time is during the second trip offset is 1" do
      now = Dotcom.Utils.DateTime.now()

      conn =
        now
        |> make_timetable_schedules
        |> assign(:date_time, Timex.shift(now, hours: 1, minutes: 5))
        |> call([])

      assert conn.assigns.offset == 1
    end

    test "when time is after the third trip offset is 0" do
      now = Dotcom.Utils.DateTime.now()

      conn =
        now
        |> make_timetable_schedules
        |> assign(:date_time, Timex.shift(now, hours: 4))
        |> call([])

      assert conn.assigns.offset == 0
    end
  end

  defp make_timetable_schedules(now) do
    build_conn()
    |> assign(:date_time, now)
    |> assign(:timetable_schedules, Enum.flat_map(0..2, &make_one_trip(&1, now)))
  end

  # makes a list of schedules that look like this:
  #
  #       | trip0       | trip1         | trip2
  # ------+-------------+---------------+-------------
  # stop0 | now+0min    | now+1h        | now+2h
  # stop1 | now+10min   | now+1h+10min  | now+2h+10min
  # stop2 | how+20min   | now+1h+20min  | now+2h+20min

  defp make_one_trip(i, now) do
    Enum.map(
      0..2,
      &make_schedule(
        Timex.shift(now, minutes: &1 * 10, hours: i),
        "trip" <> Integer.to_string(i),
        "stop" <> Integer.to_string(&1)
      )
    )
  end

  defp make_schedule(time, trip_id, stop_id) do
    %{time: time, trip: %{id: trip_id}, stop: %{id: stop_id}}
  end
end
