defmodule DotcomWeb.ScheduleController.TimetableController do
  @moduledoc "Handles the Timetable tab for commuter rail routes."

  use Dotcom.Gettext.Sigils
  use DotcomWeb, :controller

  require Logger

  import Dotcom.SystemStatus.CommuterRail, only: [commuter_rail_route_status: 1]

  alias Dotcom.TimetableLoader
  alias DotcomWeb.ScheduleView
  alias Plug.Conn
  alias RoutePatterns.RoutePattern
  alias Routes.Route
  alias Stops.Stop

  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]
  @loop_ferries ["Boat-F6", "Boat-F7"]

  plug(DotcomWeb.Plugs.Route)
  plug(DotcomWeb.Plugs.DateInRating)
  plug(:tab_name)
  plug(:direction_id)
  plug(DotcomWeb.ScheduleController.RoutePdfs)
  plug(DotcomWeb.ScheduleController.DatePicker)
  plug(DotcomWeb.ScheduleController.Core)
  plug(:alert_blocks)
  plug(:do_assign_trip_schedules)
  plug(DotcomWeb.ScheduleController.ScheduleError)

  defdelegate direction_id(conn, params),
    to: DotcomWeb.ScheduleController.Defaults,
    as: :assign_direction_id

  def show(conn, _) do
    direction_id = conn.assigns[:direction_id]
    direction_name = conn.assigns.route.direction_names[direction_id]

    formatted_date = Dotcom.Utils.Time.format!(conn.assigns.date, :full_date)

    meta_description =
      gettext(
        "MBTA %{route_name} %{station_name} and schedules, including timetables, maps, fares, real-time updates, parking and accessibility information, and connections.",
        route_name: route_name_for_description(conn.assigns.route),
        station_name: station_type_name(conn.assigns.route)
      )

    conn
    |> assign(:meta_description, meta_description)
    |> assign(:direction_name, direction_name)
    |> assign(:formatted_date, formatted_date)
    |> assign_cr_status()
    |> assign_banner_alerts()
    |> put_view(ScheduleView)
    |> render("show.html", [])
  end

  defp route_name_for_description(%Route{type: 2} = route) do
    gettext("%{name} Commuter Rail", name: route.name)
  end

  defp route_name_for_description(route), do: route.name

  defp station_type_name(%Route{type: 4}), do: ~t"docks"
  defp station_type_name(_route), do: ~t"stations"

  defp assign_cr_status(%{assigns: %{route: route}} = conn) do
    cr_status =
      if Routes.Route.type_atom(route) == :commuter_rail do
        commuter_rail_route_status(route.id)
      end

    conn |> assign(:cr_status, cr_status)
  end

  defp assign_banner_alerts(%{assigns: %{alerts: alerts, cr_status: cr_status}} = conn) do
    status_alert_ids =
      case cr_status do
        status when is_map(status) ->
          cr_status
          |> Enum.flat_map(fn {_, entries} -> entries |> Enum.map(& &1.alert.id) end)

        _ ->
          []
      end
      |> MapSet.new()

    banner_alerts = alerts |> Enum.reject(&MapSet.member?(status_alert_ids, &1.id))

    conn
    |> assign(:banner_alerts, banner_alerts)
  end

  # Plug that assigns trip schedule to the connection
  defp do_assign_trip_schedules(conn, _) do
    Util.log_duration(__MODULE__, :assign_trip_schedules, [conn])
  end

  def alert_blocks(conn, _) do
    assign(
      conn,
      :blocking_alert,
      Dotcom.TimetableBlocking.blocking_alert(
        conn.assigns.alerts,
        conn.assigns.route,
        conn.assigns.date
      )
    )
  end

  def assign_trip_schedules(
        %{assigns: %{route: route, blocking_alert: nil, date_in_rating?: true}} = conn
      )
      when route.id in @loop_ferries do
    case TimetableLoader.from_csv(route.id, conn.assigns.direction_id, conn.assigns.date) do
      {:ok, timetable_schedules} ->
        header_schedules = List.first(timetable_schedules, [])

        header_stops =
          timetable_schedules
          |> Enum.map(&List.first/1)
          |> Enum.with_index(fn trip, index ->
            {@stops_repo.get(trip.stop_id), index}
          end)

        conn
        |> assign(:use_pdf_schedules?, true)
        |> assign(:timetable_schedules, timetable_schedules)
        |> assign(:header_schedules, header_schedules)
        |> assign(:header_stops, header_stops)

      {:error, _} ->
        conn
        |> assign(:suppress_timetable?, true)
        |> assign(:timetable_schedules, [])
        |> assign(:header_schedules, [])
    end
  end

  def assign_trip_schedules(
        %{
          assigns: %{
            route: route,
            direction_id: direction_id,
            blocking_alert: nil,
            date_in_rating?: true
          }
        } = conn
      ) do
    timetable_schedules = timetable_schedules(conn)
    trip_ids = Enum.map(timetable_schedules, & &1.trip.id)

    %{
      trip_schedules: trip_schedules,
      trip_stops: trip_stops
    } = build_timetable(conn, timetable_schedules)

    header_schedules =
      trip_schedules
      |> Map.values()
      |> Kernel.then(&header_schedules(route, &1))

    track_changes = track_changes(trip_schedules, Enum.map(trip_stops, & &1.id))

    header_stops =
      trip_stops
      |> Enum.map(&@stops_repo.get_parent/1)
      |> Enum.with_index()

    conn
    |> assign(:timetable_schedules, timetable_schedules)
    |> call_plug(DotcomWeb.ScheduleController.Offset)
    |> assign(:header_schedules, header_schedules)
    |> assign(:header_stops, header_stops)
    |> assign(:trip_schedules, trip_schedules)
    |> assign(:track_changes, track_changes)
    |> assign(:trip_messages, trip_messages(route, direction_id, trip_ids))
  end

  def assign_trip_schedules(conn) do
    conn
    |> assign(:timetable_schedules, [])
    |> assign(:header_schedules, [])
  end

  @spec track_changes(
          %{required({Schedules.Trip.id_t(), Stop.id_t()}) => Schedules.Schedule.t()},
          [Stop.id_t()]
        ) :: %{
          required({Schedules.Trip.id_t(), Stop.id_t()}) => Stop.t() | nil
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
          [Stop.id_t()]
        ) :: Stop.t() | nil
  @doc """
  If the scheduled platform stop is not canonical, then return the stop of that track change.
  """
  def track_change_for_schedule(schedule, canonical_stop_ids, stop_get_fn \\ &@stops_repo.get/1) do
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
    length(canonical_stop_ids) > 0 &&
      schedule.platform_stop_id not in canonical_stop_ids
  end

  # Helper function for obtaining schedule data
  @spec timetable_schedules(Plug.Conn.t()) :: [Schedules.Schedule.t()]
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
  order to match the PDF schedules.
  """
  @spec trip_messages(Routes.Route.t(), 0 | 1, [Schedules.Trip.id_t()]) :: %{
          {String.t(), String.t()} => String.t()
        }
  def trip_messages(%Routes.Route{id: route_id}, direction, trip_ids)
      when route_id in ~w(CR-Franklin CR-Providence) do
    Dotcom.ViaFairmount.trip_names(trip_ids)
    |> Enum.flat_map(&franklin_via_fairmount(&1, direction))
    |> Enum.into(%{})
  end

  def trip_messages(_, _, _) do
    %{}
  end

  defp franklin_via_fairmount(train, direction) do
    stops = stops_for_fairmount(train, direction)

    [
      List.duplicate(train, length(stops)),
      stops,
      [~t"Via", "Fairmount", "Line", "-"]
    ]
    |> make_via_list()
    |> Enum.concat([{{train}, ~t"Via" <> " " <> "Fairmount Line"}])
  end

  # As of Spring 2025, weekend train numbers are 4-digits leading with 5
  # These weekend trains happen to skip Forest Hills.
  defp stops_for_fairmount(<<"5", _rest::binary-size(3)>>, 0) do
    ~w[place-bbsta place-rugg place-NEC-2203]
  end

  defp stops_for_fairmount(_, 0) do
    ~w[place-bbsta place-rugg place-forhl place-NEC-2203]
  end

  defp stops_for_fairmount(<<"5", _rest::binary-size(3)>>, 1) do
    ~w[place-NEC-2203 place-rugg place-bbsta]
  end

  defp stops_for_fairmount(_, 1) do
    ~w[place-NEC-2203 place-forhl place-rugg place-bbsta]
  end

  def make_via_list(list) do
    list
    |> Enum.zip()
    |> Enum.map(fn {train, stop, value} -> {{train, stop}, value} end)
  end

  defp tab_name(conn, _), do: assign(conn, :tab, ~t"timetable")

  @doc """
  Organize the route's schedules for timetable format, where schedules are laid
  out horizontally by stop and vertically by trip.

  Trips are derived from the input schedules, but stops are fetched for the
  given route and direction via the route pattern relation. Where possible,
  canonical route patterns are used to determine the ordered list of stops
  visited. This list is augmented further by the input schedules, which may
  introduce additional stops (in the case of a new shuttle route) or removed
  stops (if such stop is skipped entirely).

  Stops from trips from multiple route patterns are consolidated into a single
  list of unique, ordered stops, taking into consideration directional branching
  (e.g. Newburyport/Rockport overlapping for half its route), multi-platform
  stations (i.e. trips using different stop IDs that are actually in the same
  station), station busways (which, like platforms, have distinct stop IDs), and
  shuttle stops (which may or may not be associated with a station).
  """
  @spec build_timetable(Conn.t(), [Schedules.Schedule.t()]) :: %{
          required(:trip_schedules) => %{
            required({Schedules.Trip.id_t(), Stops.Stop.id_t()}) => Schedules.Schedule.t()
          },
          required(:trip_stops) => [Stops.Stop.t()]
        }
  def build_timetable(conn, schedules) do
    trip_schedules = Map.new(schedules, &trip_schedule(&1))
    inbound? = conn.assigns.direction_id == 1

    trip_stops =
      conn.assigns.route.id
      |> @route_patterns_repo.by_route_id(
        direction_id: conn.assigns.direction_id,
        canonical: Routes.Route.type_atom(conn.assigns.route) in [:commuter_rail, :subway]
      )
      |> with_prioritized_pattern()
      |> Enum.map(&@stops_repo.by_trip(&1.representative_trip_id))
      |> handle_ferry_stops(conn.assigns.route.id, inbound?)
      |> Enum.reduce([], &merge_stop_lists(&1, &2, inbound?))
      |> remove_unused_stops(schedules)
      |> add_new_stops(schedules, inbound?)

    %{
      trip_schedules:
        trip_schedules
        |> Map.reject(&schedule_from_other_stop?(&1, trip_stops))
        |> remove_single_stop_trips(),
      trip_stops: trip_stops
    }
  end

  # Timetable stops will be ordered based on the route patterns from which they
  # correspond to, but some timetable PDFs are laid out differently than that
  # from the default route pattern sort_order. For these cases, we need to
  # manipulate this by adjusting which route pattern is processed first.
  defp with_prioritized_pattern([%RoutePattern{route_id: "CR-Providence"} | _] = route_patterns) do
    route_patterns
    |> with_prioritized_pattern("Stoughton")
  end

  defp with_prioritized_pattern([%RoutePattern{route_id: "CR-NewBedford"} | _] = route_patterns) do
    route_patterns
    |> with_prioritized_pattern("Fall River")
  end

  defp with_prioritized_pattern([%RoutePattern{route_id: "CR-Foxboro"} | _] = route_patterns) do
    route_patterns
    |> with_prioritized_pattern("South Station - Foxboro")
  end

  defp with_prioritized_pattern(route_patterns), do: route_patterns

  defp with_prioritized_pattern(route_patterns, pattern_name) do
    Enum.sort_by(route_patterns, &String.contains?(&1.name, pattern_name), :desc)
  end

  @ferry_inbound_ids %{
    "Boat-F1" => [
      "Boat-Hingham",
      "Boat-Hull",
      "Boat-George",
      "Boat-Logan",
      "Boat-Rowes",
      "Boat-Long"
    ],
    "Boat-F6" => [
      "Boat-Winthrop",
      "Boat-Quincy",
      "Boat-Logan",
      "Boat-Fan",
      "Boat-Aquarium"
    ],
    "Boat-F7" => [
      "Boat-Quincy",
      "Boat-Logan",
      "Boat-Fan",
      "Boat-Aquarium"
    ]
  }
  @ferry_inbound_keys Map.keys(@ferry_inbound_ids)

  # For ferry routes with many disjoint/overlapping route patterns,
  # concatenating the lists of stops does not produce readable results. Since
  # these routes are short, we can hardcode the order.
  defp handle_ferry_stops(stop_lists, route_id, inbound?)
       when route_id in @ferry_inbound_keys do
    ordered_ids =
      if inbound? do
        @ferry_inbound_ids[route_id]
      else
        Enum.reverse(@ferry_inbound_ids[route_id])
      end

    stops = Enum.flat_map(stop_lists, & &1) |> Enum.uniq()

    [
      Enum.map(ordered_ids, fn id ->
        Enum.find(stops, &(&1.id == id))
      end)
    ]
  end

  defp handle_ferry_stops(stop_lists, _, _), do: stop_lists

  defp schedule_from_other_stop?({{_, stop_id}, _}, stops) do
    !contains_stop?(stops, %Stop{id: stop_id})
  end

  defp remove_single_stop_trips(trip_schedules) do
    single_stop_trip_ids =
      trip_schedules
      |> Enum.frequencies_by(fn {{trip_id, _}, _} -> trip_id end)
      |> Enum.filter(fn {_, count} -> count == 1 end)
      |> Enum.map(fn {trip_id, _} -> trip_id end)

    trip_schedules
    |> Map.reject(fn {{trip_id, _}, _} ->
      trip_id in single_stop_trip_ids
    end)
  end

  @spec merge_stop_lists([Stop.t()], [Stop.t()], boolean()) :: [Stop.t()]
  defp merge_stop_lists(incoming_stops, base_stops, inbound?) do
    if Enum.all?(incoming_stops, &contains_stop?(base_stops, &1)) do
      base_stops
    else
      incoming_stops
      |> Enum.reject(&contains_stop?(base_stops, &1))
      |> do_merge_stop_lists(base_stops, inbound?)
    end
  end

  @spec contains_stop?([Stop.t()], Stop.t()) :: boolean()
  defp contains_stop?(stops, %Stops.Stop{id: id, parent_id: parent_id}) do
    stop_ids =
      stops
      |> Enum.flat_map(&[&1.id, &1.parent_id])
      |> Enum.reject(&is_nil/1)

    id in stop_ids or parent_id in stop_ids
  end

  defp contains_stop?(_stops, _), do: false

  # Some shuttle stops must be placed manually within the existing stops. Each
  # key is a scheduled stop ID from a shuttle, and the corresponding value is
  # the name of the canonical rail stop it should be placed adjacent to in the
  # inbound direction
  @shuttle_overrides %{
    # Lynn busway is near Lynn Interim station
    "14748" => {:after, "Lynn Interim"},
    # Braintree busway
    "38671" => {:after, "Weymouth Landing/East Braintree"},
    # Anderson/Woburn is after Ballardvale on Haverhill line shuttle
    "place-NHRML-0127" => {:after, "Ballardvale"},
    # Anderson/Woburn Busway is after Reading on Haverhill line shuttle
    "NHRML-0127-B" => {:after, "Reading"},
    # Lynn station
    "place-ER-0115" => {:after, "Swampscott"},
    # Wonderland station
    "place-wondl" => {:after, "Lynn"},
    # Add Readville (canonically on other routes) back into the Providence timetable
    "place-DB-0095" => {:after, "Route 128"},
    # Add Newton Highlands shuttle stop to Needham timetable
    "place-newtn" => {:before, "Needham Heights"},
    # Foxboro - Mansfield shuttle stops
    "place-NEC-2040" => {:after, "Bird St @ Railroad Ave - Foxboro Town Centre"},
    "FoxboroTownCentre-S" => {:after, "Foxboro"},
    # Worcester shuttle stops
    "place-kencl" => {:after, "Boston Landing"},
    "7651" => {:before, "Newtonville"},
    "7631" => {:before, "Boston Landing"},
    "9370044" => {:before, "Washington St @ Walnut St"},
    "place-river" => {:after, "Wellesley Hills"}
  }
  @shuttle_ids Map.keys(@shuttle_overrides)

  @spec do_merge_stop_lists([Stop.t()], [Stop.t()], boolean()) :: [Stop.t()]
  defp do_merge_stop_lists(stops, [], _), do: stops

  defp do_merge_stop_lists(
         [%Stop{id: id} = stop],
         base_stops,
         inbound?
       )
       when id in @shuttle_ids do
    merge_into_stop_list(stop, base_stops, inbound?)
  end

  defp do_merge_stop_lists(stops, base_stops, inbound?) do
    if inbound? do
      stops ++ base_stops
    else
      base_stops ++ stops
    end
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

  defp header_schedules(%Route{description: :ferry}, schedules) do
    schedules
    |> Schedules.Sort.sort_by_first_departure()
    |> Enum.map(&List.first/1)
  end

  defp header_schedules(%Route{}, schedules) do
    schedules
    |> Schedules.Sort.sort_by_first_shared_stop()
    |> Enum.map(&List.first/1)
  end

  defp remove_unused_stops(all_stops, schedules) do
    timetable_stops = Enum.map(schedules, & &1.stop) |> Enum.uniq()
    Enum.filter(all_stops, &contains_stop?(timetable_stops, &1))
  end

  defp add_new_stops(all_stops, schedules, inbound?) do
    schedules
    |> Enum.map(& &1.stop)
    |> Enum.uniq()
    |> Enum.reject(&contains_stop?(all_stops, &1))
    |> Enum.sort_by(& &1.id)
    |> Enum.reduce(all_stops, &merge_into_stop_list(&1, &2, inbound?))
  end

  defp merge_into_stop_list(new_stop, base_list, inbound?) do
    with {before_or_after, adjacent_name} <- @shuttle_overrides[new_stop.id],
         index when not is_nil(index) <-
           Enum.find_index(base_list, &match?(%Stops.Stop{name: ^adjacent_name}, &1)) do
      position = insertion_position(before_or_after, inbound?, index)
      List.insert_at(base_list, position, new_stop)
    else
      _ ->
        base_list
    end
  end

  # the after/before label is based on the inbound direction, so needs
  # adjustment for the outbound direction
  defp insertion_position(:before, true, index), do: index
  defp insertion_position(:before, false, index), do: index + 1
  defp insertion_position(:after, true, index), do: index + 1
  defp insertion_position(:after, false, index), do: index
end
