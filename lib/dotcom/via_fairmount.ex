defmodule Dotcom.ViaFairmount do
  @moduledoc """
  Get and store all Fairmount Line trip names for reference.
  """

  use Agent

  def start_link(_) do
    Agent.start_link(
      fn ->
        case MBTA.Api.Trips.by_route("CR-Fairmount", "fields[trip]": "name") do
          %JsonApi{data: data} -> Enum.map(data, & &1.attributes["name"])
          _ -> []
        end
      end,
      name: __MODULE__
    )
  end

  def trip_names, do: Agent.get(__MODULE__, & &1)
end
