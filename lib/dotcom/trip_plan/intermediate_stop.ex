defmodule Dotcom.TripPlan.IntermediateStop do
  defstruct description: nil,
            stop_id: nil,
            alerts: []

  @type t :: %__MODULE__{
          description: iodata,
          stop_id: Stops.Stop.id_t(),
          alerts: [Alerts.Alert.t()]
        }
end
