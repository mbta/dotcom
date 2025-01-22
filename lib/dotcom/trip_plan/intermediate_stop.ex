defmodule Dotcom.TripPlan.IntermediateStop do
  @moduledoc false
  defstruct description: nil,
            stop: nil,
            alerts: []

  @type t :: %__MODULE__{
          description: iodata,
          stop: Stops.Stop.t(),
          alerts: [Alerts.Alert.t()]
        }
end
