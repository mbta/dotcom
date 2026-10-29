defmodule JourneyList do
  @moduledoc """
  Represents the journeys and expansion state assigned to schedule views.
  """

  defstruct journeys: [],
            expansion: :none

  @type t :: %__MODULE__{
          journeys: [Journey.t()],
          expansion: :expanded | :collapsed | :none
        }
end
