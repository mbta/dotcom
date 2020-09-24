defmodule SiteWeb.DiagramHelpers do
  @moduledoc """
  Helper functions for generating test data structures for `SiteWeb.ScheduleController.Line.DiagramFormatTest`.
  """
  alias Alerts.Alert
  alias Alerts.InformedEntity, as: IE
  alias Site.StopBubble
  alias SiteWeb.ScheduleController.Line.DiagramFormat
  alias Stops.RouteStop
  alias Stops.Stop

  @doc "Creates a new alert and adds it to stops list"
  @spec stops_with_current_effect(
          [DiagramFormat.line_diagram_stop()],
          [Stop.id_t()],
          Alert.effect(),
          DateTime.t(),
          number()
        ) :: [DiagramFormat.line_diagram_stop()]
  def stops_with_current_effect(base_list, stop_ids, effect, date, alert_id \\ 1) do
    base_list
    |> Enum.map(fn %{route_stop: %RouteStop{id: id}, alerts: alerts} = stop ->
      if id in stop_ids do
        %{
          stop
          | alerts: [
              Alert.new(
                id: alert_id,
                lifecycle: :new,
                effect: effect,
                informed_entity: Enum.map(stop_ids, &%IE{stop: &1}),
                active_period: [{Timex.shift(date, days: -1), Timex.shift(date, days: 1)}]
              )
              | alerts
            ]
        }
      else
        stop
      end
    end)
  end

  @doc "Builds a list of line diagram stops from some route stop info"
  @spec route_stops_to_line_diagram_stops([
          {Stop.id_t(), [{StopBubble.bubble_class(), RouteStop.branch_name_t()}]}
        ]) :: [DiagramFormat.line_diagram_stop()]
  def route_stops_to_line_diagram_stops(stops) do
    Enum.map(stops, fn {id, stop_info} -> route_stop_id_to_stop(id, stop_info) end)
  end

  @spec route_stop_id_to_stop(
          Stop.id_t(),
          [{StopBubble.bubble_class(), RouteStop.branch_name_t()}]
        ) :: DiagramFormat.line_diagram_stop()
  defp route_stop_id_to_stop(route_stop_id, stop_info) do
    %{
      alerts: [],
      route_stop: %RouteStop{
        connections: [],
        id: route_stop_id,
        branch: stop_info_to_branch(stop_info)
      },
      stop_data: stop_info_to_stop_data(stop_info)
    }
  end

  @spec stop_info_to_stop_data([{StopBubble.bubble_class(), RouteStop.branch_name_t()}]) :: [
          map()
        ]
  defp stop_info_to_stop_data(stop_info) do
    stop_info
    |> Enum.map(fn {type, branch} ->
      %{type: type, branch: branch, has_disruption?: false}
    end)
  end

  @spec stop_info_to_branch([{StopBubble.bubble_class(), RouteStop.branch_name_t()}]) ::
          RouteStop.branch_name_t()
  defp stop_info_to_branch(stop_info) do
    Keyword.get(stop_info, :terminus, Keyword.get(stop_info, :stop))
  end
end
