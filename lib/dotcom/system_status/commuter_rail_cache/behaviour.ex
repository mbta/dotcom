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

  @doc """
  Subscribes the caller to updates any time commuter rail status is updated. The caller
  will need to handle update messages like so:

  ```
  def handle_info(%{event: "commuter_rail_status_updated", payload: commuter_rail_status}, state) do
    # Logic goes here
  end
  ```
  """
  @callback subscribe() :: :ok | {:error, term()}
end
