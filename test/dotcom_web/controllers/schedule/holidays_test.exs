defmodule DotcomWeb.Schedule.HolidaysTest do
  use DotcomWeb.ConnCase, async: true

  alias DotcomWeb.Schedule.Holidays

  setup _ do
    Mox.stub_with(Dotcom.Utils.DateTime.Mock, Dotcom.Utils.DateTime)
    :ok
  end

  test "gets 3 results", %{conn: conn} do
    conn =
      conn
      |> assign(:date, Dotcom.Utils.ServiceDateTime.service_date())
      |> Holidays.assign_next_holidays([])

    assert Enum.count(conn.assigns.holidays) == 3
  end

  test "if there is no date, doesnt assign holidays", %{conn: conn} do
    conn =
      conn
      |> Holidays.assign_next_holidays([])

    refute conn.assigns[:holidays]
  end
end
