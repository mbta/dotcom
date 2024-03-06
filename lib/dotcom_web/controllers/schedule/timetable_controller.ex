defmodule DotcomWeb.ScheduleController.TimetableController do
  @moduledoc "Handles the Timetable tab for commuter rail routes."
  use DotcomWeb, :controller
  alias Plug.Conn
  alias Routes.Route
  alias DotcomWeb.ScheduleView

  require Logger

  plug(DotcomWeb.Plugs.Route)
  plug(DotcomWeb.Plugs.DateInRating)
  plug(:tab_name)
  plug(:direction_id)
  plug(DotcomWeb.ScheduleController.RoutePdfs)
  plug(DotcomWeb.ScheduleController.Core)
  plug(:do_assign_trip_schedules)
  plug(DotcomWeb.ScheduleController.Offset)
  plug(DotcomWeb.ScheduleController.ScheduleError)
  plug(:channel_id)

  defdelegate direction_id(conn, params),
    to: DotcomWeb.ScheduleController.Defaults,
    as: :assign_direction_id

  def show(conn, _) do
    direction_id = conn.assigns[:direction_id]
    direction_name = conn.assigns.route.direction_names[direction_id]

    {:ok, formatted_date} = Timex.format(conn.assigns.date, "{Mfull} {D}, {YYYY}")

    conn
    |> assign(
      :meta_description,
      "MBTA #{conn.assigns.route.name} Commuter Rail stations and " <>
        "schedules, including timetables, maps, fares, real-time updates, parking and accessibility information, " <>
        "and connections."
    )
    |> assign(:direction_name, direction_name)
    |> assign(:formatted_date, formatted_date)
    |> put_view(ScheduleView)
    |> render("show.html", [])
  end

  # Plug that assigns trip schedule to the connection
  defp do_assign_trip_schedules(conn, _) do
    Util.log_duration(__MODULE__, :assign_trip_schedules, [conn])
  end

  def assign_trip_schedules(%{assigns: %{route: route, direction_id: direction_id}} = conn) do
    timetable_schedules = timetable_schedules(conn)
    header_schedules = header_schedules(timetable_schedules)
    vehicle_schedules = vehicle_schedules(conn, timetable_schedules)
    prior_stops = prior_stops(vehicle_schedules)

    canonical_rps =
      RoutePatterns.Repo.by_route_id(route.id,
        direction_id: direction_id,
        canonical: true,
        include: "representative_trip.stops"
      )

    canonical_stop_ids =
      canonical_rps
      |> Enum.flat_map(& &1.stop_ids)
      |> MapSet.new()

    all_canonical_stops =
      if direction_id == 1 do
        Enum.reverse(canonical_stop_ids)
      else
        canonical_stop_ids
      end
      |> Enum.map(&Stops.Repo.get_parent/1)
      |> Enum.uniq()

    %{
      trip_schedules: trip_schedules,
      all_stops: all_stops
    } = build_timetable(all_canonical_stops, timetable_schedules)

    track_changes = track_changes(trip_schedules, canonical_stop_ids)

    conn
    |> assign(:timetable_schedules, timetable_schedules)
    |> assign(:header_schedules, header_schedules)
    |> assign(:trip_schedules, trip_schedules)
    |> assign(:track_changes, track_changes)
    |> assign(:vehicle_schedules, vehicle_schedules)
    |> assign(:prior_stops, prior_stops)
    |> assign(:trip_messages, trip_messages(route, direction_id))
    |> assign(:all_stops, all_stops)
  end

  @spec track_changes(
          %{required({Schedules.Trip.id_t(), Stops.Stop.id_t()}) => Schedules.Schedule.t()},
          MapSet.t(Stops.Stop.id_t())
        ) :: %{
          required({Schedules.Trip.id_t(), Stops.Stop.id_t()}) => Stops.Stop.t() | nil
        }
  defp track_changes(trip_schedules, canonical_stop_ids) do
    Map.new(trip_schedules, fn {{trip_id, stop_id}, sch} ->
      track_change = track_change_for_schedule(sch, canonical_stop_ids)

      {
        {trip_id, stop_id},
        track_change
      }
    end)
  end

  @spec track_change_for_schedule(
          Schedules.Schedule.t(),
          MapSet.t(Stops.Stop.id_t())
        ) :: Stops.Stop.t() | nil
  @doc """
  If the scheduled platform stop is not canonical, then return the stop of that track change.
  """
  def track_change_for_schedule(schedule, canonical_stop_ids, stop_get_fn \\ &Stops.Repo.get/1) do
    if has_scheduled_track_change(schedule, canonical_stop_ids) do
      case stop_get_fn.(schedule.platform_stop_id) do
        nil -> nil
        # If there is no platform code for the scheduled platform stop, treat as no track change
        %{platform_code: nil} -> nil
        platform_stop -> platform_stop
      end
    else
      nil
    end
  end

  defp has_scheduled_track_change(schedule, canonical_stop_ids) do
    # if the scheduled stop doesn't match a canonical stop, there has been a track change
    MapSet.size(canonical_stop_ids) > 0 &&
      !MapSet.member?(canonical_stop_ids, schedule.platform_stop_id)
  end

  # Helper function for obtaining schedule data
  @spec timetable_schedules(Plug.Conn.t()) :: [Schedules.Schedule.t()]
  defp timetable_schedules(%{assigns: %{date_in_rating?: false}}), do: []

  defp timetable_schedules(%{assigns: %{date: date, route: route, direction_id: direction_id}}) do
    case Schedules.Repo.by_route_ids([route.id], date: date, direction_id: direction_id) do
      {:error, _} ->
        []

      schedules ->
        schedules
        |> Enum.reject(&Schedules.Schedule.no_times?/1)
    end
  end

  @doc """
  Additional text to be included in the timetable.
  We use this for Commuter Rail trips which travel via atypical routes, in
  order to match the PDF schedules. Each rating, this should be checked
  against the new PDFs to ensure it's kept up to date.
  """
  @spec trip_messages(Routes.Route.t(), 0 | 1) :: %{{String.t(), String.t()} => String.t()}
  def trip_messages(%Routes.Route{id: "CR-Franklin"}, 0) do
    ["741", "757", "759", "735"]
    |> Enum.flat_map(&franklin_via_fairmount(&1, 0))
    |> Enum.into(%{})
  end

  def trip_messages(%Routes.Route{id: "CR-Franklin"}, 1) do
    ["740", "728", "758", "732", "760"]
    |> Enum.flat_map(&franklin_via_fairmount(&1, 1))
    |> Enum.into(%{})
  end

  def trip_messages(_, _) do
    %{}
  end

  defp franklin_via_fairmount(train, direction) do
    stops = stops_for_fairmount(direction)

    [
      List.duplicate(train, length(stops)),
      stops,
      ["Via", "Fair-", "mount", "Line", "-"]
    ]
    |> make_via_list()
    |> Enum.concat([{{train}, "Via Fairmount Line"}])
  end

  defp stops_for_fairmount(1) do
    ["place-DB-0095", "place-forhl", "place-rugg", "place-bbsta"]
  end

  defp stops_for_fairmount(0) do
    ["place-bbsta", "place-rugg", "place-forhl", "place-NEC-2203", "place-DB-0095"]
  end

  def make_via_list(list) do
    list
    |> List.zip()
    |> Enum.map(fn {train, stop, value} -> {{train, stop}, value} end)
  end

  defp tab_name(conn, _), do: assign(conn, :tab, "timetable")

  @spec build_timetable([Stops.Stop.t()], [Schedules.Schedule.t()]) :: %{
          required(:trip_schedules) => %{
            required({Schedules.Trip.id_t(), Stops.Stop.id_t()}) => Schedules.Schedule.t()
          },
          required(:all_stops) => [Stops.Stop.t()]
        }
  def build_timetable(all_stops, schedules) do
    trip_schedules = Map.new(schedules, &trip_schedule(&1))
    all_stops = remove_unused_stops(all_stops, schedules)

    %{
      trip_schedules: trip_schedules,
      all_stops: all_stops
    }
  end

  @spec trip_schedule(Schedules.Schedule.t()) ::
          {{Schedules.Trip.id_t() | nil, Stops.Stop.id_t() | nil}, Schedules.Schedule.t()}
  defp trip_schedule(%Schedules.Schedule{trip: trip, stop: stop} = schedule)
       when not is_nil(trip) and not is_nil(stop) do
    {{trip.id, stop.id}, schedule}
  end

  defp trip_schedule(schedule) do
    :ok =
      Logger.warning(
        "module=#{__MODULE__} trip_schedule schedule=#{inspect(schedule)} #{if is_nil(schedule.trip), do: "no_trip"} #{if is_nil(schedule.stop), do: "no_stop"}"
      )

    {{nil, nil}, schedule}
  end

  @spec header_schedules(list) :: list
  defp header_schedules(timetable_schedules) do
    timetable_schedules
    |> Schedules.Sort.sort_by_first_times()
    |> Enum.map(&List.first/1)
  end

  @spec vehicle_schedules(Conn.t(), list) :: map
  def vehicle_schedules(%{assigns: %{date: date}}, timetable_schedules) do
    case Date.compare(date, Util.service_date()) do
      :eq -> do_vehicle_schedules(timetable_schedules)
      _ -> %{}
    end
  end

  def do_vehicle_schedules(timetable_schedules) do
    timetable_schedules
    |> Enum.map(&construct_vehicle_data/1)
    |> Map.new(&{"#{&1.stop_name}-#{&1.trip_id}", &1})
  end

  defp construct_vehicle_data(%Schedules.Schedule{
         stop: nil,
         stop_sequence: s,
         trip: %Schedules.Trip{id: ti, headsign: headsign}
       }) do
    %{stop_sequence: s, stop_name: headsign, trip_id: ti}
  end

  defp construct_vehicle_data(%Schedules.Schedule{
         stop: %Stops.Stop{name: sn},
         stop_sequence: s,
         trip: %Schedules.Trip{id: ti}
       }) do
    %{stop_sequence: s, stop_name: sn, trip_id: ti}
  end

  defp construct_vehicle_data(%Schedules.Schedule{
         route: %Route{description: :rail_replacement_bus},
         stop_sequence: s,
         trip: %Schedules.Trip{id: ti, headsign: headsign}
       }) do
    %{stop_sequence: s, stop_name: headsign, trip_id: ti}
  end

  defp construct_vehicle_data(_) do
    %{stop_sequence: nil, stop_name: nil, trip_id: nil}
  end

  @spec prior_stops(map) :: map
  def prior_stops(vehicle_schedules) do
    vehicle_schedules
    |> Map.values()
    |> Map.new(&{"#{&1.trip_id}-#{&1.stop_sequence}", "#{&1.stop_name}-#{&1.trip_id}"})
  end

  defp remove_unused_stops(all_stops, schedules) do
    timetable_stop = MapSet.new(schedules, & &1.stop.id)
    Enum.filter(all_stops, &MapSet.member?(timetable_stop, &1.id))
  end

  defp channel_id(conn, _) do
    assign(conn, :channel, "vehicles:#{conn.assigns.route.id}:#{conn.assigns.direction_id}")
  end
end
