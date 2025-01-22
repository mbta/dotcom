defmodule Dotcom.SystemStatus.Groups do
  @moduledoc """
  A module that groups alerts into statuses for the system status widget.
  """

  alias Alerts.Alert

  # &groups/2 returns an ordered data structure, sorted in the order
  # given by `@lines`.
  @lines ["Blue", "Orange", "Red", "Green"]
  @green_line_branches ["Green-B", "Green-C", "Green-D", "Green-E"]
  @routes ["Blue", "Mattapan", "Orange", "Red"] ++ @green_line_branches

  def groups(alerts, time) do
    grouped_alerts = Map.new(@routes, &{&1, alerts_for_line(alerts, &1)})

    @routes
    |> Enum.map(fn route_id ->
      statuses =
        grouped_alerts
        |> Map.get(route_id)
        |> alerts_to_statuses(time)
        |> consolidate_duplicate_descriptions()
        |> sort_statuses()
        |> stringify_times()
        |> maybe_add_now_text()

      %{route_id: route_id, sub_routes: [], statuses: statuses}
    end)
    |> combine_green_line_branches()
    |> combine_mattapan_with_red_line()
    |> sort_routes_and_sub_routes()
  end

  # Given `alerts` and `line_id`, filters out only the alerts
  # applicable to the given line, using the alert's "informed
  # entities".
  defp alerts_for_line(alerts, line_id) do
    alerts
    |> Enum.filter(fn %Alert{informed_entity: informed_entity} ->
      informed_entity
      |> Enum.any?(fn
        %{route: ^line_id} -> true
        %{} -> false
      end)
    end)
  end

  # Maps a list of alerts to a list of statuses, where a status is a
  # simple structure with a route, a description, and a few additional
  # fields that determine how it will render in the frontend.
  defp alerts_to_statuses(alerts, time)

  # If there are no alerts, then we want a single status indicating
  # "Normal Service".
  defp alerts_to_statuses([], _time) do
    [%{description: "Normal Service", time: nil}]
  end

  # If there are alerts, then create a starting list of statuses that
  # maps one-to-one with the alerts provided.
  defp alerts_to_statuses(alerts, time) do
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
    new_description =
      case description do
        "Suspension" -> "Suspensions"
        "Station Closure" -> "Station Closures"
        _ -> description
      end

    %{status | description: new_description}
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
  defp stringify_time(time), do: Timex.format!(time, "%-I:%M%p", :strftime) |> String.downcase()

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

  # This is a special-purpose function to accommodate the fact that
  # the Green line is actually composed of four different routes under
  # the hood, but we want to display Green line entries grouped
  # together when that makes sense.
  #
  # This function takes the entries corresponding to the four
  # different Green line branches, combines ones that are the same,
  # and uses the specific branch name (e.g. "Green-B") as a
  # `sub_route` instead of a `route_id`.
  defp combine_green_line_branches(statuses_by_route) do
    {green_line_entries, other_entries} =
      statuses_by_route
      |> Enum.split_with(fn %{route_id: route_id} -> route_id in @green_line_branches end)

    consolidated_green_line_entries =
      green_line_entries
      |> Enum.group_by(& &1.statuses)
      |> Enum.to_list()
      |> convert_branches_to_sub_routes()

    other_entries ++ consolidated_green_line_entries
  end

  # Used by &combine_green_line_branches/1, takes the result of
  # grouping Green line entries and returns one or more entries with
  # the `route_id` set to "Green", and the `sub_routes` set to
  # the specific branch route ID's (e.g. "Green-B").
  defp convert_branches_to_sub_routes(entries)

  # If there's only one entry, that means that all of the Green line
  # branches have the same entries. Since we only use `sub_routes`
  # when some entries are different from others, we don't need
  # `sub_routes` in this case, so we leave it empty.
  defp convert_branches_to_sub_routes([{statuses, _}]) do
    [
      %{
        route_id: "Green",
        sub_routes: [],
        statuses: statuses
      }
    ]
  end

  # If there are multiple entries, that means that not all Green line
  # branches have the same entries, which means that we do need to
  # distinguish them using `sub_routes`. This function returns a list
  # of the entries given, with the `route_id` set to "Green", and the
  # `sub_routes` set to all of the applicable Green line branch ID's.
  defp convert_branches_to_sub_routes(entries) do
    entries
    |> Enum.map(fn {statuses, routes} ->
      %{
        route_id: "Green",
        sub_routes: routes |> Enum.map(& &1.route_id),
        statuses: statuses
      }
    end)
  end

  # This is a special-purpose function to accomodate the fact that
  # most riders consider the Mattapan trolley an extension of the Red
  # line, so we group Mattapan entries under the Red line if there
  # are any.
  #
  # If there are no Mattapan entries, then we drop the whole Mattapan
  # entry, leaving riders to infer that "Normal Service" on the Red
  # line includes the Mattapan trolley.
  #
  # If there are Mattapan entries, then this transforms them into
  # entries under the "Red" `route_id`, and uses "Mattapan" as the
  # `sub_route`.
  defp combine_mattapan_with_red_line(statuses_by_route) do
    {mattapan_entries, other_entries} =
      statuses_by_route
      |> Enum.split_with(fn %{route_id: route_id} -> route_id == "Mattapan" end)

    new_mattapan_entries =
      case mattapan_entries do
        [%{statuses: [%{description: "Normal Service"}]}] ->
          []

        _ ->
          mattapan_entries
          |> Enum.map(fn %{statuses: statuses} ->
            %{route_id: "Red", sub_routes: ["Mattapan"], statuses: statuses}
          end)
      end

    other_entries ++ new_mattapan_entries
  end

  # Sorts entries by the following criteria:
  #  - The subway lines should be sorted in the order given by @lines.
  #  - Entries with no sub-routes should come before entries with
  #    sub-routes (this mainly serves to sort Red line entries before
  #    Mattapan ones).
  #  - "Normal Service" should come before other descriptions (this
  #    applies mostly to Green line entries where some branches might
  #    be normal, and others not).
  #  - Sub-routes should be sorted lexically, so all else equal, Green-B
  #    should be sorted before Green-C, for instance.
  defp sort_routes_and_sub_routes(entries) do
    line_indexes = @lines |> Enum.with_index() |> Map.new()

    entries
    |> Enum.sort_by(fn %{
                         route_id: route_id,
                         sub_routes: sub_routes,
                         statuses: [%{description: description} | _]
                       } ->
      description_sort_order =
        case description do
          "Normal Service" -> 1
          _ -> 0
        end

      base_route_sort_order =
        case sub_routes do
          [] -> 0
          _ -> 1
        end

      {
        line_indexes |> Map.get(route_id),
        base_route_sort_order,
        description_sort_order,
        sub_routes
      }
    end)
  end
end
