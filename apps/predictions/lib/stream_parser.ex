defmodule Predictions.StreamParser do
  @moduledoc """
  Parse predictions from the JSON:API format streamed from the V3 API.
  """

  alias JsonApi.Item
  alias Predictions.{Parser, Prediction}
  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop

  @spec parse(Item.t()) :: Prediction.t()
  def parse(%Item{} = item) do
    %Prediction{
      id: item.id,
      arrival_time: arrival_time(item),
      departing?: Parser.departing?(item),
      departure_time: departure_time(item),
      direction_id: Parser.direction_id(item),
      route: route(item),
      stop: stop(item),
      stop_sequence: Parser.stop_sequence(item),
      trip: trip(item),
      time: Parser.first_time(item),
      schedule_relationship: Parser.schedule_relationship(item),
      status: Parser.status(item),
      track: Parser.track(item)
    }
  end

  @spec arrival_time(Item.t()) :: DateTime.t() | nil
  defp arrival_time(%Item{attributes: %{"arrival_time" => time}}) when is_binary(time),
    do: parse_time(time)

  defp arrival_time(_), do: nil

  @spec departure_time(Item.t()) :: DateTime.t() | nil
  defp departure_time(%Item{attributes: %{"departure_time" => time}}) when is_binary(time),
    do: parse_time(time)

  defp departure_time(_), do: nil

  @spec parse_time(String.t()) :: DateTime.t()
  defp parse_time(time) do
    {:ok, dt, _} = DateTime.from_iso8601(time)
    dt
  end

  @spec route(Item.t()) :: Route.t() | nil
  defp route(%Item{relationships: %{"route" => [%Item{id: id, attributes: attributes} | _]}}) do
    %Route{
      id: id,
      type: attributes["type"]
    }
  end

  defp route(_), do: nil

  @spec trip(Item.t()) :: Trip.t() | nil
  defp trip(%Item{relationships: %{"trip" => [%Item{id: id, attributes: attributes} | _]}}) do
    %Trip{
      id: id,
      name: attributes["name"],
      direction_id: attributes["direction_id"],
      headsign: attributes["headsign"]
    }
  end

  defp trip(_), do: nil

  @spec stop(Item.t()) :: Stops.Stop.t() | nil
  defp stop(%Item{relationships: %{"stop" => [%Item{id: id, attributes: attributes} | _]}}) do
    %Stop{
      id: id,
      name: attributes["name"]
    }
  end

  defp stop(_), do: nil
end
