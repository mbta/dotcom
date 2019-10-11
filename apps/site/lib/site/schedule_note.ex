defmodule Site.ScheduleNote do
  @moduledoc """
  Represents text describing the schedule for a subway route
  """
  alias Routes.Route
  alias Phoenix.HTML
  import Phoenix.HTML.Tag
  import Phoenix.HTML.Link

  @type exception :: %{
          type: String.t(),
          service: String.t()
        }

  defstruct peak_service: "", offpeak_service: "", exceptions: [], alternate_text: nil

  @type t :: %__MODULE__{
          peak_service: String.t(),
          offpeak_service: String.t(),
          exceptions: [exception],
          alternate_text: String.t() | nil
        }

  @spec new(Route.t()) :: t | nil
  def new(route) do
    schedule_note(route)
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

  def schedule_note(%Route{id: "CR-Foxboro"} = route) do
    %__MODULE__{
      peak_service: nil,
      offpeak_service: nil,
      alternate_text:
        HTML.safe_to_string(
          content_tag(
            :p,
            [
              content_tag(
                :strong,
                "The Foxboro Special Events line is only for occasional service."
              ),
              content_tag(
                :span,
                " It travels along limited stops between Foxboro and either Providence or Downtown Boston (South Station)"
              ),
              content_tag(
                :p,
                [
                  content_tag(
                    :strong,
                    "For regular weekday service to Foxboro please visit: "
                  ),
                  link(
                    "Franklin Line/Foxboro Pilot",
                    to: SiteWeb.Router.Helpers.timetable_path(SiteWeb.Endpoint, :show, route.id)
                  )
                ]
              )
            ]
          )
        )
    }
  end

  def schedule_note(_) do
    nil
  end
end
