defmodule Site.BaseFare do
  @moduledoc """
  Calculates the "base fare" for a particular trip.
  The base fare is a regular priced, one-way fare for the given mode.
  If there are multiple fare media, the lowest priced is chosen.
  Commuter rail and ferry fares distinguish between the possible sets of stops.
  Bus fares for express buses do not distinguish between the local and express portions;
  the express fare is always returned.
  """

  alias Fares.Fare
  alias Routes.Route

  @default_filters [reduced: nil, duration: :single_trip]

  @spec base_fare(
          Route.t() | map,
          Stops.Stop.id_t(),
          Stops.Stop.id_t(),
          (Keyword.t() -> [Fare.t()])
        ) ::
          String.t() | nil
  def base_fare(route, origin_id, destination_id, fare_fn \\ &Fares.Repo.all/1)
  def base_fare(nil, _, _, _), do: nil

  def base_fare(route, origin_id, destination_id, fare_fn) do
    route_filters =
      route.type
      |> Route.type_atom()
      |> name_or_mode_filter(route, origin_id, destination_id)

    @default_filters
    |> Keyword.merge(route_filters)
    |> fare_fn.()
    |> Enum.min_by(& &1.cents, fn -> nil end)
  end

  defp name_or_mode_filter(:subway, _route, _origin_id, _destination_id) do
    [mode: :subway]
  end

  defp name_or_mode_filter(:bus, %{id: route_id}, origin_id, _destination_id) do
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

  defp name_or_mode_filter(mode, _route, origin_id, destination_id)
       when mode in [:commuter_rail, :ferry] do
    case Fares.fare_for_stops(mode, origin_id, destination_id) do
      {:ok, name} ->
        [name: name]

      :error ->
        [mode: mode]
    end
  end
end
