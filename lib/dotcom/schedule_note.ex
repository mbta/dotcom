defmodule Dotcom.ScheduleNote do
  @moduledoc """
  Represents text describing the schedule for a subway route
  """

  import PhoenixHTMLHelpers.Link
  import PhoenixHTMLHelpers.Tag

  alias DotcomWeb.Router.Helpers
  alias Phoenix.HTML
  alias Routes.Route

  defstruct alternate_text: nil,
            exceptions: [],
            offpeak_service: "",
            peak_service: "",
            saturday_service: "",
            sunday_service: ""

  @type exception :: %{
          type: String.t(),
          service: String.t()
        }

  @type t :: %__MODULE__{
          alternate_text: String.t() | nil,
          exceptions: [exception],
          offpeak_service: String.t() | nil,
          peak_service: String.t(),
          saturday_service: String.t(),
          sunday_service: String.t()
        }

  @spec new(Route.t()) :: t | nil
  def new(route) do
    schedule_note(route)
  end

  def schedule_note(%Route{id: "Red"}) do
    %__MODULE__{
      peak_service: "6 \u2013 20 minutes",
      saturday_service: "9 \u2013 18 minutes",
      sunday_service: "9 \u2013 18 minutes"
    }
  end

  def schedule_note(%Route{id: "Mattapan"}) do
    %__MODULE__{
      offpeak_service: "8 \u2013 12 minutes",
      peak_service: "7 minutes",
      saturday_service: "13 minutes",
      sunday_service: "13 minutes"
    }
  end

  def schedule_note(%Route{id: "Orange"}) do
    %__MODULE__{
      peak_service: "6 \u2013 9 minutes",
      saturday_service: "9 \u2013 10 minutes",
      sunday_service: "12 \u2013 14 minutes"
    }
  end

  def schedule_note(%Route{id: "Blue"}) do
    %__MODULE__{
      offpeak_service: "6 \u2013 13 minutes",
      peak_service: "4 \u2013 5 minutes",
      saturday_service: "9 \u2013 13 minutes",
      sunday_service: "9 \u2013 13 minutes"
    }
  end

  def schedule_note(%Route{id: "Green"}) do
    %__MODULE__{
      offpeak_service: "7 \u2013 12 minutes",
      peak_service: "6 \u2013 8 minutes",
      saturday_service: "8 \u2013 15 minutes",
      sunday_service: "8 \u2013 20 minutes"
    }
  end

  def schedule_note(%Route{id: "Green-B"}) do
    %__MODULE__{
      offpeak_service: "7 \u2013 12 minutes",
      peak_service: "6 \u2013 8 minutes",
      saturday_service: "8 \u2013 15 minutes",
      sunday_service: "8 \u2013 20 minutes"
    }
  end

  def schedule_note(%Route{id: "Green-C"}) do
    %__MODULE__{
      offpeak_service: "7 \u2013 12 minutes",
      peak_service: "6 \u2013 8 minutes",
      saturday_service: "8 \u2013 15 minutes",
      sunday_service: "8 \u2013 20 minutes"
    }
  end

  def schedule_note(%Route{id: "Green-D"}) do
    %__MODULE__{
      offpeak_service: "7 \u2013 12 minutes",
      peak_service: "6 \u2013 8 minutes",
      saturday_service: "8 \u2013 15 minutes",
      sunday_service: "8 \u2013 20 minutes"
    }
  end

  def schedule_note(%Route{id: "Green-E"}) do
    %__MODULE__{
      offpeak_service: "7 \u2013 12 minutes",
      peak_service: "6 \u2013 8 minutes",
      saturday_service: "8 \u2013 15 minutes",
      sunday_service: "8 \u2013 20 minutes"
    }
  end

  def schedule_note(%Route{id: "CR-Foxboro"}) do
    %__MODULE__{
      peak_service: nil,
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
                  to: Helpers.timetable_path(DotcomWeb.Endpoint, :show, "CR-Franklin")
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
