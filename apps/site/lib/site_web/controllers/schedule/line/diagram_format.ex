defmodule SiteWeb.ScheduleController.Line.DiagramFormat do
  @moduledoc """
  Even more helpers for the line diagram, using the outputs from SiteWeb.ScheduleController.Line.DiagramHelpers
  """
  alias Alerts.{Alert, Match}
  alias Stops.RouteStop

  @type line_diagram_stop :: %{
          alerts: [Alert.t()],
          route_stop: RouteStop.t(),
          stop_data: [map]
        }

  # For each set of disrupted stops, maybe make adjustment to the diagram based on
  # the nature of the disruption.
  #   * if there is a shuttle we don't style the final stop
  #   * if there is a detour or stop/station
  @spec shift_chunk_by_effect([line_diagram_stop()], [line_diagram_stop()]) :: [
          line_diagram_stop()
        ]
  defp shift_chunk_by_effect([stop | _] = chunked_stops, all_stops) do
    effects = effects_for_stop(stop) |> Enum.map(&elem(&1, 1)) |> Enum.uniq()

    cond do
      :shuttle in effects ->
        List.delete_at(chunked_stops, -1)

      Enum.any?([:stop_closure, :station_closure, :detour], fn effect -> effect in effects end) ->
        prev_stop = prior_stop(stop, all_stops)

        if prev_stop do
          prev_stop ++ chunked_stops
        else
          chunked_stops
        end

      true ->
        chunked_stops
    end
  end

  @doc """
  Identifies the prior stop in a line diagram stop list, accounting for branching in either direction.
  """
  @spec prior_stop(line_diagram_stop(), [line_diagram_stop()]) :: [line_diagram_stop()] | nil
  def prior_stop(%{stop_data: stop_data} = stop, all_stops) do
    index = Enum.find_index(all_stops, fn s -> s == stop end)

    # usually one. but can be two if two+
    # branches are merging into the stop
    branches =
      stop_data
      |> Enum.filter(&(&1.type != :line))
      |> Enum.map(& &1.branch)
      |> Enum.reject(&is_nil/1)

    case {index, branches} do
      {nil, _} ->
        nil

      {0, _} ->
        nil

      {_, []} ->
        [Enum.at(all_stops, index - 1)]

      {_, branches} ->
        Enum.slice(all_stops, 0..(index - 1))
        |> do_get_prior_stop(branches)
    end
  end

  @spec do_get_prior_stop([line_diagram_stop()], [RouteStop.branch_name_t()]) ::
          [
            line_diagram_stop()
          ]
          | nil
  defp do_get_prior_stop(stop_list, branches) do
    stops =
      branches
      |> Enum.map(fn branch ->
        stop_list
        |> Enum.filter(&filter_by_branch(&1, branch))
        |> List.last()
      end)
      |> Enum.reject(&is_nil/1)

    if Enum.empty?(stops) do
      nil
    else
      stops
    end
  end

  # Matches if explicity the same branch name, or if branch is nil (as is the
  # case for shared portions of a branching route)
  @spec filter_by_branch(line_diagram_stop(), RouteStop.branch_name_t()) :: boolean()
  defp filter_by_branch(_stop, nil), do: true

  defp filter_by_branch(%{stop_data: stop_data}, branch_name) do
    Enum.find(stop_data, fn %{type: type, branch: branch} ->
      type != :line && (branch == branch_name or is_nil(branch))
    end)
  end

  @spec stop_with_disruption({line_diagram_stop, number}, [number]) :: line_diagram_stop
  defp stop_with_disruption({%{stop_data: stop_data} = stop, index}, disrupted_stop_indices) do
    if index in disrupted_stop_indices do
      %{stop | stop_data: stop_data_with_disruption(stop_data)}
    else
      stop
    end
  end

  defp stop_with_disruption({stop, _}, _), do: stop

  @spec stop_data_with_disruption([map()]) :: [map()]
  defp stop_data_with_disruption(stop_data) do
    stop_data
    |> Enum.map(fn %{type: type} = sd ->
      if type != :line do
        %{sd | has_disruption?: true}
      else
        sd
      end
    end)
  end

  @spec stop_has_diversion_now?(line_diagram_stop, DateTime.t()) :: boolean
  defp stop_has_diversion_now?(%{alerts: alerts}, now) do
    Enum.any?(alerts, &has_active_diversion?(&1, now))
  end

  @spec has_active_diversion?(Alert.t(), DateTime.t()) :: boolean
  defp has_active_diversion?(%Alert{active_period: active_period} = alert, now) do
    Match.any_period_match?(active_period, now) and Alert.is_diversion(alert)
  end

  defp has_active_diversion?(_, _), do: false

  @spec effects_for_stop(line_diagram_stop) :: [{String.t(), Alerts.Alert.effect()}]
  defp effects_for_stop(%{alerts: alerts}) do
    Enum.map(alerts, &{&1.id, &1.effect})
  end

  @spec chunk_by_diversions(line_diagram_stop(), [line_diagram_stop()], DateTime.t()) ::
          {:cont, any(), [line_diagram_stop()]}
          | {:cont, [line_diagram_stop()]}
          | {:halt, [line_diagram_stop()]}
  defp chunk_by_diversions(stop, chunk, date) do
    if stop_has_diversion_now?(stop, date) do
      stop_fx = effects_for_stop(stop)

      case chunk do
        [] ->
          {:cont, [stop]}

        chunk ->
          last_stop = List.last(chunk)

          if stop_fx == effects_for_stop(last_stop) do
            {:cont, chunk ++ [stop]}
          else
            case stop_fx do
              [] ->
                {:cont, chunk, []}

              _ ->
                {:cont, chunk, [stop]}
            end
          end
      end
    else
      {:cont, chunk}
    end
  end

  @doc """
  Identify sequences of disrupted stops and makes adjustments to the line
  diagram stop data. Disruptions include diversions, such as shuttles, detours,
  and stop closures.
  """
  @spec do_stops_list_with_disruptions([line_diagram_stop], DateTime.t()) :: [line_diagram_stop]
  def do_stops_list_with_disruptions(_, nil), do: []

  def do_stops_list_with_disruptions(stops_list, date) do
    disrupted_stop_indices =
      stops_list
      |> Stream.chunk_while(
        [],
        &chunk_by_diversions(&1, &2, date),
        fn
          [] -> {:cont, []}
          chunk -> {:cont, Enum.reverse(chunk), []}
        end
      )
      |> Stream.flat_map(&shift_chunk_by_effect(&1, stops_list))
      |> Enum.uniq()

    stops_list
    |> Enum.with_index()
    |> Enum.map(&stop_with_disruption(&1, disrupted_stop_indices))
  end
end
