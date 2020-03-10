defmodule Predictions.Parser do
  alias Predictions.Prediction

  @moduledoc """
  Functions for parsing predictions from their JSON:API format.
  """

  @type record :: {
          Prediction.id_t() | nil,
          Schedules.Trip.id_t() | nil,
          Stops.Stop.id_t(),
          Routes.Route.id_t(),
          0 | 1,
          DateTime.t() | nil,
          non_neg_integer,
          Prediction.schedule_relationship(),
          String.t() | nil,
          String.t() | nil,
          boolean
        }

  @spec parse(JsonApi.Item.t()) :: record
  def parse(%JsonApi.Item{attributes: attributes} = item) do
    {
      item.id,
      trip_id(item),
      stop_id(item),
      route_id(item),
      attributes["direction_id"],
      [attributes["arrival_time"], attributes["departure_time"]] |> first_time,
      attributes["stop_sequence"] || 0,
      schedule_relationship(attributes["schedule_relationship"]),
      track(item),
      attributes["status"],
      departing?(attributes)
    }
  end

  defp first_time(times) do
    case times
         |> Enum.reject(&is_nil/1)
         |> List.first()
         |> Timex.parse("{ISO:Extended}") do
      {:ok, time} -> time
      _ -> nil
    end
  end

  @spec track(JsonApi.Item.t()) :: String.t() | nil
  defp track(%{attributes: %{"track" => track}}), do: track

  defp track(%{relationships: %{"stop" => [%{attributes: %{"platform_code" => track}} | _]}}),
    do: track

  defp track(_), do: nil

  defp departing?(%{"departure_time" => binary}) when is_binary(binary) do
    true
  end

  defp departing?(%{"status" => binary}) when is_binary(binary) do
    upcoming_status?(binary)
  end

  defp departing?(_) do
    false
  end

  @spec upcoming_status?(String.t()) :: boolean
  defp upcoming_status?("Approaching"), do: true
  defp upcoming_status?("Boarding"), do: true
  defp upcoming_status?(status), do: String.ends_with?(status, "away")

  @spec schedule_relationship(String.t()) :: Prediction.schedule_relationship()
  defp schedule_relationship("ADDED"), do: :added
  defp schedule_relationship("UNSCHEDULED"), do: :unscheduled
  defp schedule_relationship("CANCELLED"), do: :cancelled
  defp schedule_relationship("SKIPPED"), do: :skipped
  defp schedule_relationship("NO_DATA"), do: :no_data
  defp schedule_relationship(_), do: nil

  defp stop_id(%JsonApi.Item{relationships: %{"stop" => [%{id: id} | _]}}) do
    id
  end

  defp stop_id(%JsonApi.Item{relationships: %{"stop" => []}}) do
    nil
  end

  defp trip_id(%JsonApi.Item{relationships: %{"trip" => [%{id: id} | _]}}) do
    id
  end

  defp trip_id(%JsonApi.Item{relationships: %{"trip" => []}}) do
    nil
  end

  defp route_id(%JsonApi.Item{relationships: %{"route" => [%{id: id} | _]}}) do
    id
  end
end
