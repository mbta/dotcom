defmodule Fares.Month do
  @moduledoc """
  Calculates the lowest and highest monthly pass fare for a particular trip.
  """

  alias Fares.Fare
  alias Fares.Repo
  alias Routes.Route
  alias Stops.Stop

  @type fare_fn :: (Keyword.t() -> [Fare.t()])

  @spec recommended_pass(
          Route.t() | Route.id_t(),
          Stop.id_t(),
          Stop.id_t(),
          fare_fn()
        ) ::
          Fare.t() | nil
  def recommended_pass(route, origin_id, destination_id, fare_fn \\ &Repo.all/1)
  def recommended_pass(nil, _, _, _), do: nil

  def recommended_pass(route, origin_id, destination_id, fare_fn) do
    route
    |> get_fares(origin_id, destination_id, fare_fn)
    |> Enum.min_by(& &1.cents, fn -> nil end)
  end

  @spec base_pass(
          Route.t() | Route.id_t(),
          Stop.id_t(),
          Stop.id_t(),
          fare_fn()
        ) ::
          Fare.t() | nil
  def base_pass(route, origin_id, destination_id, fare_fn \\ &Repo.all/1)
  def base_pass(nil, _, _, _), do: nil

  def base_pass(route, origin_id, destination_id, fare_fn) do
    route
    |> get_fares(origin_id, destination_id, fare_fn)
    |> Enum.max_by(& &1.cents, fn -> nil end)
  end

  @spec reduced_pass(
          Route.t(),
          Stop.id_t(),
          Stop.id_t(),
          fare_fn()
        ) ::
          Fare.t() | nil
  def reduced_pass(route, origin_id, destination_id, fare_fn \\ &Repo.all/1)
  def reduced_pass(nil, _, _, _), do: nil

  def reduced_pass(route, origin_id, destination_id, fare_fn) do
    route
    |> get_fares(origin_id, destination_id, fare_fn, :any)
    |> List.first()
  end

  @spec get_fares(Route.t(), Stop.id_t(), Stop.id_t(), fare_fn()) :: [Fare.t()]
  @spec get_fares(Route.t(), Stop.id_t(), Stop.id_t(), fare_fn(), Fare.reduced()) ::
          [
            Fare.t()
          ]
  defp get_fares(route, origin_id, destination_id, fare_fn, reduced \\ nil) do
    route_filters =
      route.type
      |> Route.type_atom()
      |> name_or_mode_filter(route, origin_id, destination_id)

    [reduced: reduced, duration: :month]
    |> Keyword.merge(route_filters)
    |> fare_fn.()
  end

  @spec name_or_mode_filter(atom(), Route.t(), Stop.id_t(), Stop.id_t()) ::
          Keyword.t()
  defp name_or_mode_filter(:subway, _route, _origin_id, _destination_id) do
    [mode: :subway]
  end

  defp name_or_mode_filter(_, %{description: :rail_replacement_bus}, _, _) do
    [name: :free_fare]
  end

  defp name_or_mode_filter(_, %{id: "CR-Foxboro"}, _, _) do
    [name: :foxboro]
  end

  defp name_or_mode_filter(:massport_shuttle, _, _origin_id, _destination_id) do
    [name: :massport_shuttle]
  end

  defp name_or_mode_filter(:bus, %{id: route_id}, origin_id, _destination_id) do
    name =
      cond do
        Fares.express?(route_id) -> :express_bus
        Fares.silver_line_airport_stop?(route_id, origin_id) -> :free_fare
        Fares.silver_line_rapid_transit?(route_id) -> :subway
        true -> :local_bus
      end

    [name: name]
  end

  defp name_or_mode_filter(:commuter_rail, _, origin_id, destination_id) do
    case Fares.fare_for_stops(:commuter_rail, origin_id, destination_id) do
      {:ok, name} ->
        [name: name]

      :error ->
        [mode: :commuter_rail]
    end
  end

  defp name_or_mode_filter(:ferry, _, origin_id, destination_id) do
    [name: :ferry |> Fares.fare_for_stops(origin_id, destination_id) |> elem(1)]
  end
end
