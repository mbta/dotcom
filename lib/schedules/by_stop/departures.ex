defmodule Schedules.ByStop.Departures do
  @moduledoc """
    Departure times and arrival times of all the routes at a given stop.
  """

  alias Schedules.ByStop.Departures

  @derive Jason.Encoder

  defstruct route_id: nil,
            stop_id: nil,
            arrival_time: nil,
            departure_time: nil,
            headsign: ""

  @type t :: %Departures{
          route_id: String.t(),
          stop_id: String.t(),
          arrival_time: DateTime.t() | nil,
          departure_time: DateTime.t() | nil,
          headsign: String.t()
        }

  @spec parse_from_schedule_json(Item.t()) :: t()
  def parse_from_schedule_json(item) do
    %Departures{
      route_id: route_id(item),
      stop_id: stop_id(item),
      arrival_time: arrival_time(item),
      departure_time: departure_time(item),
      headsign: headsign(item)
    }
  end

  defp departure_time(%JsonApi.Item{attributes: %{"departure_time" => nil}}) do
    nil
  end

  defp departure_time(%JsonApi.Item{attributes: %{"departure_time" => time}}) do
    Timex.parse!(time, "{ISO:Extended}")
  end

  defp arrival_time(%JsonApi.Item{attributes: %{"arrival_time" => nil}}) do
    nil
  end

  defp arrival_time(%JsonApi.Item{attributes: %{"arrival_time" => time}}) do
    Timex.parse!(time, "{ISO:Extended}")
  end

  def stop_id(%JsonApi.Item{relationships: %{"stop" => [%JsonApi.Item{id: id}]}}) do
    id
  end

  def route_id(%JsonApi.Item{relationships: %{"route" => [%JsonApi.Item{id: id} | _]}}) do
    id
  end

  def headsign(%JsonApi.Item{relationships: %{"trip" => [%JsonApi.Item{attributes: %{"headsign" => headsign}} | _]}}) do
    headsign
  end

  def headsign(%JsonApi{data: [%JsonApi.Item{attributes: %{"headsign" => headsign}}]}) do
    headsign
  end
end
