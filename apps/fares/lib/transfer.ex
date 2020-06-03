defmodule Fares.Transfer do
  @moduledoc """
    Tools for handling logic around transfers between transit legs and modes.
    The MBTA allows transfers between services depending on the fare media used
    and the amount paid.

    This logic may be superseded by the upcoming fares work.
  """
  require Fares
  alias Routes.{Repo, Route}

  defguard has_nil(pair)
           when is_nil(elem(pair, 0)) or
                  is_nil(elem(pair, 1))

  @type fare_atom :: Route.gtfs_route_type() | :inner_express_bus | :outer_express_bus

  # Paying a single-ride fare for the first may get you a transfer to the second
  # (can't be certain, as it depends on media used)!
  @single_ride_valid_transfers [
    [:subway, :subway],
    [:subway, :bus],
    [:bus, :subway],
    [:bus, :bus],
    [:inner_express_bus, :subway],
    [:outer_express_bus, :subway],
    [:inner_express_bus, :bus],
    [:outer_express_bus, :bus]
  ]

  @doc """
  Takes a pair of routes and returns true if there might be a transfer between
  the two, based on the list in @single_ride_valid_transfers
  """
  @spec is_maybe_transfer([Route.id_t()]) :: boolean | nil
  def is_maybe_transfer(route_pair) when has_nil(route_pair), do: nil

  # No transfer between the same local bus route.
  def is_maybe_transfer(route_pair) do
    atom_pair = Enum.map(route_pair, &to_fare_atom(&1))
    if Enum.at(route_pair, 0) === Enum.at(route_pair, 1) &&
         Enum.all?(atom_pair, &(&1 === :bus)) do
      nil
    else

      Enum.member?(@single_ride_valid_transfers, atom_pair)
    end
  end

  @spec to_fare_atom(fare_atom | Route.id_t() | Route.t()) :: fare_atom
  defp to_fare_atom(route_or_atom) do
    case route_or_atom do
      %Route{type: 3, id: id} ->
        cond do
          Fares.silver_line_rapid_transit?(id) -> :subway
          Fares.inner_express?(id) -> :inner_express_bus
          Fares.outer_express?(id) -> :outer_express_bus
          true -> :bus
        end

      %Route{} ->
        Route.type_atom(route_or_atom)

      <<id::binary>> ->
        Repo.get(id) |> to_fare_atom

      _ ->
        route_or_atom
    end
  end
end
