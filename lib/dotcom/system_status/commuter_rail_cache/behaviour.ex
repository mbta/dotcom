defmodule Dotcom.SystemStatus.CommuterRailCache.Behaviour do
  @moduledoc """
  A behaviour to capture the interface of `Dotcom.SystemStatus.CommuterRailCache`.
  """

  alias Dotcom.SystemStatus.CommuterRail
  alias Routes.Route

  @doc """
  Returns the cached commuter rail status. See `Dotcom.SystemStatus.CommuterRail.commuter_rail_status/0`
  for more info.
  """
  @callback commuter_rail_status() :: [
              %{
                name: String.t(),
                route_id: Route.id_t(),
                status: CommuterRail.route_status_t()
              }
            ]
end
