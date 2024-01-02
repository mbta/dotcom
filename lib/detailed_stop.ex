defmodule DetailedStop do
  @moduledoc """
  Represents a stop and associated features
  """
  alias Stops.Stop

  defstruct stop: %Stop{},
            features: [],
            zone: nil,
            route_icon: nil

  @type t :: %__MODULE__{
          stop: Stop.t(),
          features: [Stops.Repo.stop_feature()],
          zone: String.t() | nil,
          route_icon: Routes.Route.subway_lines_type() | Routes.Route.gtfs_route_type()
        }
end
