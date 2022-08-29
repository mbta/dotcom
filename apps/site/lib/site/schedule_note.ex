defmodule Site.ScheduleNote do
  @moduledoc """
  Represents text describing the schedule for a subway route
  """
  alias Routes.Route
  import Phoenix.HTML.Tag
  import Phoenix.HTML.Link
  alias Phoenix.HTML
  alias SiteWeb.Router.Helpers

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
      peak_service: "8 \u2013 15 minutes",
      offpeak_service: "8 \u2013 15 minutes"
    }
  end

  def schedule_note(%Route{id: "Mattapan"}) do
    %__MODULE__{
      peak_service: "6 \u2013 12 minutes",
      offpeak_service: "13 minutes",
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
      peak_service: "6 \u2013 11 minutes",
      offpeak_service: "9 \u2013 13 minutes"
    }
  end

  def schedule_note(%Route{id: "Blue"}) do
    %__MODULE__{
      peak_service: "7 \u2013 9 minutes",
      offpeak_service: "9 \u2013 15 minutes"
    }
  end

  def schedule_note(%Route{id: "Green"}) do
    %__MODULE__{
      peak_service: "6 \u2013 12 minutes",
      offpeak_service: "6 \u2013 12 minutes"
    }
  end

  def schedule_note(%Route{id: "Green-B"}) do
    %__MODULE__{
      peak_service: "6 \u2013 12 minutes",
      offpeak_service: "6 \u2013 12 minutes"
    }
  end

  def schedule_note(%Route{id: "Green-C"}) do
    %__MODULE__{
      peak_service: "6 \u2013 12 minutes",
      offpeak_service: "6 \u2013 12 minutes"
    }
  end

  def schedule_note(%Route{id: "Green-D"}) do
    %__MODULE__{
      peak_service: "6 \u2013 12 minutes",
      offpeak_service: "6 \u2013 12 minutes"
    }
  end

  def schedule_note(%Route{id: "Green-E"}) do
    %__MODULE__{
      peak_service: "6 \u2013 12 minutes",
      offpeak_service: "6 \u2013 12 minutes"
    }
  end

  def schedule_note(%Route{id: "CR-Foxboro"}) do
    %__MODULE__{
      peak_service: nil,
      offpeak_service: nil,
      alternate_text:
        HTML.safe_to_string(
          content_tag(:div, [
            content_tag(
              :p,
              [
                content_tag(
                  :strong,
                  "The Foxboro Special Events line is only for occasional service."
                ),
                " It travels along limited stops between Foxboro and either Providence or Downtown Boston (South Station)"
              ],
              class: "m-schedule-page__service-note-time"
            ),
            content_tag(
              :p,
              [
                content_tag(
                  :strong,
                  "For regular weekday service to Foxboro please visit: "
                ),
                link(
                  "Franklin Line",
                  to: Helpers.timetable_path(SiteWeb.Endpoint, :show, "CR-Franklin")
                )
              ],
              class: "m-schedule-page__service-note-time"
            )
          ])
        )
    }
  end

  def schedule_note(_) do
    nil
  end
end
