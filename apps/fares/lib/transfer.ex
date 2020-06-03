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

  # Our stops don't model underground transfer points, but the system is small
  # enough that we can just hardcode these for now. Note: unknown directionality
  @underground_xfers [
    %{lines: ["Red", "Green-B", "Green-C", "Green-D", "Green-E"], stop: "place-pktrm"},
    %{lines: ["Red", "Orange"], stop: "place-dwnxg"},
    %{lines: ["Orange", "Blue"], stop: "place-state"},
    %{lines: ["Blue", "Green-C", "Green-D", "Green-E"], stop: "place-gover"},
    %{lines: ["Red", "741", "742", "743"], stop: "place-sstat"},
    %{lines: ["Orange", "Green-C", "Green-E"], stop: "place-north"},
    %{lines: ["Orange", "Green-C", "Green-E"], stop: "place-haecl"},
    %{lines: ["Green-B", "Green-C", "Green-D"], stop: "place-kencl"},
    %{lines: ["Green-B", "Green-C", "Green-D", "Green-E"], stop: "place-armnl"}
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

  @doc """
  Takes a pair of routes and returns true if there is a free transfer between
  the two, based on the list in @underground_xfers
  """
  @spec is_free_transfer([Route.id_t()]) :: boolean | nil
  def is_free_transfer(route_pair) when has_nil(route_pair), do: nil

  def is_free_transfer(route_pair) do
    Enum.map(@underground_xfers, &Map.get(&1, :lines))
    |> Enum.any?(fn xfer_stations ->
      Enum.all?(route_pair, &Enum.member?(xfer_stations, &1))
    end)
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
