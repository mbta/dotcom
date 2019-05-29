defmodule SiteWeb.ScheduleController.HolidaysTest do
  use SiteWeb.ConnCase, async: true

  test "gets 3 results", %{conn: conn} do
    conn =
      conn
      |> assign(:date, ~D[2017-02-28])
      |> SiteWeb.ScheduleController.Holidays.call(holiday_limit: 3)

    assert Enum.count(conn.assigns.holidays) == 3
  end

  test "if there is no date, doesnt assign holidays", %{conn: conn} do
    conn =
      conn
      |> SiteWeb.ScheduleController.Holidays.call([])

    refute conn.assigns[:holidays]
  end
end
