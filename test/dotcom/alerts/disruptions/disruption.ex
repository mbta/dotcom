defmodule Dotcom.Alerts.Disruptions.Disruption do
  @enforce_keys [:route_ids, :start_date, :end_date, :alert]
  defstruct [:route_ids, :start_date, :end_date, :alert]

  @type t :: %__MODULE__{
          route_ids: [Routes.Route.id_t()],
          start_date: Date.t(),
          end_date: Date.t(),
          alert: Alerts.Alert.t()
        }
end
