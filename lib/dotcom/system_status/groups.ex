defmodule Dotcom.SystemStatus.Groups do
  @moduledoc """

  A module that groups alerts into statuses for the system status
  widget. See `Dotcom.SystemStatus` for more information.

  """

  alias Alerts.Alert

  # @lines is sorted in the order in which `groups/2` should sort its results
  @lines ["Blue", "Orange", "Red", "Green"]
  @green_line_branches ["Green-B", "Green-C", "Green-D", "Green-E"]

  @doc """

  Returns a data structure that can be used in the system status
  widget.

  This data structure is designed to be dropped directly into a
  frontend component that will render the info nicely on the
  screen. See `Dotcom.SystemStatus` for more details.

  ## Example (no alerts)
      iex> Dotcom.SystemStatus.Groups.groups([], Timex.now())
      [
        %{route_id: "Blue", branches_with_statuses: [%{branch_ids: [], statuses: [%{time: nil, description: "Normal Service"}]}]},
        %{route_id: "Orange", branches_with_statuses: [%{branch_ids: [], statuses: [%{time: nil, description: "Normal Service"}]}]},
        %{route_id: "Red", branches_with_statuses: [%{branch_ids: [], statuses: [%{time: nil, description: "Normal Service"}]}]},
        %{route_id: "Green", branches_with_statuses: [%{branch_ids: [], statuses: [%{time: nil, description: "Normal Service"}]}]}
      ]

  ## Example (one alert on a heavy rail line)
      iex> alerts =
      ...>   [
      ...>     %Alerts.Alert{
      ...>       effect: :shuttle,
      ...>       informed_entity: [%Alerts.InformedEntity{route: "Orange"}],
      ...>       active_period: [{Timex.beginning_of_day(Timex.now()), nil}]
      ...>     }
      ...>   ]
      iex> Dotcom.SystemStatus.Groups.groups(alerts, Timex.now())
      [
        %{route_id: "Blue", branches_with_statuses: [%{branch_ids: [], statuses: [%{time: nil, description: "Normal Service"}]}]},
        %{
          route_id: "Orange",
          branches_with_statuses: [
            %{
              branch_ids: [],
              statuses: [
                %{time: nil, description: "Shuttle Buses"}
              ]
            }
          ]
        },
        %{route_id: "Red", branches_with_statuses: [%{branch_ids: [], statuses: [%{time: nil, description: "Normal Service"}]}]},
        %{route_id: "Green", branches_with_statuses: [%{branch_ids: [], statuses: [%{time: nil, description: "Normal Service"}]}]}
      ]

  Alerts for Green line branches are grouped together, so that instead
  of showing up as top-level alerts, they're presented under the
  top-level Green line route, with the branches presented as
  `sub_routes`. When alerts only apply to some Green line branches,
  then the others are shown with "Normal service"

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
      iex> Dotcom.SystemStatus.Groups.groups(alerts, Timex.now())
      [
        %{route_id: "Blue", branches_with_statuses: [%{branch_ids: [], statuses: [%{time: nil, description: "Normal Service"}]}]},
        %{route_id: "Orange", branches_with_statuses: [%{branch_ids: [], statuses: [%{time: nil, description: "Normal Service"}]}]},
        %{route_id: "Red", branches_with_statuses: [%{branch_ids: [], statuses: [%{time: nil, description: "Normal Service"}]}]},
        %{
          route_id: "Green",
          branches_with_statuses: [
            %{
              branch_ids: ["Green-D", "Green-E"],
              statuses: [
                %{time: nil, description: "Delays"}
              ]
            },
            %{
              branch_ids: ["Green-B", "Green-C"],
              statuses: [
                %{time: nil, description: "Normal Service"}
              ]
            }
          ]
        }
      ]

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
      iex> Dotcom.SystemStatus.Groups.groups(alerts, Timex.now())
      [
        %{route_id: "Blue", branches_with_statuses: [%{branch_ids: [], statuses: [%{time: nil, description: "Normal Service"}]}]},
        %{route_id: "Orange", branches_with_statuses: [%{branch_ids: [], statuses: [%{time: nil, description: "Normal Service"}]}]},
        %{
          route_id: "Red",
          branches_with_statuses: [
            %{
              branch_ids: [],
              statuses: [
                %{time: nil, description: "Normal Service"}
              ]
            },
            %{
              branch_ids: ["Mattapan"],
              statuses: [
                %{time: nil, description: "Suspension"}
              ]
            }
          ]
        },
        %{route_id: "Green", branches_with_statuses: [%{branch_ids: [], statuses: [%{time: nil, description: "Normal Service"}]}]}
      ]

  """
  def groups(alerts, time) do
    @lines |> Enum.map(&add_nested_statuses_for_line(&1, alerts, time))
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
        @green_line_branches
        |> Enum.map(&add_statuses_for_route(&1, alerts, time))
        |> group_by_statuses()
        |> nest_grouped_statuses_under_branches()
        |> sort_branches()
    }
  end

  # Red line nested-statuses implementation:
  defp add_nested_statuses_for_line("Red", alerts, time) do
    mattapan_branches_with_statuses =
      mattapan_branches_with_statuses(alerts, time)

    %{
      route_id: "Red",
      branches_with_statuses:
        red_branches_with_statuses(alerts, time) ++ mattapan_branches_with_statuses
    }
  end

  # Default implementation for a simple subway line (with no
  # branches).
  defp add_nested_statuses_for_line(line_id, alerts, time) do
    line_id
    |> add_statuses_for_route(alerts, time)
    |> then(fn %{route_id: route_id, statuses: statuses} ->
      %{
        route_id: route_id,
        branches_with_statuses: [branch_with_statuses_entry(statuses)]
      }
    end)
  end

  defp group_by_statuses(status_entries) do
    status_entries
    |> Enum.group_by(& &1.statuses)
    |> Enum.to_list()
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
  defp sort_branches(branches_with_statuses) do
    branches_with_statuses
    |> Enum.sort_by(fn %{statuses: statuses, branch_ids: branch_ids} ->
      {status_sort_order(statuses), branch_ids}
    end)
  end

  defp status_sort_order([%{time: nil, description: "Normal Service"}]), do: 1
  defp status_sort_order(_), do: 0

  # Returns an array containing a single branch_with_statuses entry
  # for the red line, to be combined with Mattapan entries if there are any.
  defp red_branches_with_statuses(alerts, time) do
    "Red"
    |> statuses_for_route(alerts, time)
    |> branch_with_statuses_entry()
    |> then(&[&1])
  end

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
  defp add_statuses_for_route(route_id, alerts, time) do
    %{
      route_id: route_id,
      statuses: statuses_for_route(route_id, alerts, time)
    }
  end

  defp statuses_for_route(route_id, alerts, time) do
    route_id
    |> alerts_for_route(alerts)
    |> alerts_to_statuses(time)
  end

  # Returns a branch_with_status entry, to be used in the
  # branches_with_statuses field in groups/2. If no branch_ids are
  # provided, then uses an empty array.
  # 
  defp branch_with_statuses_entry(statuses, branch_ids \\ []) do
    %{
      branch_ids: branch_ids,
      statuses: statuses
    }
  end

  # Given `alerts` and `route_id`, filters out only the alerts
  # applicable to the given route, using the alert's "informed
  # entities".
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
  defp alerts_to_statuses(alerts, time) do
    alerts
    |> alerts_to_statuses_naive(time)
    |> consolidate_duplicate_descriptions()
    |> sort_statuses()
    |> stringify_times()
    |> maybe_add_now_text()
  end

  # Naively maps a list of alerts to a list of statuses, where a
  # status is a simple structure with a route, a description, and a
  # few additional fields that determine how it will render in the
  # frontend.
  defp alerts_to_statuses_naive(alerts, time)

  # If there are no alerts, then we want a single status indicating
  # "Normal Service".
  defp alerts_to_statuses_naive([], _time) do
    [%{description: "Normal Service", time: nil}]
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
  #  - The effect is humanized into a description for the status.
  #  - If the alert's already active, `time` is set to `nil`.
  #  - If the alert is in the future, `time` is set to the alert's
  #    start time
  defp alert_to_status(alert, time) do
    description =
      case alert.effect do
        :delay -> "Delays"
        :shuttle -> "Shuttle Buses"
        :station_closure -> "Station Closure"
        :suspension -> "Suspension"
      end

    time = future_start_time(alert.active_period, time)

    %{description: description, time: time}
  end

  # - If the active period is in the future, returns its start_time.
  # - If the active period indicates that the alert is currently active, returns nil.
  # - Raises an error if the alert is completely in the past.
  defp future_start_time(
         [{start_time, _end_time} = first_active_period | more_active_periods],
         time
       ) do
    cond do
      ends_before?(first_active_period, time) -> future_start_time(more_active_periods, time)
      starts_before?(first_active_period, time) -> nil
      true -> start_time
    end
  end

  # Returns true if the active period ends before the time given. An
  # end-time of false indicates an indefinite active period, which
  # never ends.
  defp ends_before?({_start_time, nil}, _time), do: false
  defp ends_before?({_start_time, end_time}, time), do: Timex.before?(end_time, time)

  # Returns true if the active period starts before the time given.
  defp starts_before?({start_time, _end_time}, time), do: Timex.before?(start_time, time)

  # Combines statuses that have the same active time and description
  # into a single pluralized status (e.g. "Station Closures" instead
  # of "Station Closure").
  defp consolidate_duplicate_descriptions(statuses) do
    statuses
    |> Enum.group_by(fn %{time: time, description: description} -> {time, description} end)
    |> Enum.map(fn
      {_, [status]} -> status
      {_, [status | _]} -> pluralize_description(status)
    end)
  end

  # Replaces the description of a status with its plural form, for use
  # in &consolidate_duplicate_descriptions/2, when multiple statuses
  # have the same time and effect.
  defp pluralize_description(%{description: description} = status) do
    %{status | description: Inflex.pluralize(description)}
  end

  # Sorts the given list of statuses first by time, then by
  # description, so that earlier statuses show up before later ones,
  # and then to keep statuses in a stable order.
  #
  # This takes advantage of the fact that `nil` is sorted before
  # anything else, which allows it to automatically sort active
  # statuses before future ones.
  # 
  # This should be called before &stringify_times/1, otherwise times
  # will get sorted lexically instead of temporally (e.g. 10:00pm will
  # get sorted ahead of 9:00pm).
  defp sort_statuses(statuses) do
    statuses
    |> Enum.sort_by(fn %{time: time, description: description} -> {time, description} end)
  end

  # Transforms the time in each status given into a human-readable
  # string or nil.
  defp stringify_times(statuses) do
    statuses
    |> Enum.map(fn status ->
      %{
        status
        | time: stringify_time(status.time)
      }
    end)
  end

  # Returns a human-readable version of the time given, formatted like
  # "8:30pm", for example. Leaves nil unchanged.
  defp stringify_time(nil), do: nil
  defp stringify_time(time), do: Util.kitchen_downcase_time(time)

  # The `time` attribute of a status governs how a status should be
  # rendered. An alert that's currently active should typically only
  # show its description, while an alert in the future should show the
  # stringified time as well. If there is both an active status and a
  # future status, then active statuses should show "Now" instead of
  # not showing a time.
  #
  # We accomplish this by setting the `time` attribute of a status to
  # `nil` if we don't want it to be rendered, and to some string if we
  # want that string rendered.
  #
  # This function checks whether there are any future statuses, and if
  # so, replaces any `nil` times with "Now".
  defp maybe_add_now_text(statuses) do
    if any_future_statuses?(statuses) do
      statuses |> Enum.map(&add_now_text/1)
    else
      statuses
    end
  end

  # Checks the list of statuses to see if any of them have a non-nil
  # `time` field, which would indicate that at least one status is for
  # the future, rather than currently active.
  defp any_future_statuses?(statuses) do
    statuses
    |> Enum.any?(fn
      %{time: nil} -> false
      %{} -> true
    end)
  end

  # If the time for a status is `nil`, replaces it with the string "Now".
  # Leaves the status unchanged if it has a non-nil `time` attribute.
  defp add_now_text(%{time: nil} = status), do: %{status | time: "Now"}
  defp add_now_text(status), do: status
end
