defmodule Dotcom.SystemStatus.SubwayCache.Behaviour do
  @moduledoc """
  A behaviour to capture the interface of `Dotcom.SystemStatus.SubwayCache`.
  """
  @callback subway_status() :: %{Routes.Route.id_t() => SystemStatus.Subway.status_entry_group()}
end
