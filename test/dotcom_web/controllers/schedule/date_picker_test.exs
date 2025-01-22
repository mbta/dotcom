defmodule DotcomWeb.ScheduleController.DatePickerTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.ScheduleController.DatePicker

  @moduletag :external

  @opts init([])

  test "assigns date_select, calendar when date_select == true", %{conn: conn} do
    path = "/schedules/route"

    conn =
      %{
        conn
        | request_path: path,
          params: %{"route" => "route", "date_select" => "true"},
          query_params: %{"date_select" => "true"}
      }
      |> assign(:date, ~D[2017-01-01])
      |> call(@opts)

    assert conn.assigns.date_select == true

    calendar = conn.assigns.calendar
    assert %BuildCalendar.Calendar{} = calendar
    assert List.first(calendar.days).url =~ "/schedules/route?date=2017-01-01"
  end

  test "shifts holidays and calendar when shift is in the query params", %{conn: conn} do
    conn =
      %{conn | request_path: "/", query_params: %{"date_select" => "true", "shift" => "1"}}
      |> assign(:date, ~D[2017-01-01])
      |> call(@opts)

    assert conn.assigns.calendar ==
             BuildCalendar.build(
               ~D[2017-01-01],
               Util.service_date(),
               Holiday.Repo.holidays_in_month(~D[2017-02-01]),
               &UrlHelpers.update_url(conn, &1),
               shift: 1
             )
  end
end
