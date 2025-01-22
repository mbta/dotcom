defmodule Predictions.StreamParser do
  @moduledoc """
  Parse predictions from the JSON:API format streamed from the V3 API.

  Because the V3 API streaming feature does not update related objects fetched
  via `included`, we fetch related Route, Stop, and Trip information separately
  rather than parsing them out of the prediction stream API response
  """

  alias JsonApi.Item
  alias Predictions.Parser
  alias Predictions.Prediction
  alias Routes.Route
  alias Schedules.Trip
  alias Stops.Stop

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  @spec parse(Item.t()) :: Prediction.t()
  def parse(%Item{} = item) do
    route = included_route(item)
    stop = included_stop(item)
    trip = included_trip(item)

    track =
      case stop do
        %Stop{platform_code: code} -> code
        _ -> nil
      end

    arrival = arrival_time(item)
    departure = departure_time(item)

    %Prediction{
      id: item.id,
      arrival_time: arrival,
      departing?: Parser.departing?(item),
      departure_time: departure,
      direction_id: Parser.direction_id(item),
      stop_sequence: Parser.stop_sequence(item),
      time: Schedules.Parser.display_time(arrival, departure, route),
      route: route,
      stop: @stops_repo.get_parent(stop),
      platform_stop_id: stop_id(item),
      trip: trip,
      schedule_relationship: Parser.schedule_relationship(item),
      status: Parser.status(item),
      track: track,
      vehicle_id: vehicle_id(item)
    }
  end

  @spec arrival_time(Item.t()) :: DateTime.t() | nil
  defp arrival_time(%Item{attributes: %{"arrival_time" => time}}) when is_binary(time), do: parse_time(time)

  defp arrival_time(_), do: nil

  @spec departure_time(Item.t()) :: DateTime.t() | nil
  defp departure_time(%Item{attributes: %{"departure_time" => time}}) when is_binary(time), do: parse_time(time)

  defp departure_time(_), do: nil

  @spec parse_time(String.t()) :: DateTime.t()
  defp parse_time(time) do
    {:ok, dt, _} = DateTime.from_iso8601(time)
    dt
  end

  @spec vehicle_id(Item.t()) :: Vehicles.Vehicle.id_t() | nil
  defp vehicle_id(%Item{relationships: %{"vehicle" => [%Item{id: id}]}}), do: id

  defp vehicle_id(_), do: nil

  @spec included_route(Item.t()) :: Route.t() | nil
  defp included_route(%Item{relationships: %{"route" => [%Item{id: id} | _]}}), do: @routes_repo.get(id)

  defp included_route(_), do: nil

  @spec included_trip(Item.t()) :: Trip.t() | nil
  defp included_trip(%Item{relationships: %{"trip" => [%Item{id: id} | _]}}), do: Schedules.Repo.trip(id)

  defp included_trip(_), do: nil

  @spec stop_id(Item.t()) :: Stops.Stop.id_t() | nil
  defp stop_id(%Item{relationships: %{"stop" => [%Item{id: id}]}}), do: id

  defp stop_id(_), do: nil

  # note: likely to be a child stop
  @spec included_stop(Item.t()) :: Stops.Stop.t() | nil
  defp included_stop(%Item{relationships: %{"stop" => [%Item{id: id}]}}), do: @stops_repo.get(id)

  defp included_stop(_), do: nil
end
