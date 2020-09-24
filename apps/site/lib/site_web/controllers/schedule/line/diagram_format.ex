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
  @spec shift_indices_by_effect([number], [{String.t(), Alerts.Alert.effect()}]) :: [number]
  defp shift_indices_by_effect(indices, [{_alert_id, :shuttle} | _]) do
    List.delete_at(indices, -1)
  end

  defp shift_indices_by_effect(indices, [{_alert_id, effect} | _])
       when effect in [:stop_closure, :station_closure, :detour]
       when hd(indices) > 0 do
    [hd(indices) - 1] ++ indices
  end

  defp shift_indices_by_effect(indices, [_ | effects]),
    do: shift_indices_by_effect(indices, effects)

  defp shift_indices_by_effect(indices, _), do: indices

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

  defp chunk_by_diversions({stop, index}, chunk, date) do
    if stop_has_diversion_now?(stop, date) do
      stop_effects = Enum.map(stop.alerts, &{&1.id, &1.effect})

      case chunk do
        [] ->
          {:cont, [{index, stop_effects}]}

        [{_, last_effects} | _] ->
          if stop_effects == last_effects do
            {:cont, Enum.reverse([{index, stop_effects} | chunk]), []}
          else
            {:cont, [{index, stop_effects}]}
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
      |> Stream.with_index()
      |> Stream.chunk_while(
        [],
        &chunk_by_diversions(&1, &2, date),
        fn
          [] -> {:cont, []}
          chunk -> {:cont, Enum.reverse(chunk), []}
        end
      )
      |> Stream.flat_map(fn chunked_stops ->
        {indices, effects} = Enum.unzip(chunked_stops)
        shift_indices_by_effect(indices, List.flatten(effects) |> Enum.uniq())
      end)
      |> Enum.uniq()

    stops_list
    |> Enum.with_index()
    |> Enum.map(&stop_with_disruption(&1, disrupted_stop_indices))
  end
end
