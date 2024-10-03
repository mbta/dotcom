defmodule Dotcom.TripPlan.PersonalDetail do
  @moduledoc """
  Additional information for legs which are taken on personal transportation
  """
  @derive Jason.Encoder
  defstruct distance: 0.0,
            steps: []

  @type t :: %__MODULE__{
          distance: float,
          steps: [OpenTripPlannerClient.Schema.Step.t()]
        }
end
