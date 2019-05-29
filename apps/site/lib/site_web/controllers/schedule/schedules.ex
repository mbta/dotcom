defmodule SiteWeb.ScheduleController.Schedules do
  @moduledoc """

  Responsible for populating @schedules and @frequency_table based on parameters.

  """
  @behaviour Plug
  import Plug.Conn, only: [assign: 3]

  require Routes.Route
  alias Routes.Route
  alias Schedules.Schedule

  @typep schedule_pair :: {Schedule.t(), Schedule.t()}

  @impl true
  def init(_), do: []

  @impl true
  def call(conn, opts) do
    Util.log_duration(__MODULE__, :do_call, [conn, opts])
  end

  def do_call(%Plug.Conn{assigns: %{origin: nil}} = conn, _) do
    conn
  end

  def do_call(conn, []) do
    schedules = schedules(conn)

    conn
    |> assign(:schedules, schedules)
    |> assign_frequency_table(schedules)
  end

  @spec schedules(Plug.Conn.t(), any) :: [Schedules.Schedule.t()]
  def schedules(conn, lookup_fn \\ &Schedules.Repo.origin_destination/3)

  def schedules(%{assigns: %{date_in_rating?: false}}, _) do
    []
  end

  def schedules(
        %{
          assigns: %{
            date: date,
            route: %Routes.Route{id: route_id},
            origin: %Stops.Stop{id: origin_id},
            destination: %Stops.Stop{id: destination_id}
          }
        },
        lookup_fn
      ) do
    lookup_fn.(origin_id, destination_id, date: date, route: route_id)
  end

  def schedules(
        %{
          assigns: %{
            date: date,
            route: %Routes.Route{id: route_id},
            direction_id: direction_id,
            origin: %Stops.Stop{id: origin_id}
          }
        },
        _test_override_lookup_fn
      ) do
    # return schedules that stop at the origin
    case Schedules.Repo.by_route_ids(
           [route_id],
           stop_ids: [origin_id],
           date: date,
           direction_id: direction_id
         ) do
      {:error, _} = error ->
        error

      route_schedules ->
        Enum.reject(route_schedules, &match?(%Schedules.Schedule{pickup_type: 1}, &1))
    end
  end

  @spec assign_frequency_table(
          Plug.Conn.t(),
          [schedule_pair | Schedule.t()] | {:error, any}
        ) :: Plug.Conn.t()
  def assign_frequency_table(
        conn,
        [{%Schedule{route: %Route{type: type, id: route_id}}, _} | _] = schedules
      )
      when Route.subway?(type, route_id) do
    frequencies =
      schedules
      |> Enum.map(fn schedule -> elem(schedule, 0) end)
      |> Schedules.FrequencyList.build_frequency_list()

    conn
    |> assign(:frequency_table, frequencies)
  end

  def assign_frequency_table(
        conn,
        [%Schedule{route: %Route{type: type, id: route_id}} | _] = schedules
      )
      when Route.subway?(type, route_id) do
    assign(conn, :frequency_table, Schedules.FrequencyList.build_frequency_list(schedules))
  end

  def assign_frequency_table(conn, _schedules) do
    conn
  end
end
