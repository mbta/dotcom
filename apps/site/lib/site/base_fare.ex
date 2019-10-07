defmodule Site.BaseFare do
  @moduledoc """
  Calculates the "base fare" for a particular trip.
  The base fare is a regular priced, one-way fare for the given mode.
  If there are multiple fare media, the lowest priced is chosen.
  Commuter rail and ferry fares distinguish between the possible sets of stops.
  Bus fares for express buses do not distinguish between the local and express portions;
  the express fare is always returned.
  """

  alias Fares.{Fare, Repo}
  alias Routes.Route
  alias Schedules.Trip

  @default_filters [reduced: nil, duration: :single_trip]
  @default_foxboro_filters [reduced: nil, duration: :round_trip]

  @default_trip %Trip{name: ""}

  @spec base_fare(
          Route.t() | map,
          Trip.t() | map,
          Stops.Stop.id_t(),
          Stops.Stop.id_t(),
          (Keyword.t() -> [Fare.t()])
        ) ::
          String.t() | nil
  def base_fare(route, trip, origin_id, destination_id, fare_fn \\ &Repo.all/1)
  def base_fare(nil, _, _, _, _), do: nil

  def base_fare(route, nil, origin_id, destination_id, fare_fn) do
    base_fare(route, @default_trip, origin_id, destination_id, fare_fn)
  end

  def base_fare(route, trip, origin_id, destination_id, fare_fn) do
    route_filters =
      route.type
      |> Route.type_atom()
      |> name_or_mode_filter(route, origin_id, destination_id, trip)

    default_filters =
      if {:name, :foxboro} in route_filters do
        @default_foxboro_filters
      else
        @default_filters
      end

    default_filters
    |> Keyword.merge(route_filters)
    |> fare_fn.()
    |> Enum.min_by(& &1.cents, fn -> nil end)
  end

  defp name_or_mode_filter(:subway, _route, _origin_id, _destination_id, _trip) do
    [mode: :subway]
  end

  defp name_or_mode_filter(_, %{description: :rail_replacement_bus}, _, _, _) do
    [name: :free_fare]
  end

  defp name_or_mode_filter(:bus, %{id: route_id}, origin_id, _destination_id, _trip) do
    name =
      cond do
        Fares.inner_express?(route_id) -> :inner_express_bus
        Fares.outer_express?(route_id) -> :outer_express_bus
        Fares.silver_line_airport_stop?(route_id, origin_id) -> :free_fare
        Fares.silver_line_rapid_transit?(route_id) -> :subway
        true -> :local_bus
      end

    [name: name]
  end

  defp name_or_mode_filter(mode, %{id: route_id}, origin_id, destination_id, trip)
       when mode in [:commuter_rail, :ferry] do
    case Fares.fare_for_stops(mode, origin_id, destination_id, route_id, trip) do
      {:ok, name} ->
        [name: name]

      :error ->
        [mode: mode]
    end
  end
end
