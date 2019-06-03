defmodule Site.ScheduleNote do
  @moduledoc """
  Represents text describing the schedule for a subway route
  """
  alias Routes.Route

  @type exception :: %{
          type: String.t(),
          service: String.t()
        }

  defstruct peak_service: "", offpeak_service: "", exceptions: []

  @type t :: %__MODULE__{
          peak_service: String.t(),
          offpeak_service: String.t(),
          exceptions: [exception]
        }

  @spec new(Route.t()) :: t | nil
  def new(route) do
    case Route.type_atom(route) do
      :subway -> schedule_note(route)
      _ -> nil
    end
  end

  def schedule_note(%Route{id: "Red"}) do
    %__MODULE__{
      peak_service: "9 minutes",
      offpeak_service: "12-16 minutes"
    }
  end

  def schedule_note(%Route{id: "Mattapan"}) do
    %__MODULE__{
      peak_service: "5 minutes",
      offpeak_service: "8-12 minutes",
      exceptions: [
        %{
          type: "weekend mornings and late night",
          service: "26 minutes"
        }
      ]
    }
  end

  def schedule_note(%Route{id: "Orange"}) do
    %__MODULE__{
      peak_service: "6 minutes",
      offpeak_service: "9-11 minutes"
    }
  end

  def schedule_note(%Route{id: "Blue"}) do
    %__MODULE__{
      peak_service: "5 minutes",
      offpeak_service: "9-13 minutes"
    }
  end

  def schedule_note(%Route{id: "Green"}) do
    %__MODULE__{
      peak_service: "6-7 minutes",
      offpeak_service: "7-13 minutes"
    }
  end

  def schedule_note(%Route{id: "Green-B"}) do
    %__MODULE__{
      peak_service: "6 minutes",
      offpeak_service: "7-12 minutes"
    }
  end

  def schedule_note(%Route{id: "Green-C"}) do
    %__MODULE__{
      peak_service: "6-7 minutes",
      offpeak_service: "7-12 minutes"
    }
  end

  def schedule_note(%Route{id: "Green-D"}) do
    %__MODULE__{
      peak_service: "6 minutes",
      offpeak_service: "8-13 minutes"
    }
  end

  def schedule_note(%Route{id: "Green-E"}) do
    %__MODULE__{
      peak_service: "6 minutes",
      offpeak_service: "8-12 minutes"
    }
  end
end
