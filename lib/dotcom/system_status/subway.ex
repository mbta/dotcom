defmodule Dotcom.SystemStatus.Subway do
  @moduledoc """
  A module that groups alerts into statuses for the system status
  widget. See `Dotcom.SystemStatus` for more information.
  """

  alias Alerts.Alert

  @type status_time() :: :current | {:future, DateTime.t()}

  @type status_t() :: :normal | Dotcom.SystemStatus.Alerts.service_effect_t()

  @type status_entry() :: %{
          status: status_t(),
          multiple: boolean(),
          time: status_time()
        }

  @type status_entry_group() :: %{
          branch_ids: [Routes.Route.id_t()],
          status_entries: [status_entry()]
        }

  @lines ["Blue", "Green", "Orange", "Red"]
  @doc """
  Returns the route_id's for the subway lines.
  """
  def lines(), do: @lines

  @doc """
  Translates the given alerts into a map indicating the overall system
  status for each line.

  ## Example
      iex> alerts =
      ...>   [
      ...>     %Alerts.Alert{
      ...>       effect: :shuttle,
      ...>       informed_entity: [%Alerts.InformedEntity{route: "Orange"}],
      ...>       active_period: [{Timex.beginning_of_day(Timex.now()), nil}]
      ...>     }
      ...>   ]
      iex> Dotcom.SystemStatus.Subway.subway_status(alerts, Timex.now())
      %{
        "Blue" => [%{branch_ids: [], status_entries: [%{time: :current, status: :normal, multiple: false}]}],
        "Orange" => [
          %{
            branch_ids: [],
            status_entries: [
              %{time: :current, status: :shuttle, multiple: false}
            ]
          }
        ],
        "Red" => [%{branch_ids: [], status_entries: [%{time: :current, status: :normal, multiple: false}]}],
        "Green" => [%{branch_ids: [], status_entries: [%{time: :current, status: :normal, multiple: false}]}]
      }

  Alerts for individual Green line branches are grouped together and
  presented under "Green", rather than being presented under a branch
  ID like "Green-D".

  ## Example
      iex> alerts =
      ...>   [
      ...>     %Alerts.Alert{
      ...>       effect: :delay,
      ...>       informed_entity: [%Alerts.InformedEntity{route: "Green-E"}],
      ...>       active_period: [{Timex.beginning_of_day(Timex.now()), nil}]
      ...>     },
      ...>     %Alerts.Alert{
      ...>       effect: :delay,
      ...>       informed_entity: [%Alerts.InformedEntity{route: "Green-D"}],
      ...>       active_period: [{Timex.beginning_of_day(Timex.now()), nil}]
      ...>     }
      ...>   ]
      iex> Dotcom.SystemStatus.Subway.subway_status(alerts, Timex.now())
      %{
        "Blue" => [%{branch_ids: [], status_entries: [%{time: :current, status: :normal, multiple: false}]}],
        "Orange" => [%{branch_ids: [], status_entries: [%{time: :current, status: :normal, multiple: false}]}],
        "Red" => [%{branch_ids: [], status_entries: [%{time: :current, status: :normal, multiple: false}]}],
        "Green" => [
          %{
            branch_ids: ["Green-D", "Green-E"],
            status_entries: [
              %{time: :current, status: :delay, multiple: false}
            ]
          },
          %{
            branch_ids: ["Green-B", "Green-C"],
            status_entries: [
              %{time: :current, status: :normal, multiple: false}
            ]
          }
        ]
      }

  The Mattapan line is usually not shown, but if it has any alerts,
  then it's shown as a branch of the Red line.

  ## Example
      iex> alerts =
      ...>   [
      ...>     %Alerts.Alert{
      ...>       effect: :suspension,
      ...>       informed_entity: [%Alerts.InformedEntity{route: "Mattapan"}],
      ...>       active_period: [{Timex.beginning_of_day(Timex.now()), nil}]
      ...>     }
      ...>   ]
      iex> Dotcom.SystemStatus.Subway.subway_status(alerts, Timex.now())
      %{
        "Blue" => [%{branch_ids: [], status_entries: [%{time: :current, status: :normal, multiple: false}]}],
        "Orange" => [%{branch_ids: [], status_entries: [%{time: :current, status: :normal, multiple: false}]}],
        "Red" => [
          %{
            branch_ids: [],
            status_entries: [
              %{time: :current, status: :normal, multiple: false}
            ]
          },
          %{
            branch_ids: ["Mattapan"],
            status_entries: [
              %{time: :current, status: :suspension, multiple: false}
            ]
          }
        ],
        "Green" => [%{branch_ids: [], status_entries: [%{time: :current, status: :normal, multiple: false}]}]
      }
  """
  @spec subway_status([Alert.t()], DateTime.t()) :: %{Routes.Route.id_t() => status_entry_group()}
  def subway_status(alerts, time) do
    @lines
    |> Map.new(fn line ->
      %{route_id: route_id, branches_with_statuses: branches_with_statuses} =
        add_nested_statuses_for_line(line, alerts, time)

      {route_id, branches_with_statuses}
    end)
  end

  # Returns a map corresponding to a single item in the array returned
  # by groups/2.
  #
  # (Note: `line_id` in this context is not necessarily a GTFS
  # line_id. The green line branches are grouped under the green line
  # both here and in GTFS, but in GTFS, Mattapan is its own line,
  # while in this context, Mattapan is grouped under Red.)
  #
  # The exact implementation depends on which line. Green and Red have
  # branches, so they have special implementations.
  @spec add_nested_statuses_for_line(Routes.Route.id_t(), [Alert.t()], DateTime.t()) :: %{
          route_id: Routes.Route.id_t(),
          branches_with_statuses: [status_entry_group()]
        }
  defp add_nested_statuses_for_line(line_id, alerts, time)

  # Green line nested-statuses implementation:
  #
  # Finds the alerts for each branch of the green line, maps them to
  # statuses, and then groups together any results that have the same
  # statuses.
  defp add_nested_statuses_for_line("Green", alerts, time) do
    %{
      route_id: "Green",
      branches_with_statuses:
        GreenLine.branch_ids()
        |> Enum.map(&add_statuses_for_route(&1, alerts, time))
        |> group_by_statuses()
        |> nest_grouped_statuses_under_branches()
        |> sort_branches()
    }
  end

  # Red line nested-statuses implementation:
  # Treat the red line statuses as normal, and add Mattapan if there
  # are any.
  defp add_nested_statuses_for_line("Red", alerts, time) do
    mattapan_branches_with_statuses =
      mattapan_branches_with_statuses(alerts, time)

    %{
      route_id: "Red",
      branches_with_statuses:
        branches_with_statuses("Red", alerts, time) ++ mattapan_branches_with_statuses
    }
  end

  # Default implementation for a simple subway line (with no
  # branches).
  defp add_nested_statuses_for_line(route_id, alerts, time) do
    %{
      route_id: route_id,
      branches_with_statuses: branches_with_statuses(route_id, alerts, time)
    }
  end

  # Groups the route/status-entry combinations by their statuses so
  # that branches with the same statuses can be combined.
  defp group_by_statuses(status_entries) do
    status_entries |> Enum.group_by(& &1.statuses) |> Enum.to_list()
  end

  # Nests grouped statuses under the branches_with_statuses
  # field. Exactly how it does this depends on whether
  # grouped_statuses has one entry or more.
  defp nest_grouped_statuses_under_branches(grouped_statuses)

  # If grouped_statuses has one entry, then that means that all of the
  # branches have the same status, which means we don't need to
  # specify any branches.
  defp nest_grouped_statuses_under_branches([{statuses, _}]) do
    [branch_with_statuses_entry(statuses)]
  end

  # If grouped_statuses has more than one entry, then we do need to
  # specify the branches for each collection of statuses.
  defp nest_grouped_statuses_under_branches(grouped_statuses) do
    grouped_statuses
    |> Enum.map(fn {statuses, entries} ->
      branch_ids = entries |> Enum.map(& &1.route_id) |> Enum.sort()

      branch_with_statuses_entry(statuses, branch_ids)
    end)
  end

  # Sorts green line branches first by alert status (that is, "Normal
  # Service" should come after any other alerts), and then by branch
  # ID (so that, say statuses for "Green-B" should come ahead of
  # "Green-C").
  @spec sort_branches([status_entry_group()]) :: [status_entry_group()]
  defp sort_branches(branches_with_statuses) do
    branches_with_statuses
    |> Enum.sort_by(fn %{status_entries: status_entries, branch_ids: branch_ids} ->
      {status_sort_order(status_entries), branch_ids}
    end)
  end

  # Sort order used in sort_branches/1 - sorts normal statuses ahead
  # of alerts.
  @spec status_sort_order([status_entry()]) :: integer()
  defp status_sort_order([%{time: :current, status: :normal}]), do: 1
  defp status_sort_order(_), do: 0

  # Returns a list containing a single status entry group corresponding
  # to the alerts for the given route.
  @spec branches_with_statuses(Routes.Route.id_t(), [Alert.t()], DateTime.t()) :: [
          status_entry_group()
        ]
  defp branches_with_statuses(route_id, alerts, time) do
    route_id
    |> statuses_for_route(alerts, time)
    |> branch_with_statuses_entry()
    |> then(&[&1])
  end

  # Behaves mostly like branches_with_statuses/3 when applied to
  # "Mattapan", except that if the status is normal, returns an empty
  # list.
  @spec mattapan_branches_with_statuses([Alert.t()], DateTime.t()) :: [status_entry_group()]
  defp mattapan_branches_with_statuses(alerts, time) do
    "Mattapan"
    |> alerts_for_route(alerts)
    |> case do
      [] ->
        []

      mattapan_alerts ->
        mattapan_statuses = mattapan_alerts |> alerts_to_statuses(time)

        [branch_with_statuses_entry(mattapan_statuses, ["Mattapan"])]
    end
  end

  # Exchanges a route_id (a line_id or a branch_id - anything that
  # might correspond to an alert) for a map with that route_id and the
  # statuses affecting that route.
  @spec add_statuses_for_route(Routes.Route.id_t(), [Alert.t()], DateTime.t()) :: %{
          route_id: Routes.Route.id_t(),
          statuses: [status_entry()]
        }
  defp add_statuses_for_route(route_id, alerts, time) do
    %{
      route_id: route_id,
      statuses: statuses_for_route(route_id, alerts, time)
    }
  end

  # Returns a list of statuses corresponding to the alerts for the
  # given route.
  @spec statuses_for_route(Routes.Route.id_t(), [Alert.t()], DateTime.t()) :: [status_entry()]
  defp statuses_for_route(route_id, alerts, time) do
    route_id
    |> alerts_for_route(alerts)
    |> alerts_to_statuses(time)
  end

  # Returns a branch_with_status entry, to be used in the
  # branches_with_statuses field in groups/2. If no branch_ids are
  # provided, then uses an empty array.
  @spec branch_with_statuses_entry([status_entry()], [Routes.Route.id_t()]) ::
          status_entry_group()
  defp branch_with_statuses_entry(statuses, branch_ids \\ []) do
    %{
      branch_ids: branch_ids,
      status_entries: statuses
    }
  end

  # Given `alerts` and `route_id`, filters out only the alerts
  # applicable to the given route, using the alert's "informed
  # entities".
  @spec alerts_for_route(Routes.Route.id_t(), [Alert.t()]) :: [Alert.t()]
  defp alerts_for_route(route_id, alerts) do
    alerts
    |> Enum.filter(fn %Alert{informed_entity: informed_entity} ->
      informed_entity
      |> Enum.any?(fn
        %{route: ^route_id} -> true
        %{} -> false
      end)
    end)
  end

  # Maps a list of alerts to a list of statuses that are formatted
  # according to the system status specifications:
  # - Identical alerts are grouped together and pluralized.
  # - Times are given as a kitchen-formatted string, nil, or "Now".
  # - Statuses are sorted alphabetically.
  @spec alerts_to_statuses([Alert.t()], DateTime.t()) :: [status_entry()]
  defp alerts_to_statuses(alerts, time) do
    alerts
    |> alerts_to_statuses_naive(time)
    |> consolidate_duplicates()
    |> sort_statuses()
  end

  # Naively maps a list of alerts to a list of statuses, where a
  # status is a simple structure with a route, a status, and a
  # few additional fields that determine how it will render in the
  # frontend.
  @spec alerts_to_statuses_naive([Alert.t()], DateTime.t()) :: [status_entry()]
  defp alerts_to_statuses_naive(alerts, time)

  # If there are no alerts, then we want a single status indicating
  # "Normal Service".
  defp alerts_to_statuses_naive([], _time) do
    [%{multiple: false, status: :normal, time: :current}]
  end

  # If there are alerts, then create a starting list of statuses that
  # maps one-to-one with the alerts provided.
  defp alerts_to_statuses_naive(alerts, time) do
    alerts
    |> Enum.map(fn alert ->
      alert_to_status(alert, time)
    end)
  end

  # Translates an alert to a status:
  #  - The effect is humanized into a status for the status.
  #  - If the alert's already active, `time` is set to `nil`.
  #  - If the alert is in the future, `time` is set to the alert's
  #    start time
  @spec alert_to_status(Alert.t(), DateTime.t()) :: status_entry()
  defp alert_to_status(alert, time) do
    time = future_start_time(alert.active_period, time)

    %{multiple: false, status: alert.effect, time: time}
  end

  # - If the active period is in the future, returns its start_time.
  # - If the active period indicates that the alert is currently active, returns nil.
  # - Raises an error if the alert is completely in the past.
  @spec future_start_time([Alert.period_pair()], DateTime.t()) :: status_time()
  defp future_start_time(
         [{start_time, _end_time} = first_active_period | more_active_periods],
         time
       ) do
    cond do
      ends_before?(first_active_period, time) -> future_start_time(more_active_periods, time)
      starts_before?(first_active_period, time) -> :current
      true -> {:future, start_time}
    end
  end

  # Returns true if the active period ends before the time given. An
  # end-time of false indicates an indefinite active period, which
  # never ends.
  @spec ends_before?(Alert.period_pair(), DateTime.t()) :: boolean()
  defp ends_before?({_start_time, nil}, _time), do: false
  defp ends_before?({_start_time, end_time}, time), do: Timex.before?(end_time, time)

  # Returns true if the active period starts before the time given.
  @spec starts_before?(Alert.period_pair(), DateTime.t()) :: boolean()
  defp starts_before?({start_time, _end_time}, time), do: Timex.before?(start_time, time)

  # Combines statuses that have the same active time and status
  # into a single pluralized status (e.g. "Station Closures" instead
  # of "Station Closure").
  @spec consolidate_duplicates([status_entry()]) :: [status_entry()]
  defp consolidate_duplicates(statuses) do
    statuses
    |> Enum.group_by(fn %{time: time, status: status} -> {time, status} end)
    |> Enum.map(fn
      {_, [status]} -> status
      {_, [status | _]} -> status |> Map.put(:multiple, true)
    end)
  end

  # Sorts the given list of statuses first by time, then by
  # status, so that earlier statuses show up before later ones,
  # and then to keep statuses in a stable order.
  #
  # This takes advantage of the fact that `nil` is sorted before
  # anything else, which allows it to automatically sort active
  # statuses before future ones.
  # 
  # This should be called before &stringify_times/1, otherwise times
  # will get sorted lexically instead of temporally (e.g. 10:00pm will
  # get sorted ahead of 9:00pm).
  @spec sort_statuses([status_entry()]) :: [status_entry()]
  defp sort_statuses(statuses) do
    statuses
    |> Enum.sort_by(fn %{time: time, status: status} -> {time, status} end)
  end
end
