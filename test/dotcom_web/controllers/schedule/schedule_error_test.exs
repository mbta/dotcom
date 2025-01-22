defmodule DotcomWeb.ScheduleController.ScheduleErrorTest do
  use DotcomWeb.ConnCase, async: false

  alias DotcomWeb.ScheduleController.ScheduleError
  alias JsonApi.Error
  alias Routes.Route
  alias Schedules.Schedule

  describe "call/0" do
    test "does not check schedules when date_in_rating: true", %{conn: conn} do
      conn
      |> assign(:schedules_by_route_ids_fn, fn _, _ ->
        send(self(), :repo_called)
        []
      end)
      |> assign(:date_in_rating?, true)
      |> ScheduleError.call([])
      |> Map.get(:assigns)
      |> Map.get(:date_in_rating?)
      |> assert()

      refute_received :repo_called
    end

    test "resets date_in_rating to true when repo call returns schedules", %{conn: conn} do
      conn =
        conn
        |> assign(:schedules_by_route_ids_fn, fn ["Red"], [direction_id: 0, date: ~D[2019-03-13]] ->
          send(self(), :repo_called)
          [%Schedule{}]
        end)
        |> assign(:date, ~D[2019-03-13])
        |> assign(:route, %Route{id: "Red"})
        |> assign(:direction_id, 0)
        |> assign(:date_in_rating?, false)
        |> ScheduleError.call([])

      assert_received :repo_called
      assert conn.assigns.date_in_rating? == true
      assert Map.fetch(conn.assigns, :schedule_error) == :error
    end

    @tag :external
    test "assigns schedule_error true when repo call returns error", %{conn: conn} do
      date =
        Util.now()
        |> DateTime.to_date()
        |> Date.add(365)

      conn =
        conn
        |> assign(:date, date)
        |> assign(:route, %Route{id: "Red"})
        |> assign(:direction_id, 0)
        |> assign(:date_in_rating?, false)
        |> ScheduleError.call([])

      assert conn.assigns.date_in_rating? == false

      assert {:ok,
              %Error{
                code: "no_service",
                meta: %{
                  "end_date" => _,
                  "start_date" => _,
                  "version" => _
                }
              }} = Map.fetch(conn.assigns, :schedule_error)
    end
  end
end
