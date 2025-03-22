defmodule DotcomWeb.RealtimeScheduleApi do
  @moduledoc """
    API for retrieving realtime schedule data
  """
  use DotcomWeb, :controller

  alias Dotcom.RealtimeSchedule
  alias Stops.Stop

  def stops(conn, params) do
    payload =
      params
      |> parse_stops()
      |> RealtimeSchedule.stop_data()

    json(conn, %{"status" => "ok", "payload" => payload})
  end

  @spec parse_stops(map) :: [Stop.id_t()]
  defp parse_stops(%{"stops" => stops}), do: String.split(stops, ",")
  defp parse_stops(_), do: []
end
