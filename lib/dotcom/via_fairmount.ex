defmodule Dotcom.ViaFairmount do
  @moduledoc """
  Get and store all Fairmount Line trip names for reference.
  """

  use Agent

  def start_link(_) do
    Agent.start_link(
      fn ->
        case MBTA.Api.Trips.by_route("CR-Fairmount", "fields[trip]": "name") do
          %JsonApi{data: data} -> Enum.map(data, &{&1.id, &1.attributes["name"]})
          _ -> []
        end
      end,
      name: __MODULE__
    )
  end

  @doc """
  For a given list of trip IDs (from any route),
  return the list of matching Fairmount Line trip names
  """
  def trip_names(trip_ids) do
    Agent.get(__MODULE__, & &1)
    |> Enum.filter(fn {id, _} -> Enum.member?(trip_ids, id) end)
    |> Enum.map(fn {_, name} -> name end)
  end
end
