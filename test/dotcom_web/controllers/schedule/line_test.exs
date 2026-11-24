defmodule DotcomWeb.Schedule.LineTest do
  use DotcomWeb.ConnCase, async: false

  alias DotcomWeb.Schedule.Line

  @moduletag :external

  doctest DotcomWeb.Schedule.Line

  def get_error_stop_list(_, _, _), do: {:error, "error"}

  describe "populate / update conn based on url" do
    setup %{conn: conn} do
      conn =
        conn
        |> assign(:route, %Routes.Route{id: "1", type: 3})
        |> assign(:date_time, Util.now())
        |> assign(:date, Util.service_date())
        |> assign(:direction_id, 0)

      Mox.stub(Routes.Repo.Mock, :get_shapes, fn _, _ -> [] end)
      Mox.stub(RoutePatterns.Repo.Mock, :by_route_id, fn _, _ -> [] end)
      Mox.stub(Stops.Repo.Mock, :by_route, fn _, _, _ -> [] end)

      {:ok, conn: conn}
    end

    test "updates conn with direction_id from url", %{conn: conn} do
      conn =
        conn
        |> Map.put(:query_params, %{"schedule_direction" => %{"direction_id" => "1"}})
        |> Line.line_direction([])

      assert conn.assigns.direction_id == 1
    end

    test "parses a misshapen direction_id", %{conn: conn} do
      conn =
        conn
        |> Map.put(:query_params, %{"schedule_direction" => %{"direction_id" => "1'[]"}})
        |> Line.line_direction([])

      assert conn.assigns.direction_id == 1
    end

    test "ignores a negative direction_id", %{conn: conn} do
      conn =
        conn
        |> Map.put(:query_params, %{"schedule_direction" => %{"direction_id" => "-1"}})
        |> Line.line_direction([])

      assert conn.assigns.direction_id == 0
    end

    test "ignores url direction_id if it's not a number", %{conn: conn} do
      conn =
        conn
        |> Map.put(:query_params, %{"schedule_direction" => %{"direction_id" => "string"}})
        |> Line.line_direction([])

      assert conn.assigns.direction_id == 0
    end

    test "ignores url direction_id if it's > 1", %{conn: conn} do
      conn =
        conn
        |> Map.put(:query_params, %{"schedule_direction" => %{"direction_id" => "10"}})
        |> Line.line_direction([])

      assert conn.assigns.direction_id == 0
    end
  end
end
