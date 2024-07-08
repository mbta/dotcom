defmodule Dotcom.TripPlan.IntermediateStop do
  defstruct description: nil,
            stop: nil,
            alerts: []

  @type t :: %__MODULE__{
          description: iodata,
          stop: Stops.Stop.t(),
          alerts: [Alerts.Alert.t()]
        }
end
