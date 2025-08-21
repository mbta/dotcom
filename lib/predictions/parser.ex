defmodule Predictions.Parser do
  @moduledoc """
  Functions for parsing predictions from their JSON:API format.
  """

  alias JsonApi.Item
  alias Predictions.Prediction

  @type record :: {
          Prediction.id_t() | nil,
          Schedules.Trip.id_t() | nil,
          Stops.Stop.id_t(),
          Routes.Route.id_t(),
          0 | 1,
          DateTime.t() | nil,
          DateTime.t() | nil,
          DateTime.t() | nil,
          non_neg_integer,
          Prediction.schedule_relationship() | nil,
          String.t() | nil,
          String.t() | nil,
          boolean,
          Vehicles.Vehicle.id_t() | nil
        }

  def parse(%Item{} = item) do
    arrival = arrival_time(item)
    departure = departure_time(item)
    route_id = route_id(item)

    {
      item.id,
      trip_id(item),
      stop_id(item),
      route_id,
      direction_id(item),
      arrival,
      departure,
      Schedules.Parser.display_time(arrival, departure, route_id),
      stop_sequence(item),
      schedule_relationship(item),
      track(item),
      status(item),
      departing?(item),
      vehicle_id(item)
    }
  end

  def departing?(%Item{attributes: %{"departure_time" => binary}}) when is_binary(binary),
    do: true

  def departing?(%Item{attributes: %{"status" => binary}}) when is_binary(binary),
    do: upcoming_status?(binary)

  def departing?(_), do: false

  def direction_id(%Item{attributes: %{"direction_id" => direction_id}}), do: direction_id

  def departure_time(%Item{attributes: %{"departure_time" => departure_time}})
      when not is_nil(departure_time),
      do: parse_time(departure_time)

  def departure_time(_), do: nil

  def arrival_time(%Item{attributes: %{"arrival_time" => arrival_time}})
      when not is_nil(arrival_time),
      do: parse_time(arrival_time)

  def arrival_time(_), do: nil

  def schedule_relationship(%Item{attributes: %{"schedule_relationship" => "ADDED"}}), do: :added

  def schedule_relationship(%Item{attributes: %{"schedule_relationship" => "UNSCHEDULED"}}),
    do: :unscheduled

  def schedule_relationship(%Item{attributes: %{"schedule_relationship" => "CANCELLED"}}),
    do: :cancelled

  def schedule_relationship(%Item{attributes: %{"schedule_relationship" => "SKIPPED"}}),
    do: :skipped

  def schedule_relationship(%Item{attributes: %{"schedule_relationship" => "NO_DATA"}}),
    do: :no_data

  def schedule_relationship(_), do: nil

  def status(%Item{attributes: %{"status" => status}}), do: status
  def status(_), do: nil

  def stop_sequence(%Item{attributes: %{"stop_sequence" => stop_sequence}}), do: stop_sequence
  def stop_sequence(_), do: 0

  def track(%{attributes: %{"track" => track}}), do: track

  def track(%{relationships: %{"stop" => [%{attributes: %{"platform_code" => track}} | _]}}),
    do: track

  def track(_), do: nil

  defp parse_time(prediction_time) do
    case Timex.parse(prediction_time, "{ISO:Extended}") do
      {:ok, time} ->
        time

      _ ->
        nil
    end
  end

  defp upcoming_status?("Approaching"), do: true
  defp upcoming_status?("Boarding"), do: true
  defp upcoming_status?(status), do: String.ends_with?(status, "away")

  defp stop_id(%Item{relationships: %{"stop" => [%{id: id} | _]}}) do
    id
  end

  defp stop_id(%Item{relationships: %{"stop" => []}}) do
    nil
  end

  defp trip_id(%Item{relationships: %{"trip" => [%{id: id} | _]}}) do
    id
  end

  defp trip_id(%Item{relationships: %{"trip" => []}}) do
    nil
  end

  defp route_id(%Item{relationships: %{"route" => [%{id: id} | _]}}) do
    id
  end

  defp vehicle_id(%Item{relationships: %{"vehicle" => [%{id: id} | _]}}) do
    id
  end

  defp vehicle_id(%Item{relationships: %{"vehicle" => []}}) do
    nil
  end
end
