defmodule DotcomWeb.ScheduleController.DefaultsTest do
  use DotcomWeb.ConnCase, async: true

  alias DotcomWeb.ScheduleController.Defaults
  alias Routes.Route

  setup %{conn: conn} do
    conn =
      conn
      |> assign(:route, %Route{id: "1", type: 3})
      |> assign(:date_time, Util.now())
      |> assign(:date, Util.service_date())
      |> fetch_query_params()

    {:ok, conn: conn}
  end

  describe "assigns show_date_select? to" do
    test "false when not in params", %{conn: conn} do
      conn = Defaults.call(conn, [])
      assert conn.assigns.show_date_select? == false
    end

    test "true when true in params", %{conn: conn} do
      conn = %{conn | params: %{"date_select" => "true"}}
      conn = Defaults.call(conn, [])
      assert conn.assigns.show_date_select? == true
    end
  end

  describe "assign direction_id to" do
    test "integer when in params", %{conn: conn} do
      conn =
        Defaults.call(
          %{conn | query_params: %{"schedule_direction" => %{"direction_id" => "1"}}},
          []
        )

      assert conn.assigns.direction_id == 1
    end

    test "default when schedule_direction in params without direction_id", %{conn: conn} do
      conn = assign(conn, :date_time, ~N[2017-01-25T14:00:00])

      conn =
        Defaults.call(
          %{conn | query_params: %{"schedule_direction" => nil}},
          []
        )

      assert conn.assigns.direction_id == 0
    end

    test "0 when id is not in params and on/after 2:00pm", %{conn: conn} do
      conn =
        conn
        |> assign(:date_time, ~N[2017-01-25T14:00:00])
        |> Defaults.call([])

      assert conn.assigns.direction_id == 0
    end

    test "1 when id is not in params and before 2:00pm", %{conn: conn} do
      conn =
        conn
        |> assign(:date_time, ~N[2017-01-25T13:59:59])
        |> Defaults.call([])

      assert conn.assigns.direction_id == 1
    end

    test "1 when route is SL1/2 and id is not in params and on/after 2:00pm", %{conn: conn} do
      conn =
        conn
        |> assign(:route, %Route{id: "741", type: 3})
        |> assign(:date_time, ~N[2017-01-25T14:00:00])
        |> Defaults.call([])

      assert conn.assigns.direction_id == 1
    end

    test "0 when route is SL1/2 and id is not in params and before 2:00pm", %{conn: conn} do
      conn =
        conn
        |> assign(:route, %Route{id: "741", type: 3})
        |> assign(:date_time, ~N[2017-01-25T13:59:59])
        |> Defaults.call([])

      assert conn.assigns.direction_id == 0
    end

    test "the single valid direction on a unidirectional route", %{conn: conn} do
      conn =
        conn
        |> assign(:route, %Route{id: "741", type: 3, direction_names: %{0 => nil, 1 => "Test"}})
        |> assign(:date_time, ~N[2017-01-25T14:00:00])
        |> Defaults.call([])

      # Normally this would be 0 since the time is on/after 2:00pm
      assert conn.assigns.direction_id == 1
    end
  end

  describe "assign tab_params" do
    test "values are different", %{conn: conn} do
      query_params = %{"direction_id" => "1", "date" => "2017-01-01"}

      conn =
        %{conn | query_params: query_params}
        # defaults will be: direction 0, date 2017-01-02
        |> assign(:date_time, ~N[2017-01-02T14:00:00])
        |> Defaults.call([])

      assert conn.assigns.tab_params == MapSet.new(query_params)
    end

    test "values are the same", %{conn: conn} do
      conn =
        %{conn | query_params: %{"direction_id" => "0", "date" => "2017-01-01"}}
        # defaults will be: direction 0, date 2017-01-01
        |> assign(:date_time, ~N[2017-01-01T14:00:00])
        |> Defaults.call([])

      assert conn.assigns.tab_params == MapSet.new()
    end

    test "empty query params", %{conn: conn} do
      conn =
        %{conn | query_params: %{}}
        # defaults will be: direction 1, date 2017-01-01
        |> assign(:date_time, ~N[2017-01-01T13:00:00])
        |> Defaults.call([])

      assert conn.assigns.tab_params == MapSet.new()
    end
  end
end
