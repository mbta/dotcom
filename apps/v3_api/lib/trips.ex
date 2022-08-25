defmodule V3Api.Trips do
  @moduledoc """

  Responsible for fetching Trip data from the V3 API.

  """
  import V3Api

  def by_id(id, opts \\ []) do
    get_json("/trips/" <> id, opts)
  end

  def by_route(route_id, opts \\ []) do
    opts = put_in(opts[:route], route_id)
    get_json("/trips/", opts)
  end

  def get_origin(trip_id, opts \\ []) do
    trip = V3Api.get_json("/trips/", [include: "stops", name: trip_id])
    x = Poison.encode!(trip) |> Poison.decode!(keys: :atoms)
  end

  def short_name(stop_name) do
    case stop_name do
      "Needham Heights" -> "NEED"
      "Stoughton" -> "STOU"
      "Providence" -> "PROV"
      "Wickford Junction" -> "WICK"
      "Walpole" -> "WAL"
      "Forge Park/495" -> "FORG"
      "Foxboro" -> "FOX"
      "Norwood Central" -> "NOR"
      _ -> String.upcase(String.slice(stop_name, 0..2))
    end
  end
end
