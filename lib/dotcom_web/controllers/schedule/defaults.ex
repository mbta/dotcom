defmodule DotcomWeb.ScheduleController.Defaults do
  @moduledoc """

  Responsible for assigning:
    headsigns:         %{0 => [String.t], 1 => [String.t]
    direction_id:      0 | 1
    show_date_select?: boolean
  """
  use Plug.Builder

  alias Plug.Conn
  alias Routes.Route

  plug(:assign_direction_id)
  plug(:assign_show_date_select)
  plug(:assign_tab_params)
  plug(:assign_trip_chosen)

  def assign_direction_id(conn, _) do
    do_assign_direction_id(conn.query_params["schedule_direction"], conn)
  end

  defp do_assign_direction_id(%{"direction_id" => direction_id}, conn) when direction_id in ["0", "1"],
    do: assign(conn, :direction_id, String.to_integer(direction_id))

  defp do_assign_direction_id(_, conn), do: assign(conn, :direction_id, default_direction_id(conn))

  @doc """
  If there's no headsign for a direction, default to the other direction. Otherwise, default to
  inbound before 2:00pm and outbound afterwards.
  """
  @spec default_direction_id(Conn.t()) :: 0 | 1
  def default_direction_id(%{assigns: %{route: %{direction_names: %{0 => nil}}}}), do: 1
  def default_direction_id(%{assigns: %{route: %{direction_names: %{1 => nil}}}}), do: 0

  def default_direction_id(%Conn{assigns: %{route: %Route{id: route_id}}} = conn) do
    direction_id = default_direction_id_for_hour(conn.assigns.date_time.hour)

    # SL1 and SL2 are outbound in the morning, inbound otherwise
    if route_id in ["741", "742"] do
      invert_direction_id(direction_id)
    else
      direction_id
    end
  end

  @doc """
  Assigns the relevant tab parameters if they were passed from user and differ from the defaults
  """
  @spec assign_tab_params(Conn.t(), []) :: Conn.t()
  def assign_tab_params(conn, _) do
    tab_defaults =
      MapSet.new(%{
        "direction_id" => Integer.to_string(default_direction_id(conn)),
        "date" => Date.to_string(Timex.to_date(conn.assigns.date_time))
      })

    query_params =
      conn.query_params
      |> Map.take(["direction_id", "date"])
      |> MapSet.new()

    assign(conn, :tab_params, MapSet.difference(query_params, tab_defaults))
  end

  @spec default_direction_id_for_hour(0..23) :: 0..1
  defp default_direction_id_for_hour(hour) when hour <= 13, do: 1
  defp default_direction_id_for_hour(_hour), do: 0

  @spec invert_direction_id(0..1) :: 0..1
  defp invert_direction_id(0), do: 1
  defp invert_direction_id(1), do: 0

  def assign_show_date_select(conn, _) do
    assign(conn, :show_date_select?, Map.get(conn.params, "date_select") == "true")
  end

  def assign_trip_chosen(conn, _) do
    assign(conn, :trip_chosen?, Map.has_key?(conn.params, "trip"))
  end
end
